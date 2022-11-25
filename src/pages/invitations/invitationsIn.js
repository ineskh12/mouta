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
  Col, Form
} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment-timezone";
import { Avatar } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { useTranslation } from "react-i18next";

const InvOut = (props) => {
  const { t } = useTranslation();
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
  const famillyLinks = [
    { title: t("father"), value: "père" },
    { title: t("mother"), value: "mère" },
    { title: t("brother"), value: "frère" },
    { title: t("sister"), value: "sœur" },
    { title: t("grandfather"), value: "grandpère" },
    { title: t("grandmother"), value: "grandmère" },
    { title: t("grandson"), value: "petit-fils" },
    { title: t("granddaughter"), value: "petite-fille" },
    { title: t("cousin"), value: "cousin" },
    { title: t("nephew"), value: "neveu" },
    { title: t("niece"), value: "nièce" },
    { title: t("uncle"), value: "oncle" },
    { title: t("aunt"), value: "tante" },
    { title: t("sibling"), value: "sibling" },
    { title: t("mother-in-law"), value: "belle-mère" },
    { title: t("stepfather"), value: "beau-père" },
    { title: t("brother-in-law"), value: "beau-frère" },
    { title: t("sister-in-law"), value: "belle-sœur" },
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
        text: t("Invitation Accepted"),
        icon: "success",
        confirmButtonText: t("OK"),
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


  async function openModal(id, name, img, item) {
    setReciever(id);
    setRecieverName(name);
    setRecieverImg(img);
    setShowDefault1(true);
    setItem(item);
  }
  async function calltoaction(id, name, img, item) {
    setReciever(id);
    await removeinv(id)
  }
  async function removeinv(ids) {
    try {
      Swal.fire({
        title: t("are you sure ?"),
        text: t("you can't go back"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: t("Yes, delete the invite!"),
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
            title: t('Success'),
            text: t("Invitation Rejected"),
            icon: "success",
            confirmButtonText: t("OK"),
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
            {t("Accept relationship invitation")}
          </Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Form onSubmit={(e) => Accepter()}>
          <Modal.Body>
            <div className="d-flex justify-content-center">
              <h4>{t('Enter your relationship with')} {recievername} </h4>
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
                    label={t('relationship')}
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
              {t("Accept invitation")}
            </Button>
            <Button
              variant="secondary"
              className="text-gray ms-auto"
              onClick={handleClose}
            >
              {t('close')}
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
                {t("Profile of")} {data.profileName}
              </Dropdown.Toggle>
            </ButtonGroup>
          </div>
          <h5 className="mb-4">{t("Invitations received")}</h5>
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
                      {t('Accept')}
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
                      {t('Dismiss')}
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
