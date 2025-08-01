import LoginLog from '../../Schemas/LoginLog.js';
import getClientIP from '../../utils/getclientip.js';
import axios from 'axios';
import Dev from '../../Schemas/DevUser.js'

export default async function logLoginAttempt(req, status = 'success', reason = '') {
  const ip = getClientIP(req);
  const userAgent = req.headers['user-agent'] || 'unknown';

  let geo = {};
  try {
    const geoRes = await axios.get(`http://ip-api.com/json/${ip}`);
    const { country, city, regionName, lat, lon } = geoRes.data;
    geo = { country, city, region: regionName, lat, lon };
  } catch (err) {
    console.error('GeoIP failed', err.message);
  }

  const log = new LoginLog({
    username: req.body.username || 'unknown',
    ip,
    userAgent,
    status,
    reason,
    location: geo,
    appId: Dev.appId,
  });

  await log.save();
}
