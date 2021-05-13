import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
// context
import AuthContext from "../../../context/authContext";
// hooks
import useHttpRequest from "../../../hooks/useHttpRequest";
import useFormValidation from "../../../hooks/useFormValidation";
// components
import Input from "../../../components/shared/input/Input";
import Spinner from "../../../components/shared/spinner/Spinner";
import Alert from "../../../components/shared/alert/Alert";

const DashboardUpdate = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [period, setPeriod] = useState("");

  const [offer, setOffer] = useState({});
  const [requestResponse, setRequestResponse] = useState(null);

  const { isLoading, error, sendRequest } = useHttpRequest();
  const { validators, validationState, allInputsValid } = useFormValidation();
  const { isRequired, isMinLength, isMaxLength } = validators;

  const authContext = useContext(AuthContext);

  const offerId = useParams().id;
  let history = useHistory();

  useEffect(() => {
    (async () => {
      const response = await sendRequest(
        "GET",
        `${process.env.REACT_APP_BACKEND}/offers/${offerId}`
      );
      setOffer(response.data.offer);
    })();
  }, [sendRequest, offerId, setOffer]);

  const handleOfferDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await sendRequest(
        "DELETE",
        `${process.env.REACT_APP_BACKEND}/offers/${offerId}`,
        {},
        {
          Authorization: `Bearer ${authContext.token}`,
        }
      );
      setRequestResponse(response);
      history.push("/dashboard");
    } catch (err) {}
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (allInputsValid) {
      try {
        const response = await sendRequest(
          "PATCH",
          `${process.env.REACT_APP_BACKEND}/offers/${offerId}`,
          { category, title, price, period },
          {
            Authorization: `Bearer ${authContext.token}`,
          }
        );
        setRequestResponse(response);
      } catch (err) {}
    }
  };

  return (
    <div className="col-10 col-lg-6">
      <h1>Modify the current offer</h1>
      <form onSubmit={handleFormSubmit}>
        <Input
          id="title"
          type="text"
          label="Title"
          onChange={(title) => setTitle(title)}
          validators={[isMinLength, isMaxLength]}
          minLength={5}
          maxLength={30}
          errorMessage="Title should have at least 5 characters and maximum 30"
          validationState={validationState}
          initialValue={offer.title}
        />
        <Input
          id="category"
          type="text"
          label="Category"
          onChange={(category) => setCategory(category)}
          validators={[isMinLength, isMaxLength]}
          minLength={3}
          maxLength={15}
          errorMessage="Category should have at least 3 characters and maximum 15"
          validationState={validationState}
          initialValue={offer.category}
        />
        <Input
          id="price"
          type="number"
          label="Price"
          onChange={(price) => {
            // transform input from TEXT type to NUMBER type
            setPrice(+price);
          }}
          validators={[isRequired]}
          errorMessage="Price is required"
          validationState={validationState}
          initialValue={offer.price}
        />
        <Input
          id="period"
          type="text"
          label="Period"
          onChange={(period) => {
            setPeriod(period);
          }}
          validators={[isRequired]}
          errorMessage="Period is required"
          validationState={validationState}
          initialValue={offer.period}
        />
        <div className="row">
          <div className="col-12 col-lg-8">
            <button className="btn btn-success w-100">Update</button>
          </div>
          <div className="col-12 col-lg-4">
            <button
              className="btn btn-danger w-100"
              onClick={handleOfferDelete}
            >
              Delete
            </button>
          </div>
        </div>

        {/* spinning circle */}
        {isLoading && <Spinner />}

        {/* error from server after submiting form */}
        {error && <Alert type="danger" message={error} />}

        {/*If no error recieved from server display success message*/}
        {requestResponse && (
          <Alert type="success" message={requestResponse.data.message} />
        )}
      </form>
    </div>
  );
};

export default DashboardUpdate;
