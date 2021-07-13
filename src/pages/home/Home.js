import React from "react";
// components
import Showcase from "../../components/home/showcase/Showcase";
import Featured from "../../components/home/featured/Featured";
import BeachSeason from "../../components/home/beach-season/BeachSeason";
import Discounted from "../../components/home/discounted/Discounted";

const Home = () => {
  return (
    <React.Fragment>
      <Showcase />
      <section id="featured">
        <Featured />
      </section>
      <section id="beach-season">
        <BeachSeason />
      </section>
      <section id="discounted">
        <Discounted />
      </section>
    </React.Fragment>
  );
};

export default Home;
