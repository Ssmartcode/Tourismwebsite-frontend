import React, { useState } from "react";
import Modal from "react-modal";
import useFormValidation from "../../../../hooks/useFormValidation";
import Input from "../../../shared/Inputs/input/Input";

const modal = document.getElementById("modal");
Modal.setAppElement(modal);

const AddDescription = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [description, setDescription] = useState("");

  const { validators, validationState, allInputsValid } = useFormValidation();
  const { isMinLength, isMaxLength } = validators;

  const handleCloseModal = () => {
    if (allInputsValid(validationState.current)) {
      props.onSubmitModal(description);
      setModalIsOpen(false);
    }
  };

  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-secondary w-100 py-2 "
        onClick={() => setModalIsOpen(true)}
      >
        Add Description
      </button>
      <Modal
        className="modal"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add description"
        style={{ overlay: { background: "rgba(25,25,25,0.4" } }}
      >
        <h3 className="mb-4">Add description</h3>
        <Input
          id="description"
          type="textarea"
          label="Offer description"
          onChange={(val) => setDescription(val)}
          validators={[isMinLength, isMaxLength]}
          minLength={1}
          maxLength={30}
          errorMessage="Description is too short!"
          validationState={validationState}
        />
        <div className="col-lg-6 mx-auto">
          <button
            type="button"
            className="btn btn-secondary w-100"
            onClick={handleCloseModal}
          >
            Add
          </button>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default AddDescription;
