import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { TextInput } from "./TextInput.js";
import { MessageLeft, MessageRight } from "./Message";
import { Button, ButtonGroup, Card, Dropdown } from "@themesberg/react-bootstrap";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment-timezone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      width: "80vw",
      height: "80vh",
      maxHeight: "700px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
    },
    paper2: {
      width: "80vw",
      maxWidth: "500px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
    },
    container: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: "auto",
      left: "0",
    },
    messagesBody: {
      width: "calc( 100% - 20px )",
      margin: 10,
      overflowY: "scroll",
      height: "calc( 100% - 80px )",
    },
  })
);

export default function App(props) {
  const classes = useStyles();

  const token = JSON.parse(localStorage.getItem("token"));
  let decoded = null;
  if (token !== null) decoded = jwt_decode(token);
  let side = 1;
  if (decoded.role === "admin") side = 0;
  const history = useHistory();
  const [ticket, setTicket] = useState();
  let { id } = useParams();

  return (
<>
      
        <h5 className="mb-4">{ticket?.subject}</h5>
          
        <Paper className={classes.paper} zDepth={2}>
          <Paper id="style-1" className={classes.messagesBody}>
            {props?.ticket &&
              props?.ticket?.messages?.map((message, index) => {
                if (message?.send === side) {
                  return (
                    <MessageRight
                      key={index}
                      message={message?.msg}
                      timestamp={moment(message?.timestamp).format(
                        "DD/MM/YYYY HH:mm"
                      )}
                      displayName={message?.sender?.name}
                      photoURL={
                        "http://www.skiesbook.com:3000/uploads/" +
                        message?.sender?.userimage
                      }
                      avatarDisp={true}
                    />
                  );
                } else {
                  return (
                    <MessageLeft
                      key={index}
                      message={message?.msg}
                      timestamp={moment(message?.timestamp).format(
                        "DD/MM/YYYY HH:mm"
                      )}
                      displayName={message?.sender?.name}
                      photoURL={
                        "http://www.skiesbook.com:3000/uploads/" +
                        message?.sender?.userimage
                      }
                      avatarDisp={true}
                    />
                  );
                }
              })}

         
          </Paper>
          <TextInput />
        </Paper>
        </>
  );
}
