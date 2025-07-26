import jwt from 'jsonwebtoken';
import express from 'express';

const route   = express.Router();

route.post('/login-Dev', async (req, res) => {
  const { email, password } = req.body;
  const dev = await DevUser.findOne({ email });

  if (!dev || !(await bcrypt.compare(password, dev.password))) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign(
    { devId: dev._id, email: dev.email, appId: dev.appId },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({
    message: "Login successful",
    token,
    appId: dev.appId,
    apiKey: dev.apiKey,
  });
});
