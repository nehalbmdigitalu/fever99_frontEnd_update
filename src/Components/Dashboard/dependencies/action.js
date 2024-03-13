import { SET_DASHBOARD, SET_NOTOFICATION, SET_STATE_CITY, SET_WALLET, SET_WALLET_TRANSACTION, isLoading } from "../../../constants/actionConstants";
import { WalletService } from "./service";
import {storage} from '../../../dependencies/store/storage'

export const getWallet = (params) => async (dispatch) => {
  let getWallet = await WalletService.getWallet(params);
  dispatch({
    type: SET_WALLET,
    payload: getWallet.balance,
  });
};

export const addWallet = (params) => async (dispatch) => {
  dispatch(isLoading(true));
  let addWallet = await WalletService.setWallet(params);
  dispatch({
    type: SET_WALLET,
    payload: addWallet.balance,
  });

  dispatch({
    type: SET_WALLET_TRANSACTION,
    payload: addWallet.transactions
  })

  dispatch(isLoading(false))

  return addWallet
}

export const getTransactionList = (params) => async (dispatch) => {
  let getWallet = await WalletService.getWallet(params);
  dispatch({
    type: SET_WALLET,
    payload: getWallet.balance,
  });
  dispatch({
    type: SET_WALLET_TRANSACTION,
    payload: getWallet.transactions
  })
};

export const getDashboard = (params) => async (dispatch) => {
  dispatch(isLoading(true))
  let dashboard = await WalletService.getDashboard(params);
  console.log(dashboard)
  if(dashboard && dashboard.data) {
    dispatch({
      type: SET_DASHBOARD,
      payload: dashboard.data,
    });
    const {transaction} = dashboard.data
    if(transaction) {
      dispatch({
        type: SET_WALLET_TRANSACTION,
        payload: transaction,
      });
    }
  }
  
  dispatch(isLoading(false))
  
};

export const getStateCity = () => async (dispatch) => {
  dispatch(isLoading(true))
  let StateCity = await WalletService.getState();

  dispatch({
    type: SET_STATE_CITY,
    payload: StateCity.data,
  });

  dispatch(isLoading(false))

}

export const createPaymentSession = (params) => async (dispatch) => {
  dispatch(isLoading(true))
  let paymentSession = await WalletService.createPaymentSession(params);

  storage.setPaymentSessionID(paymentSession.sessionId)

  dispatch(isLoading(false))

  return paymentSession

}

export const encryptCCAvenueData = (params) => async (dispatch) => {
  dispatch(isLoading(true))
  let ccAvenueEncrypt = await WalletService.encryptCCAvenueData(params);

  dispatch(isLoading(false))

  return ccAvenueEncrypt
}

export const ValidatePaymentSession = (sessionId) => async (dispatch) => {
  dispatch(isLoading(true))
  let validateStatus = await WalletService.ValidatePaymentSession(sessionId);

  dispatch(isLoading(false))

  return validateStatus

}

export const getNotification = () => async (dispatch) => {
  dispatch(isLoading(true))

  let validateStatus = await WalletService.getNotification();
  dispatch({
    type: SET_NOTOFICATION,
    payload: validateStatus.data
  })

  dispatch(isLoading(false))

  return validateStatus

}

export const updateUserAvaliableStatus = (id, params) => async (dispatch) => {
  dispatch(isLoading(true))

  let userStatus = await WalletService.updateUserAvaliableStatus(id, params)

  dispatch(isLoading(false))

  const {data} = userStatus

  let user = storage.getUser()
  user.user = data

  storage.setUser(user)
  
}