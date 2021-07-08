import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import "./Select.css";

const Select = (props) => {
  console.log(props.defaultValue);
  const [selectValue, setSelectValue] = useState(props.defaultValue);
  const { onChange } = props;

  useEffect(() => {
    onChange(selectValue);
  }, [selectValue, onChange]);

  const handleSelect = (e) => {
    setSelectValue(e.target.value);
  };
  return (
    <div className="input-group">
      <select
        id={props.id}
        className={`${props.className || ""}`}
        onChange={handleSelect}
        value={selectValue}
      >
        {/* Placeholder option */}
        <option disabled selected>
          {props.placeholder}
        </option>
        {/* options */}
        {props.options.map((option, i) => {
          return (
            <option key={v4()} value={option.value}>
              {option.text}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
