import React, { useEffect, useState } from "react";
import useHttpRequest from "../../../hooks/useHttpRequest";
import Message from "../../shared/message/Message";
import Spinner from "../../shared/spinner/Spinner";
import "./Messages.css";

const Messages = ({ authContext }) => {
  const { sendRequest, error, isLoading } = useHttpRequest();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    (async () => {
      let response;
      try {
        response = await sendRequest(
          "GET",
          process.env.REACT_APP_BACKEND +
            "/users/messages/get-messages/" +
            authContext.userId,
          {},
          { Authorization: `Bearer ${authContext.token}` }
        );
      } catch (err) {
        return console.log(err);
      }
      if (!error && response) setMessages(response.data.messages);
    })();
  }, []);

  return (
    <div className="col-lg-6">
      <div className="sent-messages">
        <h6 className="text-center mb-4">Messages you have sent:</h6>
        <ul className="list-group">
          {messages.map((message) => {
            return (
              <Message
                key={message.id}
                title={message.title}
                email={message.email}
                message={message.message}
                related={message.related}
                id={message.id}
                messages={messages}
                handleMessageDeletion={(messages) => setMessages(messages)}
              />
            );
          })}
        </ul>

        {/* LOADING SPINNER */}
        {isLoading && <Spinner />}
      </div>
    </div>
  );
};

export default Messages;
