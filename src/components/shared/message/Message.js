import React, { useContext } from "react";
import useHttpRequest from "../../../hooks/useHttpRequest";
import "./Message.css";
import AuthContext from "../../../context/authContext";
import Spinner from "../spinner/Spinner";

const Message = (props) => {
  const authContext = useContext(AuthContext);
  const { sendRequest, error, isLoading } = useHttpRequest();

  // delete message from DB
  const handleMessageDeletion = async () => {
    let response;
    try {
      response = await sendRequest(
        "DELETE",
        process.env.REACT_APP_BACKEND +
          "/users/messages/delete-message/" +
          props.id,
        {},
        { Authorization: `Bearer ${authContext.token}` }
      );
    } catch (err) {
      return console.log(err);
    }

    //delete messages on front-end
    if (!error && response) props.handleMessageDeletion(response.data.messages);
  };

  return (
    <li className="message-item list-group-item p-5 mb-2">
      {isLoading && <Spinner />}
      <div className="delete-message" onClick={handleMessageDeletion}>
        <i className="fas fa-times text-danger"></i>
      </div>
      <h5 className="text-center">Title: {props.title}</h5>
      <p className="mt-3">{props.message}</p>
      <p className="mt-3 mb-0">
        <strong>Contact information: </strong>
        {props.email}
      </p>
    </li>
  );
};

export default Message;
