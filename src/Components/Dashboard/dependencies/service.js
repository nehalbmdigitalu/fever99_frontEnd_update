import { ADD_WALLET, CCAVENUEINCRIPT, DASHBOARD, GET_WALLET, NOTIFICATION, STATE_CITY, STRIPE_PAYMENT_SESSION, USER_AVALIABLE_STATUS, VALIDATE_PAYMENT_STATUS } from "../../../constants/ApplicationUrl";
import api from "../../../dependencies/utils/Api";

export const WalletService = {
  getWallet(params) {
    return api.GET(GET_WALLET).then((response) => {
      const { data: {balance, transactions} = {} } = response;
      return {balance, transactions}
      
    });
  },
  setWallet(params) {
    return api.POST(ADD_WALLET, params).then((response) => {
      const { data: {wallet:{balance, transactions}, status, message} = {} } = response;
      return {balance, status, message, transactions}
    });
  },
  getDashboard(params) {
    return api.GET(DASHBOARD).then((response) => {
      const { data: {status, message, data} = {} } = response;
      return {status, message, data}
      
    });
  },
  getState() {
    return api.GET(STATE_CITY).then((response) => {
      const { data: {status, message, data} = {} } = response;
      return {status, message, data}
      
    });
  },

  //add by me
  // getState() {
  //   return api.GET(STATE_CITY).then((response) => {
  //     const { data } = response;
  
  //     if (!data) {
  //       throw new Error("Response data is undefined");
  //     }
  
  //     const { status, message } = data;
  //     const responseData = data.data;
  
  //     return { status, message, data: responseData };
  //   }).catch((error) => {
  //     console.error("Error fetching state city:", error);
  //     throw error; // re-throw the error to be caught by the caller
  //   });
  // },
  

  createPaymentSession(params) {
    return api.POST(STRIPE_PAYMENT_SESSION, params).then((response) => {
      const { data: {status, message, sessionId} = {} } = response;
      return {status, message, sessionId}
    })
  },

  encryptCCAvenueData(params) {
    return api.POST(CCAVENUEINCRIPT, params).then((response) => {
      const { data: {status, data} = {} } = response;
      return {status, data}
    })
  },

  ValidatePaymentSession(sessionId) {
    return api.GET(`${VALIDATE_PAYMENT_STATUS}?sessionId=${sessionId}`).then((response) => {
      const { data: {status, message, data} = {} } = response;
      return {status, message, data}
    })
  },

  getNotification() {
    return api.GET(NOTIFICATION).then((response) => {
      const { data: {status, message, data} = {} } = response;
      return {status, message, data}
    })
  },
  updateUserAvaliableStatus(id, params) {    
    return api.PUT(`${USER_AVALIABLE_STATUS}/${id}`, params).then((response) => {
      const { data: {status, message, data} = {} } = response;
      return {status, message, data}
    })
  }
};
