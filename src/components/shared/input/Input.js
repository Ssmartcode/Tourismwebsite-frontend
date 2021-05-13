import React, { useState, useEffect, useRef } from "react";
import "./Input.css";

const Input = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);
  const [inputTouched, setInputTouched] = useState(false);

  // props required for validation
  const { validators, onChange, validationState, id } = props;
  const inputRef = useRef();

  // set initial value
  const { initialValue } = props;
  useEffect(() => {
    setInputValue(initialValue || "");
  }, [initialValue]);

  // optional arguments for validation
  const { minLength = 0, maxLength = 9999 } = props;
  useEffect(() => {
    const validatorArguments = { minLength, maxLength };
    // check if input is valid for every validator sent on props
    const validationResult = validators.every((validator) =>
      validator(inputValue, validatorArguments)
    );
    // update input validation state
    setIsInputValid(validationResult);
    validationState.current[id] = validationResult;
    // send input value to parent
    onChange(inputValue);
  }, [
    inputValue,
    validators,
    isInputValid,
    id,
    validationState,
    minLength,
    maxLength,
    onChange,
  ]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="input-group">
      <input
        id={props.id}
        onBlur={() => {
          setInputTouched(true);
        }}
        className={!isInputValid && inputTouched ? "invalid" : ""}
        ref={inputRef}
        type={props.type}
        onChange={handleInputChange}
        value={inputValue}
        label={props.label}
        placeholder={props.placeholder || props.label}
      ></input>
      <div className="input-error">
        {!isInputValid && inputTouched ? props.errorMessage : ""}
      </div>
    </div>
  );
};

export default Input;
