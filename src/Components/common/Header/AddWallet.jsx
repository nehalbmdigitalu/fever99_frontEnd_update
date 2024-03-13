import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createPaymentSession, encryptCCAvenueData } from "../../Dashboard/dependencies/action";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

function AddWallet(props) {
  const { show, handleClose } = props;
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();
  const [encRequest, setEncRequest] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const {user} = useSelector((state) => state.login)

  const formRef = useRef(null);

  // const redirectToPayment = async (e) => {
  //   if (amount < 10) {
  //     alert("Amount must be more then 10!");
  //     return false;
  //   }
  //   const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);

  //   dispatch(createPaymentSession({ amount: amount })).then((res) => {
  //     const { status, sessionId } = res;
  //     if (status) {
  //       const result = stripe.redirectToCheckout({
  //         sessionId: sessionId,
  //       });
  //     }
  //   });
  // };

  const redirectToPayment = async (e) => {
    if (amount < 10) {
      alert("Amount must be more then 10!");
      return false;
    }

    let req = {
      amount: amount,
      name: user.name,
      payload: {
        email: user.email,
        reidrect_url: 'https://api.fever99.com/api/handle-response',
        // reidrect_url: 'http://127.0.0.1:8000/api/handle-response',
        appointmentId: ''
        
      }
    }
    setAccessCode(process.env.REACT_APP_CCAVENUE_ACCESS_CODE);
    dispatch(encryptCCAvenueData(req)).then((res) => {
      const {status, data} = res
      setEncRequest(data)
      setTimeout(async () => {
        await formRef.current.submit();
      }, 1000);
    })
    
  };

  return (
    <>
      <Modal show={show} onHide={() => handleClose(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Wallet Amount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add your form inputs here */}
          <Form>
            <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>
          </Form>
          <form
            ref={formRef}
            id="nonseamless"
            method="post"
            name="redirect"
            action="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction"
            // action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"
          >
            <input
              type="hidden"
              id="encRequest"
              name="encRequest"
              value={encRequest}
            ></input>
            <input
              type="hidden"
              name="access_code"
              id="access_code"
              value={accessCode}
            ></input>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose(false)}>
            Close
          </Button>
          <Button
            className="btn btn-sm btn-success"
            onClick={(e) => redirectToPayment(e)}
          >
            Add To Wallet
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddWallet;
