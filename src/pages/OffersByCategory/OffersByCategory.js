import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./OffersByCategory.css";
import useHttpRequest from "../../hooks/useHttpRequest";
import Spinner from "../../components/shared/spinner/Spinner";
import Card from "../../components/shared/card/Card";
import Pagination from "../../components/shared/pagination/Pagination";
import Sorting from "../../components/offerByCategory/sorting/Sorting";
import Filters from "../../components/offerByCategory/filters/Filters";

const OffersByCategory = () => {
  const { isLoading, sendRequest, error } = useHttpRequest();
  const [offers, setOffers] = useState([]);
  const [pages, setPages] = useState(1);
  const [currPage, setCurrpage] = useState(1);

  const categoryParam = useParams().category;
  const [category, setCategory] = useState(categoryParam);

  // get currpage
  const onPageChange = useCallback((currPage) => {
    setCurrpage(currPage);
  });
  const [sorting, setSorting] = useState("");
  const [filtersList, setFiltersList] = useState([]);

  // set category
  useEffect(() => {
    setCategory(categoryParam);
  }, [categoryParam]);

  // get offers
  useEffect(() => {
    const filters =
      filtersList.length > 0
        ? filtersList.map((f) => "&" + f + "=yes").join("")
        : "";

    (async () => {
      let response;
      try {
        response = await sendRequest(
          "GET",
          `${process.env.REACT_APP_BACKEND}/offers/category/${category}?page=${currPage}&${sorting}=yes${filters}`
        );
      } catch (error) {
        console.log(error);
      }
      if (!error && response) {
        setOffers(response.data.offers);
        setPages(response.data.pages);
      }
    })();
  }, [category, currPage, sorting, filtersList]);

  return (
    <div className="container">
      <h3 className="my-5">
        Offers by category (
        {category
          .split("-")
          .join(" ")
          .toUpperCase()}
        ):
      </h3>
      <div className="d-flex">
        <Sorting onChange={(val) => setSorting(val)} />
        <Filters onChange={(val) => setFiltersList(val)} />
      </div>
      <div className="row mb-3 justify-content-between">
        {isLoading && <Spinner />}
        {offers.map((offer) => {
          return (
            <div key={offer._id} className="col-lg-4">
              <Card
                title={offer.title}
                category={offer.category}
                begings={offer.begins}
                ends={offer.ends}
                price={offer.price}
                newPrice={offer.newPrice}
                image={offer.image}
                readMoreLink={`/offers/${offer._id}`}
              ></Card>
            </div>
          );
        })}
      </div>
      <Pagination pages={pages ? pages : 0} onPageChange={onPageChange} />
    </div>
  );
};

export default OffersByCategory;
