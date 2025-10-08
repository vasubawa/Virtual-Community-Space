import express from 'express';
import { getLocations, getLocationById } from '../controllers/locationsController.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const locations = await getLocations();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const location = await getLocationById(req.params.id);
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch location' });
  }
});

export default router;
