import {
    ServiceRequestService
} from "./service";
import {    
    SET_SERVICE_ORDER_LIST,
    SET_SERVICE_ORDER_TOTAL_PAGE,
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
    dispatch({
        type: SET_SERVICE_ORDER_TOTAL_PAGE,
        payload: getItemList.totalRecords
    })
    dispatch(isLoading(false));
};

export const getRecentServiceUsed = (params) => async (dispatch) => {
    dispatch(isLoading(true));
    let getItemList = await ServiceRequestService.getItemList(params);
    dispatch({
        type: SET_SERVICE_ORDER_LIST,
        payload: getItemList.data,
    });
    dispatch(isLoading(false));
};

export const updateOrder = (id, params) => async (dispatch) => {
    dispatch(isLoading(true))
    let updateitemById = await ServiceRequestService.updateStatus(id, params);
    dispatch(isLoading(false))
    toast.success(updateitemById.message)
    return updateitemById
};

export const createItem = (params) => async (dispatch) => {
    dispatch(isLoading(true))
    let createItem = await ServiceRequestService.createItem(params);
    dispatch(isLoading(false))
    toast.success(createItem.message)
    return createItem
}