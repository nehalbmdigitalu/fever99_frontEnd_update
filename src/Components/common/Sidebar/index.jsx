import React from "react";
import { Link, useLocation } from "react-router-dom";
import { storage } from "../../../dependencies/store/storage";
import { ROLES } from "../../../constants/role";

function Sidebar() {
  const location = useLocation();
  const currentURL = location.pathname;
  const role = storage.getUserRole();
  if (
    currentURL === "/" ||
    currentURL === "/login" ||
    currentURL === "/register" ||
    currentURL == "/about" ||
    currentURL == "/service" ||
    currentURL == "/career" ||
    currentURL == "/forgot-password" ||
    currentURL == "/terms-condition" ||
    currentURL == "/privacy" ||
    currentURL.split("/")[1] == "people" ||
    currentURL.split("/")[1] == "blog" ||
    currentURL == "/e-clinic-register" ||
    currentURL.split("/")[1] == "home-service" ||
    currentURL.split("/")[1] == "prescription" ||
    currentURL == '/refuncpolicy'
  ) {
    return null;
  }
  return (
    <>
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className={currentURL === "/" ? "active" : ""}>
                <Link to="/">
                  <i class="fa fa-reply" aria-hidden="true"></i>
                  <span>Back To Homepage</span>
                </Link>
              </li>
              <li className={currentURL === "/dashboard" ? "active" : ""}>
                <Link to="/dashboard">
                  <i className="fas fa-tachometer-alt"></i>{" "}
                  <span>Dashboard</span>
                </Link>
              </li>
              {(role === ROLES.DOCTOR || role === ROLES.FRANCHISE) && (
                <>
                  <li className={currentURL === "/appointments" ? "active" : ""}>
                    <Link to="/appointments">
                      <i className="far fa-calendar-alt"></i>{" "}
                      <span>Appointment</span>
                    </Link>
                  </li>
                  <li className={currentURL === "/earnings" ? "active" : ""}>
                    <Link to="/earnings">
                    <i class="fas fa-rupee-sign"></i>
                      <span>Earnings</span>
                    </Link>
                  </li>
                </>
              )}
              {role === ROLES.ADMIN && (
                <>
                  <li className={currentURL === "/doctors" ? "active" : ""}>
                    <Link to="/doctors">
                    <i class="fas fa-user-md"></i> <span>Doctors</span>
                    </Link>
                  </li>
                  <li className={currentURL === "/patient" ? "active" : ""}>
                    <Link to="/patient">
                      <i className="far fa-user"></i> <span>Users</span>
                    </Link>
                  </li>
                  <li className={currentURL === "/franchise" ? "active" : ""}>
                    <Link to="/franchise">
                    <i class="fas fa-users"></i> <span>Franchise</span>
                    </Link>
                  </li>
                  <li className={currentURL === "/cordinator" ? "active" : ""}>
                    <Link to="/cordinator">
                    <i class="fas fa-globe"></i> <span>Cordinator</span>
                    </Link>
                  </li>
                  <li className={currentURL === "/teams" ? "active" : ""}>
                    <Link to="/teams">
                    <i class="fas fa-sitemap"></i> <span>Teams</span>
                    </Link>
                  </li>
                  <li
                    className={currentURL === "/testimonials" ? "active" : ""}
                  >
                    <Link to="/testimonials">
                    <i class="fas fa-search-dollar"></i> <span>Testimonials</span>
                    </Link>
                  </li>
                  <li
                    className={currentURL === "/admin-service" ? "active" : ""}
                  >
                    <Link to="/admin-service">
                    <i class="fas fa-users-cog"></i> <span>Services</span>
                    </Link>
                  </li>
                  <li className={currentURL === "/case-study" ? "active" : ""}>
                    <Link to="/case-study">
                    <i class="fas fa-blog"></i> <span>Blog</span>
                    </Link>
                  </li>
                  <li
                    className={
                      currentURL === "/e-clinic-request" ? "active" : ""
                    }
                  >
                    <Link to="/e-clinic-request">
                    <i class="fas fa-clinic-medical"></i>
                      <span>E-Clinic Request</span>
                    </Link>
                  </li>
                  <li
                    className={
                      currentURL === "/medicines" ? "active" : ""
                    }
                  >
                    <Link to="/medicines">
                    <i class="fas fa-file-prescription"></i> <span>Medicine</span>
                    </Link>
                  </li>
                  <li
                    className={
                      currentURL === "/insurence-request" ? "active" : ""
                    }
                  >
                    <Link to="/insurence-request">
                    <i class="fas fa-house-damage"></i> <span>Insurance Request</span>
                    </Link>
                  </li>
                  <li className={currentURL === "/careers" ? "active" : ""}>
                    <Link to="careers">
                      <i class="fas fa-graduation-cap"></i> <span>Careers</span>
                    </Link>
                  </li>
                  <li className={currentURL === "/admin-earnings" ? "active" : ""}>
                    <Link to="/admin-earnings">
                    <i class="fas fa-rupee-sign"></i>
                      <span>Earnings</span>
                    </Link>
                  </li>
                  <li className={currentURL === "/request" ? "active" : ""}>
                    <Link to="/request">
                      <i className="fas fa-clinic-medical"></i>
                      <span>Request</span>
                    </Link>
                  </li>
                  <li className={currentURL === "/appointments" ? "active" : ""}>
                    <Link to="/appointments">
                      <i className="far fa-calendar-alt"></i>{" "}
                      <span>Appointment</span>
                    </Link>
                  </li>
                  <li className={currentURL === "/complent" ? "active" : ""}>
                    <Link to="/complent">
                      <i class="far fa-dot-circle"></i> <span>Complaint</span>
                    </Link>
                  </li>
                </>
              )}
              {role === ROLES.PATIENT && (
                <>
                  <li className={currentURL === "/request" ? "active" : ""}>
                    <Link to="/request">
                      <i className="fas fa-clinic-medical"></i>
                      <span>Request</span>
                    </Link>
                  </li>
                  <li className={currentURL === "/services" ? "active" : ""}>
                    <Link to="/services">
                      <i className="fab fa-servicestack"></i>{" "}
                      <span>Services</span>
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="chat">
                      <i class="fa fa-comments"></i> <span>Chat</span>{" "}
                      <span class="badge badge-pill bg-primary float-right">
                        5
                      </span>
                    </Link>
                  </li> */}
                  <li className={currentURL === "/appointments" ? "active" : ""}>
                    <Link to="/appointments">
                      <i className="far fa-calendar-alt"></i>{" "}
                      <span>Appointment</span>
                    </Link>
                  </li>
                  <li className={currentURL === "/complent" ? "active" : ""}>
                    <Link to="/complent" className="dropdown-item">
                    <i class="fas fa-question-circle"></i>
                      <span>Support</span>
                    </Link>
                  </li>
                </>
              )}
              {role === ROLES.FRANCHISE && (
                <>
                  <li className={currentURL === "/referal" ? "active" : ""}>
                    <Link to="/referal">
                      <i className="fab fa-servicestack"></i>{" "}
                      <span>Referal</span>
                    </Link>
                  </li>
                  <li className={currentURL === "/transaction" ? "active" : ""}>
                    <Link to="/transaction">
                      <i class="far fa-dot-circle"></i>{" "}
                      <span>Transactions</span>
                    </Link>
                  </li>
                  <li className={currentURL === "/complent" ? "active" : ""}>
                    <Link to="/complent" className="dropdown-item">
                    <i class="fas fa-question-circle"></i>
                      <span>Support</span>
                    </Link>
                  </li>
                </>
              )}
              {role === ROLES.CORDINATOR && (
                <>
                  <li className={currentURL === "/request" ? "active" : ""}>
                    <Link to="/request">
                      <i className="fas fa-clinic-medical"></i>
                      <span>Request</span>
                    </Link>
                  </li>
                  <li className={currentURL === "/appointments" ? "active" : ""}>
                    <Link to="/appointments">
                      <i className="far fa-calendar-alt"></i>{" "}
                      <span>Appointment</span>
                    </Link>
                  </li>
                  <li className={currentURL === "/complent" ? "active" : ""}>
                    <Link to="/complent">
                      <i class="far fa-dot-circle"></i> <span>Complent</span>
                    </Link>
                  </li>
                </>
              )}
              {/* <li>
                <a href="doctors.html">
                  <i className="fa fa-user-md"></i> <span>Doctors</span>
                </a>
              </li>
              <li>
                <a href="patients.html">
                  <i className="fa fa-wheelchair"></i> <span>Patients</span>
                </a>
              </li>
              <li>
                <a href="appointments.html">
                  <i className="far fa-calendar-alt"></i> <span>Appointments</span>
                </a>
              </li>
              <li>
                <a href="schedule.html">
                  <i className="far fa-calendar-check"></i>{" "}
                  <span>Doctor Schedule</span>
                </a>
              </li>
              <li>
                <a href="departments.html">
                  <i className="far fa-building"></i> <span>Departments</span>
                </a>
              </li> */}
              {/* <li className="submenu">
                <a href="#">
                  <i className="fa fa-user"></i> <span> Employees </span>{" "}
                  <span className="menu-arrow"></span>
                </a>
                <ul>
                  <li>
                    <a href="employees.html">Employees List</a>
                  </li>
                  <li>
                    <a href="leaves.html">Leaves</a>
                  </li>
                  <li>
                    <a href="holidays.html">Holidays</a>
                  </li>
                  <li>
                    <a href="attendance.html">Attendance</a>
                  </li>
                </ul>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
