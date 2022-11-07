import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  Container,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Routes } from "../../routes";
import { useTranslation } from "react-i18next";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { t } = useTranslation();
  const sendEmail = async (e) => {
    const reset = { email: email }
    await axios
      .post("http://skiesbook.com:3000/api/v1/users/resetpassword", reset)
      .then((response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: t('check_your_mailbox'),
          showConfirmButton: true,
        });
      })
      .catch((e) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: t('email_address_invalid'),
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }



  return (
    <main>
      <section className="vh-lg-100 mt-4 mt-lg-0 bg-soft d-flex align-items-center">
        <Container>
          <Row className="justify-content-center">
            <p className="text-center">
              <Card.Link
                as={Link}
                to={Routes.Signin.path}
                className="text-gray-700"
              >
                <FontAwesomeIcon icon={faAngleLeft} className="me-2" />
                {t('back_home_page')}
              </Card.Link>
            </p>
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3>{t('forgot_password')}</h3>
                <p className="mb-4">
                  {t('message_forgot_password')}
                </p>

                <div className="mb-4">
                  <Form.Label htmlFor="email">{t('your_email')}</Form.Label>
                  <InputGroup id="email">
                    <Form.Control
                      required
                      autoFocus
                      type="email"
                      placeholder="john@mail.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                </div>
                <Button
                  variant="primary"
                  className="w-100"
                  onClick={(e) => sendEmail(e)}
                >
                  {t('send_reset_link')}
                </Button>

              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
