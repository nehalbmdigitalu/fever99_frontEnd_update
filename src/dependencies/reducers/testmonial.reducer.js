import { SET_TESTMONIAL_LIST } from "../../constants/actionConstants";

const initialState = {
  testmonial: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TESTMONIAL_LIST:
      return { ...state, testmonial: action.payload };
    //   case SET_APPOINTMENT_TOTAL_PAGE:
    //       return {...state, ItemTotalPage: action.payload};
    default:
      return state;
  }
};
