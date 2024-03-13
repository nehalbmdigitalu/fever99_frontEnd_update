import React, { useEffect, useState } from "react";
import Table from "../common/Table";
import { useDispatch, useSelector } from "react-redux";
import TableColumn from "./dependencies/TableColumn";
import { getItemList  } from "./dependencies/action";
import View from "./View";

function InsurenceRequest() {
  const [query, setQuery] = useState({ page: 0, size: 10 });
  const { ItemList, ItemTotalPage } = useSelector((state) => state.Eclinic);
  const dispatch = useDispatch();
  const [showAddUpdate, setShowAddUpdate] = useState(false);
  const [rowData, setRowData] = useState({});

  const handlePageChange = (page) => {
    setQuery({ ...query, page: page });
  };

  useEffect(() => {
    dispatch(getItemList(query));
  }, [query]);
 
  const handleView = (row) => {
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
              <h4 className="page-title">Insurance Request</h4>
            </div>
            
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <Table
                      columns={TableColumn({
                        handleView,
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
      <View handleClose={() => setShowAddUpdate(false)} show={showAddUpdate} data={rowData} />
    </>
  );
}

export default InsurenceRequest;
