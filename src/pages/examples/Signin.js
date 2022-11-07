import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEnvelope,
  faUnlockAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  FormCheck,
  Container,
  InputGroup,
  Modal,
} from "@themesberg/react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import Swal from "sweetalert2";
import logo_colored from "../../assets/img/logo_colored.png";
import PhoneInput from "react-phone-input-2";
import { useTranslation } from "react-i18next";

export default function Signin() {
  const history = useHistory();
  const [myForm, setMyForm] = useState({
    email: "",
    password: "",
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const [formData, setFormData] = useState({
    name: "",
    lastn: "",
    email: "",
    address: "",
    phone: "",
    country: "Canada",
    graveyardName: "",
    ville: "",
    region: "",
    zip: "",
  });
  const [show, setShow] = useState(false);
  const { t } = useTranslation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  async function submit() {
    await axios
      .post("http://skiesbook.com:3000/api/v1/auth/login", myForm, config)
      .then((response) => {
        localStorage.setItem("email", JSON.stringify(response?.data.email));
        localStorage.setItem("token", JSON.stringify(response?.data.idToken));
        if (response?.status === 200) {
          if (response?.data.role === "superadmin") {
            history.go("/AdminClients");
          } else if (response?.data.role === "admin") {
            history.go("/adminclients");
          } else if (response?.data.role === "client") {
            history.go("/myProfiles");
          } else if (response?.data.role === "gstaff") {
            history.go("/Staffclient");
          } else if (response?.data.role === "gadmin") {
            history.go("/Staffclient");
          } else if (response?.data.role === "gcompta") {
            history.go("/adminclients");
          } else if (response?.data.role === "sales") {
            history.go("/myProfiles");
          } else if (response?.data.role === "help") {
            history.go("/myProfiles");
          } else if (response?.data.role === "sadmin") {
            history.go("/myProfiles");
          }
        } else {
          Swal.fire({
            title: t("wrong_credentials"),
            text: t("try_enter_valid_mail_or_password"),
            icon: "error",
            confirmButtonText: t("cool_i'll_try_again"),
          });
        }
      })
      .catch((e) => {
        Swal.fire({
          title: t("wrong_credentials"),
          text: t("try_enter_valid_mail_or_password"),
          icon: "error",
          confirmButtonText: t("cool_i'll_try_again"),
        });
      });
  }

  function submitB2b(e) {
    e.preventDefault();

    if (formData.phone === "14747474747" || formData.phone === "") {
      Swal.fire({
        title: "Phone number is required",
        text: "Try to enter a valid phone number",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else {
      axios
        .post("http://localhost:3000/api/v1/request", formData)
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              title: "Request sent",
              text: "We will contact you soon",
              icon: "success",
              confirmButtonText: "Ok",
            });
            handleClose();
          }
        });
    }
  }
  return (
    <main>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Form
          onSubmit={(e) => {
            submitB2b(e);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Devenir un partenaire</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <h5 className="mb-2">Information responsable cimetière </h5>
              <Col md={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="profileName"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="lastName">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="profileLastName"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        lastn: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>adresse Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    name="profileName"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="lastName">
                  <Form.Label>Telephone</Form.Label>
                  <PhoneInput
                    required
                    country={"ca"}
                    onlyCountries={["us", "ca"]}
                    onChange={(e) => setFormData({ ...formData, phone: e })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <h5 className="mb-2">Information cimetière </h5>

            <Row className="align-items-center">
              <Col md={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Nom du cimetière</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="cim name"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        graveyardName: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="gender">
                  <Form.Label>Pays</Form.Label>
                  <Form.Select
                    defaultValue="Canada"
                    name="Canada"
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                  >
                    <option value="Canada">Canada</option>
                    <option value="Etat-unis">Etats-unis</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="Emplacement du funérailles">
                  <Form.Label>Adresse</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Entrer les cordonnées"
                    name="cords"
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group id="funérailles">
                  <Form.Label>Ville</Form.Label>
                  <Form.Control
                    required
                    name="hometown"
                    type="text"
                    onChange={(e) =>
                      setFormData({ ...formData, ville: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="emal">
                  <Form.Label>Region</Form.Label>
                  <Form.Control
                    required
                    name="hometown"
                    type="text"
                    onChange={(e) =>
                      setFormData({ ...formData, region: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="ville">
                  <Form.Label>ZIP / Postcode</Form.Label>
                  <Form.Control
                    required
                    name="hometown"
                    type="text"
                    onChange={(e) =>
                      setFormData({ ...formData, zip: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Fermer
              </Button>
              <Button type="submit" variant="primary">
                Sauvegarder
              </Button>
            </Modal.Footer>
          </Modal.Footer>
        </Form>
      </Modal>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link
              as={Link}
              to={Routes.DashboardOverview.path}
              className="text-gray-700"
            >
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" />
              {t("back_home_page")}
            </Card.Link>
          </p>

          <Col
            xs={12}
            className="d-flex align-items-center justify-content-center"
          >
            <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className=" object-center text-center text-md-center mb-4 mt-md-0 pt-2"
              >
                <img alt="logo" src={logo_colored} width="20%" />
              </div>
              <div className="flex items-center justify-center pb-3">
                <h3 className="mb-0">{t("sign_in_skiesbook")}</h3>
              </div>

              <Form.Group id="email" className="mb-4">
                <Form.Label>{t("your_email")}</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </InputGroup.Text>
                  <Form.Control
                    onChange={(e) =>
                      setMyForm({ ...myForm, email: e.target.value })
                    }
                    autoFocus
                    required
                    type="email"
                    placeholder="example@email.com"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <Form.Group id="password" className="mb-4">
                  <Form.Label>{t("your_password")}</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faUnlockAlt} />
                    </InputGroup.Text>
                    <Form.Control
                      onChange={(e) =>
                        setMyForm({ ...myForm, password: e.target.value })
                      }
                      required
                      type="password"
                      placeholder={t("password")}
                    />
                  </InputGroup>
                </Form.Group>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <Form.Check style={{ marginLeft: "20px" }} type="checkbox">
                    <FormCheck.Input id="defaultCheck5" className="me-2" />
                    <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">
                      {t("remember_me")}
                    </FormCheck.Label>
                  </Form.Check>
                  <Card.Link
                    className="small text-end"
                    onClick={() => history.push("/forgot-password")}
                  >
                    {t("forgot_password")}
                  </Card.Link>
                </div>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="w-100"
                onClick={() => submit()}
              >
                {t("login")}
              </Button>
              <div className="mt-2 mb-2">
                <a style={{ color: "#0E63C0" }} onClick={() => handleShow()}>
                  Devenir un partenaire
                </a>
              </div>
              {/*}
                <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">or login with</span>
                </div>
                <div className="d-flex justify-content-center my-4">
                  <Button
                    variant="outline-light"
                    className="btn-icon-only btn-pill text-facebook me-2"
                  >
                    <FontAwesomeIcon icon={faFacebookF} />
                  </Button>
                  <Button
                    variant="outline-light"
                    className="btn-icon-only btn-pill text-twitter me-2"
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </Button>
                  <Button
                    variant="outline-light"
                    className="btn-icon-only btn-pil text-dark"
                  >
                    <FontAwesomeIcon icon={faGithub} />
                  </Button>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Not registered?
                    <Card.Link
                      as={Link}
                      to={Routes.Signup.path}
                      className="fw-bold"
                    >
                      {` Create account `}
                    </Card.Link>
                  </span>
                </div>
                */}
            </div>
          </Col>
        </Container>
      </section>
    </main>
  );
}
