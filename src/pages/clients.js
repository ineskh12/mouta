import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faSearch,
  faPlus,
  faEye,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

import {
  Col,
  Nav,
  Form,
  InputGroup,
  Card,
  Image,
  Table,
  Breadcrumb,
  Dropdown,
  Button,
  ButtonGroup,
} from "@themesberg/react-bootstrap";
import Pagination from "./pagination";
import "./pagination.css";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

import jwt_decode from "jwt-decode";
import { useTranslation } from "react-i18next";
import { Paper, TableContainer } from "@mui/material";

const Getadmins = () => {
  const { t } = useTranslation();

  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const token = JSON.parse(localStorage.getItem("token"));
  let decoded = null;
  if (token !== null) decoded = jwt_decode(token);

  const fetchData = async () => {
    setLoading(true);
    console.log(decoded.role);
    if (decoded.role === "sales" || decoded.role === "help") {
      try {
        const { data: response } = await axios.get(
          "http://skiesbook.com:3000/api/v1/users/getadminsstaff/" +
          decoded.userId
        );
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
    } else {
      try {
        const { data: response } = await axios.get(
          "http://skiesbook.com:3000/api/v1/users/getadmins"
        );
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const deleteClient = async (dm) => {
    try {
      Swal.fire({
        title: t("do_you_want_to_Delete_this_user"),
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: t("delete"),
        denyButtonText: t("dont_delete"),
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          setData(data.filter((c) => c._id !== dm._id));
          await axios
            .delete("http://skiesbook.com:3000/api/v1/users/" + dm._id)
            .then(Swal.fire(t("user_deleted!"), "", "success"));
        } else if (result.isDenied) {
          Swal.fire(t("changes_are_not_saved"), "", "info");
        }
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{
              className: "breadcrumb-dark breadcrumb-transparent",
            }}
          ></Breadcrumb>
          <h4>{t("list_of_cemeteries")}</h4>
          {/*           <p className="mb-0">Your web analytics dashboard template.</p>

 */}
        </div>

        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Dropdown.Toggle
              onClick={(e) => history.push("/AdminAdd")}
              as={Button}
              variant="primary"
              size="sm"
              className="me-2"
            >
              <FontAwesomeIcon icon={faPlus} className="me-2" />
              {t("new_cemetery")}
            </Dropdown.Toggle>
          </ButtonGroup>
        </div>
      </div>
      <div className="d-block mb-4 mb-md-2">
        <Col xs={8} md={6} lg={3} xl={4}>
          <InputGroup>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <Form.Control type="text" placeholder={t("search")} />
          </InputGroup>
        </Col>
      </div>
      <Card border="light" className="shadow-sm mb-4">
        <Card.Body className="p-0">
          <TableContainer component={Paper}>
            <Table
              responsive
              className="table-centered table-nowrap rounded mb-0"
            >
              <thead className="thead-light">
                <tr>
                  <th className="border-0"></th>
                  <th className="border-0">{t("cemetery_name")}</th>
                  <th className="border-0">{t("responsible")}</th>
                  <th className="border-0">{t("phone")}</th>
                  <th className="border-0">{t("address")}</th>
                  <th className="border-0">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts?.map((dm, index) => (
                  <>
                    <ReactTooltip />

                    <tr>
                      <td>
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
                                "http://skiesbook.com:3000/uploads/" +
                                dm.userimage
                              }
                              className="card-img-top rounded-circle border-white"
                              onClick={() =>
                                history.push(
                                  "/GraveyardsProfiles/" + dm?.graveyard?._id
                                )
                              }
                            />
                          </div>
                        </Card.Link>
                      </td>
                      <td>
                        <h6
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            history.push(
                              "/GraveyardsProfiles/" + dm?.graveyard?._id
                            )
                          }
                        >
                          {dm?.graveyard?.name}
                        </h6>
                      </td>

                      <td className="fw-bold">
                        {dm.name + " "} {dm.lastn}
                      </td>
                      <td>{dm?.phone}</td>
                      <td data-tip={dm?.graveyard?.address}>
                        {dm?.graveyard?.address.substring(0, 30)}...
                      </td>
                      <td>
                        <Button
                          className="m-1"
                          onClick={() =>
                            history.push(
                              "/GraveyardsProfiles/" + dm?.graveyard?._id
                            )
                          }
                          variant="primary"
                          size="sm"
                        >
                          <FontAwesomeIcon icon={faEye} />{" "}
                        </Button>
                        <Button
                          className="m-1"
                          onClick={() => history.push("/editgrave/" + dm?._id)}
                          variant="primary"
                          size="sm"
                        >
                          <FontAwesomeIcon icon={faEdit} />{" "}
                        </Button>
                        <Button
                          className="m-1"
                          onClick={(e) => {
                            deleteClient(dm);
                          }}
                          variant="primary"
                          size="sm"
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />{" "}
                        </Button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          </TableContainer>
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

      {/*}
      <div className="center">
        <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerClusterGroup>
            {data?.map((dm, index) => (
              <Marker
                key={index}
                icon={icon}
                position={[dm?.graveyard?.Lat, dm?.graveyard?.Lng]}
              >
                <Popup>
                  <div
                    className="position-relative"
                    style={{ alignItems: "center" }}
                  >
                    <div></div>
                    <div>
                      <span
                        style={{
                          backgroundColor: "#3ba266",
                          fontSize: 18,
                          marginLeft: 100,
                        }}
                        color="#3ba266"
                        className="badge badge-success"
                      >
                        {dm?.graveyard?.name}
                      </span>
                    </div>
                  </div>
                  <Card.Body>
                    <Card.Subtitle
                      style={{ alignItems: "center", width: "150px" }}
                      className="mb-1"
                    >
                      {dm.Location}
                    </Card.Subtitle>
                    <Card.Text className="text-muted text-small mb-0 font-weight-light">
                      Address : {dm.graveyard?.address}
                    </Card.Text>
                    <Card.Text className="text-muted text-small mb-0 font-weight-light">
                      Responsable : {dm?.name}
                    </Card.Text>
                  </Card.Body>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
        ,
      </div>
      {*/}
    </>
  );
};

export default Getadmins;
