import React,{useState,useEffect} from "react";
//import Profile from "./profiles/Profile/Profile";
import { BrowserRouter as Router, useParams,useHistory } from 'react-router-dom';
import axios from "axios";
import ModalImage from "react-modal-image";
import Test from "./Test";
import { Button, Card, Image,Modal,OverlayTrigger ,Col,
  Form,
  InputGroup,
  Row,
} from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faShare,faCalendar, faAlignLeft, faArrowLeft } from "@fortawesome/fontawesome-free-solid";
import Qrcode from "./QrCodeshare";
import { DropzoneArea } from "material-ui-dropzone";
import {
  faSearch,
  faPlus,
  faEye,
  faEdit,
  faEllipsisH,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import moment from "moment-timezone";
import { Search } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Stack, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';


function App() {
  const [parcours, setparcours] =useState({etat : true,style:"nav-link active"});
  const [images, setimages] =useState({etat : false,style:"nav-link"});
  const [videos, setvideos] = useState({etat : false,style:"nav-link"});
  const [other, setother] = useState({etat : false,style:"nav-link"});
  const [showAlbum, setShowAlbum] = useState(false);

  const history = useHistory();

  const [photos, setphotos] = useState(null);
  const [prof, setprof] =useState(null); 
  const [multi, setmultis] =useState(null);
  const [testfile, settestfile] = useState(null);
  const [testfile2, settestfile2] = useState(null);
  const [toggleSettings, settoggleSettings] = useState(false);
  const [uploadimages, setuploadimages] = useState([]);
  const [uploadvideos, setuploadvideos] = useState(false);
  const [bio, setbio] = useState("");
  const [pdp, setpdp] = useState("");
  const [pdp2, setpdp2] = useState("");
  const [search, setSearch] = useState("");
  const [value, setValue] = useState(0);
  const [albumId, setAlbumId] = useState("");



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


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function handleshow(e){
    switch (e) {
      case "parcours":
        setimages({ ...images, etat: false,style:"nav-link" });
        setparcours({ ...parcours, etat: true,style:"nav-link active" });
        setvideos({ ...videos, etat: false,style:"nav-link" });
        setother({ ...other, etat: false,style:"nav-link" });


        break;
      case "photo":
        setimages({ ...images, etat: true,style:"nav-link active" });
        setparcours({ ...parcours, etat: false,style:"nav-link" });
        setvideos({ ...videos, etat: false,style:"nav-link" });
        setother({ ...other, etat: false,style:"nav-link" });

        break;
      case "videos":
        setimages({ ...images, etat: false,style:"nav-link" });
        setparcours({ ...parcours, etat: false,style:"nav-link" });
        setvideos({ ...videos, etat: true,style:"nav-link active" });
        setother({ ...other, etat: false,style:"nav-link" });

        break;
        case "other":
        setimages({ ...images, etat: false,style:"nav-link" });
        setparcours({ ...parcours, etat: false,style:"nav-link" });
        setvideos({ ...videos, etat: false,style:"nav-link" });
        setother({ ...other, etat: true,style:"nav-link active" });

        break;
      default:
        setimages({ ...images, etat: false,style:"nav-link" });
        setparcours({ ...parcours, etat: true,style:"nav-link active" });
        setvideos({ ...videos, etat: false,style:"nav-link" });
        break;
    }}
    let { id } = useParams();
    const [showDefault, setShowDefault] = useState(false);
const handleClose = () => setShowDefault(false);  
const [showDefault2, setShowDefault2] = useState(false);
const handleClose2 = () => setShowDefault2(false);
const [showDefault3, setShowDefault3] = useState(false);
const handleClose3 = () => setShowDefault3(false);
const [showDefault4, setShowDefault4] = useState(false);
const handleClose4 = () => setShowDefault4(false);  
const [showDefault5, setShowDefault5] = useState(false);
const handleClose5 = () => setShowDefault5(false);  
const token = JSON.parse(localStorage.getItem("token"));

function changebio(e){
  settoggleSettings(true);
  setbio(e.target.value);

}
const [media, setMedia] = useState(true);

let decoded = null;
if (token !== null) decoded = jwt_decode(token);

    useEffect(() => {  
      const call = async () => {
        const response = await axios.get(
          "http://skiesbook.com:3000/api/v1/profile/" + id
        );
        response.data.files.forEach((element, index) => {
          response.data.files[index] = "http://skiesbook.com:3000/uploads/" + element;
        });
        setprof(response.data);
        settestfile("http://skiesbook.com:3000/uploads/"+response.data.banner);
        settestfile2("http://skiesbook.com:3000/uploads/"+response.data.profileImage);

        setphotos( response.data.files.filter(ext => ext.slice(-3) === "png" ||ext.slice(-3) === "jpg" ||ext.slice(-4) === "jpeg" ||ext.slice(-3) === "gif"));
        setmultis(response.data.files.filter(ext => ext.slice(-3) === "mp4" ||ext.slice(-3) === "mov" ||ext.slice(-4) === "avi" ||ext.slice(-3) === "wmv"));

      }
      call();
    }, []);
    const hiddenFileInput = React.useRef();
    const hiddenFileInput2 = React.useRef();

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
  
 const  handleFileUpload = event => {
   setpdp(event.target.files[0]);
    settestfile(URL.createObjectURL(event.target.files[0]));
    settoggleSettings(true);
  };
  const  handleFileUpload2 = event => {
    setpdp2(event.target.files[0]);
    settestfile2(URL.createObjectURL(event.target.files[0]));
    settoggleSettings(true);

  };
  function removeimage(index){
    setphotos((index) => index.filter((_, index) => index !== 0));
    settoggleSettings(true);
  }

  const [formData, setFormData] = useState({
    files: "",
  });

  const [formData1, setFormData1] = useState({
    searchId: "",
    name:"",
    lastname:"",
    fullname:""
  });
  const [formData2, setFormData2] = useState({
    message: "",
    date:"01/01/2000",
  });
  const [formData3, setFormData3] = useState({
    name: "",
    files: "",
  });
  async function searchit1(e){
    e.preventDefault();
    history.push("/invi/"+id+"/"+formData1.fullname);
  }
  async function searchit2(e){
    e.preventDefault();
    history.push("/invi/"+id+"/"+formData1.searchId);
  }
 async function saveit(e){
  e.preventDefault();

    const mydata = new FormData();
    mydata.append("profileimage", pdp2);
    mydata.append("banner", pdp);
    
      for (let i = 0; i < formData.files.length; i++) {
        mydata.append("files", formData.files[i]);
      }


    mydata.append("bio",bio);
    mydata.append("cimitiere", decoded.graveyardId);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
      Swal.fire({
        title: "Êtes-vous sûr de vouloir modifier ce profil ?",

        showCancelButton: true,
        confirmButtonText: "Yes, edit it!",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          return await axios
            .put(
              "http://skiesbook.com:3000/api/v1/profile/update/" + id,
              mydata,
              config
            )
            .then((result) => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Profil modifié avec succès",
                showConfirmButton: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  history.go(0)              }
              });
            })
            .catch((error) => {
              Swal.showValidationMessage(`error`);
            });
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });
      
  }

  async function addtimeline(e){
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
      Swal.fire({
        title: "Êtes-vous sûr de vouloir ajouter cet événement ?",

        showCancelButton: true,
        confirmButtonText: "Oui, ajouter !",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          return await axios
            .post(
              "http://skiesbook.com:3000/api/v1/profile/addtimeline/" + id,
              formData2,
              config
            )
            .then((result) => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Profil modifié avec succès",
                showConfirmButton: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  history.go(0)
                }
              });
            })
            .catch((error) => {
              Swal.showValidationMessage(`error`);
            });
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });
      
  }

  const handleAlbum = (e) => {
    setShowAlbum(!showAlbum);
    setAlbumId(e);
  }
  const addAlbum = (e) => {
    e.preventDefault();
    const mydata = new FormData();
    mydata.append("name", formData3.name);    
      for (let i = 0; i < formData3.files.length; i++) {
        mydata.append("files", formData3.files[i]);
      }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if ((formData3.files === "") || (formData3.files.length === 0)) 
    {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Veuillez entrer des images pour l'album",
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("done");
        }
      });
    }
    else {
 
    Swal.fire({
      title: "Êtes-vous sûr de vouloir ajouter cet album ?",

      showCancelButton: true,
      confirmButtonText: "Oui, ajouter !",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        return await axios
          .post(
            "http://skiesbook.com:3000/api/v1/profile/addphototoalbum/" + id,
            mydata,
            config
          )
          .then((result) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Album ajouté avec succès",
              showConfirmButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                history.go(0)
              }
            });
          })
          .catch((error) => {
            Swal.showValidationMessage(`error`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }

}


  return (
    <div className="app">
      <>
        {/* search */}

        <div className="d-block mb-4 mb-md-2">
          <Col xs={8} lg={3} xl={4}>
            <InputGroup>
              <Button
                variant="primary"
                className="my-3 "
                onClick={() => setShowDefault2(true)}
              >
                Recherche d'autres profils
              </Button>
            </InputGroup>
          </Col>
        </div>
        {/* search */}

        {/* loader Start */}

        {/* loader END */}
        {/* Wrapper Start */}
        {/* TOP Nav Bar */}
        {/* TOP Nav Bar END */}
        {/* Right Sidebar Panel Start*/}
        {/* Right Sidebar Panel End*/}
        {/* Page Content  */}
        <div id="content-page" className="content-page">
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
              <Button
                variant="close"
                aria-label="Close"
                onClick={handleClose}
              />
            </Modal.Header>
            <Modal.Body>
              <p>Scan the QrCode</p>
              <Qrcode
                myvalue={"http://www.skiesbook.com/graveyard/prof/" + id}
              ></Qrcode>
              <hr />

              <FacebookShareButton
                url={"www.skiesbook.com/prof/" + id}
                quote={
                  "sharing the profile of " +
                  prof?.profileName +
                  " on skiesbook"
                }
                hashtag={"#restinpeace"}
                description={prof?.bio}
                className="Demo__some-network__share-button"
              >
                <FacebookIcon size={32} round /> Facebook share
              </FacebookShareButton>
              <br></br>
              <TwitterShareButton
                className="mt-2"
                title={
                  "sharing the profile of " +
                  prof?.profileName +
                  " on skiesbook"
                }
                url={"www.skiesbook.com/prof/" + id}
                hashtags={["#restinpeace"]}
              >
                <TwitterIcon size={32} round />
                Twitter share
              </TwitterShareButton>
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

          <Modal show={showDefault2} onHide={handleClose2}>
            <Modal.Header>
              <Modal.Title className="h6">
                {" "}
                Recherche un profil existant
              </Modal.Title>
              <Button
                variant="close"
                aria-label="Close"
                onClick={handleClose2}
              />
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={(e) => searchit1(e)}>
                <Row>
                  <Col md={8} className="mb-3">
                    <Form.Group id="name">
                      <Form.Label>Full name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="name & lastname"
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
                      Search
                    </Button>
                  </div>
                </Row>
              </Form>
            </Modal.Body>
          </Modal>
          
          <Modal show={showDefault3} onHide={handleClose3}>
            <Modal.Header>
              <Modal.Title className="h6">
                {" "}
                Ajouter un évènement marquant
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
                      <Form.Label>Evènement</Form.Label>
                              <textarea
                          className="form-control"
                          required
                          rows={4}
                          type="textarea"
                          placeholder="Evènement"
                          onChange={(e) =>
                            setFormData2({ ...formData2, message: e.target.value })
                          }
                            ></textarea>
                    </Form.Group>
                    </Col>

                    <Col md={8} className="mb-3">
                      <Form.Group id="birthday">
                        <Form.Label>Date</Form.Label>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack>
                              <DatePicker
                              required
                              inputFormat="dd/MM/yyyy"

                                disableFuture
                                label="Date de l'évènement"
                                openTo="year"
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
                      Ajouter
                    </Button>
                  </div>
                </Row>
              </Form>
            </Modal.Body>
          </Modal>


          <Modal show={showDefault4} onHide={handleClose4}>
            <Modal.Header>
              <Modal.Title className="h6">
                {" "}
                Ajouter un album
              </Modal.Title>
              <Button
                variant="close"
                aria-label="Close"
                onClick={handleClose4}
              />
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={(e) => addAlbum(e)}>
                <Row>
                  <Col md={10} className="mb-3">
                    <Form.Group id="name">
                      <Form.Label>Nom de l'album</Form.Label>
                              <input
                          className="form-control"
                          required
                          placeholder="Album"
                          onChange={(e) =>
                            setFormData3({ ...formData3, name: e.target.value })
                          }
                            ></input>
                    </Form.Group>
                    </Col>

                    <Col md={12} className="mb-3">
                      <Form.Group id="Images">
                        <Form.Label>Images</Form.Label>
                        <DropzoneArea
                            required
                            acceptedFiles={[
                              ".jpg",
                              ".jpeg",
                              ".png",
                              ".gif",
                            ]}
                            filesLimit={20}
                            
                            dropzoneText="Déposez vos images ici .jpg / .jepg / .png / .gif "
                            showFileNames={true}
                            maxFileSize={500000000}
                            onChange={(files) =>
                              setFormData3({ ...formData3, files: files })
                            }
                          />
                         
                      
                      </Form.Group>

                  </Col>
                </Row>
                <Row>
                  <div className="mt-3">
                    <Button type="submit" variant="primary">
                      Ajouter l'album
                    </Button>
                  </div>
                </Row>
              </Form>
            </Modal.Body>
          </Modal>


          <Modal show={showDefault5} onHide={handleClose5}>
            <Modal.Header>
              <Modal.Title className="h6">
                {" "}
                Ajouter photos/videos
              </Modal.Title>
              <Button
                variant="close"
                aria-label="Close"
                onClick={handleClose5}
              />
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={(e) => saveit(e)}>
                <Row>
                    <Col md={12} className="mb-3">
                      <Form.Group id="Images">
                        <Form.Label>Ajouter vos souvenirs photo ou video par ici</Form.Label>
                        
                       
                          <DropzoneArea
                            
                            acceptedFiles={[
                              ".jpg",
                              ".jpeg",
                              ".png",
                              ".gif",
                              ".mp4",
                            ]}
                            filesLimit={20}
                            dropzoneText="Déposez vos fichier ici .jpg / .jepg / .png / .gif / .mp4"
                            showFileNames={true}
                            maxFileSize={500000000}
                            onDrop={(e)=> settoggleSettings(!toggleSettings)}
                            onChange={(files) =>{
                              setFormData({ ...formData, files: files })}
                            }
                          />
                      </Form.Group>

                  </Col>
                </Row>
                <Row>
                  <div className="mt-3">
                    <Button type="submit" variant="primary">
                      Ajouter
                    </Button>
                  </div>
                </Row>
              </Form>
            </Modal.Body>
          </Modal>

          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="iq-card">
                  <div className="iq-card-body profile-page p-0">
                    <div className="profile-header">
                      <div className="cover-container">
                        <img
                          src={testfile}
                          alt="profile-bg"
                          className="rounded img-fluid"
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
                        </ul>
                      </div>

                      <div
                        style={{ top: "40%" }}
                        className=" fixed-bottom user-detail text-center mb-3"
                      >
                        <div className="profile-img user-images position-relative overflow-hidden">
                          <img
                            src={testfile2}
                            alt="profile-img"
                            className="avatar-130 img-fluid"
                          />
                          <a
                            onClick={() => onClick2()}
                            style={{ left: "53%" }}
                            className="image-edit-btn"
                            data-toggle="tooltip"
                            data-placement="top"
                          >
                            <i className="ri-edit-2-fill" />
                          </a>
                        </div>

                        <div className="profile-detail">
                          <h3 className>
                            {prof?.profileName} {prof?.profileLastName}
                          </h3>
                          <p className="mb-0">
                          <b><strong>
                          {moment(prof?.profileDatebirth).format(
                              "DD-MM-YYYY"
                            )}{" "}•{" "}
                            {moment(prof?.profileDatedeath).format(
                              "DD-MM-YYYY"
                            )}
                            
                            </strong></b>
                            </p>

                          <div
                            style={{ position: "absolute", bottom: "30%" }}
                            className="profile-detail"
                          ></div>
                        </div>
                      </div>

                      <div
                        className="profile-info p-4 d-flex align-items-center justify-content-between position-relative mt-2"
                        style={{ height: "200px" }}
                      >
                        <div className="social-info">
                          <ul className="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                            <div className="social-links">
                              <ul className="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                                <li className="text-center pr-3 ml-4"></li>
                              </ul>
                            </div>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                  <div className="iq-card-body p-0">
                    <div className="user-tabing">
                      <ul className="nav nav-pills2 d-flex align-items-center justify-content-center profile-feed-items p-0 m-0">
                        <li className="col-sm-3 p-0">
                          <a
                            className={parcours.style}
                            data-toggle="pill"
                            onClick={(e) => handleshow("parcours")}
                          >
                            parcours
                          </a>
                        </li>
                        <li className="col-sm-3 p-0">
                          <a
                            className={images.style}
                            data-toggle="pill"
                            onClick={(e) => handleshow("photo")}
                          >
                            Galerie
                          </a>
                        </li>
                        <li className="col-sm-3 p-0">
                          <a
                            className={videos.style}
                            data-toggle="pill"
                            onClick={(e) => handleshow("videos")}
                          >
                            Videos
                          </a>
                        </li>
                        <li className="col-sm-3 p-0">
                          <a
                            className={other.style}
                            data-toggle="pill"
                            onClick={(e) => handleshow("other")}
                          >
                            Parenté
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                </div>
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
               
              </div>
              <div className="col-sm-12">
                <div className="tab-content">
                  <div
                    className="tab-pane fade active show"
                    id="timeline"
                    role="tabpanel"
                  >
                    <div hidden={!parcours.etat} className="iq-card-body p-0">
                      <div className="row">
                      <div className="col-lg-5">
                          <div className="iq-card">
                            <div className="iq-card-header d-flex justify-content-between">
                              <div className="iq-header-title">
                                <h4 className="card-title">Biographie</h4>
                              </div>
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
                       
                        <div className="col-lg-7" >
                        <div className="iq-card align-items-center justify-content-center"  >
                        <div className="iq-card-body" style={{minHeight:"200px"}}>
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
                                    {photos?.slice(0, 12)?.map((img) => (
                                      <div className="col-md-6 col-lg-3 mb-3">
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
                                    <TabPanel  value={value} index={1}>
                            <div className="tab-content">
                              <div
                                className="tab-pane fade active show"
                                id="albums"
                                role="tabpanel"
                              >
                                <div className="iq-card-body p-0">
                                  <div className="row">
                                    {!showAlbum ? (
                                      
                                      prof?.albums?.slice(0, 4)?.map((album) => (
                                        <Card  className="ml-2 mr-2"  onClick={(e)=>handleAlbum(album._id)} style={{ maxWidth: 250 }} >
                                         
                                        <CardActionArea>
                                          <CardMedia
                                            component="img"
                                            height="140"
                                            image={"http://skiesbook.com:3000/uploads/"+album?.images[0]}
                                            alt="album photo"
                                          />
                                          <CardContent>
                                            <Typography className="d-flex justify-content-center" gutterBottom variant="h5" component="div">
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
                                          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                                          Retour
                                        </Button>   
                                        <h4>{ prof?.albums?.find(x => x._id === albumId)?.name}</h4>

                                          
                                       </div>
                                        <div className="row">
                                         
                                                                      
                                            { prof?.albums?.find(x => x._id === albumId)?.images?.map((img) => (
                                              <div className="col-md-6 col-lg-3 mb-3">
                                                <div className="user-images position-relative overflow-hidden">
                                                  <a>
                                                    <ModalImage
                                                      small={"http://skiesbook.com:3000/uploads/"+img}
                                                      large={"http://skiesbook.com:3000/uploads/"+img}
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
                           <div className="card-footer"> 

                          <Button
                          variant="primary"
                          size="xs"
                          className="me-2"
                          onClick={(e) => handleshow("photo")}

                          >
                          <FontAwesomeIcon icon={faPlus} className="me-2" />
                          Afficher plus
                          </Button>
                          </div>
                    </div>
                   

                  </div>
                       </div>

                       <div className="col-lg-5">
                          <div className="iq-card" style={{minHeight:"200px"}}>
                            <div className="iq-card-header d-flex justify-content-between">
                              <div className="iq-header-title">
                                <h4 className="card-title">Emplacement</h4>
                              </div>
                            </div>
                            <div className="iq-card-body">{prof?.cords}</div>
                          </div>
                          

                         
                        </div>

                        <div className="col-lg-7">
                        <div className="iq-card">
                            <div className="iq-card-header d-flex justify-content-between">
                              <div className="iq-header-title">
                                <h4 className="card-title">Parenté</h4>
                              </div>
                              <div className="iq-card-header-toolbar d-flex align-items-center">
                                <p className="m-0">
                                  <a onClick={() => setShowDefault2(true)}>
                                    Ajouter{" "}
                                  </a>
                                </p>
                              </div>
                            </div>
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
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div  className="iq-card">

                          <div className="iq-card-header d-flex justify-content-between">
                              <div className="iq-header-title">
                                <h4 className="card-title">Timeline</h4>
                              </div>
                              <div className="iq-card-header-toolbar d-flex align-items-center">
                              <Button
                                          variant="primary"
                                          size="xs"
                                          className="me-2"
                                          onClick={(e) =>
                                            setShowDefault3(true)
                                          }
                                        >
                                          <FontAwesomeIcon icon={faPlus} className="me-2" />
                                          Ajouter un évènement marquant
                                        </Button>
                              </div>
                            </div>
                              <div className="iq-card-body" >
                             
                              <div className="timeline-list timeline-list-horizontal" style={{marginTop:"10%"}}>
        <div className="scroll-area-x" >
          <ul>
          {prof?.timeline?.map((timeline) => (

          <li className="timeline-item">
              <div className="timeline-item--content">
                <div className="timeline-item--icon bg-primary" />
                <h4 className="timeline-item--label mb-2 font-weight-bold">
                {timeline.message}
                </h4>
                <p> {moment(timeline.date).format( "YYYY-MM-DD")}</p>
                
                </div>

            </li>
            ))
          }
          </ul>
        </div>
      </div>
                                 
                            </div>

                            
                          </div>
                        </div>
                      </div>
                    </div>

                    <div hidden={!other.etat} className="iq-card">
                          <div className="iq-card-header d-flex justify-content-between">
                              <div className="iq-header-title">
                                <h4 className="card-title">Timeline</h4>
                              </div>
                              <div className="iq-card-header-toolbar d-flex align-items-center">
                                       <Button
                                          variant="primary"
                                          size="xs"
                                          className="me-2"
                                          onClick={() => setShowDefault2(true)}
                                         
                                 
                                        >
                                          <FontAwesomeIcon icon={faPlus} className="me-2" />
                                          Ajouter un lien de parenté
                                        </Button>
                              </div>
                        </div>
                        <div className="iq-card-body" >

                             
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
                          <span>Aucune lien de parenté trouvée</span>
                        )}
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
                                        <Tab wrapped label="Photos " onClick={(e)=>setMedia(true)} {...a11yProps(0)} />
                                        <Tab wrapped onClick={(e)=>setMedia(false)}  label={
                                                    
                                                      <span>
                                                       Albums{" "}
                                                     
                                                      
                                                      </span>
                                                    } {...a11yProps(1)} />

                                               {media ? <Button
                                                          variant="primary"
                                                            size="xs"
                                                            className="m-3"
                                                            onClick={(e) =>
                                                              setShowDefault5(true)
                                                            }
                                                    >Ajouter des Photos/videos
                                                    </Button>: 
                                                    
                                                    <Button
                                                          variant="primary"
                                                            size="xs"
                                                            className="m-3"
                                                            onClick={(e) =>
                                                              setShowDefault4(true)
                                                            }
                                                    >Ajouter un album
                                                    </Button>
                                                    }

                                                     
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
                                    <div className="col-md-6 col-lg-3 mb-3">
                                      <div className="user-images position-relative overflow-hidden">
                                        <a>
                                          <ModalImage
                                            small={img}
                                            large={img}
                                            className="img-fluid rounded"
                                            alt="Responsive image"
                                          />
                                        </a>

                                        <a
                                          onClick={() => removeimage(img)}
                                          className="image-edit-btn"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title=""
                                          data-original-title="Edit or Remove"
                                        >
                                          <i className="ri-delete-bin-5-line" />
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
                                        <Card className="m-2" onClick={(e)=>handleAlbum(album._id)} style={{ maxWidth: 320 }} >
                                         
                                        <CardActionArea>
                                          <CardMedia
                                            component="img"
                                            height="140"
                                            image={"http://skiesbook.com:3000/uploads/"+album?.images[0]}
                                            alt="album photo"
                                          />
                                          <CardContent>
                                            <Typography className="d-flex justify-content-center" gutterBottom variant="h5" component="div">
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
                                          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                                          Retour
                                        </Button>   
                                        <h4>{ prof?.albums?.find(x => x._id === albumId)?.name}</h4>

                                          
                                       </div>
                                        <div className="row">
                                         
                                                                      
                                            { prof?.albums?.find(x => x._id === albumId)?.images?.map((img) => (
                                              <div className="col-md-6 col-lg-3 mb-3">
                                                <div className="user-images position-relative overflow-hidden">
                                                  <a>
                                                    <ModalImage
                                                      small={"http://skiesbook.com:3000/uploads/"+img}
                                                      large={"http://skiesbook.com:3000/uploads/"+img}
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

                    <div hidden={!videos.etat} className="iq-card">
                      <div className="iq-card-body">
                        <div className="iq-header-title">
                          <h4 className="card-title">videos</h4>
                        </div>
                        {multi?.length > 0 ? (
                          <Test wow={multi} id={id} />
                        ) : (
                          <span>Aucune vidéo trouvée</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="about" role="tabpanel">
                    <div className="iq-card">
                      <div className="iq-card-body">
                        <div className="row">
                          <div className="col-md-3">
                            <ul className="nav nav-pills basic-info-items list-inline d-block p-0 m-0">
                              <li>
                                <a
                                  className="nav-link active"
                                  data-toggle="pill"
                                  href="/#basicinfo"
                                >
                                  Contact and Basic Info
                                </a>
                              </li>
                              <li>
                                <a
                                  className="nav-link"
                                  data-toggle="pill"
                                  href="/#family"
                                >
                                  Family and Relationship
                                </a>
                              </li>
                              <li>
                                <a
                                  className="nav-link"
                                  data-toggle="pill"
                                  href="/#work"
                                >
                                  Work and Education
                                </a>
                              </li>
                              <li>
                                <a
                                  className="nav-link"
                                  data-toggle="pill"
                                  href="/#lived"
                                >
                                  Places You've Lived
                                </a>
                              </li>
                              <li>
                                <a
                                  className="nav-link"
                                  data-toggle="pill"
                                  href="/#details"
                                >
                                  Details About You
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="col-md-9 pl-4">
                            <div className="tab-content">
                              <div
                                className="tab-pane fade active show"
                                id="basicinfo"
                                role="tabpanel"
                              >
                                <h4>Contact Information</h4>
                                <hr />
                                <div className="row">
                                  <div className="col-3">
                                    <h6>Email</h6>
                                  </div>
                                  <div className="col-9">
                                    <p className="mb-0">Bnijohn@gmail.com</p>
                                  </div>
                                  <div className="col-3">
                                    <h6>Mobile</h6>
                                  </div>
                                  <div className="col-9">
                                    <p className="mb-0">(001) 4544 565 456</p>
                                  </div>
                                  <div className="col-3">
                                    <h6>Address</h6>
                                  </div>
                                  <div className="col-9">
                                    <p className="mb-0">
                                      United States of America
                                    </p>
                                  </div>
                                </div>
                                <h4 className="mt-3">
                                  Websites and Social Links
                                </h4>
                                <hr />
                                <div className="row">
                                  <div className="col-3">
                                    <h6>Website</h6>
                                  </div>
                                  <div className="col-9">
                                    <p className="mb-0">www.bootstrap.com</p>
                                  </div>
                                  <div className="col-3">
                                    <h6>Social Link</h6>
                                  </div>
                                  <div className="col-9">
                                    <p className="mb-0">www.bootstrap.com</p>
                                  </div>
                                </div>
                                <h4 className="mt-3">Basic Information</h4>
                                <hr />
                                <div className="row">
                                  <div className="col-3">
                                    <h6>Birth Date</h6>
                                  </div>
                                  <div className="col-9">
                                    <p className="mb-0">24 January</p>
                                  </div>
                                  <div className="col-3">
                                    <h6>Birth Year</h6>
                                  </div>
                                  <div className="col-9">
                                    <p className="mb-0">1994</p>
                                  </div>
                                  <div className="col-3">
                                    <h6>Sexe</h6>
                                  </div>
                                  <div className="col-9">
                                    <p className="mb-0">Femme</p>
                                  </div>
                                  <div className="col-3">
                                    <h6>interested in</h6>
                                  </div>
                                  <div className="col-9">
                                    <p className="mb-0">Designing</p>
                                  </div>
                                  <div className="col-3">
                                    <h6>language</h6>
                                  </div>
                                  <div className="col-9">
                                    <p className="mb-0">English, French</p>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="family"
                                role="tabpanel"
                              >
                                <h4 className="mb-3">Relationship</h4>
                                <ul className="suggestions-lists m-0 p-0">
                                  <li className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid">
                                      <i className="ri-add-fill" />
                                    </div>
                                    <div className="media-support-info ml-3">
                                      <h6>Add Your Relationship Status</h6>
                                    </div>
                                  </li>
                                </ul>
                                <h4 className="mt-3 mb-3">Family Members</h4>
                                <ul className="suggestions-lists m-0 p-0">
                                  <li className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid">
                                      <i className="ri-add-fill" />
                                    </div>
                                    <div className="media-support-info ml-3">
                                      <h6>Add Family Members</h6>
                                    </div>
                                  </li>
                                  <li className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid">
                                      <img
                                        src={require("./images/user/01.jpg")}
                                        alt="story-img"
                                        className="rounded-circle avatar-40"
                                      />
                                    </div>
                                    <div className="media-support-info ml-3">
                                      <h6>Paul Molive</h6>
                                      <p className="mb-0">Brothe</p>
                                    </div>
                                    <div className="edit-relation">
                                      <a href="/#">
                                        <i className="ri-edit-line mr-2" />
                                        Edit
                                      </a>
                                    </div>
                                  </li>
                                  <li className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid">
                                      <img
                                        src={require("./images/user/02.jpg")}
                                        alt="story-img"
                                        className="rounded-circle avatar-40"
                                      />
                                    </div>
                                    <div className="media-support-info ml-3">
                                      <h6>Anna Mull</h6>
                                      <p className="mb-0">sœur</p>
                                    </div>
                                    <div className="edit-relation">
                                      <a href="/#">
                                        <i className="ri-edit-line mr-2" />
                                        Edit
                                      </a>
                                    </div>
                                  </li>
                                  <li className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid">
                                      <img
                                        src={require("./images/user/03.jpg")}
                                        alt="story-img"
                                        className="rounded-circle avatar-40"
                                      />
                                    </div>
                                    <div className="media-support-info ml-3">
                                      <h6>Paige Turner</h6>
                                      <p className="mb-0">Cousin</p>
                                    </div>
                                    <div className="edit-relation">
                                      <a href="/#">
                                        <i className="ri-edit-line mr-2" />
                                        Edit
                                      </a>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="work"
                                role="tabpanel"
                              >
                                <h4 className="mb-3">Work</h4>
                                <ul className="suggestions-lists m-0 p-0">
                                  <li className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid">
                                      <i className="ri-add-fill" />
                                    </div>
                                    <div className="media-support-info ml-3">
                                      <h6>Add Work Place</h6>
                                    </div>
                                  </li>
                                  <li className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid">
                                      <img
                                        src={require("./images/user/01.jpg")}
                                        alt="story-img"
                                        className="rounded-circle avatar-40"
                                      />
                                    </div>
                                    <div className="media-support-info ml-3">
                                      <h6>Themeforest</h6>
                                      <p className="mb-0">Web Designer</p>
                                    </div>
                                    <div className="edit-relation">
                                      <a href="/#">
                                        <i className="ri-edit-line mr-2" />
                                        Edit
                                      </a>
                                    </div>
                                  </li>
                                  <li className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid">
                                      <img
                                        src={require("./images/user/02.jpg")}
                                        alt="story-img"
                                        className="rounded-circle avatar-40"
                                      />
                                    </div>
                                    <div className="media-support-info ml-3">
                                      <h6>iqonicdesign</h6>
                                      <p className="mb-0">Web Developer</p>
                                    </div>
                                    <div className="edit-relation">
                                      <a href="/#">
                                        <i className="ri-edit-line mr-2" />
                                        Edit
                                      </a>
                                    </div>
                                  </li>
                                  <li className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid">
                                      <img
                                        src={require("./images/user/03.jpg")}
                                        alt="story-img"
                                        className="rounded-circle avatar-40"
                                      />
                                    </div>
                                    <div className="media-support-info ml-3">
                                      <h6>W3school</h6>
                                      <p className="mb-0">Designer</p>
                                    </div>
                                    <div className="edit-relation">
                                      <a href="/#">
                                        <i className="ri-edit-line mr-2" />
                                        Edit
                                      </a>
                                    </div>
                                  </li>
                                </ul>
                                <h4 className="mb-3">Professional Skills</h4>
                                <ul className="suggestions-lists m-0 p-0">
                                  <li className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid">
                                      <i className="ri-add-fill" />
                                    </div>
                                    <div className="media-support-info ml-3">
                                      <h6>Add Professional Skills</h6>
                                    </div>
                                  </li>
                                </ul>
                                <h4 className="mt-3 mb-3">College</h4>
                                <ul className="suggestions-lists m-0 p-0">
                                  <li className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid">
                                      <i className="ri-add-fill" />
                                    </div>
                                    <div className="media-support-info ml-3">
                                      <h6>Add College</h6>
                                    </div>
                                  </li>
                                  <li className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid">
                                      <img
                                        src={require("./images/user/01.jpg")}
                                        alt="story-img"
                                        className="rounded-circle avatar-40"
                                      />
                                    </div>
                                    <div className="media-support-info ml-3">
                                      <h6>Lorem ipsum</h6>
                                      <p className="mb-0">USA</p>
                                    </div>
                                    <div className="edit-relation">
                                      <a href="/#">
                                        <i className="ri-edit-line mr-2" />
                                        Edit
                                      </a>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="lived"
                                role="tabpanel"
                              >
                                <h4 className="mb-3">
                                  Current City and Hometown
                                </h4>
                                <ul className="suggestions-lists m-0 p-0">
                                  <li className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid">
                                      <img
                                        src={require("./images/user/01.jpg")}
                                        alt="story-img"
                                        className="rounded-circle avatar-40"
                                      />
                                    </div>
                                    <div className="media-support-info ml-3">
                                      <h6>Georgia</h6>
                                      <p className="mb-0">Georgia State</p>
                                    </div>
                                    <div className="edit-relation">
                                      <a href="/#">
                                        <i className="ri-edit-line mr-2" />
                                        Edit
                                      </a>
                                    </div>
                                  </li>
                                  <li className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid">
                                      <img
                                        src={require("./images/user/02.jpg")}
                                        alt="story-img"
                                        className="rounded-circle avatar-40"
                                      />
                                    </div>
                                    <div className="media-support-info ml-3">
                                      <h6>Atlanta</h6>
                                      <p className="mb-0">Atlanta City</p>
                                    </div>
                                    <div className="edit-relation">
                                      <a href="/#">
                                        <i className="ri-edit-line mr-2" />
                                        Edit
                                      </a>
                                    </div>
                                  </li>
                                </ul>
                                <h4 className="mt-3 mb-3">
                                  Autre Places Lived
                                </h4>
                                <ul className="suggestions-lists m-0 p-0">
                                  <li className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid">
                                      <i className="ri-add-fill" />
                                    </div>
                                    <div className="media-support-info ml-3">
                                      <h6>Add Place</h6>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="details"
                                role="tabpanel"
                              >
                                <h4 className="mb-3">About You</h4>
                                <p>
                                  Hi, I’m Bni, I’m 26 and I work as a Web
                                  Designer for the iqonicdesign.
                                </p>
                                <h4 className="mt-3 mb-3">Autre Name</h4>
                                <p>Bini Rock</p>
                                <h4 className="mt-3 mb-3">Favorite Quotes</h4>
                                <p>
                                  Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry. Lorem Ipsum
                                  has been the industry's standard dummy text
                                  ever since the 1500s
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="friends" role="tabpanel">
                    <div className="iq-card">
                      <div className="iq-card-body">
                        <h2>Friends</h2>
                        <div className="friend-list-tab mt-2">
                          <ul className="nav nav-pills d-flex align-items-center justify-content-left friend-list-items p-0 mb-2">
                            <li>
                              <a
                                className="nav-link active"
                                data-toggle="pill"
                                href="/#all-friends"
                              >
                                All Friends
                              </a>
                            </li>
                            <li>
                              <a
                                className="nav-link"
                                data-toggle="pill"
                                href="/#recently-add"
                              >
                                Recently Added
                              </a>
                            </li>
                            <li>
                              <a
                                className="nav-link"
                                data-toggle="pill"
                                href="/#closefriends"
                              >
                                Close friends
                              </a>
                            </li>
                            <li>
                              <a
                                className="nav-link"
                                data-toggle="pill"
                                href="/#home"
                              >
                                Home/Town
                              </a>
                            </li>
                            <li>
                              <a
                                className="nav-link"
                                data-toggle="pill"
                                href="/#following"
                              >
                                Following
                              </a>
                            </li>
                          </ul>
                          <div className="tab-content">
                            <div
                              className="tab-pane fade active show"
                              id="all-friends"
                              role="tabpanel"
                            >
                              <div className="iq-card-body p-0">
                                <div className="row">
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/05.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Petey Cruiser</h5>
                                            <p className="mb-0">15 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton01"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton01"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/06.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Anna Sthesia</h5>
                                            <p className="mb-0">50 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton02"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton02"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/07.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Paul Molive</h5>
                                            <p className="mb-0">10 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton03"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton03"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/08.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Gail Forcewind</h5>
                                            <p className="mb-0">20 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton04"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton04"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/09.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Paige Turner</h5>
                                            <p className="mb-0">12 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton05"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton05"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/10.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>b Frapples</h5>
                                            <p className="mb-0">6 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton06"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton06"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/13.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Walter Melon</h5>
                                            <p className="mb-0">30 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton07"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton07"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/14.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Barb Ackue</h5>
                                            <p className="mb-0">14 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton08"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton08"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/15.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Buck Kinnear</h5>
                                            <p className="mb-0">16 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton09"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton09"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/16.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Ira Membrit</h5>
                                            <p className="mb-0">22 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton10"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton10"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/17.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Shonda Leer</h5>
                                            <p className="mb-0">10 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton11"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton11"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/18.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>ock Lee</h5>
                                            <p className="mb-0">18 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton12"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton12"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/19.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Maya Didas</h5>
                                            <p className="mb-0">40 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton13"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton13"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/05.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Rick O'Shea</h5>
                                            <p className="mb-0">50 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton14"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton14"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/06.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Pete Sariya</h5>
                                            <p className="mb-0">5 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton15"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton15"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/07.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Monty Carlo</h5>
                                            <p className="mb-0">2 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton16"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton16"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/08.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Sal Monella</h5>
                                            <p className="mb-0">0 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton17"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton17"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/09.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Sue Vaneer</h5>
                                            <p className="mb-0">25 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton18"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton18"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/10.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Cliff Hanger</h5>
                                            <p className="mb-0">18 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton19"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton19"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/05.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Barb Dwyer</h5>
                                            <p className="mb-0">23 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton20"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton20"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/06.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Terry Aki</h5>
                                            <p className="mb-0">8 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton21"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton21"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/13.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Cory Ander</h5>
                                            <p className="mb-0">7 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton22"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton22"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/14.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Robin Banks</h5>
                                            <p className="mb-0">14 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton23"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton23"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/15.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Jimmy Changa</h5>
                                            <p className="mb-0">10 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton24"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton24"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/16.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Barry Wine</h5>
                                            <p className="mb-0">18 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton25"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton25"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/17.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Poppa Cherry</h5>
                                            <p className="mb-0">16 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton26"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton26"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/18.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Zack Lee</h5>
                                            <p className="mb-0">33 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton27"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton27"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/19.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Don Stairs</h5>
                                            <p className="mb-0">15 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton28"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton28"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/05.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Peter Pants</h5>
                                            <p className="mb-0">12 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton29"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton29"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/06.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Hal Appeno </h5>
                                            <p className="mb-0">13 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton30"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton30"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="tab-pane fade"
                              id="recently-add"
                              role="tabpanel"
                            >
                              <div className="iq-card-body p-0">
                                <div className="row">
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/07.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Otto Matic</h5>
                                            <p className="mb-0">4 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton31"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton31"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/08.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Moe Fugga</h5>
                                            <p className="mb-0">16 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton32"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton32"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/09.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Tom Foolery</h5>
                                            <p className="mb-0">14 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton33"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton33"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/10.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Bud Wiser</h5>
                                            <p className="mb-0">16 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton34"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton34"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/15.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Polly Tech</h5>
                                            <p className="mb-0">10 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton35"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton35"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/16.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Holly Graham</h5>
                                            <p className="mb-0">8 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton36"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton36"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/17.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Tara Zona</h5>
                                            <p className="mb-0">5 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton37"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton37"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/18.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Barry Cade</h5>
                                            <p className="mb-0">20 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton38"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton38"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="tab-pane fade"
                              id="closefriends"
                              role="tabpanel"
                            >
                              <div className="iq-card-body p-0">
                                <div className="row">
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/19.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Bud Wiser</h5>
                                            <p className="mb-0">32 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton39"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton39"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/05.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Otto Matic</h5>
                                            <p className="mb-0">9 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton40"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton40"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/06.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Peter Pants</h5>
                                            <p className="mb-0">2 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton41"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton41"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/07.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Zack Lee</h5>
                                            <p className="mb-0">15 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton42"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton42"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/08.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Barry Wine</h5>
                                            <p className="mb-0">36 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton43"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton43"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/09.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Robin Banks</h5>
                                            <p className="mb-0">22 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton44"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton44"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/10.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Cory Ander</h5>
                                            <p className="mb-0">18 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton45"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton45"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/15.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Moe Fugga</h5>
                                            <p className="mb-0">12 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton46"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton46"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/16.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Polly Tech</h5>
                                            <p className="mb-0">30 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton47"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton47"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/17.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Hal Appeno</h5>
                                            <p className="mb-0">25 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton48"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton48"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="tab-pane fade"
                              id="home"
                              role="tabpanel"
                            >
                              <div className="iq-card-body p-0">
                                <div className="row">
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/18.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Paul Molive</h5>
                                            <p className="mb-0">14 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton49"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton49"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/19.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Paige Turner</h5>
                                            <p className="mb-0">8 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton50"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton50"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/05.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Barb Ackue</h5>
                                            <p className="mb-0">23 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton51"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton51"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/06.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Ira Membrit</h5>
                                            <p className="mb-0">16 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton52"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton52"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/07.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Maya Didas</h5>
                                            <p className="mb-0">12 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton53"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton53"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="tab-pane fade"
                              id="following"
                              role="tabpanel"
                            >
                              <div className="iq-card-body p-0">
                                <div className="row">
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/05.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Maya Didas</h5>
                                            <p className="mb-0">20 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton54"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton54"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/06.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Monty Carlo</h5>
                                            <p className="mb-0">3 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton55"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton55"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/07.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Cliff Hanger</h5>
                                            <p className="mb-0">20 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton56"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton56"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/08.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>b Ackue</h5>
                                            <p className="mb-0">12 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton57"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton57"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/09.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Bob Frapples</h5>
                                            <p className="mb-0">12 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton58"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton58"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/10.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Anna Mull</h5>
                                            <p className="mb-0">6 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton59"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton59"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/15.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>ry Wine</h5>
                                            <p className="mb-0">15 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton60"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton60"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/16.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Don Stairs</h5>
                                            <p className="mb-0">12 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton61"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton61"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/17.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Peter Pants</h5>
                                            <p className="mb-0">8 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton62"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton62"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/18.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Polly Tech</h5>
                                            <p className="mb-0">18 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton63"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton63"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/19.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Tara Zona</h5>
                                            <p className="mb-0">30 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton64"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton64"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/05.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Arty Ficial</h5>
                                            <p className="mb-0">15 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton65"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton65"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/06.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Bill Emia</h5>
                                            <p className="mb-0">25 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton66"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton66"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/07.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Bill Yerds</h5>
                                            <p className="mb-0">9 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton67"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton67"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-lg-6 mb-3">
                                    <div className="iq-friendlist-block">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <a href="/#">
                                            <img
                                              src={require("./images/user/08.jpg")}
                                              alt="profile-img"
                                              className="img-fluid"
                                            />
                                          </a>
                                          <div className="friend-info ml-3">
                                            <h5>Matt Innae</h5>
                                            <p className="mb-0">19 friends</p>
                                          </div>
                                        </div>
                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                          <div className="dropdown">
                                            <span
                                              className="dropdown-toggle btn btn-secondary mr-2"
                                              id="dropdownMenuButton68"
                                              data-toggle="dropdown"
                                              aria-expanded="true"
                                              role="button"
                                            >
                                              <i className="ri-check-line mr-1 text-white font-size-16" />{" "}
                                              Friend
                                            </span>
                                            <div
                                              className="dropdown-menu dropdown-menu-right"
                                              aria-labelledby="dropdownMenuButton68"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Get Notification
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Close Friend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfollow
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Unfriend
                                              </a>
                                              <a
                                                className="dropdown-item"
                                                href="/#"
                                              >
                                                Block
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Wrapper END */}
        {/* Footer */}

        {/* Footer END */}
        {/* Optional JavaScript */}
        {/* jQuery first, then Popper.js, then Bootstrap JS */}
        {/* Appear JavaScript */}
        {/* Countdown JavaScript */}
        {/* Counterup JavaScript */}
        {/* Wow JavaScript */}
        {/* Apexcharts JavaScript */}
        {/* Slick JavaScript */}
        {/* Select2 JavaScript */}
        {/* Owl Carousel JavaScript */}
        {/* Magnific Popup JavaScript */}
        {/* Smooth Scrollbar JavaScript */}
        {/* lottie JavaScript */}
        {/* am core JavaScript */}
        {/* am charts JavaScript */}
        {/* am animated JavaScript */}
        {/* am kelly JavaScript */}
        {/* am maps JavaScript */}
        {/* am worldLow JavaScript */}
        {/* Chart Custom JavaScript */}
        {/* Custom JavaScript */}
        {toggleSettings ? (
          <Card className="theme-settings">
            <Card.Body className="pt-4">
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
                onClick={(e) => saveit(e)}
                variant="primary"
                className="mb-3 w-100"
              >
                <FontAwesomeIcon icon={faDownload} className="me-1" />{" "}
                Enregistrer les changements
              </Button>
              <div className="d-flex justify-content-center"></div>
            </Card.Body>
          </Card>
        ) : (
          <></>
        )}
      </>
    </div>
  );
}

export default App;
