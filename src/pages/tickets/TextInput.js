import React from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapForm: {
      display: "flex",
      justifyContent: "center",
      width: "95%",
      margin: `${theme.spacing(0)} auto`
    },
    wrapText: {
      width: "100%"
    },
    button: {
      //margin: theme.spacing(1),
    }
  })
);

export const TextInput = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [message, setMessage] = React.useState("");
  const history = useHistory();
  async function send(e){
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));
    let decoded = null;
    if (token !== null) decoded = jwt_decode(token);
    let side = 1;
    if (decoded.role === "admin") side = 0;
    const data = {
      message: message,
      sender:decoded.userId,
      side: side
    };
    await axios.put("http://skiesbook.com:3000/api/v1/profile/sendmessage/"+id, data).then(res => {
        setMessage("");
    });
    
  }
  return (
    <>
      <form onSubmit={(e)=> send(e)} className={classes.wrapForm} noValidate autoComplete="off">
        <TextField
          id="standard-text"
          label="send your message"
          className={classes.wrapText}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          //margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" className={classes.button}>
          <SendIcon />
        </Button>
      </form>
    </>
  );
};
