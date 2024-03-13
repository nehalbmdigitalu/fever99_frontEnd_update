import React from "react";
import moment from "moment";
import { storage } from "../../../dependencies/store/storage";
import { ROLES } from "../../../constants/role";
import { getDocumentLink } from "../../../dependencies/utils/helper";

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
      dataField: "name",
      text: "Name",
      sort: false,
      formatter: (cell, row) => {
        return cell;
      },
    },
    {
      dataField: "mobile",
      text: "Mobile",
      formatter: (cell, row, rowIndex) => {
        return cell
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
      dataField: "experience",
      text: "Experience",
      formatter: (cell, row, rowIndex) => {
        if(cell) {
          return (<span>{cell} Year</span>)
        }else {
          return (<span >0 Year</span>)
        }
      },
    },
    {
      dataField: "resume",
      text: "Resume",
      formatter: (cell, row, rowIndex) => {
        return (
          <a href={getDocumentLink(cell)} download={true} target="_new">Download</a>
        )
      },
    },
    {
      dataField: "applyAs",
      text: "Apply As",
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
      dataField: "address",
      text: "Address",
      formatter: (cell, row, rowIndex) => {
        return cell
      },
    },
    {
      dataField: "createdAt",
      text: "Submited Date",
      formatter: (cell, row, rowIndex) => {
        return moment(cell).format("DD/MM/YYYY h:mm:ss a");
      },
    },
  ];
};

export default TableColumn;
