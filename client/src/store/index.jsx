<<<<<<< HEAD
import { configureStore } from '@reduxjs/toolkit';
import mapReducer from './reducers/mapReducer';

const rootReducer = {
  mapbox: mapReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

=======
import { configureStore } from '@reduxjs/toolkit';
import mapReducer from './reducers/mapReducer';

const rootReducer = {
  mapbox: mapReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

>>>>>>> origin/main
export default store;