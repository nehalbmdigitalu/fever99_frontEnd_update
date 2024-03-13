import { authService } from "./service";
import {
  SET_LOGGED_IN,
  SET_USER,
  isLoading,
} from "../../../constants/actionConstants";
import { storage } from "../../../dependencies/store/storage";
import { ROLES } from "../../../constants/role";
import { toast } from "react-toastify";

export const doLogin = (params) => async (dispatch) => {
  dispatch(isLoading(true));
  const response = await authService.doLogin(params)

  if (response) {
    const { token, user, status, message,error } = response;
    if(status && user && ROLES[user.role]) {
        storage.setUser({token: token, user: user});
        dispatch({
            type: SET_USER,
            payload: user
        });
        dispatch({
            type: SET_LOGGED_IN,
            payload: true
        });
    }else {
        toast.error(error)

        dispatch(isLoading(false));

        return {error, status}
    }

    dispatch(isLoading(false));

    return { token, user, status };
  }

  dispatch(isLoading(false));
};

export const doRegisterDoctor = (params) => async (dispatch) => {
  dispatch(isLoading(true));
  const response = await authService.doRegisterDoctor(params).catch((error) => {
    const { message = "Server Error" } = error;
    return { status: false, message: "Server Error" };
  });

  if (response) {
    const { message, status } = response;

    if (status) {
      toast.success(message);
      dispatch(isLoading(false));
      return { message, status };
    } else {
      toast.error(message);
    }
  }
  dispatch(isLoading(false));
  return response
};

export const doRegisterUser = (params) => async (dispatch) => {
  dispatch(isLoading(true));
  const response = await authService.doRegisterUser(params).catch((error) => {
    const { message = "Server Error" } = error;
    return { status: false, message: "Server Error" };
  });

  if (response) {
    const { message, status } = response;

    if (status) {
      toast.success(message);
      dispatch(isLoading(false));
      return { message, status };
    } else {
      toast.error(message);
    }
  }
  dispatch(isLoading(false));
  return response
};
export const doFranchiseRegister = (params) => async (dispatch) => {
  dispatch(isLoading(true));
  const response = await authService.doFranchiseRegister(params).catch((error) => {
    const { message = "Server Error" } = error;
    return { status: false, message: "Server Error" };
  });

  if (response) {
    const { message, status } = response;

    if (status) {
      toast.success(message);
      dispatch(isLoading(false));
      return { message, status };
    } else {
      toast.error(message);
    }
  }
  dispatch(isLoading(false));
  return response
};

export const EclinicRequest = (params) => async (dispatch) => {
  dispatch(isLoading(true))
  const eclinic = await authService.EcliniRequest(params)
  const {status, message} = eclinic
  if(status) {
    toast.success(message)

  }else{
    toast.error(message)
  }
  dispatch(isLoading(false))

  return status
}

export const PasswordRequestOtp = (params) => async (dispatch) => {
  dispatch(isLoading(true))
  const passreque = await authService.PasswordRequestOtp(params)
  const {status, message} = passreque
  if(status) {
    toast.success(message)

  }else{
    toast.error(message)
  }
  dispatch(isLoading(false))

  return status
}

export const ResetPassword = (params) => async (dispatch) => {
  dispatch(isLoading(true))
  const resetPass = await authService.ResetPassword(params)
  const {status, message} = resetPass
  if(status) {
    toast.success(message)

  }else{
    toast.error(message)
  }
  dispatch(isLoading(false))

  return status
}

export const requestRegisterOTP = (params) => async (dispatch) => {
  dispatch(isLoading(true))
  const resetPass = await authService.RequestOTP(params)
  const {status, message} = resetPass
  if(status) {
    toast.success(message)

  }else{
    toast.error(message)
  }
  dispatch(isLoading(false))

  return status
}




