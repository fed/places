// @flow
import Bacon from 'baconjs';
import store from './store';
import {addPlaceService, getPlacesService} from '../services/places';
import type {Place, Alert} from './types';

// Action Types
export const SHOW_SPINNER = 'SPINNER/SHOW';
export const HIDE_SPINNER = 'SPINNER/HIDE';

export const SHOW_ALERT = 'ALERT/SHOW';
export const HIDE_ALERT = 'ALERT/HIDE';

export const RECEIVE_PLACES = 'PLACES/GET';
export const ADD_PLACE = 'PLACES/ADD';
export const REMOVE_PLACE = 'PLACES/REMOVE';
export const MARK_PLACE_AS_VISITED = 'PLACES/VISITED';

// Actions push state changes to the store via reducers
// and also trigger side effects.
export function showSpinner() {
  store.push(SHOW_SPINNER);
}

export function hideSpinner() {
  store.push(HIDE_SPINNER);
}

export function showAlert(alert: Alert) {
  store.push(SHOW_ALERT, alert);
  setTimeout(() => hideAlert(alert.id), 9000);
}

export function hideAlert(alertId: number) {
  store.push(HIDE_ALERT, alertId);
}

export function addPlace(place: Place) {
  showSpinner();

  // Call the reducer
  store.push(ADD_PLACE, place);

  // Side effect
  const addPlacePromise = addPlaceService(place);
  const placesStream = Bacon.fromPromise(addPlacePromise);

  placesStream.onValue(() => {
    hideSpinner();
    showAlert({
      id: Date.now(),
      message: 'Place added successfully',
      type: 'success'
    });
  });

  placesStream.onError(() => {
    hideSpinner();
    showAlert({
      id: Date.now(),
      message: `Couldn't add place`,
      type: 'error'
    });
  });
}

export function requestPlaces() {
  showSpinner();

  // Side effect
  const getPlacesPromise = getPlacesService();
  const placesStream = Bacon.fromPromise(getPlacesPromise);

  placesStream.onValue(response => {
    // Parse response from Firebase
    const places = Object.values(response);

    receivePlaces(places);
    hideSpinner();
    showAlert({
      id: Date.now(),
      message: 'Places retrieved successfully',
      type: 'success'
    });
  });

  placesStream.onError(() => {
    hideSpinner();
    showAlert({
      id: Date.now(),
      message: `Couldn't retrieve places from the server`,
      type: 'error'
    });
  });
}

export function receivePlaces(places: Array<Place>) {
  store.push(RECEIVE_PLACES, places);
}

export function removePlace(placeId: number) {
  store.push(REMOVE_PLACE, placeId);
}

export function markPlaceAsVisited(placeId: number) {
  store.push(MARK_PLACE_AS_VISITED, placeId);
}

export function bootstrap() {
  requestPlaces();

  // Add sample place
  setTimeout(() => {
    showAlert({ message: 'Blah', type: 'error', id: 1 });
    showAlert({ message: 'Blah', type: 'info', id: 2  });
  }, 5000);
}
