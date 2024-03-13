import React from "react";
import patient from "../../assets/img/patient-thumb-02.jpg";
import attatchemnt from "../../assets/img/attachment.png";

function Chat() {
  return (
    <>
      <div className="page-wrapper" style={{ minHeight: "625px" }}>
        {/* <div className="content"> */}
        <div className="chat-main-row">
          <div className="chat-main-wrapper">
            <div className="col-lg-9 message-view task-view">
              <div className="chat-window">
                <div className="fixed-header">
                  <div className="navbar">
                    <div
                      className="user-details mr-auto"
                      style={{ display: "flex", marginRight: "auto" }}
                    >
                      <div className="float-left user-img m-r-10">
                        <a href="profile.html" title="Jennifer Robinson">
                          <img
                            src={patient}
                            alt
                            className="w-40 rounded-circle"
                          />
                          <span className="status online"></span>
                        </a>
                      </div>
                      <div className="user-info float-left">
                        <a
                          href="profile.html"
                          style={{ textDecoration: "none" }}
                        >
                          <span className="font-bold">Jennifer Robinson </span>
                          <i className="typing-text">Typing...</i>
                        </a>
                        <span className="last-seen">
                          Last seen today at 7:50 AM
                        </span>
                      </div>
                    </div>
                    <div className="search-box">
                      <div className="input-group input-group-sm">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search"
                        />
                        <span className="input-group-append">
                          <button className="btn" type="button">
                            <i className="fa fa-search"></i>
                          </button>
                        </span>
                      </div>
                    </div>
                    <ul className="nav custom-menu">
                      <li className="nav-item">
                        <a
                          href="#chat_sidebar"
                          className="nav-link task-chat profile-rightbar float-right"
                        >
                          <i className="fa fa-user"></i>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="voice-call.html">
                          <i className="fas fa-phone-alt"></i>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="video-call.html">
                          <i className="fas fa-video"></i>
                        </a>
                      </li>
                      <li className="nav-item dropdown dropdown-action">
                        <a
                          href
                          className="nav-link dropdown-toggle"
                          data-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fa fa-cog"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a
                            className="dropdown-item"
                            href="javascript:void(0)"
                          >
                            Delete Conversations
                          </a>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0)"
                          >
                            Settings
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="chat-contents">
                  <div className="chat-content-wrap">
                    <div className="chat-wrap-inner">
                      <div className="chat-box">
                        <div className="chats">
                          <div className="chat chat-right">
                            <div className="chat-body">
                              <div className="chat-bubble">
                                <div className="chat-content">
                                  <p>Hello. What can I do for you?</p>
                                  <span className="chat-time">8:30 am</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="chat-line">
                            <span className="chat-date">October 8th, 2015</span>
                          </div>
                          <div className="chat chat-left">
                            <div className="chat-avatar">
                              <a href="profile.html" className="avatar">
                                <img
                                  alt="Jennifer Robinson"
                                  src={patient}
                                  className="img-fluid rounded-circle"
                                />
                              </a>
                            </div>
                            <div className="chat-body">
                              <div className="chat-bubble">
                                <div className="chat-content">
                                  <p>I'm just looking around.</p>
                                  <p>
                                    Will you tell me something about yourself?{" "}
                                  </p>
                                  <span className="chat-time">8:35 am</span>
                                </div>
                              </div>
                              <div className="chat-bubble">
                                <div className="chat-content">
                                  <p>Are you there? That time!</p>
                                  <span className="chat-time">8:40 am</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="chat chat-right">
                            <div className="chat-body">
                              <div className="chat-bubble">
                                <div className="chat-content">
                                  <p>Where?</p>
                                  <span className="chat-time">8:35 am</span>
                                </div>
                              </div>
                              <div className="chat-bubble">
                                <div className="chat-content">
                                  <p>
                                    OK, my name is Limingqiang. I like singing,
                                    playing basketballand so on.
                                  </p>
                                  <span className="chat-time">8:42 am</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="chat chat-left">
                            <div className="chat-avatar">
                              <a href="profile.html" className="avatar">
                                <img
                                  alt="Jennifer Robinson"
                                  src={patient}
                                  className="img-fluid rounded-circle"
                                />
                              </a>
                            </div>
                            <div className="chat-body">
                              <div className="chat-bubble">
                                <div className="chat-content">
                                  <p>You wait for notice.</p>
                                  <span className="chat-time">8:30 am</span>
                                </div>
                              </div>
                              <div className="chat-bubble">
                                <div className="chat-content">
                                  <p>Consectetuorem ipsum dolor sit?</p>
                                  <span className="chat-time">8:50 am</span>
                                </div>
                              </div>
                              <div className="chat-bubble">
                                <div className="chat-content">
                                  <p>OK?</p>
                                  <span className="chat-time">8:55 am</span>
                                </div>
                              </div>
                              <div className="chat-bubble">
                                <div className="chat-content img-content">
                                  <div className="chat-img-group clearfix">
                                    <p>Uploaded 3 Images</p>
                                    <a className="chat-img-attach" href="#">
                                      <img
                                        width="182"
                                        height="137"
                                        alt
                                        src="assets/img/placeholder.jpg"
                                      />
                                      <div className="chat-placeholder">
                                        <div className="chat-img-name">
                                          placeholder.jpg
                                        </div>
                                        <div className="chat-file-desc">
                                          842 KB
                                        </div>
                                      </div>
                                    </a>
                                    <a className="chat-img-attach" href="#">
                                      <img
                                        width="182"
                                        height="137"
                                        alt
                                        src="assets/img/placeholder.jpg"
                                      />
                                      <div className="chat-placeholder">
                                        <div className="chat-img-name">
                                          842 KB
                                        </div>
                                      </div>
                                    </a>
                                    <a className="chat-img-attach" href="#">
                                      <img
                                        width="182"
                                        height="137"
                                        alt
                                        src="assets/img/placeholder.jpg"
                                      />
                                      <div className="chat-placeholder">
                                        <div className="chat-img-name">
                                          placeholder.jpg
                                        </div>
                                        <div className="chat-file-desc">
                                          842 KB
                                        </div>
                                      </div>
                                    </a>
                                  </div>
                                  <span className="chat-time">9:00 am</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="chat chat-right">
                            <div className="chat-body">
                              <div className="chat-bubble">
                                <div className="chat-content">
                                  <p>OK!</p>
                                  <span className="chat-time">9:00 am</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="chat chat-left">
                            <div className="chat-avatar">
                              <a href="profile.html" className="avatar">
                                <img
                                  alt="Jennifer Robinson"
                                  src={patient}
                                  className="img-fluid rounded-circle"
                                />
                              </a>
                            </div>
                            <div className="chat-body">
                              <div className="chat-bubble">
                                <div className="chat-content">
                                  <p>Uploaded 3 files</p>
                                  <ul className="attach-list">
                                    <li>
                                      <i className="fa fa-file"></i>
                                      <a href="#">example.avi</a>
                                    </li>
                                    <li>
                                      <i className="fa fa-file"></i>
                                      <a href="#">activity.psd</a>
                                    </li>
                                    <li>
                                      <i className="fa fa-file"></i>
                                      <a href="#">example.psd</a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="chat-bubble">
                                <div className="chat-content">
                                  <p>Consectetuorem ipsum dolor sit?</p>
                                  <span className="chat-time">8:50 am</span>
                                </div>
                              </div>
                              <div className="chat-bubble">
                                <div className="chat-content">
                                  <p>OK?</p>
                                  <span className="chat-time">8:55 am</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="chat chat-right">
                            <div className="chat-body">
                              <div className="chat-bubble">
                                <div className="chat-content img-content">
                                  <div className="chat-img-group clearfix">
                                    <p>Uploaded 6 Images</p>
                                    <a className="chat-img-attach" href="#">
                                      <img
                                        width="182"
                                        height="137"
                                        alt
                                        src="assets/img/placeholder.jpg"
                                      />
                                      <div className="chat-placeholder">
                                        <div className="chat-img-name">
                                          placeholder.jpg
                                        </div>
                                        <div className="chat-file-desc">
                                          842 KB
                                        </div>
                                      </div>
                                    </a>
                                    <a className="chat-img-attach" href="#">
                                      <img
                                        width="182"
                                        height="137"
                                        alt
                                        src="assets/img/placeholder.jpg"
                                      />
                                      <div className="chat-placeholder">
                                        <div className="chat-img-name">
                                          842 KB
                                        </div>
                                      </div>
                                    </a>
                                    <a className="chat-img-attach" href="#">
                                      <img
                                        width="182"
                                        height="137"
                                        alt
                                        src="assets/img/placeholder.jpg"
                                      />
                                      <div className="chat-placeholder">
                                        <div className="chat-img-name">
                                          placeholder.jpg
                                        </div>
                                        <div className="chat-file-desc">
                                          842 KB
                                        </div>
                                      </div>
                                    </a>
                                    <a className="chat-img-attach" href="#">
                                      <img
                                        width="182"
                                        height="137"
                                        alt
                                        src="assets/img/placeholder.jpg"
                                      />
                                      <div className="chat-placeholder">
                                        <div className="chat-img-name">
                                          placeholder.jpg
                                        </div>
                                        <div className="chat-file-desc">
                                          842 KB
                                        </div>
                                      </div>
                                    </a>
                                    <a className="chat-img-attach" href="#">
                                      <img
                                        width="182"
                                        height="137"
                                        alt
                                        src="assets/img/placeholder.jpg"
                                      />
                                      <div className="chat-placeholder">
                                        <div className="chat-img-name">
                                          placeholder.jpg
                                        </div>
                                        <div className="chat-file-desc">
                                          842 KB
                                        </div>
                                      </div>
                                    </a>
                                    <a className="chat-img-attach" href="#">
                                      <img
                                        width="182"
                                        height="137"
                                        alt
                                        src="assets/img/placeholder.jpg"
                                      />
                                      <div className="chat-placeholder">
                                        <div className="chat-img-name">
                                          placeholder.jpg
                                        </div>
                                        <div className="chat-file-desc">
                                          842 KB
                                        </div>
                                      </div>
                                    </a>
                                  </div>
                                  <span className="chat-time">9:00 am</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="chat chat-left">
                            <div className="chat-avatar">
                              <a href="profile.html" className="avatar">
                                <img
                                  alt="Jennifer Robinson"
                                  src={patient}
                                  className="img-fluid rounded-circle"
                                />
                              </a>
                            </div>
                            <div className="chat-body">
                              <div className="chat-bubble">
                                <div className="chat-content">
                                  <ul className="attach-list">
                                    <li className="pdf-file">
                                      <i className="far fa-file-pdf"></i>
                                      <a href="#">Document_2016.pdf</a>
                                    </li>
                                  </ul>
                                  <span className="chat-time">9:00 am</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="chat chat-right">
                            <div className="chat-body">
                              <div className="chat-bubble">
                                <div className="chat-content">
                                  <ul className="attach-list">
                                    <li className="pdf-file">
                                      <i className="far fa-file-pdf"></i>
                                      <a href="#">Document_2016.pdf</a>
                                    </li>
                                  </ul>
                                  <span className="chat-time">9:00 am</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="chat chat-left">
                            <div className="chat-avatar">
                              <a href="profile.html" className="avatar">
                                <img
                                  alt="Jennifer Robinson"
                                  src={patient}
                                  className="img-fluid rounded-circle"
                                />
                              </a>
                            </div>
                            <div className="chat-body">
                              <div className="chat-bubble">
                                <div className="chat-content">
                                  <p>Typing ...</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="chat-footer">
                  <div className="message-bar">
                    <div className="message-inner">
                      <a
                        className="link attach-icon"
                        href="#"
                        data-toggle="modal"
                        data-target="#drag_files"
                      >
                        <img src={attatchemnt} alt />
                      </a>
                      <div className="message-area">
                        <div className="input-group">
                          <textarea
                            className="form-control"
                            placeholder="Type message..."
                          ></textarea>
                          <span className="input-group-append">
                            <button className="btn btn-primary" type="button">
                              <i className="fas fa-paper-plane"></i>
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 message-view chat-profile-view chat-sidebar"
              id="chat_sidebar"
            >
              <div className="chat-window video-window">
                <div className="fixed-header">
                  <ul className="nav nav-tabs nav-tabs-bottom">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        href="#profile_tab"
                        data-toggle="tab"
                      >
                        Doctors
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="tab-content chat-contents">
                  <div
                    className="content-full tab-pane show active"
                    id="profile_tab"
                  >
                    <div className="chat-wrap-inner">
                      <div className="chat-box">
                        <div className="chats">
                          <div class="chat chat-left">
                            <div class="chat-avatar" style={{ marginTop:'5px' }}>
                              <a href="profile.html" class="avatar">
                                <img
                                  alt="Cristina Groves"
                                  src={patient}
                                  class="img-fluid rounded-circle"
                                />
                              </a>
                            </div>
                            <div class="chat-body">
                              <div class="chat-bubble">
                                <div class="chat-content">
                                  <label class="task-chat-user" style={{ width:'100%' }}>Iswarya</label>
                                  <span class="chat-time">Last Seen 8:35 am</span>                                  
                                </div>
                              </div>
                            </div>

                            <div class="chat-avatar" style={{ marginTop:'5px' }}>
                              <a href="profile.html" class="avatar">
                                <img
                                  alt="Cristina Groves"
                                  src={patient}
                                  class="img-fluid rounded-circle"
                                />
                              </a>
                            </div>
                            <div class="chat-body">
                              <div class="chat-bubble">
                                <div class="chat-content">
                                  <label class="task-chat-user" style={{ width:'100%' }}>Iswarya</label>
                                  <span class="chat-time">Last Seen 8:35 am</span>                                  
                                </div>
                              </div>
                            </div>

                            <div class="chat-avatar" style={{ marginTop:'5px' }}>
                              <a href="profile.html" class="avatar">
                                <img
                                  alt="Cristina Groves"
                                  src={patient}
                                  class="img-fluid rounded-circle"
                                />
                              </a>
                            </div>
                            <div class="chat-body">
                              <div class="chat-bubble">
                                <div class="chat-content">
                                  <label class="task-chat-user" style={{ width:'100%' }}>Iswarya</label>
                                  <span class="chat-time">Last Seen 8:35 am</span>                                  
                                </div>
                              </div>
                            </div>

                            <div class="chat-avatar" style={{ marginTop:'5px' }}>
                              <a href="profile.html" class="avatar">
                                <img
                                  alt="Cristina Groves"
                                  src={patient}
                                  class="img-fluid rounded-circle"
                                />
                              </a>
                            </div>
                            <div class="chat-body">
                              <div class="chat-bubble">
                                <div class="chat-content">
                                  <label class="task-chat-user" style={{ width:'100%' }}>Iswarya</label>
                                  <span class="chat-time">Last Seen 8:35 am</span>                                  
                                </div>
                              </div>
                            </div>

                            <div class="chat-avatar" style={{ marginTop:'5px' }}>
                              <a href="profile.html" class="avatar">
                                <img
                                  alt="Cristina Groves"
                                  src={patient}
                                  class="img-fluid rounded-circle"
                                />
                              </a>
                            </div>
                            <div class="chat-body">
                              <div class="chat-bubble">
                                <div class="chat-content">
                                  <label class="task-chat-user" style={{ width:'100%' }}>Iswarya</label>
                                  <span class="chat-time">Last Seen 8:35 am</span>                                  
                                </div>
                              </div>
                            </div>

                            <div class="chat-avatar" style={{ marginTop:'5px' }}>
                              <a href="profile.html" class="avatar">
                                <img
                                  alt="Cristina Groves"
                                  src={patient}
                                  class="img-fluid rounded-circle"
                                />
                              </a>
                            </div>
                            <div class="chat-body">
                              <div class="chat-bubble">
                                <div class="chat-content">
                                  <label class="task-chat-user" style={{ width:'100%' }}>Iswarya</label>
                                  <span class="chat-time">Last Seen 8:35 am</span>                                  
                                </div>
                              </div>
                            </div>

                            <div class="chat-avatar" style={{ marginTop:'5px' }}>
                              <a href="profile.html" class="avatar">
                                <img
                                  alt="Cristina Groves"
                                  src={patient}
                                  class="img-fluid rounded-circle"
                                />
                              </a>
                            </div>
                            <div class="chat-body">
                              <div class="chat-bubble">
                                <div class="chat-content">
                                  <label class="task-chat-user" style={{ width:'100%' }}>Iswarya</label>
                                  <span class="chat-time">Last Seen 8:35 am</span>                                  
                                </div>
                              </div>
                            </div>

                            <div class="chat-avatar" style={{ marginTop:'5px' }}>
                              <a href="profile.html" class="avatar">
                                <img
                                  alt="Cristina Groves"
                                  src={patient}
                                  class="img-fluid rounded-circle"
                                />
                              </a>
                            </div>
                            <div class="chat-body">
                              <div class="chat-bubble">
                                <div class="chat-content">
                                  <label class="task-chat-user" style={{ width:'100%' }}>Iswarya</label>
                                  <span class="chat-time">Last Seen 8:35 am</span>                                  
                                </div>
                              </div>
                            </div>

                            <div class="chat-avatar" style={{ marginTop:'5px' }}>
                              <a href="profile.html" class="avatar">
                                <img
                                  alt="Cristina Groves"
                                  src={patient}
                                  class="img-fluid rounded-circle"
                                />
                              </a>
                            </div>
                            <div class="chat-body">
                              <div class="chat-bubble">
                                <div class="chat-content">
                                  <label class="task-chat-user" style={{ width:'100%' }}>Iswarya</label>
                                  <span class="chat-time">Last Seen 8:35 am</span>                                  
                                </div>
                              </div>
                            </div>

                            <div class="chat-avatar" style={{ marginTop:'5px' }}>
                              <a href="profile.html" class="avatar">
                                <img
                                  alt="Cristina Groves"
                                  src={patient}
                                  class="img-fluid rounded-circle"
                                />
                              </a>
                            </div>
                            <div class="chat-body">
                              <div class="chat-bubble">
                                <div class="chat-content">
                                  <label class="task-chat-user" style={{ width:'100%' }}>Iswarya</label>
                                  <span class="chat-time">Last Seen 8:35 am</span>                                  
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div id="drag_files" className="modal fade" role="dialog">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title">Drag and drop files upload</h3>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <form id="js-upload-form">
                    <div className="upload-drop-zone" id="drop-zone">
                      <i className="fa fa-cloud-upload fa-2x"></i>{" "}
                      <span className="upload-text">
                        Just drag and drop files here
                      </span>
                    </div>
                    <h4>Uploading</h4>
                    <ul className="upload-list">
                      <li className="file-list">
                        <div className="upload-wrap">
                          <div className="file-name">
                            <i className="fa fa-photo"></i> photo.png
                          </div>
                          <div className="file-size">1.07 gb</div>
                          <button type="button" className="file-close">
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                        <div className="progress progress-xs progress-striped">
                          <div
                            className="progress-bar bg-success"
                            role="progressbar"
                            style={{ width: "65%" }}
                          ></div>
                        </div>
                        <div className="upload-process">37% done</div>
                      </li>
                      <li className="file-list">
                        <div className="upload-wrap">
                          <div className="file-name">
                            <i className="fa fa-file"></i> task.doc
                          </div>
                          <div className="file-size">5.8 kb</div>
                          <button type="button" className="file-close">
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                        <div className="progress progress-xs progress-striped">
                          <div
                            className="progress-bar bg-success"
                            role="progressbar"
                            style={{ width: "65%" }}
                          ></div>
                        </div>
                        <div className="upload-process">37% done</div>
                      </li>
                      <li className="file-list">
                        <div className="upload-wrap">
                          <div className="file-name">
                            <i className="fa fa-photo"></i> dashboard.png
                          </div>
                          <div className="file-size">2.1 mb</div>
                          <button type="button" className="file-close">
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                        <div className="progress progress-xs progress-striped">
                          <div
                            className="progress-bar bg-success"
                            role="progressbar"
                            style={{ width: "65%" }}
                          ></div>
                        </div>
                        <div className="upload-process">Completed</div>
                      </li>
                    </ul>
                  </form>
                  <div className="m-t-30 text-center">
                    <button className="btn btn-primary submit-btn">
                      Add to upload
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

        {/* <div id="add_group" className="modal fade">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title">Create a group</h3>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <p>
                    Groups are where your team communicates. They’re best when
                    organized around a topic — #leads, for example.
                  </p>
                  <form>
                    <div className="form-group">
                      <label>
                        Group Name <span className="text-danger">*</span>
                      </label>
                      <input className="form-control" type="text" />
                    </div>
                    <div className="form-group">
                      <label>
                        Send invites to:{" "}
                        <span className="text-muted-light">(optional)</span>
                      </label>
                      <input className="form-control" type="text" />
                    </div>
                    <div className="m-t-50 text-center">
                      <button className="btn btn-primary submit-btn">
                        Create Group
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div> */}

        {/* <div id="add_chat_user" className="modal fade " role="dialog">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title">Create Chat Group</h3>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <div className="input-group m-b-30">
                    <input
                      placeholder="Search to start a chat"
                      className="form-control search-input"
                      id="btn-input"
                      type="text"
                    />
                    <span className="input-group-append">
                      <button className="btn btn-primary">Search</button>
                    </span>
                  </div>
                  <div>
                    <h5>Recent Conversations</h5>
                    <ul className="chat-user-list">
                      <li>
                        <a href="#">
                          <div className="media">
                            <span className="avatar align-self-center">J</span>
                            <div className="media-body align-self-center text-nowrap">
                              <div className="user-name">Jeffery Lalor</div>
                              <span className="designation">Team Leader</span>
                            </div>
                            <div className="text-nowrap align-self-center">
                              <div className="online-date">1 day ago</div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <div className="media ">
                            <span className="avatar align-self-center">B</span>
                            <div className="media-body align-self-center text-nowrap">
                              <div className="user-name">Bernardo Galaviz</div>
                              <span className="designation">Web Developer</span>
                            </div>
                            <div className="align-self-center text-nowrap">
                              <div className="online-date">3 days ago</div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <div className="media">
                            <span className="avatar align-self-center">
                              <img src="assets/img/user.jpg" alt="John Doe" />
                            </span>
                            <div className="media-body text-nowrap align-self-center">
                              <div className="user-name">John Doe</div>
                              <span className="designation">Web Designer</span>
                            </div>
                            <div className="align-self-center text-nowrap">
                              <div className="online-date">7 months ago</div>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="m-t-50 text-center">
                    <button className="btn btn-primary submit-btn">
                      Create Group
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

        {/* <div id="share_files" className="modal fade" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title">Share File</h3>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <div className="files-share-list">
                    <div className="files-cont">
                      <div className="file-type">
                        <span className="files-icon">
                          <i className="far fa-file-pdf"></i>
                        </span>
                      </div>
                      <div className="files-info">
                        <span className="file-name text-ellipsis">
                          AHA Selfcare Mobile Application Test-Cases.xls
                        </span>
                        <span className="file-author">
                          <a href="#">Bernardo Galaviz</a>
                        </span>{" "}
                        <span className="file-date">May 31st at 6:53 PM</span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Share With</label>
                    <input className="form-control" type="text" />
                  </div>
                  <div className="m-t-50 text-center">
                    <button className="btn btn-primary submit-btn">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        {/* </div> */}
      </div>
    </>
  );
}

export default Chat;
