import express from 'express'
import DevUser from '../Schemas/DevUser.js';
const router = express.Router();

router.get('/devuser/ratelimit/:appId', async (req,res)=>{
  const {appId} = req.params;
  
  if (!appId) {
    return res.status(400).json({ message: 'Invalid appId' });
  }
  const findlimit = await DevUser.findOne({ appId })
if (!findlimit) {
  return res.status(404).json({ error: "App not found" });
}
    res.json({"rateLimit":findlimit.rateLimit });

})
router.post('/set-limit/:appId', async (req, res) => {
  const { appId } = req.params;
  const { limit } = req.body;

  if (!limit || limit < 1) {
    return res.status(400).json({ message: 'Invalid limit' });
  }

  try {
    const updated = await DevUser.findOneAndUpdate(
      { appId },
      { rateLimit: limit },
      { new: true }
    );
    res.json({ message: 'Rate limit updated', rateLimit: updated.rateLimit });
  } catch (err) {
    res.status(500).json({ message: 'Error updating limit', error: err });
  }
});
export default router;