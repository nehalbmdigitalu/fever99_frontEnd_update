import { SET_DASHBOARD } from "../../constants/actionConstants";

const initialState = {
  dashboard: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DASHBOARD:
      return { ...state, dashboard: action.payload };
    default:
      return state;
  }
};
