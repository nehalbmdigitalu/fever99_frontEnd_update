import { PASSWORD_CHANGE, UPDATE_DOCTOR, UPDATE_DOCTOR_SLOT } from "../../../constants/ApplicationUrl";
import api from "../../../dependencies/utils/Api";

export const ProfileService = {
  
  updateProfile(params) {
    return api.PUTDATA(UPDATE_DOCTOR, params).then((response) => {
      const { data: {data, status, message} = {} } = response;
      return {data, status, message}
    });
  },
  updateSlot(params) {
    return api.PUT(UPDATE_DOCTOR_SLOT, params).then((response) => {
      const { data: {status, message, data} = {} } = response;
      return {status, message, data}
    });
    
  },
  passwordChange(params) {
    return api.PUT(PASSWORD_CHANGE, params).then((response) => {
      const { data: {status, message} = {} } = response;
      return {status, message}
    });
  }
};
