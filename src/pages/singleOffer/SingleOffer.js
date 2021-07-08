import React, { useEffect, useState, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import useHttpRequest from "../../hooks/useHttpRequest";
import "./SingleOffer.css";
import AuthContext from "../../context/authContext";
import SendMessage from "../../components/singleOffer/sendMessage/SendMessage";
import OfferTitle from "../../components/singleOffer/offerTitle/OfferTitle";

const SingleOffer = () => {
  const [offer, setOffer] = useState({});
  const { sendRequest } = useHttpRequest();

  const offerId = useParams().id;
  const authContext = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      let response;
      try {
        response = await sendRequest(
          "GET",
          `${process.env.REACT_APP_BACKEND}/offers/${offerId}`
        );
      } catch (err) {
        return console.log(err);
      }
      if (response) setOffer(response.data.offer);
    })();
  }, [authContext, offerId, sendRequest]);
  return (
    <section className="single-offer ">
      <div className="container p-0 pb-2">
        <OfferTitle
          title={offer.title}
          price={offer.price}
          newPrice={offer.newPrice}
          begins={offer.begins}
          ends={offer.ends}
          offerId={offerId}
        />
        <img
          src={`${process.env.REACT_APP_BACKEND}/${offer.image || ""}`}
          className="my-4"
          alt=""
        />
        <SendMessage sendTo={offer.author}>
          <div className="message-organizer pe-3">
            <span> Message the organizer</span>
          </div>
        </SendMessage>
      </div>
    </section>
  );
};

export default SingleOffer;
