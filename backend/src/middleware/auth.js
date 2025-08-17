const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// Helper function to get users from JSON file
const getUsers = () => {
    const DB_FILE = path.join(__dirname, '../../data/users.json');
    
    try {
        if (!fs.existsSync(DB_FILE)) {
            return [];
        }
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data).users || [];
    } catch (error) {
        console.error('Error reading users file:', error);
        return [];
    }
};

// Find user by email
const findUserByEmail = (email) => {
    const users = getUsers();
    return users.find(u => u.email === email);
};

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            throw new Error();
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Use email instead of _id since that's what we store in the token
        const user = findUserByEmail(decoded.email);
        
        if (!user) {
            throw new Error();
        }
        
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate' });
    }
};

module.exports = auth;