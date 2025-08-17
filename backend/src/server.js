// Load environment variables first!
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3000;

// Debug: Check if environment variables are loaded
console.log('Environment check:');
console.log('- Paddle API Key loaded:', process.env.PADDLE_API_KEY ? 'Yes' : 'No');
console.log('- JWT Secret loaded:', process.env.JWT_SECRET ? 'Yes' : 'No');
console.log('- Paddle Client Token loaded:', process.env.PADDLE_CLIENT_TOKEN ? 'Yes' : 'No');

// JSON Database (statt MongoDB)
const DB_FILE = path.join(__dirname, '../data/users.json');
const ensureDbExists = () => {
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify({ users: [] }));
    }
};

const getUsers = () => {
    ensureDbExists();
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8')).users;
};

const saveUsers = (users) => {
    ensureDbExists();
    fs.writeFileSync(DB_FILE, JSON.stringify({ users }, null, 2));
};

const findUser = (email) => {
    const users = getUsers();
    return users.find(u => u.email === email);
};

const createUser = (userData) => {
    const users = getUsers();
    const newUser = {
        _id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
    saveUsers(users);
    return newUser;
};

const updateUser = (email, updates) => {
    const users = getUsers();
    const index = users.findIndex(u => u.email === email);
    if (index !== -1) {
        users[index] = { ...users[index], ...updates };
        saveUsers(users);
        return users[index];
    }
    return null;
};

// Auth Middleware (direkt in server.js)
const auth = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        console.log('Auth header received:', authHeader);
        
        const token = authHeader?.replace('Bearer ', '');
        
        if (!token) {
            console.log('No token provided');
            return res.status(401).json({ error: 'No token provided' });
        }
        
        console.log('Verifying token with secret:', process.env.JWT_SECRET ? 'Secret exists' : 'No secret!');
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decoded successfully:', decoded);
        
        const user = findUser(decoded.email);
        
        if (!user) {
            console.log('User not found:', decoded.email);
            return res.status(401).json({ error: 'User not found' });
        }
        
        console.log('User authenticated:', user.email);
        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        }
        
        res.status(401).json({ error: 'Please authenticate' });
    }
};

// Speicher für Reset-Codes (in Production sollte Redis verwendet werden)
const resetCodes = new Map();

// Generiere 6-stelligen Code
function generateResetCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Generate secure password
function generateSecurePassword() {
    const length = 12;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';
    let password = '';
    
    // Ensure at least one of each type
    password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)]; // Uppercase
    password += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]; // Lowercase
    password += '0123456789'[Math.floor(Math.random() * 10)]; // Number
    password += '!@#$%&*'[Math.floor(Math.random() * 7)]; // Special
    
    // Fill the rest randomly
    for (let i = password.length; i < length; i++) {
        password += charset[Math.floor(Math.random() * charset.length)];
    }
    
    // Shuffle the password
    return password.split('').sort(() => Math.random() - 0.5).join('');
}

// Middleware
app.use(cors());
app.use('/webhook', express.json()); // Für Paddle Webhook
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../frontend')));

// Email Configuration (optional für jetzt)
const transporter = process.env.EMAIL_USER && process.env.EMAIL_PASS ? 
    nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    }) : null;

// Paddle Webhook Handler
app.post('/webhook', async (req, res) => {
    try {
        const event = req.body;
        
        console.log('🎣 Paddle Webhook Event:', event.event_type);
        console.log('Event Data:', JSON.stringify(event.data, null, 2));
        
        switch (event.event_type) {
            case 'transaction.completed':
                console.log('✅ Payment completed');
                const transactionData = event.data;
                const customerEmail = transactionData.customer?.email;
                
                if (customerEmail && !findUser(customerEmail)) {
                    // Generate password
                    const password = generateSecurePassword();
                    const hashedPassword = await bcrypt.hash(password, 10);
                    
                    // Create user
                    const user = createUser({
                        email: customerEmail,
                        password: hashedPassword,
                        subscription: {
                            status: 'trialing',
                            plan: transactionData.custom_data?.plan || 'monthly',
                            paddleCustomerId: transactionData.customer?.id,
                            paddleSubscriptionId: transactionData.subscription?.id,
                            trialEnd: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
                        },
                        analysisCount: 0
                    });
                    
                    console.log('User created via Paddle:', user.email);
                    
                    // Send welcome email with password
                    if (transporter) {
                        try {
                            await transporter.sendMail({
                                from: process.env.EMAIL_USER,
                                to: customerEmail,
                                subject: 'Welcome to ChartMaster AI - Your Login Details',
                                html: `
                                    <h2>Welcome to ChartMaster AI!</h2>
                                    <p>Your 3-day free trial has started.</p>
                                    <p><strong>Email:</strong> ${customerEmail}</p>
                                    <p><strong>Password:</strong> ${password}</p>
                                    <p>Please save this password or change it after logging in.</p>
                                    <a href="${process.env.APP_URL || 'http://localhost:3000'}/login">Login Now</a>
                                `
                            });
                            console.log('Welcome email sent');
                        } catch (emailError) {
                            console.error('Email error:', emailError);
                        }
                    } else {
                        console.log('📧 TEST PASSWORD (no email configured):', password);
                    }
                }
                break;
                
            case 'subscription.created':
                console.log('📝 Subscription created:', event.data);
                break;
                
            case 'subscription.updated':
                console.log('📝 Subscription updated:', event.data);
                break;
                
            case 'subscription.cancelled':
                console.log('❌ Subscription cancelled:', event.data);
                break;
                
            default:
                console.log('Unhandled event:', event.event_type);
        }
        
        res.json({ success: true });
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(400).json({ error: error.message });
    }
});

// Create Paddle Checkout URL
app.post('/api/start-trial-direct', async (req, res) => {
    try {
        const { plan } = req.body;
        
        console.log('Creating Paddle checkout for plan:', plan);
        
        // Product mapping
        const PADDLE_PRODUCTS = {
            'monthly': process.env.PADDLE_PRODUCT_MONTHLY,
            'yearly': process.env.PADDLE_PRODUCT_YEARLY,
            'monthly-pro': process.env.PADDLE_PRODUCT_MONTHLY_PRO,
            'yearly-pro': process.env.PADDLE_PRODUCT_YEARLY_PRO
        };
        
        const productId = PADDLE_PRODUCTS[plan];
        
        if (!productId) {
            return res.status(400).json({ error: 'Invalid plan selected' });
        }
        
        // Für Frontend-basiertes Checkout reicht die Product ID
        res.json({ 
            success: true,
            productId: productId
        });
        
    } catch (error) {
        console.error('Checkout error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Create Checkout Session for Trial (keeping for backward compatibility)
app.post('/api/start-trial', async (req, res) => {
    try {
        const { email, plan } = req.body;
        
        console.log('Starting trial for:', email, 'Plan:', plan);
        
        // Check if user exists
        const existingUser = findUser(email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Redirect to Paddle checkout
        const PADDLE_PRODUCTS = {
            'monthly': process.env.PADDLE_PRODUCT_MONTHLY,
            'yearly': process.env.PADDLE_PRODUCT_YEARLY,
            'monthly-pro': process.env.PADDLE_PRODUCT_MONTHLY_PRO,
            'yearly-pro': process.env.PADDLE_PRODUCT_YEARLY_PRO
        };
        
        const productId = PADDLE_PRODUCTS[plan];
        
        if (!productId) {
            return res.status(400).json({ error: 'Invalid plan selected' });
        }
        
        const checkoutUrl = `https://sandbox-pay.paddle.com/checkout/custom/build?` +
            `products[0]=${productId}` +
            `&client_token=${process.env.PADDLE_CLIENT_TOKEN}` +
            `&customer_email=${encodeURIComponent(email)}` +
            `&custom_data[plan]=${plan}`;

        res.json({ 
            sessionId: 'paddle-checkout',
            url: checkoutUrl 
        });
        
    } catch (error) {
        console.error('Checkout error:', error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        console.log('Login attempt for:', email);
        
        const user = findUser(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '30d' });
        
        console.log('Login successful for:', email);
        
        res.json({
            token,
            user: {
                email: user.email,
                subscription: user.subscription
            }
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Forgot Password - Send Code
app.post('/api/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        
        console.log('Password reset requested for:', email);
        
        // Check if user exists
        const user = findUser(email);
        if (!user) {
            // Don't reveal if email exists
            return res.json({ 
                success: true, 
                message: 'If the email exists, a reset code will be sent.' 
            });
        }
        
        // Generate reset code
        const code = generateResetCode();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
        
        // Store code
        resetCodes.set(email, {
            code: code,
            expiresAt: expiresAt,
            attempts: 0
        });
        
        console.log(`Reset code for ${email}: ${code}`); // Remove in production!
        
        // Send email
        if (transporter) {
            try {
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: 'ChartMaster AI - Password Reset Code',
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <h2 style="color: #111827;">Password Reset Request</h2>
                            <p>You requested a password reset for your ChartMaster AI account.</p>
                            
                            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
                                <h1 style="font-size: 36px; letter-spacing: 8px; margin: 0; color: #3b82f6;">
                                    ${code}
                                </h1>
                            </div>
                            
                            <p>This code will expire in 15 minutes.</p>
                            <p>If you didn't request this, please ignore this email.</p>
                            
                            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
                            <p style="color: #6b7280; font-size: 14px;">
                                ChartMaster AI - AI-powered trading chart analysis
                            </p>
                        </div>
                    `
                });
                console.log('Reset email sent to:', email);
            } catch (emailError) {
                console.error('Failed to send reset email:', emailError);
                // Continue anyway - show code in console for testing
            }
        } else {
            // For testing without email
            console.log('📧 RESET CODE (no email configured):', code);
        }
        
        res.json({ 
            success: true, 
            message: 'Reset code sent to your email' 
        });
        
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ error: 'Failed to process request' });
    }
});

// Verify Reset Code and Reset Password
app.post('/api/verify-reset-code', async (req, res) => {
    try {
        const { email, code } = req.body;
        
        console.log('Verifying reset code for:', email);
        
        // Get stored code
        const resetData = resetCodes.get(email);
        
        if (!resetData) {
            return res.status(400).json({ error: 'No reset code found. Please request a new one.' });
        }
        
        // Check expiration
        if (new Date() > resetData.expiresAt) {
            resetCodes.delete(email);
            return res.status(400).json({ error: 'Code expired. Please request a new one.' });
        }
        
        // Check attempts
        resetData.attempts++;
        if (resetData.attempts > 5) {
            resetCodes.delete(email);
            return res.status(400).json({ error: 'Too many attempts. Please request a new code.' });
        }
        
        // Verify code
        if (resetData.code !== code) {
            return res.status(400).json({ error: 'Invalid code. Please try again.' });
        }
        
        // Code is valid - generate new password
        const newPassword = generateSecurePassword();
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        // Update user password
        const user = findUser(email);
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        
        updateUser(email, { password: hashedPassword });
        
        // Delete used code
        resetCodes.delete(email);
        
        console.log(`Password reset successful for: ${email}`);
        console.log(`New password: ${newPassword}`); // Remove in production!
        
        // Send new password email
        if (transporter) {
            try {
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: 'ChartMaster AI - Your New Password',
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <h2 style="color: #111827;">Password Reset Successful</h2>
                            <p>Your password has been reset successfully.</p>
                            
                            <div style="background: #f0f9ff; border: 1px solid #3b82f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                                <p style="margin: 0;"><strong>Your new password:</strong></p>
                                <h3 style="font-family: monospace; color: #1e40af; margin: 10px 0;">
                                    ${newPassword}
                                </h3>
                            </div>
                            
                            <p><strong>Important:</strong> Please save this password and change it after logging in.</p>
                            
                            <a href="${process.env.APP_URL || 'http://localhost:3000'}/login" 
                               style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; 
                                      text-decoration: none; border-radius: 8px; margin: 20px 0;">
                                Login Now
                            </a>
                            
                            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
                            <p style="color: #6b7280; font-size: 14px;">
                                ChartMaster AI - AI-powered trading chart analysis
                            </p>
                        </div>
                    `
                });
                console.log('New password email sent');
            } catch (emailError) {
                console.error('Failed to send password email:', emailError);
            }
        } else {
            // For testing without email
            console.log('🔐 NEW PASSWORD (no email configured):', newPassword);
        }
        
        res.json({ 
            success: true, 
            message: 'Password reset successful. Check your email for the new password.',
            // For testing only - remove in production:
            testPassword: newPassword
        });
        
    } catch (error) {
        console.error('Verify code error:', error);
        res.status(500).json({ error: 'Failed to reset password' });
    }
});

// User info endpoint
app.get('/api/user', auth, (req, res) => {
    res.json({
        user: {
            email: req.user.email,
            subscription: req.user.subscription,
            analysisCount: req.user.analysisCount
        }
    });
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/register.html'));
});

app.get('/welcome', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/welcome.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/login.html'));
});

app.get('/forgot-password', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/forgot-password.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dashboard.html'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).send('Something went wrong!');
});

// Clean up expired codes periodically (every 5 minutes)
setInterval(() => {
    const now = new Date();
    for (const [email, data] of resetCodes.entries()) {
        if (now > data.expiresAt) {
            resetCodes.delete(email);
            console.log('Cleaned up expired reset code for:', email);
        }
    }
}, 5 * 60 * 1000);

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 ChartMaster AI Server running on http://localhost:${PORT}`);
    console.log('📁 Using JSON file database');
    console.log('🔑 Environment loaded:', process.env.NODE_ENV || 'development');
    console.log('🎣 Paddle Sandbox Mode:', process.env.PADDLE_SANDBOX === 'true' ? 'Yes' : 'No');
    
    if (!process.env.PADDLE_API_KEY) {
        console.error('⚠️  WARNING: PADDLE_API_KEY not found in environment variables!');
    }
    if (!process.env.PADDLE_PRODUCT_MONTHLY || !process.env.PADDLE_PRODUCT_YEARLY) {
        console.error('⚠️  WARNING: Paddle Product IDs not configured!');
    }
});