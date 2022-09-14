import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCalendarAlt,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  InputGroup,
  ButtonGroup,
  Dropdown,
} from "@themesberg/react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";

import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";
import PhoneInput from "react-phone-input-2";

const Addadmin = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [place, setPlace] = useState("");
  const [user, setUser] = useState({});
  let { id } = useParams();
  const history = useHistory();
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const [value, setValue] = useState();

  const token = JSON.parse(localStorage.getItem("token"));
  let decoded = null;
  if (token !== null) decoded = jwt_decode(token);

  async function getGrave() {
    try {
      const { data: response } = await axios.get(
        "http://skiesbook.com:3000/api/v1/users/" + id
      );
      setUser(response);
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    getGrave();
  }, []);

  const [formData, setFormData] = useState({
    name: user?.name,
    lastn: user?.lastn,
    Datebirth: user?.Datebirth,
    email: user?.email,
    sex: user?.sex,
    password: "",
    confirmPassword: "",
    userimage: user?.userimage,
    phone: user?.phone,
  });
  const [birthday, setBirthday] = useState("");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  async function Submit(e) {
    e.preventDefault();
    const mydata = new FormData();
    mydata.append("name", e.target[0].value);
    mydata.append("lastn", e.target[1].value);
    mydata.append("Datebirth", e.target[2].value);
    mydata.append("email", e.target[4].value);
    mydata.append("sex", e.target[3].value);
    mydata.append("phone", e.target[5].value);

    mydata.append("userimage", formData.userimage);

    /*     mydata.append("latitude", position.lat);
    mydata.append("logitude", position.lng); */
    const { data } = await axios.put(
      "http://skiesbook.com:3000/api/v1/users/" + id,
      mydata,
      config
    );
    console.log(data);
    if (data._id) {
      Swal.fire({
        title: "Success",
        text: "User Updated",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.value) {
          history.push("/admin/superadmins");
        }
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "User not Updated",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
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
        <h5 className="mb-4">Update du super admin {user?.name}</h5>

        <h5 className="mb-4">Informations générales</h5>
        <Form onSubmit={(e) => Submit(e)}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  defaultValue={user?.name}
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
                  defaultValue={user?.lastn}
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
              <Form.Group id="birthday">
                <Form.Label>Date de naissance</Form.Label>
                <Col md={6} className="mb-3">
                  <Form.Group id="birthday">
                    <InputGroup>
                      <Form.Control
                        className="date"
                        name="Datedeath"
                        type="date"
                        defaultValue={user?.Datebirth}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            Datebirth: e.target.value,
                          })
                        }
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Sexe</Form.Label>
                <Form.Select
                  defaultValue={user?.sex}
                  onChange={(e) =>
                    setFormData({ ...formData, sex: e.target.value })
                  }
                >
                  <option value="o">Autre</option>
                  <option value="F">Femme</option>
                  <option value="M">Homme</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  defaultValue={user?.email}
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
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  disabled
                  type="password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label> Confirmer votre mot de passe</Form.Label>
                <InputGroup>
                  <Button
                    size="sm"
                    style={{
                      borderColor: "transparent",
                      marginRight: 5,
                      backgroundColor: "#d7dce4",
                    }}
                    onClick={() => togglePassword()}
                  >
                    {passwordType === "password" ? (
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEye} />
                      </InputGroup.Text>
                    ) : (
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEyeSlash} />
                      </InputGroup.Text>
                    )}
                  </Button>
                  <Form.Control
                    type={passwordType}
                    disabled
                    placeholder="Confirmer votre mot de passe"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  ></Form.Control>
                </InputGroup>
                {formData.confirmPassword !== formData.password &&
                formData.confirmPassword !== "" ? (
                  <MuiAlert severity="warning">Mot de passe ne correspond pas</MuiAlert>
                ) : (
                  <span></span>
                )}
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Entrer votre mot de pass"
                  onChange={(e) =>
                    setFormData({ ...formData, userimage: e.target.files[0] })
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-3">
            <Button variant="primary" type="submit">
              Sauvegarder
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
export default Addadmin;
