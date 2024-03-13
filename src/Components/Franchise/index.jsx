import React, { useEffect, useState } from "react";
import Table from "../common/Table";
import { useDispatch, useSelector } from "react-redux";
import TableColumn from "./dependencies/TableColumn";
import {
  RegisterFranchise,
  RegisterUser,
  getItemList,
  updateFranchise,
  updateUserById,
} from "./dependencies/action";
import { ROLES } from "../../constants/role";
import AddUpdate from "./AddUpdate/addUpdate";
import Update from "./AddUpdate/Update";
import { getStateCity } from "../Dashboard/dependencies/action";

function Franchise() {
  const [query, setQuery] = useState({
    page: 1,
    size: 10,
    role: ROLES.FRANCHISE,
    filter: "",
  });
  const { ItemList, ItemTotalPage } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [showAddUpdate, setShowAddUpdate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [rowData, setRowData] = useState({});
  const [SearchQuery, setSearchQuery] = useState("");

  const { stateList } = useSelector((state) => state.stateCity);
  const [city, setCity] = useState([]);

  const [addtionlaFilter, setAdditionalFilter] = useState({
    state: "",
    city: "",
  });

  const handlePageChange = (page) => {
    setQuery({ ...query, page: page, ...addtionlaFilter });
  };

  useEffect(() => {
    dispatch(getStateCity());
  }, []);

  useEffect(() => {
    dispatch(getItemList({ ...query, ...addtionlaFilter }));
  }, [query]);

  const handleAdd = (data) => {
    dispatch(RegisterFranchise(data)).then((res) => {
      if (res.status) {
        setShowAddUpdate(false);
        dispatch(getItemList({ ...query, ...addtionlaFilter }));
      }
    });
  };

  const handleUpdate = (id, data) => {
    dispatch(updateFranchise(id, data)).then((res) => {
      setShowAddUpdate(false);
      dispatch(getItemList({ ...query, ...addtionlaFilter }));
      setRowData(null);
      setShowUpdate(false);
    });
  };
  const HandleEdit = (row) => {
    setRowData(row);
    setShowUpdate(true);
  };
  const HandleCloseUpdate = () => {
    setRowData(null);
    setShowUpdate(false);
  };
  const activateDeactivate = (id, status) => {
    dispatch(updateUserById(id, { status })).then((res) => {
      if (res.status) {
        dispatch(getItemList({ ...query, ...addtionlaFilter }));
      }
    });
  };

  const getRowClass = (row) => {
    if (row.status === "active") {
      return "";
    } else if (row.status === "inactive") {
      return "table-danger";
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchQuery(searchTerm);
    setQuery({ ...query, filter: searchTerm });
  }

  const handleStateChange = (e) => {
    const id = e.target.value;

    let state = stateList.filter((e) => e._id == id);
    setAdditionalFilter({ state: state[0].state, city: '' })
    if (state && state.length > 0) {
      setCity(state[0].city);
    }
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
              <h4 className="page-title">Franchise</h4>
              <a
                href="#0"
                className="btn btn-sm btn-success mb-2"
                onClick={() => setShowAddUpdate(true)}
              >
                Add Franchise
              </a>
            </div>
            <div className="col-sm-8 col-8 d-flex justify-content-end gap-1">
              <div className="form-group col-md-4">
                <input
                  className="form-control"
                  name="searchString"
                  placeholder="Name"
                  onChange={handleSearch}
                />
              </div>
              <div className="form-group col-md-4">
                <select
                  className="form-select"
                  onChange={(e) => handleStateChange(e)}
                >
                  <option value="">--Select One--</option>
                  {stateList &&
                    stateList.map((sta, index) => (
                      <option value={sta._id} key={index}>
                        {sta.state}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group col-md-4">
                <select
                  className="form-select"
                  onChange={(e) =>
                    setAdditionalFilter({
                      ...addtionlaFilter,
                      city: e.target.value,
                    })
                  }
                >
                  <option value="">--Select One--</option>
                  {city &&
                    city.map((c, index) => (
                      <option value={c} key={index}>
                        {c}
                      </option>
                    ))}
                </select>
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
                        activateDeactivate,
                        pageNo: query.page,
                        size: query.size,
                      })}
                      dataTable={ItemList}
                      totalRecord={ItemTotalPage}
                      onPageChange={handlePageChange}
                      onTableChange={() => { }}
                      keyField="_id"
                      sizePerPage={query.size}
                      getRowClass={getRowClass}
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
      />

      <Update
        show={showUpdate}
        handleClose={(value) => HandleCloseUpdate(value)}
        handleUpdate={(id, data) => handleUpdate(id, data)}
        data={{ rowData: rowData }}
      />
    </>
  );
}

export default Franchise;
