import { toast } from "react-toastify";
import { userDeleteService } from "./service";
import { isLoading } from "../../../constants/actionConstants";

export const deleteUser = (params) => async (dispatch) => {
    dispatch(isLoading(true));
    let getItemList = await userDeleteService.deleteUser();

    const {status, message} = getItemList;

    toast.success(message)
    dispatch(isLoading(false));
};
