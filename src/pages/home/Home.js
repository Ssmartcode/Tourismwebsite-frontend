import React, { useEffect, useState } from "react";
import useHttpRequest from "../../hooks/useHttpRequest";
// components
import Showcase from "../../components/home/showcase/Showcase";
import Card from "../../components/shared/card/Card";
import Spinner from "../../components/shared/spinner/Spinner";
const Home = () => {
  const { isLoading, sendRequest } = useHttpRequest();
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    console.log(process.env);
    (async () => {
      try {
        const response = await sendRequest(
          "GET",
          `${process.env.REACT_APP_BACKEND}/offers`
        );
        setOffers(response.data.offers);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [sendRequest]);
  return (
    <React.Fragment>
      <Showcase />
      <section id="featured">
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
                    image={offer.image}
                    readMoreLink={`/offers/${offer.id}`}
                  ></Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Home;
