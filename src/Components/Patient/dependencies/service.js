import { GET_USERS, REGISTER_USER,USER_UPDATE } from "../../../constants/ApplicationUrl"
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
    registerUser( params) {
        return Api.POST(REGISTER_USER, params).then(response => {
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
    }

    
}