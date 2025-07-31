const MAX_FAILED_ATTEMPTS = 5;
const LOCK_DURATION_MINUTES = 15;

export default async function handleFailedLogin(user) {
  user.failedAttempts += 1;

  if (user.failedAttempts >= MAX_FAILED_ATTEMPTS) {
    user.isLocked = true;
    user.lockUntil = new Date(Date.now() + LOCK_DURATION_MINUTES * 60 * 1000); //saved a 15+ date to unlock 
    user.lockReason = 'Multiple failed attempts';
  }

  await user.save(); //update at schema
}

//manually locking 
export  async function lockManually(user, reason = 'Manual block', admin = 'System') {
  user.isLocked = true;
  user.lockUntil = null; // null means "indefinitely locked"
  user.lockReason = reason;
  user.lockedBy = admin;
  user.lockedAt = new Date();

  await user.save();
}
//manuall unlocking 
export async function unlockUser(user) {
  user.isLocked = false;
  user.lockUntil = null;
  user.failedAttempts = 0;
  user.lockReason = null;
  user.lockedBy = null;
  user.lockedAt = null;
  await user.save();
}
