import React from "react";

const OfferDescription = (props) => {
  return (
    <div className="offer-info my-4">
      <h3 className="text-center mb-4">Offer Description</h3>
      <p>{props.description}</p>
    </div>
  );
};

export default OfferDescription;
