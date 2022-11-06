/* eslint-disable import/no-anonymous-default-export */

import React,{useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link, useParams,useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Routes } from "../../routes";
import {
  faArrowLeft,
  faCalendarAlt,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import Swal from "sweetalert2";


export default  () => {
  let { id } = useParams();

  const [passwordType, setPasswordType] = useState("password");
  const [Password, setPassword] = useState("");
     const [confirmPassword, setConfirmPassword] = useState("");
  
  

     const togglePassword = () => {
       if (passwordType === "password") {
         setPasswordType("text");
         return;
       }
       setPasswordType("password");
  };
  const history = useHistory();
  
  const { t } = useTranslation();
  
  async function Submit() {
    const mydata = {
      id: id,
      password:Password
    }
   await axios
     .post("http://skiesbook.com:3000/api/v1/users/resetpasswordrequest", mydata)
     .then((response) => {
       Swal.fire({
         position: "center",
         icon: "success",
         title: t('password_updated_succesfully'),
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
         title: t('error'),
         showConfirmButton: false,
         timer: 1500,
       });
     });
 }


  


  return (
    <main>
      <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
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
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3 className="mb-4">{t('reset_password')}</h3>

                <Form.Group id="firstName" className="mb-4">
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
                      required
                      placeholder={t('enter_your_password')}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    ></Form.Control>
                  </InputGroup>
                </Form.Group>
                <Form.Group id="firstName" className="mb-4">
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
                      required
                      placeholder={t('confirm_your_password')}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                  </InputGroup>
                  {confirmPassword !== Password && confirmPassword !== "" ? (
                    <MuiAlert severity="warning">
                      {t('password_does_not_match')}
                    </MuiAlert>
                  ) : (
                    <span></span>
                  )}
                </Form.Group>
                <Button variant="primary" className="w-100" onClick={()=> Submit()}>
                  {t('reset_password')}
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
