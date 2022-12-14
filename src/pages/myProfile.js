import React, { useState, useEffect, Fragment } from "react";
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
  InputGroup,
  ButtonGroup,
  Dropdown, Button
} from "@themesberg/react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";
import { useTranslation } from "react-i18next";
const Addadmin = () => {

  const { t } = useTranslation();

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
    if (formData.password !== "" && formData.password === formData.confirmPassword) {
      mydata.append("password", formData.password);
    }
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
        text: t("User Updated"),
        icon: "success",
        confirmButtonText: t("OK"),
      }).then((result) => {
        if (result.value) {
          history.push("/");
        }
      });
    } else {
      Swal.fire({
        title: "Error",
        text: t("User not Updated"),
        icon: "error",
        confirmButtonText: t("OK"),
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
              {t('back')}
            </Dropdown.Toggle>
          </ButtonGroup>
        </div>
        <h5 className="mb-4">{t("My profile")}</h5>

        <h5 className="mb-4">{t('General informations')}</h5>
        <Form onSubmit={(e) => Submit(e)}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>{t('firstname')}</Form.Label>
                <Form.Control
                  defaultValue={user?.name}
                  type="text"
                  placeholder={t('Enter your first name')}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>{t('lastname')}</Form.Label>
                <Form.Control
                  defaultValue={user?.lastn}
                  type="text"
                  placeholder={t("And your last name")}
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
                <Form.Label>{t('date_of_birth')}</Form.Label>
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
                <Form.Label>{t('gender')}</Form.Label>
                <Form.Select
                  defaultValue={user?.sex}
                  onChange={(e) =>
                    setFormData({ ...formData, sex: e.target.value })
                  }
                >
                  <option value="o">{t('other')}</option>
                  <option value="F">{t('women')}</option>
                  <option value="M">{t('man')}</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>{t('email')}</Form.Label>
                <Form.Control
                  defaultValue={user?.email}
                  type="email"
                  placeholder="name@company.com"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>{t('phone')}</Form.Label>
                <Form.Control
                  defaultValue={user?.phone}
                  type="number"
                  placeholder="(604) 555-5555"
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">

              <Form.Group id="firstName">
                <Form.Label>{t('password')}</Form.Label>
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
                    placeholder={t('enter_your_password')}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </InputGroup>

              </Form.Group>

            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>{t('confirm_your_password')}</Form.Label>
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
                    placeholder={t('confirm_your_password')}
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
                  <MuiAlert severity="warning">{t('password_does_not_match')}</MuiAlert>
                ) : (
                  <span></span>
                )}
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>{t('image')}</Form.Label>
                <Form.Control
                  type="file"
                  placeholder={t("Choose a picture")}
                  onChange={(e) =>
                    setFormData({ ...formData, userimage: e.target.files[0] })
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-3">
            <Button variant="primary" type="submit">
              {t('save')}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>

  );
};
export default Addadmin;
