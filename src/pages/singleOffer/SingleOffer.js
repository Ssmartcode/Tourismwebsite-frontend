import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import useHttpRequest from "../../hooks/useHttpRequest";
import "./SingleOffer.css";
import AuthContext from "../../context/authContext";

const SingleOffer = () => {
  const [offer, setOffer] = useState({});
  const { sendRequest } = useHttpRequest();

  const offerId = useParams().id;
  const authContext = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      try {
        const response = await sendRequest(
          "GET",
          `${process.env.REACT_APP_BACKEND}/offers/${offerId}`
        );
        setOffer(response.data.offer);
      } catch (err) {}
      console.log("token:" + authContext.token);
    })();
  }, [authContext, offerId, sendRequest]);
  return (
    <section className="single-offer ">
      <div className="container ">
        <div className="row">
          <div className="col-12 col-lg-4 p-0">
            <h3 className="p-2 text-center mb-0 bg-light">{offer.title}</h3>
            <img
              src={`${process.env.REACT_APP_BACKEND}/${offer.image || ""}`}
              alt=""
            />
            <div className="price p-2 bg-light">
              <strong>Price: </strong>
              {offer.price}$
            </div>
          </div>
          <div className="col-12 col-lg-8 bg-light p-0">
            <div className="row"></div>
          </div>
        </div>
        <div className="row"></div>
      </div>
    </section>
  );
};

export default SingleOffer;
