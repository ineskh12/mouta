import React, { useState, useEffect } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
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
import Global from "./graveyard_dashboard"
import Staff from "./AdminStaff"
import Invoice from "./invoice"
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
  const [value, setValue] = React.useState(0);

  const { t } = useTranslation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const id = useParams().id;

  const history = useHistory();


  const token = JSON.parse(localStorage.getItem("token"));
  let decoded = null;



  return (
    <>
    

     

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            allowScrollButtonsMobile
            variant="scrollable"
            aria-label="scrollable force tabs example"
          >
            <Tab wrapped label={t('Dashboard global')} {...a11yProps(0)} />
            <Tab wrapped label={t('Dashboard Staff')} {...a11yProps(1)} />

            <Tab disabled wrapped label={t('Dashboard cemetery')} {...a11yProps(2)} />

          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
         <Global />
        </TabPanel>
        <TabPanel value={value} index={1}>
        <Staff />
        </TabPanel>
        <TabPanel value={value} index={2}>
         <Invoice></Invoice>
        </TabPanel>
      </Box>
    </>
  );
}
