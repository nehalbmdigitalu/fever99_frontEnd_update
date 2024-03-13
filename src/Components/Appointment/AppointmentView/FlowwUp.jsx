import React, { useState } from "react";
import { Modal } from "react-bootstrap";

function FlowwUp(props) {
  const { handleClose, show, data, createFollo} = props;
  const {doctor} = data
  const [form, setForm] = useState({})

  const handleInputChange = (name, value) => {
    setForm({...form, [name]: value})
  }

  const handleCreateFoloUp = (e) => {
    e.preventDefault()
    createFollo(form)
  } 

  return (
    <Modal show={show} onHide={() => handleClose(false)} backdrop="static">
      <Modal.Header>
        <h3 className="text-white">Follow Up</h3>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label>Date</label>
          <input name="date" className="form-control" type="date" onChange={(e) => handleInputChange(e.target.name, e.target.value)}  />
        </div>
        <div className="form-group">
          <label>Slot</label>
          <select className="form-select" name="timeSlot" onChange={(e) => handleInputChange(e.target.name, e.target.value)}>
            <option value="">--Select One--</option>
            {
                doctor && doctor.timeSlot && doctor.timeSlot.map((item, index) => (
                    <option value={item.value} key={index}>{item.label}</option>
                ))
            }
          </select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => handleClose(false)}
        >
          Close
        </button>
        <button className="btn btn-sm btn-success" onClick={(e) => handleCreateFoloUp(e)}>Book</button>
      </Modal.Footer>
    </Modal>
  );
}

export default FlowwUp;
