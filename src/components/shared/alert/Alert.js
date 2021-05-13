import React from "react";

const Alert = (props) => {
  return (
    <div className={`alert mt-4 text-center alert-${props.type || "danger"}`}>
      {props.message}
    </div>
  );
};

export default Alert;
