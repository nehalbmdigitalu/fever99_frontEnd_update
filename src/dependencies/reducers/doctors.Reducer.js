import { SET_DOCTORS_LIST, SET_DOCTOR_SPACILITY, SET_DOCTOR_TOTAL_PAGE } from "../../constants/actionConstants";

const initialState = {
  ItemList: [],
  ItemTotalPage: 0,
  Spacility: []
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DOCTORS_LIST:
      return { ...state, ItemList: action.payload };
      case SET_DOCTOR_TOTAL_PAGE:
          return {...state, ItemTotalPage: action.payload};
      case SET_DOCTOR_SPACILITY:
          return {...state, Spacility: action.payload}
    default:
      return state;
  }
};
