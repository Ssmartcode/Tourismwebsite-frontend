import React from "react";
import AddFavorites from "../../../components/singleOffer/addFavorites/AddFavorites";
import formatDate from "../../../utilities/formatDate";

const OfferTitle = (props) => {
  return (
    <div className="title d-flex align-items-center justify-content-around">
      <h3 className="title p-3 text-center mb-0">{props.title}</h3>
      <div className="d-flex align-items-center">
        <div className="price me-4">
          <strong>Price: </strong>
          <span className={props.newPrice && "old-price me-1"}>
            {props.price}$
          </span>
          {props.newPrice && <span>{props.newPrice}$</span>}
        </div>
        <strong className="period me-4">
          {formatDate(props.begins)} - {formatDate(props.ends)}
        </strong>
        <AddFavorites offerId={props.offerId} />
      </div>
    </div>
  );
};

export default OfferTitle;
