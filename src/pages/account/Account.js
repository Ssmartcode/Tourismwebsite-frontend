import React, { useState, useContext } from "react";
import useFormValidation from "../../hooks/useFormValidation";
// context
import AuthContext from "../../context/authContext";
// components
import Input from "../../components/shared/input/Input";
// css
import "./Account.css";
import useHttpRequest from "../../hooks/useHttpRequest";
import Alert from "../../components/shared/alert/Alert";
import Spinner from "../../components/shared/spinner/Spinner";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [requestResponse, setRequestResponse] = useState("");

  const [isSignupMode, setIsSignupMode] = useState(true);
  const [isLoginMode, setIsLoginMode] = useState(false);

  const { isLoading, error, sendRequest } = useHttpRequest();
  const { validators, validationState, allInputsValid } = useFormValidation();
  const { isMinLength, isMaxLength, isPassword } = validators;

  const authContext = useContext(AuthContext);

  const switchAuthenticationMode = () => {
    setIsLoginMode((prev) => !prev);
    setIsSignupMode((prev) => !prev);
  };

  // handle form submit
  const onFormSumbmit = async (e) => {
    e.preventDefault();
    setRequestResponse(null);
    let response;
    if (allInputsValid(validationState.current)) {
      const route = isSignupMode ? "signup" : "login";
      response = await sendRequest(
        "POST",
        `${process.env.REACT_APP_BACKEND}/users/${route}`,
        {
          userName,
          userPassword,
        }
      );
    }
    if (response) {
      isLoginMode &&
        authContext.logIn(response.data.token, response.data.userId);
      setRequestResponse(response.data.message);
    }
  };

  return (
    <div className="col-12 col-lg-6 mx-auto p-5">
      <h2 className="text-center">
        Please {isSignupMode ? "sign up:" : "log in:"}
      </h2>
      <form onSubmit={onFormSumbmit}>
        <Input
          id="username"
          type="text"
          label="User name:"
          onChange={(userName) => setUserName(userName)}
          validators={[isMinLength, isMaxLength]}
          minLength={4}
          maxLength={14}
          errorMessage="Your user name should have at lest 4 characters and maximum 14"
          validationState={validationState}
        />
        <Input
          id="password"
          type="password"
          label="Password:"
          onChange={(password) => setUserPassword(password)}
          validators={[isPassword]}
          errorMessage="Your password should be 8 characters long, have 1 number and 1 uppercase"
          validationState={validationState}
        />
        {/* log in mode button */}
        {isLoginMode && (
          <button className="btn btn-primary w-100 mb-3">Log In </button>
        )}
        {/* signup mode button */}
        {isSignupMode && (
          <button className="btn btn-primary w-100 mb-3">Signup </button>
        )}
      </form>

      {/* switch authentication mode */}
      <p className="text-center mt-2">
        I want to
        <span
          className="switch-mode text-primary"
          onClick={switchAuthenticationMode}
        >
          {isSignupMode ? " log in " : " sign up "}
        </span>{" "}
        instead
      </p>
      {/* loading spinner */}
      {isLoading && <Spinner />}

      {/* show error if any */}
      {error && <Alert message={error} />}

      {/* show success message */}
      {requestResponse && <Alert type="success" message={requestResponse} />}
    </div>
  );
};

export default Signup;
