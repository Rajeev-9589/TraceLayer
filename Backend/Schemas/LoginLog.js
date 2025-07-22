import mongoose from 'mongoose';

const loginLogSchema = new mongoose.Schema({
  username: String,
  ip: String,
  userAgent: String,
  status: { type: String,   enum: ['success', 'fail', 'error'], default: 'fail' },
  reason: String, // 'wrong password', 'user not found'
  location: {
    country: String,
    city: String,
    region: String,
    lat: Number,
    lon: Number,
  },
}, { timestamps: true });

export default mongoose.model('LoginLog', loginLogSchema);
