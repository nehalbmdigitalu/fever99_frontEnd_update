import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import serviceImg from "../../assets/img/service.png";
import { getItemList } from "./dependencies/action";
import { Link, redirect } from "react-router-dom";
import { getDocumentLink } from "../../dependencies/utils/helper";

function Services() {
  const dispatch = useDispatch();
  const { ItemList } = useSelector((state) => state.service);
  const [query] = useState({ page: 1, limit: 10 })
  useEffect(() => {
    dispatch(getItemList(query))
  }, [dispatch, query])
  const handleBookService = (id) => {
  }
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-sm-12 col-9 m-b-20">
              <h4 className="page-title">Services</h4>
            </div>
          </div>
          <div className="row doctor-grid">
            {ItemList &&
              ItemList.map((item, index) => (
                <div
                  className="col-md-4 col-sm-4 col-xs-6 col-lg-3"
                  key={index}
                >
                  <div className="profile-widget">
                    <div className="doctor-img">
                      <a className="avatar" href="#0">
                        <img alt="" src={getDocumentLink(item.image)} />
                      </a>
                    </div>

                    <h4 className="doctor-name text-ellipsis">
                      <a href="#0">{item.name}</a>
                    </h4>
                    <div className="doc-prof">{item.name}</div>

                    <div>
                      <button
                        type="button"
                        className="btn btn-sm btn-warning"
                        onClick={() => handleBookService(item._id)}
                      >
                        View Details
                      </button>
                      <Link to={`/service/view/${item._id}`} className="btn btn-sm btn-warning">View Details</Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Services;
