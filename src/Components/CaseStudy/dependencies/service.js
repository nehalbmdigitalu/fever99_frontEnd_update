import { CASR_STUDY, BLOG } from "../../../constants/ApplicationUrl"
import Api from "../../../dependencies/utils/Api"

export const TeamService = {
    getItemList(params) {
        return Api.GET(CASR_STUDY).then(response => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data}
            }else {

            }
        })
    },
    getItemById(id) {
        return Api.GET(`${CASR_STUDY}/${id}`).then(response => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data}
            }else {

            }
        })
    },
    getItemBySlug(slug) {
        return Api.GET(`${BLOG}/${slug}`).then(response => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data}
            }else {

            }
        })
    },
    updateItem(id, params) {
        return Api.PUTDATA(`${CASR_STUDY}/${id}`, params).then(response => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data, status}
            }else {

            }
        })
    },
    saveItem( params) {
        return Api.POSTDATA(CASR_STUDY, params).then(response => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data, status}
            }else {

            }
        })
    },
    deleteiitem(id) {
        return Api.DELETE(`${CASR_STUDY}/${id}`).then(response => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data, status}
            }else {

            }
        })
    }

}