import React, { useState } from "react";
import { Link } from "react-router-dom";

const ReadMore = ({ text, maxLength }) => {
  const [readMore, setReadMore] = useState(false);
  const toggleReadMore = () => setReadMore(!readMore);

  return (

    <div>
      <p>
        {readMore ? text : `${text.slice(0, maxLength)}...`}
        <br />
        <br />
      </p>
      <div>
        <button onClick={toggleReadMore} className="readmore click-btn btn-style505" style={{ border: "1px solid #303E65", padding: "5px 15px", borderRadius: "20px", background: "#303E65", color: "white" }}>
          {readMore ? "Read Less" : "Read More"}
        </button>
      </div>
    </div>
  );
};

export default ReadMore;
