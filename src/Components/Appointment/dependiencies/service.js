import api from "../../../dependencies/utils/Api";

import { APPOINTMENT, MEDICINE, APPOINTMENT_HISTORY, CREATE_COMPLENT, FILEUPLOAD, GET_DOCTORS, PRESCRIPTION, APPOINTMENT_CALL_STATUS, FOLLOW_UP_SCHEDULE, PRESCRIPTION_BY_ID, PRESCRIPTION_APPOINTMENT_ID, SENDNOTIFICATION, AGORA_GENERATE_TOKEN } from "../../../constants/ApplicationUrl";

export const appointmentService = {
    getItemList(params) {
        return api.GET(`${APPOINTMENT}?page=${params.page}&size=${params.limit}&fromDate=${params.formData}&toDate=${params.toDate}&status=${params.status}`).then((response) => {
            const { data: {message, status, data, totalAppointments} = {}} = response    
            if(status) {
                return {message, data, totalAppointments}
            }else {

            }
        })
    },
    sendNotification(obj) {
        return api.POST(`${SENDNOTIFICATION}`, obj).then((response) => {
            const { data: { message, status, data } = {} } = response
            if (status) {
                return { message, data }
            } else {

            }
        })
    },

    getItemById(params) {
        return api.GET(`${APPOINTMENT}/${params}`).then((response) => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return data
            }else {
                return {}
            }
        })
    },
    getAlDoctors(params) {
        return api.GET(`${GET_DOCTORS}?page=${params.page}&limit=${params.limit}&query=${params.query}&city=${params.city}&pricesort=${params.pricesort}`, params).then((response) => {
            const { data: {message, status, data, totalItems, spacility} = {}} = response    
            if(status) {
                return {message, data, totalItems, spacility}
            }else {

            }
        })
    },
    updateStatus(id,params) {
        return api.PUT(`${APPOINTMENT}/${id}`,params).then((response) => {
            const { data: {message, status} = {}} = response    
            if(status) {
                return {message, status}
            }else {

            }
        })
    },
    updateCallStatus(id, params) {
        return api.PUT(`${APPOINTMENT_CALL_STATUS}/${id}`,params).then((response) => {
            const { data: {message, status} = {}} = response    
            if(status) {
                return {message, status}
            }else {

            }
        })
    },
    createItem(params) {
        console.log(params)
        return api.POST(APPOINTMENT, params).then((response) => {
            const { data: {message, status, appointment, amount} = {}} = response    
            if(status) {
                return {message, appointment, status, amount}
            }else {
                return {message, status}
            }
        })
    },

    fileUplaod(params) {
        return api.POSTDATA(FILEUPLOAD, params).then((response) => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data, status}
            }else {
                return {message, data, status}
            }
        })
    },
    addHistory(id, params) {
        return api.PUT(`${APPOINTMENT_HISTORY}/${id}`, params).then((response) => {
            const { data: {message, status} = {}} = response    
            if(status) {
                return {message, status}
            }else {

            }
        })
    },

    // Prescriptin
    addPrescription(params) {
        return api.POST(PRESCRIPTION, params).then((response) => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data, status}
            }else {

            }
        })
    },

    UpdatePrescription(id, params) {
        return api.PUT(`${PRESCRIPTION}/${id}`, params).then((response) => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data, status}
            }else {

            }
        })
    },

    createComplent(params) {
        return api.POST(CREATE_COMPLENT, params).then((response) => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data, status}
            }else {

            }
        })
    },

    scheduleFollowUo(id, params) {
        return api.PUT(`${FOLLOW_UP_SCHEDULE}/${id}`, params).then((response) => {
            const { data: {message, status} = {}} = response    
            if(status) {
                return {message,  status}
            }else {

            }
        })
    },

    getMedicineList(params) {
        return api.GET(`${MEDICINE}?page=${params.page}&size=${params.size}&filter=${params.filter}`).then((response) => {
            const { data: {message, status, data, totalRecord} = {}} = response    
            if(status) {
                return {message, data, totalRecord}
            }else {

            }
        })
    },

    getPrescriptionById(id) {
        return api.DOWNLOADGETPDF(`${PRESCRIPTION_BY_ID}/${id}`)
    },
    getPrescriptionAptId(id) {
        return api.DOWNLOADGETPDF(`${PRESCRIPTION_APPOINTMENT_ID}/${id}`)
    },
    agoraGeneratetoken(params) {
        return api.POST(AGORA_GENERATE_TOKEN, params).then((response) => {
            const { data: {message, status, tokenA} = {}} = response    
            if(status) {
                return {message, tokenA, status}
            }else {

            }
        })
    }
}