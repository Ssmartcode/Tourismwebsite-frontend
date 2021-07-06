import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import useHttpRequest from "../../hooks/useHttpRequest";
import "./SingleOffer.css";
import AuthContext from "../../context/authContext";
import SendMessage from "../../components/singleOffer/SendMessage";
import AddFavorites from "../../components/singleOffer/addFavorites/AddFavorites";

const SingleOffer = () => {
  const [offer, setOffer] = useState({});
  const { sendRequest } = useHttpRequest();

  const offerId = useParams().id;
  const authContext = useContext(AuthContext);

  const handleAddToFavorites = () => {};

  useEffect(() => {
    (async () => {
      try {
        const response = await sendRequest(
          "GET",
          `${process.env.REACT_APP_BACKEND}/offers/${offerId}`
        );
        setOffer(response.data.offer);
      } catch (err) {}
    })();
  }, [authContext, offerId, sendRequest]);
  return (
    <section className="single-offer ">
      <div className="container p-0 pb-2">
        <div className="title d-flex align-items-center justify-content-around">
          <h3 className="title p-3 text-center mb-0">{offer.title}</h3>
          <div className="d-flex align-items-center">
            <div className="price me-4">
              <strong>Price: </strong>
              <span>{offer.price}$</span>
            </div>
            <strong className="period me-4">{offer.period}</strong>
            <AddFavorites offerId={offerId} />
          </div>
        </div>
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
