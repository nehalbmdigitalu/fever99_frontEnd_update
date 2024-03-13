import React from "react";
import moment from "moment";
import { storage } from "../../../dependencies/store/storage";
import { ROLES } from "../../../constants/role";

const TableColumn = ({ handleEdit, pageNo = 0, size = 10 }) => {
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
      dataField: "serviceName",
      text: "Service Name",
      sort: false,
      formatter: (cell, row) => {
        return cell;
      },
    },
    {
      dataField: "customerName",
      text: "Patient Name",
      formatter: (cell, row, rowIndex) => {
        return cell
      },
    },
    {
      dataField: "age",
      text: "Age",
      formatter: (cell, row, rowIndex) => {
        return cell
      },
    },
    
    {
      dataField: "gender",
      text: "gender",
      formatter: (cell, row, rowIndex) => {
        return cell
      },
    },
    {
      dataField: "medicalProblem",
      text: "Medical Problem",
      formatter: (cell, row, rowIndex) => {
        return cell
      },
    },

    {
      dataField: "mobile",
      text: "Phone",
      formatter: (cell, row, rowIndex) => {
        return cell
      },
    },
    {
      dataField: "status",
      text: "Status",
      formatter: (cell, row, rowIndex) => {
        if(cell === 'pending') {
          return (<span className="text-danger">{cell}</span>)
        }else {
          return (<span className="text-success">{cell}</span>)
        }
      },
    },
    {
      dataField: "paymentStatus",
      text: "Payment Status",
      formatter: (cell, row, rowIndex) => {
        if(cell === 'pending') {
          return (<span className="text-danger">{cell}</span>)
        }else {
          return (<span className="text-success">{cell}</span>)
        }
      },
    },
    {
      dataField: "requestDate",
      text: "Request Date And Time",
      formatter: (cell, row, rowIndex) => {
        return moment(cell).format('DD/MM/YYYY') + ' | '+ row.requestTime
      },
    }, 
    {
      dataField: "_id",
      text: "Action",
      hidden: role !== ROLES.CORDINATOR,
      formatter: (cell, row, rowIndex) => {
        return (
          <div className="btn btn-group">
            <button className="btn btn-sm btn-warning" onClick={(e) => handleEdit(cell, 'payment')}>Payment Done</button>
            <button className="btn btn-sm btn-success" onClick={(e) => handleEdit(cell, 'service')}>Service Done</button>
          </div>
        )
      },
    }
  ];
};

export default TableColumn;
