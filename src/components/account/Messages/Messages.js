import React, { useEffect, useState } from "react";
import useHttpRequest from "../../../hooks/useHttpRequest";
import Message from "../../shared/message/Message";
import { v4 } from "uuid";

const Messages = ({ authContext }) => {
  const { sendRequest, error, isLoading } = useHttpRequest();
  const [messages, setMessages] = useState([]);

  // get user's messages
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
        console.log(err);
      }
      setMessages(response.data.messages);
    })();
  }, []);

  return (
    <div className="col-lg-6">
      <div className="sent-messages">
        <h5 className="text-center mb-4">Messages you have sent:</h5>
        <ul className="list-group">
          {messages.map((message) => {
            return (
              <Message
                key={v4()}
                title={message.title}
                email={message.email}
                message={message.message}
                id={message.id}
                messages={messages}
                handleMessageDeletion={(messages) => setMessages(messages)}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Messages;
