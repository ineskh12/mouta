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
import {
  Col,
  Row,
  Card,
  Image,
  Nav,
  Dropdown,
  Pagination,
  Button,
  ButtonGroup,
  InputGroup,
  Form,
  Breadcrumb,
} from "@themesberg/react-bootstrap";
import {  useHistory, useParams } from "react-router-dom";
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
import { useTranslation } from "react-i18next";

const Staffclient = () => {
  const { t } = useTranslation();
  const token = JSON.parse(localStorage.getItem("token"));
  let decoded = null;
  if (token !== null) decoded = jwt_decode(token);

  let graveyardId;
  let { id } = useParams();

  if (decoded.role === "gstaff") {
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
        "http://www.skiesbook.com:3000/api/v1/profile/staffgetclients/" + decoded.userId
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
        {decoded.role === "gstaff" ? (
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
              <Form.Control type="text" placeholder={t('search')} />
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
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>{t('Previous')}</Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>{t('Next')}</Pagination.Next>
            </Pagination>
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
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
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
                <CDropdownItem>
                  <FontAwesomeIcon icon={faEye} className="me-2" /> {t("List of Cemetery Clients")}
                </CDropdownItem>
                <CDropdownItem>
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> {t('Edit')}{" "}
                </CDropdownItem>
                <CDropdownItem>
                  <FontAwesomeIcon icon={faTrashAlt} className="me-2" />{" "}
                    {t("delete")}
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  {t("Profils")}
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>{t('photo')}</TableCell>
                      <TableCell>{t('full_name')}</TableCell>
                      <TableCell align="Left">{t("Date of death")}</TableCell>
                      <TableCell align="right">{t("Profile creation")}</TableCell>
                      <TableCell align="right">{t("action")}</TableCell>
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
                                  row?.profileImage
                                }
                                className="card-img-top rounded-circle border-white"
                              />
                            </div>
                          </Card.Link>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {profile.profileName} {profile.profileLastName}
                        </TableCell>
                        <TableCell>{profile?.profileDatedeath}</TableCell>
                        <TableCell align="right">
                          {moment(profile?.createdAt).format("MM-DD-YYYY")}
                        </TableCell>
                        <TableCell align="right">
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
                              // onClick={() => history.push("/defun/" + dm._id)}
                              >
                                <FontAwesomeIcon
                                  icon={faEye}
                                  className="me-2"
                                />
                                {t('Details')}
                              </Dropdown.Item>
                              <Dropdown.Item
                              /* onClick={() => history.push("/profile/" + dm._id)}*/
                              >
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  className="me-2"
                                />{" "}
                                {t('Edit')}
                              </Dropdown.Item>
                              <Dropdown.Item className="text-danger">
                                <FontAwesomeIcon
                                  icon={faTrashAlt}
                                  className="me-2"
                                />{" "}
                                {t('delete')}
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
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

  Row.propTypes = {
    row: PropTypes.shape({
      calories: PropTypes.number.isRequired,
      carbs: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          amount: PropTypes.number.isRequired,
          customerId: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        })
      ).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      protein: PropTypes.number.isRequired,
    }).isRequired,
  };

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
    createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
    createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
    createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
  ];

  function CollapsibleTable() {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>#</TableCell>
              <TableCell align="right">{t('Customer')} </TableCell>
              <TableCell align="right">{t('email')}</TableCell>
              <TableCell align="right">{t('phone')}</TableCell>
              <TableCell align="right">{t("number_of_profiles")}</TableCell>
              <TableCell align="right">{t('action')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.clients?.map((row) => (
              <Rows key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
};
export default Staffclient;
