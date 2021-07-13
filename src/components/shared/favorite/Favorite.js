import React, { useContext } from "react";
import useHttpRequest from "../../../hooks/useHttpRequest";
import "./Favorite.css";
import AuthContext from "../../../context/authContext";

const Favorite = (props) => {
  const { sendRequest, error } = useHttpRequest();
  const authContext = useContext(AuthContext);

  const handleFavoriteDeletion = async () => {
    let response;
    try {
      response = await sendRequest(
        "DELETE",
        process.env.REACT_APP_BACKEND + "/users/favorites/delete/" + props.id,
        {},
        { Authorization: `Bearer ${authContext.token}` }
      );
    } catch (err) {
      return console.log(err);
    }
    //delete favorite on front-end
    if (!error && response)
      props.handleFavoriteDeletion(response.data.favorites);
  };
  return (
    <li className="favorite-item list-group-item p-3 mb-2">
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
