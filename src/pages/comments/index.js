import React, { useState, useEffect } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {
  Card,
  Toast,
  Image,
  Button,
  ButtonGroup,
  Dropdown,
  Row,
  Modal,
  Col,
  Form,
} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment-timezone";
import { Avatar } from "@material-ui/core";

import { faCheck } from "@fortawesome/fontawesome-free-solid";
import ModalImage from "react-modal-image";

export default function BasicTabs() {
  const [data, setData] = useState([]);

  const token = JSON.parse(localStorage.getItem("token"));
  let decoded = null;
  if (token !== null) decoded = jwt_decode(token);
  const fetchData = async () => {
    try {
      const { data: response } = await axios.get(
        "http://skiesbook.com:3000/api/v1/users/comments/" + decoded?.userId
      );
      setData(response);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const accept = async (action, id, profile) => {
    try {
      Swal.fire({
        title: "Changer l'état du commentaire ?",
        showCancelButton: true,
        confirmButtonText: "Oui !",
        showLoaderOnConfirm: true,
  
        preConfirm: async () => {
          return await axios
            .post("http://skiesbook.com:3000/api/v1/profile/changecomstatus/" + profile,  {
              action: action,
              id: id,
            })
            .then((result) => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "état du comentaire changé avec succés",
                showConfirmButton: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  history.go(0);
                }
              });
            })
            .catch((error) => {
              Swal.showValidationMessage(`erreur: ${error}`);
            });
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });
    } catch (error) {
      console.error(error.message);
    }


    
  };

  const history = useHistory();

  return (
    <>
      {data?.profiles?.map((profile) => (
        <Card border="light" className="bg-white shadow-sm mb-4">
          <Card.Body>
            <div className="btn-toolbar mb-2 mb-md-2">
              <ButtonGroup>
                <Dropdown.Toggle
                  disabled
                  as={Button}
                  variant="primary"
                  size="sm"
                  className="me-2"
                >
                  Profil de {profile?.profileName} {profile?.profileLastName}
                </Dropdown.Toggle>
              </ButtonGroup>
            </div>
            <h5 className="mb-4">Commentaires reçus</h5>
            <Row>
              {profile?.comments?.map(
                (item) =>
                  item?.state === 0 && (
                    <Col xs={6} md={4}>
                      <Toast show={true}>
                        <Toast.Header
                          className="text-primary"
                          closeButton={false}
                        >
                          <Avatar alt={"ss"} className="mx-auto" />
                          <div className="row">
                            <strong className="me-auto">{item?.sender}</strong>
                            <strong className="me-auto">{item?.email}</strong>
                          </div>
                          <Button
                            variant="primary"
                            size="xs"
                            className="me-2"
                            onClick={(e) =>
                              accept("accept", item?._id, profile._id)
                            }
                          >
                            <FontAwesomeIcon icon={faCheck} className="me-2" />
                            Accepter
                          </Button>

                          <Button
                            variant="danger"
                            size="xs"
                            className="me-2"
                            onClick={(e) => accept("refuse", item?._id,profile._id)}
                          >
                            <FontAwesomeIcon icon={faCheck} className="me-2" />
                            Rejeter
                          </Button>
                        </Toast.Header>
                        <Toast.Body>
                          <div className="text">
                          {(item?.images).length > 0 && (
                                            <div className="row g-0">
                                              {item?.images?.map((img) => (
                                                <div className="col mb-3">
                                                <a>
                                                    <ModalImage
                                                      hideDownload
                                                      small={
                                                        "http://skiesbook.com:3000/uploads/" +
                                                        img
                                                      }
                                                      large={
                                                        "http://skiesbook.com:3000/uploads/" +
                                                        img
                                                      }
                                                      className="img-fluid rounded"
                                                      alt=""
                                                    />
                                                  </a>
                                                </div>
                                              ))}
                                            </div>
                                          )}
                            <b> {item?.message}</b>
                            <p className="mb-0">
                              {moment(item?.timestamp).format("DD-MM-YYYY")}
                            </p>
                          </div>
                        </Toast.Body>
                      </Toast>
                    </Col>
                  )
              )}
            </Row>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}
