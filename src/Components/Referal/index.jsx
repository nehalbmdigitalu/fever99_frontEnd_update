import React, { useEffect, useState } from "react";
import Table from "../common/Table";
import { useDispatch, useSelector } from "react-redux";
import { getItemList } from "./dependencies/action";
import TableColumn from "./dependencies/TableColumn";

function Referal() {
  const [query, setQuery] = useState({ page: 1, size: 10 });
  const dispatch = useDispatch();
  const { ItemList, ItemTotalPage } = useSelector((state) => state.referalUser);
  const {user} = useSelector((state) => state.login)
  const [isCopied, setIsCopied] = useState(false);
  
  useEffect(() => {
    dispatch(getItemList(query));
  }, [query]);
  const handlePageChange = (page) => {
    setQuery({...query, page: page})
  }
  const handleCopyClick = (e) => {
    e.preventDefault()

    const textToCopy = "ok ok";

    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;

    document.body.appendChild(textArea);

    textArea.select();

    try {
        document.execCommand("copy");
    } catch (err) {
        console.error("Unable to copy to clipboard: ", err);
    } finally {
        document.body.removeChild(textArea);
    }


    setIsCopied(true);
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
              <h4 className="page-title">Refered User</h4>
            </div>
            <div
              className="col-sm-8 col-9 text-right m-b-20"
              style={{ textAlign: "end" }}
            >
              <a href="#0" className="btn btn-sm btn-success" onClick={handleCopyClick}>{isCopied? `Copied`:`Copy link to refer`}: {user && user.refrelCode}</a>
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

export default Referal;
