import React, { useState } from "react";
import {
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTranslation } from "react-i18next";

const Addadminstaff = () => {

  const { t } = useTranslation();

  const history = useHistory();
  const token = JSON.parse(localStorage.getItem("token"));
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
    role: "sales",
    address: "",
  });
  const [value, setValue] = useState();

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  async function Submit(e) {
    e.preventDefault();
    const mydata = new FormData();
    mydata.append("name", formData.name);
    mydata.append("lastn", formData.lastn);
    mydata.append("Datebirth", formData.Datebirth);
    mydata.append("email", formData.email);
    mydata.append("sex", formData.sex);
    mydata.append("userimage", formData.userimage);
    mydata.append("phone", formData.phone);
    mydata.append("role", formData.role);

    await axios
      .post("http://skiesbook.com:3000/api/v1/users/addastaff", mydata, config)
      .then((response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: t('employee_added_successfully'),
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            history.push("/mystaff");
          }
        });
      })
      .catch((e) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: t('email_address_already_exists'),
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }

  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

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
        <h5 className="mb-4">{t('add_a_new_employee')}</h5>
        <Form onSubmit={(e)=> Submit(e)}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>{t('firstname')}</Form.Label>
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
                <Form.Label>{t('lastname')}</Form.Label>
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
                <Form.Label>{t('date_of_birth')}</Form.Label>
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
                <Form.Label>{t('gender')}</Form.Label>
                <Form.Select
                  defaultValue="M"
                  onChange={(e) =>
                    setFormData({ ...formData, sex: e.target.value })
                  }
                >
                  <option value="0">{t('other')}</option>
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
                <Form.Label>{t('phone')}</Form.Label>
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
                <Form.Label>{t('image')}</Form.Label>
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
                <Form.Label>{t('role')}</Form.Label>
                <Form.Select
                  defaultValue="sales"
                  name="Role"
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                >
                  <option value="sales">{t('seller')}</option>
                  <option value="help">{t('help_desk')}</option>
                  <option disabled value="sadmin">
                    {t('admin')}
                  </option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-3">
            <Button variant="primary" type="submit" >
              {t('save')}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
export default Addadminstaff;
