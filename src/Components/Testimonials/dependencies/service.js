import { TESTMONIAL } from "../../../constants/ApplicationUrl"
import Api from "../../../dependencies/utils/Api"

export const TeamService = {
    // getItemList(params) {
    //     return Api.GET(`${TESTMONIAL}?filter=${params.filter}`).then(response => {
    //         const { data: {message, status, data, totalRecord} = {}} = response    
    //         if(status) {
    //             return {message, data, totalRecord}
    //         }else {

    //         }
    //     })
    // },
    getItemList(params) {
        return Api.GET(TESTMONIAL).then(response => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data}
            }else {

            }
        })
    },
    updateItem(id, params) {
        return Api.PUTDATA(`${TESTMONIAL}/${id}`, params).then(response => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data, status}
            }else {

            }
        })
    },
    saveItem( params) {
        return Api.POSTDATA(TESTMONIAL, params).then(response => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data, status}
            }else {

            }
        })
    },
    deleteiitem(id) {
        return Api.DELETE(`${TESTMONIAL}/${id}`).then(response => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data, status}
            }else {

            }
        })
    }

}