// import DevUser from '../Schemas/DevUser.js';

// const verifyAppAuth = async (req, res, next) => {
//   const { appid, apikey } = req.headers;

//   if (!appid || !apikey) {
//     return res.status(403).json({ error: 'Missing appid or apikey in headers' });
//   }

//   const dev = await DevUser.findOne({ appId: appid, apiKey: apikey });
//   if (!dev) {
//     return res.status(401).json({ error: 'Invalid appId or apiKey' });
//   }

//   req.dev = dev;
//   next();
// };

// export default verifyAppAuth;
