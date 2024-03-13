import {  SET_E_CLIENT_TOTAL_PAGE, SET_E_CLINIC_LIST } from "../../constants/actionConstants";

const initialState = {
  ItemList: [],
  ItemTotalPage: 0
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_E_CLINIC_LIST:
      return { ...state, ItemList: action.payload };
      case SET_E_CLIENT_TOTAL_PAGE:
          return {...state, ItemTotalPage: action.payload};
    default:
      return state;
  }
};
