import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard, getWallet } from "./dependencies/action";
import { isEmpty } from "lodash";
import icon1 from "../../assets/img/icons/icon-1.png";
import icon2 from "../../assets/img/icons/icon-2.png";
import icon3 from "../../assets/img/icons/icon-3.png";
import icon4 from "../../assets/img/icons/icon-4.png";
import { storage } from "../../dependencies/store/storage";
import { ROLES } from "../../constants/role";
import { Link } from "react-router-dom";
import Table from "../common/Table";
import TableColumn from "./dependencies/TableColumn";
import CanvasJSReact from "@canvasjs/react-charts";
import TotalAppointmentChat from "./Chats/TotalAppointChat";
import TotalIncome from "./Chats/TotalIncome";
import { getRecentServiceUsed } from "../ServiceRequest/dependiencies/action";
import moment from "moment";

function Dashboard() {
  const { user, wallet, transaction } = useSelector((state) => state.login);
  const { stateCity } = useSelector((state) => state.stateCity)
  const { dashboard } = useSelector((state) => state.dashboard);
  const { ItemList } = useSelector((state) => state.serviceRequest);
  const [query, setQuery] = useState({ page: 0, size: 10 });
  const [ItemTotalPage, setItemTotalPage] = useState(transaction.length);

  const dispatch = useDispatch();
  const role = storage.getUserRole();
  const handlePageChange = (page) => {
    setQuery({ ...query, page: page });
  };
  useEffect(() => {
    dispatch(getRecentServiceUsed({ page: 1 }));
    if (!isEmpty(user) && role === ROLES.FRANCHISE) {
      dispatch(getWallet(user._id));
    }
    dispatch(getDashboard());
    const interval = setInterval(() => {
      if (!isEmpty(user) && role === ROLES.FRANCHISE) {
        dispatch(getWallet());
      }
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);


  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-lg-12">
              <h4 className="admin_title">DASHBOARD</h4>
              <div className="row bg-white m-0 mb-4">
                {role == ROLES.ADMIN && (
                  <>
                    <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3 pr-0">
                      <div className="dash-widget d-flex">
                        <span className="dash-widget-bg1">
                          <img src={icon1} alt="Icon" width="25" />
                        </span>
                        <div
                          className="dash-widget-info float-left pl-2 "
                          style={{ marginLeft: "5px" }}
                        >
                          <h3>
                            <Link to="/patient">Total Users</Link>
                          </h3>
                          <h4>{dashboard && dashboard.user}</h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3 pr-0">
                      <div className="dash-widget d-flex">
                        <span className="dash-widget-bg3">
                          <img src={icon2} alt="Icon" width="25" />
                        </span>
                        <div
                          className="dash-widget-info float-left pl-2 "
                          style={{ marginLeft: "5px" }}
                        >
                          <h3>
                            <Link to="/doctors">Total Doctor</Link>
                          </h3>
                          <h4>{dashboard && dashboard.doctor}</h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3 pr-0">
                      <div className="dash-widget d-flex">
                        <span className="dash-widget-bg4">
                          <img src={icon4} alt="Icon" width="25" />
                        </span>
                        <div
                          className="dash-widget-info float-left pl-2 "
                          style={{ marginLeft: "5px" }}
                        >
                          <h3>
                            <Link to="/franchise">Total Franchise</Link>
                          </h3>
                          <h4>{dashboard && dashboard.franchise}</h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3 pr-0">
                      <div className="dash-widget d-flex">
                        <span className="dash-widget-bg4">
                          <img src={icon4} alt="Icon" width="25" />
                        </span>
                        <div
                          className="dash-widget-info float-left pl-2 "
                          style={{ marginLeft: "5px" }}
                        >
                          <h3><Link to="/admin-earnings">Total Revenue</Link></h3>
                          <h4>{dashboard && dashboard.wallet}</h4>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {(role === ROLES.FRANCHISE || role === ROLES.DOCTOR) && (
                  <>
                    <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3 pr-0">
                      <div className="dash-widget d-flex">
                        <span className="dash-widget-bg1">
                          <img src={icon1} alt="Icon" width="25" />
                        </span>
                        <div
                          className="dash-widget-info float-left pl-2 "
                          style={{ marginLeft: "5px" }}
                        >
                          <h3>
                            <Link to="/appointments">Total Consultation</Link>
                          </h3>
                          <h4>{dashboard && dashboard.totalApointment}</h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3 pr-0">
                      <div className="dash-widget d-flex">
                        <span className="dash-widget-bg3">
                          <img src={icon2} alt="Icon" width="25" />
                        </span>
                        <div
                          className="dash-widget-info float-left pl-2 "
                          style={{ marginLeft: "5px" }}
                        >
                          <h3>
                            <Link to="/appointments?status=pending">Pending Consultation</Link>
                          </h3>
                          <h4>{dashboard && dashboard.pendingAppointment}</h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3 pr-0">
                      <div className="dash-widget d-flex">
                        <span className="dash-widget-bg4">
                          <img src={icon4} alt="Icon" width="25" />
                        </span>
                        <div
                          className="dash-widget-info float-left pl-2 "
                          style={{ marginLeft: "5px" }}
                        >
                          <h3>
                            <Link to="/appointments?status=today">Today Consultation </Link>
                          </h3>
                          <h4>{dashboard && dashboard.todayAppointment}</h4>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {role === ROLES.CORDINATOR && (
                  <>
                    <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3 pr-0">
                      <div className="dash-widget d-flex">
                        <span className="dash-widget-bg1">
                          <img src={icon1} alt="Icon" width="25" />
                        </span>
                        <div
                          className="dash-widget-info float-left pl-2 "
                          style={{ marginLeft: "5px" }}
                        >
                          <h3>
                            <Link to="/appointments">Total Consultatsion</Link>
                          </h3>
                          <h4>{dashboard && dashboard.totalApointment}</h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3 pr-0">
                      <div className="dash-widget d-flex">
                        <span className="dash-widget-bg3">
                          <img src={icon2} alt="Icon" width="25" />
                        </span>
                        <div
                          className="dash-widget-info float-left pl-2 "
                          style={{ marginLeft: "5px" }}
                        >
                          <h3>
                            <Link to="/appointments?status=pending">Pending Consultatsion</Link>
                          </h3>
                          <h4>{dashboard && dashboard.pendingAppointment}</h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3 pr-0">
                      <div className="dash-widget d-flex">
                        <span className="dash-widget-bg4">
                          <img src={icon4} alt="Icon" width="25" />
                        </span>
                        <div
                          className="dash-widget-info float-left pl-2 "
                          style={{ marginLeft: "5px" }}
                        >
                          <h3>
                            <Link to="/appointments?status=today">Today Consultatsion </Link>
                          </h3>
                          <h4>{dashboard && dashboard.todayAppointment}</h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3 pr-0">
                      <div className="dash-widget d-flex">
                        <span className="dash-widget-bg4">
                          <img src={icon4} alt="Icon" width="25" />
                        </span>
                        <div
                          className="dash-widget-info float-left pl-2 "
                          style={{ marginLeft: "5px" }}
                        >
                          <h3>
                            <Link to="/appointments?status=completed">Total Completed </Link>
                          </h3>
                          <h4>{dashboard && dashboard.totalCompleted}</h4>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {role === ROLES.DOCTOR && (
                  <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3 pr-0">
                    <div className="dash-widget d-flex">
                      <span className="dash-widget-bg4">
                        <img src={icon4} alt="Icon" width="25" />
                      </span>
                      <div
                        className="dash-widget-info float-left pl-2 "
                        style={{ marginLeft: "5px" }}
                      >
                        <p>
                          <Link to="/appointments">Total Earnings</Link>
                        </p>
                        <h4>{dashboard && dashboard.totalEarnings}</h4>
                      </div>
                    </div>
                  </div>
                )}
                {role === ROLES.FRANCHISE && (
                  <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3 pr-0">
                    <div className="dash-widget d-flex">
                      <span className="dash-widget-bg2">
                        <img src={icon3} alt="Icon" width="25" />
                      </span>
                      <div
                        className="dash-widget-info float-left pl-2 "
                        style={{ marginLeft: "5px" }}
                      >
                        <p>
                          <Link to="/transaction">Wallet Amount</Link>
                        </p>
                        <h4>{wallet}</h4>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {role === ROLES.PATIENT && (
            <>
              <div className="row">
                <div className="col-12">
                  <h4 className="admin_title">Recent Service Used</h4>
                  <div className="table-responsive">
                    <table className="table bg-white mb-0">
                      <thead>
                        <tr>
                          <th>NO</th>
                          <th>DATE</th>
                          <th>NAME</th>
                          <th>SERVICE NAME</th>
                          <th>GENDER</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ItemList &&
                          ItemList.map((ser, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                {moment(ser.requestDate).format(
                                  "DD/MM/YYYY h:mm:ss a"
                                )}
                              </td>
                              <td>{ser.customerName}</td>
                              <td>{ser.serviceName}</td>
                              <td>{ser.gender}</td>
                              <td>{ser.status == 'pending' ? 'Pending' : 'Completed'}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
          {role === ROLES.ADMIN && (
            <>
              <div className="row">
                <div className="col-12">
                  <h4 className="admin_title">Recent Transaction</h4>
                  <Table
                    columns={TableColumn({
                      pageNo: query.page,
                      size: query.size,
                    })}
                    dataTable={transaction}
                    totalRecord={ItemTotalPage}
                    onPageChange={handlePageChange}
                    onTableChange={() => { }}
                    keyField="_id"
                    sizePerPage={query.size}
                  // pageSizeChange={(value) => handlePageSizeChange(value)}
                  />
                </div>
              </div>
            </>
          )}
          {(ROLES.DOCTOR == role || ROLES.FRANCHISE == role) && (
            <>
              <div className="row">
                <div className="col-md-12" style={{ marginBottom: "50px" }}>
                  <TotalAppointmentChat data={dashboard} />
                </div>

                <div className="col-md-12">
                  <TotalIncome data={dashboard} />
                </div>
              </div>
            </>
          )}

          {/* <div className="row">
            <div className="col-12">
              <h4 className="admin_title">TODAY APPOINTMENTS</h4>
              <div className="table-responsive">
                <table className="table bg-white mb-0">
                  <thead>
                    <tr>
                      <th>NO</th>
                      <th>DATE</th>
                      <th>ID</th>
                      <th>NAME</th>
                      <th>AGE</th>
                      <th>GENDER</th>
                      <th>SETTINGS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>01</td>
                      <td>20/05/2021</td>
                      <td>0012</td>
                      <td>William Zaoo</td>
                      <td>27</td>
                      <td>Male</td>
                      <td>
                        <a href="#" className="px-2 edit">
                          <i className="fas fa-pencil-alt"></i>
                        </a>
                        <a href="#" className="px-2 del">
                          <i className="far fa-trash-alt"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>02</td>
                      <td>21/05/2021</td>
                      <td>0013</td>
                      <td>John Deo</td>
                      <td>24</td>
                      <td>Male</td>
                      <td>
                        <a href="#" className="px-2 edit">
                          <i className="fas fa-pencil-alt"></i>
                        </a>
                        <a href="#" className="px-2 del">
                          <i className="far fa-trash-alt"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>03</td>
                      <td>22/05/2021</td>
                      <td>0014</td>
                      <td>Hellen</td>
                      <td>29</td>
                      <td>Female</td>
                      <td>
                        <a href="#" className="px-2 edit">
                          <i className="fas fa-pencil-alt"></i>
                        </a>
                        <a href="#" className="px-2 del">
                          <i className="far fa-trash-alt"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>04</td>
                      <td>23/05/2021</td>
                      <td>0015</td>
                      <td>Bobby </td>
                      <td>23</td>
                      <td>Male</td>
                      <td>
                        <a href="#" className="px-2 edit">
                          <i className="fas fa-pencil-alt"></i>
                        </a>
                        <a href="#" className="px-2 del">
                          <i className="far fa-trash-alt"></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
