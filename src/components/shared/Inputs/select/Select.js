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
        {props.options.map((option) => (
          <option key={v4()} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
