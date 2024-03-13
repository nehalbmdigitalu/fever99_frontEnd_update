import {
    MedicineService
} from "./service";
import {    
    
    SET_MEDICINE_LIST,
    SET_MEDICINE_TOTAL_PAGE,
    isLoading,
} from "../../../constants/actionConstants";
import {
    toast
} from "react-toastify";

export const getMedicineList = (params) => async (dispatch) => {
    dispatch(isLoading(true));
    let getItemList = await MedicineService.getMedicineList(params);
    dispatch({
        type: SET_MEDICINE_LIST,
        payload: getItemList.data,
    });
    dispatch({
        type: SET_MEDICINE_TOTAL_PAGE,
        payload: getItemList.totalRecord,
    });
    dispatch(isLoading(false));
};

export const updateMedicine = (id, params) => async (dispatch) => {
    dispatch(isLoading(true))
    let UpdateMedicne = await MedicineService.updateMedicine(id, params);
    dispatch(isLoading(false))
    toast.success(UpdateMedicne.message)
    return UpdateMedicne
};

export const AddMedicine = (params) => async (dispatch) => {
    dispatch(isLoading(true))
    let AddMedicine = await MedicineService.AddMedicine(params);
    dispatch(isLoading(false))
    toast.success(AddMedicine.message)
    return AddMedicine
};


export const DeleteMedicine = (id) => async (dispatch) => {
    dispatch(isLoading(true))
    let deleteMedicne = await MedicineService.deleteMedicine(id);
    dispatch(isLoading(false))
    toast.success(deleteMedicne.message)
    return deleteMedicne
};