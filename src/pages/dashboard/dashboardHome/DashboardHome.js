import React, { useEffect, useState } from "react";
import ListItem from "../../../components/shared/list-item/ListItem";
import Alert from "../../../components/shared/alert/Alert";
import useHttpRequest from "../../../hooks/useHttpRequest";
import "./DashboardHome.css";
import Spinner from "../../../components/shared/spinner/Spinner";

const DashboardHome = () => {
  const [offers, setOffers] = useState([]);
  const { sendRequest, isLoading, error } = useHttpRequest();

  useEffect(() => {
    (async () => {
      const response = await sendRequest(
        "GET",
        `${process.env.REACT_APP_BACKEND}/offers`
      );
      setOffers(response.data.offers);
    })();
  }, [sendRequest]);
  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100">
      {/* spinner when retreiving data from server */}
      {isLoading && <Spinner />}
      <div className="list-group col-10 col-lg-6">
        {offers.map((offer) => {
          return (
            <ListItem
              key={offer.id}
              title={offer.title}
              paragraph={offer.category}
              url={`/dashboard/offers/${offer.id}`}
            />
          );
        })}
      </div>
      {error && <Alert type="danger" message={error.response.data.messsage} />}
    </div>
  );
};

export default DashboardHome;
