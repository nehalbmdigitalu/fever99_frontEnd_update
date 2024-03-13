import { SET_BLOG_LIST, SET_TEAMS_LIST, isLoading } from "../../../constants/actionConstants";
import { ServiceService } from "./service";


export const getServiceById = (id) => async (dispatch) => {
    dispatch(isLoading(true));
    let getItem = await ServiceService.getItemById(id);
    
    dispatch(isLoading(false));

    return getItem
};