import { GET_SERVICES } from "../../../constants/ApplicationUrl"
import Api from "../../../dependencies/utils/Api"

export const TeamService = {
    getItemList(params) {
        return Api.GET(`${GET_SERVICES}?page=${params.page}&size=${params.size}&filter=${params.filter}`).then(response => {
            const { data: {message, status, data, totalRecord} = {}} = response    
            if(status) {
                return {message, data, totalRecord}
            }else {

            }
        })
    },
    updateItem(id, params) {
        return Api.PUTDATA(`${GET_SERVICES}/${id}`, params).then(response => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data, status}
            }else {

            }
        })
    },
    saveItem( params) {
        return Api.POSTDATA(GET_SERVICES, params).then(response => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data, status}
            }else {

            }
        })
    },
    deleteiitem(id) {
        return Api.DELETE(`${GET_SERVICES}/${id}`).then(response => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data, status}
            }else {

            }
        })
    }

}