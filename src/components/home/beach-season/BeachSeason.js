import React, { useEffect, useState } from "react";
import "./BeachSeason.css";
import beachImage from "./beach.svg";
import Card from "../../shared/card/Card";
import useHttpRequest from "../../../hooks/useHttpRequest";

const BeachSeason = () => {
  const [offer, setOffer] = useState();
  const { sendRequest, error, isLoading } = useHttpRequest();
  useEffect(() => {
    (async () => {
      let response;
      try {
        response = await sendRequest(
          "GET",
          process.env.REACT_APP_BACKEND + "/offers?random=yes&category=beach"
        );
      } catch (error) {
        return console.log(error);
      }
      if (response) setOffer(response.data.offer);
    })();
  }, []);

  return (
    <React.Fragment>
      <div className="section-title px-4 py-2 mb-5">
        <h3 className="mb-0 fw-bold">Most wanted beach season offer:</h3>
      </div>
      <div className="grid-container">
        <img
          className="beach-image"
          src={beachImage}
          alt="two people lying on beach"
        />
        {offer && (
          <Card
            title={offer.title}
            category={offer.category}
            period={offer.period}
            price={offer.price}
            newPrice={offer.newPrice}
            image={offer.image}
            className="most-wanted"
            readMoreLink={`/offers/${offer._id}`}
          ></Card>
        )}
      </div>
      .
    </React.Fragment>
  );
};

export default BeachSeason;
