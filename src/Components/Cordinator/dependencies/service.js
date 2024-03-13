import { GET_USERS, REGISTER_CORDINATOR, USER_UPDATE,GET_FRANCHISE_REPORT } from "../../../constants/ApplicationUrl"
import Api from "../../../dependencies/utils/Api"

export const userService = {
    getItemList(params) {
        return Api.GET(`${GET_USERS}/${params.role}?filter=${params.filter}`).then(response => {
            const { data: {message, status, data, totalRecord} = {}} = response    
            if(status) {
                return {message, data, totalRecord}
            }else {

            }
        })
    },
    registerCordinator( params) {
        return Api.POST(REGISTER_CORDINATOR, params).then(response => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data, status}
            }else {

            }
        })
    },

    updateUser(id, params) {        
        return Api.PUT(`${USER_UPDATE}/${id}`, params).then(response => {
            const { data: {message, status} = {}} = response    
            if(status) {
                return {message, status}
            }else {

            }
        })
    },
    getCordintorReport(id, params) {
        return Api.GET(`${GET_FRANCHISE_REPORT}/${id}?fromDate=${params.fromDate}&toDate=${params.toDate}`).then(res => {
            const { data: {message, status, data} = {}} = res    
            if(status) {
                return {message, status, data}
            }else {

            }
        })
    }
}