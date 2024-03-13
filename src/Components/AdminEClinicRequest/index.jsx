import React, { useEffect, useState } from "react";
import Table from "../common/Table";
import { useDispatch, useSelector } from "react-redux";
import TableColumn from "./dependencies/TableColumn";
import { getItemList } from "./dependencies/action";

function AdminECliniCRequest() {
  const [query, setQuery] = useState({ page: 1, size: 10 });
  const { ItemList, ItemTotalPage } = useSelector((state) => state.Eclinic);
  const dispatch = useDispatch();
  const [showAddUpdate, setShowAddUpdate] = useState(false);
  const [rowData, setRowData] = useState({});
  const [searchQuery, setSearchQuery] = useState('')

  const handlePageChange = (page) => {
    setQuery({ ...query, page: page });
  };

  useEffect(() => {
    dispatch(getItemList(query));
  }, [query, dispatch]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchQuery(searchTerm);
    setQuery({ ...query, filter: searchTerm });
  }
  const handleDelete = (id) => {
    // dispatch(deleteItem(id)).then(res => {
    //   //   dispatch(getItemList(query));
    // })
  }
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div
            className="row"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="col-sm-4 col-3">
              <h4 className="page-title">E-Clinic Request</h4>
            </div>
            <div
              className="col-sm-3 col-6 text-right m-b-20"
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
                        handleDelete,
                        pageNo: query.page,
                        size: query.size,
                      })}
                      dataTable={ItemList}
                      totalRecord={ItemTotalPage}
                      onPageChange={handlePageChange}
                      onTableChange={() => { }}
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

export default AdminECliniCRequest;
