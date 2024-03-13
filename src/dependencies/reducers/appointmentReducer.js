import { SET_APPOINTMENT_LIST, SET_APPOINTMENT_TOTAL_PAGE } from '../../constants/actionConstants';

const initialState = {
    ItemList: [],
    ItemTotalPage: 0
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch(action.type) {
      case SET_APPOINTMENT_LIST:
          return {...state, ItemList: action.payload};
      case SET_APPOINTMENT_TOTAL_PAGE:
          return {...state, ItemTotalPage: action.payload};
    default:
      return state;
  }
}