import React, { useState, useEffect } from "react";
import {
  faArrowLeft,
  faBaby,
  faCross,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {
  Card,
  Toast,
  Image,
  Button,
  ButtonGroup,
  Dropdown,
  Row,
  Container,
  Col,
} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBootstrap } from "@fortawesome/free-brands-svg-icons";
import moment from "moment-timezone";

const InvOut = (props) => {
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem("token"));
  const [data, setData] = useState([]);
  const id = props.id;
  const fetchData = async () => {
    try {
      const { data: response } = await axios.get(
        "http://www.skiesbook.com:3000/api/v1/profile/prof/" + id
      );
      setData(response);
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  let decoded = null;
  if (token !== null) decoded = jwt_decode(token);
  const [showDefault, setShowDefault] = useState(true);
  const toggleDefaultToast = () => setShowDefault(!showDefault);
  return (
    <Card  border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <div className="btn-toolbar mb-2 mb-md-2">
          <ButtonGroup>
            <Dropdown.Toggle
              disabled
              as={Button}
              variant="primary"
              size="sm"
              className="me-2"
            >
              Profil de {data.profileName}
            </Dropdown.Toggle>
          </ButtonGroup>
        </div>
        <h5 className="mb-4">Invitations envoyés</h5>

        <Row>
          {data?.invitationsout?.map((item) => (
            <Col >
              <Toast   show={showDefault} onClose={toggleDefaultToast}>
                <Toast.Header className="text-primary" closeButton={false}>
                  <a href={"/prof/" + item?.prof._id}>
                    <Image
                      onClick={() => history.push("/prof/" + item?.prof._id)}
                      src={
                        "http://www.skiesbook.com:3000/uploads/" +
                        item?.prof.profileImage
                      }
                      className="user-avatar md-avatar rounded-circle"
                    />
                  </a>
                  <strong
                    onClick={() => history.push("/prof/" + item?.prof._id)}
                    className="me-auto ms-2"
                  >
                    {item?.prof.profileName}
                  </strong>
                  {item?.lien}
                </Toast.Header>
                <Toast.Body>
                  <div className="text-center">
                    <b>
                      {" "}
                      {item?.prof.profileName} {item?.prof.profileLastName}{" "}
                    </b>
                    <p className="mb-0">
                      {moment(item?.prof.profileDatebirth).format("DD-MM-YYYY")}
                      <strong> - </strong>

                      {moment(item?.prof.profileDatedeath).format("DD-MM-YYYY")}
                    </p>
                  </div>
                </Toast.Body>
              </Toast>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
};
export default InvOut;
