import React, { useState, useEffect } from "react";
import {
  faAngleDown,
  faAngleUp,
  faArrowDown,
  faArrowUp,
  faEdit,
  faEllipsisH,
  faExternalLinkAlt,
  faEye,
  faTrashAlt,
  faCheck,
  faCog,
  faHome,
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
import { Badge } from "@themesberg/react-bootstrap";
import Pagination from "./pagination";
import "./pagination.css";
import { useTranslation } from "react-i18next";
import { Paper, TableContainer } from "@mui/material";
export default function AllSuperAdmins() {
  const { t } = useTranslation();

  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const token = JSON.parse(localStorage.getItem("token"));
  let decoded = null;
  if (token !== null) decoded = jwt_decode(token);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://skiesbook.com:3000/api/v1/users/getastaff"
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
              onClick={(e) => history.push("/addadmingstaff")}
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
                  <th className="border-bottom">{t("sales")}</th>
                  <th className="border-bottom">{t("membership")}</th>
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
                            "http://skiesbook.com:3000/uploads/" + dm.userimage
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
                    <td>{dm?.clients.length}</td>
                    <td>
                      {" "}
                      <>
                        {dm?.role === "help" ? (
                          <Badge bg="primary" className="me-1">
                            {t("help_desk")}
                          </Badge>
                        ) : dm?.role === "sales" ? (
                          <Badge bg="success" className="me-1">
                            {t("sales")}
                          </Badge>
                        ) : dm?.role === "sadmin" ? (
                          <Badge bg="warning" className="me-1">
                            {t("admin")}
                          </Badge>
                        ) : (
                          t("none")
                        )}
                      </>
                    </td>

                    <td>
                      <Button
                        className="m-1"
                        onClick={() => history.push("/editstaff/" + dm?._id)}
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
