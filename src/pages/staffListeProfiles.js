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

const token = JSON.parse(localStorage.getItem("token"));
let decoded = null;
if (token !== null) decoded = jwt_decode(token);

export default function AllProfiles() {
  const history = useHistory();

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://skiesbook.com:3000/api/v1/profile/staffgetprofiles/" + decoded?.userId
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
          <h4>Liste des cimetières</h4>
{/*           <p className="mb-0">Your web analytics dashboard template.</p>

 */}       

  </div>
  
        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Dropdown.Toggle onClick={(e)=>history.push('/AdminAdd')} as={Button} variant="primary" size="sm" className="me-2">
            <FontAwesomeIcon icon={faPlus} className="me-2" />nouveau cimetière
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
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th className="border-bottom">#</th>
                <th className="border-bottom">Nom Prénom </th>
                <th className="border-bottom">Date de naissance </th>
                <th className="border-bottom">Date de décés</th>
                <th className="border-bottom">Cordonnées</th>
                <th className="border-bottom">Email de référence</th>
                <th className="border-bottom">Action</th>
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
                          Détails
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => history.push("/profile/" + dm._id)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="me-2" />{" "}
                          Editer
                        </Dropdown.Item>
                        <Dropdown.Item className="text-danger">
                          <FontAwesomeIcon icon={faTrashAlt} className="me-2" />{" "}
                          Supprimer
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
            <Nav>
              <Pagination className="mb-2 mb-lg-0">
                <Pagination.Prev>Précédent</Pagination.Prev>
                <Pagination.Item active>1</Pagination.Item>
                <Pagination.Item>2</Pagination.Item>
                <Pagination.Item>3</Pagination.Item>
                <Pagination.Item>4</Pagination.Item>
                <Pagination.Item>5</Pagination.Item>
                <Pagination.Next>Suivant</Pagination.Next>
              </Pagination>
            </Nav>
            <small className="fw-bold">
              Affichage de <b>{2}</b> sur <b>25</b> entrées
            </small>
          </Card.Footer>
        </Card.Body>
      </Card>
    </>
  );
}
