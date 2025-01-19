import "./index.css";
import { SlOptionsVertical } from "react-icons/sl";
import { HiOutlineUpload } from "react-icons/hi";
import { useState } from "react";
import { getDistance } from "ol/sphere";
import { EditOptionsModal } from "../editModal";
import PropTypes from "prop-types";

export const Table = ({
  coordinates,
  setIsPolygonModalOpen,
  setIsModalOpen,
  isPolygonModalOpen,
  isImportActive
}) => {
  const [isoptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [rowIndex,setRowIndex]=useState(0)

  

  const newData = coordinates.map((eachCoord, index) => {
    let distance = 0;
    if (index < coordinates.length - 1) {
      if (index === 0) {
        distance = "--";
      } else {
        const [lon1, lat1] = eachCoord; // Current coordinate (longitude, latitude)
        const [lon2, lat2] = coordinates[index - 1]; // Previous coordinate (longitude, latitude)

        // Create points for OpenLayers (using the correct projection)
        const point2 = [lon1, lat1];
        const point1 = [lon2, lat2];

        // Calculate distance in meters
        const originalDistance = getDistance(point1, point2);
        distance = originalDistance.toFixed(2);
      }
    }

    return {
      wp: index,
      coordinates: eachCoord,
      distance: distance,
    };
  });

  const handleButtonClick = (event,index) => {
    const { clientX, clientY } = event;
    
    setModalPosition({ top: clientY, left: clientX });
    setRowIndex(index)

    setIsOptionsModalOpen(true);
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th className="th-cb">
              <input type="checkbox" />
            </th>
            <th>WP</th>
            <th>Coordinates</th>
            <th>Distance (m)</th>

            {!isPolygonModalOpen && (
              <th>
                <HiOutlineUpload />
              </th>
            )}
          </tr>
        </thead>
        <tbody>
         

          {newData.map((eachRowData,index) => {
            return (
              <tr key={eachRowData.wp}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{eachRowData.wp}</td>

                <td>{eachRowData.coordinates.join(", ")}</td>
                <td>{eachRowData.distance}</td>

                {!isPolygonModalOpen &&  <td>
                  <button className="click-options" onClick={(event)=>handleButtonClick(event,index)}>
                    <SlOptionsVertical />
                  </button>
                </td> }
               
              </tr>
            );
          })}
        </tbody>
      </table>

      {(isoptionsModalOpen && !isImportActive) && (
        <EditOptionsModal
          modalPosition={modalPosition}
          setIsOptionsModalOpen={setIsOptionsModalOpen}
          setIsModalOpen={setIsModalOpen}
          setIsPolygonModalOpen={setIsPolygonModalOpen}
          rowIndex={rowIndex}
          coordinates={coordinates}
        />
      )}
    </div>
  );
};

Table.propTypes = {
  coordinates: PropTypes.array,
  setIsPolygonModalOpen: PropTypes.func,
  setIsModalOpen: PropTypes.func,
  isPolygonModalOpen: PropTypes.bool,
  isImportActive: PropTypes.bool,
};