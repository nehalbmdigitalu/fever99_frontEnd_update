import React from "react";
import moment from "moment";
import { storage } from "../../../dependencies/store/storage";
import { ROLES } from "../../../constants/role";

const TableColumn = ({ handleEdit, handleDelete, pageNo = 0, size = 10 }) => {
  const role = storage.getUserRole();
  return [
    {
      dataField: "",
      text: "S.No",
      formatter: (cell, row, rowIndex) => {
        return pageNo * size + (rowIndex + 1);
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
      dataField: "combination",
      text: "Combination",
      formatter: (cell, row, rowIndex) => {
        return cell;
      },
    },
    {
      dataField: "company",
      text: "Company Name",
      formatter: (cell, row, rowIndex) => {
        return cell;
      },
    },
    {
      dataField: "_id",
      text: "Action",
      hidden: role === ROLES.PATIENT,
      formatter: (cell, row, rowIndex) => {
        return (
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-sm btn-info text-white"
              onClick={() => handleEdit(row)}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-sm btn-danger"
              onClick={() => handleDelete(cell)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];
};

export default TableColumn;
