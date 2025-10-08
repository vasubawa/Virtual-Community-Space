import dotenv from 'dotenv';
dotenv.config();
import { pool } from './database.js';

async function seedData() {
  try {
    // Clear existing data first and reset sequences
    await pool.query(`
      DELETE FROM events; 
      DELETE FROM locations;
      ALTER SEQUENCE locations_id_seq RESTART WITH 1;
      ALTER SEQUENCE events_id_seq RESTART WITH 1;
    `);
    console.log('Cleared existing data and reset sequences.');
    
    // Insert locations first
    await pool.query(`
      INSERT INTO locations (name, address, image) VALUES
        ('The Forgotten Crypt', '1 Dungeon Way', '/images/locations/crypt.jpg'),
        ('The Adventurer''s Tavern', '2 Quest Street', '/images/locations/tavern.jpg'),
        ('Wizard Tower', '3 Arcane St', '/images/locations/wizard-tower.jpg'),
        ('Dragon Lair', '4 Ember Road', '/images/locations/dragon-lair.jpg');
    `);
    console.log('Locations inserted.');
    
    // Insert events second
    await pool.query(`
      INSERT INTO events (name, description, date, location_id, image) VALUES
        ('Crypt Crawl', 'Delve into the depths of the Forgotten Crypt. Face traps, puzzles, and undead guardians. Level 1-3 adventurers recommended.', '2025-10-10 11:00:00', 1, '/images/events/crypt-crawl.jpg'),
        ('Tavern Brawl', 'Friendly competition between seasoned adventurers. Test your mettle in good-natured combat!', '2025-10-13 14:00:00', 2, '/images/events/tavern-brawl.jpg'),
        ('Wizard Duel', 'Witness a spectacular duel between two archmages atop the Wizard Tower. Magical fireworks included.', '2025-10-16 19:00:00', 3, '/images/events/wizard-duel.jpg'),
        ('Dragon Hunt', 'Join the quest to track and outwit the ancient dragon of Ember Road. Only the bravest need apply.', '2025-10-19 17:00:00', 4, '/images/events/dragon-hunt.jpg'),
        ('Crypt Puzzle Night', 'Solve ancient riddles and unlock the secrets of the crypt. Prizes for clever solutions.', '2025-10-21 15:00:00', 1, '/images/events/crypt-puzzle.jpg'),
        ('Quest Board Night', 'New adventures await! Browse available quests and form your party for upcoming dungeons.', '2025-10-24 13:00:00', 2, '/images/events/quest-board.jpg'),
        ('Arcane Workshop', 'Learn new spells and magical techniques from the tower wizards. Materials provided.', '2025-10-27 16:00:00', 3, '/images/events/wizard-workshop.jpg'),
    ('Dragon Egg Hunt', 'Search for hidden dragon eggs in the lair. Family-friendly event.', '2025-10-29 12:00:00', 4, '/images/events/dragon-eggs.jpg'),
  ('Crypt Escape', 'Timed escape room challenge in the crypt. Teams of 4-6 adventurers.', '2025-11-01 18:00:00', 1, '/images/events/crypt-escape.jpg'),
  ('Mercenary Recruitment', 'Hire skilled fighters and specialists for your next dungeon quest. Meet potential party members and negotiate contracts.', '2025-11-04 13:00:00', 2, '/images/events/mercenary-recruitment.jpg');
    `);
    console.log('Events inserted.');
    console.log('Dungeon crawler themed data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

seedData().then(() => process.exit()).catch(err => {
  console.error(err);
  process.exit(1);
});
