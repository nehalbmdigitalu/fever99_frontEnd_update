import { SET_MEDICINE_LIST, SET_MEDICINE_TOTAL_PAGE } from "../../constants/actionConstants";

const initialState = {
  medicineList: [],
  MedicineTotal: 0
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MEDICINE_LIST:
      return { ...state, medicineList: action.payload };
      case SET_MEDICINE_TOTAL_PAGE:
          return {...state, MedicineTotal: action.payload};
    default:
      return state;
  }
};
