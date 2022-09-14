import React, { useState, useEffect } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
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
  Modal,
  Col,
  Form,
} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@material-ui/core";
import moment from "moment-timezone";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

const Addprice = () => {
  const fullname = useParams().fullname;
  const id = useParams().id;
  const [data, setData] = useState([]);
  const [reciever, setReciever] = useState("");
  const [recievername, setRecieverName] = useState("");
  const [recieverimg, setRecieverImg] = useState("");
  const [link, setLink] = useState("");
  const famillyLinks = [
    { title: "père", value: "père" },
    { title: "mère", value: "mère" },
    { title: "frère", value: "frère" },
    { title: "sœur", value: "sœur" },
    { title: "grandpère", value: "grandpère" },
    { title: "grandmère", value: "grandmère" },
    { title: "petit-fils", value: "petit-fils" },
    { title: "petite-fille", value: "petite-fille" },
    { title: "cousin", value: "cousin" },
    { title: "neveu", value: "neveu" },
    { title: "nièce", value: "nièce" },
    { title: "oncle", value: "oncle" },
    { title: "tante", value: "tante" },
    { title: "sibling", value: "sibling" },
    { title: "belle-mère", value: "belle-mère" },
    { title: "beau-père", value: "beau-père" },
    { title: "beau-frère", value: "beau-frère" },
    { title: "belle-sœur", value: "belle-sœur" },
  ];

  const fetchData = async () => {
    if (fullname && id) {
 
      const mydata = { fullname: fullname, myid: id };
      try {
        const { data: response } = await axios.post(
          "http://skiesbook.com:3000/api/v1/profile/searchbyname",
          mydata
        );
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function sendinvi(e) {
    e.preventDefault();
    const mydata = { id: id, reciever: reciever, link: link };
    try {
      const { data: response } = await axios
        .post("http://skiesbook.com:3000/api/v1/profile/sendinvitation", mydata)
        .then((res) => {
          Swal.fire({
            title: "Invitation envoyée",
            text: "Votre invitation a été envoyée avec succès",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/parente/" + decoded.userId);
            }
          });
        });
    } catch (error) {
      console.error(error.message);
    }
  }

  async function openModal(id, name, img) {
    setReciever(id);
    setRecieverName(name);
    setRecieverImg(img);
    setShowDefault(true);
  }

  const history = useHistory();
  const token = JSON.parse(localStorage.getItem("token"));
  let decoded = null;
  if (token !== null) decoded = jwt_decode(token);
  const [showDefault, setShowDefault] = useState(false);
  const [showDefault1, setShowDefault1] = useState(true);

  const handleClose = () => setShowDefault(false);

  const toggleDefaultToast = () => setShowDefault(!showDefault1);
  return (
    <>
      <Modal
        as={Modal.Dialog}
        className="d-flex justify-content-center"
        show={showDefault}
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title className="h6">
            Envoyer invitation de parenté
          </Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Form onSubmit={(e) => sendinvi(e)}>
          <Modal.Body>
            <div className="d-flex justify-content-center">
              <h4>Entrez votre lien de parenté avec {recievername} </h4>
              <br></br>
              <div className="row justify-content-center">
                <Avatar
                  alt="Remy Sharp"
                  src={"http://skiesbook.com:3000/uploads/" + recieverimg}
                  className="mx-auto"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            </div>
            <Stack spacing={2} sx={{ width: 300 }}>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={famillyLinks.map((option) => option.title)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Lien de parenté"
                    onBlur={(e) => {
                      setLink(e.target.value);
                    }}
                  />
                )}
              />
            </Stack>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Inviter{" "}
            </Button>
            <Button
              variant="secondary"
              className="text-gray ms-auto"
              onClick={handleClose}
            >
              Fermer
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
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
                Retour
              </Dropdown.Toggle>
            </ButtonGroup>
          </div>
          <h5 className="mb-4">Liste des profils</h5>

          <Row>
            {data.map((item) => (
              <Col xs={6} md={4}>
                <Toast show={showDefault1} onClose={toggleDefaultToast}>
                  <Toast.Header className="text-primary" closeButton={false}>
                    <a href={"/prof/" + item?._id}>
                      <Image
                        src={
                          "http://skiesbook.com:3000/uploads/" + item?.profileImage
                        }
                        className="user-avatar md-avatar rounded-circle"
                      />
                    </a>
                    <a href={"/prof/" + item?._id}>
                      <strong className="me-auto ms-2">
                        {item?.profileName}
                      </strong>
                    </a>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="m-2 position-absolute top-0 end-0"
                      onClick={(e) =>
                        openModal(item._id, item.profileName, item.profileImage)
                      }
                    >
                      Envoyer une Invitation
                    </Button>
                  </Toast.Header>
                  <Toast.Body className="text-center">
                    <b>
                      {" "}
                      {item?.profileName} {item?.profileLastName}{" "}
                    </b>
                    <p className="mb-0">
                      {moment(item?.profileDatebirth).format("DD.MM.YYYY")}
                      <strong> - </strong>

                      {moment(item?.profileDatedeath).format("DD.MM.YYYY")}
                    </p>
                  </Toast.Body>
                </Toast>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};
export default Addprice;
