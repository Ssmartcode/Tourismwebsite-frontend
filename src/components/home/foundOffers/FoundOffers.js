import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Card from "../../shared/card/Card";
import "./FoundOffers.css";

const modal = document.getElementById("modal");
Modal.setAppElement(modal);

const FoundOffers = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { openModal } = props;
  useEffect(() => {
    setModalIsOpen(openModal);
  }, [openModal]);

  const handleModalClose = () => {
    props.handleModalClose();
  };

  const { offer } = props;
  return (
    <React.Fragment>
      <Modal
        className="modal found-offer__modal"
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        contentLabel="Add description"
        style={{ overlay: { background: "rgba(25,25,25,0.6", zIndex: 1000 } }}
      >
        <div className="close-modal" onClick={handleModalClose}>
          <i className="fas fa-times"></i>
        </div>
        {!offer && (
          <h4 className="text-center fw-bold ">
            We could not find any offer matching your criteria!
          </h4>
        )}
        {offer && (
          <React.Fragment>
            <h4 className="fw-bold mb-4">We found an offer for you!</h4>
            <Card
              title={offer.title}
              category={offer.category}
              begings={offer.begins}
              ends={offer.ends}
              price={offer.price}
              newPrice={offer.newPrice}
              image={offer.image}
              readMoreLink={`/offers/${offer._id}`}
            />
          </React.Fragment>
        )}
      </Modal>
    </React.Fragment>
  );
};

export default FoundOffers;
