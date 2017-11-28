// @flow

export type LatLng = {
  lat: number,
  lng: number
};

export type Place = {
  name: string,
  description: string,
  country: string,
  coords: LatLng
};

export type Alert = {
  id: number,
  message: string,
  type: 'success' | 'error' | 'info'
};

export type Store = {
  loading: boolean,
  alerts: Array<Alert>,
  places: Array<Place>
};

export type GooglePlacesAddress = {
  long_name: string,
  short_name: string,
  types: Array<string>
};

export type GooglePlacesSuggestion = {
  address_components: Array<GooglePlacesAddress>,
  formatted_address: string,
  geometry: {
    location: LatLng,
    location_type: string,
    viewport: {
      northeast: LatLng,
      southwest: LatLng
    }
  },
  place_id: string,
  types: Array<string>
};
