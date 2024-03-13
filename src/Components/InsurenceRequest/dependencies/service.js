import { INSURENCE } from "../../../constants/ApplicationUrl"
import Api from "../../../dependencies/utils/Api"

export const CliniCRequestService = {
    getItemList(params) {
        return Api.GET(INSURENCE).then(response => {
            const { data: {message, status, data} = {}} = response
            if(status) {
                return {status, message, data}
            }else {
                return {message, status}
            }
        })
    },
    

}