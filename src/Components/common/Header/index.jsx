import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../assets/img/Logo_Hospital.png";
import userIcon from "../../../assets/img/user-06.jpg";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../../../dependencies/store/storage";
import AddWallet from "./AddWallet";
import { ROLES } from "../../../constants/role";
import {
  getNotification,
  getWallet,
  updateUserAvaliableStatus,
} from "../../Dashboard/dependencies/action";
import { getDocumentLink, timeAgo } from "../../../dependencies/utils/helper";
import Autocomplete from "./Autocomplete";
import { useRef } from "react";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLogin, wallet } = useSelector((store) => store.login);
  const { NotificationList } = useSelector((state) => state.Notification);
  const [profileDropDown, setProfileDropDown] = useState(false);
  const [show, setShow] = useState(false);
  const [toggleNotification, setToggleNotification] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [showLocation, setShowLocation] = useState(false);
  const role = storage.getUserRole();
  const currentURL = location.pathname;
  const userLocation = storage.getLocation() ?? "Set Location";
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const [userAvaliable, setUserAvaliable] = useState("offline");

  const updateUserStatus = (status) => {
    let data = { userStatus: status };
    if (user && user._id) {
      dispatch(updateUserAvaliableStatus(user._id, data));
    }
  };

  useEffect(() => {
    if(user && user.name) {
      setUserAvaliable(user.userStatus)
    }
  },[user])

  const handleSetOnlineOffline = (status) => {
    setUserAvaliable(status);
    updateUserStatus(status);
  };

  useEffect(() => {
    if (role === ROLES.FRANCHISE) {
      dispatch(getWallet());
    }

    const interval = setInterval(() => {
      if (role === ROLES.FRANCHISE) {
        dispatch(getWallet());
      }
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setProfileDropDown(false);
    }

    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setToggleNotification(false);
    }
  };

  useEffect(() => {
    if (isLogin) {
      dispatch(getNotification());
    }
  }, [isLogin, dispatch, getNotification]);

  const handleToggleNotification = () => {
    if (toggleNotification) {
      setToggleNotification(false);
    } else {
      setToggleNotification(true);
    }
  };
  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (
    currentURL == "/" ||
    currentURL == "/login" ||
    currentURL == "/register" ||
    currentURL.split("/")[1] == "people" ||
    currentURL == "/terms-condition" ||
    currentURL == "/privacy" ||
    currentURL == "/forgot-password" ||
    currentURL.split("/")[1] == "blog" ||
    currentURL.split("/")[1] == "home-service" ||
    currentURL == "/about" ||
    currentURL == "/service" ||
    currentURL == "/career" ||
    currentURL == "/refuncpolicy" ||
    currentURL == "/e-clinic-register" ||
    currentURL.split("/")[1] == "prescription"
  ) {
    return null;
  }

  const dropDownToggle = () => {
    if (profileDropDown) {
      setProfileDropDown(false);
    } else {
      setProfileDropDown(true);
    }
  };

  const handleAddWalletClose = (value) => {
    setShow(value);
  };

  const handleLogout = () => {
    storage.clear();
    dropDownToggle();
    window.location.href = "/";
  };

  const handleAddWallet = (e) => {
    e.preventDefault();

    setShow(true);
  };

  return (
    <>
      <div className="header-menu">
        <div className="header-left">
          <Link to="/dashboard" className="logo">
            <img src={Logo} width="140" alt="" />
            {/* <span>Fever99</span> */}
          </Link>
        </div>

        {/* <div className="menubar">
          <a id="toggle_btn" href="#0">
            <i className="fas fa-bars"></i>
          </a>
        </div> */}

        {/* <div className="searchbar">
				<form className="form-inline my-1 w-25 float-left">
					<input className="form-control mr-sm-2 search-input search_icon" type="search" placeholder="Search..." />
				</form>
			</div> */}

        {/* <a id="mobile_btn" className="mobile_btn float-left" href="#sidebar">
          <i className="fa fa-bars"></i>
        </a> */}

        <ul className="nav user-menu float-right" style={{ float: "right" }}>
          {ROLES.FRANCHISE == role && (
            <li className="nav-item d-none d-sm-block">
              <a
                href="#0"
                onClick={(e) => handleAddWallet(e)}
                className="hasnotifications nav-link"
              >
                Rs. {wallet}
              </a>
            </li>
          )}

          <li className="nav-item dropdown d-none d-sm-block">
            <a
              href="#0"
              id="open_msg_box"
              className="hasnotifications nav-link"
              onClick={() => handleToggleNotification()}
            >
              <i class="far fa-bell"></i>
              <span className="badge badge-pill bg-danger float-right">8</span>
            </a>
            {/* Notification List begain */}
            <div
              ref={notificationRef}
              class={
                toggleNotification
                  ? "dropdown-menu notifications show"
                  : "dropdown-menu notifications"
              }
              x-placement="bottom-start"
              style={{
                position: "absolute",
                willChange: "transform",
                top: "0px",
                left: "0px",
                transform: "translate3d(-170px, 70px, 0px)",
              }}
            >
              <div class="topnav-dropdown-header">
                <span>Notifications</span>
              </div>
              <div class="drop-scroll">
                <ul class="notification-list">
                  {NotificationList &&
                    NotificationList.map((noti, index) => (
                      <li class="notification-message">
                        <a href="#0">
                          <div class="media d-flex">
                            <span class="avatar">
                              <img
                                alt="John Doe"
                                src={userIcon}
                                class="img-fluid"
                              />
                            </span>
                            <div class="media-body">
                              <p class="noti-details">
                                {" "}
                                {noti.message}
                                {/* <span class="noti-title">John Doe</span> added
                                new task{" "}
                                <span class="noti-title">
                                  Patient appointment booking
                                </span> */}
                              </p>
                              <p class="noti-time text-end">
                                <span class="notification-time">
                                  {timeAgo(noti.timestamp)}
                                </span>
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
              {/* <div class="topnav-dropdown-footer">
                <a href="activities.html">View all Notifications</a>
              </div> */}
            </div>
            {/* Notification List End */}
          </li>

          {ROLES.PATIENT === role && (
            <li className="nav-item dropdown d-none d-sm-block">
              <a
                href="#0"
                className="nav-link user-link"
                onClick={() => setShowLocation(true)}
              >
                <span className="text-danger">
                  <i className="fa fa-map-marker"></i> {userLocation}
                </span>
              </a>
            </li>
          )}

          <li
            className={
              profileDropDown
                ? `nav-item dropdown has-arrow show`
                : `nav-item dropdown has-arrow`
            }
          >
            <a
              href="#"
              className="dropdown-toggle nav-link user-link"
              data-toggle="dropdown"
              onClick={() => dropDownToggle()}
            >
              <span>Hi {user.name}</span>&nbsp;
              <span className="user-img">
                <img
                  className="rounded-circle"
                  src={getDocumentLink(user.image)}
                  width="24"
                  alt={user.name}
                />
                {role === ROLES.DOCTOR && (
                  <span className={`status ${userAvaliable}`}></span>
                )}
              </span>
            </a>
            <div
              className={
                profileDropDown ? `dropdown-menu show` : `dropdown-menu`
              }
              ref={dropdownRef}
            >
              {role === ROLES.DOCTOR && (
                <a
                  className="dropdown-item"
                  onClick={() =>
                    handleSetOnlineOffline(
                      userAvaliable === "online" ? "offline" : "online"
                    )
                  }
                >
                  Set {userAvaliable === "online" ? "Offline" : "Online"}
                </a>
              )}
              {/* <Link className="dropdown-item" to="my-profile">
                My Profile
              </Link> */}
              <Link className="dropdown-item" to="edit-profile">
                Edit Profile
              </Link>

              {role !== ROLES.PATIENT && (
                <Link className="dropdown-item" to="settings">
                  Settings
                </Link>
              )}

              <a className="dropdown-item" onClick={() => handleLogout()}>
                Logout
              </a>
            </div>
          </li>
        </ul>

        {/* <div className="dropdown mobile-user-menu float-right">
          <a
            href="#"
            className="dropdown-toggle d-sm-none"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a className="dropdown-item" href="profile.html">
              My Profile
            </a>
            <a className="dropdown-item" href="edit-profile.html">
              Edit Profile
            </a>
            <a className="dropdown-item" href="settings.html">
              Settings
            </a>
            <a className="dropdown-item" href="login.html">
              Logout
            </a>
          </div>
        </div> */}
      </div>
      <AddWallet
        show={show}
        handleClose={(value) => handleAddWalletClose(value)}
      />
      <Autocomplete
        show={showLocation}
        handleClose={(value) => setShowLocation(value)}
        setAddress={(value) => setLocationName(value)}
      />
    </>
  );
}

export default Header;
