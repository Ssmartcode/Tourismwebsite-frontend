import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import useHttpRequest from "../../hooks/useHttpRequest";
import AuthContext from "../../context/authContext";
import SendMessage from "../../components/singleOffer/sendMessage/SendMessage";
import OfferTitle from "../../components/singleOffer/offerTitle/OfferTitle";
import OfferImages from "../../components/singleOffer/offerImages/OfferImages";
import OfferInfo from "../../components/singleOffer/offerInfo/OfferInfo";
import OfferDescription from "../../components/singleOffer/OfferDescription/OfferDescription";
import "./SingleOffer.css";
import OfferHotel from "../../components/singleOffer/offerHotel/OfferHotel";
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
    <section className="single-offer">
      <div className="container p-0 pb-2">
        <OfferTitle
          title={offer.title}
          price={offer.price}
          newPrice={offer.newPrice}
          offerId={offerId}
        />
        <div className="row g-0 px-3">
          {/* offer image */}
          <div className="col-lg-6 mt-4">
            <OfferImages image={offer.image} imageDescription="Offer image" />
          </div>
          {/* Informations about the offer */}
          <div className="col-lg-6">
            <OfferInfo
              title={offer.title}
              location={offer.location}
              begins={offer.begins}
              ends={offer.ends}
              country={offer.country}
              transportation={offer.transportation}
            />
            {/* offer description */}
            <OfferDescription description={offer.description} />
          </div>
          {offer.hotelId && (
            <React.Fragment>
              {/* hotel image */}
              <div className="col-lg-6">
                <OfferImages
                  image={offer.hotelId.image}
                  imageDescription="Hotel image"
                />
              </div>
              {/* Hotel informations */}
              <div className="col-lg-6">
                <OfferHotel
                  hotelName={offer.hotelId.hotelName}
                  address={offer.hotelId.address}
                  description={offer.hotelId.description}
                  stars={offer.hotelId.stars}
                  facilities={offer.hotelId.facilities}
                />
              </div>
            </React.Fragment>
          )}
        </div>
        {/* send message to organizer */}
        <SendMessage sendTo={offer.author} offerId={offer._id}>
          <div className="message-organizer pe-3 py-3 fw-bold fs-5">
            <span> Message the organizer</span>
          </div>
        </SendMessage>
      </div>
    </section>
  );
};

export default SingleOffer;
