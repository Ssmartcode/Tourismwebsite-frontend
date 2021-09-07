import React from "react";

const Spinner = ({ textLight }) => {
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className={`mb-0 ms-2 fw-bold ${textLight && "text-light"}`}>
        Please Wait
      </p>
    </div>
  );
};

export default Spinner;
