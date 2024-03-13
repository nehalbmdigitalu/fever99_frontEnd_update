import api from "../../../dependencies/utils/Api";

import { E_ELINIC_REQUEST, FORGOT_REQUEST_OTP, LOGIN, REGISTER_DOCTOR, REGISTER_EXPERT, REGISTER_USER, REQUEST_REGISTER_TOP, RESET_PASSWORD } from "../../../constants/ApplicationUrl";

export const authService = {
  doLogin(params) {
    return api.POST(LOGIN, params).then((response) => {      
      const { data: { message, status, token, user, error } = {} } = response;
      if(status) {
        return { message, status, token, user };
      }else {
        return { message, status, error };
      }
      
    })
  },

  doRegisterDoctor(params) {
    return api.POSTDATA(REGISTER_DOCTOR, params).then((response) => {
      const { data: { message, status } = {} } = response;

      return { message, status };
    });
  },
  doRegisterUser(params) {
    return api.POST(REGISTER_USER, params).then((response) => {
      const { data: { message, status } = {} } = response;

      return { message, status };
    });
  },
  doFranchiseRegister(params) {
    return api.POSTDATA(REGISTER_EXPERT, params).then((response) => {
      const { data: { message, status } = {} } = response;

      return { message, status };
    });
  },
  EcliniRequest(params) {
    return api.POST(E_ELINIC_REQUEST, params).then((response) => {
      const { data: { message, status } = {} } = response;

      return { message, status };
    });
  },
  PasswordRequestOtp(params) {
    
    return api.POST(FORGOT_REQUEST_OTP, params).then((response) => {
      const { data: { message, status } = {} } = response;

      return { message, status };
    });
  },

  ResetPassword(params) {
    
    return api.POST(RESET_PASSWORD, params).then((response) => {
      const { data: { message, status } = {} } = response;

      return { message, status };
    });
  },
  RequestOTP(params) {
    return api.POST(REQUEST_REGISTER_TOP, params).then((response) => {
      const { data: { message, status } = {} } = response;

      return { message, status };
    });    
  }

};
