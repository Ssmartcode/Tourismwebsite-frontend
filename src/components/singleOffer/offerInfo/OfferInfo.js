import React from "react";
import formatDate from "../../../utilities/formatDate";
import getEmoji from "./country-emoji/countryEmoji";

const OfferInfo = (props) => {
  return (
    <div className="offer-info my-4">
      <h3 className="text-center mb-4">{props.title}</h3>
      <p>
        <strong>Location</strong>: {props.location}
      </p>
      <p>
        <strong>Country</strong>: {props.country} {getEmoji(props.country)}
      </p>
      <p>
        <strong>Transportation</strong>: {props.transportation}{" "}
        {props.transportation === "Plane" ? <i>&#x1F6EB;</i> : <i>&#x1F68D;</i>}
      </p>
      <p className="period">
        <strong>Period: </strong>
        {formatDate(props.begins)} - {formatDate(props.ends)}
      </p>
    </div>
  );
};

export default OfferInfo;
