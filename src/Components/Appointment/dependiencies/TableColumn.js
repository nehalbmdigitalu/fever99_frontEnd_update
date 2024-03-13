import React from "react";
import moment from "moment";
import { storage } from "../../../dependencies/store/storage";
import { ROLES } from "../../../constants/role";
import { Link } from "react-router-dom";

const TableColumn = ({
  handleEdit,
  HandlejoinMetting,
  handleCall,
  downloadPrescription,
  handleComplent,
  callInProgress,
  pageNo = 0,
  size = 10,
}) => {
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
      dataField: "patientName",
      text: "Patient Name",
      sort: false,
      formatter: (cell, row) => {
        return cell;
      },
    },
    {
      dataField: "expert",
      text: "User Type",
      sort: false,
      hidden: role === ROLES.CORDINATOR ? false: true,
      formatter: (cell, row) => {
        return cell && cell.role === ROLES.PATIENT ? 'User': 'Franchise';
      },
    },
    {
      dataField: "expert",
      text: "User Mobile",
      sort: false,
      hidden: ROLES.CORDINATOR === role ? false : true,
      formatter: (cell, row) => {
        return cell && cell.mobile;
      },
    },
    {
      dataField: "mode",
      text: "Consultatsion Mode",
      sort: false,
      formatter: (cell, row) => {
        if (cell == "Offline") {
          return "Clinic Visit";
        } else {
          return "Video Call";
        }
      },
    },
    {
      dataField: "paymentMode",
      text: "Payment Mode",
      hidden: ROLES.FRANCHISE === role ? true : false,
      sort: false,
      formatter: (cell, row) => {
        return cell;
      },
    },
    {
      dataField: "paymentStatus",
      text: "Payment Status",
      hidden: role === ROLES.FRANCHISE,
      sort: false,
      formatter: (cell, row) => {
        return (
          <span
            class={
              cell === "Paid"
                ? `custom-badge status-green`
                : `custom-badge status-red`
            }
          >
            {cell}
          </span>
        );
      },
    },
    {
      dataField: "age",
      text: "Age",
      formatter: (cell, row, rowIndex) => {
        return cell;
      },
    },
    {
      dataField: "doctor",
      text: "Doctor Name",
      hidden: ROLES.DOCTOR == role ? true : false,
      formatter: (cell, row, rowIndex) => {
        return cell && cell.name;
      },
    },
    // {
    //   dataField: "expert",
    //   text: "Expert Name",
    //   hidden: ROLES.FRANCHISE === role || role === ROLES.PATIENT,
    //   formatter: (cell, row, rowIndex) => {
    //     return cell && cell.name;
    //   },
    // },
    {
      dataField: "doctor",
      text: "Speciality",
      hidden: role === ROLES.DOCTOR,
      formatter: (cell, row, rowIndex) => {
        return cell && cell.specialization;
      },
    },
    {
      dataField: "dateTime",
      text: "Appointment Date",
      formatter: (cell, row, rowIndex) => {
        
        return (
          <>
            <span className="custom-badge status-green">{`${moment(cell).format("DD/MM/YYYY")} - ${row.selectedTimeSlot ?? ""}`}</span>
          </>
        );
      },
    },
    {
      dataField: "status",
      text: "Appointment Status",
      formatter: (cell, row, rowIndex) => {
        return (
          <>
            <span
              class={
                cell === "confirmed" || cell === "completed"
                  ? `custom-badge status-green`
                  : `custom-badge status-red`
              }
            >
              {cell}
            </span>
          </>
        );
      },
    },
    {
      dataField: "_id",
      text: "Action",
      // hidden: ROLES.CORDINATOR == role ? true : false,
      formatter: (cell, row, rowIndex) => {
        if(row.callInprogress) {
          callInProgress('play')
        }
        return (
          <>
            <div className="btn-group">
              {ROLES.DOCTOR == role &&
                row.status === "pending" &&
                ROLES.CORDINATOR !== role && (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleEdit(cell, "confirmed")}
                  >
                    Accept
                  </button>
                )}
              {row.mode == "Video" && (
                <>
                  {row &&
                    (row.status === "confirmed" ||
                      row.status === "Follow-up") &&
                    ROLES.CORDINATOR !== role && (
                      <>
                        <a
                          className={row.callInprogress ? "btn btn-sm btn-info text-white blink": "btn btn-sm btn-info text-white"}
                          href="#0"
                          onClick={() => HandlejoinMetting(cell)}
                          // target="_new"
                        >
                          {row.callInprogress
                            ? "Call In Progress"
                            : ROLES.DOCTOR === role ? "Start Call": "Join Call"}
                        </a>
                      </>
                    )}
                  {((row &&
                    (row.status === "confirmed" ||
                      row.status === "completed" ||
                      row.status === "Follow-up")) ||
                    role === ROLES.DOCTOR ||
                    role === ROLES.CORDINATOR) && (
                    <Link
                      className="btn btn-warning btn-sm"
                      to={`/appointment/${cell}`}
                    >
                      History
                    </Link>
                  )}

                  {row &&
                    row.status === "completed" &&
                    ROLES.ADMIN !== role && (
                      <button
                        className="btn btn-info"
                        onClick={() => downloadPrescription(cell)}
                      >
                        Prescription
                      </button>
                    )}

                  {(ROLES.PATIENT === role && row.status === "completed")  && (
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleComplent(cell)}
                      >
                        Raise Issue
                      </button>
                    )}
                </>
              )}
              {ROLES.DOCTOR == role &&
                (row.status === "confirmed" || row.status === "Follow-up") &&
                ROLES.CORDINATOR !== role && (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleEdit(cell, "completed")}
                  >
                    Complete
                  </button>
                )}
            </div>
          </>
        );
      },
    },
  ];
};

export default TableColumn;
