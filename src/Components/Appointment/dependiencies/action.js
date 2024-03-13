import {
    appointmentService
} from "./service";
import {
    SET_APPOINTMENT_LIST,
    SET_APPOINTMENT_TOTAL_PAGE,
    SET_DOCTORS_LIST,
    SET_DOCTOR_SPACILITY,
    SET_DOCTOR_TOTAL_PAGE,
    isLoading,
} from "../../../constants/actionConstants";
import {
    toast
} from "react-toastify";

export const getItemList = (params) => async (dispatch) => {
    dispatch(isLoading(true));
    let getItemList = await appointmentService.getItemList(params);
    dispatch({
        type: SET_APPOINTMENT_LIST,
        payload: getItemList.data,
    });
    dispatch({
        type: SET_APPOINTMENT_TOTAL_PAGE,
        payload: getItemList.totalAppointments
    })
    dispatch(isLoading(false));
};

export const getItemListWithLoader = (params) => async (dispatch) => {
    let getItemList = await appointmentService.getItemList(params);
    dispatch({
        type: SET_APPOINTMENT_LIST,
        payload: getItemList.data,
    });
    dispatch({
        type: SET_APPOINTMENT_TOTAL_PAGE,
        payload: getItemList.totalAppointments
    })
};

export const sendNotificationObj = (params) => async (dispatch) => {
    dispatch(isLoading(true));
    let notification = await appointmentService.sendNotification(params);
    
    dispatch(isLoading(false));

};

export const getItemById = (params) => async (dispatch) => {
    dispatch(isLoading(true))
    
    let item = await appointmentService.getItemById(params);

    dispatch(isLoading(false))

    return item
}

export const getDoctorList = (params) => async (dispatch) => {
    dispatch(isLoading(true));
    let getDoctors = await appointmentService.getAlDoctors(params);
    dispatch({
        type: SET_DOCTORS_LIST,
        payload: getDoctors.data,
    });
    dispatch({
        type: SET_DOCTOR_TOTAL_PAGE,
        payload: getDoctors.totalItems,
    });
    dispatch({
        type: SET_DOCTOR_SPACILITY,
        payload: getDoctors.spacility,
    });
    dispatch(isLoading(false));
};

export const updateAppointment = (id, params) => async (dispatch) => {
    dispatch(isLoading(true))
    let updateitemById = await appointmentService.updateStatus(id, params);
    dispatch(isLoading(false))
    toast.success(updateitemById.message)
    return updateitemById
};

export const updateCallStatus = (id, params) => async (dispatch) => {
    dispatch(isLoading(true))
    let updateitemCAll = await appointmentService.updateCallStatus(id, params);
    dispatch(isLoading(false))
};

export const createItem = (params) => async (dispatch) => {
    dispatch(isLoading(true))
    let createItem = await appointmentService.createItem(params);
    if(createItem && createItem.status) {
        // toast.success(createItem.message)
    }else {
        toast.error(createItem.message)
    }

    dispatch(isLoading(false))
    
    return createItem
}

export const fileUpload = (params) => async (dispatch) => {
    dispatch(isLoading(true))
    let fileUp = await appointmentService.fileUplaod(params);
    dispatch(isLoading(false))
    if(fileUp.status) {
        toast.success(fileUp.message)
    }else {
        toast.error(fileUp.message)
    }
    
    return fileUp
}

export const addHistory = (id, params) => async (dispatch) => {

    await appointmentService.addHistory(id, params);
}

export const addPrescription = (params) => async (dispatch) => {
    dispatch(isLoading(true))
    let createPresc = await appointmentService.addPrescription(params);
    console.log(createPresc);
    dispatch(isLoading(false))
    toast.success(createPresc.message)
    return createPresc
}


export const UpdatePrescription = (id, params) => async (dispatch) => {
    dispatch(isLoading(true))
    let UpdatePresc = await appointmentService.UpdatePrescription(id, params);
    dispatch(isLoading(false))
    toast.success(UpdatePresc.message)
    return UpdatePresc
}

export const createComplet = (params) => async (dispatch) => {
    dispatch(isLoading(true))
    let CreateComplet = await appointmentService.createComplent(params);
    dispatch(isLoading(false))
    toast.success(CreateComplet.message)
    return CreateComplet
}

export const ScheduleFollowUp = (id, params) => async (dispatch) => {
    dispatch(isLoading(true))
    let CreateComplet = await appointmentService.scheduleFollowUo(id, params);
    dispatch(isLoading(false))
    toast.success(CreateComplet.message)
    return CreateComplet
}

export const getMedicineList = ( params) => async (dispatch) => {

    let Medicine = await appointmentService.getMedicineList(params);
    const {data} = Medicine
    const newMediccinList = data.map(item => ({
        label: `${item.name} (${item.combination})`,
        value: `${item.name} (${item.combination})`
      }));
      
    return newMediccinList
}

export const prescriptionById = ( id ) => async (dispatch) => {
    dispatch(isLoading(true))
    let Pres = await appointmentService.getPrescriptionById(id)
    dispatch(isLoading(false))
    return Pres
}

export const prescriptionAppointmentId = ( id ) => async (dispatch) => {
    dispatch(isLoading(true))
    let Pres = await appointmentService.getPrescriptionAptId(id)

    dispatch(isLoading(false))
    return Pres
}
export const VideoCallToken = ( params ) => async (dispatch) => {
    dispatch(isLoading(true))
    let Pres = await appointmentService.agoraGeneratetoken(params)

    dispatch(isLoading(false))
    return Pres
}
