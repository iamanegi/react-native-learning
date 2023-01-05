const GOOGLE_API_KEY = "<YOUR API KEY>";

export function getMapPerview(lat, lng) {
  const staticMapPerviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return staticMapPerviewUrl;
}

export async function getAddress(lat, lng) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  const response = await fetch(url);

  let address = "";
  try {
    if (!response.ok) {
      // throw new Error("Failed to fetch address!");
      address = "Unable to fetch address.";
    }

    const data = await response.json();
    address = data.results[0].formatted_address;
  } catch (error) {
    address = "Unable to fetch address.";
  }

  return address;
}
