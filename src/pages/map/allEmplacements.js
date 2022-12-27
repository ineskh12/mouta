import React from "react";

import { useTranslation } from "react-i18next";

import { Grid, Paper, Typography } from "@mui/material";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { Form, Button, Card, Row, Col } from "@themesberg/react-bootstrap";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import moment from "moment-timezone";

export default function MyPlace() {
  const { t } = useTranslation();
  const token = JSON.parse(localStorage.getItem("token"));
  let decoded = null;
  if (token !== null) decoded = jwtDecode(token);

  const [data, setData] = React.useState([]);
  const [center, setCenter] = React.useState({});
  const [profiles, setProfiles] = React.useState([]);

  function getGraveyard() {
    axios
      .get("http://skiesbook.com:3000/api/v1/users/" + decoded.userId)
      .then((response) => {
        setCenter({
          lat: parseFloat(response?.data?.graveyard?.Lat),
          lng: parseFloat(response?.data?.graveyard?.Lng),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getPins() {
    axios
      .get("http://skiesbook.com:3000/api/v1/graveyard/positions/" + decoded.userId)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  React.useEffect(() => {
    getPins();
    getGraveyard();
  }, []);

  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  return (
    <>
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="my-4">Emplacements / Profiles</h5>

          <div className="bg-white shadow-sm mb-4">
            <Row>
              <Col sm={4} className="mb-3">
                {profiles?.length > 0
                  ? profiles.map((item) => {
                      return (
                        <Card border="light" className="text-center p-0 mb-4">
                          <div
                            style={{
                              backgroundImage: `url(http://skiesbook.com:3000/uploads/${item?.banner})`,
                            }}
                            className="profile-cover rounded-top"
                          />

                          <Card.Body className="pb-5">
                            <Card.Img
                              src={
                                "http://skiesbook.com:3000/uploads/" + item?.image
                              }
                              alt="photo"
                              className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4"
                            />
                            <Card.Title>
                              {item?.name + " " + item?.lastn}
                            </Card.Title>
                            <Card.Subtitle className="fw-normal">
                              {moment(item?.birth).format("DD/MM/YYYY")}

                              {item?.death
                                ? moment(item?.profileDatedeath).format(
                                    "DD/MM/YYYY"
                                  )
                                : ""}
                            </Card.Subtitle>
                            <Card.Text className="text-gray mb-3 mt-3">
                              <figure>
                                <div class="blockquote-footer">
                                  Crée le :{" "}
                                  <cite title="Source Title">
                                    {moment(item?.createdAt).format(
                                      "DD/MM/YYYY HH:mm"
                                    )}
                                  </cite>
                                </div>
                              </figure>
                            </Card.Text>

                            <Button
                              variant="primary"
                              size="sm"
                              className="text-center"
                              onClick={() => {
                                window.open(
                                  "/prof/" + item?._id,
                                  "_blank",
                                  "noopener,noreferrer"
                                );
                              }}
                            >
                              <FontAwesomeIcon icon={faEye} className="me-1" />
                            </Button>
                          </Card.Body>
                        </Card>
                      );
                    })
                  : "No profiles on this location"}
              </Col>
              <Col sm={8} className="mb-3">
                <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP}>
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={18}
                    // satellite map with labels
                    mapTypeId="hybrid"
                  >
                    {data.map((item) => {
                      return (
                        <Marker
                          key={item._id}
                          icon={{
                            url:
                              item?.profiles?.length > 0
                                ? "http://maps.google.com/mapfiles/ms/icons/blue.png"
                                : "http://maps.google.com/mapfiles/ms/icons/green.png",
                            scaledSize: new window.google.maps.Size(30, 30),
                          }}
                          position={{
                            lat: parseFloat(item.lat),
                            lng: parseFloat(item.lng),
                          }}
                          onClick={() => {
                            setProfiles(item.profiles);
                          }}
                        />
                      );
                    })}
                  </GoogleMap>
                </LoadScript>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
