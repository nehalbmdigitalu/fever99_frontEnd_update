import React, { useEffect, useState } from "react";
import { storage } from "../../dependencies/store/storage";
import { useDispatch } from "react-redux";
import './paymentStatus.scss'
import {
  ValidatePaymentSession,
  addWallet,
} from "../Dashboard/dependencies/action";
import { useNavigate } from "react-router-dom";

function Cancel() {
  

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-sm-12">
              <h4 className="page-title">Payment Canceled</h4>
            </div>
          </div>
          <div className="payment-status">
            <p>We're sorry, but your payment has been canceled. No charges have been made to your account. If you have any questions or need assistance, please contact our support team. </p>
            <p>Thank you for considering our services. We hope to assist you in the future.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cancel;
