import React from "react";
//make a google map and place marker on it and get the location
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
//make a google map and place marker on it and get the location

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function Map() {
  const [marker, setMarker] = React.useState({
    lat: -3.745,
    lng: -38.523,
  });

  React.useEffect(() => {
    console.log(marker.lat, marker.lng);
  }, [marker]);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    map.setCenter(center);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMarker({
      lat: null,
      lng: null,
    });
  }, []);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        // satellite map with labels
        mapTypeId="hybrid"
      >
        <Marker
          position={marker}
          draggable={true}
          onDragEnd={(e) => {
            setMarker({
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
            });
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
}
export default Map;
