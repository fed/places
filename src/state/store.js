// @flow
import Store from 'stato';
import reducers from './reducers';
import type { Store as StoreType } from './types';

const initialState: StoreType = {
  loading: false,
  alerts: [],
  places: []
};

export default new Store(reducers, initialState);
