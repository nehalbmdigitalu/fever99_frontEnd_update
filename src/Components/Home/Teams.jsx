import React from "react";
import { getDocumentLink } from "../../dependencies/utils/helper";

function Teams(props) {
  const { data } = props;

  return (
    <div className="">
      {/* <Slider ref={sliderRef} {...settings}> */}
      <div className="row">
        {data &&
          data.map((item, index) => (
            <div key={index} className="col-lg-3 col-sm-6 employee-1">
              <div className="employee">
                <div className="employee-image">
                  <img src={getDocumentLink(item.image)} className="img-fluid d-block m-auto" alt="employee" />
                </div>
                <div className="employee-name" style={{ height: "120px" }}>
                  <h1 className="text-center">{item.name}<br /><span className="employee-role px-2">{item.role}</span></h1>
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* </Slider> */}


    </div >
  );
}

export default Teams;
