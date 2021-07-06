import React from "react";
import "./Favorite.css";

const Favorite = (props) => {
  return (
    <li className="favorite-item list-group-item p-5 mb-2">
      <div className="delete-favorite" onClick={handleFavoriteDeletion}>
        <i className="fas fa-times text-danger"></i>
      </div>
      <h5 className="text-center">{props.title}</h5>
      <div className="d-flex">
        <p className="price">
          <strong>Price:</strong> {props.price}
        </p>
        <p className="period">
          <strong>Period:</strong> {props.period}
        </p>
      </div>
    </li>
  );
};

export default Favorite;
