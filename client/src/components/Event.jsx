import React, { useState, useEffect } from 'react'
import '../css/Event.css'

const Event = (props) => {

    const event = {
        id: props.id,
        title: props.title,
        date: props.date,
        image: props.image,
        description: props.description
    }
    
        function formatEventDate(dateString) {
            const date = new Date(dateString);
            const options = { month: 'short', day: 'numeric' };
            const monthDay = date.toLocaleDateString(undefined, options);
            let hours = date.getHours();
            const minutes = date.getMinutes();
            const ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12;
            return `${monthDay} @ ${hours}${minutes === 0 ? '' : ':' + minutes}${ampm}`;
        }

    return (
        <article className='event-information'>
            <img src={event.image} alt={event.title} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{event.title}</h3>
                        <p><i className="fa-regular fa-calendar fa-bounce"></i> {formatEventDate(event.date)}</p>
                    <p>{event.description}</p>
                </div>
            </div>
        </article>
    )
}

export default Event