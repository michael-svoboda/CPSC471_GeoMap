<<<<<<< HEAD
const initialState = {};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MAP_DATA':
      return { ...state, [action.payload.page]: action.payload.data };
    default:
      return state;
  }
};

=======
const initialState = {};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MAP_DATA':
      return { ...state, [action.payload.page]: action.payload.data };
    default:
      return state;
  }
};

>>>>>>> origin/main
export default mapReducer;