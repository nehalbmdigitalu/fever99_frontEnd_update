import { GET_SERVICES } from "../../../constants/ApplicationUrl"
import Api from "../../../dependencies/utils/Api"

export const ServiceService = {
    
    getItemById(id) {
        return Api.GET(`${GET_SERVICES}/${id}`).then(response => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data}
            }else {

            }
        })
    },
    

}