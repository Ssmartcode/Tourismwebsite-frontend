import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./OffersByCategory.css";
import useHttpRequest from "../../hooks/useHttpRequest";
import Spinner from "../../components/shared/spinner/Spinner";
import Card from "../../components/shared/card/Card";
import Pagination from "../../components/shared/pagination/Pagination";

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

  // set category
  useEffect(() => {
    setCategory(categoryParam);
  }, [categoryParam]);

  // get offers
  useEffect(() => {
    (async () => {
      const response = await sendRequest(
        "GET",
        `${process.env.REACT_APP_BACKEND}/offers/category/${category}?page=${currPage}`
      );
      setOffers(response.data.offers);
      setPages(response.data.pages);
    })();
  }, [category, currPage]);

  return (
    <div className="container">
      <h3 className="my-5">
        Offers by category ({category.split("-").join(" ").toUpperCase()}):
      </h3>
      <div className="row mb-3 justify-content-between">
        {isLoading && <Spinner />}
        {offers.map((offer) => {
          return (
            <div key={offer._id} className="col-lg-4">
              <Card
                title={offer.title}
                category={offer.category}
                period={offer.period}
                price={offer.price}
                image={offer.image}
                readMoreLink={`/offers/${offer.id}`}
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
