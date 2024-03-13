import React from "react";
import moment from "moment";
import { storage } from "../../../dependencies/store/storage";
import { ROLES } from "../../../constants/role";

const TableColumn = ({ pageNo = 0, size = 10 }) => {
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
      dataField: "timestamp",
      text: "Date & Time",
      formatter: (cell, row, rowIndex) => {
        return moment(cell).format("DD/MM/YYYY h:mm:ss a");
      },
    },
    {
      dataField: "type",
      text: "Type",
      sort: false,
      formatter: (cell, row) => {
        return cell;
      },
    },
    {
      dataField: "amount",
      text: "Amount",
      formatter: (cell, row, rowIndex) => {
        return cell;
      },
    },
    {
      dataField: "message",
      text: "Description",
      formatter: (cell, row, rowIndex) => {
        if(row.type === 'debit') {
            return (<span className="text-danger">{cell}</span>)
        }else {
            return (<span className="text-success">{cell}</span>)
        }
      },
    },
  ];
};

export default TableColumn;
