import React from "react";
import { Link } from "react-router-dom";

const ListItem = (props) => {
  const listItem = (
    <div className={`list-group-item`}>
      <h5>{props.title}</h5>
      <p>{props.paragraph}</p>
    </div>
  );
  if (props.url) return <Link to={props.url}>{listItem}</Link>;
  return listItem;
};

export default ListItem;
