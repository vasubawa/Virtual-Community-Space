import express from 'express';
import { getEvents, getEventsByLocation } from '../controllers/eventsController.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const events = await getEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

router.get('/location/:locationId', async (req, res) => {
  try {
    const locationId = req.params.locationId;
    const events = await getEventsByLocation(locationId);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events for location' });
  }
});

export default router;
