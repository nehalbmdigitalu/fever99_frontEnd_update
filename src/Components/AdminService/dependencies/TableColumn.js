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
      dataField: "price",
      text: "Amount",
      formatter: (cell, row, rowIndex) => {
        return cell;
      },
    },
    {
      dataField: "description",
      text: "Description",
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
