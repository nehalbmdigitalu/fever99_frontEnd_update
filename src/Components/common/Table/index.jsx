import React, { useState } from "react";
import PropTypes from "prop-types";
import { Col } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from "react-bootstrap-table2-paginator";
import "./style.scss";

const Table = (props) => {
  const {
    dataTable,
    columns,
    keyField,
    selectRowOptions,
    wrapperClasses,
    onPageChange,
    onTableChange,
    rowStyle,
    cssClass,
    totalRecord,
    sizePerPage,
    pageSizeChange,
    getRowClass
  } = props;
  const [dropdownOpen, setDropDownOpen] = useState(false)
  const [perPageRecord, setPerPageRecord] = useState(10)

  const portal = React.createRef();
  const handlePageSizeDropDown = () => {
    if (dropdownOpen) {
      setDropDownOpen(false)
    } else {
      setDropDownOpen(true)
    }
  }
  const handleperPageChange = (size) => {
    setPerPageRecord(size)
    pageSizeChange(size)
  }

  const renderDropDown = ({
    options,
    currSizePerPage,
    onSizePerPageChange,
  }) => {
    return (
      <>
        <span
          class={dropdownOpen ? "react-bs-table-sizePerPage-dropdown dropdown open show" : "react-bs-table-sizePerPage-dropdown dropdown"}
          style={{ visibility: 'visible' }}
          onClick={() => handlePageSizeDropDown()}
        >
          <button
            id="pageDropDown"
            type="button"
            className="btn btn-default btn-secondary dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded={dropdownOpen}

          >
            {perPageRecord}{" "}
            <span>
              <span className="caret"></span>
            </span>
          </button>
          <ul class={dropdownOpen ? "dropdown-menu open show" : "dropdown-menu"} role="menu" aria-labelledby="pageDropDown">
            <li role="presentation" className="dropdown-item" onClick={() => handleperPageChange(10)}>
              10
            </li>
            <li role="presentation" className="dropdown-item" onClick={() => handleperPageChange(20)}>
              20
            </li>
            <li role="presentation" className="dropdown-item" onClick={() => handleperPageChange(30)}>
              30
            </li>
            <li role="presentation" className="dropdown-item" onClick={() => handleperPageChange(40)}>
              40
            </li>
          </ul>
        </span>
      </>
    );
  };
  const renderPageList = (options) => {
    if (options.pages.length > 1) {
      return (
        <Col className="react-bootstrap-table-pagination-list" md={6}>
          <ul className="pagination react-bootstrap-table-page-btns-ul float-end">
            {/* {JSON.stringify(options)} */}
            {options.pages.map((page) => (
              <li
                key={page.page}
                className={`${page.active ? "active " : ""}page-item`}
                onClick={() => options.onPageChange(page.page)}
              >
                <a href="#0" className="page-link">
                  {page.page}
                </a>
              </li>
            ))}
          </ul>
        </Col>
      );
    } else {
      return "";
    }
  };
  const paginationOption = {
    custom: false,
    totalSize: totalRecord,
    hideSizePerPage: pageSizeChange ? false : true,
    sizePerPage: sizePerPage,
    firstPageText: "First",
    lastPageText: "Last",
    alwaysShowAllBtns: true,
    showTotal: true,
    sizePerPageRenderer: renderDropDown,
    pageListRenderer: renderPageList,
    onPageChange: function (page, sizePerPage) {
      onPageChange(page, sizePerPage);
    },
  };

  return (
    <>
      {columns && columns.length > 0 && (
        <div>
          <BootstrapTable
            // table-responsive
            wrapperClasses={`${wrapperClasses}`}
            data={dataTable}
            columns={columns}
            keyField={keyField}
            classes={`table ${cssClass}`}
            selectRow={selectRowOptions}
            pagination={paginationFactory(paginationOption)}
            noDataIndication={() => <div>No Record found.</div>}
            remote={{
              filter: false,
              pagination: true,
              sort: true,
              cellEdit: false,
            }}
            rowStyle={rowStyle}
            rowClasses={getRowClass}
            onTableChange={onTableChange}
            striped
            table-bordered
            hover={true}
          />
        </div>
      )}
    </>
  );
};
Table.propTypes = {
  dataTable: PropTypes.arrayOf(PropTypes.object),
};

Table.defaultProps = {
  dataTable: [],
};

export default Table;
