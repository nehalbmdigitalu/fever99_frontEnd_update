import axios from 'axios';

export const httpClient = axios.create();
httpClient.defaults.timeout = 5 * 60 * 1000;


const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    }
};

const configData = {
    headers: {
        'Content-Type': 'multipart/form-data',
        "Access-Control-Allow-Origin": "*"
    }
}
const downloadHeader = {
    headers: {
        'Accept': 'text/csv',
        "Access-Control-Allow-Origin": "*"
    }
}
const downloadHeaderPDF = {
    headers: {
        'Accept': 'text/pdf',
        "Access-Control-Allow-Origin": "*"
    }
}
const downloadHeaderEXCEL = {
    headers: {
        'Accept': 'text/xlsx',
        "Access-Control-Allow-Origin": "*"
    }
}
class Api {
    POST(url, payload = {}, config = axiosConfig) {
        return httpClient.post(url, payload, config).catch(function (error) {
            // console.log(error)
            // return error && error.response
        });
    }

    GET(url, config = axiosConfig) {
        return httpClient.get(url, config).catch(function (error) {
        });
    }

    POSTDATA(url, payload = {}, config = configData) {
        return httpClient.post(url, payload, config).catch(function (error) {
        });
    }

    DELETE(url, config = axiosConfig) {
        return httpClient.delete(url, config).catch(function (error) {

        });
    }
    PUT(url, payload = {}, config = axiosConfig) {
        return httpClient.put(url, payload, config).catch(function (error) {

        });
    }
    PUTDATA(url, config = configData) {
        return httpClient.put(url, config).catch(function (error) {

        });
    }
    DOWNLOADDATA(url, payload = {}, config = downloadHeader) {
        return httpClient.post(url, payload, config).catch(function (error) {

        })
    }

    DOWNLOADGETCSV(url, config = downloadHeader) {
        return httpClient.get(url, config).catch(function (error) {

        })
    }
    DOWNLOADGETPDF(url, config = downloadHeaderPDF) {
        return httpClient({
            url: url,
            method: 'GET',
            responseType: 'blob',
            headers: {
                'Accept': 'text/pdf',
                "Access-Control-Allow-Origin": "*"
            }
        })
    }

    DOWNLOADGETEXCEL(url, config = downloadHeaderEXCEL) {
        return httpClient.get(url, config).catch(function (error) {

        })
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Api();