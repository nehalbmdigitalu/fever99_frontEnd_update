import { GET_FRANCHISE_BY_ID, GET_FRANCHISE_REPORT, GET_USERS_LIST, REGISTER_EXPERT, UPDATE_EXPERt, UPDATE_USER_BY_ID,  } from "../../../constants/ApplicationUrl"
import Api from "../../../dependencies/utils/Api"

export const userService = {
    getItemList(params) {
        return Api.GET(`${GET_USERS_LIST}/${params.role}?page=${params.page}&size=${params.size}&filter=${params.filter}&state=${params.state}&city=${params.city}`).then(response => {
            const { data: {message, status, data, totalRecord} = {}} = response    
            if(status) {
                return {message, data, totalRecord}
            }else {

            }
        })
    },
    registerUser( params) {
        return Api.POST(REGISTER_EXPERT, params).then(response => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data, status}
            }else {

            }
        })
    },

    registerFranchise( params) {
        return Api.POSTDATA(REGISTER_EXPERT, params).then(response => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data, status}
            }else {

            }
        })
    },

    updateFreanchise(id, params) {
        return Api.PUTDATA(`${UPDATE_EXPERt}/${id}`, params).then(response => {
            const { data: {message, status} = {}} = response
            if(status) {
                return {message, status}
            }else {

            }
        })
    },

    getFranchiseById(id) {
        return Api.GET(`${GET_FRANCHISE_BY_ID}/${id}`).then(response => {
            const { data: {message, status, data, extraDetails} = {}} = response
            if(status) {
                return {message, status, data, extraDetails}
            }else {

            }
        })
    },  

    updateUserStatus( id, params) {
        return Api.PUT(`${UPDATE_USER_BY_ID}/${id}`, params).then(response => {
            const { data: {message, status} = {}} = response    
            if(status) {
                return {message, status}
            }else {

            }
        })
    },

    getFranchiseReport(id, params) {
        return Api.GET(`${GET_FRANCHISE_REPORT}/${id}?fromDate=${params.fromDate}&toDate=${params.toDate}&appointmentMode=${params.appointmentMode}&paymentMode=${params.paymentMode}&userType=${params.userType}`).then(res => {
            const { data: {message, status, data} = {}} = res    
            if(status) {
                return {message, status, data}
            }else {

            }
        })
    }
}