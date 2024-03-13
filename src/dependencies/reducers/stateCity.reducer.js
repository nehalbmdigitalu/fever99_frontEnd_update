import { SET_STATE_CITY } from "../../constants/actionConstants";

const initialState = {
  stateList: [],
  // ItemTotalPage: 0
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_STATE_CITY:
      return { ...state, stateList: action.payload };
    //   case SET_APPOINTMENT_TOTAL_PAGE:
    //       return {...state, ItemTotalPage: action.payload};
    default:
      return state;
  }
};
