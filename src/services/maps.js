import googleMaps from '@google/maps';
import { GOOGLE_MAPS_API_KEY } from '../utils/constants';
import { showAlert } from '../state/actions';

// https://googlemaps.github.io/google-maps-services-js/docs/
// https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete
// https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
const googleMapsClient = googleMaps.createClient({
  key: GOOGLE_MAPS_API_KEY,
  Promise
});

export function typeaheadSearch(searchTerm) {
  return googleMapsClient
    .geocode({ 'address': searchTerm })
    .asPromise()
    .then(response => response.json.results)
    .catch(error => showAlert(error.error_message, 'error'));
}
