import api from "../../../dependencies/utils/Api";

import { CAREER } from "../../../constants/ApplicationUrl";

export const CareerService = {
    getItemList(params) {
        return api.GET(`${CAREER}?page=${params.page}&size=${params.size}&filter=${params.filter}`, params).then((response) => {
            const { data: {message, status, data, totalRecord} = {}} = response
            if(status) {
                return {message, status, data, totalRecord}
            }else {

            }
        })
    },
}