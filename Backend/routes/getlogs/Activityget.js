import express from 'express';
import Activity from '../../Schemas/ActivityLog.js';
import SuspiciousRequest from '../../Schemas/SuspiciousRequest.js';
import DevUser from '../../Schemas/DevUser.js';

const router = express.Router();
// route for the dev get the app detail by the app id 
router.get('/app/:appId', async (req, res) => {
  const { appId } = req.params;
  try {
const dev = await DevUser.findOne({ appId: req.params.appId });
    if (!dev) return res.status(404).json({ message: "App not found" });

    res.json({ appName: dev.appname, username:dev.username }); 
  } catch (err) {
    res.status(500).json({ message: "Error fetching app name", error: err });
  }
});
// Route 1: Get activity logs by appId
router.get('/activities/:appId', async (req, res) => {
  const { appId } = req.params;
  try {
    const logs = await Activity.find({ appId })
      .sort({ createdAt: -1 })
      .limit(100); // latest 100 logs
    res.json(logs);
  } catch (err) {
    console.error('Failed to fetch activity logs:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

//  Route 2: Get suspicious requests by appId (missing before)
router.get('/datarateslimit/:appId', async (req, res) => {
  const { appId } = req.params;
  try {
    const logs = await SuspiciousRequest.find({ appId })
      .sort({ timestamp: -1 })
      .limit(100);
    res.json(logs);
  } catch (error) {
    console.error('Failed to fetch suspicious logs:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
