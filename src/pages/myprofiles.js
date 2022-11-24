import React, { useState, useEffect } from "react";
import {

  faEdit,

  faEye,
  faTrashAlt,
  faCheck,
  faCog,
  faHome,
  faSearch,
  faArrowLeft,
  faArrowRight,
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
  ButtonGroup,
  Breadcrumb,
  InputGroup,
  Dropdown,
} from "@themesberg/react-bootstrap";
import jwt_decode from "jwt-decode";
import moment from "moment-timezone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";
import { Routes } from "../routes";
import axios from "axios";
import { SendSharp } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
const token = JSON.parse(localStorage.getItem("token"));
let decoded = null;
if (token !== null) decoded = jwt_decode(token);

export default function Myprofiles() {
  
  const { t } = useTranslation();
  const history = useHistory();

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://www.skiesbook.com:3000/api/v1/profile/userprofiles/" + decoded?.userId
        );
        setData(response);
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

<div className="btn-toolbar mb-2 mb-md-2">
            <ButtonGroup>
              <Dropdown.Toggle
                onClick={(e) => history.goBack()}
                as={Button}
                variant="primary"
                size="sm"
                className="me-2"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                {t('back')}
              </Dropdown.Toggle>
            </ButtonGroup>
          </div>
          <h4>{t('list_of_profiles')}</h4>
          {/*           <p className="mb-0">Your web analytics dashboard template.</p>

 */}
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Search" />
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
                <th className="border-bottom">{t('date_of_birth')}</th>
                <th className="border-bottom">{t('Date of death')}</th>
                <th className="border-bottom">{t('Contact information')}</th>
                <th className="border-bottom">{t('reference_email')}</th>
                <th className="border-bottom">{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {data?.profiles?.map((dm, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td className="fw-bold">
                    {dm.profileName} {dm.profileLastName}
                  </td>
                  <td>{moment(dm.profileDatebirth).format("DD/MM/YYYY")}</td>
                  <td>{moment(dm.profileDatebirth).format("DD/MM/YYYY")}</td>
                  <td>{dm.cords}</td>
                  <td>{dm.profileEmail}</td>
                  <td>
                    {" "}

                     
                    <Button
                        onClick={() => history.push("/prof/" + dm._id)}
                        color="primary"
                        size="sm"
                        className="m-1"
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </Button>
                      <Button
                        onClick={() => history.push("/editprof/" + dm._id)}
                        size="sm"
                        color="secondary"
                        className="m-1"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                  
                    {/*   <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle
                        as={Button}
                        split
                        variant="link"
                        className="text-dark m-0 p-0"
                      >
                        <span className="icon icon-sm">
                          <FontAwesomeIcon
                            icon={faEllipsisH}
                            className="icon-dark"
                          />
                        </span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={()=> history.push("/defun/"+dm._id)}>
                          <FontAwesomeIcon icon={faEye} className="me-2" /> View
                          Details
                        </Dropdown.Item>
                        <Dropdown.Item onClick={()=> history.push("/profile/"+dm._id)}>
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="me-2"
                          />{" "}
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item className="text-danger">
                          <FontAwesomeIcon icon={faTrashAlt} className="me-2" />{" "}
                          Remove
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
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
          
          </Card.Footer>
        </Card.Body>
      </Card>
    </>
  );
}
