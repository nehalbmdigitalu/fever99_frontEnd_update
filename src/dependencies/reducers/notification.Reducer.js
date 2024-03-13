import { SET_NOTOFICATION } from "../../constants/actionConstants";

const initialState = {
  NotificationList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTOFICATION:
      return { ...state, NotificationList: action.payload };
    default:
      return state;
  }
};
