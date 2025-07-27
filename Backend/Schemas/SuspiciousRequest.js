import mongoose from 'mongoose';


const suspiciousRequestSchema = new mongoose.Schema({
  ip: String,
  path: String,
  method: String,
  userAgent: String,
  count: Number,
  timestamp: { type: Date, default: Date.now },
  reason: String,
 appId: {
    type: String, // matches Dev.appId
  },
  count: { type: Number, default: 1 },
firstDetected: Date,
lastDetected: Date,

});

export default mongoose.model('SuspiciousRequest', suspiciousRequestSchema);
