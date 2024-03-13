import { GET_REFERAL_USER } from "../../../constants/ApplicationUrl"
import Api from "../../../dependencies/utils/Api"

export const ReferalService = {
    getItemList(params) {
        return Api.GET(GET_REFERAL_USER).then(response => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data}
            }else {

            }
        })
    }
}