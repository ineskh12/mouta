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
  Pagination,
  Breadcrumb,
  Form,
  Button,
  Row,
  InputGroup,
  Modal,
  Badge,
} from "@themesberg/react-bootstrap";
import jwt_decode from "jwt-decode";
import moment from "moment-timezone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/bootstrap-react";
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState([]);
  const [filtreddata, setfiltredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://www.skiesbook.com:3000/api/v1/profile/stafftickets/" +
          decoded?.userId
        );
        setData(response);
        setfiltredData(response);
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
  async function filterdata(e) {
    console.log(e);
    const filtredData = data.filter((item) => item.status === e);
    setfiltredData(filtredData);
    if (e === "all") {
      setfiltredData(data);
    }
  }
  async function searchKeyword(word) {
    if (word === "") {
      setfiltredData(data);
    } else {
      const filtredData = data.filter(
        (item) =>
          item?.prop?.graveyard?.name.includes(word) ||
          item._id.includes(word) ||
          (item?.prop?.name + " " + item?.prop?.lastn + " ").includes(word)
      );
      setfiltredData(filtredData);
    }
  }

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
  async function assignToMe(e) {
    e.preventDefault();
    const data = {
      assigne: decoded.userId,
    };
    Swal.fire({
      title: t("Are you sure to support this ticket?"),
      showCancelButton: true,
      confirmButtonText: t("Yes, take charge!"),
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        return await axios
          .post(
            "http://www.skiesbook.com:3000/api/v1/profile/assignticket/" + e,
            data,
            config
          )
          .then((result) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: t("Ticket assigned successfully"),
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
                  <Form.Label>{t('Topic')}</Form.Label>
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
                    placeholder={t("write here...")}
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
              {t('close')}
            </Button>
            <Button type="submit" variant="primary" onClick={handleClose}>
              {t('save')}
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
                placeholder={t('search')}
              />
            </InputGroup>
          </Col>
          <Col xs={8} md={6} lg={3} xl={2}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faFilter} />
              </InputGroup.Text>
              <Form.Select
                aria-label="Default select example"
                onChange={(val) => filterdata(val.target.value)}
                defaultValue="C"
              >
                <option value="all">{t('all')}</option>
                <option value="open">{t('open')}</option>
                <option value="progress">{t('progress')}</option>
                <option value="closed">{t('closed')}</option>
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
                  <th className="border-0">#{t('id')}</th>
                  <th className="border-0">{t('Sender')}</th>
                  <th className="border-0">{t('cemetery')}</th>
                  <th className="border-0">{t('Topic')}</th>
                  <th className="border-0">{t('State')}</th>
                  <th className="border-0">{t("Date of completion")}</th>
                  <th className="border-0">{t('actions')}</th>
                </tr>
              </thead>
              <tbody>
                {filtreddata?.map((dm, index) => (
                  <tr>
                    <td>{index}</td>
                    <td>
                      {dm?.prop.name} {""}
                      {dm?.prop?.lastn}
                    </td>
                    <td>{dm?.prop?.graveyard?.name}</td>

                    <td className="fw-bold">{dm.subject}</td>
                    <td>
                      <>
                        {dm?.status === "open" ? (
                          <Badge bg="primary" className="me-1">
                            {t('open')}
                          </Badge>
                        ) : dm?.status === "progress" ? (
                          <Badge bg="success" className="me-1">
                            {t('progress')}
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
                      <Button
                        className="m-1"
                        onClick={() => history.push("/ticketdetail/" + dm._id)}
                        variant="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon={faEye} />{" "}
                      </Button>

                      {dm?.status === "open" ? (
                        <Button
                          className="m-1"
                          onClick={() => assignToMe(dm?._id)}
                          variant="primary"
                          size="sm"
                        >
                          <FontAwesomeIcon icon={faEdit} />{" "}
                        </Button>
                      ) : (
                        <></>
                      )}

                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
            <Nav>
              <Pagination className="mb-2 mb-lg-0">
                <Pagination.Prev>{t('Previous')}</Pagination.Prev>
                <Pagination.Item active>1</Pagination.Item>
                <Pagination.Item>2</Pagination.Item>
                <Pagination.Item>3</Pagination.Item>
                <Pagination.Item>4</Pagination.Item>
                <Pagination.Item>5</Pagination.Item>
                <Pagination.Next>{t('Next')}</Pagination.Next>
              </Pagination>
            </Nav>
            <small className="fw-bold">
              {t("Display of")} <b>{2}</b> {t('on')} <b>25</b> {t('entries')}
            </small>
          </Card.Footer>
        </Card.Body>
      </Card>
    </>
  );
}
