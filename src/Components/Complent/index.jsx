import React, { useEffect, useState } from "react";
import { storage } from "../../dependencies/store/storage";
import { ROLES } from "../../constants/role";
import { Link } from "react-router-dom";
import Table from "../common/Table";
import { useDispatch, useSelector } from "react-redux";
import TableColumn from "./dependiencies/TableColumn";
import { getItemList, updateComplent } from "./dependiencies/action";
import Answer from "./Update";

function Complaint(props) {
  const { ItemList, ItemTotalPage } = useSelector(
    (state) => state.serviceRequest
  );
  const role = storage.getUserRole();
  const dispatch = useDispatch();
  const [query, setQuery] = useState({ page: 1, size: 10 });
  const [rowData, setRowData] = useState({});
  const [showAnswer, setShowAnswer] = useState(false);
  const handleAnswer = (row) => {
    setRowData(row);
    setShowAnswer(true);
  };
  const handlePageChange = (page) => {
    setQuery({ ...query, page: page });
  };
  useEffect(() => {
    dispatch(getItemList(query));
  }, [query]);
  const handleUpdate = (id, data) => {
    dispatch(updateComplent(id, data)).then((res) => {
      if (res.status) {
        setRowData({});
        setShowAnswer(false);
        dispatch(getItemList(query));
      }
    });
  };
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div
            className="row"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="col-sm-4 col-3">
              {role === ROLES.PATIENT ? (
                <h4 className="page-title">Tickets</h4>
              ) : (
                <h4 className="page-title">Complent List</h4>
              )}
            </div>
            <div
              className="col-sm-6 col-6 text-right m-b-20"
              style={{ textAlign: "end" }}
            >
              <div className="input-group">
                <input className="form-control" name="search" placeholder="Search ..." />
                <button className="btn btn-sm btn-info">Search</button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <Table
                      columns={TableColumn({
                        handleAnswer,
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
      <Answer
        show={showAnswer}
        rowData={rowData}
        handleClose={(value) => setShowAnswer(value)}
        handleAdd={(id, data) => handleUpdate(id, data)}
      />
    </>
  );
}

export default Complaint;
