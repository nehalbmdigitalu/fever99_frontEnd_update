import {
  SET_LOGGED_IN,
  SET_USER,
  SET_WALLET,
  SET_WALLET_TRANSACTION,
} from "../../constants/actionConstants";

const initialState = {
  user: {},
  isLogin: false,
  wallet: 0,
  transaction: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_LOGGED_IN:
      return { ...state, isLogin: action.payload };
    case SET_WALLET:
      return { ...state, wallet: action.payload };
    case SET_WALLET_TRANSACTION:
      return { ...state, transaction: action.payload };
    default:
      return state;
  }
};
