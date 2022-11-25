import React, { useState, useEffect } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {
  Card,
  Toast,
  Image,
  Button,
  ButtonGroup,
  Dropdown,
  Row,
  Container,
  Col,
} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment-timezone";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Discution from "./index.js";
import History from "./history";
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
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem("token"));
  let decoded = null;
  if (token !== null) decoded = jwt_decode(token);
  const [ticket, setTicket] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const id = useParams().id;
  async function getTicket() {
    try {
      const { data: response } = await axios.get(
        "http://www.skiesbook.com:3000/api/v1/profile/getticket/" + id
      );
      setTicket(response);
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {}, [
    setTimeout(() => {
      getTicket();
    }, 2500),
  ]);

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
            {t("back")}
          </Dropdown.Toggle>
        </ButtonGroup>
      </div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label={t("Discussion")}
              {...a11yProps(0)}
              style={{ margin: "10px" }}
            />
            {decoded.role === "superadmin" ? (
              <Tab label={t("historic")} {...a11yProps(1)} />
            ) : (
              <></>
            )}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Discution ticket={ticket} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <History ticket={ticket} />
        </TabPanel>
      </Box>
    </>
  );
}
