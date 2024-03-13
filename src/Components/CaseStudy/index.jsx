import React, { useEffect, useState } from "react";
import Table from "../common/Table";
import { useDispatch, useSelector } from "react-redux";
import TableColumn from "./dependencies/TableColumn";
import { getItemList, updateItem,saveitem, deleteItem } from "./dependencies/action";
import { ROLES } from "../../constants/role";
import AddUpdate from "./AddUpdate/addUpdate";

function CaseStudy() {
  const [query, setQuery] = useState({ page: 0, size: 10, role: ROLES.DOCTOR });
  const { ItemList, ItemTotalPage } = useSelector((state) => state.teams);
  const dispatch = useDispatch();
  const [showAddUpdate, setShowAddUpdate] = useState(false);
  const [rowData, setRowData] = useState({});

  const handlePageChange = (page) => {
    setQuery({ ...query, page: page });
  };

  useEffect(() => {
    dispatch(getItemList(query));
  }, [query]);
  const handleAdd = (data) => {
    dispatch(saveitem(data)).then(res => {
      console.log(res)
      if(res.status) {
        setShowAddUpdate(false);
        dispatch(getItemList(query));
      }
    })
  };
  const handleUpdate = (id, data) => {
    dispatch(updateItem(id, data)).then(res => {
      if(res.status) {
        setShowAddUpdate(false);
        dispatch(getItemList(query));
      }
    }) 
  };
  const handleEdit = (data) => {
    setRowData(data);
    setShowAddUpdate(true);
  };
  const handleDelete = (id) => {
    dispatch(deleteItem(id)).then(res => {
      dispatch(getItemList(query));
    })
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
              <h4 className="page-title">Blog</h4>
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
                Add Blog
              </a>
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
                        handleEdit,                        
                        pageNo: query.page,
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
      <AddUpdate
        show={showAddUpdate}
        handleClose={(value) => setShowAddUpdate(value)}
        handleAdd={(data) => handleAdd(data)}
        handleUpdate={(id,data) => handleUpdate(id, data)}
        data={{ rowData:rowData }}
      />
    </>
  );
}

export default CaseStudy;
