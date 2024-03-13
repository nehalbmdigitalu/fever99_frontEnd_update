import {
    CareerService
} from "./service";
import {
    
    SET_CAREER_LIST,
    SET_CAREER_TOTAL_NO,
    isLoading,
} from "../../../constants/actionConstants";
import {
    toast
} from "react-toastify";

export const getItemList = (params) => async (dispatch) => {
    dispatch(isLoading(true));
    let getItemList = await CareerService.getItemList(params);
    dispatch({
        type: SET_CAREER_LIST,
        payload: getItemList.data,
    });
    dispatch({
        type: SET_CAREER_TOTAL_NO,
        payload: getItemList.totalRecord,
    });
    dispatch(isLoading(false));
};
