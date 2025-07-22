import SuspiciousRequest from '../Schemas/SuspiciousRequest.js'; // Schema to store logs

const ipRequestMap = new Map();

const MAX_REQUESTS = 20; // can me manipulate or declare by the developer kind of user 
const WINDOW_MS = 60 * 1000;

const ipRateMonitor = async (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const now = Date.now();

  if (!ipRequestMap.has(ip)) {
    ipRequestMap.set(ip, { count: 1, firstRequestTime: now });
    return next();
  }

  const data = ipRequestMap.get(ip);

  if (now - data.firstRequestTime < WINDOW_MS) {
    data.count += 1;

    if (data.count > MAX_REQUESTS) {
      console.warn(`🚨 High request rate from IP ${ip}`);

      // Event Saves in db
      await SuspiciousRequest.create({
        ip,
        path: req.originalUrl,
        method: req.method,
        userAgent: req.headers['user-agent'],
        count: data.count,
        timestamp: new Date(),
        reason: 'High request rate',
      });

      return res.status(429).json({ message: 'Too many requests. Please try again later.' });
    }

    ipRequestMap.set(ip, data);
  } else {
    // Reset tracking window
    ipRequestMap.set(ip, { count: 1, firstRequestTime: now });
  }

  next();
};

export default ipRateMonitor;
