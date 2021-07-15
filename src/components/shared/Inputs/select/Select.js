import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import "./Select.css";

const Select = (props) => {
  const [selectValue, setSelectValue] = useState(
    props.initialValue || props.placeholder
  );
  const { onChange } = props;

  useEffect(() => {
    onChange(selectValue);
  }, [selectValue, onChange]);

  const handleSelect = (e) => {
    setSelectValue(e.target.value);
  };
  return (
    <select
      id={props.id}
      className={props.className}
      onChange={handleSelect}
      value={selectValue}
    >
      {/* Placeholder option */}
      {props.placeholder && <option disabled>{props.placeholder}</option>}
      {/* options */}
      {props.options.map((option, i) => {
        return (
          <option key={v4()} value={option.value}>
            {option.text}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
