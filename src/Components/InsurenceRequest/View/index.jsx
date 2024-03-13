import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

function View(props) {
  const { handleClose, show, data } = props;
console.log(data)
  return (
    <>
      <Modal
        show={show}
        onHide={(e) => handleClose(false)}
        backdrop="static"
      >
        <Modal.Header>
          <span>Insurence Details</span>
        </Modal.Header>
        <Modal.Body>
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
          <p>Mobile: {data.mobile}</p>
          <p>Age: {data.age}</p>
          <p>gender: {data.gender}</p>
          <p>Address: {data.address}</p>
          <p>City: {data.city}</p>
          <p>district: {data.district}</p>
          <p>state: {data.state}</p>
          <p>Comment: {data.comment}</p>
          {
            data && data.famelymember && data.famelymember.map((item, index) => (
                <>
                    <p><b>Member {index + 1}</b>: {item.fname}, <b>Age</b>: {item.age}</p>
                </>
            ))
          }
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleClose(false)}
          >
            Close
          </button>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default View;
