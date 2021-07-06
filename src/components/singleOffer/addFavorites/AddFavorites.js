import React, { useContext, useState } from "react";
import useHttpRequest from "../../../hooks/useHttpRequest";
import AuthContext from "../../../context/authContext";
import { motion } from "framer-motion";

const AddFavorites = (props) => {
  const { sendRequest, error, isLoading } = useHttpRequest();
  const authContext = useContext(AuthContext);

  const handleAddToFavorites = async () => {
    try {
      const response = await sendRequest(
        "POST",
        "http://localhost:5000/users/favorites/add",
        { offerId: props.offerId },
        {
          Authorization: `Bearer ${authContext.token}`,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add-favorites" onClick={handleAddToFavorites}>
      <i className="fas fa-heart text-danger me-1"></i>
      <strong>Favorite</strong>
    </div>
  );
};

export default AddFavorites;
