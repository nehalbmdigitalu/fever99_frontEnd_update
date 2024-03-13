import {  SET_E_CLIENT_TOTAL_PAGE, SET_E_CLINIC_LIST, isLoading } from "../../../constants/actionConstants";
import { CliniCRequestService } from "./service";

export const getItemList = (params) => async (dispatch) => {
    dispatch(isLoading(true));
    let getItemList = await CliniCRequestService.getItemList(params);
    dispatch({
        type: SET_E_CLINIC_LIST,
        payload: getItemList.data,
    });
    dispatch({
        type: SET_E_CLIENT_TOTAL_PAGE,
        payload: getItemList.totalRecord,
    });

    dispatch(isLoading(false));
};
