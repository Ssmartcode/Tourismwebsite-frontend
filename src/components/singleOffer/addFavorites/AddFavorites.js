import React, { useContext, useState } from "react";
import useHttpRequest from "../../../hooks/useHttpRequest";
import AuthContext from "../../../context/authContext";
import "./AddFavorites.css";

const AddFavorites = (props) => {
  const { sendRequest } = useHttpRequest();
  const [isClicked, setIsClicked] = useState(0);

  const authContext = useContext(AuthContext);

  const handleAddToFavorites = async () => {
    setIsClicked(1);
    try {
      await sendRequest(
        "POST",
        "http://localhost:5000/users/favorites/add",
        { offerId: props.offerId },
        {
          Authorization: `Bearer ${authContext.token}`,
        }
      );
    } catch (err) {
      return console.log(err);
    }
  };

  return (
    <div
      className="add-favorites"
      onAnimationEnd={() => setIsClicked(0)}
      onClick={handleAddToFavorites}
      isclicked={isClicked}
    >
      <i className="fas fa-heart text-danger me-1"></i>
      <strong>Favorite</strong>
    </div>
  );
};

export default AddFavorites;
