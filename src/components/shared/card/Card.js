import React from "react";
import { Link } from "react-router-dom";
// css
import "./Card.css";

const Card = (props) => {
  const category = props.category.split("-").join(" ");
  return (
    <div className={`offer-card ${props.className}`}>
      <div className="header">
        <img src={`${process.env.REACT_APP_BACKEND}/${props.image}`} alt="" />
        <div className="category">{category}</div>
        <div className="description">
          <div className="title">{props.title}</div>
          <div className="period">{props.period}</div>
        </div>
      </div>
      <div className="body">
        <div className="price">
          <strong>Price</strong>:{" "}
          <div className="price-value">{props.price}$</div>
        </div>
        <Link
          to={props.readMoreLink}
          className="read-more btn btn-danger text-light mt-2"
        >
          Read more...
        </Link>
      </div>
    </div>
  );
};

export default Card;
