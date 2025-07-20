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
}, { timestamps: true });

export default mongoose.model('Activity', activitySchema);
