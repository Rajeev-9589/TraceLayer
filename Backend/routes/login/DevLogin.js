import jwt from 'jsonwebtoken';
import express from 'express';
import bcrypt from 'bcrypt'; 
import DevUser from '../../Schemas/DevUser.js'; 

const route = express.Router();
route.post('/login-Dev', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const dev = await DevUser.findOne({ email });
    if (!dev) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, dev.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { devId: dev._id, email: dev.email, appId: dev.appId },
      process.env.JWT_SECRET || 'default',
      { expiresIn: '1d' }
    );

    res.json({
      message: "Login successful",
      token,
      appId: dev.appId,
      apiKey: dev.apiKey,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default route;
