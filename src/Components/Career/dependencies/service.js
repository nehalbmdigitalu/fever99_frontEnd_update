import api from "../../../dependencies/utils/Api";

import { CAREER } from "../../../constants/ApplicationUrl";

export const CareerService = {
    addCareerItem(params) {
        return api.POSTDATA(CAREER, params).then((response) => {
            const { data: {message, status} = {}} = response
            if(status) {
                return {message, status}
            }else {

            }
        })
    },

}