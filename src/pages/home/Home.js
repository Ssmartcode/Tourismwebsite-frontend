import React from "react";
// components
import Showcase from "../../components/home/showcase/Showcase";
import Featured from "../../components/home/featured/Featured";
import BeachSeason from "../../components/home/beach-season/BeachSeason";
import Discounted from "../../components/home/discounted/Discounted";
import SearchBar from "../../components/home/searchBar/SearchBar";

const Home = () => {
  return (
    <React.Fragment>
      <Showcase />
      <section id="search-bar">
        <SearchBar />
      </section>
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
