import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faCashRegister,
  faChartLine,
  faCloudUploadAlt,
  faPlus,
  faRocket,
  faTasks,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Button,
  Dropdown,
  ButtonGroup,
  Card,
  Table,
  Form,
} from "@themesberg/react-bootstrap";

import { CounterWidget } from "../../components/Widgets";
import { useHistory, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import moment from "moment-timezone";
import TextField from "@material-ui/core/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Stack from "@mui/material/Stack";
import { CSVLink } from "react-csv";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const history = useHistory();
  const d = new Date();

  const [formdata, setFormdata] = useState({
    startDate: moment(d).format("YYYY-MM"),
    endDate: moment(d).format("YYYY-MM-DD"),
  });
  const [first, setfirst] = useState({});


  const headers = [
    { label: "_id", key: "_id" },
    { label: "name", key: "name" },
    { label: "totalprofiles", key: "totalprofiles" },
    { label: "totalclients", key: "totalclients" },
    { label: "newprofiles", key: "newprofiles" },
  ];

  async function getstaff() {
    try {
      const { data: response } = await axios.get(
        "http://skiesbook.com:3000/api/v1/users/getastaff"
        
      );
      setData2(response);
      setfirst(response[0]);

    } catch (error) {
      console.error(error.message);
    }
  }
  const [formData1, setFormData1] = useState({
    name: "",
});
  async function getData() {
    try {
      let id = formData1.name
      if (formData1.name === "") {
      id = first._id;
      }
      console.log(id)
      const { data: response } = await axios.post(
        "http://skiesbook.com:3000/api/v1/users/staffreporting/"+id,
        formdata
      );
      console.log(response)
      setData(response);
    } catch (error) {
      console.error(error.message);
    }
  }




  useEffect(() => {
    getstaff();

  }, []);
  const csvReport = {
    data: data2,
    headers: headers,
    filename: formdata.startDate + "-" + formdata.endDate + ".csv",
  };
  const PageVisitsTable = () => {
    const TableRow = (props) => {
      const { graveyard, clients, profiles, _id } = props;
     

      return (
        <tr>
          <th scope="row">{graveyard?.name}</th>
          <td>{profiles?.length}</td>
          <td>{clients?.length}</td>
          <td>{clients?.length}</td>

          <td>
            <Button
              variant="secondary"
              size="sm"
              onClick={(e) => history.push("/singlereport/"+graveyard?._id)}
            >
              Detail
            </Button>
          </td>
        </tr>
      );
    };

    return (
      <Card border="light" className="shadow-sm">
        <Card.Header>
          <Row className="align-items-center">
            <Col>
              <h5>Les cimetières actifs</h5>
            </Col>
            <Col className="text-end">
              <Button variant="secondary" size="sm">
              <CSVLink {...csvReport}>Export to CSV</CSVLink>

              </Button>

            </Col>
          </Row>
        </Card.Header>
        <Table responsive className="align-items-center table-flush">
          <thead className="thead-light">
            <tr>
              <th scope="col">Nom du cimetière</th>
              <th scope="col">Nombre profils Total</th>
              <th scope="col">Nombre profils ajouté ce mois</th>
              <th scope="col">Nombre clients total</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.clients?.map((pv) => (
              <TableRow key={`page-visit-${pv?._id}`} {...pv} />
            ))}
          </tbody>
        </Table>
      </Card>
    );
  };
  async function gofilter() {
    await getData();
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <h1>Dashboard vente staff</h1>
      </div>

      <Row className="justify-content">
       
        <Card border="light" className="shadow-sm m-3 p-3">
          <Row className="align-items-center">
            <h5>Filter par date et employé</h5>
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
            <Col md={3} className="mb-3">
                <Form.Group id="name">
                  <Form.Label>Employé</Form.Label>

                  <Form.Control
                    as="select"
                    name="searchId"
                 
                    onChange={(e) =>
                      setFormData1({ ...formData1, name: e.target.value })
                    }
                  >
                    {data2?.map((account) => (
                      <option key={account?._id} value={account?._id}>
                        {account?.name} {account?.lastn}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                      
              </Col>
            <Col>
              <Button onClick={(e) => gofilter()}> Filter</Button>
            </Col>
          </Row>
        </Card>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Nombre de clients date filtré par mois"
            title={data?.clients?.length}
            icon={faChartLine}
            period={moment(d).format("YYYY/MM")}

          />
        </Col>


      </Row>

      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={12} className="mb-4">
              <Row>
                <Col xs={12} className="mb-4">
                  <PageVisitsTable />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
