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

export const RegisterCordinator = (params) => async (dispatch) => {
    dispatch(isLoading(true));
    let save = await userService.registerCordinator(params);    
    dispatch(isLoading(false));
    return save
}


export const UpdateCordinator = (id, params) => async (dispatch) => {
    dispatch(isLoading(true));
    let update = await userService.updateUser(id, params);    
    const {status, message} = update

    if(status) {
        toast.success(message)
    }
    dispatch(isLoading(false));
    return update
}


export const getCordinatorReport = (id, params) => async (dispatch) => {
    dispatch(isLoading(true));
    let report = await userService.getCordintorReport(id, params);
    const {status, message, data} = report
    dispatch(isLoading(false));
    return data
}