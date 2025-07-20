import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
   isLocked: { type: Boolean, default: false },
  lockUntil: { type: Date, default: null },
  failedAttempts: { type: Number, default: 0 },
  //belowformannual
  lockReason: { type: String, default: null },
lockedBy: { type: String, default: null },
lockedAt: { type: Date, default: null },

}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if password is new or changed

  try {
    const salt = await bcrypt.genSalt(10); // 10 salt rounds
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.isAccountLocked = function () {
  if (!this.isLocked) return false;

  if (this.lockUntil && this.lockUntil > new Date()) {
    return true; // still locked
  }

  // Auto-unlock if time expired
  this.isLocked = false;
  this.failedAttempts = 0;
  this.lockUntil = null;
  return false;
};

export default model('User', userSchema);
