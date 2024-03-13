import api from "../../../dependencies/utils/Api";

import { CREATE_COMPLENT } from "../../../constants/ApplicationUrl";

export const ServiceRequestService = {
    getItemList(params) {
        return api.GET(CREATE_COMPLENT, params).then((response) => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data}
            }else {

            }
        })
    },
    
    updateStatus(id,params) {
        return api.PUT(`${CREATE_COMPLENT}/${id}`,params).then((response) => {
            const { data: {message, status} = {}} = response    
            if(status) {
                return {message, status}
            }else {

            }
        })
    },
    

}