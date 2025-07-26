import mongoose, { Schema } from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const DevUserSchema = new Schema({
  email: { type: String, unique: true },
  username: String,
  appname: String,
  password: String,
  apiKey: {
    type: String,
    unique: true,
    default: () => crypto.randomBytes(16).toString('hex'),
  },
  appId: {
    type: String,
    unique: true,
    default: () => crypto.randomBytes(12).toString('hex'),
  },
});

// Hash password before saving
DevUserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model('DevUser', DevUserSchema);
