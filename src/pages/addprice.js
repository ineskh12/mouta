import React, { useState } from "react";
import {
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  ButtonGroup,
  Dropdown,
} from "@themesberg/react-bootstrap";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import "react-phone-input-2/lib/style.css";

const Addprice = () => {
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem("token"));
  let decoded = null;
  if (token !== null) decoded = jwt_decode(token);
  const [formData, setFormData] = useState({
    tag: "",
    price: "",
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  async function Submit(e) {
    e.preventDefault();
    await axios
      .post("http://skiesbook.com:3000/api/v1/graveyard/prices", formData, config)
      .then((response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Formule ajouté avec succès",
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            history.push("/prices");
          }
        });
      })
      .catch((e) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "error",
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
        <h5 className="mb-4">Ajout d'une nouvelle formule</h5>
        <Form onSubmit={(e)=> Submit(e)}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Tag</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Tag"
                  onChange={(e) =>
                    setFormData({ ...formData, tag: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Valeur</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="price"
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
        

          <div className="mt-3">
            <Button type="submit" variant="primary">
              Sauvegarder
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
export default Addprice;
