import React, { useEffect, useState } from "react";
import useHttpRequest from "../../../hooks/useHttpRequest";
import Favorite from "../../shared/favorite/Favorite";
import { v4 } from "uuid";
import Spinner from "../../shared/spinner/Spinner";

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
        return console.log(err);
      }
      if (!error && response) setFavorites(response.data.favorites);
    })();
  }, []);

  return (
    <div className="col-lg-6">
      {isLoading && <Spinner />}
      <div className="favorites-list">
        <h6 className="text-center mb-4">Your favorite tourism packages:</h6>
        <ul className="list-group">
          {favorites.map((fav) => (
            <Favorite
              key={v4()}
              title={fav.title}
              period={fav.period}
              price={fav.price}
              id={fav._id}
              handleFavoriteDeletion={(favorites) => setFavorites(favorites)}
              favorites={favorites}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Favorites;
