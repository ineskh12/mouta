import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCaretSquareUp,
} from "@fortawesome/free-solid-svg-icons";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  ButtonGroup,
  Dropdown,
} from "@themesberg/react-bootstrap";
import { useHistory } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";

import axios from "axios";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Alert from "@material-ui/lab/Alert";

const Addadmin = () => {
  const [data, setData] = useState([]);
  const [mapState, setMapState] = useState(false);
  const [marker, setMarker] = React.useState({
    lat: 45.424721,
    lng: -75.695,
  });
  const [code, setCode] = useState("");
  const containerStyle = {
    width: "100%",
    height: "500px",
  };
  const [center, setCenter] = React.useState({
    lat: 45.424721,
    lng: -75.695,
  });
  const token = JSON.parse(localStorage.getItem("token"));
  let decoded = null;
  if (token !== null) decoded = jwt_decode(token);
  const [alert, setAlert] = useState(false);

  const [emplacements, setEmplacements] = useState([]);

  const getPositions = async () => {
    try {
      const { data: response } = await axios.get(
        "http://skiesbook.com:3000/api/v1/graveyard/positions/" + decoded.userId
      );
      setEmplacements(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchData = async () => {
    try {
      const { data: response } = await axios.get(
        "http://skiesbook.com:3000/api/v1/users/getAdmin/" + decoded.userId
      );
      setData(response);
      setCenter({
        lat: parseFloat(response.graveyard.Lat),
        lng: parseFloat(response.graveyard.Lng),
      });
      setMarker({
        lat: parseFloat(response.graveyard.Lat),
        lng: parseFloat(response.graveyard.Lng),
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getPositions();
    console.log(emplacements);
    fetchData();
  }, []);

  function settingCord(e) {
    setMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  }

  async function submit(e) {
    e.preventDefault();
      axios
        .post(
          "http://skiesbook.com:3000/api/v1/graveyard/addposition/" +
            data.graveyard._id,
          {
            lat: marker.lat,
            lng: marker.lng,
            code: code,
          }
        )
        .then((res) => {
          console.log(res);
          if (res) {
            setAlert(true);
            setMarker({
              lat : marker.lat + 0.00001,
              lng : marker.lng + 0.00001
            })
            setCode("");
            getPositions();
          console.log(res);

          } else{
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "pas de position",
            });
          }
        }).catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Position code already exist!",

          });
        });
      setTimeout(() => {
        setAlert(false);
      }, 2500);
  }

  // mouse zoom in on pointer on hover over image
  const [zoom, setZoom] = useState(15);
  const [zoomIn, setZoomIn] = useState(false);
  const [zoomOut, setZoomOut] = useState(false);

  const handleZoomIn = () => {
    setZoomIn(true);
    setZoom(zoom + 1);
    setTimeout(() => {
      setZoomIn(false);
    }, 100);
  };

  return (
    <>
      <Card border="light" className="bg-white shadow-sm mb-4">
        {alert ? (
          <Alert
            style={{ position: "absolute", top: 0, right: 0, width: "200px" }}
            className="mt-3"
            severity="success"
          >
            Emplacement Ajout??
          </Alert>
        ) : (
          <></>
        )}
        <Card.Body>
          <h5 className="my-4">Emplacements</h5>
          <Form onSubmit={submit}>
            <Row>
              <Col md={4} className="mb-3">
                <Form.Group id="Lat">
                  <Form.Label>Latitude</Form.Label>
                  <Form.Control
                    disabled
                    required
                    type="text"
                    placeholder="Latitude"
                    value={marker.lat}
                  />
                </Form.Group>
              </Col>

              <Col md={4} className="mb-3">
                <Form.Group id="Lng">
                  <Form.Label>Longitude</Form.Label>
                  <Form.Control
                    disabled
                    required
                    type="text"
                    placeholder="Longitude"
                    value={marker.lng}
                  />
                </Form.Group>
              </Col>

              <Col md={2} className="mb-3">
                <Form.Group id="code">
                  <Form.Label>Code</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col md={2}>
                <Form.Label>Ajouter</Form.Label>

                <Button variant="primary" className="w-100" type="submit">
                  <FontAwesomeIcon icon={faCaretSquareUp} />
                </Button>
              </Col>
            </Row>
          </Form>
          <div className="bg-white shadow-sm mb-4">
            <Row>
              <Col sm={6} className="mb-3">
                <img
                  // zoom in image on mouse pointer

                  alt="plan"
                  src={"http://skiesbook.com:3000/uploads/" + data?.graveyard?.plan}
                />
              </Col>
              <Col sm={6} className="mb-3">
                <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP}>
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={19}
                    // satellite map with labels
                    mapTypeId="hybrid"
                  >
                    {emplacements.map((empl) => (
                      <Marker
                        key={empl._id}
                        position={{
                          lat: parseFloat(empl.lat),
                          lng: parseFloat(empl.lng),
                        }}
                        icon={{
                          url: "https://cdn-icons-png.flaticon.com/512/149/149059.png",
                          scaledSize: new window.google.maps.Size(30, 30),
                        }}
                      />
                    ))}

                    <Marker
                      position={marker}
                      draggable={true}
                      setZIndex={100}
                      // this marker above all markers
                      zIndex={100}

                      onDragEnd={(e) => {
                        settingCord(e);
                      }}
                    />
                  </GoogleMap>
                </LoadScript>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
export default Addadmin;
