import React from "react";
import moment from "moment";
import { storage } from "../../../dependencies/store/storage";
import { ROLES } from "../../../constants/role";
import { getDocumentLink } from "../../../dependencies/utils/helper";

const TableColumn = ({ handleDelete, handleEdit, pageNo = 0, size = 10 }) => {
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
      dataField: "image",
      text: "Image",
      sort: false,
      formatter: (cell, row) => {
        return (
          <img src={getDocumentLink(cell)} width={50} />
        );
      },
    },
    {
      dataField: "role",
      text: "Role",
      formatter: (cell, row, rowIndex) => {
        return cell;
      },
    },
    // {
    //   dataField: "twitter",
    //   text: "twitter",
    //   formatter: (cell, row, rowIndex) => {
    //     return cell;
    //   },
    // },
    // {
    //   dataField: "facebook",
    //   text: "Facebook",
    //   formatter: (cell, row, rowIndex) => {
    //     return cell
    //   },
    // },
    // {
    //   dataField: "linkedin",
    //   text: "Linkedin",
    //   formatter: (cell, row, rowIndex) => {
    //     return cell;
    //   },
    // },
    // {
    //   dataField: "instagram",
    //   text: "Instagram",
    //   formatter: (cell, row, rowIndex) => {
    //     return cell;
    //   },
    // },
    {
      dataField: "type",
      text: "Type",
      formatter: (cell, row, rowIndex) => {
        return cell;
      },
    },
    {
      dataField: 'status',
      text: 'Status',
      formatter: (cell, row, rowIndex) => {
        return cell;
      },
    },
    {
      dataField: "_id",
      text: "Action",
      formatter: (cell, row, rowIndex) => {
        return (
          <>
            <div className="btn btn-group">
            <button className="btn btn-info" onClick={() =>handleEdit(row)}>Edit</button>
            <button className="btn btn-danger" onClick={() =>handleDelete(cell)}>Delete</button>
            </div>
          </>
        )
      },
    },
    
  ];
};

export default TableColumn;
