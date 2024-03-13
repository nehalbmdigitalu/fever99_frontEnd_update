import { EARNINGS } from "../../../constants/ApplicationUrl"
import Api from "../../../dependencies/utils/Api"

export const EarningService = {
    getIAptList(params) {
        return Api.GET(`${EARNINGS}?page=${params.page}&fromDate=${params.fromDate}&toDate=${params.toDate}&appointmentMode=${params.appointmentMode}&paymentMode=${params.paymentMode}&userType=${params.userType}`).then(response => {
            const { data: {message, status, data, totalEarnings, totalUpcomingEarnings} = {}} = response
            if(status) {
                return {message, data, totalEarnings, totalUpcomingEarnings}
            }else {

            }
        })
    }
}