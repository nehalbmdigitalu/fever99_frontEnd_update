import { SET_ADMIN_EARNINGS_LIST, SET_ADMIN_TOTAL_DOCTOR_EARNING, SET_ADMIN_TOTAL_FREANCHSIE_EARNING, SET_ADMN_EARNINGS_TOTAL } from "../../constants/actionConstants";

const initialState = {
  EarningList: [],
  totalEarnings: 0,
  totalDoctorEarning: 0,
  totalFranchiseEarning: 0,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ADMIN_EARNINGS_LIST:
      return { ...state, EarningList: action.payload };
    case SET_ADMN_EARNINGS_TOTAL:
      return { ...state, totalEarnings: action.payload };
    case SET_ADMIN_TOTAL_DOCTOR_EARNING:
      return { ...state, totalDoctorEarning: action.payload };
    case SET_ADMIN_TOTAL_FREANCHSIE_EARNING:
      return { ...state, totalFranchiseEarning: action.payload };
    default:
      return state;
  }
};
