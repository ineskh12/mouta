import React, { useState, useEffect } from "react";
import { faEdit, faEye, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Nav,
  Card,
  Table,
  Breadcrumb,
  Form,
  Button,
  Row,
  InputGroup,
  Badge,
} from "@themesberg/react-bootstrap";
import Pagination from "../pagination";
import "../pagination.css";
import moment from "moment-timezone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { faFilter } from "@fortawesome/fontawesome-free-solid";

export default function AllProfiles() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [filtreddata, setfiltredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://localhost:3000/api/v1/request"
        );
        setData(response);
        setfiltredData(response);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filtreddata.slice(indexOfFirstPost, indexOfLastPost);
  //console.log(currentPosts);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          <h4>Partner ship requests </h4>
        </div>
      </div>

      <Card border="light" className="table-wrapper shadow-sm">
        <Card.Body className="pt-0">
          <Table className="table-centered table-nowrap rounded mb-0">
            <thead className="thead-light">
              <tr>
                <th className="border-0">Nom et prenom</th>
                <th className="border-0">Pays</th>
                <th className="border-0">Adresse</th>
                <th className="border-0">Télephone</th>
                <th className="border-0">Email</th>
                <th className="border-0">Date de réalisation</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts?.map((dm, index) => (
                <tr>
                  <td className="fw-bold">
                    {dm?.name} {dm.lastn}
                  </td>

                  <td className="fw-bold">{dm?.country}</td>
                  <td className="fw-bold">
                    {dm?.address}, {dm?.ville} , {dm?.region}, {dm?.zip}
                  </td>

                  <td className="fw-bold">{dm?.phone}</td>

                  <td>
                    <span className="fw-bold">{dm?.email}</span>
                  </td>
                  <td>{moment(dm?.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                </tr>
              ))}
            </tbody>
          </Table>
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
        </Card.Body>
      </Card>
    </>
  );
}
