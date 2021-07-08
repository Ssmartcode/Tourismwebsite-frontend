import React, { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import useFormValidation from "../../../../hooks/useFormValidation";
import Input from "../input/Input";
import "./DynamicInputs.css";

const DynamicInputs = () => {
  const [inputsList, setInputsList] = useState([{ value: "" }]);

  const addNewInput = () => {
    const newList = [...inputsList];
    newList.push({ value: "" });
    setInputsList(newList);
  };
  const deleteInput = (e, i) => {
    const newList = [...inputsList];
    newList.splice(i, 1);
    setInputsList(newList);
  };
  const handleInputChange = (e, i) => {
    const newList = [...inputsList];
    newList[i].value = e.target.value;
    setInputsList(newList);
  };

  return (
    <div className="d-flex">
      {inputsList.map((input, i) => {
        return (
          <div className="dynamic-inputs__group">
            <input
              key={i}
              id={i}
              type="text"
              onChange={(e) => handleInputChange(e, i)}
              value={input.value}
            />
            <i className="delete-input" onClick={(e) => deleteInput(e, i)}></i>
          </div>
        );
      })}
      <i className="add-input" onClick={addNewInput}></i>
    </div>
  );
};

export default DynamicInputs;
