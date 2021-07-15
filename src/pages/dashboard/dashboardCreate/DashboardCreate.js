import React, { useState, useContext, useEffect } from "react";
import useFormValidation from "../../../hooks/useFormValidation";
import useHttpRequest from "../../../hooks/useHttpRequest";
// context
import AuthContext from "../../../context/authContext";
// css
import "./DashboardCreate.css";
// components
import Input from "../../../components/shared/Inputs/input/Input";
import Alert from "../../../components/shared/alert/Alert";
import Spinner from "../../../components/shared/spinner/Spinner";
import ImageUpload from "../../../components/shared/image-upload/ImageUpload";
import Select from "../../../components/shared/Inputs/select/Select";
import travelCategories from "./select-options/travelCategories";
import countries from "./select-options/countriesList";
import transport from "./select-options/transportation";
import ChoosePeriod from "../../../components/dashboard/dashboard-create/choosePeriod/ChoosePeriod";
import AddDescription from "../../../components/dashboard/dashboard-create/addDescription/AddDescription";
import AddHotel from "../../../components/dashboard/dashboard-create/addHotel/AddHotel";
import globe from "./globe.png";

const CreateOffer = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [transportation, setTransportation] = useState("");
  const [begins, setBegins] = useState();
  const [ends, setEnds] = useState();
  const [hotelId, setHotelId] = useState();
  const [image, setImage] = useState(null);

  const [requestResponse, setRequestResponse] = useState(null);

  const { sendRequest, error, isLoading } = useHttpRequest();
  const { validators, validationState, allInputsValid } = useFormValidation();
  const { isRequired, isMinLength, isMaxLength } = validators;

  // !delete after
  useEffect(() => {
    console.log(hotelId);
  }, [hotelId]);

  const authContext = useContext(AuthContext);
  // FORM - Create new offer
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (allInputsValid(validationState.current)) {
      // if all inputs are valid send all the data to the data base
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
      formData.append("hotelId", hotelId);
      formData.append("image", image);
      formData.append("author", authContext.userId);

      let response;
      try {
        response = await sendRequest(
          "POST",
          `${process.env.REACT_APP_BACKEND}/offers`,
          formData,
          {
            Authorization: `Bearer ${authContext.token}`,
          }
        );
      } catch (err) {
        return console.log(err);
      }

      // set the response we get from the server
      if (response) setRequestResponse(response);
    } else {
      console.log("Not all inputs are valid");
    }
  };

  return (
    <div className="row py-5 g-0">
      <div className="d-flex align-items-center justify-content-center mb-5">
        <img className="new-offer__image me-3" src={globe} alt="" />
        <h2 className="text-center mb-0">Add a new offer</h2>{" "}
      </div>
      <div className="create-offer">
        <div className="row mb-3">
          <div className="col-lg-6">
            <p className="text-center fw-bold fs-5 mb-0">
              Add a hotel for your offer:
            </p>
          </div>
          <div className="col-lg-6">
            <AddHotel
              onFormSubmit={(val) => setHotelId(val)}
              hotelCreated={hotelId}
            />
          </div>
        </div>
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
                initialValue=""
              />
            </div>
            <div className="col-lg-6">
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
                initialValue={0}
              />
            </div>
            <div className="col-lg-6">
              <Select
                id="countries"
                options={countries}
                placeholder="Destination country"
                label="select country"
                onChange={setCountry}
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
                errorMessage="Location is required"
                validationState={validationState}
              />
            </div>
            <div className="col-lg-6">
              <Select
                id="transportation"
                options={transport}
                label="transportation provided"
                placeholder="Select transportation type if provided"
                onChange={setTransportation}
              ></Select>
            </div>
            <div className="col-lg-6">
              <Select
                id="travel-categories"
                options={travelCategories}
                label="offer category"
                placeholder="Select a category for your offer"
                onChange={setCategory}
              ></Select>
            </div>
            <div className="col-12 my-3">
              <ChoosePeriod onBeginsChange={setBegins} onEndsChange={setEnds} />
            </div>
            <div className="col-lg-4">
              <ImageUpload
                id="image"
                onImageChange={(image) => setImage(image)}
              />
            </div>
            <div className="col-lg-4">
              <AddDescription onSubmitModal={(val) => setDescription(val)} />
            </div>

            <div className="col-lg-4 mx-auto">
              <button className="btn btn-primary w-100" type="submit">
                Create an offer
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* spinning circle */}
      {isLoading && <Spinner />}

      {/* error from server after submiting form */}
      {error && <Alert message={error} />}

      {/*If no error recieved from server display success message*/}
      {requestResponse && !error && (
        <div className="col-lg-6 mx-auto">
          <Alert type="success" message={requestResponse.data.message} />
        </div>
      )}
    </div>
  );
};

export default CreateOffer;
