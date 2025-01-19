import React, { useRef, useEffect, useState } from "react";
import "./index.css";
import Draw from "ol/interaction/Draw";
import Map from "ol/Map";
import View from "ol/View";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { CoordinateModal } from "../coordinateModal";

import { transform } from "ol/proj"; // Import OpenLayers projection transformation utility
import { PolygonModal } from "../polygonModal";
import { useSelector } from "react-redux";

export const MapViewComponent = () => {
  const mapRef = useRef(null); // Reference for the map container
  const mapInstance = useRef(null); // To store the map instance
  const source = useRef(new VectorSource({ wrapX: false })); // Vector source

  const lineCoordinates = useSelector((state) => state.counter?.lineCoordinates || []);
  const lineIndex = useSelector((state) => state.counter?.lineIndex || 0);
  const position = useSelector((state) => state.counter?.position || 'before');
  const polyCoordinates = useSelector((state) => state.counter?.polyCoordinates || []);
  

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coordinates, setCoordinates] = useState([]); // State to store coordinates
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  

  const [isPolygonModalOpen, setIsPolygonModalOpen] = useState(false);
  const [isImportActive,setIsImportActive]=useState(false)

  useEffect(() => {
    // Initialize the map only once
    if (mapRef.current && !mapInstance.current) {
      const raster = new TileLayer({
        source: new OSM(),
      });

      const vector = new VectorLayer({
        source: source.current,
      });

      mapInstance.current = new Map({
        layers: [raster, vector],
        target: mapRef.current,
        view: new View({
          center: [-11000000, 4600000],
          zoom: 4,
        }),
      });
    }
  }, []);

  useEffect(() => {
    if (isPolygonModalOpen && !isImportActive) {
      addInteraction();
    }
    else if(isImportActive){
      //Generate Table Data--set coordinates in coordinateModal
      
      generateCombinedData();
    
    }
  }, [isPolygonModalOpen,isImportActive]);

  const addInteraction = () => {
    // Add a Draw interaction to the map
    let typeSelect = "LineString"; // Hardcoded to LineString
    if (isPolygonModalOpen) {
      typeSelect = "Polygon";
      // setCoordinates([])
    }
    

    if (mapInstance.current && typeSelect !== "None") {
      const draw = new Draw({
        source: source.current,
        type: typeSelect,
      });

      draw.on("drawstart", (event) => {
        
        const geometry = event.feature.getGeometry();
        geometry.on("change", () => {
          const currentCoordinates = geometry.getCoordinates();

          if (typeSelect === "LineString") {
            // Transform LineString coordinates
            const latLonCoordinates = currentCoordinates.map((coordinate) =>
              transform(coordinate, "EPSG:3857", "EPSG:4326")
            );
            setCoordinates(latLonCoordinates);
          } else if (typeSelect === "Polygon") {
            // Transform Polygon coordinates (outer ring)
            const latLonPolygonCoordinates = currentCoordinates[0].map(
              (coordinate) => transform(coordinate, "EPSG:3857", "EPSG:4326")
            );
            setPolygonCoordinates(latLonPolygonCoordinates);
          }
        });
      });

      mapInstance.current.removeInteraction(draw);

      mapInstance.current.addInteraction(draw);
    }
  };

  const onClickDraw = () => {
    addInteraction();
    setIsModalOpen(true);
  };

  const generateCombinedData=()=>{

    //Inser polygon coordinates in line coordinates
    let indexToInsert=lineIndex
    if(position!=='before'){
      indexToInsert++
    }
if(indexToInsert<0){
  indexToInsert=0
}
  
let tempLineCoords=[...lineCoordinates[0]]
let tempPolyCoords=[...polyCoordinates[0]]
    tempLineCoords.splice(indexToInsert,0,...tempPolyCoords)
  

setCoordinates(tempLineCoords)

  }

  return (
    <div className="main-container">
      <p>Developed by Naga Naveena P</p>

      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: `calc(100vh - 300px)`, // Set a fixed height for the map
        }}
      ></div>
      <button className="button-class" onClick={onClickDraw}>
        Draw
      </button>

      {(isModalOpen || isImportActive )&& (
        <CoordinateModal
          setIsModalOpen={setIsModalOpen}
          coordinates={coordinates}
          setIsPolygonModalOpen={setIsPolygonModalOpen}
          isImportActive={isImportActive}
          setIsImportActive={setIsImportActive}
        />
      )}

      {(isPolygonModalOpen && !isImportActive) && (
        <PolygonModal
          coordinates={polygonCoordinates}
          isPolygonModalOpen={isPolygonModalOpen}
          setIsPolygonModalOpen={setIsPolygonModalOpen}
          setIsImportActive={setIsImportActive}
        />
      )}
    </div>
  );
};
