import { useRef } from "react";

const validators = {
  isRequired: function (input) {
    if (input.length > 0) return true;
    else return false;
  },
  isPassword: function (input) {
    if (input.length > 7 && /[A-Z].*\d|\d.*[A-Z]/.test(input)) return true;
    else return false;
  },
  isMinLength: function (input, args) {
    if (input.length >= args.minLength) return true;
    else return false;
  },
  isMaxLength: function (input, args) {
    if (input.length <= args.maxLength) return true;
    else return false;
  },
};

const allInputsValid = (validationState) => {
  // get all the values of validation state values and check if any value is false
  // this will check if any input is not valid - the object has the id of input as a key and true/false as a value
  return Object.values(validationState).every((value) => value);
};

const useFormValidation = (props) => {
  // an object that stores the input id and the validation state (valid--true or invalid--false)
  const validationState = useRef({});

  return { validators, validationState, allInputsValid };
};

export default useFormValidation;
