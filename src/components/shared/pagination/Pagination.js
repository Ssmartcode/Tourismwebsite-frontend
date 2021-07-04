import React, { useEffect, useState } from "react";
import "./Pagination.css";

const Pagination = (props) => {
  const [currPage, setCurrPage] = useState(1);

  const nextPage = () => {
    if (currPage >= props.pages) return;
    setCurrPage(currPage + 1);
  };
  const prevPage = () => {
    if (currPage <= 1) return;
    setCurrPage(currPage - 1);
  };

  useEffect(() => {
    props.onPageChange(currPage);
  }, [currPage]);

  if (props.pages > 1)
    return (
      <ul className="pagination justify-content-center py-5">
        <li className="page-item" onClick={prevPage}>
          <span
            className={`page-link ${currPage === 1 && "disabled"}`}
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </span>
        </li>
        {currPage !== 1 && (
          <li className="page-item">
            <span className="page-link" onClick={() => setCurrPage(1)}>
              1
            </span>
          </li>
        )}
        <li className="page-item">
          <span className="page-link active">{currPage}</span>
        </li>
        {currPage !== props.pages && (
          <li className="page-item" onClick={() => setCurrPage(props.pages)}>
            <span className="page-link">{props.pages}</span>
          </li>
        )}
        <li className="page-item" onClick={nextPage}>
          <span
            className={`page-link ${currPage === props.pages && "disabled"}`}
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </span>
        </li>
      </ul>
    );
  else return null;
};

export default Pagination;
