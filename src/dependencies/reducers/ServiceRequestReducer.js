import {  SET_SERVICE_ORDER_LIST, SET_SERVICE_ORDER_TOTAL_PAGE } from '../../constants/actionConstants';

const initialState = {
    ItemList: [],
    ItemTotalPage: 0
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch(action.type) {
      case SET_SERVICE_ORDER_LIST:
          return {...state, ItemList: action.payload};
      case SET_SERVICE_ORDER_TOTAL_PAGE:
          return {...state, ItemTotalPage: action.payload};
    default:
      return state;
  }
}