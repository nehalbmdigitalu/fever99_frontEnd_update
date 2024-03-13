import { storage } from "./store/storage";
import { SET_LOGGED_IN, SET_USER } from "../constants/actionConstants";

export const setLogin = (params) => async (dispatch) => {
    const {user, token} = storage.getUser()
    dispatch({
        type: SET_USER,
        payload: user
    });
    dispatch({
        type: SET_LOGGED_IN,
        payload: true
    });
}