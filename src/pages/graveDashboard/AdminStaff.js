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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/fr';
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
    startDate: moment(d).format("YYYY-MM-DD"),
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
  const token = JSON.parse(localStorage.getItem("token"));
  let decoded = null;
  if (token !== null) decoded = jwt_decode(token);
  const id = decoded?.graveyardId;

  async function getstaff() {
    try {
      const { data: response } = await axios.get(
        "http://www.skiesbook.com:3000/api/v1/users/getstaff/" + id

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
      const { data: response } = await axios.post(
        "http://www.skiesbook.com:3000/api/v1/users/gravestaffreporting/" + id,
        formdata
      );
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
      const { profileName, profileLastName, createdAt, _id } = props;


      return (
        <tr>
          <td>{_id}</td>
          <th scope="row">{profileName}{profileLastName}</th>
          <td>{moment(createdAt).format("YYYY/MM/DD hh:mm")}</td>

          <td>
            <Button
              variant="secondary"
              size="sm"
              onClick={(e) => history.push("/prof/" + _id)}
            >
              {t('Details')}
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
              <h5>{t('Profiles added')}</h5>
            </Col>
            <Col className="text-end">
              <Button variant="secondary" size="sm">
                <CSVLink {...csvReport}>{t('Export to CSV')}</CSVLink>

              </Button>

            </Col>
          </Row>
        </Card.Header>
        <TableContainer component={Paper}>
          <Table responsive className="align-items-center table-flush">
            <thead className="thead-light">
              <tr>
                <th scope="col">#{t('id')}</th>

                <th scope="col">{t('Profile')}</th>
                <th scope="col">{t('Creation')}</th>
                <th scope="col">{t('action')}</th>
              </tr>
            </thead>
            <tbody>
              {data?.profiles?.map((pv) => (
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
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <h1>{t('Staff sales dashboard')}</h1>
      </div>

      <Row className="justify-content">

        <Card border="light" className="shadow-sm m-3 p-3">
          <Row className="align-items-center">
            <h5>{t('filter_by_date_and_employee')}</h5>
            <Col md={3} className="mb-3">
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                <Stack spacing={3}>
                  <DatePicker
                    disableFuture
                    label={t('from_date')}
                    openTo="day"
                    // inputFormat="dd/MM/yyyy"
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
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                <Stack spacing={3}>
                  <DatePicker
                    disableFuture
                    // inputFormat="dd/MM/yyyy"
                    label={t('until')}
                    value={formdata.endDate}
                    openTo="day"
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
                <Form.Label>{t('Employee')}</Form.Label>

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
              <Button onClick={(e) => gofilter()}> {t('Apply')}</Button>
            </Col>
          </Row>
        </Card>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category={t('Number of date customers filtered by month')}
            title={data?.profiles?.length}
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
