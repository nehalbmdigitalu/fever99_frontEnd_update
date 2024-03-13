import {
    ServiceRequestService
} from "./service";
import {    
    SET_SERVICE_ORDER_LIST,
    isLoading,
} from "../../../constants/actionConstants";
import {
    toast
} from "react-toastify";

export const getItemList = (params) => async (dispatch) => {
    dispatch(isLoading(true));
    let getItemList = await ServiceRequestService.getItemList(params);
    dispatch({
        type: SET_SERVICE_ORDER_LIST,
        payload: getItemList.data,
    });
    dispatch(isLoading(false));
};

export const updateComplent = (id, params) => async (dispatch) => {
    dispatch(isLoading(true))
    let updateitemById = await ServiceRequestService.updateStatus(id, params);
    dispatch(isLoading(false))
    toast.success(updateitemById.message)
    return updateitemById
};