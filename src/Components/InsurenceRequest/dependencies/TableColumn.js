import React from "react";
import moment from "moment";
import { storage } from "../../../dependencies/store/storage";
import { ROLES } from "../../../constants/role";
import { getDocumentLink } from "../../../dependencies/utils/helper";

const TableColumn = ({ handleView, pageNo = 0, size = 10 }) => {
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
      sort: false,
      formatter: (cell, row) => {
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
      dataField: "state",
      text: "State",
      formatter: (cell, row, rowIndex) => {
        return cell;
      },
    },
    {
      dataField: "city",
      text: "City",
      formatter: (cell, row, rowIndex) => {
        return cell;
      },
    },

    {
      dataField: "createdAt",
      text: "Requested Date",
      formatter: (cell, row, rowIndex) => {
        return moment(cell).format("MMMM Do YYYY, h:mm:ss a");
      },
    },
    {
      dataField: "_id",
      text: "Action",
      formatter: (cell, row, rowIndex) => {
        return (
          <>
            <div className="btn btn-group">
              <button className="btn btn-info" onClick={() => handleView(row)}>
                View
              </button>
            </div>
          </>
        );
      },
    },
  ];
};

export default TableColumn;
