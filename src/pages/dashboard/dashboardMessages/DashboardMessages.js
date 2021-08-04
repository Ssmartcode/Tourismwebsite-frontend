import React, { useContext, useEffect, useState } from "react";
import useHttpRequest from "../../../hooks/useHttpRequest";
import AuthContext from "../../../context/authContext";
import "./DashboardMessages.css";
import Message from "../../../components/shared/message/Message";
import Alert from "../../../components/shared/alert/Alert";
import Spinner from "../../../components/shared/spinner/Spinner";

const dashboardMessages = () => {
  const { sendRequest, error, isLoading } = useHttpRequest();
  const [messages, setMessages] = useState([]);
  const authContext = useContext(AuthContext);

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

  if (!messages.length)
    return (
      <Alert
        type="warning"
        message={"Messages recieved from other users will be shown here"}
      />
    );
  else
    return (
      <div className="scrollable-container">
        <ul className="list-group">
          {isLoading && <Spinner />}
          {messages.map((message) => {
            return (
              <Message
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
      </div>
    );
};

export default dashboardMessages;
