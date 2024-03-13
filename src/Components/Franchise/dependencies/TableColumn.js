import React from "react";
import moment from "moment";
import { storage } from "../../../dependencies/store/storage";
import { ROLES } from "../../../constants/role";
import { Link } from "react-router-dom";

const TableColumn = ({ HandleEdit,activateDeactivate, pageNo = 0, size = 10 }) => {
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
      dataField: "refrelCode",
      text: "Refral Code",
      formatter: (cell, row, rowIndex) => {
        return cell;
      },
    },
    {
      dataField: "status",
      text: "Status",
      formatter: (cell, row, rowIndex) => {
        if(cell == 'inactive') {
          return <label className="badge badge-danger">Deactivated</label>
        }else {
          return <label className="badge badge-success">Active</label>
        }
      },
    },
    

    {
      dataField: "_id",
      text: "Action",
      formatter: (cell, row, rowIndex) => {
        return (
          <>
            <div className="btn btn-group">
              <button className="btn btn-info" onClick={() => HandleEdit(row)}>
                Edit
              </button>
              {row.status === "active" ? (
                <button
                  className="btn btn-warning"
                  onClick={() => activateDeactivate(cell, 'inactive')}
                >
                  Deactive
                </button>
              ): (
                <button
                  className="btn btn-warning"
                  onClick={() => activateDeactivate(cell, 'active')}
                >
                  Activate
                </button>
              )}
              <Link to={`/franchise/view/${cell}`} className="btn btn-success">View</Link>
            </div>
          </>
        );
      },
    },
  ];
};

export default TableColumn;
