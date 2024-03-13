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

export const updateDoctor = (id, params) => async (dispatch) => {
    dispatch(isLoading(true));
    let upateDoctor = await userService.updateDoctor(id, params);
    const {status, message} = upateDoctor

    if(status) {
        toast.success(message)
    }else {
        toast.error(message)
    }

    return upateDoctor
}

export const PinDoctor = (id, params) => async (dispatch) => {
    dispatch(isLoading(true));
    let pinDoctor = await userService.pinDoctor(id, params);
    const {status, message} = pinDoctor

    if(status) {
        toast.success(message)
    }else {
        toast.error(message)
    }

    return pinDoctor
}

export const getDoctorReport = (id, params) => async (dispatch) => {
    dispatch(isLoading(true));
    let report = await userService.getDoctorReport(id, params);
    const {status, message, data} = report
    dispatch(isLoading(false));
    return data
}