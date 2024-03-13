import {
  SET_EARNINGS_LIST,
  SET_EARNINGS_TOTAL,
  SET_UPCOMMING_EARNINGS_TOTAL,
} from "../../constants/actionConstants";

const initialState = {
  EarningList: [],
  totalEarning: 0,
  upCommingEarning: 0,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EARNINGS_LIST:
      return { ...state, EarningList: action.payload };
    case SET_EARNINGS_TOTAL:
      return { ...state, totalEarning: action.payload };
    case SET_UPCOMMING_EARNINGS_TOTAL:
      return { ...state, upCommingEarning: action.payload };
    default:
      return state;
  }
};
