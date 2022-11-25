import React, { useState, useEffect } from "react";
import {
  faAngleDown,
  faAngleUp,
  faArrowDown,
  faPlus,
  faEdit,
  faEllipsisH,
  faExternalLinkAlt,
  faEye,
  faTrashAlt,
  faCheck,
  faCog,
  faHome,
  faSearch,
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
  ButtonGroup,
  InputGroup,
  Dropdown,
} from "@themesberg/react-bootstrap";
import jwt_decode from "jwt-decode";
import moment from "moment-timezone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Paper, TableContainer } from "@mui/material";

const token = JSON.parse(localStorage.getItem("token"));
let decoded = null;
if (token !== null) decoded = jwt_decode(token);

export default function AllProfiles() {
  const { t } = useTranslation();
  const history = useHistory();

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://www.skiesbook.com:3000/api/v1/profile/staffgetprofiles/" + decoded?.userId
        );
        setData(response);
        console.log(response)
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{
              className: "breadcrumb-dark breadcrumb-transparent",
            }}
          ></Breadcrumb>
          <h4>{t("list_of_cemeteries")}</h4>
          {/*           <p className="mb-0">Your web analytics dashboard template.</p>

 */}

        </div>

        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Dropdown.Toggle onClick={(e) => history.push('/AdminAdd')} as={Button} variant="primary" size="sm" className="me-2">
              <FontAwesomeIcon icon={faPlus} className="me-2" />{t("new_cemetery")}
            </Dropdown.Toggle>
          </ButtonGroup>
        </div>

      </div>
      <div className="d-block mb-4 mb-md-2">
        <Col xs={8} md={6} lg={3} xl={4} >
          <InputGroup>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <Form.Control type="text" placeholder="Search" />
          </InputGroup>
        </Col>
      </div>
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="p-0">
          <TableContainer component={Paper}>
            <Table hover className="user-table align-items-center">
              <thead>
                <tr>
                  <th className="border-bottom">#</th>
                  <th className="border-bottom">{t('full_name')}</th>
                  <th className="border-bottom">{t("date_of_birth")} </th>
                  <th className="border-bottom">{t("Date of death")}</th>
                  <th className="border-bottom">{t("Contact information")}</th>
                  <th className="border-bottom">{t("reference_email")}</th>
                  <th className="border-bottom">{t('action')}</th>
                </tr>
              </thead>
              <tbody>
                {data?.profiles?.map((dm, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td className="fw-bold">
                      {dm.profileName} {dm.profileLastName}
                    </td>
                    <td>{dm.profileDatebirth}</td>
                    <td>{dm.profileDatedeath}</td>
                    <td>{dm.cords}</td>
                    <td>{dm.profileEmail}</td>
                    <td>
                      {" "}
                      <Dropdown as={ButtonGroup}>
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
                          <Dropdown.Item
                            onClick={() => history.push("/defun/" + dm._id)}
                          >
                            <FontAwesomeIcon icon={faEye} className="me-2" />
                            {t('Details')}
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => history.push("/profile/" + dm._id)}
                          >
                            <FontAwesomeIcon icon={faEdit} className="me-2" />{" "}
                            {t('Edit')}
                          </Dropdown.Item>
                          <Dropdown.Item className="text-danger">
                            <FontAwesomeIcon icon={faTrashAlt} className="me-2" />{" "}
                            {t('delete')}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
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
