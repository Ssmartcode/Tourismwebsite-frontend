import React, { useState } from "react";
import moment from "moment";

const today = moment(Date.now()).format("YYYY-MM-DD");
const tomorrow = moment(Date.now() + 86400000).format("YYYY-MM-DD");
const ChoosePeriod = (props) => {
  const [offerBegins, setOfferBegins] = useState(today);
  const [offerEnds, setOfferEnds] = useState(tomorrow);

  const handleOfferBegins = (e) => {
    const date = e.target.value;
    setOfferBegins(e.target.value);
    props.onBeginsChange(new Date(date));
  };
  const handleOfferEnds = (e) => {
    const date = e.target.value;
    setOfferEnds(e.target.value);
    props.onEndsChange(new Date(date));
  };

  return (
    <div className="row mb-3 align-items-center">
      <div className="col-lg-4">
        <p className="date-picker__label text-center fw-bold fs-5 mb-0">
          {props.label || "Choose period of time:"}
        </p>
      </div>
      <div className="col-lg-4 ">
        <input
          type="date"
          id="offer-begins"
          onChange={handleOfferBegins}
          placeholder="The journey begins:"
          value={offerBegins}
          min={today}
        />
      </div>
      <div className="col-lg-4 ">
        <input
          type="date"
          id="offer-ends"
          onChange={handleOfferEnds}
          value={offerEnds}
          min={moment(new Date(offerBegins).getTime() + 86400000).format(
            "YYYY-MM-DD"
          )}
        />
      </div>
    </div>
  );
};

export default ChoosePeriod;
