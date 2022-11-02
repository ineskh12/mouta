/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, Fragment } from "react";
//import Profile from "./profiles/Profile/Profile";
import {
  BrowserRouter as Router,
  useParams,
  useHistory,
} from "react-router-dom";
import Btn from "./images/btn";
import axios from "axios";
import ModalImage from "react-modal-image";
import Test from "./Test";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/fontawesome-free-solid";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import Qrcode from "./QrCodeshare";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { Avatar } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import moment from "moment-timezone";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Paper } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import CssBaseline from "@mui/material/CssBaseline";
import PhotoIcon from "@mui/icons-material/Photo";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import ReactPlayer from "react-player";
import { Col, Row, Form, Button, Modal } from "@themesberg/react-bootstrap";
import Swal from "sweetalert2";
import ChatIcon from "@mui/icons-material/Chat";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function App() {
  const [value, setValue] = React.useState(0);
  const [value1, setValue1] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [parcours, setparcours] = useState({
    etat: true,
    style: "nav-link active",
  });
  const [images, setimages] = useState({ etat: false, style: "nav-link" });
  const [videos, setvideos] = useState({ etat: false, style: "nav-link" });
  const [parente, setparente] = useState({ etat: false, style: "nav-link" });
  const [hommage, sethommage] = useState({ etat: false, style: "nav-link" });

  const [photos, setphotos] = useState(null);
  const [prof, setprof] = useState(null);
  const [multi, setmultis] = useState(null);
  const [albumId, setAlbumId] = useState("");
  const [showAlbum, setShowAlbum] = useState(false);

  const history = useHistory();
  function handleshow(e) {
    switch (e) {
      case "parcours":
        setimages({ ...images, etat: false, style: "nav-link" });
        setparcours({ ...parcours, etat: true, style: "nav-link active" });
        setvideos({ ...videos, etat: false, style: "nav-link" });
        setparente({ ...parente, etat: false, style: "nav-link" });
        sethommage({ ...hommage, etat: false, style: "nav-link" });
        break;
      case "photo":
        setimages({ ...images, etat: true, style: "nav-link active" });
        setparcours({ ...parcours, etat: false, style: "nav-link" });
        setvideos({ ...videos, etat: false, style: "nav-link" });
        setparente({ ...parente, etat: false, style: "nav-link" });
        sethommage({ ...hommage, etat: false, style: "nav-link" });
        break;
      case "videos":
        setimages({ ...images, etat: false, style: "nav-link" });
        setparcours({ ...parcours, etat: false, style: "nav-link" });
        setvideos({ ...videos, etat: true, style: "nav-link active" });
        setparente({ ...parente, etat: false, style: "nav-link" });
        sethommage({ ...hommage, etat: false, style: "nav-link" });
        break;
      case "parente":
        setimages({ ...images, etat: false, style: "nav-link" });
        setparcours({ ...parcours, etat: false, style: "nav-link" });
        setvideos({ ...videos, etat: false, style: "nav-link" });
        setparente({ ...parente, etat: true, style: "nav-link active" });
        sethommage({ ...hommage, etat: false, style: "nav-link" });
        break;
      case "hommage":
        setimages({ ...images, etat: false, style: "nav-link" });
        setparcours({ ...parcours, etat: false, style: "nav-link" });
        setvideos({ ...videos, etat: false, style: "nav-link" });
        setparente({ ...parente, etat: false, style: "nav-link" });
        sethommage({ ...parente, etat: true, style: "nav-link active" });
        break;
      default:
        setimages({ ...images, etat: false, style: "nav-link" });
        setparcours({ ...parcours, etat: true, style: "nav-link active" });
        setvideos({ ...videos, etat: false, style: "nav-link" });
        setparente({ ...parente, etat: false, style: "nav-link" });
        sethommage({ ...hommage, etat: false, style: "nav-link" });
        break;
    }
  }
  let { id } = useParams();
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);

  const [showDefault2, setShowDefault2] = useState(false);
  const handleClose2 = () => setShowDefault2(false);

  useEffect(() => {
    const call = async () => {
      const response = await axios.get(
        "http://www.skiesbook.com:3000/api/v1/profile/" + id
      );
      response.data.files.forEach((element, index) => {
        response.data.files[index] =
          "http://www.skiesbook.com:3000/uploads/" + element;
      });
      setprof(response.data);
      setphotos(
        response.data.files.filter(
          (ext) =>
            ext.slice(-3) === "png" ||
            ext.slice(-3) === "jpg" ||
            ext.slice(-4) === "jpeg" ||
            ext.slice(-3) === "gif"
        )
      );
      setmultis(
        response.data.files.filter(
          (ext) =>
            ext.slice(-3) === "mp4" ||
            ext.slice(-3) === "mov" ||
            ext.slice(-4) === "avi" ||
            ext.slice(-3) === "wmv"
        )
      );
    };
    call();
  }, [id]);
  const handleAlbum = (e) => {
    setShowAlbum(!showAlbum);
    setAlbumId(e);
  };

  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width <= 768;

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, [isMobile]);
  const [inputList, setInputList] = useState({
    sender: "",
    message: "",
    email: "",
  });
  const [upload, setUpload] = useState([]);

  async function ajouterhommage(e) {
    e.preventDefault();
    inputList.files = upload;

    const mydata = new FormData();
    mydata.append("sender", inputList.sender);
    mydata.append("message", inputList.message);

    mydata.append("email", inputList.email);
    console.log(upload.files);
    for (let i = 0; i < upload.files.length; i++) {
      mydata.append("files", upload.files[i]);
    }
    Swal.fire({
      title: "Ajouter un hommage",
      showCancelButton: true,
      confirmButtonText: "Oui !",
      showLoaderOnConfirm: true,

      preConfirm: async () => {
        return await axios
          .post("http://www.skiesbook.com:3000/api/v1/profile/addcomment/" + id, mydata)
          .then((result) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title:
                "Hommage ajouté avec succès en attente que le propriétaire accepte ce commentaire",
              showConfirmButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                history.go(0);
              }
            });
          })
          .catch((error) => {
            Swal.showValidationMessage(`erreur: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }

  return (
    <div className="app">
      <Modal
        as={Modal.Dialog}
        className="d-flex justify-content-center"
        show={showDefault}
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title className="h6">
            Partage sur les réseaux sociaux
          </Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <p>Scanner le Code QR</p>
          <Qrcode myvalue={"http://www.skiesbook.com/prof/" + id}></Qrcode>
          <hr />
          <div className="d-flex flex-row align-items-center  justify-content-center">
            <FacebookShareButton
              url={"www.skiesbook.com/prof/" + id}
              quote={
                "sharing the profile of " + prof?.profileName + " on skiesbook"
              }
              hashtag={"#restinpeace"}
              description={prof?.bio}
              className="Demo__some-network__share-button ml-3"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>

            <TwitterShareButton
              className="ml-3"
              title={
                "sharing the profile of " + prof?.profileName + " on skiesbook"
              }
              url={"www.skiesbook.com/prof/" + id}
              hashtags={["#restinpeace"]}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            I Got It
          </Button>
          <Button
            variant="link"
            className="text-gray ms-auto"
            onClick={handleClose}
          >
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        as={Modal.Dialog}
        size="lg"
        show={showDefault2}
        onHide={handleClose2}
      >
        <Form onSubmit={(e) => ajouterhommage(e)}>
          <Modal.Header>
            <Modal.Title className="h6">Ajouter un hommage</Modal.Title>
            <Button variant="close" aria-label="Close" onClick={handleClose2} />
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Nom et prenom</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="profileName"
                    placeholder="Entrer votre Nom"
                    onChange={(e) =>
                      setInputList({
                        ...inputList,
                        sender: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col md={12} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Adresse mail</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="profileName"
                    placeholder="Entrer votre Nom"
                    onChange={(e) =>
                      setInputList({
                        ...inputList,
                        email: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="align-items-center">
              <Col md={12} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Hommage</Form.Label>
                  <textarea
                    class="form-control"
                    required
                    id="exampleFormControlTextarea1"
                    rows="3"
                    onChange={(e) =>
                      setInputList({
                        ...inputList,
                        message: e.target.value,
                      })
                    }
                  ></textarea>
                </Form.Group>
              </Col>
              <Col md={12} className="mb-3">
                <Form.Group id="Images">
                  <Form.Label>Images</Form.Label>
                  <DropzoneArea
                    required
                    acceptedFiles={[".jpg", ".jpeg", ".png", ".gif"]}
                    filesLimit={3}
                    dropzoneText="Déposez vos images ici .jpg / .jepg / .png / .gif "
                    showFileNames={true}
                    maxFileSize={500000000}
                    onChange={(files) => setUpload({ ...upload, files })}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="secondary">
              Ajouter
            </Button>
            <Button
              variant="link"
              className="text-gray ms-auto"
              onClick={handleClose2}
            >
              Fermer
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {!isMobile ? (
        <>
          <div className="col-sm-12">
            <div className="iq-card">
              <div className="iq-card-body profile-page p-0">
                <div className="profile-header">
                  <div className="cover-container">
                    <ModalImage
                      small={
                        "http://www.skiesbook.com:3000/uploads/" + prof?.banner
                      }
                      large={
                        "http://www.skiesbook.com:3000/uploads/" + prof?.banner
                      }
                      alt="profile-bg"
                      className="img-fluid"
                    />
                  </div>
                  <div style={{ top: "45%" }} className="user-detail prof">
                    <div className="profile-img">
                      <ModalImage
                        small={
                          "http://www.skiesbook.com:3000/uploads/" +
                          prof?.profileImage
                        }
                        large={
                          "http://www.skiesbook.com:3000/uploads/" +
                          prof?.profileImage
                        }
                        alt="profile-img"
                        className="avatar-130 img-fluid"
                      />
                    </div>
                  </div>
                  <div className="user-name profile-info p-4 d-flex align-items-center justify-content-between position-relative">
                    <div className="test d-flex justify-content-center">
                      <div className="mb-2">
                        <h3 className="ml-4" style={{ color: "black" }}>
                          {prof?.profileName} {prof?.profileLastName}
                        </h3>
                        <p className="ml-4 mb-0">
                          <b>
                            <strong>
                              {moment(prof?.profileDatebirth).format(
                                "DD/MM/YYYY"
                              )}{" "}
                              -{" "}
                              {moment(prof?.profileDatedeath).format(
                                "DD/MM/YYYY"
                              )}
                            </strong>
                          </b>
                        </p>
                      </div>
                    </div>
                    <Button
                      style={{
                        borderRadius: "0",
                      }}
                      variant="primary"
                      className="my-3 ml-4"
                      onClick={() => setShowDefault(true)}
                    >
                      <FontAwesomeIcon
                        className="mr-2 "
                        icon={faShareAlt}
                      ></FontAwesomeIcon>
                      Partager
                    </Button>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="iq-card-body2 mt-2 p-0">
                  <div className="user-tabing">
                    <ul className="nav nav-pills2 d-flex align-items-center justify-content-center profile-feed-items p-0 m-0">
                      <li className="col-sm-1 p-0">
                        <a
                          className={parcours.style}
                          data-toggle="pill"
                          onClick={(e) => handleshow("parcours")}
                        >
                          parcours
                        </a>
                      </li>
                      <li className="col-sm-1 p-0">
                        <a
                          className={images.style}
                          data-toggle="pill"
                          onClick={(e) => handleshow("photo")}
                        >
                          Photos
                        </a>
                      </li>
                      <li className="col-sm-1 p-0">
                        <a
                          className={videos.style}
                          data-toggle="pill"
                          onClick={(e) => handleshow("videos")}
                        >
                          Videos
                        </a>
                      </li>
                      <li className="col-sm-1 p-0">
                        <a
                          className={parente.style}
                          data-toggle="pill"
                          onClick={() => handleshow("parente")}
                        >
                          Parenté
                        </a>
                      </li>
                      <li className="col-sm-1 p-0">
                        <a
                          className={hommage.style}
                          data-toggle="pill"
                          onClick={() => handleshow("hommage")}
                        >
                          Hommages
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="content-page" className="content-page">
            <div className="row">
              <div className="tab-content">
                <div
                  className="tab-pane fade active show"
                  id="timeline"
                  role="tabpanel"
                >
                  <div hidden={!parcours.etat} className="container p-0">
                    <div className="row">
                      <div className="col-lg-4">
                        <div
                          className="iq-card p-2"
                          style={{ minHeight: "200px" }}
                        >
                          <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                              <h4
                                style={{ color: "#525252" }}
                                className="card-title"
                              >
                                Emplacement
                              </h4>
                            </div>
                          </div>
                          <div className="iq-card-body">
                            <p> Adresse : {prof?.graveyard?.address} </p>
                            <p> Contact cimetière: {prof?.graveyard?.phone} </p>
                          </div>
                        </div>
                        <div
                          className="iq-card p-2"
                          style={{ minHeight: "400px" }}
                        >
                          <div className="iq-card-body">
                            <div className="iq-header-title">
                              <h4
                                style={{ color: "#525252" }}
                                className="card-title"
                              >
                                Parcours
                              </h4>
                            </div>
                            <div className="scroll-area-x">
                              <div className="timeline-list timeline-list--primary">
                                {prof?.timeline?.map((timeline) => (
                                  <div className="timeline-item">
                                    <div className="timeline-item--content">
                                      <div className="timeline-item--icon" />
                                      <h4 className="timeline-item--label">
                                        {moment(timeline.date).format(
                                          "YYYY-MM-DD"
                                        )}
                                      </h4>
                                      <small className="mt-2 d-block">
                                        {timeline.message}
                                      </small>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-8">
                        <div className="iq-card p-0">
                          <div className="iq-card-body">
                            <div className="iq-header-title">
                              <h4
                                style={{ color: "#525252" }}
                                className="card-title"
                              >
                                Bio
                              </h4>
                            </div>
                            <span> {prof?.bio}</span>
                          </div>
                        </div>
                        <div className="iq-card align-items-center justify-content-center">
                          <div
                            className="iq-card-body"
                            style={{ minHeight: "200px" }}
                          >
                            <Box sx={{ width: "100%" }}>
                              <Box
                                sx={{
                                  borderBottom: 1,
                                  borderColor: "divider",
                                }}
                              >
                                <Tabs
                                  value={value}
                                  onChange={handleChange}
                                  allowScrollButtonsMobile
                                  variant="scrollable"
                                  aria-label="scrollable force tabs example"
                                >
                                  <Tab
                                    wrapped
                                    label="Photos "
                                    {...a11yProps(0)}
                                  />
                                  <Tab
                                    wrapped
                                    label="Albums"
                                    {...a11yProps(1)}
                                  />
                                  <Button
                                    variant="primary"
                                    onClick={(e) => handleshow("photo")}
                                    size="sm"
                                    className="mr-3 p-2"
                                    style={{
                                      borderRadius: "0",
                                      marginLeft: "auto",
                                      height: "40px",
                                      width: "150px",
                                    }}
                                  >
                                    <span className="mr-2">
                                      <Btn />
                                    </span>
                                    Afficher plus
                                  </Button>
                                </Tabs>
                              </Box>
                              <TabPanel value={value} index={0}>
                                <div className="friend-list-tab mt-2">
                                  <div className="tab-content">
                                    <div
                                      className="tab-pane fade active show"
                                      id="photosofyou"
                                      role="tabpanel"
                                    >
                                      <div className="iq-card-body p-0">
                                        <div className="row g-0">
                                          {photos?.slice(0, 12)?.map((img) => (
                                            <div className="col-sm-2 col-xs-2 m-2">
                                              <div className="user-images position-relative overflow-hidden">
                                                <a>
                                                  <ModalImage
                                                    hideDownload
                                                    small={img}
                                                    large={img}
                                                    className="img-fluid rounded"
                                                    alt=""
                                                  />
                                                </a>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </TabPanel>
                              <TabPanel value={value} index={1}>
                                {" "}
                                <div className="row">
                                  {!showAlbum ? (
                                    prof?.albums?.slice(0, 4)?.map((album) => (
                                      <Card
                                        className="ml-2 mr-2"
                                        onClick={(e) => handleAlbum(album._id)}
                                        style={{ padding: 0 }}
                                        sx={{ maxWidth: 280 }}
                                      >
                                        <CardActionArea>
                                          <CardMedia
                                            component="img"
                                            height="140"
                                            width={"300px"}
                                            image={
                                              "http://www.skiesbook.com:3000/uploads/" +
                                              album?.images[0]
                                            }
                                            alt="album photo"
                                          />
                                          <CardContent>
                                            <Typography
                                              className="d-flex justify-content-center"
                                              gutterBottom
                                              variant="h5"
                                              component="div"
                                            >
                                              {album.name}
                                            </Typography>
                                          </CardContent>
                                        </CardActionArea>
                                      </Card>
                                    ))
                                  ) : (
                                    <>
                                      <div className="d-flex align-items-center m-2">
                                        <Button
                                          variant="primary"
                                          size="xs"
                                          className="mr-3"
                                          style={{
                                            borderRadius: "0",
                                          }}
                                          onClick={(e) => setShowAlbum(false)}
                                        >
                                          <FontAwesomeIcon
                                            icon={faArrowLeft}
                                            className="me-2"
                                          />
                                          Retour
                                        </Button>
                                        <h4>
                                          {
                                            prof?.albums?.find(
                                              (x) => x._id === albumId
                                            )?.name
                                          }
                                        </h4>
                                      </div>
                                      <div className="row g-0">
                                        {prof?.albums
                                          ?.find((x) => x._id === albumId)
                                          ?.images?.map((img) => (
                                            <div className="col-sm-2 col-xs-2 m-2">
                                              <div className="user-images position-relative overflow-hidden">
                                                <a>
                                                  <ModalImage
                                                    hideDownload
                                                    small={
                                                      "http://www.skiesbook.com:3000/uploads/" +
                                                      img
                                                    }
                                                    large={
                                                      "http://www.skiesbook.com:3000/uploads/" +
                                                      img
                                                    }
                                                    className="img-fluid rounded"
                                                    alt="Responsive image"
                                                  />
                                                </a>
                                              </div>
                                            </div>
                                          ))}
                                      </div>
                                    </>
                                  )}
                                </div>
                              </TabPanel>
                            </Box>
                            <div className="card-footer"></div>
                          </div>
                        </div>

                        <div className="iq-card p-2">
                          <div className="iq-card-body">
                            <div className="iq-header-title">
                              <h4
                                style={{ color: "#525252" }}
                                className="card-title"
                              >
                                Parenté
                              </h4>
                            </div>
                            <div className="iq-card-header-toolbar d-flex align-items-center">
                              <Button
                                variant="primary"
                                onClick={(e) => handleshow("parente")}
                                size="sm"
                                className="mb-2 mr-3"
                                style={{
                                  borderRadius: "0",
                                  marginLeft: "auto",
                                  marginTop: "-50px",
                                  height: "40px",
                                  width: "150px",
                                }}
                              >
                                <span className="mr-2">
                                  <Btn />
                                </span>
                                Afficher plus
                              </Button>
                            </div>
                          </div>
                          <div className="iq-card-body">
                            <ul className="profile-img-gallary d-flex flex-wrap p-0 m-0">
                              {prof?.friends?.slice(0, 12)?.map((profile) => (
                                <li className="col-sm-2 col-xs-2 m-2">
                                  <a href={"/prof/" + profile?.prof?._id}>
                                    <img
                                      src={
                                        "http://www.skiesbook.com:3000/uploads/" +
                                        profile?.prof?.profileImage
                                      }
                                      alt="friend-img"
                                      className="img-fluid"
                                    />
                                  </a>
                                  <h6
                                    onClick={(e) =>
                                      history.push(
                                        "/prof/" + profile?.prof?._id
                                      )
                                    }
                                    className="mt-2"
                                  >
                                    {profile?.prof?.profileName}{" "}
                                    {profile?.prof?.profileLastName}{" "}
                                  </h6>
                                  <span>{profile?.lien}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="card-footer"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div hidden={!images.etat} id="photos" role="tabpanel">
                    <div className="iq-card">
                      <div className="iq-card-body">
                        <Box sx={{ width: "100%" }}>
                          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs
                              value={value}
                              onChange={handleChange}
                              allowScrollButtonsMobile
                              variant="scrollable"
                              aria-label="scrollable force tabs example"
                            >
                              <Tab wrapped label="Photos " {...a11yProps(0)} />
                              <Tab wrapped label="Albums" {...a11yProps(1)} />
                            </Tabs>
                          </Box>
                          <TabPanel value={value} index={0}>
                            <div className="friend-list-tab mt-2">
                              <div className="tab-content">
                                <div
                                  className="tab-pane fade active show"
                                  id="photosofyou"
                                  role="tabpanel"
                                >
                                  <div className="iq-card-body p-0">
                                    <div className="row g-0">
                                      {photos?.map((img) => (
                                        <div className="col-sm-2 col-xs-2 m-2">
                                          <div className="user-images position-relative overflow-hidden">
                                            <a>
                                              <ModalImage
                                                small={img}
                                                large={img}
                                                className="img-fluid rounded"
                                                alt="Responsive image"
                                              />
                                            </a>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabPanel>
                          <TabPanel value={value} index={1}>
                            <div className="friend-list-tab mt-2">
                              <div className="tab-content">
                                <div
                                  className="tab-pane fade active show"
                                  id="photosofyou"
                                  role="tabpanel"
                                >
                                  <div className="iq-card-body p-0">
                                    <div className="row">
                                      {!showAlbum ? (
                                        prof?.albums?.map((album) => (
                                          <Card
                                            className="m-4"
                                            onClick={(e) =>
                                              handleAlbum(album._id)
                                            }
                                            style={{ maxWidth: 320 }}
                                          >
                                            <CardActionArea>
                                              <CardMedia
                                                component="img"
                                                height="140"
                                                image={
                                                  "http://www.skiesbook.com:3000/uploads/" +
                                                  album?.images[0]
                                                }
                                                alt="album photo"
                                              />
                                              <CardContent>
                                                <Typography
                                                  className="d-flex justify-content-center"
                                                  gutterBottom
                                                  variant="h5"
                                                  component="div"
                                                >
                                                  {album.name}
                                                </Typography>
                                              </CardContent>
                                            </CardActionArea>
                                          </Card>
                                        ))
                                      ) : (
                                        <>
                                          <div className="d-flex align-items-center m-2">
                                            <Button
                                              variant="primary"
                                              size="xs"
                                              className="m-3"
                                              onClick={(e) =>
                                                setShowAlbum(false)
                                              }
                                            >
                                              <FontAwesomeIcon
                                                icon={faArrowLeft}
                                                className="me-2"
                                              />
                                              Retour
                                            </Button>
                                            <h4>
                                              {
                                                prof?.albums?.find(
                                                  (x) => x._id === albumId
                                                )?.name
                                              }
                                            </h4>
                                          </div>
                                          <div className="row g-0">
                                            {prof?.albums
                                              ?.find((x) => x._id === albumId)
                                              ?.images?.map((img) => (
                                                <div className="col-sm-2 col-xs-2 m-2">
                                                  <div className="user-images position-relative overflow-hidden">
                                                    <a>
                                                      <ModalImage
                                                        small={
                                                          "http://www.skiesbook.com:3000/uploads/" +
                                                          img
                                                        }
                                                        large={
                                                          "http://www.skiesbook.com:3000/uploads/" +
                                                          img
                                                        }
                                                        className="img-fluid rounded"
                                                        alt="Responsive image"
                                                      />
                                                    </a>
                                                  </div>
                                                </div>
                                              ))}
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabPanel>
                        </Box>
                      </div>
                    </div>
                  </div>

                  <div hidden={!videos.etat} className="iq-card p-2">
                    <div className="iq-card-body">
                      <div className="iq-header-title">
                        <h4 style={{ color: "#525252" }} className="card-title">
                          Videos
                        </h4>
                      </div>

                      {multi?.length > 0 ? (
                        <div className="friend-list-tab mt-2">
                          <div className="tab-content">
                            <div className="iq-card-body p-0">
                              <div className="row g-0">
                                {multi?.map((video) => (
                                  <div className="col mb-3">
                                    <div className="user-images position-relative overflow-hidden">
                                      <ReactPlayer
                                        width={"60%"}
                                        height={"60%"}
                                        playing
                                        controls
                                        muted={false}
                                        url={video}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <span>Aucune vidéo trouvée</span>
                      )}
                    </div>
                  </div>
                  <div hidden={!parente.etat} className="iq-card">
                    <div className="iq-card-body">
                      <div className="iq-header-title">
                        <h4 style={{ color: "#525252" }} className="card-title">
                          Parenté
                        </h4>
                      </div>
                      {prof?.friends?.length > 0 ? (
                        <div className="iq-card-body">
                          <ul className="profile-img-gallary d-flex flex-wrap p-0 m-0">
                            {prof?.friends?.map((profile) => (
                              <li className="col-md-2 col-2 pl-2 pr-0 pb-3">
                                <a href={"/prof/" + profile?.prof?._id}>
                                  <img
                                    src={
                                      "http://www.skiesbook.com:3000/uploads/" +
                                      profile?.prof?.profileImage
                                    }
                                    alt="friend-img"
                                    className="img-fluid"
                                  />
                                </a>
                                <h6
                                  onClick={(e) =>
                                    history.push("/prof/" + profile?.prof?._id)
                                  }
                                  className="mt-2"
                                >
                                  {profile?.prof?.profileName}{" "}
                                  {profile?.prof?.profileLastName}{" "}
                                </h6>
                                <span>{profile?.lien}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <span>Aucun lien de parenté trouvée</span>
                      )}
                    </div>
                  </div>

                  <div hidden={!hommage.etat} className="col-md-12">
                    <div className="iq-card p-0">
                      <div className="iq-card-body">
                        <div className="iq-header-title mb-2">
                          <h4
                            style={{ color: "#525252" }}
                            className="card-title"
                          >
                            Hommages
                          </h4>
                          <div className="iq-card-header-toolbar d-flex align-items-center">
                            <Button
                              variant="primary"
                              onClick={(e) => setShowDefault2(true)}
                              size="sm"
                              className="mb-2 mr-3"
                              style={{
                                borderRadius: "0",
                                marginLeft: "auto",
                                marginTop: "-50px",
                                height: "40px",
                                width: "200px",
                              }}
                            >
                              <span className="mr-2">
                                <Btn />
                              </span>
                              Ajouter un hommage
                            </Button>
                          </div>
                        </div>
                        <div className="iq-card-body">
                          {prof?.comments?.map(
                            (comment) =>
                              comment?.state === 1 && (
                                <div class="post-item mt-2">
                                  <div class="user-post-data p-3">
                                    <div class="d-flex flex-wrap">
                                      <div class="media-support-user-img mr-3">
                                        <Avatar
                                          alt={comment?.sender}
                                          src={
                                            "http://www.skiesbook.com:3000/uploads/"
                                          }
                                          className="mx-auto"
                                        />
                                      </div>
                                      <div className="media-support-info">
                                        <div className="row">
                                          <h5>{comment?.sender}</h5>
                                        </div>

                                        <p className="mb-0">
                                         
                                          {moment(comment?.timestamp).fromNow()}
                                        </p>
                                      </div>
                                      <div className="iq-card-post-toolbar">
                                        <div className="dropdown">
                                          <span
                                            className="dropdown-toggle"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            role="button"
                                          >
                                            <i className="ri-flag-2-line"></i>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="user-post">
                                  {(comment?.images).length > 0 && (
                                            <div className="row g-0">
                                              {comment?.images?.map((img) => (
                                                <div className="col-sm-2 col-xs-2 m-2">
                                                  <a>
                                                    <ModalImage
                                                      hideDownload
                                                      small={
                                                        "http://www.skiesbook.com:3000/uploads/" +
                                                        img
                                                      }
                                                      large={
                                                        "http://www.skiesbook.com:3000/uploads/" +
                                                        img
                                                      }
                                                      className="img-fluid rounded"
                                                      alt=""
                                                    />
                                                  </a>
                                                </div>
                                              ))}
                                            </div>
                                          )}

                                    <span> {comment?.message}</span>
                                    <div className="comment-area mt-3">
                                      <div className="d-flex justify-content-between align-items-center">
                                        <div className="like-block position-relative d-flex align-items-center">
                                          <div className="d-flex align-items-center">
                                            <div className="like-data">
                                              <div className="dropdown">
                                                <span
                                                  className="dropdown-toggle"
                                                  data-toggle="dropdown"
                                                  aria-haspopup="true"
                                                  aria-expanded="false"
                                                  role="button"
                                                >
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="col-sm-12">
            <div className="iq-card">
              <div className="iq-card-body profile-page p-0">
                <div className="profile-header">
                  <div className="cover-container">
                    <img
                      src={"http://www.skiesbook.com:3000/uploads/" + prof?.banner}
                      alt="profile-bg"
                      className="rounded img-fluid"
                    />
                  </div>
                  <div
                    style={{ top: "40%" }}
                    className="user-detail text-center mb-2"
                  >
                    <div className="profile-img">
                      <img
                        src={
                          "http://www.skiesbook.com:3000/uploads/" +
                          prof?.profileImage
                        }
                        alt="profile-img"
                        className="avatar-130 img-fluid"
                      />
                    </div>
                    <div className="profile-detail">
                      <h3 className>
                        {prof?.profileName} {prof?.profileLastName}
                      </h3>
                      <p className="mb-0">
                        <b>
                          <strong>
                            {moment(prof?.profileDatebirth).format(
                              "DD/MM/YYYY"
                            )}{" "}
                            -{" "}
                            {moment(prof?.profileDatedeath).format(
                              "DD/MM/YYYY"
                            )}
                          </strong>
                        </b>
                      </p>
                    </div>
                  </div>
                  <div className="profile-info p-4 d-flex align-items-center justify-content-between position-relative">
                    <div className="d-flex justify-content-center">
                      <Button
                        style={{
                          borderRadius: "0",
                        }}
                        variant="primary"
                        className="my-3"
                        onClick={() => setShowDefault(true)}
                      >
                        <FontAwesomeIcon
                          className="mr-2 "
                          icon={faShareAlt}
                        ></FontAwesomeIcon>
                        Partager
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="content-page" className="">
            <div className="row">
              <div className="tab-content">
                <div
                  className="tab-pane fade active show"
                  id="timeline"
                  role="tabpanel"
                >
                  <div hidden={!parcours.etat} className="container p-0">
                    <div className="row">
                      <div className="col-lg-8">
                        <div className="iq-card p-2">
                          <div className="iq-card-body">
                            <div className="iq-header-title">
                              <h4
                                style={{ color: "#525252" }}
                                className="card-title"
                              >
                                Bio
                              </h4>
                            </div>
                            <span> {prof?.bio}</span>
                          </div>
                        </div>
                        <div className="iq-card align-items-center justify-content-center">
                          <div
                            className="iq-card-body"
                            style={{ minHeight: "200px" }}
                          >
                            <Box sx={{ width: "100%" }}>
                              <Box
                                sx={{
                                  borderBottom: 1,
                                  borderColor: "divider",
                                }}
                              >
                                <Tabs
                                  value={value}
                                  onChange={handleChange}
                                  allowScrollButtonsMobile
                                  variant="scrollable"
                                  aria-label="scrollable force tabs example"
                                >
                                  <Tab
                                    wrapped
                                    label="Photos "
                                    {...a11yProps(0)}
                                  />
                                  <Tab
                                    wrapped
                                    label="Albums"
                                    {...a11yProps(1)}
                                  />
                                  <Button
                                    variant="primary"
                                    onClick={(e) => handleshow("photo")}
                                    size="sm"
                                    className="mr-3 p-2"
                                    style={{
                                      borderRadius: "0",
                                      marginLeft: "auto",
                                      height: "40px",
                                      width: "150px",
                                    }}
                                  >
                                    <span className="mr-2">
                                      <Btn />
                                    </span>
                                    Afficher plus
                                  </Button>
                                </Tabs>
                              </Box>
                              <TabPanel value={value} index={0}>
                                <div className="friend-list-tab mt-2">
                                  <div className="tab-content">
                                    <div
                                      className="tab-pane fade active show"
                                      id="photosofyou"
                                      role="tabpanel"
                                    >
                                      <div className="iq-card-body p-0">
                                        <div className="row">
                                          {photos?.slice(0, 12)?.map((img) => (
                                            <div className="col mb-3">
                                              <div className="user-images position-relative overflow-hidden">
                                                <a>
                                                  <ModalImage
                                                    hideDownload
                                                    small={img}
                                                    large={img}
                                                    className="img-fluid rounded"
                                                    alt=""
                                                  />
                                                </a>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </TabPanel>
                              <TabPanel value={value} index={1}>
                                <div className="tab-content">
                                  <div
                                    className="tab-pane fade active show"
                                    id="albums"
                                    role="tabpanel"
                                  >
                                    <div className="iq-card-body p-0">
                                      <div className="row">
                                        {!showAlbum ? (
                                          prof?.albums
                                            ?.slice(0, 4)
                                            ?.map((album) => (
                                              <Card
                                                className="ml-2 mr-2"
                                                onClick={(e) =>
                                                  handleAlbum(album._id)
                                                }
                                                style={{ maxWidth: 250 }}
                                              >
                                                <CardActionArea>
                                                  <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image={
                                                      "http://www.skiesbook.com:3000/uploads/" +
                                                      album?.images[0]
                                                    }
                                                    alt="album photo"
                                                  />
                                                  <CardContent>
                                                    <Typography
                                                      className="d-flex justify-content-center"
                                                      gutterBottom
                                                      variant="h5"
                                                      component="div"
                                                    >
                                                      {album.name}
                                                    </Typography>
                                                  </CardContent>
                                                </CardActionArea>
                                              </Card>
                                            ))
                                        ) : (
                                          <>
                                            <div className="d-flex align-items-center m-2">
                                              <Button
                                                variant="primary"
                                                size="xs"
                                                className="m-3"
                                                onClick={(e) =>
                                                  setShowAlbum(false)
                                                }
                                              >
                                                <FontAwesomeIcon
                                                  icon={faArrowLeft}
                                                  className="me-2"
                                                />
                                                Retour
                                              </Button>
                                              <h4>
                                                {
                                                  prof?.albums?.find(
                                                    (x) => x._id === albumId
                                                  )?.name
                                                }
                                              </h4>
                                            </div>
                                            <div className="row">
                                              {prof?.albums
                                                ?.find((x) => x._id === albumId)
                                                ?.images?.map((img) => (
                                                  <div className="col mb-3">
                                                    <div className="user-images position-relative overflow-hidden">
                                                      <a>
                                                        <ModalImage
                                                          hideDownload
                                                          small={
                                                            "http://www.skiesbook.com:3000/uploads/" +
                                                            img
                                                          }
                                                          large={
                                                            "http://www.skiesbook.com:3000/uploads/" +
                                                            img
                                                          }
                                                          className="img-fluid rounded"
                                                          alt="Responsive image"
                                                        />
                                                      </a>
                                                    </div>
                                                  </div>
                                                ))}
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </TabPanel>
                            </Box>
                            <div className="card-footer"></div>
                          </div>
                        </div>

                        <div className="iq-card p-2">
                          <div className="iq-card-body">
                            <div className="iq-header-title">
                              <h4
                                style={{ color: "#525252" }}
                                className="card-title"
                              >
                                Parenté
                              </h4>
                            </div>
                            <div className="iq-card-header-toolbar d-flex align-items-center">
                              <Button
                                variant="primary"
                                onClick={(e) => handleshow("parente")}
                                size="sm"
                                className="mb-2 mr-3"
                                style={{
                                  borderRadius: "0",
                                  marginLeft: "auto",
                                  marginTop: "-50px",
                                  height: "40px",
                                  width: "150px",
                                }}
                              >
                                <span className="mr-2">
                                  <Btn />
                                </span>
                                Afficher plus
                              </Button>
                            </div>
                          </div>
                          <div className="iq-card-body">
                            <ul className="profile-img-gallary d-flex flex-wrap p-0 m-0">
                              {prof?.friends?.slice(0, 12)?.map((profile) => (
                                <li className="col-md-4 col-6 pl-2 pr-0 pb-3">
                                  <a href={"/prof/" + profile?.prof?._id}>
                                    <img
                                      src={
                                        "http://www.skiesbook.com:3000/uploads/" +
                                        profile?.prof?.profileImage
                                      }
                                      alt="friend-img"
                                      className="img-fluid"
                                    />
                                  </a>
                                  <h6
                                    onClick={(e) =>
                                      history.push(
                                        "/prof/" + profile?.prof?._id
                                      )
                                    }
                                    className="mt-2"
                                  >
                                    {profile?.prof?.profileName}{" "}
                                    {profile?.prof?.profileLastName}{" "}
                                  </h6>
                                  <span>{profile?.lien}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="card-footer"></div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="iq-card p-2">
                          <div className="iq-card-body">
                            <div className="iq-header-title">
                              <h4
                                style={{ color: "#525252" }}
                                className="card-title"
                              >
                                Parcours
                              </h4>
                            </div>
                            <div className="scroll-area-x">
                              <div className="timeline-list mb-4 timeline-list--primary">
                                {prof?.timeline?.map((timeline) => (
                                  <div className="timeline-item">
                                    <div className="timeline-item--content">
                                      <div className="timeline-item--icon" />
                                      <h4 className="timeline-item--label">
                                        {moment(timeline.date).format(
                                          "YYYY-MM-DD"
                                        )}
                                      </h4>
                                      <small className="mt-2 d-block">
                                        {timeline.message}
                                      </small>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="iq-card p-2"
                          style={{ minHeight: "200px" }}
                        >
                          <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                              <h4
                                style={{ color: "#525252" }}
                                className="card-title"
                              >
                                Emplacement
                              </h4>
                            </div>
                          </div>
                          <div className="iq-card-body">
                            <div className="iq-card-body">
                              <p> Adresse : {prof?.graveyard?.address} </p>
                              <p>
                                {" "}
                                Contact cimetière: {prof?.graveyard?.phone}{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div hidden={!images.etat} id="photos" role="tabpanel">
                    <div className="iq-card">
                      <div className="iq-card-body">
                        <Box sx={{ width: "100%" }}>
                          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs
                              value={value}
                              onChange={handleChange}
                              allowScrollButtonsMobile
                              variant="scrollable"
                              aria-label="scrollable force tabs example"
                            >
                              <Tab wrapped label="Photos " {...a11yProps(0)} />
                              <Tab wrapped label="Albums" {...a11yProps(1)} />
                            </Tabs>
                          </Box>
                          <TabPanel value={value} index={0}>
                            <div className="friend-list-tab mt-2">
                              <div className="tab-content">
                                <div
                                  className="tab-pane fade active show"
                                  id="photosofyou"
                                  role="tabpanel"
                                >
                                  <div className="iq-card-body p-0">
                                    <div className="row">
                                      {photos?.map((img) => (
                                        <div className="col mb-3">
                                          <div className="user-images position-relative overflow-hidden">
                                            <a>
                                              <ModalImage
                                                small={img}
                                                large={img}
                                                className="img-fluid rounded"
                                                alt="Responsive image"
                                              />
                                            </a>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabPanel>
                          <TabPanel value={value} index={1}>
                            <div className="friend-list-tab mt-2">
                              <div className="tab-content">
                                <div
                                  className="tab-pane fade active show"
                                  id="photosofyou"
                                  role="tabpanel"
                                >
                                  <div className="iq-card-body p-0">
                                    <div className="row">
                                      {!showAlbum ? (
                                        prof?.albums?.map((album) => (
                                          <Card
                                            className="m-4"
                                            onClick={(e) =>
                                              handleAlbum(album._id)
                                            }
                                            style={{ maxWidth: 320 }}
                                          >
                                            <CardActionArea>
                                              <CardMedia
                                                component="img"
                                                height="140"
                                                image={
                                                  "http://www.skiesbook.com:3000/uploads/" +
                                                  album?.images[0]
                                                }
                                                alt="album photo"
                                              />
                                              <CardContent>
                                                <Typography
                                                  className="d-flex justify-content-center"
                                                  gutterBottom
                                                  variant="h5"
                                                  component="div"
                                                >
                                                  {album.name}
                                                </Typography>
                                              </CardContent>
                                            </CardActionArea>
                                          </Card>
                                        ))
                                      ) : (
                                        <>
                                          <div className="d-flex align-items-center m-2">
                                            <Button
                                              variant="primary"
                                              size="xs"
                                              className="m-3"
                                              onClick={(e) =>
                                                setShowAlbum(false)
                                              }
                                            >
                                              <FontAwesomeIcon
                                                icon={faArrowLeft}
                                                className="me-2"
                                              />
                                              Retour
                                            </Button>
                                            <h4>
                                              {
                                                prof?.albums?.find(
                                                  (x) => x._id === albumId
                                                )?.name
                                              }
                                            </h4>
                                          </div>
                                          <div className="row">
                                            {prof?.albums
                                              ?.find((x) => x._id === albumId)
                                              ?.images?.map((img) => (
                                                <div className="col mb-3">
                                                  <div className="user-images position-relative overflow-hidden">
                                                    <a>
                                                      <ModalImage
                                                        small={
                                                          "http://www.skiesbook.com:3000/uploads/" +
                                                          img
                                                        }
                                                        large={
                                                          "http://www.skiesbook.com:3000/uploads/" +
                                                          img
                                                        }
                                                        className="img-fluid rounded"
                                                        alt="Responsive image"
                                                      />
                                                    </a>
                                                  </div>
                                                </div>
                                              ))}
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabPanel>
                        </Box>
                      </div>
                    </div>
                  </div>

                  <div hidden={!videos.etat} className="iq-card p-2">
                    <div className="iq-card-body">
                      <div className="iq-header-title">
                        <h4 style={{ color: "#525252" }} className="card-title">
                          Videos
                        </h4>
                      </div>

                      {multi?.length > 0 ? (
                        <div className="row">
                          {multi?.map((video) => (
                            <div className="col-md-4 col-lg-3 mb-2">
                              <ReactPlayer
                                playing
                                width={"100%"}
                                controls
                                muted={false}
                                url={video}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span>Aucune vidéo trouvée</span>
                      )}
                    </div>
                  </div>
                  <div hidden={!parente.etat} className="iq-card">
                    <div className="iq-card-body">
                      <div className="iq-header-title">
                        <h4 style={{ color: "#525252" }} className="card-title">
                          Parenté
                        </h4>
                      </div>
                      {prof?.friends?.length > 0 ? (
                        <div className="iq-card-body">
                          <ul className="profile-img-gallary d-flex flex-wrap p-0 m-0">
                            {prof?.friends?.map((profile) => (
                              <li className="col-md-4 col-6 pl-2 pr-0 pb-3">
                                <a href={"/prof/" + profile?.prof?._id}>
                                  <img
                                    src={
                                      "http://www.skiesbook.com:3000/uploads/" +
                                      profile?.prof?.profileImage
                                    }
                                    alt="friend-img"
                                    className="img-fluid"
                                  />
                                </a>
                                <h6
                                  onClick={(e) =>
                                    history.push("/prof/" + profile?.prof?._id)
                                  }
                                  className="mt-2"
                                >
                                  {profile?.prof?.profileName}{" "}
                                  {profile?.prof?.profileLastName}{" "}
                                </h6>
                                <span>{profile?.lien}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <span>Aucune lien de parenté trouvée</span>
                      )}
                    </div>
                  </div>
                  <div hidden={!hommage.etat} className="col-md-12">
                    <div className="iq-card p-0">
                      <div className="iq-card-body">
                        <div className="iq-header-title mb-2">
                          <h4
                            style={{ color: "#525252" }}
                            className="card-title"
                          >
                            Hommages
                          </h4>
                          <div className="iq-card-header-toolbar d-flex align-items-center">
                            <Button
                              variant="primary"
                              onClick={(e) => setShowDefault2(true)}
                              size="sm"
                              className="mb-2 mr-3"
                              style={{
                                borderRadius: "0",
                                marginLeft: "auto",
                                marginTop: "-50px",
                                height: "50px",
                                width: "120px",
                              }}
                            >
                              <span className="mr-2">
                                <Btn />
                              </span>
                              Ajouter un hommage
                            </Button>
                          </div>
                        </div>
                        <div className="iq-card-body">
                          {prof?.comments?.map(
                            (comment) =>
                              comment?.state === 1 && (
                                <div class="post-item mt-2">
                                  <div class="user-post-data p-3">
                                    <div class="d-flex flex-wrap">
                                      <div class="media-support-user-img mr-3">
                                        <Avatar
                                          alt={comment?.sender}
                                          src={
                                            "http://www.skiesbook.com:3000/uploads/"
                                          }
                                          className="mx-auto"
                                        />
                                      </div>
                                      <div className="media-support-info">
                                        <div className="row">
                                          <h5>{comment?.sender}</h5>
                                        </div>

                                        <p className="mb-0">
                                          {moment(comment?.timestamp).fromNow()}
                                        </p>
                                      </div>
                                      <div className="iq-card-post-toolbar">
                                        <div className="dropdown">
                                          <span
                                            className="dropdown-toggle"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            role="button"
                                          >
                                            <i className="ri-flag-2-line"></i>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="user-post">
                                  {(comment?.images).length > 0 && (
                                            <div className="row g-0">
                                              {comment?.images?.map((img) => (
                                                <div className="col mb-3">
                                                <a>
                                                    <ModalImage
                                                      hideDownload
                                                      small={
                                                        "http://www.skiesbook.com:3000/uploads/" +
                                                        img
                                                      }
                                                      large={
                                                        "http://www.skiesbook.com:3000/uploads/" +
                                                        img
                                                      }
                                                      className="img-fluid rounded"
                                                      alt=""
                                                    />
                                                  </a>
                                                </div>
                                              ))}
                                            </div>
                                          )}
                                    <span> {comment?.message}</span>
                                    <div className="comment-area mt-3">
                                      <div className="d-flex justify-content-between align-items-center">
                                        <div className="like-block position-relative d-flex align-items-center">
                                          <div className="d-flex align-items-center">
                                            <div className="like-data">
                                              <div className="dropdown">
                                                <span
                                                  className="dropdown-toggle"
                                                  data-toggle="dropdown"
                                                  aria-haspopup="true"
                                                  aria-expanded="false"
                                                  role="button"
                                                >
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Box sx={{ pb: 7 }}>
            <CssBaseline />

            <Paper
              sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
              elevation={3}
            >
              <BottomNavigation
                showLabels
                value={value1}
                onChange={(event, newValue) => {
                  setValue1(newValue);
                }}
              >
                <BottomNavigationAction
                  label="Parcous"
                  onClick={(e) => handleshow("parcours")}
                  icon={<AccountCircle />}
                />
                <BottomNavigationAction
                  label="Photos"
                  onClick={(e) => handleshow("photo")}
                  icon={<PhotoIcon />}
                />
                <BottomNavigationAction
                  label="Videos"
                  onClick={(e) => handleshow("videos")}
                  icon={<VideoCallIcon />}
                />
                <BottomNavigationAction
                  label="Parenté"
                  onClick={() => handleshow("parente")}
                  icon={<FamilyRestroomIcon />}
                />
                <BottomNavigationAction
                  label="Hommages"
                  onClick={() => handleshow("hommage")}
                  icon={<ChatIcon />}
                />
              </BottomNavigation>
            </Paper>
          </Box>
        </>
      )}
    </div>
  );
}

export default App;
