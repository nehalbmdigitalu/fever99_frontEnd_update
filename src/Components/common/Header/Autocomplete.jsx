import React, { useState, useEffect } from "react";
// import axios from "axios";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getStateCity } from "../../Dashboard/dependencies/action";
import { storage } from "../../../dependencies/store/storage";

function Autocomplete(props) {
  const { show, handleClose, setAddress } = props;
  // const [query, setQuery] = useState("");
  const dispach = useDispatch();
  const [cityString, setCityString] = useState("");
  // const [suggestions, setSuggestions] = useState([]);
  const { stateList } = useSelector((state) => state.stateCity);
  const [city, setCity] = useState([]);

  const handleSetAddress = () => {
    setAddress(cityString);
    storage.setLocation(cityString)
    handleClose(false);
  };

  useEffect(() => {
    dispach(getStateCity());
  }, [dispach]);

  // const handleInputChange = (event) => {
  //   setQuery(event.target.value);
  // };

  const handleStateChange = (e) => {
    let id = e.target.value;

    let state = stateList.filter((e) => e._id == id);

    if (state && state.length > 0) {
      console.log("state", state[0].city);
      setCity(state[0].city);
    }
  };

  return (
    <Modal show={show} onHide={(value) => handleClose(false)} backdrop="static">
      <Modal.Header>
        <h4>Location</h4>
      </Modal.Header>
      <Modal.Body>
        <div>
          <label>State</label>
          <select
            className="form-control"
            onChange={(e) => handleStateChange(e)}
          >
            <option>--Select One--</option>
            {stateList &&
              stateList.map((sta, index) => (
                <option value={sta._id} key={index}>
                  {sta.state}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>City</label>
          <select
            className="form-control"
            onChange={(e) => setCityString(e.target.value)}
          >
            <option>--Select One--</option>
            {city &&
              city.map((city, index) => (
                <option value={city} key={index}>
                  {city}
                </option>
              ))}
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
        <button
          className="btn btn-sm btn-success"
          onClick={() => handleSetAddress()}
        >
          Set Location
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default Autocomplete;
