import { configureStore } from '@reduxjs/toolkit';
import mapReducer from './reducers/mapReducer';

const rootReducer = {
  mapbox: mapReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;