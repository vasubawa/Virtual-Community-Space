export async function getAllLocations() {
  const response = await fetch('/api/locations');
  if (!response.ok) throw new Error('Failed to fetch locations');
  return response.json();
}

export async function getLocationById(id) {
  const response = await fetch(`/api/locations/${id}`);
  if (!response.ok) throw new Error('Failed to fetch location');
  return response.json();
}
