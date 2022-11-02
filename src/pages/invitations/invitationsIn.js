import React, { useState, useEffect } from "react";
import {
  faArrowLeft,
  faBaby,
  faCheck,
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
  Modal,
  Col,Form
} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment-timezone";
import { Avatar } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

const InvOut = (props) => {
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem("token"));
  const [data, setData] = useState([]);
  const id = props.id;
  const [reciever, setReciever] = useState("");
  const [recievername, setRecieverName] = useState("");
  const [recieverimg, setRecieverImg] = useState("");
  const [link, setLink] = useState("");
  const [link2, setLink2] = useState("");
  const [item, setItem] = useState("");
  const famillyLinks=[
    {title:"père",value:"père"},
    {title:"mère",value:"mère"},
    {title:"frère",value:"frère"},
    {title:"sœur",value:"sœur"},
    {title:"grandpère",value:"grandpère"},
    {title:"grandmère",value:"grandmère"},
    {title:"petit-fils",value:"petit-fils"},
    {title:"petite-fille",value:"petite-fille"},
    {title:"cousin",value:"cousin"},
    {title:"neveu",value:"neveu"},
    {title:"nièce",value:"nièce"},
    {title:"oncle",value:"oncle"},
    {title:"tante",value:"tante"},
    {title:"sibling",value:"sibling"},
    {title:"belle-mère",value:"belle-mère"},
    {title:"beau-père",value:"beau-père"},
    {title:"beau-frère",value:"beau-frère"},
    {title:"belle-sœur",value:"belle-sœur"},
  ]
  const fetchData = async () => {
    try {
      const { data: response } = await axios.get(
        "http://www.skiesbook.com:3000/api/v1/profile/prof/" + id
      );
      setData(response);
    } catch (error) {
      console.error(error.message);
    }
  };
  async function Accepter() {
    try {
      const mydata = {
        id: id,
        ids: reciever,
        lien: link,
        itemId: item,
        lien2: item.lien,
      };
      const { data: response } = await axios.post(
        "http://www.skiesbook.com:3000/api/v1/profile/accept",
        mydata
      );
      console.log(response);
      Swal.fire({
        title: "Success",
        text: "Invitation Accepted",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        history.goBack();
      });
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  let decoded = null;
  if (token !== null) decoded = jwt_decode(token);
  const [showDefault, setShowDefault] = useState(true);
  const toggleDefaultToast = () => setShowDefault(!showDefault);
  const handleClose = () => setShowDefault(false);
  const [showDefault1, setShowDefault1] = useState(false);


  async function openModal(id, name, img,item) {
    setReciever(id);
    setRecieverName(name);
    setRecieverImg(img);
    setShowDefault1(true);
    setItem(item);
  }
  async function calltoaction(id, name, img,item) {
    setReciever(id);
    await removeinv(id)
  }
  async function removeinv(ids) {
    try {
      Swal.fire({
        title: "vous etes sur ?",
        text: "vous ne pourrez pas revenir en arriere",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, supprimer l'invitation!",
      }).then(async (result) => {
        if (result.value) {
          const mydata = {
            id: id,
            ids: ids,
          };
          console.log(mydata)
          const { data: response } = await axios.post(
            "http://www.skiesbook.com:3000/api/v1/profile/removeinv",
            mydata
          );
          console.log(response);
          Swal.fire({
            title: "Success",
            text: "Invitation Rejeté",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            history.go(0);
          }
          );
        }
      });
    } 
    catch (error) {
      console.error(error.message);
    }
  }
  return (
    <>
      <Modal
        as={Modal.Dialog}
        className="d-flex justify-content-center"
        show={showDefault1}
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title className="h6">
            Accepter invitation de parenté
          </Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Form onSubmit={(e) => Accepter()}>
          <Modal.Body>
            <div className="d-flex justify-content-center">
              <h4>Entrez votre lien de parenté avec {recievername} </h4>
              <br></br>
              <div className="row justify-content-center">
                <Avatar
                  alt="Remy Sharp"
                  src={"http://www.skiesbook.com:3000/uploads/" + recieverimg}
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
              Accept invitation
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
          <h5 className="mb-4">Invitations reçus</h5>
          <Row>
            {data?.invitationsin?.map((item) => (
              <Col xs={6} md={4}>
                <Toast show={showDefault} onClose={toggleDefaultToast}>
                  <Toast.Header className="text-primary" closeButton={false}>
                    <a href={"/prof/" + item.prof._id}>
                      <Image
                        onClick={() => {
                          history.push("/prof/" + item.prof._id);
                        }}
                        src={
                          "http://www.skiesbook.com:3000/uploads/" +
                          item?.prof.profileImage
                        }
                        className="user-avatar md-avatar rounded-circle"
                      />
                    </a>
                    <strong className="me-auto ms-2">{item?.lien}</strong>
                    <Button
                      variant="primary"
                      size="xs"
                      className="me-2"
                      onClick={(e) =>
                        openModal(
                          item?.prof._id,
                          item?.profileName,
                          item?.profileImage,
                          item
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faCheck} className="me-2" />
                      Accepter
                    </Button>

                    <Button
                      variant="danger"
                      size="xs"
                      className="me-2"
                      onClick={(e) =>
                        calltoaction(
                          item?.prof._id,
                          item?.profileName,
                          item?.profileImage,
                          item
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faCheck} className="me-2" />
                      Rejeter
                    </Button>
                  </Toast.Header>
                  <Toast.Body>
                    <div className="text-center">
                      <b>
                        {" "}
                        {item?.prof.profileName} {item?.prof.profileLastName}{" "}
                      </b>
                      <p className="mb-0">
                        {moment(item?.prof.profileDatebirth).format(
                          "DD-MM-YYYY"
                        )}
                        <strong> - </strong>

                        {moment(item?.prof.profileDatedeath).format(
                          "DD-MM-YYYY"
                        )}
                      </p>
                    </div>
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
export default InvOut;
