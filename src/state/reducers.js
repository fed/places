// const rootReducer = {};
//
// rootReducer['SPINNER/SHOW'] = state => ({ ...state, loading: true });

export default {
  // Spinner
  'SPINNER/SHOW': state => ({
    ...state,
    loading: true
  }),

  'SPINNER/HIDE': state => ({
    ...state,
    loading: false
  }),

  // Alerts
  'ALERT/SHOW': (state, alert) => {
    const alerts = state.alerts.concat([alert]);

    return { ...state, alerts };
  },

  'ALERT/HIDE': (state, alertId) => {
    const alerts = state.alerts.filter(alert => alert.id !== alertId);

    return { ...state, alerts };
  },

  // Places
  'PLACES/RECEIVE': (state, newPlaces) => {
    const places = state.places.concat(newPlaces);

    return { ...state, places };
  },

  'PLACES/REMOVE': (state, placeId) => {
    const places = state.places.filter(place => place.id !== placeId);

    return { ...state, places };
  },

  'PLACES/VISITED': (state, placeId) => {
    const places = state.places.map(place => {
      // Here we are mutating the original Place instance
      if (place.id === placeId) {
        place.visited = true;
      }

      return place;
    });

    return { ...state, places };
  }
};
