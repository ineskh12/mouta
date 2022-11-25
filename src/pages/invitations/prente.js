import React, { useState, useEffect } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {
  Button,
  Row,
  Col,
  InputGroup,
  Form,
  Modal,
  Badge,
} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment-timezone";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Out from "./invitationsOut";
import In from "./invitationsIn";
import Frnd from "./friends";
import { useTranslation } from "react-i18next";

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

export default function BasicTabs() {
  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);
  const [data, setData] = useState([]);
  const [first, setfirst] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const myicon = (icon) => {
    return <FontAwesomeIcon icon={faArrowLeft} />;
  };
  const id = useParams().id;
  const fetchData = async () => {
    try {
      const { data: response } = await axios.get(
        "http://www.skiesbook.com:3000/api/v1/users/pop/" + id
      );
      setData(response);
      setfirst(response?.profiles[0]);
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const history = useHistory();
  const [formData1, setFormData1] = useState({
    searchId: "",
    name: "",
    lastname: "",
    fullname: "",
  });
  const [showDefault2, setShowDefault2] = useState(false);
  const handleClose2 = () => setShowDefault2(false);
  async function searchit1(e) {
    e.preventDefault();

    let searchval = formData1.searchId;
    if (searchval === "") {
      searchval = first?._id;
    }
    const matches = searchval.match(/\b[^\d\s]+\b/g);
    if (matches?.length === 1) {
      searchval = searchval + " "
    }
    history.push("/invi/" + searchval + "/" + formData1.fullname);
  }
  const token = JSON.parse(localStorage.getItem("token"));
  let decoded = null;
  if (token !== null) decoded = jwt_decode(token);
  const invs = (localStorage.getItem("invs"));
  let decodedinvs = null;
  if (invs !== null) decodedinvs = (invs);


  return (
    <>
      <Modal show={showDefault2} onHide={handleClose2}>
        <Modal.Header>
          <Modal.Title className="h6">{t("Search for existing profile")}</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose2} />
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => searchit1(e)}>
            <Row>
              <Col md={8} className="mb-3">
                <Form.Group id="name">
                  <Form.Label>{t('Account')}</Form.Label>

                  <Form.Control
                    as="select"
                    name="searchId"
                    value={first?._id}
                    onChange={(e) =>
                      setFormData1({ ...formData1, searchId: e.target.value })
                    }
                  >
                    {data?.profiles?.map((account) => (
                      <option key={account?._id} value={account?._id}>
                        {account?.profileName} {account?.profileLastName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={8} className="mb-3">
                <Form.Group id="name">
                  <Form.Label>{t('full_name')}</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder={t('full_name')}
                    onChange={(e) =>
                      setFormData1({ ...formData1, fullname: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <div className="mt-3">
                <Button type="submit" variant="primary">
                  {t('search')}
                </Button>
              </div>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>

      <div className="d-block mb-4 mb-md-2">
        <Col xs={8} lg={3} xl={4}>
          <InputGroup>
            <Button
              variant="primary"
              className="my-3 "
              onClick={() => setShowDefault2(true)}
            >
              {t('Search for other profiles')}
            </Button>
          </InputGroup>
        </Col>
      </div>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            allowScrollButtonsMobile
            variant="scrollable"
            aria-label="scrollable force tabs example"
          >
            <Tab wrapped label={t('relationship')} {...a11yProps(0)} />
            <Tab wrapped label={t('Invitations sent')} {...a11yProps(1)} />

            <Tab
              wrapped
              label={
                <span>
                  {t('Invitations received')}{" "}
                  <span className="badge badge-danger">
                    {decodedinvs}
                  </span>
                </span>
              }
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {data?.profiles?.map((profile) => (
            <Frnd key={profile._id} id={profile._id} />
          ))}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {data?.profiles?.map((profile) => (
            <Out key={profile._id} id={profile._id} />
          ))}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {data?.profiles?.map((profile) => (
            <In key={profile._id} id={profile._id} />
          ))}
        </TabPanel>
      </Box>
    </>
  );
}
