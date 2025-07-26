import mongoose, { Schema } from "mongoose";
import crypto from 'crypto';
const DevSchema  = new Schema({
   email: String,
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
  }
})
export default mongoose.model('Dev',DevSchema);