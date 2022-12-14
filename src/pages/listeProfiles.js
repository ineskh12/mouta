import React, { useState, useEffect } from "react";
import {
  faEdit,
  faEye,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import {
  Col,
  Nav,
  Card,
  Table,
  // Pagination,
  Breadcrumb,
  Form,
  InputGroup,
  Button
} from "@themesberg/react-bootstrap";
import Pagination from './pagination';
import './pagination.css'
import jwt_decode from "jwt-decode";
import moment from "moment-timezone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Paper, TableContainer } from "@mui/material";

const token = JSON.parse(localStorage.getItem("token"));
let decoded = null;
if (token !== null) decoded = jwt_decode(token);

export default function AllProfiles() {

  const { t } = useTranslation();

  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (decoded.role === "admin") {
          const { data: response } = await axios.get(
            "http://skiesbook.com:3000/api/v1/users/getprofiles/" + decoded?.graveyardId
          );
          setData(response);
        }
        else {
          const { data: response } = await axios.get(
            "http://skiesbook.com:3000/api/v1/profile"
          );
          setData(response);


        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  //console.log(currentPosts);
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber)
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{
              className: "breadcrumb-dark breadcrumb-transparent",
            }}
          ></Breadcrumb>
          <h4>{t('list of cemetery profiles')}</h4>
          {/*           <p className="mb-0">Your web analytics dashboard template.</p>

 */}

        </div>



      </div>
      <div className="d-block mb-4 mb-md-2">
        <Col xs={8} md={6} lg={3} xl={4} >
          <InputGroup>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <Form.Control type="text" placeholder={t("search")} />
          </InputGroup>
        </Col>
      </div>
      <Card border="light" className="table-wrapper shadow-sm">
        <Card.Body className="p-0">
          <TableContainer component={Paper}>
            <Table className="table-centered table-nowrap rounded mb-0">
              <thead className="thead-light">
                <tr>
                  <th className="border-0">#</th>
                  <th className="border-0">{t('full_name')}</th>
                  <th className="border-0">{t('date_of_birth')}</th>
                  <th className="border-0">{t('Date of death')}</th>
                  <th className="border-0">{t('Profile creation date')}</th>
                  <th className="border-0">{t('reference_email')}</th>
                  <th className="border-0">{t('location')}</th>
                  <th className="border-0">{t('actions')}</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts?.map((dm, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td className="fw-bold">
                      {dm?.profileName} {dm?.profileLastName}
                    </td>
                    <td>{moment(dm?.profileDatebirth).format("YYYY-MM-DD")}</td>
                    <td>{moment(dm?.profileDatedeath).format("YYYY-MM-DD")}</td>
                    <td>{moment(dm?.createdAt).format("YYYY-MM-DD")}</td>
                    <td>{dm?.profileEmail}</td>
                    <td>{dm?.position?.code}</td>

                    <td>

                      <Button
                        onClick={() => history.push("/prof/" + dm._id)}
                        color="primary"
                        size="sm"
                        className="m-1"
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </Button>
                      <Button
                        onClick={() => history.push("/editprof/" + dm._id)}
                        size="sm"
                        color="secondary"
                        className="m-1"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>


          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
            <Nav>



              <Pagination
                className="pagination"
                postsPerPage={postsPerPage}
                totalPosts={data.length}
                paginate={paginate}
              /></Nav>
          </Card.Footer>
        </Card.Body>
      </Card>
    </>
  );
}
