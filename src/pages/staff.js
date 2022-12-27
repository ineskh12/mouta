import React, { useState, useEffect } from "react";
import {
  faEdit,
  faEllipsisH,
  faTrashAlt,
  faCheck,
  faCog,
  faSearch,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Nav,
  Card,
  Table,
  Row,
  Form,
  Button,
  Image,
  ButtonGroup,
  InputGroup,
  Dropdown,
  Breadcrumb,
  DropdownButton,
  Badge,
} from "@themesberg/react-bootstrap";
import jwt_decode from "jwt-decode";
import moment from "moment-timezone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";
import { Routes } from "../routes";
import axios from "axios";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/bootstrap-react";
import { useTranslation } from "react-i18next";
import Pagination from "./pagination";
import "./pagination.css";
import Swal from "sweetalert2";
import { Paper, TableContainer } from "@mui/material";


export default function AllSuperAdmins() {
  const { t } = useTranslation();
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem("token"));
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  let decoded = null;
  if (token !== null) decoded = jwt_decode(token);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://www.skiesbook.com:3000/api/v1/users/getstaff/" +
          decoded.graveyardId
        );
        setData(response);
        console.log(response);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);


  //console.log(currentPosts);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  async function deleteStaff(id) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(
            "http://www.skiesbook.com:3000/api/v1/users/" + id
          );
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          history.push("/staff");
          history.go(0);
        }
      }
      );
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{
              className: "breadcrumb-dark breadcrumb-transparent",
            }}
          ></Breadcrumb>
          <h4>{t("list_of_your_employees")}</h4>
          {/*           <p className="mb-0">Your web analytics dashboard template.</p>

 */}
        </div>

        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Dropdown.Toggle
              onClick={(e) => history.push("/addstaff")}
              as={Button}
              variant="primary"
              size="sm"
              className="me-2"
            >
              <FontAwesomeIcon icon={faPlus} className="me-2" />
              {t("new_employee")}
            </Dropdown.Toggle>
          </ButtonGroup>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control type="text" placeholder={t("search")} />
            </InputGroup>
          </Col>
          <Col xs={4} md={2} xl={1}>
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle
                split
                as={Button}
                variant="link"
                className="text-dark m-0 p-0"
              >
                <span className="icon icon-sm icon-gray">
                  <FontAwesomeIcon icon={faCog} />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right">
                <Dropdown.Item className="fw-bold text-dark">
                  {t("show")}
                </Dropdown.Item>
                <Dropdown.Item className="d-flex fw-bold">
                  10{" "}
                  <span className="icon icon-small ms-auto">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                <Dropdown.Item className="fw-bold">30</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="p-0">
          <TableContainer component={Paper}>
            <Table hover className="user-table align-items-center">
              <thead>
                <tr>
                  <th className="border-bottom">#</th>
                  <th className="border-bottom">{t("full_name")}</th>
                  <th className="border-bottom">{t("reference_email")}</th>
                  <th className="border-bottom">{t("phone")}</th>
                  <th className="border-bottom">{t("role")}</th>
                  <th className="border-bottom">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts?.map((dm, index) => (
                  <tr>
                    <td>
                      <div className="user-avatar lg-avatar me-4">
                        <Image
                          style={{
                            flex: 1,
                            width: "50px",
                            height: "50px",
                            resizeMode: "contain",
                          }}
                          src={
                            "http://www.skiesbook.com:3000/uploads/" + dm.userimage
                          }
                          className="card-img-top rounded-circle border-white"
                        />
                      </div>
                    </td>
                    <td className="fw-bold">
                      {dm.name} {dm.lastn}
                    </td>
                    <td>{dm.email}</td>
                    <td>{dm?.phone}</td>
                    <td>
                      {" "}
                      <>
                        {dm?.role === "gstaff" ? (
                          <Badge bg="primary" className="me-1">
                            {t("seller")}
                          </Badge>
                        ) : dm?.role === "gadmin" ? (
                          <Badge bg="success" className="me-1">
                            {t("admin")}
                          </Badge>
                        ) : dm?.role === "admin" ? (
                          <Badge bg="dark" className="me-1">
                            {t("super_admin")}
                          </Badge>
                        ) : dm?.role === "gcompta" ? (
                          <Badge bg="warning" className="me-1">
                            {t("Accounting")}
                          </Badge>
                        ) : (
                          "none"
                        )}
                      </>
                    </td>

                    <td>
                      {" "}
                      <CDropdown className="dropleft" direction="dropstart">
                        <CDropdownToggle color="transparant">
                          <span className="icon icon-sm">
                            <FontAwesomeIcon
                              icon={faEllipsisH}
                              className="icon-dark"
                            />
                          </span>
                        </CDropdownToggle>
                        <CDropdownMenu
                          style={{ left: "50px;" }}
                          className="float-left"
                        >
                          <CDropdownItem
                            onClick={() => history.push("/editstaff/" + dm?._id)}
                          >
                            <FontAwesomeIcon icon={faEdit} className="me-2" />{" "}
                            {t("Edit")}{" "}
                          </CDropdownItem>
                          <CDropdownItem
                          disabled={dm?._id === decoded?.userId ? true : false}
                            onClick={() => {
                              deleteStaff(dm?._id);
                            }}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} className="me-2" />{" "}
                            {t("delete")}
                          </CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
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
