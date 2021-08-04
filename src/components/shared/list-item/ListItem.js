import React from "react";
import { Link } from "react-router-dom";
import calendar from "./calendar.png";
import formatDate from "../../../utilities/formatDate";
import "./ListItem.css";

const ListItem = (props) => {
  const listItem = (
    <div className={`list-group-item dashboard-offer`}>
      <div className="row">
        <div className="col-lg-3">
          <img src={`${process.env.REACT_APP_BACKEND}/${props.image}`} alt="" />
        </div>
        <div className="col-lg-9">
          <div className="title mb-2">{props.title}</div>
          <span className="category ">{props.category}</span>
          <div className="period mt-3 d-flex align-items-center">
            <img src={calendar} alt="calendar" />
            <strong className="begins">{formatDate(props.begins)}</strong>
            {" - "}
            <strong className="ends">{formatDate(props.ends)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
  if (props.url) return <Link to={props.url}>{listItem}</Link>;
  return listItem;
};

export default ListItem;
