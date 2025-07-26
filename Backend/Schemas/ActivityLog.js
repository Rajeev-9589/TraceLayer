import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  username: String,
  route: String,
  ip: String,
  method: String,
  location: {
    country: String,
    city: String,
    region: String,
  },
  count: { type: Number, default: 1 }, // New
  lastSeen: { type: Date }, // to get the recent activity
 appId: {
    type: String, // ✅ Correct type — matches Dev.appId
  },
}, { timestamps: true });

export default mongoose.model('Activity', activitySchema);

