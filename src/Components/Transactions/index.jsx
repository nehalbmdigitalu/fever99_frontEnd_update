import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../common/Table";
import { useDispatch, useSelector } from "react-redux";
import TableColumn from "./dependiences/TableColumn";
import { getTransactionList } from "../Dashboard/dependencies/action";

function Transactions() {
    const dispatch = useDispatch()
    const [query, setQuery] = useState({page: 1, size: 10})
    let {transaction} = useSelector((state) => state.login)
    const [ItemTotalPage, setTotalPage] = useState(10)

    transaction = transaction.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const handlePageChange = (page) => {
        setQuery({...query, page: page})
    }
    useEffect(() => {
        dispatch(getTransactionList())
    },[query])
    console.log(transaction)
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div
            className="row"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="col-sm-4 col-3">
              <h4 className="page-title">Transactions</h4>
            </div>
            <div
              className="col-sm-8 col-9 text-right m-b-20"
              style={{ textAlign: "end" }}
            >
              
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
                      dataTable={transaction}
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

export default Transactions;
