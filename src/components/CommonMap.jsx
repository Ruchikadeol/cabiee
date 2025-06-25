import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPS_KEY;

const CommonMap = ({
  latitude = 30.7333,
  longitude = 76.7794,
  zoom = 12,
  onLocationSelect = () => {},
  readOnly = false,
}) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);

  // Initialize map once
  useEffect(() => {
    if (!mapRef.current) return;

    mapInstance.current = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude],
      zoom,
    });

    // Add marker
    markerRef.current = new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(mapInstance.current);

    // Add zoom control
    mapInstance.current.addControl(
      new mapboxgl.NavigationControl({ visualizePitch: true }),
      "top-right"
    );

    // Handle click to update location
    if (!readOnly) {
      mapInstance.current.on("click", (e) => {
        const { lng, lat } = e.lngLat;
        markerRef.current.setLngLat([lng, lat]);
        onLocationSelect({
          latitude: lat.toFixed(6),
          longitude: lng.toFixed(6),
        });
      });
    }

    return () => mapInstance.current?.remove();
  }, []);

  // Update marker on lat/lng change
  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLngLat([longitude, latitude]);
    }
  }, [latitude, longitude]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "300px",
        borderRadius: "8px",
        marginTop: "1rem",
      }}
    />
  );
};

export default CommonMap;
