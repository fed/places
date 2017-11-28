// @flow
import type {Place} from '../state/types';

// This import loads the firebase namespace along with all its type information.
import * as firebase from 'firebase/app';
// These imports load individual services into the firebase namespace.
// import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyBPRRGIowUnSuuvcfaDUkaiEwbbvWTt2vM',
  authDomain: 'places-85ebe.firebaseapp.com',
  databaseURL: 'https://places-85ebe.firebaseio.com',
  projectId: 'places-85ebe',
  storageBucket: '',
  messagingSenderId: '176205663946'
};

firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();

export function getPlacesService() {
  return database
    .ref('/places')
    .once('value')
    .then(snapshot => snapshot.val());
}

export function addPlaceService(place: Place) {
  const placeId = Date.now();

  return database
    .ref('places/' + placeId)
    .set(place);
}
