import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// images
import destination from "./images/destination.png";
import globe from "./images/globe.png";
import mapMarker from "./images/mapmarker.png";

import Input from "../../shared/Inputs/input/Input";
import useFormValidation from "../../../hooks/useFormValidation";
import useHttpRequest from "../../../hooks/useHttpRequest";
import AuthContext from "../../../context/authContext";
import Select from "../../shared/Inputs/select/Select";
import ChoosePeriod from "../../dashboard/dashboard-create/choosePeriod/ChoosePeriod";
import travelCategories from "./select-option/travelCategories";
import transportations from "./select-option/transportation";
import "./SearchBar.css";

const searchBar = () => {
  const authContext = useContext(AuthContext);

  const handleFormSubmit = () => {};

  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [transportation, setTransportation] = useState("");
  const [begins, setBegins] = useState();
  const [ends, setEnds] = useState();
  const [moveSearchBar, setMoveSearchBar] = useState(false);

  const { ref, inView } = useInView({
    threshold: 1,
  });

  const { validators, validationState } = useFormValidation();
  const { isRequired } = validators;

  const { sendRequest, error, isLoading } = useHttpRequest();
  useEffect(() => {
    if (inView) setMoveSearchBar(true);
    console.log(country, category, transportation, begins, ends);
  }, [inView, country]);

  return (
    <motion.div
      ref={ref}
      animate={{
        transform: moveSearchBar ? "translateY(0%)" : "translateY(100%)",
        opacity: moveSearchBar ? 1 : 0,
      }}
      className="search-bar container d-flex justify-content-between px-4 py-3 "
    >
      <form onSubmit={handleFormSubmit}>
        <div className="row">
          <div className="col-12 ">
            <h3 className="mb-4">
              <img
                src={globe}
                alt="globe with marker"
                className="title-globe me-2"
              />
              Search for your dream destination:
            </h3>
          </div>
          <div className="col-lg-4">
            <div className="search-country">
              <img src={destination} alt="destination icon" />
              <Input
                id="searchCountry"
                label="Destination"
                onChange={(val) => setCountry(val)}
                validators={[isRequired]}
                validationState={validationState}
              />
            </div>
          </div>

          <div className="col-lg-4">
            <div className="search-category">
              <Select
                id="travel-categories"
                options={travelCategories}
                label="offer category"
                placeholder="Select a category for your offer"
                onChange={(val) => setCategory(val)}
              ></Select>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="search-transportation">
              <Select
                id="transportation"
                options={transportations}
                label="offer category"
                placeholder="Select transportation method"
                onChange={(val) => setTransportation(val)}
              ></Select>
            </div>
          </div>
          <div className="search-period mt-4">
            <ChoosePeriod onBeginsChange={setBegins} onEndsChange={setEnds} />
          </div>
        </div>
        <button
          type="submit"
          class="search-offer__button d-flex align-items-center fw-bold"
        >
          <img src={mapMarker} alt="map with a marker" className="me-2" />
          <span className="mt-1">FIND OFFER</span>
        </button>
      </form>
    </motion.div>
  );
};

export default searchBar;
