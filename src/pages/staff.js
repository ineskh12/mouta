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
  Pagination,
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
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from "@coreui/bootstrap-react";
import { useTranslation } from "react-i18next";

export default function AllSuperAdmins() {
  const { t } = useTranslation();
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem("token"));
  let decoded = null
  if (token !== null)
    decoded= jwt_decode(token); 
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://www.skiesbook.com:3000/api/v1/users/getstaff/"+decoded.graveyardId
        );
        setData(response);
        console.log(response);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);
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
              <Form.Control type="text" placeholder={t('search')} />
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
                  {t('show')}
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
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th className="border-bottom">#</th>
                <th className="border-bottom">{t('full_name')}</th>
                <th className="border-bottom">{t("reference_email")}</th>
                <th className="border-bottom">{t("phone")}</th>
                <th className="border-bottom">{t('role')}</th>
                <th className="border-bottom">{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((dm, index) => (
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
                        src={"http://www.skiesbook.com:3000/uploads/" + dm.userimage}
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
                      {dm?.role ==="gstaff"
                        ?   <Badge bg="primary" className="me-1">{t("seller")}</Badge>
                        : dm?.role ==="gadmin"
                        ? <Badge bg="success" className="me-1">{t("admin")}</Badge>
                        :  dm?.role ==="admin"
                        ?   <Badge bg="dark" className="me-1">{t("super_admin")}</Badge>
                        :  dm?.role ==="gcompta"
                        ? <Badge bg="warning" className="me-1">{t("Accounting")}</Badge> : "none"}
                      
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
                          onClick={() =>
                            history.push("/editsuperadmin/" + dm?._id)
                          }
                        >
                          <FontAwesomeIcon icon={faEdit} className="me-2" />{" "}
                          {t("Edit")}{" "}
                        </CDropdownItem>
                        <CDropdownItem>
                          <FontAwesomeIcon icon={faTrashAlt} className="me-2" />{" "}
                          {t('delete')}
                        </CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
            <Nav>
              <Pagination className="mb-2 mb-lg-0">
                <Pagination.Prev>{t("Previous")}</Pagination.Prev>
                <Pagination.Item active>1</Pagination.Item>
                <Pagination.Item>2</Pagination.Item>
                <Pagination.Item>3</Pagination.Item>
                <Pagination.Item>4</Pagination.Item>
                <Pagination.Item>5</Pagination.Item>
                <Pagination.Next>{t("Next")}</Pagination.Next>
              </Pagination>
            </Nav>
            <small className="fw-bold">
              {t("Display of")} <b>{2}</b> {t("on")} <b>25</b> {t("entries")}
            </small>
          </Card.Footer>
        </Card.Body>
      </Card>
    </>
  );
}
