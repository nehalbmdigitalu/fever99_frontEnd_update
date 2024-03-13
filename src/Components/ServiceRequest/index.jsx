import React, { useEffect, useState } from "react";
import { storage } from "../../dependencies/store/storage";
import { ROLES } from "../../constants/role";
import { Link } from "react-router-dom";
import Table from "../common/Table";
import { useDispatch, useSelector } from "react-redux";
import TableColumn from "./dependiencies/TableColumn";
import { getItemList, updateOrder } from "./dependiencies/action";

function ServiceRequest(props) {
  const { ItemList, ItemTotalPage } = useSelector(
    (state) => state.serviceRequest
  );
  const role = storage.getUserRole();
  const dispatch = useDispatch();
  const [query, setQuery] = useState({ page: 1, size: 10 });
  const handleEdit = (id, action) => {
    switch (action) {
      case 'payment':
        dispatch(updateOrder(id, {paymentStatus: 'paid'})).then(res => {
          dispatch(getItemList(query))
        })
        break;
      case 'service':
        dispatch(updateOrder(id, {status: 'completed'})).then(res => {
          dispatch(getItemList(query))
        })
        break;
      default:        
        break;
    }
  };
  const handlePageChange = (page) => {
    setQuery({ ...query, page: page });
  };
  useEffect(() => {
    dispatch(getItemList(query));
  }, [query]);
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div
            className="row"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="col-sm-4 col-3">
              <h4 className="page-title">Service Request</h4>
            </div>
            <div
              className="col-sm-8 col-9 text-right m-b-20"
              style={{ textAlign: "end" }}
            >
              {ROLES.PATIENT == role && (
                <Link
                  to="/services"
                  className="btn btn btn-primary btn-rounded float-right"
                >
                  <i className="fa fa-plus"></i> Book Service
                </Link>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <Table
                      columns={TableColumn({
                        handleEdit,                        
                        pageNo: query.page - 1,
                        size: query.size,
                      })}
                      dataTable={ItemList}
                      totalRecord={ItemTotalPage}
                      onPageChange={handlePageChange}
                      onTableChange={() => {}}
                      keyField="_id"
                      sizePerPage={query.size}
                      // pageSizeChange={(value) => handlePageSizeChange(value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceRequest;
