import React, { useContext, useState } from "react";
import Modal from "react-modal";
import useFormValidation from "../../../../hooks/useFormValidation";
import DynamicInputs from "../../../shared/Inputs/dynamicInputs/DynamicInputs";
import Input from "../../../shared/Inputs/input/Input";
import rating from "./rating.png";
import "./AddHotel.css";
import useHttpRequest from "../../../../hooks/useHttpRequest";
import AuthContext from "../../../../context/authContext";
import ImageUpload from "../../../shared/image-upload/ImageUpload";
import Spinner from "../../../shared/spinner/Spinner";

const modal = document.getElementById("modal");
Modal.setAppElement(modal);

const AddHotel = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [description, setDescription] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [address, setAddress] = useState("");
  const [stars, setStars] = useState(0);
  const [facilities, setFacilities] = useState([]);
  const [image, setImage] = useState();

  const { validators, validationState } = useFormValidation();
  const { isMinLength, isMaxLength, isRequired } = validators;

  const { sendRequest, error, isLoading } = useHttpRequest();

  const authContext = useContext(AuthContext);

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // if (!allInputsValid) return;
    const formData = new FormData();
    formData.append("description", description);
    formData.append("hotelName", hotelName);
    formData.append("address", address);
    formData.append("stars", stars);
    formData.append("facilities", JSON.stringify(facilities));
    formData.append("image", image);
    console.log(...formData);
    let response;
    try {
      response = await sendRequest(
        "POST",
        process.env.REACT_APP_BACKEND + "/hotels/create-hotel",
        formData,
        { Authorization: `Bearer ${authContext.token}` }
      );
    } catch (error) {
      return console.log(error);
    }
    if (!error && response) {
      props.onFormSubmit(response.data.id);
      handleCloseModal();
    }
  };
  return (
    <React.Fragment>
      <button
        type="button"
        className={`btn btn-secondary w-100 py-2 ${
          props.hotelCreated && "disabled"
        }`}
        onClick={() => setModalIsOpen(true)}
      >
        {props.hotelCreated ? "Hotel has been added" : "Add a hotel"}
      </button>
      <Modal
        className="modal"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add hotel"
        style={{ overlay: { background: "rgba(25,25,25,0.4" } }}
      >
        <form className="add-hotel" onSubmit={handleFormSubmit}>
          <h3 className="mb-4">Add a new hotel</h3>
          <ImageUpload
            placeholder="Upload hotel image"
            onImageChange={(val) => setImage(val)}
          />
          <Input
            id="hotelName"
            type="input"
            label="Hotel Name"
            onChange={(val) => setHotelName(val)}
            validators={[isMinLength, isMaxLength]}
            minLength={1}
            maxLength={30}
            errorMessage="Description is too short!"
            validationState={validationState}
          />
          <Input
            id="hotelAddress"
            type="input"
            label="Hotel Address"
            onChange={(val) => setAddress(val)}
            validators={[isMinLength, isMaxLength]}
            minLength={1}
            maxLength={30}
            errorMessage="Address is too short!"
            validationState={validationState}
          />
          <Input
            id="hotelDescription"
            type="textarea"
            label="Hotel Description"
            onChange={(val) => setDescription(val)}
            validators={[isRequired]}
            errorMessage="You need to give a rating!"
            validationState={validationState}
          />
          <div className="row w-100 g-0">
            <div className="col-8">
              <Input
                id="hotelStars"
                type="number"
                label="Hotel Stars"
                onChange={(val) => setStars(val)}
                validators={[isMinLength, isMaxLength]}
                minLength={1}
                maxLength={30}
                errorMessage="Address is too short!"
                validationState={validationState}
              />
            </div>
            <div className="col-4 rating text-center">
              <img src={rating} alt="5 stars" />
            </div>
          </div>
          <h5 className="me-auto mt-4 mb-3">Add facilities (max 5):</h5>

          <DynamicInputs
            maxInputs={5}
            placeholder="facility"
            onChange={(val) => setFacilities(val)}
          />
          <div className="col-lg-6 mx-auto">
            <button type="submit" className="btn btn-secondary mt-2 w-100">
              Add
            </button>
          </div>
        </form>
        {/* if loading add spinner */}
        {isLoading && <Spinner />}
      </Modal>
    </React.Fragment>
  );
};

export default AddHotel;
