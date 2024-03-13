import { GET_SERVICES, SERVICE_REQUEST,GET_SERVICES_BY_SLUG, INSURENCE } from "../../../constants/ApplicationUrl"
import Api from "../../../dependencies/utils/Api"

export const ServiceService = {
    getItemList(params) {
        return Api.GET(GET_SERVICES).then(response => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data}
            }else {

            }
        })
    },
    getServiceDetails(id) {
        return Api.GET(`${GET_SERVICES}/${id}`).then(response => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data}
            }else {

            }
        }) 
    },
    getServiceBySlug(slug) {
        return Api.GET(`${GET_SERVICES_BY_SLUG}/${slug}`).then(response => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data}
            }else {

            }
        }) 
    },
    createOrder(params) {
        return Api.POST(SERVICE_REQUEST, params).then(response => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data, status}
            }else {

            }
        })
    },
    createInsurence(params) {
        return Api.POST(INSURENCE, params).then(response => {
            const { data: {message, status, data} = {}} = response    
            if(status) {
                return {message, data, status}
            }else {

            }
        })
    }
}