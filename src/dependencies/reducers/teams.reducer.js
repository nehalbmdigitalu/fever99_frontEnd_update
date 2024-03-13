import { SET_TEAMS_LIST, SET_TEAMS_LIST_TOTAL_PAGE } from '../../constants/actionConstants';

const initialState = {
    ItemList: [],
    TeamList: [],
    ItemTotalPage: 0
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch(action.type) {
      case SET_TEAMS_LIST:
          return {...state, ItemList: action.payload, TeamList: action.payload};
      case SET_TEAMS_LIST_TOTAL_PAGE:
          return {...state, ItemTotalPage: action.payload};
    default:
      return state;
  }
}