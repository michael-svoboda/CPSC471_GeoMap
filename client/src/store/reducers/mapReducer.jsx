const initialState = {};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MAP_DATA':
      return { ...state, [action.payload.page]: action.payload.data };
    default:
      return state;
  }
};

export default mapReducer;