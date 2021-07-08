import React, { useEffect, useState } from "react";
import useHttpRequest from "../../../hooks/useHttpRequest";
import Card from "../../shared/card/Card";
import Spinner from "../../shared/spinner/Spinner";
import "./Discounted.css";

const Discounted = () => {
  const { isLoading, sendRequest } = useHttpRequest();
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await sendRequest(
          "GET",
          `${process.env.REACT_APP_BACKEND}/offers?sort=desc&count=3&discounted=yes`
        );
        setOffers(response.data.offers);
      } catch (err) {
        return console.log(err);
      }
    })();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <div className="section-title px-4 py-2 mb-5">
        <h3 className="mb-0 fw-bold">Discounted offers (limited time):</h3>
      </div>
      <div className="container">
        <div className="row">
          {isLoading && <Spinner />}
          {offers.map((offer) => {
            return (
              <div key={offer.id} className="col-lg-4">
                <Card
                  title={offer.title}
                  category={offer.category}
                  period={offer.period}
                  price={offer.price}
                  newPrice={offer.newPrice}
                  image={offer.image}
                  readMoreLink={`/offers/${offer.id}`}
                ></Card>
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Discounted;
