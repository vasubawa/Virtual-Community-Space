import { pool } from '../config/database.js';

export async function getEvents() {
  const result = await pool.query('SELECT * FROM events');
  return result.rows;
}

export async function getEventsByLocation(locationId) {
  const result = await pool.query('SELECT * FROM events WHERE location_id = $1', [locationId]);
  return result.rows;
}
