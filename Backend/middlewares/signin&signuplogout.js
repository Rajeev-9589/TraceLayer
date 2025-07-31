import express from 'express';
const route = express.Router();
import User from '../Schemas/User.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import logLoginAttempt from './loginAttemptlog.js';
import handleFailedLogin from './handlefailedLogin.js';
// signup 
route.post('/signup', async (req, res) => {
  const { email,username, password } = req.body;
  if (!password || !username) {
    res.json("Fill Credentials");
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Already Registered!" });
    }
    //creation
    const newUser = new User({ password, username });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
)
//signin
const JWT_SECRET = "Securitycheck"
route.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.json("Enter Credentials!!")
  }
  try {
    const user = await User.findOne({ username });
    
    if (!user) {
      await logLoginAttempt(req, 'fail', 'user not found'); // req, status, reason.
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    if (user.isAccountLocked()) {
      return res.status(403).json({
        message: 'Account temporarily locked due to suspicious activity. Try again later.',
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      await handleFailedLogin(user);
      await logLoginAttempt(req, 'fail', 'wrong password');
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    await logLoginAttempt(req, 'success');
    res.json({ message: 'Signed in successfully', token });
  } catch (err) {
    await logLoginAttempt(req, 'error', 'server issue')
    console.error('Signin error:', err);
    res.status(500).json({ message: 'Server error' });
  }


});

//logout
route.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Logout failed');
    }
    res.send('Logged out successfully');
  })
})

export default route;


