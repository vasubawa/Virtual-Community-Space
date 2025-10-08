
import React, { useState, useEffect } from 'react';
import Event from '../components/Event';
import { getLocationById } from '../services/LocationsAPI';
import { getEventsByLocation } from '../services/EventsAPI';
import '../css/LocationEvents.css';

const LocationEvents = ({ index }) => {
    const [location, setLocation] = useState({});
    const [events, setEvents] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const locationData = await getLocationById(index);
                setLocation(locationData);
                const eventsData = await getEventsByLocation(index);
                setEvents(eventsData);
            } catch (error) {
            }
        })();
    }, [index]);

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    {location.image && <img src={location.image} alt={location.name} />}
                </div>
                <div className='location-info'>
                    <h2>{location.name}</h2>
                    <p>{location.address}</p>
                </div>
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
                    <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                )}
            </main>
        </div>
    );
};

export default LocationEvents;