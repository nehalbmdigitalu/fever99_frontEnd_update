import api from "../../../dependencies/utils/Api";

import { SERVICE_REQUEST } from "../../../constants/ApplicationUrl";

export const ServiceRequestService = {
    getItemList(params) {
        return api.GET(`${SERVICE_REQUEST}?page=${params.page}`).then((response) => {
            const { data: {message, status, data, totalRecords,totalPages} = {}} = response    
            if(status) {
                return {message, data, totalPages, totalRecords}
            }else {

            }
        })
    },
    
    updateStatus(id,params) {
        return api.PUT(`${SERVICE_REQUEST}/${id}`,params).then((response) => {
            const { data: {message, status} = {}} = response    
            if(status) {
                return {message, status}
            }else {

            }
        })
    },
    createItem(params) {
        return api.POST(SERVICE_REQUEST, params).then((response) => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data, status}
            }else {

            }
        })
    }

}