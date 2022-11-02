import React, { useState, useEffect, useRef } from "react";
import {
  faArrowLeft,
  faChartLine,
  faEdit,
  faEllipsisH,
  faEye,
  faFilter,
  faPrint,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Nav,
  Card,
  Table,
  Pagination,
  Breadcrumb,
  Form,
  InputGroup,
  Row,
  Toast,
  Button,
  ButtonGroup,
  Dropdown,
} from "@themesberg/react-bootstrap";
import jwt_decode from "jwt-decode";
import moment from "moment-timezone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/bootstrap-react";
import TextField from "@material-ui/core/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Stack from "@mui/material/Stack";
import { CounterWidget } from "../../components/Widgets";
import logo_colored from "../../assets/img/logo_colored.png";
import { useReactToPrint } from "react-to-print";
const token = JSON.parse(localStorage.getItem("token"));
let decoded = null;
if (token !== null) decoded = jwt_decode(token);

export default function AllProfiles() {
  const history = useHistory();
  const [selectedDate, handleDateChange] = React.useState([null, null]);
  const d = new Date();

  const [formdata, setFormdata] = useState({
    startDate: moment(d).format("YYYY-MM"),
    endDate: moment(d).format("YYYY-MM-DD"),
  });
  async function gofilter() {
    fetchData();
  }

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const id = decoded?.graveyardId;
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);

  const fetchData = async () => {
    try {
      const { data: response } = await axios.post(
        "http://www.skiesbook.com:3000/api/v1/users/getfiltredprofiles/" + id,
        formdata
      );
      setData(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchUser = async () => {
    try {
      const { data: response } = await axios.get(
        "http://www.skiesbook.com:3000/api/v1/users/getadminbygrave/" + id
      );
      setUser(response);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchUser();
    fetchData();
  }, []);
  const childRef = useRef();
  return (
    <>
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
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{
              className: "breadcrumb-dark breadcrumb-transparent",
            }}
          ></Breadcrumb>
          <h4>Liste des profils</h4>
          {/*           <p className="mb-0">Your web analytics dashboard template.</p>

 */}
          {/*           
    from date to date range
   

  

 */}
        </div>
      </div>
      <div className="d-block mb-4 mb-md-2">
        <Card border="light" className="shadow-sm m-3 p-3">
          <Row className="align-items-center">
            <h5>Filter par date</h5>
            <Col md={3} className="mb-3">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DatePicker
                    disableFuture
                    label="De la date"
                    openTo="year"
                    inputFormat="dd/MM/yyyy"
                    value={formdata.startDate}
                    views={["year", "month", "day"]}
                    onChange={(e) => {
                      setFormdata({ ...formdata, startDate: e });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </Col>

            <Col md={3} className="mb-3">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DatePicker
                    disableFuture
                    inputFormat="dd/MM/yyyy"
                    label="A la date"
                    value={formdata.endDate}
                    openTo="year"
                    views={["year", "month", "day"]}
                    onChange={(e) => {
                      setFormdata({ ...formdata, endDate: e });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </Col>
            <Col>
              <Button onClick={(e) => gofilter()}> Filter</Button>
            </Col>
            <Col hidden >
              <Button onClick={handlePrint}>
                <FontAwesomeIcon icon={faPrint} /> invoice
              </Button>
            </Col>
            <Col md={3}>
              <CounterWidget
                category="Nombre de profils"
                title={data?.length}
                icon={faChartLine}
              />
            </Col>
          </Row>
        </Card>
      </div>

      <Card border="light" className="table-wrapper shadow-sm">
        <Card.Body className="pt-0">
          <Table className="table-centered table-nowrap rounded mb-0">
            <thead className="thead-light">
              <tr>
                <th className="border-0">#</th>
                <th className="border-0">Nom Prénom</th>
                <th className="border-0">Date de création de profil</th>
                <th className="border-0">Date de décés</th>
                <th className="border-0">Coordonnées</th>
                <th className="border-0">Email de référence</th>
                <th className="border-0">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((dm, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td className="fw-bold">
                    {dm?.profileName} {dm?.profileLastName}
                  </td>
                  <td>{moment(dm?.createdAt).format("YYYY-MM-DD")}</td>
                  <td>{moment(dm?.profileDatedeath).format("YYYY-MM-DD")}</td>
                  <td>{dm?.cords}</td>
                  <td>{dm?.profileEmail}</td>
                  <td>
                    {" "}
                    <CDropdown className="dropleft" direction="dropstart">
                      <CDropdownToggle color="transparant">
                        <span className="icon icon-sm">
                          <FontAwesomeIcon
                            icon={faEllipsisH}
                            className="icon-dark"
                          />
                        </span>
                      </CDropdownToggle>
                      <CDropdownMenu style={{ left: "50px;" }}>
                        <CDropdownItem
                          onClick={() => history.push("/prof/" + dm._id)}
                        >
                          <FontAwesomeIcon icon={faEye} className="me-2" />{" "}
                          Details
                        </CDropdownItem>
                        <CDropdownItem
                          onClick={() => history.push("/editprof/" + dm._id)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="me-2" />{" "}
                          Editer{" "}
                        </CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
            <Nav>
              <Pagination className="mb-2 mb-lg-0">
                <Pagination.Prev>Précédent</Pagination.Prev>
                <Pagination.Item active>1</Pagination.Item>
                <Pagination.Item>2</Pagination.Item>
                <Pagination.Item>3</Pagination.Item>
                <Pagination.Item>4</Pagination.Item>
                <Pagination.Item>5</Pagination.Item>
                <Pagination.Next>Suivant</Pagination.Next>
              </Pagination>
            </Nav>
            <small className="fw-bold">
              Affichage de <b>{2}</b> sur <b>25</b> entrées
            </small>
          </Card.Footer>
        </Card.Body>
      </Card>
      <>

      <Card
        hidden
        border="light"
        className="bg-white shadow-sm mb-4 all-center"
      
      >
        <Card.Body   >
          <div className="card"  ref={componentRef}>
            <div className="card-header bg-black" />
            <div className="card-body">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <img height={"100px"}  alt="logo" src={logo_colored} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-12">
                  <ul className="list-unstyled float-start">
                      <li style={{ fontSize: 30, color: "blue" }}>Skiesbook inc.</li>
                      <li>123, Elm Street</li>
                      <li>123-456-789</li>
                      <li>mail@mail.com</li>
                    </ul>
                    <ul className="list-unstyled float-end">
                      <li style={{ fontSize: 30, color: "Black" }}>{user?.graveyard?.name}</li>
                      <li>{user?.graveyard?.address}</li>
                      <li>{user?.phone}</li>
                      <li>{user?.email}</li>
                    </ul>
                  </div>
                </div>
                <div className="row text-center">
                  <h3
                    className="text-uppercase text-center mt-3"
                    style={{ fontSize: 40 }}
                  >
                    Invoice
                  </h3>
                  <p>{user?._id}</p>
                </div>
                <Card border="light" className="table-wrapper shadow-sm">
        <Card.Body className="">
          <Table className="table-centered">
            <thead className="thead-light">
              <tr>
                <th className="border-0">#</th>
                <th className="border-0">Nom Prénom</th>
                <th className="border-0">Date de création de profil</th>
                <th className="border-0">Date de décés</th>
                <th className="border-0">Email de référence</th>
                <th className="border-0">prix</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((dm, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td className="fw-bold">
                    {dm?.profileName} {dm?.profileLastName}
                  </td>
                  <td>{moment(dm?.createdAt).format("YYYY-MM-DD")}</td>
                  <td>{moment(dm?.profileDatedeath).format("YYYY-MM-DD")}</td>
                  <td>{dm?.profileEmail}</td>
                  <td> 20 $ </td>

                </tr>
              ))}
            </tbody>
          </Table>

          
        </Card.Body>
      </Card>
                <div className="row">
                  <div className="col-xl-8">
                    <ul className="list-unstyled me-0  float-end">
                      <li>
                        <span className="me-3">Total Amount:</span>
                        <i className="fas fa-dollar-sign" /> {data?.length * 20 } $ 
                      </li>
                     
                    </ul>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-xl-8" style={{ marginLeft: 60 }}>
                    <p
                      className=""
                      style={{
                        fontSize: 30,
                        color: "blue",
                        fontWeight: 400,
                        fontFamily: "Arial, Helvetica, sans-serif",
                      }}
                    >
                      Total:
                      <span>
                        <i className="fas fa-dollar-sign" /> {data?.length * 20 } $
                      </span>
                    </p>
                  </div>
                </div>
                <div className="row mt-2 mb-5">
                  <p className="fw-bold">
                    Date: <span className="text-muted"> { moment(d).format("YYYY/MM/DD") }</span>
                  </p>
                  <p className="fw-bold mt-3">Signature:</p>
                </div>
              </div>
            </div>
            <div className="card-footer bg-black" />
          </div>
        </Card.Body>
      </Card>
    </>
    </>
  );
}
