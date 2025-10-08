// Events.jsx
// Page to display all events

import React, { useEffect, useState } from 'react';
import { getAllEvents } from '../services/EventsAPI';
import Event from '../components/Event';
import '../css/LocationEvents.css';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllEvents();
        setEvents(data);
      } catch (error) {
        // Optionally handle error
      }
    })();
  }, []);

  return (
    <div className='location-events'>
      <header>
        <h2>All Events</h2>
      </header>
      <main>
        {events && events.length > 0 ? (
          events.map(event => (
            <Event
              key={event.id}
              id={event.id}
              title={event.name}
              date={event.date}
              image={event.image}
              description={event.description}
            />
          ))
        ) : (
          <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events found!'}</h2>
        )}
      </main>
    </div>
  );
};

export default Events;
