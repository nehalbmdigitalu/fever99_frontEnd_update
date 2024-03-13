import { toast } from "react-toastify";
import { SET_USERS_LIST, SET_USERS_TOTAL_PAGE, isLoading } from "../../../constants/actionConstants";
import { userService } from "./service";

export const getItemList = (params) => async (dispatch) => {
    dispatch(isLoading(true));
    let getItemList = await userService.getItemList(params);
    dispatch({
        type: SET_USERS_LIST,
        payload: getItemList.data,
    });
    dispatch({
        type: SET_USERS_TOTAL_PAGE,
        payload: getItemList.totalRecord,
    })
    dispatch(isLoading(false));
};

export const RegisterUser = (params) => async (dispatch) => {
    dispatch(isLoading(true));
    let save = await userService.registerUser(params);    
    if(save.status) {
        toast.success(save.message)
    }
    dispatch(isLoading(false));
    return save
}
export const RegisterFranchise = (params) => async (dispatch) => {
    dispatch(isLoading(true));
    let save = await userService.registerFranchise(params);    
    if(save.status) {
        toast.success(save.message)
    }
    dispatch(isLoading(false));
    return save
}

export const updateFranchise = (id, params) => async (dispatch) => {
    dispatch(isLoading(true));
    let update = await userService.updateFreanchise(id, params);
    if(update.status) {
        toast.success(update.message)
    }
    dispatch(isLoading(false));
    return update
}

export const getFranchisById = (id) => async (dispatch) => {
    dispatch(isLoading(true));
    let get = await userService.getFranchiseById(id);
    
    dispatch(isLoading(false));
    return get
}


export const updateUserById = (id, params) => async (dispatch) => {
    
    dispatch(isLoading(true));
    let update = await userService.updateUserStatus(id, params);    
    if(update.status) {
        toast.success(update.message)
    }
    dispatch(isLoading(false));
    return update
}

export const getFranchiseReport = (id, params) => async (dispatch) => {
    dispatch(isLoading(true));
    let report = await userService.getFranchiseReport(id, params);
    const {status, message, data} = report
    dispatch(isLoading(false));
    return data
}
