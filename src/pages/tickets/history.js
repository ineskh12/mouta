import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { Button, Col, Form, Modal, Row } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import moment from "moment-timezone";
export const Histring = (props) => {
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);
  const [message, setMessage] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));
  let decoded = null;
  if (token !== null) decoded = jwt_decode(token);
  const history = useHistory();
  const { id } = useParams();

  async function addMessage(e) {
    e.preventDefault();
    try {
      const { data: response } = await axios.put(
        "http://skiesbook.com:3000/api/v1/profile/addhistory/" + id,
        {
          message: message,
        }
      );
      setShowDefault(false);
      setMessage("");
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <>
      <Modal show={showDefault} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="h6">Search for existing profile</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => addMessage(e)}>
            <Row>
              <Col md={10} className="mb-3">
                <Form.Group id="name">
                  <Form.Label>Action</Form.Label>

                  <Form.Control
                    as="textarea"
                    name="searchId"
                    required
                    onChange={(e) => setMessage(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <div className="mt-3">
                <Button type="submit" variant="primary">
                  Ajouter
                </Button>
              </div>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Historique d'actions</h4>
              <Button
                variant="primary"
                size="xs"
                className="me-2"
                onClick={(e) => setShowDefault(true)}
              >
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Ajouter un action
              </Button>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead className=" text-primary">
                    <tr>
                      <th>action</th>
                      <th>date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props?.ticket?.history?.map((item) => (
                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-md-2"></div>
                          <div className="col-md-10">
                            <div className="row">
                              <div className="col-md-12">
                                <p className="text-muted">{item?.msg}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="row">
                          <div className="col-md-2"></div>
                          <div className="col-md-10">
                            <div className="row">
                              <div className="col-md-12">
                                <p className="text-muted">{moment(item.timestamp).format("DD/MM/YYYY HH:MM")}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Histring;
