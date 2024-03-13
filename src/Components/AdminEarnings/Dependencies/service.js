import { ADMIN_EARNING } from "../../../constants/ApplicationUrl"
import Api from "../../../dependencies/utils/Api"

export const EarningService = {
    getIAptList(params) {
        return Api.GET(`${ADMIN_EARNING}?page=${params.page}&fromDate=${params.fromDate}&toDate=${params.toDate}&appointmentMode=${params.appointmentMode}&paymentMode=${params.paymentMode}&userType=${params.userType}`).then(response => {
            const { data: {message, status, data, totalEarnings, totalDoctorEarning, totalFranchiseEarning} = {}} = response
            if(status) {
                return {message, data, totalEarnings, totalDoctorEarning, totalFranchiseEarning}
            }else {

            }
        })
    }
}