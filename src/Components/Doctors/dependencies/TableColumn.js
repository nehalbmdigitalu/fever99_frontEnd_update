import React from "react";
import moment from "moment";
import { storage } from "../../../dependencies/store/storage";
import { ROLES } from "../../../constants/role";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";

const TableColumn = ({
  HandleEdit,
  activateDeactivate,
  handlePinDoctor,
  pageNo = 0,
  size = 10,
}) => {
  const role = storage.getUserRole();
  return [
    {
      dataField: "",
      text: "S.No",
      formatter: (cell, row, rowIndex) => {
        return (pageNo - 1) * size + (rowIndex + 1);
      },
    },
    {
      dataField: "name",
      text: "Name",
      sort: false,
      formatter: (cell, row) => {
        return cell;
      },
    },
    {
      dataField: "email",
      text: "Email",
      formatter: (cell, row, rowIndex) => {
        return cell;
      },
    },
    {
      dataField: "mobile",
      text: "Mobile",
      formatter: (cell, row, rowIndex) => {
        return cell;
      },
    },
    {
      dataField: "gender",
      text: "Gender",
      formatter: (cell, row, rowIndex) => {
        return cell;
      },
    },
    {
      dataField: "specialization",
      text: "Specialization",
      formatter: (cell, row, rowIndex) => {
        return cell;
      },
    },
    {
      dataField: "serviceCharge",
      text: "Charge per Appointment",
      formatter: (cell, row, rowIndex) => {
        return "INR " + cell;
      },
    },
    {
      dataField: "address",
      text: "Address",
      formatter: (cell, row, rowIndex) => {
        return cell;
      },
    },
    {
      dataField: "status",
      text: "Status",
      formatter: (cell, row, rowIndex) => {
        if (cell == "inactive") {
          return <label className="badge badge-danger">Deactivated</label>;
        } else {
          return <label className="badge badge-success">Active</label>;
        }
      },
    },
    {
      dataField: "_id",
      text: "Action",
      formatter: (cell, row, rowIndex) => {
        return (
          <>
            {/* <div className="btn btn-group">
              <button className="btn btn-info" onClick={() => HandleEdit(row)}>
                Edit
              </button>
              {row.status === "active" ? (
                <button
                  className="btn btn-danger"
                  onClick={() => activateDeactivate(cell, "inactive")}
                >
                  Deactive
                </button>
              ) : (
                <button
                  className="btn btn-success"
                  onClick={() => activateDeactivate(cell, "active")}
                >
                  Activate
                </button>
              )}
            </div> */}
            <Dropdown alignRight>
              <Dropdown.Toggle
                variant="link"
                id="dropdown-basic"
                className="custom-dropdown-form-table"
              >
                <i className="fa fa-ellipsis-v"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Link className="dropdown-item" to={`/doctors/view/${cell}`}>View</Link>
                
                <Dropdown.Item onClick={() => HandleEdit(row)}>
                  Edit
                </Dropdown.Item>
                {row.status === "active" ? (
                  <Dropdown.Item
                    onClick={() => activateDeactivate(cell, "inactive")}
                  >
                    Deactive
                  </Dropdown.Item>
                ) : (
                  <Dropdown.Item
                    onClick={() => activateDeactivate(cell, "active")}
                  >
                    Activate
                  </Dropdown.Item>
                )}
                <Dropdown.Item onClick={() => handlePinDoctor(cell, row.pinUser)}>
                  {row.pinUser ? 'Unpin It' : 'Pin It'}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        );
      },
    },
  ];
};

export default TableColumn;
