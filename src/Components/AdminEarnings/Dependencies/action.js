import { toast } from "react-toastify";
import { SET_ADMIN_EARNINGS_LIST, SET_ADMIN_TOTAL_DOCTOR_EARNING, SET_ADMIN_TOTAL_FREANCHSIE_EARNING, SET_ADMN_EARNINGS_TOTAL, isLoading } from "../../../constants/actionConstants";
import { EarningService } from "./service";

export const getAptList = (params) => async (dispatch) => {
    dispatch(isLoading(true));
    let getItemList = await EarningService.getIAptList(params);
    const { data, totalEarnings, totalDoctorEarning, totalFranchiseEarning } = getItemList
    dispatch({
        type: SET_ADMIN_EARNINGS_LIST,
        payload: data,
    });
    dispatch({
        type: SET_ADMN_EARNINGS_TOTAL,
        payload: totalEarnings,
    })
    dispatch({
        type: SET_ADMIN_TOTAL_DOCTOR_EARNING,
        payload: totalDoctorEarning,
    })
    dispatch({
        type: SET_ADMIN_TOTAL_FREANCHSIE_EARNING,
        payload: totalFranchiseEarning,
    })
    
    dispatch(isLoading(false));
};