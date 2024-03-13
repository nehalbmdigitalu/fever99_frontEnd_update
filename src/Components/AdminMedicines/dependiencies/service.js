import api from "../../../dependencies/utils/Api";

import { MEDICINE } from "../../../constants/ApplicationUrl";

export const MedicineService = {
    getMedicineList(params) {
        return api.GET(`${MEDICINE}?page=${params.page}&size=${params.size}&filter=${params.filter}`).then((response) => {
            const { data: {message, status, data, totalRecord} = {}} = response    
            if(status) {
                return {message, data, totalRecord}
            }else {

            }
        })
    },
    
    updateMedicine(id,params) {
        return api.PUT(`${MEDICINE}/${id}`,params).then((response) => {
            const { data: {message, status} = {}} = response    
            if(status) {
                return {message, status}
            }else {

            }
        })
    },

    AddMedicine(params) {
        return api.POST(MEDICINE,params).then((response) => {
            const { data: {message, status} = {}} = response    
            if(status) {
                return {message, status}
            }else {

            }
        })
    },

    deleteMedicine(id) {
        return api.DELETE(`${MEDICINE}/${id}`).then((response) => {
            const { data: {message, status} = {}} = response    
            if(status) {
                return {message, status}
            }else {

            }
        })
    },
    

}