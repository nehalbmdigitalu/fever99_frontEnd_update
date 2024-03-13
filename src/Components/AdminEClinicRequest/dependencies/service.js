import { E_ELINIC_REQUEST } from "../../../constants/ApplicationUrl"
import Api from "../../../dependencies/utils/Api"

export const CliniCRequestService = {
    getItemList(params) {
        return Api.GET(`${E_ELINIC_REQUEST}?page=${params.page}&size=${params.size}`).then(response => {
            const { data: {message, status, data, totalRecord} = {}} = response    
            if(status) {
                return {status, message, data, totalRecord}
            }else {
                return {message, status}
            }
        })
    },
    

}