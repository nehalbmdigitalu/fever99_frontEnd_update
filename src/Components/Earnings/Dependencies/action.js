import { toast } from "react-toastify";
import { SET_EARNINGS_LIST, SET_EARNINGS_TOTAL, SET_UPCOMMING_EARNINGS_TOTAL, isLoading } from "../../../constants/actionConstants";
import { EarningService } from "./service";

export const getAptList = (params) => async (dispatch) => {
    dispatch(isLoading(true));
    let getItemList = await EarningService.getIAptList(params);
    dispatch({
        type: SET_EARNINGS_LIST,
        payload: getItemList.data,
    });
    dispatch({
        type: SET_EARNINGS_TOTAL,
        payload: getItemList.totalEarnings,
    })
    dispatch({
        type: SET_UPCOMMING_EARNINGS_TOTAL,
        payload: getItemList.totalUpcomingEarnings,
    })
    
    dispatch(isLoading(false));
};