import { toast } from "react-toastify";
import { SET_USER, isLoading } from "../../../constants/actionConstants";
import { storage } from "../../../dependencies/store/storage";
import { ProfileService } from "./service";

export const updateProfile = (params) => async (dispatch) => {
  dispatch(isLoading(true));
  let updateUser = await ProfileService.updateProfile(params);

  let user = {token: storage.getJwtToken(), user: updateUser.data}

  storage.setUser(user)
  
  dispatch({
    type: SET_USER,
    payload: updateUser.data,
  });

  toast.success(updateUser.message)

  dispatch(isLoading(false));

};

export const updateSlot = (params) => async (dispatch) => {
  dispatch(isLoading(true));
  let updateUser = await ProfileService.updateSlot(params);
  const {status, message, data} = updateUser
  if(status) {
    toast.success(message)
  }else {
    toast.error(message)
  }

  let user = {token: storage.getJwtToken(), user: data}

  storage.setUser(user)
  
  dispatch({
    type: SET_USER,
    payload: updateUser.data,
  });

  dispatch(isLoading(false));

};

export const passwordChange = (params) => async (dispatch) => {
  dispatch(isLoading(true));
  let passwordCha = await ProfileService.passwordChange(params);

  toast.success(passwordCha.message)

  dispatch(isLoading(false));

};