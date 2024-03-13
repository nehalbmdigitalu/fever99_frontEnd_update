import { httpClient } from './dependencies/utils/Api';
import { storage } from "./dependencies/store/storage";
import { toast } from 'react-toastify';

export default {
  setupInterceptors: () => {
    httpClient.interceptors.request.use(function (config) {
      const token = storage.getJwtToken();
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    }, function (err) {
      return Promise.reject(err);
    });

    httpClient.interceptors.response.use(response => {
      return response;
    }, error => {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/login';

      }
      if (error.response && error.response.status === 403) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/login';
        // toast.error('')
      }
      // if (error.response && error.response.status === 422) {
      //   console.log(error)
      //   // toast.error(error.message)
      //   return true
      //   // if(error && error.message !== 'Request aborted' && error.message !== 'Operation canceled') {
      //   //   history.push(PATHS.SERVER_ERROR);
      //   // }
      // }
      return Promise.reject(error);
    });
  },
};
