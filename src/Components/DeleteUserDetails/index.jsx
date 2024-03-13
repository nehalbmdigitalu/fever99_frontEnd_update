import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "./Dependencies/action";

function DeleteUserDetails() {
  const { user, isLogin } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    console.log(isLogin);
    if (!isLogin) {
      navigate("/login");
    }
  }, []);

  const handleDelete = () => {
    dispatch(deleteUser())
  };

  const handleCancel = () => {
    navigate('/dashboard')
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-10">
                  <div className="card">
                    <div className="card-header">
                      <h4>Confirm Deletion</h4>
                    </div>
                    <div className="card-body">
                      <p>
                        Are you sure you want to delete the user data? This
                        action cannot be undone.
                      </p>
                      <h4>With this action date will be delete mention below.</h4>
                      <ul>
                        <li>User Records</li>
                        <li>Wallet Records</li>
                        <li>Wallet Records</li>
                        <li>Appointment Records</li>
                        <li>Used Service Records</li>
                        <li>Device Tokens Records</li>
                      </ul>
                      <div style={{ display: "flex", justifyContent: "space-between", marginLeft:'20px', marginRight:'20px' }}>
                        <Button
                          variant="danger"
                          onClick={handleDelete}
                          className="mr-2"
                        >
                          Delete
                        </Button>
                        <Button variant="secondary" onClick={handleCancel}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteUserDetails;
