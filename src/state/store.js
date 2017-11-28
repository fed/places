// @flow
import Store from './stato';
import reducers from './reducers';
import type {Store as StoreType} from './types';

const initialState: StoreType = {
  loading: false,
  alerts: [],
  places: []
};

const store = new Store(reducers, initialState);

export default store;
