import React, { useState } from "react";
import Modal from "react-modal";
import useFormValidation from "../../../../hooks/useFormValidation";
import Input from "../../../shared/Inputs/input/Input";

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

  const { validators, validationState, allInputsValid } = useFormValidation();
  const { isMinLength, isMaxLength } = validators;

  const handleCloseModal = () => {
    props.onSubmitModal(description);
    setModalIsOpen(false);
  };

  return (
    <React.Fragment>
      <button
        className="btn btn-secondary w-100"
        onClick={() => setModalIsOpen(true)}
      >
        Add new hotel
      </button>
      <Modal
        className="modal"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add hotel"
        style={{ overlay: { background: "rgba(25,25,25,0.4" } }}
      >
        <h3 className="mb-4">Add a new hotel</h3>
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

        <button className="btn btn-secondary" onClick={handleCloseModal}>
          Add
        </button>
      </Modal>
    </React.Fragment>
  );
};

export default AddHotel;
