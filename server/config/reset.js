import dotenv from 'dotenv';
dotenv.config();
import { pool } from './database.js';

async function resetTables() {
  try {
    // Create locations table first
    await pool.query(`
      CREATE TABLE IF NOT EXISTS locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address TEXT,
        image TEXT
      );
    `);
    console.log('Locations table created or already exists.');
    
    // Add image column to locations if it doesn't exist
    try {
      await pool.query(`ALTER TABLE locations ADD COLUMN IF NOT EXISTS image TEXT;`);
      console.log('Added image column to locations table (if not exists).');
    } catch (err) {
      console.log('Image column already exists in locations table.');
    }
    
    // Create events table second
    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        date TIMESTAMP,
        location_id INTEGER REFERENCES locations(id),
        image TEXT
      );
    `);
    console.log('Events table created or already exists.');
    
    // Add image column to events if it doesn't exist
    try {
      await pool.query(`ALTER TABLE events ADD COLUMN IF NOT EXISTS image TEXT;`);
      console.log('Added image column to events table (if not exists).');
    } catch (err) {
      console.log('Image column already exists in events table.');
    }
    
    console.log('All tables ready!');
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

resetTables().then(() => process.exit()).catch(err => {
  console.error(err);
  process.exit(1);
});
