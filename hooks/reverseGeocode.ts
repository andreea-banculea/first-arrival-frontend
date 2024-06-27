import axios from 'axios';

export const reverseGeocode = async (latitude, longitude) => {
  const apiKey = 'AIzaSyB0M7jXkz-kFZvt1BwErw0cm2R220YD_YA';
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === 'OK') {
      const address = response.data.results[0].formatted_address;
      return address;
    } else {
      console.log('Geocoding failed:', response.data.status);
    }
  } catch (error) {
    console.log('Geocoding error:', error);
  }
};


