import React, { useState, useEffect } from "react";
import {
  faEdit,
  faEye,
  faSearch,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Nav,
  Card,
  Table,
  Breadcrumb,
  Form,
  Button,
  Row,
  InputGroup,
  Badge,
  Modal,
} from "@themesberg/react-bootstrap";
import Pagination from "../pagination";
import "../pagination.css";
import moment from "moment-timezone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { faCheck, faComment } from "@fortawesome/fontawesome-free-solid";
import ReactTooltip from "react-tooltip";

export default function AllProfiles() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [filtreddata, setfiltredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://skiesbook.com:3000/api/v1/request"
        );
        setData(response);
        setfiltredData(response);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filtreddata.slice(indexOfFirstPost, indexOfLastPost);
  //console.log(currentPosts);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  async function accept(id) {
    try {
      Swal.fire({
        title: "Are you sure you want to accept this request?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, accept it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data: response } = await axios.post(
            `http://localhost:3000/api/v1/request/accept/${id}`
          );
          console.log(response);
          Swal.fire("Accepted!", "Request has been accepted.", "success");
          window.location.reload();
        }
      });
    } catch (error) {
      console.error(error.message);
    }
  }
  async function reject(id) {}
  async function addNote(e) {
    e.preventDefault();
    try {
      Swal.fire({
        title: "ajouter cette note?",
        showCancelButton: true,
        confirmButtonText: "Oui , ajouter",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          return await axios
            .post("http://localhost:3000/api/v1/request/note/" + id, {
              note: text,
            })
            .then((result) => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Note ajouté avec succès",
                showConfirmButton: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  history.go(0);
                }
              });
            })
            .catch((error) => {
              Swal.showValidationMessage(`Note non ajouté`);
            });
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });
    } catch (error) {
      console.error(error.message);
    }
  }
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [id, setId] = useState("");

  const handleClose = () => setShow(false);

  async function handleShow(id, text) {
    setShow(true);
    setText(text);
    setId(id);
  }

  return (
    <>
      <Modal size="md" show={show} onHide={handleClose}>
        <Form
          onSubmit={(e) => {
            addNote(e);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Nom</Form.Label>
                  <textarea
                    className="form-control"
                    required
                    rows={8}
                    name="text"
                    defaultValue={text}
                    onChange={(e) => setText(e.target.value)}
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
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{
              className: "breadcrumb-dark breadcrumb-transparent",
            }}
          ></Breadcrumb>
          <h4>Partner ship requests </h4>
        </div>
      </div>

      <Card border="light" className="table-wrapper shadow-sm">
        <Card.Body className="pt-0">
          <Table
            style={{ overflow: "auto", display: "block", tableLayout: "auto" }}
            className="table-centered table-nowrap rounded mb-0"
          >
            <thead className="thead-light">
              <tr>
                <th className="border-0">Nom cimetière</th>
                <th className="border-0">Nom et prenom</th>
                <th className="border-0">Pays</th>
                <th className="border-0">Adresse</th>
                <th className="border-0">Télephone</th>
                <th className="border-0">Email</th>
                <th className="border-0">Date de réalisation</th>
                <th className="border-0">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts?.map((dm, index) => (
                <>
                  <ReactTooltip />

                  <tr
                    style={{
                      // if state declined then background color is red else if state is accepted then background color is green else if state is pending then background color is yellow
                      backgroundColor:
                        dm.state === "declined"
                          ? "#ff6a45"
                          : dm.state === "accepted"
                          ? "#59ff59"
                          : "",
                    }}
                  >
                    <td className="fw-bold">{dm?.graveyardName}</td>
                    <td className="fw-bold">
                      {dm?.name} {dm.lastn}
                    </td>

                    <td className="fw-bold">{dm?.country}</td>
                    <td
                      data-tip={
                        dm?.address +
                        ", " +
                        dm?.ville +
                        ", " +
                        dm?.region +
                        ", " +
                        dm?.zip
                      }
                      className="fw-bold"
                    >
                      {(
                        dm?.address +
                        " " +
                        dm?.ville +
                        " " +
                        dm?.region +
                        " " +
                        dm?.zip
                      ).substring(0, 25) + "..."}
                    </td>

                    <td className="fw-bold">{dm?.phone}</td>

                    <td>
                      <span className="fw-bold">{dm?.email}</span>
                    </td>
                    <td>{moment(dm?.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                    <td>
                      {dm.state === "pending" ? (
                        <>
                          <Button
                            className="m-1"
                            onClick={() => accept(dm._id)}
                            size="sm"
                            style={{ backgroundColor: "green" }}
                          >
                            <FontAwesomeIcon icon={faCheck} />{" "}
                          </Button>
                          <Button
                            className="m-1"
                            onClick={(e) => {
                              reject(dm._id);
                            }}
                            style={{ backgroundColor: "red" }}
                            size="sm"
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />{" "}
                          </Button>

                          <Button
                            className="m-1"
                            onClick={(e) => {
                              handleShow(dm?._id, dm?.note);
                            }}
                            size="sm"
                          >
                            <FontAwesomeIcon icon={faComment} />{" "}
                          </Button>
                        </>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </Table>
          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
            <Nav>
              <Pagination
                className="pagination"
                postsPerPage={postsPerPage}
                totalPosts={data.length}
                paginate={paginate}
              />
            </Nav>
          </Card.Footer>
        </Card.Body>
      </Card>
    </>
  );
}
