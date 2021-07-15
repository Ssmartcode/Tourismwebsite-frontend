import React from "react";
import "./OfferImages.css";

const offerImages = (props) => {
  return (
    <div className="offer-image__container">
      <img
        src={`${process.env.REACT_APP_BACKEND}/${props.image || ""}`}
        className="my-4"
        alt=""
      />
      <div className="info-bar">{props.imageDescription}</div>
    </div>
  );
};

export default offerImages;
