import React, { useEffect, useState } from "react";
import { storage } from "../../dependencies/store/storage";
import { ROLES } from "../../constants/role";
import { Link } from "react-router-dom";
import Table from "../common/Table";
import { useDispatch, useSelector } from "react-redux";
import TableColumn from "./dependiencies/TableColumn";
import { getItemList } from "./dependiencies/action";

function CordinaterCareer(props) {
  const { careerlist, careerTotal } = useSelector(
    (state) => state.Career
  );
  const role = storage.getUserRole();
  const dispatch = useDispatch();
  const [query, setQuery] = useState({ page: 1, size: 10 });
  const [rowData, setRowData] = useState({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('')

  
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchQuery(searchTerm);
    setQuery({ ...query, filter: searchTerm });
  }
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
 
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div
            className="row"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="col-sm-4 col-3">
            <h4 className="page-title">Careers</h4>
            </div>
            <div
              className="col-sm-6 col-6 text-right m-b-20"
              style={{ textAlign: "end" }}>
              <div className="input-group">
                <input className="form-control" name="search" placeholder="Search ..." onChange={handleSearch} />
                {/* <button className="btn btn-sm btn-info text-white" onClick={(e) => handleSearch(e)}>Search</button> */}
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
                        pageNo: query.page - 1,
                        size: query.size,
                      })}
                      dataTable={careerlist}
                      totalRecord={careerTotal}
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

export default CordinaterCareer;
