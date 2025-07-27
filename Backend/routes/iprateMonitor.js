import SuspiciousRequest from '../Schemas/SuspiciousRequest.js'; // Schema to store logs
import Dev from '../Schemas/DevUser.js'
const ipRequestMap = new Map();
// const blockedIPs = new Map();
const MAX_REQUESTS = 20; // can me manipulate or declare by the developer kind of user 
const WINDOW_MS = 60 * 1000;
// const BLOCK_DURATION_MS = 5 * 60 * 1000; // 5 minutes

const ipRateMonitor = async (req, res, next) => {
   const apiKey = req.headers['x-api-key'];
    if (!apiKey) return res.status(401).json({ message: 'API key missing' });

    const developer = await Dev.findOne({ apiKey });
    if (!developer) return res.status(403).json({ message: 'Invalid API key' });

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const now = Date.now();
//  if (blockedIPs.has(ip)) {
//     const unblockTime = blockedIPs.get(ip);
//     if (now < unblockTime) {
//       const waitSecs = Math.ceil((unblockTime - now) / 1000);
//       return res.status(429).json({ message: `Too many requests. Try again in ${waitSecs}s.` });
//     } else {
//       blockedIPs.delete(ip); // Unblock after time expires
//     }
//   }
  
  if (!ipRequestMap.has(ip)) {
    ipRequestMap.set(ip, { count: 1, firstRequestTime: now });
    return next();
  }

  const data = ipRequestMap.get(ip);

  if (now - data.firstRequestTime < WINDOW_MS) {
    data.count += 1;

    if (data.count > MAX_REQUESTS) {
      console.warn(`🚨 High request rate from IP ${ip}`);

      // Block IP for defined duration
      // blockedIPs.set(ip, now + BLOCK_DURATION_MS);
      // Event Saves in db
    await SuspiciousRequest.findOneAndUpdate(
  {
    ip,
    path: req.originalUrl,
    method: req.method,
    appId: developer.appId, // not Dev.appId, which is wrong
  },
  {
    $setOnInsert: {
      userAgent: req.headers['user-agent'],
      reason: 'High request rate',
      firstDetected: new Date()
    },
    $inc: { count: 1 },
    $set: { lastDetected: new Date() }
  },
  { upsert: true, new: true }
);

      
      return res.status(429).json({ message: 'chutiya samjha ky mereko' });//Too many requests. Please try again later.
    }

    ipRequestMap.set(ip, data);
  } else {
    // Reset tracking window
    ipRequestMap.set(ip, { count: 1, firstRequestTime: now });
  }

  next();
};

export default ipRateMonitor;
