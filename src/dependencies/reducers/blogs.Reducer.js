import { SET_BLOG_LIST } from "../../constants/actionConstants";

const initialState = {
  blogList: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BLOG_LIST:
      return { ...state, blogList: action.payload };
    //   case SET_APPOINTMENT_TOTAL_PAGE:
    //       return {...state, ItemTotalPage: action.payload};
    default:
      return state;
  }
};
