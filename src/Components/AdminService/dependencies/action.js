import {  SET_SERVICE, SET_SERVICE_TOTAL_PAGE, isLoading } from "../../../constants/actionConstants";
import { TeamService } from "./service";

export const getItemList = (params) => async (dispatch) => {
    dispatch(isLoading(true));
    let getItemList = await TeamService.getItemList(params);
    dispatch({
        type: SET_SERVICE,
        payload: getItemList.data,
    });
    dispatch({
        type: SET_SERVICE_TOTAL_PAGE,
        payload: getItemList.totalRecord,
    });
    dispatch(isLoading(false));
};

export const updateItem = (id, params) => async (dispatch) => {
    dispatch(isLoading(true));
    let update = await TeamService.updateItem(id, params);
    
    dispatch(isLoading(false));
    return update
}

export const saveitem = ( params) => async (dispatch) => {
    dispatch(isLoading(true));
    let save = await TeamService.saveItem(params);    
    dispatch(isLoading(false));
    return save
}
export const deleteItem = (id) => async (dispatch) => {
    dispatch(isLoading(true))
    let deleteItem = await TeamService.deleteiitem(id);
    dispatch(isLoading(false))

    return deleteItem
}