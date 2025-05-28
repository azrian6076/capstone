import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock database
const users = [
  {
    id: '1',
    name: 'alex',
    email: 'student@example.com',
    password: '$2a$10$X/4Zo.A1v5IutBL8NVVHfeqLIBJzn4jmEFwSKQnvpvl5iMU9phPL.',  // password123
    role: 'student',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
  },
  {
    id: '2',
    name: 'Dr. sutjamoko',
    email: 'lecturer@example.com',
    password: '$2a$10$X/4Zo.A1v5IutBL8NVVHfeqLIBJzn4jmEFwSKQnvpvl5iMU9phPL.',  // password123
    role: 'lecturer',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg'
  },
  {
    id: '3',
    name: 'Prodi Admin',
    email: 'prodi@example.com',
    password: '$2a$10$X/4Zo.A1v5IutBL8NVVHfeqLIBJzn4jmEFwSKQnvpvl5iMU9phPL.',  // password123
    role: 'prodi',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
  },
  {
    id: '4',
    name: 'Industry',
    email: 'industry@example.com',
    password: '$2a$10$X/4Zo.A1v5IutBL8NVVHfeqLIBJzn4jmEFwSKQnvpvl5iMU9phPL.',  // password123
    role: 'industry',
    avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'
  },
  {
    id: '5',
    name: 'System Admin',
    email: 'admin@example.com',
    password: '$2a$10$X/4Zo.A1v5IutBL8NVVHfeqLIBJzn4jmEFwSKQnvpvl5iMU9phPL.',  // password123
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg'
  }
];

// JWT Secret
const JWT_SECRET = 'your_jwt_secret_key';

// Routes
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    // Return user data (without password)
    const { password: _, ...userData } = user;
    
    res.json({
      message: 'Login successful',
      token,
      user: userData
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected route example
app.get('/api/profile', authenticateToken, (req, res) => {
  // The user data is attached to the request by the middleware
  res.json({ user: req.user });
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }
    
    req.user = user;
    next();
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;