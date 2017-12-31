// @flow
import Bacon from 'baconjs';
import store from './store';
import axios from 'axios';
import uuid from 'uuid/v1';
import type { Place, Alert } from './types';

// Actions push state changes to the store via reducers
// and also trigger side effects.
export function showSpinner() {
  store.push('SPINNER/SHOW');
}

export function hideSpinner() {
  store.push('SPINNER/HIDE');
}

export function showAlert(alert: Alert) {
  const alertWithId = { ...alert, id: uuid() };

  store.push('ALERT/SHOW', alertWithId);

  // Automatically hide alert after 9 secs
  setTimeout(() => hideAlert(alertWithId.id), 9000);
}

export function hideAlert(alertId: string) {
  store.push('ALERT/HIDE', alertId);
}

export function addPlace(place: Place) {
  showSpinner();

  // Call the reducer
  store.push('PLACES/RECEIVE', place);

  // Side effect
  const addPlacePromise = axios.post('//placelog.herokuapp.com/places', place);
  const placesStream = Bacon.fromPromise(addPlacePromise);

  placesStream.onValue(() => {
    hideSpinner();
    showAlert({
      message: 'Place added successfully',
      type: 'success'
    });
  });

  placesStream.onError(() => {
    hideSpinner();
    showAlert({
      message: `Couldn't add place`,
      type: 'error'
    });
  });
}

export function requestPlaces() {
  showSpinner();

  // Side effect
  const getPlacesPromise = axios.get('//placelog.herokuapp.com/places');
  const placesStream = Bacon.fromPromise(getPlacesPromise);

  placesStream.onValue(response => {
    const places = response.data.data.places;

    receivePlaces(places);
    hideSpinner();
    showAlert({
      message: 'Places retrieved successfully',
      type: 'success'
    });
  });

  placesStream.onError(() => {
    hideSpinner();
    showAlert({
      message: `Couldn't retrieve places from the server`,
      type: 'error'
    });
  });
}

export function receivePlaces(places: Array<Place>) {
  store.push('PLACES/RECEIVE', places);
}

export function removePlace(placeId: number) {
  store.push('PLACES/REMOVE', placeId);
}

export function markPlaceAsVisited(placeId: number) {
  store.push('PLACES/VISITED', placeId);
}
