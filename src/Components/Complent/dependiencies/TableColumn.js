import React from "react";
import moment from "moment";
import { storage } from "../../../dependencies/store/storage";
import { ROLES } from "../../../constants/role";

const TableColumn = ({ handleAnswer, pageNo = 0, size = 10 }) => {
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
      dataField: "title",
      text: "Title",
      sort: false,
      formatter: (cell, row) => {
        return cell;
      },
    },
    {
      dataField: "details",
      text: "Description",
      formatter: (cell, row, rowIndex) => {
        return cell
      },
    },
    {
      dataField: "resolution",
      text: "Resosution",
      formatter: (cell, row, rowIndex) => {
        return cell
      },
    },
    {
      dataField: "status",
      text: "Status",
      formatter: (cell, row, rowIndex) => {
        if(cell === 'open') {
          return (<span className="text-danger">{cell}</span>)
        }else {
          return (<span className="text-success">{cell}</span>)
        }
      },
    },
    {
      dataField: "_id",
      text: "Action",
      hidden: role === ROLES.PATIENT,
      formatter: (cell, row, rowIndex) => {
        return (
          <button type="button" className="btn btn-sm btn-info" onClick={() => handleAnswer(row)}>Answer</button>
        )
      },
    },
  
     
  ];
};

export default TableColumn;
