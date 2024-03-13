import React, { useEffect, useState } from "react";
import { storage } from "../../dependencies/store/storage";
import { ROLES } from "../../constants/role";
import { Link } from "react-router-dom";
import Table from "../common/Table";
import { useDispatch, useSelector } from "react-redux";
import TableColumn from "./dependiencies/TableColumn";
import { AddMedicine, DeleteMedicine, getMedicineList, updateMedicine } from "./dependiencies/action";
import AddEdit from './Update'

function Medicines(props) {
  const { medicineList, MedicineTotal } = useSelector(
    (state) => state.Medicine
  );
  console.log("medicineList", medicineList)
  const role = storage.getUserRole();
  const dispatch = useDispatch();
  const [query, setQuery] = useState({ page: 1, size: 10, filter: '' });
  const [rowData, setRowData] = useState(null);
  const [showAddEdit, setShowAddEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState('')
  const handleEdit = (row) => {
    setRowData(row);
    console.log(row)
    setShowAddEdit(true);
  };
  console.log(searchQuery);
  const handlePageChange = (page) => {
    setQuery({ ...query, page: page });
  };
  useEffect(() => {
    dispatch(getMedicineList(query));
  }, [dispatch, query]);
  console.log(query);

  const handleDelete = (id) => {
    dispatch(DeleteMedicine(id)).then(res => {
      dispatch(getMedicineList(query));
    })
  }

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchQuery(searchTerm);
    setQuery({ ...query, filter: searchTerm });
  }

  const handleAddMedicine = (data) => {
    dispatch(AddMedicine(data)).then(res => {
      if (res.status) {
        setShowAddEdit(false)
        dispatch(getMedicineList(query));
      }
    })
  }

  const handleUpdateMedicine = (data) => {
    dispatch(updateMedicine(data._id, data)).then(res => {
      if (res.status) {
        setRowData(null);
        setShowAddEdit(false)
        dispatch(getMedicineList(query));
      }
    })
  }
  const handleCloseModal = (value) => {
    setRowData(null)
    setShowAddEdit(value)
  }



  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div
            className="row"
            style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="col-sm-4 col-3">
              <h4 className="page-title">Medicines</h4>
              <button className="btn btn-sm btn-success mb-3" onClick={() => setShowAddEdit(true)}>Add new</button>
            </div>
            <div
              className="col-sm-3 col-6 text-right m-b-20"
              style={{ textAlign: "end" }}>
              <div className="input-group">
                <input className="form-control" name="search" placeholder="Search ..." onChange={handleSearch} />
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
                        handleEdit,
                        handleDelete,
                        pageNo: query.page - 1,
                        size: query.size,
                      })}
                      dataTable={medicineList}
                      totalRecord={MedicineTotal}
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
      <AddEdit
        show={showAddEdit}
        rowData={rowData}
        handleClose={(value) => handleCloseModal(value)}
        handleAdd={(data) => handleAddMedicine(data)}
        handleUpdate={(data) => handleUpdateMedicine(data)}
      />
    </>
  );
}

export default Medicines;
