import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
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

import axios from "axios";
import Swal from "sweetalert2";
import USstates from "./UsStates.json";
import jwt_decode from "jwt-decode";
import PhoneInput from "react-phone-input-2";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Addadmin = () => {
  /*
  const center = {
    lat: 45.424721,
    lng: -75.695,
  };
  const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
  });
  const [position, setPosition] = useState(center);
  */
  const token = JSON.parse(localStorage.getItem("token"));
  let decoded = null;
  if (token !== null) decoded = jwt_decode(token);
  const [passwordType, setPasswordType] = useState("password");
  const [place, setPlace] = useState("");
  const [country, setCountry] = useState("Canada");
  const [value, setValue] = useState();
  const [rep, setRep] = useState(false);
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const [center, setCenter] = useState({
    lat: 45.424721,
    lng: -75.695,
  });
  const [region, setRegion] = useState([
    {
      name: "Alberta",
      abbreviation: "AB",
    },
    {
      name: "British Columbia",
      abbreviation: "BC",
    },
    {
      name: "Manitoba",
      abbreviation: "MB",
    },
    {
      name: "New Brunswick",
      abbreviation: "NB",
    },
    {
      name: "Newfoundland and Labrador",
      abbreviation: "NL",
    },
    {
      name: "Northwest Territories",
      abbreviation: "NT",
    },
    {
      name: "Nova Scotia",
      abbreviation: "NS",
    },
    {
      name: "Nunavut",
      abbreviation: "NU",
    },
    {
      name: "Ontario",
      abbreviation: "ON",
    },
    {
      name: "Prince Edward Island",
      abbreviation: "PE",
    },
    {
      name: "Quebec",
      abbreviation: "QC",
    },
    {
      name: "Saskatchewan",
      abbreviation: "SK",
    },
    {
      name: "Yukon Territory",
      abbreviation: "YT",
    },
  ]);

  const history = useHistory();
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  /*
  function DraggableMarker() {
    const [draggable, setDraggable] = useState(true);
    const markerRef = useRef(null);

    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          setPosition(marker.getLatLng());
          fetch(
            `https://eu1.locationiq.com/v1/reverse.php?key=pk.657f1ad662c5b8bc9407219fe04ddc5b&lat=${
              marker.getLatLng().lat
            }&lon=${marker.getLatLng().lng}&format=json`
          )
            .then((response) => response.json())
            .then((responseJson) => {
              setPlace(responseJson.display_name);
            });
        },
      }),
      []
    );

    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        icon={icon}
        position={position}
        ref={markerRef}
      >
        <Popup minWidth={90}>
          <span>{place}</span>
        </Popup>
      </Marker>
    );
  }
*/
  const [data, setData] = useState([]);
  const [mapState, setMapState] = useState(false);
  const [marker, setMarker] = React.useState({
    lat: 45.424721,
    lng: -75.695,
  });

  React.useEffect(() => {
    console.log(marker.lat, marker.lng);
  }, [marker]);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.setCenter(center);
    map.fitBounds(bounds);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMarker({
      lat: null,
      lng: null,
    });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    lastn: "",
    Datebirth: new Date(),
    email: "",
    sex: "M",
    password: "",
    confirmPassword: "",
    userimage: "",
    phone: "",
    role: "admin",
    gname: "",
    address: "",
    logitude: "",
    latitude: "",
    funeral_home: "",
    profileImage: "avatar.jpg",
    sub: "",
    plan: "",
    Lat: "",
    Lng: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://www.skiesbook.com:3000/api/v1/graveyard/prices"
        );
        setData(response);
        console.log(response);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  async function Submit() {
    const mydata = new FormData();
    if (formData.sub === "") {
      formData.sub = data[0]?._id;
    }
    mydata.append("name", formData.name);
    mydata.append("lastn", formData.lastn);
    mydata.append("Datebirth", formData.Datebirth);
    mydata.append("email", formData.email);
    mydata.append("sex", formData.sex);
    mydata.append("password", formData.password);
    mydata.append("userimage", formData.userimage);
    mydata.append("phone", formData.phone);
    mydata.append("role", formData.role);
    mydata.append("gname", formData.gname);
    mydata.append("funeral_home", formData.funeral_home);
    mydata.append("address", formData.address);
    mydata.append("vendor", decoded.userId);
    mydata.append("sub", formData.sub);
    mydata.append("Lat", marker.lat);
    mydata.append("Lng", marker.lng);

    /*     mydata.append("latitude", position.lat);
    mydata.append("logitude", position.lng); */

    Swal.fire({
      title: "Are you sure you want to add this admin?",

      showCancelButton: true,
      confirmButtonText: "Yes, add it!",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        return await axios
          .post("http://skiesbook.com:3000/api/v1/users/addadmin", mydata, config)
          .then((result) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Client ajouté avec succès",
              showConfirmButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                history.push("/AdminClients");
              }
            });
          })
          .catch((error) => {
            Swal.showValidationMessage(`Addresse mail existe déja`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }
  function handleChange(val) {
    setCountry(val);
    if (val === "Canada") {
      setRegion([
        {
          name: "Alberta",
          abbreviation: "AB",
        },
        {
          name: "British Columbia",
          abbreviation: "BC",
        },
        {
          name: "Manitoba",
          abbreviation: "MB",
        },
        {
          name: "New Brunswick",
          abbreviation: "NB",
        },
        {
          name: "Newfoundland and Labrador",
          abbreviation: "NL",
        },
        {
          name: "Northwest Territories",
          abbreviation: "NT",
        },
        {
          name: "Nova Scotia",
          abbreviation: "NS",
        },
        {
          name: "Nunavut",
          abbreviation: "NU",
        },
        {
          name: "Ontario",
          abbreviation: "ON",
        },
        {
          name: "Prince Edward Island",
          abbreviation: "PE",
        },
        {
          name: "Quebec",
          abbreviation: "QC",
        },
        {
          name: "Saskatchewan",
          abbreviation: "SK",
        },
        {
          name: "Yukon Territory",
          abbreviation: "YT",
        },
      ]);
    } else if (val === "Etats Unis") {
      setRegion(USstates);
    }
    setFormData({ ...formData, address: val });
  }
  function settingCord(e) {
    setMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  }
  function toggleMap() {
    setCenter({
      lat: marker.lat,
      lng: marker.lng,
    });
    setMapState(!mapState);
  }
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <div className="btn-toolbar mb-2 mb-md-2">
          <ButtonGroup>
            <Dropdown.Toggle
              onClick={(e) => history.goBack()}
              as={Button}
              variant="primary"
              size="sm"
              className="me-2"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
              Retour
            </Dropdown.Toggle>
          </ButtonGroup>
        </div>
        <Form>
          <h5 className="my-4">Informations du Cimetière </h5>
          <Row>
            <Col sm={6} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Nom du Cimetière</Form.Label>
                <Form.Control
                  required
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, gname: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col sm={6} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Country </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(val) => handleChange(val.target.value)}
                  defaultValue="C"
                >
                  <option val="C">Canada</option>
                  <option val="US">Etats Unis</option>
                </Form.Select>
              </Form.Group>
            </Col>
            {/*    <Col sm={4} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Maison Funéraire</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Donner votre Maison Funéraire"
                  onChange={(e) =>
                    setFormData({ ...formData, funeral_home: e.target.value })
                  }
                />
              </Form.Group>
            </Col> */}
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Label>Région</Form.Label>
              <Form.Group>
                <Form.Select
                  onBlur={(region) =>
                    setFormData({
                      ...formData,
                      address: formData.address.concat(
                        " ," + region.target.value
                      ),
                    })
                  }
                >
                  {region.map((option) => (
                    <option key={option}>{option.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={3} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Ville</Form.Label>
                <Form.Control
                  onBlur={(ville) =>
                    setFormData({
                      ...formData,
                      address: formData.address.concat(
                        " ," + ville.target.value
                      ),
                    })
                  }
                  required
                  type="text"
                />
              </Form.Group>
            </Col>
            <Col sm={2} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  onBlur={(zipCode) =>
                    setFormData({
                      ...formData,
                      address: formData.address.concat(
                        " ," + zipCode.target.value
                      ),
                    })
                  }
                  required
                  type="text"
                />
              </Form.Group>
            </Col>
            <Col sm={6} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Abonnement </Form.Label>

                <Form.Control
                  as="select"
                  name="searchId"
                  vdefaultValue={data[0]?._id}
                  onChange={(e) =>
                    setFormData({ ...formData, sub: e.target.value })
                  }
                >
                  {data.map((option) => (
                    <option value={option?._id}>{option?.tag}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <h5 className="mb-4">Information responsable cimetière </h5>

            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  required
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  required
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, lastn: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Sexe</Form.Label>
                <Form.Select
                  defaultValue="M"
                  onChange={(e) =>
                    setFormData({ ...formData, sex: e.target.value })
                  }
                >
                  <option value="0">Autre</option>
                  <option value="F">Femme</option>
                  <option value="M">Homme</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Téléphone</Form.Label>
                <PhoneInput
                  country={"ca"}
                  onlyCountries={["us", "ca"]}
                  value={value}
                  onChange={(e) => setFormData({ ...formData, phone: e })}
                />
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Plan du cimetière</Form.Label>
                <Form.Control
                  required
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, userimage: e.target.files[0] })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Button hidden = {mapState} onClick = {()=> toggleMap()} >Toggle map</Button>

          <div  hidden = {!mapState} className="bg-white shadow-sm mb-4">
            <Row>
              <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP}>
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={20}
                  // satellite map with labels
                  mapTypeId="hybrid"
                >
                  <Marker
                    position={marker}
                    draggable={true}
                    onDragEnd={(e) => {
                      settingCord(e);
                    }}
                  />
                </GoogleMap>
              </LoadScript>
            </Row>
          </div>
          <div className="mt-3">
            <Button variant="primary" onClick={(e) => Submit()}>
              Sauvegrader
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
export default Addadmin;
