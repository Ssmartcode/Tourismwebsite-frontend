import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
// context
import AuthContext from "../../../context/authContext";
// hooks
import useHttpRequest from "../../../hooks/useHttpRequest";
import useFormValidation from "../../../hooks/useFormValidation";
// components
import Input from "../../../components/shared/Inputs/input/Input";
import Spinner from "../../../components/shared/spinner/Spinner";
import Alert from "../../../components/shared/alert/Alert";
import ChoosePeriod from "../../../components/dashboard/dashboard-create/choosePeriod/ChoosePeriod";
import travelCategories from "./select-options/travelCategories";
import countries from "./select-options/countriesList";
import transport from "./select-options/transportation";
import Select from "../../../components/shared/Inputs/select/Select";

const DashboardUpdate = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [newPrice, setNewPrice] = useState();
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");
  const [transportation, setTransportation] = useState("");
  const [begins, setBegins] = useState();
  const [ends, setEnds] = useState();
  //! const [image, setImage] = useState();

  const [offer, setOffer] = useState();
  const [requestResponse, setRequestResponse] = useState(null);

  const { isLoading, error, sendRequest } = useHttpRequest();
  const { validators, validationState } = useFormValidation();
  const { isRequired, isMinLength, isMaxLength } = validators;

  const authContext = useContext(AuthContext);

  const offerId = useParams().id;
  let history = useHistory();

  // get informations about the offer
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
  }, [sendRequest, offerId, setOffer]);

  // handle delete button press - send request to delete the offer
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

  // handle update button press - update the offer
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category", category);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("begins", begins);
    formData.append("ends", ends);
    formData.append("location", location);
    formData.append("transportation", transportation);
    formData.append("country", country);
    console.log(category);
    //! formData.append("image", image);

    // if (allInputsValid(validationState.current)) {
    try {
      const response = await sendRequest(
        "PATCH",
        `${process.env.REACT_APP_BACKEND}/offers/${offerId}`,
        {
          category,
          description,
          title,
          price,
          newPrice,
          begins,
          ends,
          location,
          transportation,
          country,
        },
        {
          Authorization: `Bearer ${authContext.token}`,
        }
      );
      setRequestResponse(response);
    } catch (err) {
      return console.log(err);
    }
    // }
  };

  // return spinner if offer hasn't yet been fetched from server
  if (!offer) return <Spinner />;

  return (
    <div className="col-10 col-lg-6">
      <h2 className="text-center mb-5">
        <span>{title}</span>
      </h2>
      <form onSubmit={handleFormSubmit}>
        <div className="row">
          <div className="col-lg-6">
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
          </div>
          <div className="col-lg-3">
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
          </div>
          <div className="col-lg-3">
            <Input
              id="new-price"
              type="number"
              label="New Price"
              onChange={(newPrice) => {
                setNewPrice(newPrice);
              }}
              validators={[]}
              errorMessage=""
              validationState={validationState}
            />
          </div>
          <div className="col-lg-6 mb-3">
            <Select
              id="countries"
              options={countries}
              initialValue={offer.country}
              label="select country"
              onChange={(val) => setCountry(val)}
            ></Select>
          </div>
          <div className="col-lg-6">
            <Input
              id="location"
              type="text"
              label="Location"
              onChange={(location) => {
                setLocation(location);
              }}
              validators={[isRequired]}
              initialValue={offer.location}
              errorMessage="Location is required"
              validationState={validationState}
            />
          </div>
          <div className="col-lg-6 mb-3">
            <Select
              id="transportation"
              options={transport}
              label="transportation provided"
              initialValue={offer.transportation}
              onChange={(val) => setTransportation(val)}
            ></Select>
          </div>
          <div className="col-lg-6 mb-3">
            <Select
              id="travel-categories"
              options={travelCategories}
              initialValue={offer.category}
              onChange={(val) => setCategory(val)}
            ></Select>
          </div>
          <div className="col-12"></div>
          <Input
            id="description"
            type="textarea"
            label="Offer description"
            initialValue={offer.description}
            onChange={(val) => setDescription(val)}
            validators={[isMinLength, isMaxLength]}
            minLength={1}
            maxLength={500}
            errorMessage="Description is too short!"
            validationState={validationState}
          />
          <div className="col-12 mb-3">
            <ChoosePeriod
              begins={offer.begins}
              onBeginsChange={(val) => setBegins(val)}
              ends={offer.ends}
              onEndsChange={(val) => setEnds(val)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-8">
            <button className="btn btn-primary w-100">Update</button>
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
