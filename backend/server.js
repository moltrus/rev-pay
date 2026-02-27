import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const SECRET_KEY = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());

const users = [];

app.post('/api/auth/register', async (req, res) => {
  const { fullName, email, password, role, businessName, taxId } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    fullName,
    email,
    password: hashedPassword,
    role,
    businessDetails:
      role === 'business' ? { name: businessName, taxId: taxId } : null,
    balance: 0,
  };

  users.push(newUser);
  res.status(201).json({ message: 'Registration successful' });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY);
    res.json({ token, user: { fullName: user.fullName, role: user.role } });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});


const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.id; 
    req.userRole = decoded.role;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};


app.get('/api/user/dashboard', verifyToken, (req, res) => {
  
  const user = users.find(u => u.id === req.userId);
  
  if (!user) return res.status(404).json({ message: "User not found" });

  
  res.json({
    fullName: user.fullName,
    balance: user.balance,
    role: user.role,
    businessDetails: user.businessDetails
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
