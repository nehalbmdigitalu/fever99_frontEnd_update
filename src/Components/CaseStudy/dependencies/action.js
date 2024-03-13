import { SET_BLOG_LIST, SET_TEAMS_LIST, isLoading } from "../../../constants/actionConstants";
import { TeamService } from "./service";

export const getItemList = (params) => async (dispatch) => {
    dispatch(isLoading(true));
    let getItemList = await TeamService.getItemList(params);
    dispatch({
        type: SET_TEAMS_LIST,
        payload: getItemList.data,
    });
    dispatch(isLoading(false));
};
export const getItemById = (id) => async (dispatch) => {
    dispatch(isLoading(true));
    let getItem = await TeamService.getItemById(id);
    
    dispatch(isLoading(false));

    return getItem
};

export const getItemBySlug = (slug) => async (dispatch) => {
    dispatch(isLoading(true));
    let getItem = await TeamService.getItemBySlug(slug);
    
    dispatch(isLoading(false));

    return getItem
};

export const getBlogsList = (params) => async (dispatch) => {
    dispatch(isLoading(true));
    let getItemList = await TeamService.getItemList(params);
    dispatch({
        type: SET_BLOG_LIST,
        payload: getItemList.data,
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