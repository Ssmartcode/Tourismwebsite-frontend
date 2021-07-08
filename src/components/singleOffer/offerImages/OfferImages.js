import React from "react";
import "./OfferImages.css";

const offerImages = (props) => {
  return (
    <img
      src={`${process.env.REACT_APP_BACKEND}/${props.image || ""}`}
      className="my-4"
      alt=""
    />
  );
};

export default offerImages;
