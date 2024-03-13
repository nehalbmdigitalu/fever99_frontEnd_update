import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { getDocumentLink } from "../../../dependencies/utils/helper";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import MyEditor from "../../CaseStudy/AddUpdate/MyEditor";

function AddUpdate(props) {
  const {
    handleClose,
    show,
    handleAdd,
    handleUpdate,
    data: { rowData },
  } = props;
  const { user } = useSelector((state) => state.login);
  const [form, setForm] = useState({});
  const [error, setError] = useState({});
  const [update, setUpdate] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [avaliablePinCode, setAvaliablePinCode] = useState([]);
  const [keyFetures, setkeyFeaturs] = useState([{ key: "", featers: "" }]);

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    handleInputChange(e.target.name, file);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  useEffect(() => {
    if (!show) {
      setForm({});
      setUpdate(false);
      setPreviewImage(null);
      setAvaliablePinCode([]);
    }
  }, [show]);

  useEffect(() => {
    if (!isEmpty(rowData)) {
      setUpdate(true);
      setForm(rowData);
      setAvaliablePinCode(rowData.pinCode);
      if (rowData.keyFeture) {
        setkeyFeaturs(rowData.keyFeture)
      }
    }
  }, [rowData]);

  const validator = () => {
    let errors = {};
    if (!form.name) {
      errors = { ...errors, name: "This field is required!" };
    }

    if (!form.status) {
      errors = { ...errors, status: "This field is required!" };
    }
    if (!form.description) {
      errors = { ...errors, description: "This field is required!" };
    }
    if (!form.price) {
      errors = { ...errors, price: "This field is required!" };
    }

    setError(errors);

    return errors;
  };

  const handleAddData = (e) => {
    e.preventDefault();
    let vallidate = validator();

    if (!isEmpty(vallidate)) {
      return false;
    }
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (key == "image" && typeof value === "string") {
        console.log("The value is a string.");
      } else {
        formData.append([key], value);
      }
    });
    formData.append("pinCode", avaliablePinCode);
    formData.append('keyFeture', JSON.stringify(keyFetures))
    handleAdd(formData);
  };

  const handleUpdateClick = (e) => {
    e.preventDefault();
    let vallidate = validator();

    if (!isEmpty(vallidate)) {
      return false;
    }

    const formData = new FormData();
    formData.append("pinCode", avaliablePinCode);

    Object.entries(form).forEach(([key, value]) => {
      if (key == "image" && typeof value === "string" && key == "pinCode") {
        console.log("The value is a string.");
      } else {
        formData.append([key], value);
      }
    });

    formData.append('keyFeture', JSON.stringify(keyFetures))

    handleUpdate(form._id, formData);
  };

  const handlePinCodeChange = (newTags) => {
    setAvaliablePinCode(newTags);
  };

  const addMore = (e) => {
    e.preventDefault();

    setkeyFeaturs((old) => [...old, { key: "", featers: "" }]);
  };

  const removeRow = (index) => {
    const updatedRows = [...keyFetures];

    updatedRows.splice(index, 1);

    setkeyFeaturs(updatedRows);
  };
  const handleKayFetureInputChange = (index, event) => {
    const updatedInputs = [...keyFetures];
    updatedInputs[index][event.target.name] = event.target.value;
    setkeyFeaturs(updatedInputs);
  };
  console.log(keyFetures)
  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={(e) => handleClose(false)}
        backdrop="static"
      >
        <Modal.Header>
          <span>{update ? "Update Service" : "Add Service"}</span>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="form-group col-md-8">
                <label>Image</label>
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  onChange={(e) => handleImageChange(e)}
                />
              </div>
              <div className="col-md-4">
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    style={{ maxWidth: "100px" }}
                  />
                )}
                {update && !previewImage && (
                  <img
                    src={getDocumentLink(form.image)}
                    alt="Preview"
                    style={{ maxWidth: "100px" }}
                  />
                )}
              </div>
              <div className="form-group col-md-6">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  placeholder="Name"
                  className="form-control"
                />
                {error && error.name && (
                  <span className="text-danger">{error.name}</span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  placeholder="Price"
                  className="form-control"
                />
                {error && error.price && (
                  <span className="text-danger">{error.price}</span>
                )}
              </div>
              <div className="form-group">
                <label>Add City in Avaliable</label>
                <TagsInput
                  value={avaliablePinCode}
                  onChange={handlePinCodeChange}
                />
              </div>
              <div className="form-group">
                <label>Expacts</label>
                <textarea
                  name="description"
                  className="form-control"
                  placeholder="Message"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  value={form.description}
                ></textarea>

                {error && error.description && (
                  <span className="text-danger">{error.description}</span>
                )}
              </div>
              <div className="form-group">
                <label>Detailed Description</label>
                <MyEditor data={form.about} changed={(value) => handleInputChange('about', value)} />
              </div>
              <div style={{ border: "1px solid gray" }}>
                <button
                  type="button"
                  onClick={(e) => addMore(e)}
                  className="btn btn-sm btn-warning"
                  style={{
                    position: "absolute",
                    margin: "5px",
                    right: "5px",
                    marginTop: "-15px",
                  }}
                >
                  <i className="fa fa-plus"></i>
                </button>
                {keyFetures.map((d, index) => (
                  <>
                    {index ? <hr /> : ""}
                    {index ? (
                      <i
                        className="fa fa-trash"
                        style={{
                          position: "absolute",
                          margin: "5px",
                          right: "10px",
                          color: 'red'
                        }}
                        onClick={(e) => removeRow(index)}
                      ></i>
                    ) : ''}
                    <div className="form-group col-md-12">
                      <label>Key</label>
                      <input name="key" value={d.key} className="form-control" onChange={(e) => handleKayFetureInputChange(index, e)} />
                    </div>
                    <div className="form-group col-md-12">
                      <label>Featurs</label>
                      <textarea className="form-control" value={d.featers} name="featers" onChange={(e) => handleKayFetureInputChange(index, e)}></textarea>
                    </div>
                  </>
                ))}
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  className="form-select"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                >
                  <option value="">--Select One--</option>
                  <option value="active" selected={form.status == "active"}>
                    Active
                  </option>
                  <option value="inactive" selected={form.status == "inactive"}>
                    Inactive
                  </option>
                </select>
                {error && error.status && (
                  <span className="text-danger">{error.status}</span>
                )}
              </div>
            </div>
          </form>
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
            onClick={(e) => (update ? handleUpdateClick(e) : handleAddData(e))}
          >
            {update ? "Update Service" : "Add Service"}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddUpdate;
