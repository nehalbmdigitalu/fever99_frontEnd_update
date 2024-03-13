import React from "react";
import { Link, useParams } from "react-router-dom";

import MainHeader from "../common/MainHeader";
import MainFooter from "../common/MainFooter";

function Refuncpolicy() {
  return (
    <>
      <MainHeader />
      <main id="main">
        <div class="breadcrumbs">
          <nav>
            <div class="container">
              <ol>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>Cancellation & Refund Policy</li>
              </ol>
            </div>
          </nav>
        </div>
        <section id="about" class="about">
          <div class="container" >
            <h3>Cancellation & Refund Policy:</h3>
            <ul>
              <li>
                ️Fever99.com will refund full amount for cancellation of an
                appointment if cancellation is done 6 hours before the scheduled
                time. If the appointment is cancelled within 6 hours of the
                scheduled time then no refund would be provided
              </li>
              <li>
                The appointment can be rescheduled till 1 hour before the
                appointment time at no extra cost by calling the customer care.
                If the appointment is rescheduled then it can not be cancelled
                anytime. However, the appointment can be rescheduled maximum 2
                times.
              </li>
              <li>
                In case of refund, Your money would be refunded to your account
                by reversal of transaction as per the payment mode within 15
                working days of the cancellation of an appointment
              </li>
              <li>
                For any delay in refunding the money due to unforeseen
                conditions beyond the control of Fever99 E-clinic. Fever99
                Eclinic would not be liable to pay any extra amount as
                compensation for delay
              </li>
              <b>Contact Details:</b>
              <p>
                Visit us at: Fever99 E-clinic, Shriram Complex,Near SPR Society
                ,Sector 82 Faridabad,Haryana Website: https://www.fever99.com
              </p>
              <p>Email: info@fever99.com</p>
              <p>M:+91 6262808062</p>
            </ul>
          </div>
        </section>

        <MainFooter />
      </main>
    </>
  );
}

export default Refuncpolicy;
