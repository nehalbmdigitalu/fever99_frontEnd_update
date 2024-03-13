import { GET_DOCTOR_REPORT, GET_USERS_LIST, PIN_DOCTOR, UPDATE_DOCTOR_BY_ADMIN } from "../../../constants/ApplicationUrl"
import Api from "../../../dependencies/utils/Api"

export const userService = {
    getItemList(params) {
        console.log(params)
        return Api.GET(`${GET_USERS_LIST}/${params.role}?page=${params.page}&size=${params.size}&filter=${params.filter}&state=${params.state}&city=${params.city}`).then(response => {
            const { data: {message, status, data, totalRecord} = {}} = response    
            if(status) {
                return {message, data, totalRecord}
            }else {

            }
        })
    },

    updateDoctor(id, params) {
        return Api.PUTDATA(`${UPDATE_DOCTOR_BY_ADMIN}/${id}`, params).then(res => {
            const { data: {message, status, data} = {}} = res    
            if(status) {
                return {message, data, status}
            }else {

            }
        })
    },

    pinDoctor(id, params) {        
        return Api.PUT(`${PIN_DOCTOR}/${id}`, params).then(res => {
            const { data: {message, status} = {}} = res    
            if(status) {
                return {message, status}
            }else {

            }
        })
    },

    getDoctorReport(id, params) {
        return Api.GET(`${GET_DOCTOR_REPORT}/${id}?fromDate=${params.fromDate}&toDate=${params.toDate}&appointmentMode=${params.appointmentMode}&paymentMode=${params.paymentMode}&userType=${params.userType}`).then(res => {
            const { data: {message, status, data} = {}} = res    
            if(status) {
                return {message, status, data}
            }else {

            }
        })
    }
}