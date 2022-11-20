/* eslint-disable import/no-anonymous-default-export */

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
import { Link, useParams, useHistory } from "react-router-dom";

import { Routes } from "../../routes";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal } from "@themesberg/react-bootstrap";
import { useTranslation } from "react-i18next";
export default () => {
  let { id } = useParams();
  let { timeStamp } = useParams();
  let {t} = useTranslation();
  const [open, setOpen] = useState(false);

  const [passwordType, setPasswordType] = useState("password");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkBox, setCheckBox] = useState(false);

  //   if (timeStamp > 24 ){
  //     Swal.fire({
  //         position: "center",
  //         icon: "error",
  //         title: "Link Expired",
  //         showConfirmButton: true,
  //         }).then((result) => {
  //         if (result.isConfirmed) {
  //             history.push("/signin");
  //         }
  //         });
  //     }
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const history = useHistory();

  async function Submit() {
    const mydata = {
      id: id,
      password: Password,
    };
    await axios
      .post(
        "http://www.skiesbook.com:3000/api/v1/users/resetpasswordrequest",
        mydata
      )
      .then((response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Mot de passe enregistré avec succès",
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            history.push("/signin");
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
    <main>
      <Modal size="lg" as={Modal.Dialog} show={open}>
        <Modal.Header>
          <Modal.Title className="h6">Terms and conditions</Modal.Title>
          <Button
            variant="close"
            aria-label="Close"
            onClick={() => setOpen(false)}
          />
        </Modal.Header>
        <Modal.Body>
          <iframe
            title="terms"
            src="http://www.skiesbook.com:3000/uploads/terms.pdf"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </Modal.Body>
      </Modal>
      <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center">
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3 className="mb-4">{t('Please enter your password')} </h3>

                <Form.Group id="firstName" className="mb-4">
                  <Form.Label>{t('password')}</Form.Label>
                  <InputGroup>
                   
                    <Form.Control
                      type={passwordType}
                      required
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    ></Form.Control>
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
                  </InputGroup>
                </Form.Group>
                <Form.Group id="firstName" className="mb-4">
                  <Form.Label> {t('confirm_your_password')}</Form.Label>
                  <InputGroup>
                    
                    <Form.Control
                      type={passwordType}
                      required
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
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
                  </InputGroup>
                  {confirmPassword !== Password && confirmPassword !== "" ? (
                    <MuiAlert severity="warning">
                      {t('password_does_not_match')}
                    </MuiAlert>
                  ) : (
                    <span></span>
                  )}

                  <Form.Check
                    style={{
                      marginTop: "20px",
                      marginLeft: "20px",
                      backgroundColor: "transparent",
                      color: "black",
                      borderColor: "transparent",
                    }}
                    type="checkbox"
                  >
                    <Form.Check.Input
                      onChange={(e) => setCheckBox(e.target.checked)}
                      type="checkbox"
                    />
                    <Form.Check.Label
                      style={{ marginLeft: "10px" , cursor: "pointer" , textDecoration: "underline" }}
                      onClick={() => setOpen(true)}
                    >
                     {t("I accept the terms and conditions")}
                    </Form.Check.Label>
                  </Form.Check>
                </Form.Group>

                <Button
                  variant="primary"
                  className="w-100"
                  disabled={
                    Password !== confirmPassword ||
                    checkBox === false ||
                    Password === ""
                  }
                  onClick={() => Submit()}
                >
                  {t('confirm_my_password')}
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
