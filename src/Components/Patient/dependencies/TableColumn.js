import React from "react";
import moment from "moment";
import { storage } from "../../../dependencies/store/storage";
import { ROLES } from "../../../constants/role";

const TableColumn = ({HandleEdit, pageNo = 0, size = 10 }) => {
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
      text: "Patient Name",
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
        return cell
      },
    },
    {
      dataField: "_id",
      text: "Action",
      formatter: (cell, row, rowIndex) => {
        return (
          <>
            <button className="btn btn-info" onClick={() => HandleEdit(row)}>Edit</button>
          </>
        )
      },
    },
    
  ];
};

export default TableColumn;
