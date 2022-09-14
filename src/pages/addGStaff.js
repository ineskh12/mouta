import React, { useState } from "react";
import { faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  InputGroup, ButtonGroup,Dropdown
} from "@themesberg/react-bootstrap";
import PhoneInput from "react-phone-input-2";

import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

const Addsuperadmin = () => {
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem("token"));
  const [value, setValue] = useState();

  let decoded = null;
  if (token !== null) decoded = jwt_decode(token);
  const [formData, setFormData] = useState({
    name: "",
    lastn: "",
    Datebirth: "",
    email: "",
    sex: "M",
    password: "",
    confirmPassword: "",
    userimage: "avatar.jpg",
    phone: "",
    role: "gstaff",
    address: "",
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  async function Submit() {
    const mydata = new FormData();
    mydata.append("name", formData.name);
    mydata.append("lastn", formData.lastn);
    mydata.append("Datebirth", formData.Datebirth);
    mydata.append("email", formData.email);
    mydata.append("sex", formData.sex);
    mydata.append("password", formData.password);
    mydata.append("userimage", formData.userimage);
    mydata.append("phone", formData.phone);
    mydata.append("role", formData.role);
    mydata.append("grave", decoded.graveyardId);
    mydata.append("gname", decoded.graveyardName);

    await axios
      .post("http://skiesbook.com:3000/api/v1/users/addgstaff", mydata, config)
      .then((response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Employé ajouté avec succès",
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            history.push("/staff");
          }
        });
      })
      .catch((e) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Addresse mail existe déja",
          showConfirmButton: false,
          timer: 1500,
        });
      });
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
        <h5 className="mb-4">Ajout d'un nouvel employé</h5>
        <Form>
          <Row>
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
          <Row hidden className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="birthday">
                <Form.Label>Date de naissance</Form.Label>
                <InputGroup>
                  <Form.Control
                    className="date"
                    name="Datedeath"
                    type="date"
                    onChange={(e) =>
                      setFormData({ ...formData, Datebirth: e.target.value })
                    }
                  />
                </InputGroup>
              </Form.Group>
            </Col>

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
          </Row>
          <Row>
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
          </Row>
          <Row>
           

            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  required
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, userimage: e.target.files[0] })
                  }
                />
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group id="role">
                <Form.Label>Rôle</Form.Label>
                <Form.Select
                  defaultValue="gstaff"
                  name="Role"
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="gstaff">Vendeur </option>
                  <option value="gadmin">Admin</option>
                  <option value="gcompta">Comptabilité</option>

                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-3">
            <Button variant="primary" onClick={(e) => Submit()}>
              Sauvegarder
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
export default Addsuperadmin;
