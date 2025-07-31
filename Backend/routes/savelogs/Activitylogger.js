import axios from 'axios';
import Activity from '../../Schemas/ActivityLog.js';
import getClientIP from '../../utils/getclientip.js';

const activityLogger = async (req, res, next) => {
  try {
    const ip = getClientIP(req);
    const geoRes = await axios.get(`http://ip-api.com/json/${ip}`);
    const location = geoRes.data;
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000); // You can tweak this

    await Activity.findOneAndUpdate(
      {
        ip,
        route: req.originalUrl,
        method: req.method,
        createdAt: { $gte: oneMinuteAgo },
      },
      {
        $inc: { count: 1 },
        $set: { lastSeen: new Date() },
        $setOnInsert: {
          username: req.user?.username || 'Guest',
          location: {
            country: location.country,
            city: location.city,
            region: location.regionName,
          },
        }
      },
      { upsert: true, new: true }
    );
  } catch (err) {
    console.error('Activity logging failed:', err.message);
  }

  next();
};

export default activityLogger;
