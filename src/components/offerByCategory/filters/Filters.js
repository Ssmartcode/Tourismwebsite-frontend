import React, { useEffect, useState } from "react";
import "./Filters.css";

const Filters = (props) => {
  const [filters, setFilters] = useState([]);

  const handleValueChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) setFilters([...filters, value]);
    else setFilters(filters.filter((f) => f !== value));
  };

  const { onChange } = props;
  useEffect(() => {
    onChange(filters);
  }, [filters]);
  return (
    <div className="d-flex">
      <div className="form-check me-3">
        <input
          className="form-check-input"
          type="checkbox"
          value="discounted"
          id="discounted-offers"
          onChange={handleValueChange}
        />
        <label className="form-check-label" htmlFor="discounted-offers">
          Discounted offers
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="transportationProvided"
          id="provided-transportation"
          onChange={handleValueChange}
        />
        <label className="form-check-label" htmlFor="provided-transportation">
          Transportation provided
        </label>
      </div>
    </div>
  );
};

export default Filters;
