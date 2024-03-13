import {IS_LOADING} from '../../constants/actionConstants';

const initialState = {
    isLoading: false
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch(action.type) {
      case IS_LOADING:
          return {...state, isLoading: action.payload};
    default:
      return state;
  }
}