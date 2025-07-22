import axios from 'axios';
import Activity from '../Schemas/ActivityLog.js';
import getClientIP from '../utils/getclientip.js';

const activityLogger = async (req, res, next) => {
  try {
    const ip = getClientIP(req);
    const geoRes = await axios.get(`http://ip-api.com/json/${ip}`);
    const location = geoRes.data;

    const log = new Activity({
      username: req.user?.username || 'Guest',
      route: req.originalUrl,
      ip: ip,
      method: req.method,
      location: {
        country: location.country,
        city: location.city,
        region: location.regionName,
      },
    });
    await log.save();
  } catch (err) {
    console.error('Activity logging failed:', err.message);
  }

  next();
};

export default activityLogger;
