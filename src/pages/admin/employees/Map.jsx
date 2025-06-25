import React from "react";
import MapboxMap from "../../../components/CommonMap";

const Map = ({ onLocationSelect, latitude, longitude }) => {
  return (
    <div className="mapbox-map">
      <h3 style={{ marginBottom: "0.5rem" }}>Select Employee Location:</h3>
      <MapboxMap
        latitude={latitude}
        longitude={longitude}
        onLocationSelect={onLocationSelect}
      />
    </div>
  );
};

export default React.memo(Map);
