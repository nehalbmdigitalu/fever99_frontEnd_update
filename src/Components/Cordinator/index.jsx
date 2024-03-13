import React, { useEffect, useState } from "react";
import Table from "../common/Table";
import { useDispatch, useSelector } from "react-redux";
import TableColumn from "./dependencies/TableColumn";
import { RegisterCordinator, UpdateCordinator, getItemList } from "./dependencies/action";
import { ROLES } from "../../constants/role";
import AddUpdate from "./AddUpdate/addUpdate";

function Cordinator() {
  const [query, setQuery] = useState({ page: 0, limit: 10, role: ROLES.CORDINATOR });
  const { ItemList, ItemTotalPage } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [showAddUpdate, setShowAddUpdate] = useState(false);
  const [rowData, setRowData] = useState({});
  const [searchQuery, setSearchQuery] = useState('')


  const handlePageChange = (page) => {
    setQuery({ ...query, page: page });
  };

  useEffect(() => {
    dispatch(getItemList(query));
  }, [dispatch, query]);

  const handleAdd = (data) => {
    dispatch(RegisterCordinator(data)).then((res) => {
      if (res.status) {
        setShowAddUpdate(false);
        dispatch(getItemList(query));
      }
    });
  };
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchQuery(searchTerm);
    setQuery({ ...query, filter: searchTerm });
  }
  const handleUpdate = (id, data) => {
    setShowAddUpdate(false)
    dispatch(UpdateCordinator(id, data)).then(res => {
      dispatch(getItemList(query));
    })
  }
  const HandleEdit = (row) => {
    setRowData(row)
    setShowAddUpdate(true)
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
              <h4 className="page-title">Cordinator</h4>
            </div>
            <div
              className="col-sm-8 col-9 text-right m-b-20"
              style={{ textAlign: "end" }}
            >
              <a
                href="#0"
                className="btn btn-sm btn-success"
                onClick={() => setShowAddUpdate(true)}
              >
                Add Cordinator
              </a>
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
                        HandleEdit,
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
      <AddUpdate
        show={showAddUpdate}
        handleClose={(value) => setShowAddUpdate(value)}
        handleAdd={(data) => handleAdd(data)}
        handleUpdate={(id, data) => handleUpdate(id, data)}
        data={{ rowData: rowData }}
      />
    </>
  );
}

export default Cordinator;
