import React from "react";
import { Link } from "react-router-dom";

import "./index.scss";
import { FaLocationDot } from "react-icons/fa";
import { BiSolidMessage } from "react-icons/bi";
import { IoCall } from "react-icons/io";


function MainHeader() {

    return (
        <>
            <section className="bg-dark">
                <div className="container px-5 py-1 d-none d-lg-block">
                    <div className="row gx-0 align-items-center" style={{ height: "45px" }}>
                        <div className="col-lg-6 text-center text-lg-start mb-lg-0">
                            <div className="d-flex flex-wrap">
                                <Link to="#" className="text-light me-4"><FaLocationDot className="" style={{ color: "#50B148" }} /><span className="px-1">Find A Location</span></Link>
                                <Link to="#" className="text-light me-0"><BiSolidMessage style={{ color: "#50B148" }} />
                                    <span className="px-1"> info@fever99.com</span></Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="d-flex align-items-center justify-content-end">
                                <Link to="#" className="text-light me-4"><IoCall style={{ color: "#50B148" }} />
                                    <span className="px-1">+91 6262808062</span></Link>
                                <Link to="#" className="text-light me-0"><i className="fas fa-envelope text-primary me-2"></i>info@fever99.com</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default MainHeader;