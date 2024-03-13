import { DELETE_USER } from "../../../constants/ApplicationUrl"
import Api from "../../../dependencies/utils/Api"

export const userDeleteService = {
    deleteUser(params) {
        return Api.POST(DELETE_USER).then(response => {
            const { data: {message, status} = {}} = response    
            if(status) {
                return {message, status}
            }else {

            }
        })
    }
}