import React, { useEffect, useState, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import useHttpRequest from "../../hooks/useHttpRequest";
import AuthContext from "../../context/authContext";
import SendMessage from "../../components/singleOffer/sendMessage/SendMessage";
import OfferTitle from "../../components/singleOffer/offerTitle/OfferTitle";
import OfferImages from "../../components/singleOffer/offerImages/OfferImages";
import OfferInfo from "../../components/singleOffer/offerInfo/OfferInfo";
import AddDescription from "../../components/singleOffer/AddDescription/OfferDescription";
import "./SingleOffer.css";
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
          offerId={offerId}
        />
        <div className="row">
          <div className="col-lg-6">
            <OfferImages image={offer.image} />
          </div>
          <div className="col-lg-6">
            <OfferInfo
              title={offer.title}
              location={offer.location}
              begins={offer.begins}
              ends={offer.ends}
              country={offer.country}
              transportation={offer.transportation}
            />
            <AddDescription />
          </div>
        </div>
        <SendMessage sendTo={offer.author} offerId={offer._id}>
          <div className="message-organizer pe-3">
            <span> Message the organizer</span>
          </div>
        </SendMessage>
      </div>
    </section>
  );
};

export default SingleOffer;
