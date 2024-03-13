import { toast } from "react-toastify";
import { SET_SERVICE, isLoading } from "../../../constants/actionConstants";
import { ServiceService } from "./service";

// export const getItemList = (params) => async (dispatch) => {
//     dispatch(isLoading(true));
//     let getItemList = await ServiceService.getItemList(params);
//     dispatch({
//         type: SET_SERVICE,
//         payload: getItemList.data,
//     });
//     dispatch(isLoading(false));
// };


// this code write by me
export const getItemList = (params) => async (dispatch) => {
    dispatch(isLoading(true));
    try {
        let response = await ServiceService.getItemList(params);
        console.log("Response:", response); // Log the response to see its structure
        if (response && response.data) {
            dispatch({
                type: SET_SERVICE,
                payload: response.data,
            });
        } else {
            throw new Error("Invalid response format");
        }
        dispatch(isLoading(false));
    } catch (error) {
        console.error("Error fetching item list:", error);
        dispatch(isLoading(false));
    }
};



export const getServiceDetails = (id) => async (dispatch) => {
    dispatch(isLoading(true))

    let details = await ServiceService.getServiceDetails(id);
    dispatch(isLoading(false))
    return details
}

export const getServiceSlug = (slug) => async (dispatch) => {
    dispatch(isLoading(true))

    let details = await ServiceService.getServiceBySlug(slug);
    dispatch(isLoading(false))
    return details
}

export const createOrder = (params) => async (dispatch) => {
    dispatch(isLoading(true))
    let order = await ServiceService.createOrder(params);
    dispatch(isLoading(false))
    if(order.status) {
        toast.success(order.message)
    }else {
        toast.error(order.message)
    }
    return order

}

export const createInsurence = (params) => async (dispatch) => {
    dispatch(isLoading(true))
    let order = await ServiceService.createInsurence(params);
    dispatch(isLoading(false))
    if(order.status) {
        toast.success(order.message)
    }else {
        toast.error(order.message)
    }
    return order

}
