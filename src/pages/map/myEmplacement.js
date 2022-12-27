import React from "react";

import { useTranslation } from "react-i18next";

import { Grid, Paper, Typography } from "@mui/material";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { Form, Button } from "@themesberg/react-bootstrap";
import Swal from "sweetalert2";

export default function MyPlace() {
  const { t } = useTranslation();
  const token = JSON.parse(localStorage.getItem("token"));
  let decoded = null;
  if (token !== null) decoded = jwtDecode(token);

  const [data, setData] = React.useState([]);

  const [file, setFile] = React.useState(null);

  function uploadPlan(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("plan", file);
    formData.append("id", decoded?.userId);

    Swal.fire({
      title: t("uploading"),
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    axios
      .post("http://skiesbook.com:3000/api/v1/graveyard/uploadplan", formData)
      .then((response) => {
        Swal.fire({
          title: t("uploaded"),
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        Swal.fire({
          title: t("error"),
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }

  function getUser() {
    axios
      .get("http://skiesbook.com:3000/api/v1/users/getAdmin/" + decoded.userId)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  React.useEffect(() => {
    getUser();
  }, []);
  return (
    <Grid container spacing={2}>
      {data?.graveyard?.plan ? (
        <>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 500,
              }}
            >
              <img
                src={"http://skiesbook.com:3000/uploads/" + data?.graveyard?.plan}
                alt="plan"
                style={{ width: "100%", height: "100%" }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <Form onSubmit={uploadPlan}>
                <Form.Group id="plan">
                  <Form.Label>{t("Update plan")}</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </Form.Group>
                <Button className="mt-3" variant="primary" type="submit">
                  {t("upload")}
                </Button>
              </Form>
            </Paper>
          </Grid>
        </>
      ) : (
        <Grid slassName="p-2" item xs={12}>
          <Paper slassName="p-6">
            <h4 style={{ padding: "20px" }} variant="h6" component="h2">
              {t("You don't have a plan yet")}
            </h4>

            <Typography style={{ padding: "20px" }} variant="h6" component="h2">
              {t("Please uplaod your plan")}
            </Typography>

            <Form style={{ padding: "20px" }} onSubmit={(e) => uploadPlan(e)}>
              <Form.Group id="plan">
                <Form.Label>{t("Plan")}</Form.Label>
                <Form.Control
                  required
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </Form.Group>
              <Button type="submit" className="btn btn-primary w-20 mt-3">
                Upload
              </Button>
            </Form>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
}
