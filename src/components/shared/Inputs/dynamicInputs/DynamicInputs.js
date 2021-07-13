import React, { useEffect, useState } from "react";
import "./DynamicInputs.css";

const DynamicInputs = (props) => {
  const [inputsList, setInputsList] = useState([{ value: "" }]);

  useEffect(() => {
    props.onChange(inputsList);
  }, [inputsList]);
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
    <div className="">
      {inputsList.map((input, i) => {
        return (
          <div key={i} className="dynamic-inputs__group">
            <input
              className="mb-2"
              id={i}
              type="text"
              onChange={(e) => handleInputChange(e, i)}
              value={input.value}
              placeholder={props.placeholder + "#" + (i + 1)}
            />
            {i !== 0 && (
              <i
                className="delete-input mb-2"
                onClick={(e) => deleteInput(e, i)}
              ></i>
            )}
            {i === inputsList.length - 1 && i < props.maxInputs - 1 && (
              <i className={`add-input mb-2`} onClick={addNewInput}></i>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DynamicInputs;
