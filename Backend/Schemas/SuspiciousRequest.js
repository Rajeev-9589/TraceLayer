import mongoose from 'mongoose';

const suspiciousRequestSchema = new mongoose.Schema({
  ip: String,
  path: String,
  method: String,
  userAgent: String,
  count: Number,
  timestamp: { type: Date, default: Date.now },
  reason: String,
});

export default mongoose.model('SuspiciousRequest', suspiciousRequestSchema);
