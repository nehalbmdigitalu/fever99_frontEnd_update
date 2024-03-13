import { TEAMS } from "../../../constants/ApplicationUrl"
import Api from "../../../dependencies/utils/Api"

export const TeamService = {
    // getItemList(params) {
    //     return Api.GET(`${TEAMS}?page=${params.page}&size=${params.size}&filter=${params.filter}`).then(response => {
    //         const { data: {message, status, data, totalRecord} = {}} = response    
    //         if(status) {
    //             return {message, data, totalRecord}
    //         }else {

    //         }
    //     })
    // },
    getItemList(params) {
        return Api.GET(TEAMS).then(response => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data}
            }else {

            }
        })
    },
    updateItem(id, params) {
        return Api.PUTDATA(`${TEAMS}/${id}`, params).then(response => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data, status}
            }else {

            }
        })
    },
    saveItem( params) {
        return Api.POSTDATA(TEAMS, params).then(response => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data, status}
            }else {

            }
        })
    },
    deleteiitem(id) {
        return Api.DELETE(`${TEAMS}/${id}`).then(response => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data, status}
            }else {

            }
        })
    }

}