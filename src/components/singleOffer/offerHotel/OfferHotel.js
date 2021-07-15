import React from "react";
import "./OfferHotel.css";

const OfferHotel = (props) => {
  return (
    <div className="offer-info">
      <h3 className="text-center mb-4">
        <strong>{props.hotelName}</strong>
      </h3>
      <p>
        <strong>Address</strong>: {props.address}
      </p>
      <p>
        <strong>Stars</strong>:{" "}
        {[...Array(props.stars).keys()].map((_) => (
          <span role="img" aria-label="star">
            &#11088;
          </span>
        ))}
      </p>
      <p>
        <strong>Description</strong>: {props.description}
      </p>
      <h5 className="text-center mt-4 mb-2 fw-bold">Features:</h5>
      <ul className="features">
        {props.facilities.map((facility) => (
          <li>
            <span role="img" aria-label="facility">
              &#9989;
            </span>
            {facility}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OfferHotel;
