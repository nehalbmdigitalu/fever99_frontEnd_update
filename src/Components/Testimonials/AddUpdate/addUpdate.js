import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { getDocumentLink } from "../../../dependencies/utils/helper";

function AddUpdate(props) {
  const { handleClose, show, handleAdd, handleUpdate , data :{rowData}} = props;
  const { user } = useSelector((state) => state.login);
  const [form, setForm] = useState({});
  const [error, setError] = useState({});
  const [update, setUpdate] = useState(false)
  const [previewImage, setPreviewImage] = useState(null);

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    handleInputChange(e.target.name, file)
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);

    } else {
      setPreviewImage(null);
    }
    
  }

  useEffect(() => {
    if(!show) {
      setForm({})
      setUpdate(false)
      setPreviewImage(null)
    }
  },[show])

  useEffect(() => {
    if(!isEmpty(rowData)) {
      setUpdate(true)
      setForm(rowData);
    }
  },[rowData])

  const validator = () => {
    let errors = {};
    if (!form.name) {
      errors = { ...errors, name: "This field is required!" };
    }
    if (!form.role) {
      errors = { ...errors, role: "This field is required!" };
    }
    
    if (!form.status) {
      errors = { ...errors, status: "This field is required!" };
    }
    if (!form.message) {
      errors = { ...errors, message: "This field is required!" };
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
      if (key == 'image' && typeof value === 'string') {
        console.log('The value is a string.');
      }else {
        formData.append([key], value)
      }     
      
    });
    handleAdd(formData);
  };

  const handleUpdateClick = (e) => {

    e.preventDefault();
    let vallidate = validator();

    if (!isEmpty(vallidate)) {
      return false;
    }

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (key == 'image' && typeof value === 'string') {
        console.log('The value is a string.');
      }else {
        formData.append([key], value)
      }     
      
    });

    handleUpdate(form._id, formData);
  }
  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={(e) => handleClose(false)}
        backdrop="static"
      >
        <Modal.Header>
          <span>{update?'Update Testimonial': 'Add Testimonial'}</span>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="form-group col-md-8">
                <label>Image</label>
                <input type="file" name="image" className="form-control" onChange={(e) => handleImageChange(e)} />
              </div>
              <div className="col-md-4">
                {previewImage && (
                  <img src={previewImage} alt="Preview" style={{ maxWidth: '100px' }} />
                )}
                {
                  update && !previewImage && (
                    <img src={getDocumentLink(form.image)} alt="Preview" style={{ maxWidth: '100px' }} />
                  )
                }
                
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
                <label>Role</label>
                <input
                  type="text"
                  name="role"
                  value={form.role}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  placeholder="Role"
                  className="form-control"
                />
                {error && error.role && (
                  <span className="text-danger">{error.role}</span>
                )}
              </div>
              <div className="form-group">
                  <label>Message</label>
                  <textarea name="message" className="form-control" placeholder="Message" onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  } value={form.message}>{form.message}</textarea>
                  {error && error.message && (
                  <span className="text-danger">{error.message}</span>
                )}
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
                  <option value="active" selected={form.status == 'active'}>Active</option>
                  <option value="inactive" selected={form.status == 'inactive'}>Inactive</option>
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
            onClick={(e) => update? handleUpdateClick(e): handleAddData(e)}
          >
            {update? 'Update Testimonial': 'Add Testimonial'}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddUpdate;
