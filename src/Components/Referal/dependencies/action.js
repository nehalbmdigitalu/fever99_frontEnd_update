import {  SET_REFERAL_USER, isLoading } from "../../../constants/actionConstants";
import { ReferalService } from "./service";

export const getItemList = (params) => async (dispatch) => {
    dispatch(isLoading(true));
    let getItemList = await ReferalService.getItemList(params);
    dispatch({
        type: SET_REFERAL_USER,
        payload: getItemList.data,
    });
    dispatch(isLoading(false));
};