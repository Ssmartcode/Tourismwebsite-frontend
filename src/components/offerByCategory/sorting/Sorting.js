import React, { useEffect, useState } from "react";
import Select from "../../shared/Inputs/select/Select";
import sortingList from "./select-options/sorting";
import "./Sorting.css";

const Sorting = (props) => {
  const [sorting, setSorting] = useState();

  useEffect(() => {
    props.onChange(sorting);
  }, [sorting]);

  return (
    <div className="sorting d-flex justify-content-start mb-3 me-3">
      <Select
        id="sort"
        options={sortingList}
        placeholder="Sort by:"
        onChange={(val) => setSorting(val)}
        className="sorting-select"
      />
    </div>
  );
};

export default Sorting;
