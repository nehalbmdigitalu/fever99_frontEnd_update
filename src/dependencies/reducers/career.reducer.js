import { SET_CAREER_LIST, SET_CAREER_TOTAL_NO } from "../../constants/actionConstants";

const initialState = {
  careerlist: [],
  careerTotal: 0
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CAREER_LIST:
      return { ...state, careerlist: action.payload };
      case SET_CAREER_TOTAL_NO:
          return {...state, careerTotal: action.payload};
    default:
      return state;
  }
};
