import "./index.css";
import { BiArrowBack } from "react-icons/bi";
import { Table } from "../table";
import { useDispatch } from "react-redux";
import { addPolyCoordinate } from "../../store/slice";
import PropTypes from "prop-types";

export const PolygonModal = ({ coordinates, isPolygonModalOpen ,setIsImportActive, setIsPolygonModalOpen}) => {
  const dispatch=useDispatch()

  const clickImport=()=>{
    dispatch(addPolyCoordinate(coordinates))
    setIsImportActive(true)
    // setIsPolygonModalOpen(false)

  }
  return (
    <div className="modal-overlay-poly">
      <div className="ploygon-modal-container">
        <div className="header">
          <div className="back-container">
            <BiArrowBack />
            <span className="planner-text">Mission Planner</span>
          </div>
          <p className="tool-text">Polygon Tool</p>
        </div>
        <div className="body-container">
          {coordinates.length === 0 && (
            <div className="direction">
              Click on the map to mark points of the polygon's permimeter, then
              press to close and complete the polygon
            </div>
          )}

          {coordinates.length > 0 && (
            <Table
              coordinates={coordinates}
              isPolygonModalOpen={isPolygonModalOpen}
            />
          )}
        </div>
        <div className="footer">
          <button className="discard">Discard</button>
          <button className="import" onClick={clickImport}>Import Points</button>
        </div>
      </div>
    </div>
  );
};

PolygonModal.propTypes = {
  coordinates: PropTypes.array,
  isPolygonModalOpen: PropTypes.bool,
  setIsImportActive: PropTypes.func,
  setIsPolygonModalOpen: PropTypes.func,
};