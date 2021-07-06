import React, { useEffect, useState } from "react";
import useHttpRequest from "../../../hooks/useHttpRequest";

const Favorites = ({ authContext }) => {
  const [favorites, setFavorites] = useState([]);
  const { sendRequest, error, isLoading } = useHttpRequest();

  // get user's favorites offers
  useEffect(() => {
    (async () => {
      let response;
      try {
        response = await sendRequest(
          "GET",
          process.env.REACT_APP_BACKEND + "/users/favorites",
          {},
          { Authorization: `Bearer ${authContext.token}` }
        );
      } catch (err) {
        console.log(err);
      }
      console.log(response.data.favorites);
      setFavorites(response.data.favorites);
    })();
  }, []);

  return (
    <div className="col-lg-6">
      <div className="favorites-list">
        <h6 className="text-center mb-4">Your favorite tourism packages:</h6>
        <ul className="list-group">
          {favorites.map((fav) => {
            return (
              <li className="list-group-item">
                <h4 className="text-center mb-3">{fav.title}</h4>
                <div className="d-flex justify-content-around">
                  <p className="price fs-5">
                    <strong>Price: </strong>
                    {fav.price}
                  </p>
                  <p className="period fs-5">
                    <strong>Period: </strong>
                    {fav.period}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Favorites;
