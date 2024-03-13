import React, { useEffect, useState } from "react";
import { storage } from "../../dependencies/store/storage";
import { useDispatch } from "react-redux";
import "./paymentStatus.scss";
import {
  ValidatePaymentSession,
  addWallet,
} from "../Dashboard/dependencies/action";
import { useLocation, useNavigate } from "react-router-dom";
import { updateAppointment } from "../Appointment/dependiencies/action";

function Success() {
  const dispatch = useDispatch();
  const sessionID = storage.getPaymentSessionID();
  const [payment, setPayment] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");
  const Amount = queryParams.get("amount");
  const tracking_id = queryParams.get("tracking_id");

  // useEffect(() => {
  //   if (sessionID !== null) {
  //     dispatch(ValidatePaymentSession(sessionID)).then((res) => {
  //       const {
  //         data: { amount_total, payment_status },
  //       } = res;

  //       setPayment(res.data)
  //       const appointment = JSON.parse(sessionStorage.getItem('appointment'));

  //       if(appointment && appointment._id && payment_status == "paid") {
  //         let status = {paymentStatus: 'Paid'}

  //         dispatch(updateAppointment(appointment._id, status)).then(res => {
  //           storage.removePaymentSession();
  //         sessionStorage.removeItem('appointment')
  //           navigate('/appointments')
  //         })

  //       }

  //       if (payment_status == "paid" && !(appointment && appointment._id) ) {
  //         storage.removePaymentSession();
  //         dispatch(addWallet({ amount: amount_total / 100 })).then(res => {
  //           navigate('/dashboard')
  //         })
  //       }

  //     });

  //   }
  // }, [sessionID]);

  return (
    <>
      <div className="page-wrapper">
        <div className="content ">
          <div className="row">
            <div className="col-sm-12">
              <h4 className="page-title">Payment Status</h4>
            </div>
          </div>
          <div className="payment-status">
            <div className={`${status === "Success" ? "text-success" : "text-danger"}`}>
              {status === "Success" ? "Payment Successful" : "Payment Failed"}
            </div>
            {
              status === 'Success' && (
                <div>Tracking Id: {tracking_id}</div>
              )
            }
            <div className="amount">Amount: Rs. {Amount}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Success;
