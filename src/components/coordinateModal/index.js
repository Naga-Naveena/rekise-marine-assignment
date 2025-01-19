import "./index.css";
import PropTypes from "prop-types";
import { GrClose } from "react-icons/gr";
import { Table } from "../table";
import { AiOutlineEnter } from "react-icons/ai";

export const CoordinateModal = ({
  setIsModalOpen,
  coordinates,
  setIsPolygonModalOpen,
  isImportActive,
  setIsImportActive
}) => {
  const closeModal = () => {
    setIsModalOpen(false);
    setIsImportActive(false)
    setIsPolygonModalOpen(false)
  };
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="header-container">
          <span className="header-text">Mission Creation</span>
          <button className="close-class" onClick={closeModal}>
            <GrClose />
          </button>
        </div>
        <div className="body-container">
          {coordinates.length === 0 && (
            <div className="navigation-suggestion">
              <span className="navigation-text">Waypoint Navigation</span>
              <div className="navigation-direction">
                <span>
                  Click on the map to mark points of the route and then press
                </span>
                <AiOutlineEnter />
                <span>complete the route.</span>
              </div>
            </div>
          )}

          {coordinates.length > 0 && (
            <Table
              coordinates={coordinates}
              setIsPolygonModalOpen={setIsPolygonModalOpen}
              setIsModalOpen={setIsModalOpen}
              isImportActive={isImportActive}
            />
          )}
        </div>
        <div className="footer-container">
          <button className="generate-button">Generate Data</button>
        </div>
      </div>
    </div>
  );
};

CoordinateModal.propTypes = {
  setIsModalOpen: PropTypes.func,
  coordinates: PropTypes.array,
  setIsPolygonModalOpen:PropTypes.func,
  isImportActive:PropTypes.bool,
  setIsImportActive:PropTypes.func
};
