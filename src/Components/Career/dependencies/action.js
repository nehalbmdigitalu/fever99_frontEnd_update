import {
    CareerService
} from "./service";
import {    
    SET_SERVICE_ORDER_LIST,
    isLoading,
} from "../../../constants/actionConstants";
import {
    toast
} from "react-toastify";

export const addCareerItem = (params) => async (dispatch) => {
    dispatch(isLoading(true));
    let getItemList = await CareerService.addCareerItem(params);
    
    dispatch(isLoading(false));

    return getItemList
};
