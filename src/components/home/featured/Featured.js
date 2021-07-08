import React, { useEffect, useState } from "react";
import useHttpRequest from "../../../hooks/useHttpRequest";
import Card from "../../shared/card/Card";
import Spinner from "../../shared/spinner/Spinner";

const Featured = () => {
  const { isLoading, sendRequest } = useHttpRequest();
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await sendRequest(
          "GET",
          `${process.env.REACT_APP_BACKEND}/offers?sort=desc&count=3`
        );
        setOffers(response.data.offers);
      } catch (err) {
        return console.log(err);
      }
    })();
  }, [sendRequest]);

  return (
    <div className="container">
      <div className="row">
        {isLoading && <Spinner />}
        {offers.map((offer) => {
          return (
            <div key={offer.id} className="col-lg-4">
              <Card
                title={offer.title}
                category={offer.category}
                begins={offer.begins}
                ends={offer.ends}
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
  );
};

export default Featured;
