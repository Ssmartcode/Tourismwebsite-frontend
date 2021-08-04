import React, { useContext, useState } from "react";
import Modal from "react-modal";
import useFormValidation from "../../../hooks/useFormValidation";
import useHttpRequest from "../../../hooks/useHttpRequest";
import Input from "../../shared/Inputs/input/Input";
import "./SendMessage.css";
import AuthContext from "../../../context/authContext";
import Alert from "../../shared/alert/Alert";
import Spinner from "../../shared/spinner/Spinner";

const modal = document.getElementById("modal");
Modal.setAppElement(modal);

const SendMessage = (props) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const authContext = useContext(AuthContext);

  const { validators, validationState } = useFormValidation();
  const { isMinLength, isMaxLength, isRequired } = validators;

  const { sendRequest, error, isLoading } = useHttpRequest();

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let response;
    try {
      response = await sendRequest(
        "POST",
        process.env.REACT_APP_BACKEND + "/users/messages/send-message",
        {
          title,
          message,
          email,
          related: props.offerId,
          reciever: props.sendTo,
        },
        { Authorization: `Bearer ${authContext.token}` }
      );
    } catch (err) {
      return console.log(err);
    }
    if (!error && response) handleModalClose();
  };

  return (
    <React.Fragment>
      <div onClick={handleModalOpen}>{props.children}</div>
      <Modal
        className="modal send-message__modal"
        isOpen={openModal}
        onRequestClose={handleModalClose}
        style={{ overlay: { background: "rgba(25,25,25,0.4", zIndex: 1000 } }}
      >
        {/* if user is NOT logged in display a message warning the user */}
        {!authContext.token && (
          <h4 className="text-center">
            You need to be logged in to send a message!
          </h4>
        )}

        {/* if user is logged in render a modal with a form */}
        {authContext.token && (
          <form className="text-center" onSubmit={handleFormSubmit}>
            <h5 className="text-center mb-4">
              Send a message to the organizer:
            </h5>
            <Input
              id="message-title"
              type="text"
              label="Message Title:"
              onChange={(title) => setTitle(title)}
              validators={[isMinLength, isMaxLength]}
              minLength={4}
              maxLength={50}
              errorMessage="Title should have at least 5 characters and maximum 30"
              validationState={validationState}
              initialValue=""
            />
            <Input
              id="contact-email"
              type="email"
              label="E-mail address:"
              onChange={(email) => setEmail(email)}
              validators={[isRequired]}
              errorMessage="Email is required"
              validationState={validationState}
              initialValue=""
            />
            <Input
              id="message-body"
              type="text"
              label="Message Content:"
              onChange={(message) => setMessage(message)}
              validators={[isMinLength, isMaxLength]}
              minLength={5}
              maxLength={500}
              errorMessage="Message should have at least 5 characters and maximum 500"
              validationState={validationState}
              initialValue=""
            />
            <button className="btn btn-primary ">Send message</button>
          </form>
        )}
        {/* Loading spinner */}
        {isLoading && <Spinner />}
        {/* display error if any */}
        {error && <Alert type="danger" message={error}></Alert>}
      </Modal>
    </React.Fragment>
  );
};

export default SendMessage;
