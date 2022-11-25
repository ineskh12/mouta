import React, { useState, useEffect } from "react";
import {
  faEdit,
  faEllipsisH,
  faEye,
  faSearch,
  faPlus,
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
  ButtonGroup,
  InputGroup,
  Dropdown,
  Modal,
  Badge,
} from "@themesberg/react-bootstrap";
import jwt_decode from "jwt-decode";
import moment from "moment-timezone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./pagination.css";
import Pagination from "./pagination";


import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/bootstrap-react";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { Paper, TableContainer } from "@mui/material";

const token = JSON.parse(localStorage.getItem("token"));
let decoded = null;
if (token !== null) decoded = jwt_decode(token);

export default function AllProfiles() {
  const { t } = useTranslation();

  const history = useHistory();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://www.skiesbook.com:3000/api/v1/profile/mytickets/" +
          decoded?.userId
        );
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);
  const [formData, setFormData] = useState({
    sender: decoded.userId,
    subject: "",
    message: "",
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  async function submit(e) {
    e.preventDefault();
    Swal.fire({
      title: t("Are you sure you want to add this ticket?"),

      showCancelButton: true,
      confirmButtonText: t("Yes, add it!"),
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        return await axios
          .post(
            "http://www.skiesbook.com:3000/api/v1/profile/addticket/" +
            decoded.userId,
            formData,
            config
          )
          .then((result) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: t("Ticket added successfully"),
              showConfirmButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                history.go(0);
              }
            });
          })
          .catch((error) => {
            Swal.showValidationMessage(`${t('error')}: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  //console.log(currentPosts);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Form
          onSubmit={(e) => {
            submit(e);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>{t("Create a new ticket")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={8} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>{t("Topic")}</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder={t("Enter Subject")}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="mb-3">
                <Form.Group id="lastName">
                  <Form.Label>{t("Object")}</Form.Label>
                  <textarea
                    className="form-control"
                    required
                    rows={8}
                    type="textarea"
                    placeholder={t("Topic")}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  ></textarea>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              {t("close")}
            </Button>
            <Button type="submit" variant="primary" onClick={handleClose}>
              {t("save")}
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
        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Dropdown.Toggle
              onClick={(e) => handleShow()}
              as={Button}
              variant="primary"
              size="sm"
              className="me-2"
            >
              <FontAwesomeIcon icon={faPlus} className="me-2" />
              {t("New ticket")}
            </Dropdown.Toggle>
          </ButtonGroup>
        </div>
      </div>
      <div className="d-block mb-4 mb-md-2">
        <Col xs={8} md={6} lg={3} xl={4}>
          <InputGroup>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <Form.Control type="text" placeholder={t("search")} />
          </InputGroup>
        </Col>
      </div>
      <Card border="light" className="table-wrapper shadow-sm">
        <Card.Body className="p-0">
          <TableContainer component={Paper}>
            <Table className="table-centered table-nowrap rounded mb-0">
              <thead className="thead-light">
                <tr>
                  <th className="border-0">#</th>
                  <th className="border-0">{t("Topic")}</th>
                  <th className="border-0">{t('Status')} </th>
                  <th className="border-0">{t("Date of completion")}</th>
                  <th className="border-0">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((dm, index) => (
                  <tr>
                    <td className="fw-bold">{index}</td>
                    <td className="fw-bold">{dm.subject}</td>
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
                            {t('close')}
                          </Badge>
                        ) : (
                          t("none")
                        )}
                      </>
                    </td>
                    <td>{moment(dm.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                    <td>
                      {" "}
                      <Button
                        onClick={() => history.push("/ticketdetail/" + dm._id)}
                        color="primary"
                        size="sm"
                        className="m-1"
                      >
                        <FontAwesomeIcon icon={faEye} />
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
