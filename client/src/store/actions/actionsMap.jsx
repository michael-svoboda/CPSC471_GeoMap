<<<<<<< HEAD
// Define action types
export const CACHE_MAP_DATA = 'CACHE_MAP_DATA';
export const RETRIEVE_MAP_DATA = 'RETRIEVE_MAP_DATA';


// Define action creators
export const cacheMapData = (data) => {
  return { type: CACHE_MAP_DATA, payload: data };
};

export const retrieveMapData = () => {
  return { type: RETRIEVE_MAP_DATA };
};

// Define async action to fetch and cache map data
export const fetchMapData = () => {
  return async (dispatch) => {
    try {
      // Replace this with the code to fetch Mapbox data
      const data = await fetch('https://api.mapbox.com/...', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json());

      dispatch(cacheMapData(data));
    } catch (error) {
      console.error(error);
    }
  };
};
=======
// Define action types
export const CACHE_MAP_DATA = 'CACHE_MAP_DATA';
export const RETRIEVE_MAP_DATA = 'RETRIEVE_MAP_DATA';


// Define action creators
export const cacheMapData = (data) => {
  return { type: CACHE_MAP_DATA, payload: data };
};

export const retrieveMapData = () => {
  return { type: RETRIEVE_MAP_DATA };
};

// Define async action to fetch and cache map data
export const fetchMapData = () => {
  return async (dispatch) => {
    try {
      // Replace this with the code to fetch Mapbox data
      const data = await fetch('https://api.mapbox.com/...', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json());

      dispatch(cacheMapData(data));
    } catch (error) {
      console.error(error);
    }
  };
};
>>>>>>> origin/main
