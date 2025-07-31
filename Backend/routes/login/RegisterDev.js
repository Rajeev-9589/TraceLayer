import express from 'express'; 
import DevUser from '../../Schemas/DevUser.js';

const route = express.Router();
route.post('/register-Dev', async (req, res) => {
  const { email, username, appname, password } = req.body;

  if (!email || !username || !appname || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const exists = await DevUser.findOne({ email });
  if (exists) return res.status(409).json({ error: "Email already registered" });

  const newDev = new DevUser({ email, username, appname, password });
  await newDev.save();

  res.status(201).json({
    message: "Registered successfully",
    apiKey: newDev.apiKey,
    appId: newDev.appId,
  });
});
export default route;
