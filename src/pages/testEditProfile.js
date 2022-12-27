/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, Fragment, useRef } from "react";
//import Profile from "./profiles/Profile/Profile";
import { useParams, useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Btn from "./images/btn";
import axios from "axios";
import ModalImage from "react-modal-image";
import Test from "./Test";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/fontawesome-free-solid";
import { faDownload, faShareAlt } from "@fortawesome/free-solid-svg-icons";
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
import { CardActionArea, Icon, Paper } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import CssBaseline from "@mui/material/CssBaseline";
import ViewTimelineIcon from "@mui/icons-material/ViewTimeline";
import PinDropIcon from "@mui/icons-material/PinDrop";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ReactPlayer from "react-player";
import {
  Col,
  Row,
  Form,
  Button,
  Modal,
  Image,
} from "@themesberg/react-bootstrap";
import Swal from "sweetalert2";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Sticky from "react-sticky-el";
import { useTranslation } from "react-i18next";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import jwt_decode from "jwt-decode";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Stack, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/fr';
import 'dayjs/locale/es';
import cookies from "js-cookie";

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
  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);
  const [value1, setValue1] = React.useState(0);
  
  const currentLanguageCode = cookies.get("i18next") || "en";
  const [locale, setLocale] = React.useState(currentLanguageCode);

  useEffect(() => {
    setLocale(currentLanguageCode)
  }, [currentLanguageCode]);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };

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

  const [photos, setphotos] = useState([]);
  const [prof, setprof] = useState(null);
  const [position, setPosition] = useState(null);
  const [multi, setmultis] = useState(null);
  const [albumId, setAlbumId] = useState("");
  const [showAlbum, setShowAlbum] = useState(false);

  const history = useHistory();
  let decoded = null;
  const token = JSON.parse(localStorage.getItem("token"));
  if (token !== null) decoded = jwt_decode(token);
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

  const [showDefault3, setShowDefault3] = useState(false);
  const handleClose3 = () => setShowDefault3(false);
  const [imageDisplay, setImageDisplay] = useState("");

  const [showDefault4, setShowDefault4] = useState(false);
  const handleClose4 = () => setShowDefault4(false);
  const [videoDisplay, setVideoDisplay] = useState("");

  const hiddenFileInput = React.useRef();
  const hiddenFileInput2 = React.useRef();
  const [bio, setbio] = useState("");
  const [pdp, setpdp] = useState("");
  const [pdp2, setpdp2] = useState("");
  const [testfile, settestfile] = useState(null);
  const [testfile2, settestfile2] = useState(null);
  const [toggleSettings, settoggleSettings] = useState(false);

  const onClick = React.useCallback(() => {
    if (hiddenFileInput.current === undefined) {
      return;
    }
    hiddenFileInput.current.click();
  }, []);

  const onClick2 = React.useCallback(() => {
    if (hiddenFileInput2.current === undefined) {
      return;
    }
    hiddenFileInput2.current.click();
  }, []);

  const handleFileUpload = (event) => {
    setpdp(event.target.files[0]);
    settestfile(URL.createObjectURL(event.target.files[0]));
    console.log(testfile);
    settoggleSettings(true);
  };
  const handleFileUpload2 = (event) => {
    setpdp2(event.target.files[0]);
    settestfile2(URL.createObjectURL(event.target.files[0]));
    settoggleSettings(true);
  };
  function changebio(e) {
    settoggleSettings(true);
    setbio(e.target.value);
  }

  useEffect(() => {
    const call = async () => {
      const response = await axios.get(
        "http://skiesbook.com:3000/api/v1/profile/" + id
      );
      response.data.files.forEach((element, index) => {
        response.data.files[index] = "http://skiesbook.com:3000/uploads/" + element;
      });
      setprof(response.data);

      if (response.data.position)
        setPosition({
          lat: parseFloat(response.data.position.lat),
          lng: parseFloat(response.data.position.lng),
        });
      settestfile("http://www.skiesbook.com:3000/uploads/" + response.data.banner);
      settestfile2(
        "http://www.skiesbook.com:3000/uploads/" + response.data.profileImage
      );

      setphotos(
        response.data.files.filter(
          (ext) =>
            ext.slice(-3) === "png" ||
            ext.slice(-3) === "jpg" ||
            ext.slice(-4) === "jpeg" ||
            ext.slice(-3) === "gif" ||
            ext.slice(-3) === "mp4"
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
  const isMobile = width <= 820;

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
    for (let i = 0; i < upload.files.length; i++) {
      mydata.append("files", upload.files[i]);
    }
    Swal.fire({
      title: t("add_tribute"),
      showCancelButton: true,
      confirmButtonText: `${t("yes")} !`,
      showLoaderOnConfirm: true,

      preConfirm: async () => {
        return await axios
          .post("http://skiesbook.com:3000/api/v1/profile/addcomment/" + id, mydata)
          .then((result) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: t(
                "tribute_added_successfully_waiting_for_the_owner_to_accept_this_comment"
              ),
              showConfirmButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                history.go(0);
              }
            });
          })
          .catch((error) => {
            Swal.showValidationMessage(`${t("error")}: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }

  function displayImage(image) {
    setImageDisplay(image);
    setShowDefault3(true);
  }
  function displayVideo(video) {
    setVideoDisplay(video);
    setShowDefault4(true);
  }
  const containerStyle = {
    width: "100%",
    height: "400px",
  };
  const [showDefault5, setShowDefault5] = useState(false);
  const handleClose5 = () => setShowDefault5(false);

  const [showDefault6, setShowDefault6] = useState(false);
  const handleClose6 = () => setShowDefault6(false);

  const [showDefault7, setShowDefault7] = useState(false);
  const handleClose7 = () => setShowDefault7(false);

  function removeimage(index) {
    setphotos((index) => index.filter((_, index) => index !== 0));
    settoggleSettings(true);
  }

  const [formData, setFormData] = useState({
    files: "",
  });

  const [formData1, setFormData1] = useState({
    searchId: "",
    name: "",
    lastname: "",
    fullname: "",
  });
  const [formData2, setFormData2] = useState({
    message: "",
    date: "2000-01-01",
  });
  const [formData3, setFormData3] = useState({
    name: "",
    files: "",
  });
  async function searchit1(e) {
    e.preventDefault();
    history.push("/invi/" + id + "/" + formData1.fullname);
  }
  async function searchit2(e) {
    e.preventDefault();
    history.push("/invi/" + id + "/" + formData1.searchId);
  }
  async function saveit(e) {
    e.preventDefault();

    const mydata = new FormData();
    mydata.append("profileimage", pdp2);
    mydata.append("banner", pdp);

    for (let i = 0; i < formData.files.length; i++) {
      mydata.append("files", formData.files[i]);
    }

    mydata.append("bio", bio);
    mydata.append("cimitiere", decoded.graveyardId);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    Swal.fire({
      title: t("Are you sure you want to edit this profile?"),

      showCancelButton: true,
      confirmButtonText: t("Yes, edit it!"),
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        return await axios
          .put(
            "http://www.skiesbook.com:3000/api/v1/profile/update/" + id,
            mydata,
            config
          )
          .then((result) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: t("Profile changed successfully"),
              showConfirmButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                history.go(0);
              }
            });
          })
          .catch((error) => {
            Swal.showValidationMessage(t("error"));
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }

  async function addtimeline(e) {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    Swal.fire({
      title: t("Are you sure you want to add this event?"),

      showCancelButton: true,
      confirmButtonText: t("Yes, add it!"),
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        return await axios
          .post(
            "http://www.skiesbook.com:3000/api/v1/profile/addtimeline/" + id,
            formData2,
            config
          )
          .then((result) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: t("Profile changed successfully"),
              showConfirmButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                history.go(0);
              }
            });
          })
          .catch((error) => {
            Swal.showValidationMessage(t("error"));
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }

  return (
    <>
      <div className="app">
        <Modal show={showDefault5} size="lg" onHide={handleClose5}>
          <Modal.Header>
            <Modal.Title className="h6"> {t("Add photos/videos")}</Modal.Title>
            <Button variant="close" aria-label="Close" onClick={handleClose5} />
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={(e) => saveit(e)}>
              <Row>
                <Col md={12} className="mb-3">
                  <Form.Group id="Images">
                    <Form.Label>
                      {t("Add your photo or video memories here")}
                    </Form.Label>
                    <DropzoneArea
                      acceptedFiles={[".jpg", ".jpeg", ".png", ".gif", ".mp4"]}
                      filesLimit={20}
                      dropzoneText={`${t(
                        "drop_your_images_here"
                      )} .jpg / .jepg / .png / .gif / .mp4 `}
                      showFileNames={true}
                      maxFileSize={500000000}
                      onDrop={(e) => settoggleSettings(!toggleSettings)}
                      onChange={(files) => {
                        setFormData({ ...formData, files: files });
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <div className="mt-3">
                  <Button type="submit" variant="primary">
                    {t("add")}
                  </Button>
                </div>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>
        <Modal show={showDefault6} onHide={handleClose6}>
            <Modal.Header>
              <Modal.Title className="h6">
                {" "}
                {t("Add an important event")}
              </Modal.Title>
              <Button
                variant="close"
                aria-label="Close"
                onClick={handleClose3}
              />
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={(e) => addtimeline(e)}>
                <Row>
                  <Col md={10} className="mb-3">
                    <Form.Group id="name">
                      <Form.Label>{t("Event")}</Form.Label>
                      <textarea
                        className="form-control"
                        required
                        rows={4}
                        type="textarea"
                        placeholder={t("Event")}
                        onChange={(e) =>
                          setFormData2({ ...formData2, message: e.target.value })
                        }
                      ></textarea>
                    </Form.Group>
                  </Col>

                  <Col md={8} className="mb-3">
                    <Form.Group id="birthday">
                      <Form.Label>{t('Date')}</Form.Label>
                      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                        <Stack>
                          <DatePicker
                            required
                            // inputFormat="dd/MM/yyyy"

                            disableFuture
                            label={t("Event date")}
                            openTo="day"
                            views={["year", "month", "day"]}
                            value={formData2.date}
                            onChange={(e) =>
                              setFormData2({ ...formData2, date: e })
                            }
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </Form.Group>

                  </Col>
                </Row>
                <Row>
                  <div className="mt-3">
                    <Button type="submit" variant="primary">
                      {t("add")}
                    </Button>
                  </div>
                </Row>
              </Form>
            </Modal.Body>
        </Modal>
        <Modal
          as={Modal.Dialog}
          className="d-flex justify-content-center"
          show={showDefault3}
          onHide={handleClose3}
          dialogClassName=" "
        >
          <Image
            style={{ maxHeight: "700px" }}
            thumbnail
            src={imageDisplay}
            alt="userImage"
          ></Image>
        </Modal>

        
        <Modal show={showDefault7} onHide={handleClose7}>
            <Modal.Header>
              <Modal.Title className="h6">
                {" "}
                {t("Search for an existing profile")}
              </Modal.Title>
              <Button
                variant="close"
                aria-label="Close"
                onClick={handleClose7}
              />
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={(e) => searchit1(e)}>
                <Row>
                  <Col md={8} className="mb-3">
                    <Form.Group id="name">
                      <Form.Label>{t("full_name")}</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder={t("full_name")}
                        onChange={(e) =>
                          setFormData1({
                            ...formData1,
                            fullname: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <div className="mt-3">
                    <Button type="submit" variant="primary">
                      {t('search')}
                    </Button>
                  </div>
                </Row>
              </Form>
            </Modal.Body>
          </Modal>

        <Modal
          as={Modal.Dialog}
          className="d-flex justify-content-center"
          show={showDefault4}
          onHide={handleClose4}
        >
          <div style={{ maxHeight: "700px" }}>
            <ReactPlayer
              url={videoDisplay}
              controls={true}
              playing={true}
              width="100%"
              height="100%"
            />
          </div>{" "}
        </Modal>

        <Modal
          as={Modal.Dialog}
          className="d-flex justify-content-center"
          show={showDefault}
          onHide={handleClose}
        >
          <Modal.Header>
            <Modal.Title className="h6">
              {t("sharing_on_social_networks")}
            </Modal.Title>
            <Button variant="close" aria-label="Close" onClick={handleClose} />
          </Modal.Header>
          <Modal.Body className="align-items-center justify-content-center">
            <p>{t("scan_qr_code")}</p>
            <Qrcode myvalue={"http://www.localhost/prof/" + id}></Qrcode>
            <hr />

            <div className="d-flex flex-row align-items-center justify-content-center">
              {
                //copy url to clipboard span tag
                navigator.clipboard ? (
                  <span
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        "http://www.localhost/prof/" + id
                      );
                      Swal.fire({
                        position: "center",
                        icon: "success",
                        title: t("link_copied"),
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    }}
                  >
                    <ContentCopyIcon />
                    {t("copy_link")}
                  </span>
                ) : (
                  ""
                )
              }

              <FacebookShareButton
                url={"www.localhost/prof/" + id}
                quote={`${t("sharing_the_profile_of")} ${prof?.profileName} ${t(
                  "on_skiesbook"
                )}`}
                hashtag={"#restinpeace"}
                description={prof?.bio}
                className="Demo__some-network__share-button ml-3"
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>

              <TwitterShareButton
                className="ml-3"
                title={`${t("sharing_the_profile_of")} ${prof?.profileName} ${t(
                  "on_skiesbook"
                )}`}
                url={"www.localhost/prof/" + id}
                hashtags={["#restinpeace"]}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              {t("i_got_it")}
            </Button>
            <Button
              variant="link"
              className="text-gray ms-auto"
              onClick={handleClose}
            >
              {t("close")}
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
              <Modal.Title className="h6">{t("add_tribute")}</Modal.Title>
              <Button
                variant="close"
                aria-label="Close"
                onClick={handleClose2}
              />
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={12} className="mb-3">
                  <Form.Group id="firstName">
                    <Form.Label>{t("full_name")}</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="profileName"
                      placeholder={t("enter_your_name")}
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
                    <Form.Label>{t("mail_address")}</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="profileName"
                      placeholder={t("enter_your_email_address")}
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
                    <Form.Label>{t("tribute")}</Form.Label>
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
                    <Form.Label>{t("images")}</Form.Label>
                    <DropzoneArea
                      required
                      acceptedFiles={[".jpg", ".jpeg", ".png", ".gif"]}
                      filesLimit={3}
                      dropzoneText={`${t(
                        "drop_your_images_here"
                      )} .jpg / .jepg / .png / .gif `}
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
                {t("add")}
              </Button>
              <Button
                variant="link"
                className="text-gray ms-auto"
                onClick={handleClose2}
              >
                {t("close")}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
        {!isMobile ? (
          <>
            <div className="col-sm-12">
              {
                // go back button
              }

              <div className="iq-card">
                <div className="iq-card-body profile-page p-0">
                  <div className="profile-header">
                    <div className="cover-container">
                      <img
                        src={testfile}
                        alt="profile-bg"
                        className="img-fluid"
                      />
                      <ul
                        style={{ top: "5%" }}
                        className="header-nav d-flex flex-wrap justify-end p-0 m-0"
                      >
                        <li>
                          <a onClick={() => onClick()}>
                            <i className="ri-pencil-line" />
                          </a>
                        </li>
                        <input
                          ref={hiddenFileInput}
                          onChange={handleFileUpload}
                          type="file"
                          style={{ display: "none" }}
                          // multiple={false}
                        />
                        <input
                          ref={hiddenFileInput2}
                          onChange={handleFileUpload2}
                          type="file"
                          style={{ display: "none" }}
                        />
                      </ul>
                    </div>
                    <div
                      style={{ top: "45%" }}
                      className="user-detail prof user-images"
                    >
                      <div className="profile-img">
                        <img
                          src={testfile2}
                          onClick={() => {
                            displayImage(testfile2);
                          }}
                          alt="profile-img"
                          className="avatar-130 img-fluid"
                        />
                        <a
                          onClick={() => onClick2()}
                          className="image-edit-btn"
                          data-toggle="tooltip"
                          data-placement="top"
                          style={{ left: "12%" }}
                        >
                          <i className="ri-edit-2-fill" />
                        </a>
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
                        {t("share")}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="iq-card-body2 mt-2 p-0"></div>
                </div>
              </div>
            </div>
            <div id="content-page" className="content-page">
              <div className="container">
                <div className="row">
                  <div className="tab-content">
                    <div
                      className="tab-pane fade active show"
                      id="timeline"
                      role="tabpanel"
                    >
                      <div hidden={!parcours.etat} className="container p-0">
                        <div className="row">
                          <div className="col-lg-3">
                            <Sticky>
                              <div
                                className="iq-card p-2 "
                                style={{ minHeight: "200px" }}
                              >
                                <div className="iq-card-header d-flex justify-content-between">
                                  <div className="iq-header-title">
                                    <h4
                                      style={{ color: "#525252" }}
                                      className="card-title"
                                    >
                                      {t("location")}
                                    </h4>
                                  </div>
                                </div>
                                <div className="iq-card-body">
                                  {position ? (
                                    <LoadScript
                                      googleMapsApiKey={
                                        process.env.REACT_APP_GOOGLE_MAP
                                      }
                                    >
                                      <GoogleMap
                                        mapContainerStyle={containerStyle}
                                        center={position}
                                        zoom={15}
                                      >
                                        <Marker
                                          position={position}
                                          draggable={false}
                                        />
                                      </GoogleMap>
                                    </LoadScript>
                                  ) : (
                                    <>
                                      <p>
                                        {" "}
                                        {t("address")} :{" "}
                                        {prof?.graveyard?.address}{" "}
                                      </p>
                                      <p>
                                        {" "}
                                        {t("contact_cemetery")}:{" "}
                                        {prof?.graveyard?.phone}{" "}
                                      </p>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="iq-card p-2">
                                <div className="iq-card-body">
                                  <div className="iq-header-title">
                                    <h4
                                      style={{ color: "#525252" }}
                                      className="card-title"
                                    >
                                      {t("relationship")}
                                    </h4>
                                  </div>
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
                                        width: "auto",
                                      }}
                                    >
                                      <span className="mr-2">
                                        <Btn />
                                      </span>
                                     {t("add")}
                                    </Button>
                                  </div>
                                </div>
                                <div className="iq-card-body">
                                  <ul class="profile-img-gallary d-flex flex-wrap p-0 m-0">
                                    {prof?.friends
                                      ?.map((profile) => (
                                        <li className="col-md-4 col-6 pl-2 pr-0 pb-3">
                                          <img
                                            src={
                                              "http://skiesbook.com:3000/uploads/" +
                                              profile?.prof?.profileImage
                                            }
                                            alt="friendImage"
                                            className="img-fluid"
                                          />
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
                            </Sticky>
                          </div>

                          <div className="col-lg-6">
                            <div className="iq-card p-0">
                              <div className="iq-card-body">
                                <div className="iq-header-title">
                                  <h4
                                    style={{ color: "#525252" }}
                                    className="card-title"
                                  >
                                    {t("images")}
                                  </h4>
                                  <div className="iq-card-header-toolbar d-flex align-items-center">
                                    <Button
                                      variant="primary"
                                      onClick={(e) => setShowDefault5(true)}
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
                                      {t("Add photos/videos")}
                                    </Button>
                                  </div>
                                </div>

                                <Carousel responsive={responsive}>
                                  {photos?.map((img, i) => (
                                    <div key={i}>
                                      {img.split(".").pop() === "mp4" ? (
                                        <>
                                          <div
                                            className="okbb"
                                            onClick={() => {
                                              displayVideo(img);
                                            }}
                                          ></div>
                                          <video
                                            onClick={() => {
                                              displayVideo(img);
                                            }}
                                            style={{ borderRadius: "10px" }}
                                            className="story "
                                            src={img}
                                          ></video>
                                        </>
                                      ) : (
                                        <div
                                          style={{
                                            backgroundImage: `url(${img})`,
                                            backgroundRepeat: "no-repeat",
                                          }}
                                          className="story"
                                          onClick={() => {
                                            displayImage(img);
                                          }}
                                        ></div>
                                      )}
                                    </div>
                                  ))}
                                </Carousel>
                              </div>
                            </div>
                            <div className="iq-card p-0">
                              <div className="iq-card-body">
                                <div className="iq-header-title">
                                  <h4
                                    style={{ color: "#525252" }}
                                    className="card-title"
                                  >
                                    {t("biography")}
                                  </h4>
                                </div>
                                <div className="iq-card-body">
                                  <div className="d-flex align-items-center">
                                    <div className="user-img">
                                      <img
                                        src={testfile2}
                                        alt="userimg"
                                        className="avatar-60 rounded-circle img-fluid"
                                      />
                                    </div>
                                    <form
                                      className="post-text ml-3 w-100"
                                      action="/#"
                                    >
                                      <textarea
                                        type="text"
                                        rows={4}
                                        defaultValue={prof?.bio}
                                        className="form-control rounded"
                                        placeholder="Écrivez quelque chose ici..."
                                        onChange={(e) => changebio(e)}
                                        style={{ border: "none" }}
                                      />
                                    </form>
                                  </div>
                                  <hr />
                                </div>
                              </div>
                            </div>
                            <div className="iq-card p-0">
                              <div className="iq-card-body">
                                <div className="iq-header-title">
                                  <h4
                                    style={{ color: "#525252" }}
                                    className="card-title"
                                  >
                                    {t("tributes")}
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
                                      {t("add_tribute")}
                                    </Button>
                                  </div>
                                </div>

                                {prof?.comments?.map(
                                  (comment) =>
                                    comment?.state === 1 && (
                                      <div className="post">
                                        <div className="postWrapper">
                                          <div className="postTop">
                                            <div className="postTopLeft">
                                              <Avatar>
                                                {" "}
                                                {comment?.sender[0]}{" "}
                                              </Avatar>

                                              <Grid item xs={4}>
                                                <div
                                                  style={{
                                                    marginBottom: "-10px",
                                                  }}
                                                >
                                                  <span
                                                    className="postUsername"
                                                    style={{
                                                      marginLeft: "5px",
                                                    }}
                                                  >
                                                    {comment?.sender}
                                                  </span>{" "}
                                                </div>

                                                <span
                                                  className="postDate"
                                                  style={{ marginLeft: "5px" }}
                                                >
                                                  {moment(comment?.timestamp)
                                                    .locale("fr")
                                                    .format(
                                                      "LLLL"
                                                      /* "DD/MM/YYYY" + ", " + "HH:mm" */
                                                    )}
                                                </span>
                                              </Grid>
                                            </div>
                                          </div>

                                          <div className="postCenter">
                                            <span className="postText">
                                              {comment?.message}
                                            </span>
                                            {(comment?.images).length > 0 && (
                                              <div className="row g-0">
                                                {comment?.images?.map((img) => (
                                                  <div className="col-sm-2 col-xs-2 m-2">
                                                    <a>
                                                      <ModalImage
                                                        hideDownload
                                                        small={
                                                          "http://skiesbook.com:3000/uploads/" +
                                                          img
                                                        }
                                                        large={
                                                          "http://skiesbook.com:3000/uploads/" +
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
                                          </div>
                                        </div>
                                      </div>
                                    )
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-3">
                            <Sticky>
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
                                      {t("journey")}
                                    </h4>
                                    <div className="iq-card-header-toolbar d-flex align-items-center">
                                    <Button
                                      variant="primary"
                                      onClick={(e) => setShowDefault6(true)}
                                      size="sm"
                                      className="mb-2 mr-3"
                                      style={{
                                        borderRadius: "0",
                                        marginLeft: "auto",
                                        marginTop: "-50px",
                                        height: "40px",
                                        width: "auto",
                                      }}
                                    >
                                      <span className="mr-2">
                                        <Btn />
                                      </span>
                                      {t("add_timeline")}
                                    </Button>
                                  </div>

                                  </div>
                                  <div className="scroll-area-x">
                                    <div className="timeline-list timeline-list--primary">
                                      {prof?.timeline?.map((timeline) => (
                                        <div className="timeline-item">
                                          <div
                                            className="timeline-item--content"
                                            style={{ marginBottom: "40px" }}
                                          >
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
                            </Sticky>
                          </div>
                        </div>
                      </div>

                      <div hidden={!images.etat} id="photos" role="tabpanel">
                        <div className="iq-card">
                          <div className="iq-card-body">
                            <Box sx={{ width: "100%" }}>
                              <Box
                                sx={{ borderBottom: 1, borderColor: "divider" }}
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
                                    label={t("photos")}
                                    {...a11yProps(0)}
                                  />
                                  <Tab
                                    wrapped
                                    label="Albums"
                                    {...a11yProps(1)}
                                  />
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
                                                      "http://skiesbook.com:3000/uploads/" +
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
                                                  {t("back")}
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
                                                  ?.find(
                                                    (x) => x._id === albumId
                                                  )
                                                  ?.images?.map((img) => (
                                                    <div className="col-sm-2 col-xs-2 m-2">
                                                      <div className="user-images position-relative overflow-hidden">
                                                        <a>
                                                          <ModalImage
                                                            small={
                                                              "http://skiesbook.com:3000/uploads/" +
                                                              img
                                                            }
                                                            large={
                                                              "http://skiesbook.com:3000/uploads/" +
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
                            <h4
                              style={{ color: "#525252" }}
                              className="card-title"
                            >
                              {t("videos")}
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
                            <span>{t("no_videos_found")}</span>
                          )}
                        </div>
                      </div>
                      <div hidden={!parente.etat} className="iq-card">
                        <div className="iq-card-body">
                          <div className="iq-header-title">
                            <h4
                              style={{ color: "#525252" }}
                              className="card-title"
                            >
                              {t("relationship")}
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
                                          "http://skiesbook.com:3000/uploads/" +
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
                            </div>
                          ) : (
                            <span>{t("no_relatives_found")}</span>
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
                                {t("tributes")}
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
                                  {t("add_tribute")}
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
                                                "http://skiesbook.com:3000/uploads/"
                                              }
                                              className="mx-auto"
                                            />
                                          </div>
                                          <div className="media-support-info">
                                            <div className="row">
                                              <h4>{comment?.sender}</h4>
                                            </div>

                                            <p className="mb-0">
                                              {moment(
                                                comment?.timestamp
                                              ).fromNow()}
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
                                                      "http://skiesbook.com:3000/uploads/" +
                                                      img
                                                    }
                                                    large={
                                                      "http://skiesbook.com:3000/uploads/" +
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
                                                    ></span>
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
            </div>

            {toggleSettings ? (
              <Card // add padding
                className="theme-settings p-4"
              >
                <div>
                  <Button
                    className="theme-settings-close"
                    variant="close"
                    size="sm"
                    aria-label="Close"
                    onClick={() => {
                      settoggleSettings(false);
                    }}
                  />
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <p className="m-0 mb-1 me-3 fs-7">
                      Vous avez modifié le contenue de ce profil{" "}
                    </p>
                  </div>
                  <Button
                    onClick={(e) => console.log("hello")}
                    variant="primary"
                    className="mb-3 w-100"
                  >
                    <FontAwesomeIcon icon={faDownload} className="me-1" />{" "}
                    Enregistrer les changements
                  </Button>
                  <div className="d-flex justify-content-center"></div>
                </div>
              </Card>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <div className="col-sm-12">
              <div className="iq-card">
                <div className="iq-card-body profile-page p-0">
                  <div className="profile-header">
                    <div className="cover-container">
                      <img
                        src={"http://skiesbook.com:3000/uploads/" + prof?.banner}
                        alt="profile-bg"
                        className="rounded img-fluid"
                      />
                    </div>
                    <div
                      style={{ top: "40%" }}
                      className="user-detail text-center mb-2"
                    >
                      <div className="profile-img2">
                        <img
                          src={
                            "http://skiesbook.com:3000/uploads/" +
                            prof?.profileImage
                          }
                          alt="profile-img"
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
                          {t("share")}
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
                        <div className="col-lg-4">
                          <div className="iq-card">
                            <div className="iq-card-body">
                              <div className="iq-header-title">
                                <h4
                                  style={{ color: "#525252" }}
                                  className="card-title"
                                >
                                  {t("images")}
                                </h4>
                              </div>

                              <Carousel responsive={responsive}>
                                {photos?.map((img, i) => (
                                  <div key={i}>
                                    {img.split(".").pop() === "mp4" ? (
                                      <>
                                        <div
                                          className="okbb"
                                          onClick={() => {
                                            displayVideo(img);
                                          }}
                                        ></div>
                                        <video
                                          style={{ borderRadius: "10px" }}
                                          className="story "
                                          onClick={() => {
                                            displayVideo(img);
                                          }}
                                          src={img}
                                        ></video>
                                      </>
                                    ) : (
                                      <div
                                        style={{
                                          backgroundImage: `url(${img})`,
                                          backgroundRepeat: "no-repeat",
                                        }}
                                        onClick={() => {
                                          displayImage(img);
                                        }}
                                        className="storyMobile"
                                      ></div>
                                    )}
                                  </div>
                                ))}
                              </Carousel>
                            </div>
                          </div>
                          <div className="iq-card p-0">
                            <div className="iq-card-body">
                              <div className="iq-header-title">
                                <h4
                                  style={{ color: "#525252" }}
                                  className="card-title"
                                >
                                  {t("biography")}
                                </h4>
                              </div>
                              <span> {prof?.bio}</span>
                            </div>
                          </div>
                          <div className="iq-card p-0">
                            <div className="iq-card-body">
                              <div className="iq-header-title">
                                <h4
                                  style={{ color: "#525252" }}
                                  className="card-title"
                                >
                                  {t("tributes")}
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
                                    {t("add_tribute")}
                                  </Button>
                                </div>
                              </div>

                              {prof?.comments?.map(
                                (comment) =>
                                  comment?.state === 1 && (
                                    <div className="post">
                                      <div className="postWrapper">
                                        <div className="postTop">
                                          <div className="postTopLeft">
                                            <Avatar>
                                              {" "}
                                              {comment?.sender[0]}{" "}
                                            </Avatar>

                                            <Grid item xs={4}>
                                              <span
                                                style={{ fontSize: "1.2em" }}
                                                className="postUsername"
                                              >
                                                {comment?.sender}
                                              </span>{" "}
                                              <br />
                                              <span className="postDate">
                                                &ensp;{" "}
                                                {moment(comment?.timestamp)
                                                  .locale("fr")
                                                  .format(
                                                    "LLLL"
                                                    /* "DD/MM/YYYY" + ", " + "HH:mm" */
                                                  )}
                                              </span>
                                            </Grid>
                                          </div>
                                        </div>

                                        <div className="postCenter">
                                          <span className="postText">
                                            {comment?.message}
                                          </span>
                                          {(comment?.images).length > 0 && (
                                            <div className="row g-0">
                                              {comment?.images?.map((img) => (
                                                <div className="col-sm-2 col-xs-2 m-2">
                                                  <a>
                                                    <ModalImage
                                                      hideDownload
                                                      small={
                                                        "http://skiesbook.com:3000/uploads/" +
                                                        img
                                                      }
                                                      large={
                                                        "http://skiesbook.com:3000/uploads/" +
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

                    <div hidden={!images.etat} id="photos" role="tabpanel">
                      <div className="iq-card">
                        <div className="col-lg-3">
                          <div
                            className="iq-card p-2 "
                            style={{ minHeight: "200px" }}
                          >
                            <div className="iq-card-header d-flex justify-content-between">
                              <div className="iq-header-title">
                                <h4
                                  style={{ color: "#525252" }}
                                  className="card-title"
                                >
                                  {t("location")}
                                </h4>
                              </div>
                            </div>
                            <div className="iq-card-body">
                              {position ? (
                                <LoadScript
                                  googleMapsApiKey={
                                    process.env.REACT_APP_GOOGLE_MAP
                                  }
                                >
                                  <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={position}
                                    zoom={15}
                                    // satellite map with labels
                                  >
                                    <Marker
                                      position={position}
                                      draggable={false}
                                    />
                                  </GoogleMap>
                                </LoadScript>
                              ) : (
                                <>
                                  <p>
                                    {" "}
                                    {t("address")} : {prof?.graveyard?.address}{" "}
                                  </p>
                                  <p>
                                    {" "}
                                    {t("contact_cemetery")}:{" "}
                                    {prof?.graveyard?.phone}{" "}
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div hidden={!videos.etat} className="iq-card p-2">
                      <div className="col-lg-3">
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
                                {t("journey")}
                              </h4>
                            </div>
                            <div className="scroll-area-x">
                              <div className="timeline-list timeline-list--primary">
                                {prof?.timeline?.map((timeline) => (
                                  <div className="timeline-item">
                                    <div
                                      className="timeline-item--content"
                                      style={{ marginBottom: "40px" }}
                                    >
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
                    </div>
                    <div hidden={!parente.etat} className="iq-card">
                      <div className="iq-card-body">
                        <div className="iq-header-title">
                          <h4
                            style={{ color: "#525252" }}
                            className="card-title"
                          >
                            {t("relationship")}
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
                                        "http://skiesbook.com:3000/uploads/" +
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
                          </div>
                        ) : (
                          <span>{t("no_relatives_found")}</span>
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
                              {t("tributes")}
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
                                {t("add_tribute")}
                              </Button>
                            </div>
                          </div>
                          <div className="iq-card-body">
                            {prof?.comments?.map(
                              (comment) =>
                                comment?.state === 1 && (
                                  <div className="post">
                                    <div className="postWrapper">
                                      <div className="postTop">
                                        <div className="postTopLeft">
                                          <Avatar>
                                            {" "}
                                            {comment?.sender[0]}{" "}
                                          </Avatar>

                                          <Grid item xs={4}>
                                            <div
                                              style={{ marginBottom: "-10px" }}
                                            >
                                              <span
                                                className="postUsername"
                                                style={{ marginLeft: "5px" }}
                                              >
                                                {comment?.sender}
                                              </span>{" "}
                                            </div>

                                            <span
                                              className="postDate"
                                              style={{ marginLeft: "5px" }}
                                            >
                                              {moment(comment?.timestamp)
                                                .locale("fr")
                                                .format(
                                                  "LLLL"
                                                  /* "DD/MM/YYYY" + ", " + "HH:mm" */
                                                )}
                                            </span>
                                          </Grid>
                                        </div>
                                      </div>

                                      <div className="postCenter">
                                        <span className="postText">
                                          {comment?.message}
                                        </span>
                                        {(comment?.images).length > 0 && (
                                          <div className="row g-0">
                                            {comment?.images?.map((img) => (
                                              <div className="col-sm-2 col-xs-2 m-2">
                                                <a>
                                                  <ModalImage
                                                    hideDownload
                                                    small={
                                                      "http://skiesbook.com:3000/uploads/" +
                                                      img
                                                    }
                                                    large={
                                                      "http://skiesbook.com:3000/uploads/" +
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
                    label={t("home")}
                    onClick={(e) => handleshow("parcours")}
                    icon={<AccountCircle />}
                  />
                  <BottomNavigationAction
                    label={t("location")}
                    onClick={(e) => handleshow("photo")}
                    icon={<PinDropIcon />}
                  />
                  <BottomNavigationAction
                    label={t("journey")}
                    onClick={(e) => handleshow("videos")}
                    icon={<ViewTimelineIcon />}
                  />
                  <BottomNavigationAction
                    label={t("relationship")}
                    onClick={() => handleshow("parente")}
                    icon={<FamilyRestroomIcon />}
                  />
                </BottomNavigation>
              </Paper>
            </Box>
          </>
        )}
      </div>
    </>
  );
}

export default App;
