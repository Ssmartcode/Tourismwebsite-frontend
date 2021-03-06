import React, { useState, useContext } from "react";
import useFormValidation from "../../hooks/useFormValidation";
import useHttpRequest from "../../hooks/useHttpRequest";
// context
import AuthContext from "../../context/authContext";
// components
import Input from "../../components/shared/Inputs/input/Input";
import userRoles from "./userRoles";
import Alert from "../../components/shared/alert/Alert";
import Spinner from "../../components/shared/spinner/Spinner";
import Select from "../../components/shared/Inputs/select/Select";
// css
import "./Authentication.css";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [requestResponse, setRequestResponse] = useState("");

  const [isSignupMode, setIsSignupMode] = useState(true);
  const [isLoginMode, setIsLoginMode] = useState(false);

  const { isLoading, error, sendRequest } = useHttpRequest();
  const { validators, validationState } = useFormValidation();
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

    let formData;
    if (isSignupMode) formData = { userName, userPassword, isAdmin };
    else formData = { userName, userPassword };

    let response;
    // ! UNCOMMENT THIS LATER
    // if (allInputsValid(validationState.current)) {
    const route = isSignupMode ? "signup" : "login";
    try {
      response = await sendRequest(
        "POST",
        `${process.env.REACT_APP_BACKEND}/users/${route}`,
        formData
      );
    } catch (err) {
      return console.log(err);
    }
    // !}
    if (response) {
      isLoginMode &&
        authContext.logIn(
          response.data.token,
          response.data.isAdmin,
          response.data.userId
        );
      setRequestResponse(response.data.message);
    }
  };

  return (
    <div className="authentication col-lg-4 mx-auto p-5">
      <h2 className="text-center">{isSignupMode ? "Sign up:" : "Log in:"}</h2>
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
          errorMessage="Your password should be 8 characters long, have 1 number, 1 uppercase and a special character"
          validationState={validationState}
        />

        {/* render only in signup Mode */}
        {isSignupMode && (
          <Select
            id="user-role"
            options={userRoles}
            defaultValue={false}
            placeholder="Choose a user role:"
            onChange={setIsAdmin}
            className="mb-3"
          />
        )}

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
      <p className="text-center mt-2 fs-5">
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
