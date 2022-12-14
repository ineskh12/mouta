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
} from "@themesberg/react-bootstrap";

import { CounterWidget } from "../../components/Widgets";
import { useHistory, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import moment from "moment-timezone";
import TextField from "@material-ui/core/TextField";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/fr';
import 'dayjs/locale/es';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Stack from "@mui/material/Stack";
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";
import cookies from "js-cookie";
import { Paper, TableContainer } from "@mui/material";

export default function Dashboard() {

  const currentLanguageCode = cookies.get("i18next") || "en";
  const [locale, setLocale] = React.useState(currentLanguageCode);

  useEffect(() => {
    setLocale(currentLanguageCode)
  }, [currentLanguageCode]);


  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const history = useHistory();
  const d = new Date();
  const { t } = useTranslation();
  const [formdata, setFormdata] = useState({
    startDate: moment(d).format("YYYY-MM"),
    endDate: moment(d).format("YYYY-MM-DD"),
  });

  const headers = [
    { label: "_id", key: "_id" },
    { label: "name", key: "name" },
    { label: "totalprofiles", key: "totalprofiles" },
    { label: "totalclients", key: "totalclients" },
    { label: "newprofiles", key: "newprofiles" },
  ];
  const token = JSON.parse(localStorage.getItem("token"));
  let decoded = null;
  if (token !== null) decoded = jwt_decode(token);
  async function getData() {
    try {
      const { data: response } = await axios.post(
        "http://www.skiesbook.com:3000/api/v1/graveyard/graveyardgraphcim/" + decoded.graveyardId,
        formdata
      );
      setData2(response);
    } catch (error) {
      console.error(error.message);
    }
  }
  async function Fetchdata() {
    const { data: response } = await axios.post(
      "http://www.skiesbook.com:3000/api/v1/graveyard/alluserscim/" + decoded.graveyardId,
      formdata
    );

    setData(response);
    return response;
  }

  useEffect(() => {
    Fetchdata();
    getData();
  }, []);
  const csvReport = {
    data: data2,
    headers: headers,
    filename: formdata.startDate + "-" + formdata.endDate + ".csv",
  };
  const PageVisitsTable = () => {
    const TableRow = (props) => {
      const { name, totalprofiles, totalclients, newprofiles, _id } = props;


      return (
        <tr>
          <th scope="row">{name}</th>
          <td>{totalprofiles}</td>
          <td>{newprofiles}</td>
          <td>{totalclients}</td>

          <td>
            <Button
              variant="secondary"
              size="sm"
              onClick={(e) => history.push("/singlereport/" + _id)}
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
              <h5>Les cimeti??re actifs</h5>
            </Col>
            <Col className="text-end">
              <Button variant="secondary" size="sm">
                <CSVLink {...csvReport}>Export to CSV</CSVLink>

              </Button>

            </Col>
          </Row>
        </Card.Header>
        <TableContainer component={Paper}>
          <Table responsive className="align-items-center table-flush">
            <thead className="thead-light">
              <tr>
                <th scope="col">Nom du cimeti??re</th>
                <th scope="col">Nombre profils Total</th>
                <th scope="col">Nombre profils ajout?? ce mois</th>
                <th scope="col">Nombre clients total</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data2?.map((pv) => (
                <TableRow key={`page-visit-${pv?._id}`} {...pv} />
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </Card>
    );
  };
  async function gofilter() {
    await getData();
    await Fetchdata();
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <h1>Dashboard</h1>
      </div>

      <Row className="justify-content">
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Nombre d'utilisateurs total"
            period="cimeti??res,employ??s,clients cimeti??res,employ??s cimeti??res"
            title={data?.users}
            icon={faChartLine}
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Nombre de profils total"
            title={data?.profiles}
            icon={faChartLine}
          />
        </Col>

        <Card border="light" className="shadow-sm m-3 p-3">
          <Row className="align-items-center">
            <h5>Filter par date</h5>
            <Col md={3} className="mb-3">
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                <Stack spacing={3}>
                  <DatePicker
                    disableFuture
                    label={t('from_date')}
                    openTo="day"
                    // inputFormat="dd/MM/yyyy"
                    value={formdata.startDate}
                    views={["day", "month", "year"]}
                    onChange={(e) => {
                      setFormdata({ ...formdata, startDate: e });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </Col>

            <Col md={3} className="mb-3">
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                <Stack spacing={3}>
                  <DatePicker
                    disableFuture
                    // inputFormat="dd/MM/yyyy"
                    label={t('until')}
                    value={formdata.endDate}
                    openTo="day"
                    views={["day", "month", "year"]}
                    onChange={(e) => {
                      setFormdata({ ...formdata, endDate: e });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </Col>
            <Col>
              <Button onClick={(e) => gofilter()}> {t('Apply')}</Button>
            </Col>
          </Row>
        </Card>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Nombre de profils date filtr?? par mois"
            title={data?.newCreatedProfiles?.length}
            icon={faChartLine}
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Revenue filtr?? par mois"
            title={data?.newCreatedProfiles?.length * 20 + "$"}
            period={moment(d).format("YYYY/MM")}
            icon={faCashRegister}
            iconColor="shape-tertiary"
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
