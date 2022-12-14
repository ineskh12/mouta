import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faTrashAlt,
  faEllipsisH,
  faSearch,
  faCog,
  faCheck,
  faPlus,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "./pagination";
import "./pagination.css";
import {
  Col,
  Row,
  Card,
  Image,
  Nav,
  Dropdown,
  Button,
  ButtonGroup,
  InputGroup,
  Form,
  Breadcrumb,
  Modal,
} from "@themesberg/react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import moment from "moment-timezone";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/bootstrap-react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/fr';
import 'dayjs/locale/es';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import cookies from "js-cookie";
import Autocomplete from "@mui/material/Autocomplete";
import { positions } from "@mui/system";

const GetClient = () => {
  const { t } = useTranslation();

  const currentLanguageCode = cookies.get("i18next") || "en";
  const [locale, setLocale] = React.useState(currentLanguageCode);

  useEffect(() => {
    setLocale(currentLanguageCode)
  }, [currentLanguageCode]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const token = JSON.parse(localStorage.getItem("token"));
  let decoded = null;
  if (token !== null) decoded = jwt_decode(token);

  let graveyardId;
  let { id } = useParams();

  if (decoded.role === "admin") {
    graveyardId = decoded?.graveyardId;
  } else if (decoded.role === "gadmin") {
    graveyardId = decoded?.graveyardId;
  } else graveyardId = id;

  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [grave, setGrave] = useState({});

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: response } = await axios.get(
        "http://www.skiesbook.com:3000/api/v1/users/getclients/" + graveyardId
      );
      setData(response);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };

  async function getLocalWeather() {
    try {
      const { data: response } = await axios.get(
        "http://www.skiesbook.com:3000/api/v1/graveyard/" + graveyardId
      );
      setGrave(response);
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    fetchData();
    getLocalWeather();
  }, []);

  const [showDefault, setShowDefault] = useState(false);
  const [clientMail, setMail] = useState("");
  const [client, setClient] = useState("");
  const [alive, setAlive] = useState(false);
  const [emplacement , setEmplacement] = useState([]);

 async function setModal(mail, clientid) {
    setShowDefault(true);
    setMail(mail);
    setClient(clientid);
    axios.get("http://www.skiesbook.com:3000/api/v1/graveyard/getemplacements/" + clientid).then((response) => {
      setEmplacement(response.data);
    });
  }

  const handleClose = () => setShowDefault(false);

  const [inputList, setInputList] = useState({
    profileName: "",
    profileLastName: "",
    profileDatebirth: null,
    profileDatedeath: null,
    gender: "F",
    cords: "",
    modeDeath: "I",
    profileEmail: clientMail,
    hometown: "",
    graveyard: decoded.graveyardId,
    banner: "banner.jpg",
    profileImage: "avatar.jpg",
    client: "",
    vendor: "",
    alive: false,
    position: {},
  });

  async function ajouterProfil(e) {
    e.preventDefault();
    inputList.client = client;
    inputList.vendor = decoded.userId;
    inputList.profileEmail = clientMail;

    Swal.fire({
      title: t('Add a new profile'),
      showCancelButton: true,
      confirmButtonText: `${t('yes')} !`,
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        return await axios
          .post("http://www.skiesbook.com:3000/api/v1/users/addinstance", inputList)
          .then((result) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: t('profile_added_successfully'),
              showConfirmButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                history.go(0);
              }
            });
          })
          .catch((error) => {
            Swal.showValidationMessage(`${t('error')}: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  //console.log(currentPosts);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  async function handlePosition(pos) {
    const position = emplacement.find((e) => e.code === pos);

    setInputList({
      ...inputList,
      position: position,
    });

  }

  return (
    <>
      {/*     <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Button variant="outline-primary" size="sm">
              Share
            </Button>
            <Button variant="outline-primary" size="sm">
              Export
            </Button>
          </ButtonGroup>
        </div>
      </div> */}
      <Modal
        as={Modal.Dialog}
        className="d-flex justify-content-center"
        show={showDefault}
        size="lg"
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title className="h6">Ajouter un nouveau profil</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Form onSubmit={(e) => ajouterProfil(e)}>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>{t('lastname')}</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="profileName"
                    onChange={(e) =>
                      setInputList({
                        ...inputList,
                        profileLastName: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="lastName">
                  <Form.Label>{t('firstname')}</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="profileLastName"
                    onChange={(e) =>
                      setInputList({
                        ...inputList,
                        profileName: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col md={4} className="mb-3">
                <Form.Group id="birthday">
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                    <Stack spacing={3}>
                      <DatePicker
                        // inputFormat="dd/MM/yyyy"
                        disableFuture
                        label={t('date_of_birth')}
                        openTo="year"
                        views={["year", "month", "day"]}
                        onChange={(e) =>
                          setInputList({ ...inputList, profileDatebirth: e })
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Stack>
                  </LocalizationProvider>
                </Form.Group>
              </Col>

              <Col md={2} className="mb-3">
             
                <Form.Group id="checkbox">
                  <Form.Check
                    type="checkbox"
                    value={alive}
                    label={t('D??c??d??')}
                    onChange={(e) =>
                      setAlive(!alive)
                    }
                  />
                </Form.Group>
              </Col>

              <Col md={4} className="mb-3">
                <Form.Group hidden={alive} id="birthday">
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                    <Stack spacing={3}>
                      <DatePicker
                        // inputFormat="dd/MM/yyyy"
                        disableFuture
                        openTo="year"
                        views={["year", "month", "day"]}
                        onChange={(e) =>
                          setInputList({ ...inputList, profileDatedeath: e })
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Stack>
                  </LocalizationProvider>
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                    <Form.Group id="ville">
                      <Form.Label>{t("location")}</Form.Label>
                      <Autocomplete
                        id="position"
                        options={emplacement.map(
                          (option) => option?.code
                        )}
                        onChange={(e, value) =>
                          {
                         handlePosition (value)
                        }
                        
                        }
                        renderInput={(params) => (
                          <TextField {...params} label={t("location")} />
                        )}
                      />
                    </Form.Group>
                  </Col>

              <Col md={6} className="mb-3">
                <Form.Group id="gender">
                  <Form.Label>{t('gender')}</Form.Label>
                  <Form.Select
                    defaultValue="F"
                    name="gender"
                    onChange={(e) =>
                      setInputList({ ...inputList, gender: e.target.value })
                    }
                  >
                    <option value="F">{t('women')}</option>
                    <option value="M">{t('man')}</option>
                    <option value="I">{t('Undetermined')}</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="Emplacement du fun??railles">
                  <Form.Label>{t('Location of funeral')}</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="cords"
                    onChange={(e) =>
                      setInputList({ ...inputList, cords: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group id="fun??railles">
                  <Form.Label>{t('Funeral arrangements')}</Form.Label>
                  <Form.Select
                    defaultValue="I"
                    name="modeDeath"
                    onChange={(e) =>
                      setInputList({ ...inputList, modeDeath: e.target.value })
                    }
                  >
                    <option value="I">{t('Burial')}</option>
                    <option value="C">{t('Cremation')}</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="emal">
                  <Form.Label>{t('reference_email')}</Form.Label>
                  <Form.Control
                    required
                    name="profileEmail"
                    type="email"
                    value={clientMail}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="ville">
                  <Form.Label>{t('hometown')}</Form.Label>
                  <Form.Control
                    required
                    name="hometown"
                    type="text"
                    onChange={(e) =>
                      setInputList({ ...inputList, hometown: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              {t('add')}{" "}
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

      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{
              className: "breadcrumb-dark breadcrumb-transparent",
            }}
          ></Breadcrumb>

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
                {t('back')}
              </Dropdown.Toggle>
            </ButtonGroup>
          </div>
          <h4>{t('List of Cemetery Clients')} {grave?.name}</h4>

          {/*           <p className="mb-0">Your web analytics dashboard template.</p>

 */}
        </div>
        {decoded.role === "admin" ? (
          <div className="btn-toolbar mb-2 mb-md-0">
            <ButtonGroup>
              <Dropdown.Toggle
                onClick={(e) => history.push("/adminaddclient")}
                as={Button}
                variant="primary"
                size="sm"
                className="me-2"
              >
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                {t("New customer")}
              </Dropdown.Toggle>
            </ButtonGroup>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="table-settings mb-4">
        <Row className="align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control type="text" placeholder={t("search")} />
            </InputGroup>
          </Col>
          <Col>
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle
                split
                as={Button}
                variant="link"
                className="text-dark m-0 p-0"
              >
                <span className="icon icon-sm icon-gray">
                  <FontAwesomeIcon icon={faCog} />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right">
                <Dropdown.Item className="fw-bold text-dark">
                  {t('show')}
                </Dropdown.Item>
                <Dropdown.Item className="d-flex fw-bold">
                  10{" "}
                  <span className="icon icon-small ms-auto">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                <Dropdown.Item className="fw-bold">30</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>
      <Card border="light" className="shadow-sm mb-4">
        <Card.Body className="pb-0">
          <CollapsibleTable />
        </Card.Body>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination
              className="pagination"
              postsPerPage={postsPerPage}
              totalPosts={data.length}
              paginate={paginate}
            />
          </Nav>
        </Card.Footer>
      </Card>
    </>
  );

  function createData(name, calories, fat, carbs, protein, price) {
    return {
      name,
      calories,
      fat,
      carbs,
      protein,
      price,
      history: [
        {
          date: "2020-01-05",
          customerId: "11091700",
          amount: 3,
        },
        {
          date: "2020-01-02",
          customerId: "Anonymous",
          amount: 1,
        },
      ],
    };
  }

  function Rows(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            <Card.Link href="#" className="text-primary fw-bold">
              <div className="user-avatar lg-avatar me-4">
                <Image
                  style={{
                    flex: 1,
                    width: "50px",
                    height: "50px",
                    resizeMode: "contain",
                  }}
                  src={"http://www.skiesbook.com:3000/uploads/" + row?.userimage}
                  className="card-img-top rounded-circle border-white"
                />
              </div>
            </Card.Link>
          </TableCell>
          <TableCell align="right">
            {row?.name} {row?.lastn}
          </TableCell>
          <TableCell align="right"> {row?.email}</TableCell>
          <TableCell align="right">{row?.phone}</TableCell>
          <TableCell align="right">{row?.profiles.length}</TableCell>
          <TableCell align="right">
            <CDropdown className="dropleft" direction="dropstart">
              <CDropdownToggle color="transparant">
                <span className="icon icon-sm">
                  <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                </span>
              </CDropdownToggle>
              <CDropdownMenu style={{ left: "50px;" }} className="float-left">
                <CDropdownItem
                  onClick={(e) => {
                    history.push("/editclient/" + row?._id);
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> Editer{" "}
                </CDropdownItem>

                <Dropdown.Item onClick={() => setModal(row?.email, row?._id)}>
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  {t('Add a profile')}
                </Dropdown.Item>
              </CDropdownMenu>
            </CDropdown>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  {t('Profils')}
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>{t('photo')}</TableCell>
                      <TableCell>{t('full_name')}</TableCell>
                      <TableCell align="Left">{t('Date of death')}</TableCell>
                      <TableCell align="right">{t("Profile creation")}</TableCell>
                      <TableCell align="right">{t('actions')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row?.profiles.map((profile) => (
                      <TableRow key={profile._id}>
                        <TableCell align="right">
                          <Card.Link href="#" className="text-primary fw-bold">
                            <div className="user-avatar lg-avatar me-4">
                              <Image
                                style={{
                                  flex: 1,
                                  width: "50px",
                                  height: "50px",
                                  resizeMode: "contain",
                                }}
                                src={
                                  "http://www.skiesbook.com:3000/uploads/" +
                                  profile?.profileImage
                                }
                                className="card-img-top rounded-circle border-white"
                                onClick={() =>
                                  history.push("/prof/" + profile._id)
                                }
                              />
                            </div>
                          </Card.Link>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {profile.profileName} {profile.profileLastName}
                        </TableCell>
                        <TableCell>
                          {moment(profile?.profileDatedeath).format(
                            "DD-MM-YYYY"
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {moment(profile?.createdAt).format("MM-DD-YYYY")}
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            onClick={() => history.push("/prof/" + profile._id)}
                            color="primary"
                            size="sm"
                            className="m-1"
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </Button>
                          <Button
                            onClick={() =>
                              history.push("/editprof/" + profile._id)
                            }
                            size="sm"
                            color="secondary"
                            className="m-1"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }



  function CollapsibleTable() {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>#</TableCell>
              <TableCell align="right">Client </TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">T??l??phone</TableCell>
              <TableCell align="right">Nombre de profils</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPosts?.map((row) => (
              <Rows key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
};
export default GetClient;
