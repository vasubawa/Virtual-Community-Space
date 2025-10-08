export async function getAllEvents() {
  const response = await fetch('/api/events');
  if (!response.ok) throw new Error('Failed to fetch events');
  return response.json();
}

export async function getEventsByLocation(locationId) {
  const response = await fetch(`/api/events/location/${locationId}`);
  if (!response.ok) throw new Error('Failed to fetch events for location');
  return response.json();
}
