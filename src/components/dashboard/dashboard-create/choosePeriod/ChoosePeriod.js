import React, { useState } from "react";
import moment from "moment";

const ChoosePeriod = (props) => {
  // by default starts today, if no starting date is provided
  const starts = props.begins
    ? moment(props.begins).format("YYYY-MM-DD")
    : moment(Date.now()).format("YYYY-MM-DD");

  // by default ends tomorrow
  const ends = props.ends
    ? moment(props.ends).format("YYYY-MM-DD")
    : moment(Date.now() + 86400000).format("YYYY-MM-DD");

  const [offerBegins, setOfferBegins] = useState(starts);
  const [offerEnds, setOfferEnds] = useState(ends);

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
    <div className="row align-items-center">
      <div className="col-lg-4">
        <p className="date-picker__label text-center fw-bold fs-5 mb-0">
          {props.label || "Choose period of time:"}
        </p>
      </div>
      <div className="col-lg-4 ">
        <div className="input-group">
          <input
            type="date"
            id="offer-begins"
            onChange={handleOfferBegins}
            placeholder="The journey begins:"
            value={offerBegins}
            min={starts}
          />
        </div>
      </div>
      <div className="col-lg-4 ">
        <div className="input-group">
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
    </div>
  );
};

export default ChoosePeriod;
