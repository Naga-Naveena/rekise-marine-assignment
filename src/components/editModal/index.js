import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import "./index.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addLineCoordinate,setLineIndex,setPosition } from "../../store/slice";
import PropTypes from "prop-types";


export const EditOptionsModal = ({
  modalPosition,
  setIsOptionsModalOpen,
  setIsPolygonModalOpen,
  setIsModalOpen,
  rowIndex,
  coordinates
}) => {

  const dispatch=useDispatch()
  const [activeButton, setActiveButton] = useState(0);

  const handleOnClick = (no) => {
    const position=no===0?'before':'after'

//Store line coordinates, rowIndex, position in redux
dispatch(addLineCoordinate(coordinates))
dispatch(setLineIndex(rowIndex))
dispatch(setPosition(position))

    
    setActiveButton(no);
    setIsOptionsModalOpen(false);
    setIsPolygonModalOpen(true);
    setIsModalOpen(false);


  };

  return (
    <div
      className="options-container"
      style={{
        position: "absolute",
        top: modalPosition.top - 30 + "px",
        left: modalPosition.left + "px",
        background: "white",
        border: "1px solid #ccc",

        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        zIndex: 2000,
      }}
    >
      <button
        className={
          activeButton === 0 ? "button-class1-active" : "button-class1"
        }
        onClick={() => handleOnClick(0)}
      >
        <BsArrowBarLeft />
        <span>Insert Polygon before</span>
      </button>
      <button className="button-class1" onClick={() => handleOnClick(1)}>
        <BsArrowBarRight />
        <span>Insert Polygon after</span>
      </button>
    </div>
  );
};

EditOptionsModal.propTypes = {
  modalPosition: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number
  }),
  setIsOptionsModalOpen: PropTypes.func,
  setIsPolygonModalOpen: PropTypes.func,
  setIsModalOpen: PropTypes.func,
  rowIndex: PropTypes.number,
  coordinates: PropTypes.array,
};