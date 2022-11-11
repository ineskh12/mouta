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
import { useTranslation } from "react-i18next";

const Addprice = () => {
  const { t } = useTranslation();
  const fullname = useParams().fullname;
  const id = useParams().id;
  const [data, setData] = useState([]);
  const [reciever, setReciever] = useState("");
  const [recievername, setRecieverName] = useState("");
  const [recieverimg, setRecieverImg] = useState("");
  const [link, setLink] = useState("");
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
  ];

  const fetchData = async () => {
    if (fullname && id) {
 
      const mydata = { fullname: fullname, myid: id };
      try {
        const { data: response } = await axios.post(
          "http://www.skiesbook.com:3000/api/v1/profile/searchbyname",
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
        .post("http://www.skiesbook.com:3000/api/v1/profile/sendinvitation", mydata)
        .then((res) => {
          Swal.fire({
            title: t("Invitation sent"),
            text: t("Your invitation has been sent successfully"),
            icon: "success",
            confirmButtonText: t("OK"),
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
            {t("Send relationship invitation")}
          </Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Form onSubmit={(e) => sendinvi(e)}>
          <Modal.Body>
            <div className="d-flex justify-content-center">
              <h4>{t("Enter your relationship with")}{' '}{recievername} </h4>
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
                    label={t("relationship")}
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
              {t("Invite")}{" "}
            </Button>
            <Button
              variant="secondary"
              className="text-gray ms-auto"
              onClick={handleClose}
            >
              {t("close")}
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
                {t("back")}
              </Dropdown.Toggle>
            </ButtonGroup>
          </div>
          <h5 className="mb-4">{t("list_of_profiles")}</h5>

          <Row>
            {data.map((item) => (
              <Col xs={6} md={4}>
                <Toast show={showDefault1} onClose={toggleDefaultToast}>
                  <Toast.Header className="text-primary" closeButton={false}>
                    <a href={"/prof/" + item?._id}>
                      <Image
                        src={
                          "http://www.skiesbook.com:3000/uploads/" + item?.profileImage
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
                      {t("Send an invitation")}
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
