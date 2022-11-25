import React, { useState, useEffect } from "react";
import { faEdit, faEye, faSearch } from "@fortawesome/free-solid-svg-icons";
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
  Modal,
  Badge,
} from "@themesberg/react-bootstrap";
import Pagination from "./pagination";
import "./pagination.css";
import jwt_decode from "jwt-decode";
import moment from "moment-timezone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { faFilter } from "@fortawesome/fontawesome-free-solid";
import { useTranslation } from "react-i18next";
import { Paper, TableContainer } from "@mui/material";

const token = JSON.parse(localStorage.getItem("token"));
let decoded = null;
if (token !== null) decoded = jwt_decode(token);

export default function AllProfiles() {
  const { t } = useTranslation();

  const history = useHistory();
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [filtreddata, setfiltredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [ticketId, setTicketId] = useState();

  async function searchKeyword(word) {
    if (word === "") {
      setfiltredData(data);
    } else {
      const filtredData = data.filter(
        (item) =>
          item?.prop?.graveyard?.name.includes(word) ||
          item._id.includes(word) ||
          (item?.prop?.name + " " + item?.prop?.lastn + " ").includes(word) ||
          (item?.prop?.graveyard?.name).includes(word) ||
          (item?.assigne?.name + " " + item?.assigne?.lastn + " ").includes(
            word
          )
      );
      setfiltredData(filtredData);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://skiesbook.com:3000/api/v1/profile/alltickets"
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
  const [formData, setFormData] = useState({
    sender: decoded.userId,
    subject: "",
    message: "",
  });

  const [formData2, setFormData2] = useState({
    status: "",
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  async function openModal(id) {
    setTicketId(id);
    setShowDefault(true);
  }
  const [showDefault, setShowDefault] = useState(false);
  const [showDefault1, setShowDefault1] = useState(true);

  async function changerEtat(e) {
    e.preventDefault();
    setShowDefault1(false);
    setShowDefault(false);
    setShow(false);

    Swal.fire({
      title: t("Are you sure you want to change the status of this ticket?"),

      showCancelButton: true,
      confirmButtonText: t("yes"),
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        return await axios
          .put(
            "http://skiesbook.com:3000/api/v1/profile/changestatus/" + ticketId,
            formData2,
            config
          )
          .then((result) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: t("Updated ticket"),
              showConfirmButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                history.go(0);
              }
            });
          })
          .catch((error) => {
            Swal.showValidationMessage(`${t("server error")}: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }

  const handleClose = () => setShowDefault(false);
  async function filterdata(e) {
    const filtredData = data.filter((item) => item.status === e);
    setfiltredData(filtredData);
    if (e === "all") {
      setfiltredData(data);
    }
  }

  return (
    <>
      <Modal
        className="d-flex justify-content-center"
        show={showDefault}
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title className="h6">{t("ticket status")}</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>

        <Form onSubmit={(e) => changerEtat(e)}>
          <Modal.Body>
            <div className="flex justify-content-center">
              <h4>{t("Change ticket status")}</h4>
              <br></br>
              {/*select option*/}
              <Form.Control
                as="select"
                required
                onChange={(e) =>
                  setFormData2({ ...formData2, status: e.target.value })
                }
              >
                <option value="open">{t("open")}</option>
                <option value="progress">{t("progress")}</option>
                <option value="closed">{t("closed")}</option>
              </Form.Control>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              {t("Approve")}
            </Button>
            <Button
              variant="secondary"
              className="text-gray ms-auto"
              onClick={handleClose}
            >
              {t("close")}
            </Button>
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
          <h4>{t("Your support tickets")}</h4>
        </div>
      </div>
      <div className="d-block mb-4 mb-md-2">
        <Row>
          <Col xs={8} md={6} lg={3} xl={4}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control
                onChange={(e) => searchKeyword(e.target.value)}
                type="text"
                placeholder={t("search")}
              />
            </InputGroup>
          </Col>
          <Col xs={8} md={6} lg={3} xl={2}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faFilter} />
              </InputGroup.Text>
              <Form.Select
                aria-label={t("Default select example")}
                onChange={(val) => filterdata(val.target.value)}
                defaultValue="C"
              >
                <option value="all">{t("all")}</option>
                <option value="open">{t("open")}</option>
                <option value="progress">{t("progress")}</option>
                <option value="closed">{t("closed")}</option>
              </Form.Select>
            </InputGroup>
          </Col>
        </Row>
      </div>
      <Card border="light" className="table-wrapper shadow-sm">
        <Card.Body className="p-0">
          <TableContainer component={Paper}>
            <Table className="table-centered table-nowrap rounded mb-0">
              <thead className="thead-light">
                <tr>
                  <th className="border-0">#</th>
                  <th className="border-0">{t("cemetery")}</th>
                  <th className="border-0">{t("Topic")}</th>
                  <th className="border-0">{t("Sender")}</th>
                  <th className="border-0">{t("assignment")}</th>
                  <th className="border-0">{t("Status")}</th>
                  <th className="border-0">{t("Date of completion")}</th>
                  <th className="border-0">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts?.map((dm, index) => (
                  <tr>
                    <td>{index}</td>
                    <td className="fw-bold">{dm?.prop?.graveyard?.name}</td>

                    <td className="fw-bold">{dm?.subject}</td>
                    <td className="fw-bold">
                      {dm?.prop?.name} {dm?.prop?.lastn}
                    </td>

                    <td className="fw-bold">
                      {dm?.assigne?.name} {dm?.assigne?.lastn}
                    </td>

                    <td>
                      <>
                        {dm?.status === "open" ? (
                          <Badge bg="primary" className="me-1">
                            {t("open")}
                          </Badge>
                        ) : dm?.status === "progress" ? (
                          <Badge bg="success" className="me-1">
                            {t("progress")}
                          </Badge>
                        ) : dm?.status === "closed" ? (
                          <Badge bg="danger" className="me-1">
                            {t("closed")}
                          </Badge>
                        ) : (
                          t("none")
                        )}
                      </>
                    </td>
                    <td>{moment(dm?.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                    <td>
                      <Button
                        className="m-1"
                        onClick={() => history.push("/ticketdetail/" + dm._id)}
                        variant="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon={faEye} />{" "}
                      </Button>
                      <Button
                        className="m-1"
                        onClick={() => openModal(dm._id)}
                        variant="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon={faEdit} />{" "}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
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
