import React from "react";
import moment from "moment";
import { storage } from "../../../dependencies/store/storage";
import { ROLES } from "../../../constants/role";

const TableColumn = ({ handleEdit, HandlejoinMetting, pageNo = 0, size = 10 }) => {
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
      dataField: "email",
      text: "Email",
      formatter: (cell, row, rowIndex) => {
        return cell
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
        dataField: "service",
        text: "Service Used",
        formatter: (cell, row, rowIndex) => {
          return 'N/A'
        },
      },
    
  ];
};

export default TableColumn;
