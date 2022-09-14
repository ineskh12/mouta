import React, {
    useState,
  } from "react";
  import {  faEye, faEyeSlash,faArrowLeft } from "@fortawesome/free-solid-svg-icons";
  import MuiAlert from "@material-ui/lab/Alert";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import TextField from '@mui/material/TextField';

  import {
    Col,
    Row,
    Card,
    Form,
    Button,
    InputGroup,
    ButtonGroup,Dropdown
  } from "@themesberg/react-bootstrap";
  import Swal from "sweetalert2";
  import { useHistory } from "react-router-dom";
  import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  import { DatePicker } from '@mui/x-date-pickers/DatePicker';
  import Stack from '@mui/material/Stack';
  import axios from "axios";
  import PhoneInput from "react-phone-input-2";

  const Addsuperadmin = () => {  
    const history = useHistory();
    const [value, setValue] = useState();

    const [formData, setFormData] = useState({
      name: "",
      lastn: "",
      Datebirth: new Date(),
      email: "",
      sex: "M",
      password: "",
      confirmPassword:"",
      userimage: "avatar.jpg",
      phone: "",
      role: "superadmin",
      gname: "",
      address: "",
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    async function Submit() {
      const mydata = new FormData();
      mydata.append("name", formData.name);
      mydata.append("lastn", formData.lastn);
      mydata.append("Datebirth", formData.Datebirth);
      mydata.append("email", formData.email);
      mydata.append("sex", formData.sex);
      mydata.append("password", formData.password);
      mydata.append("userimage", formData.userimage);
      mydata.append("phone", formData.phone);
      mydata.append("role", formData.role);
      await axios
        .post("http://skiesbook.com:3000/api/v1/users/addsuperadmin", mydata, config)
        .then((response) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Superadmin ajouté avec succès",
            showConfirmButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
             history.push("/admin/superadmins");
            }
              });
              })
              .catch((e) => {
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "Addresse mail existe déja",
                  showConfirmButton: false,
                  timer: 1500,
                });
              });
    }

    const [passwordType, setPasswordType] = useState("password");
   
    const togglePassword = () => {
      if (passwordType === "password") {
        setPasswordType("text");
        return;
      }
      setPasswordType("password");
    };
  
    return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
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
              Retour
            </Dropdown.Toggle>
          </ButtonGroup>
        </div>
          <h5 className="mb-4">Ajout d'un nouveau super admin</h5>
          <Form>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="lastName">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    onChange={(e) =>
                      setFormData({ ...formData, lastn: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col md={6} className="mb-3">
                <Form.Group id="birthday">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <br></br>
                    <Stack spacing={3}>
                      <DatePicker
                        disableFuture
                        label="Date de naissance"
                        inputFormat="dd/MM/yyyy"

                        openTo="year"
                        views={["year", "month", "day"]}
                        value={formData.Datebirth}
                        onChange={(e) =>
                          setFormData({ ...formData, Datebirth: e })
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Stack>
                  </LocalizationProvider>
                </Form.Group>
              </Col>
  
              <Col md={6} className="mb-3">
                <Form.Group id="gender">
                  <Form.Label>Sexe</Form.Label>
                  <Form.Select
                    defaultValue="M"
                    onChange={(e) =>
                      setFormData({ ...formData, sex: e.target.value })
                    }
                  >
                    <option value="0">Autre</option>
                    <option value="F">Femme</option>
                    <option value="M">Homme</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="emal">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Téléphone</Form.Label>
                <PhoneInput
                  country={"ca"}
                  onlyCountries={["us", "ca"]}
                  value={value}
                  onChange={(e) => setFormData({ ...formData, phone: e })}
                />
              </Form.Group>
            </Col>
            </Row>
            <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Mot de passe</Form.Label>
                <InputGroup>
                  <Button
                    size="sm"
                    style={{
                      borderColor: "transparent",
                      marginRight: 5,
                      backgroundColor: "#d7dce4",
                    }}
                    onClick={() => togglePassword()}
                  >
                    {passwordType === "password" ? (
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEye} />
                      </InputGroup.Text>
                    ) : (
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEyeSlash} />
                      </InputGroup.Text>
                    )}
                  </Button>
                  <Form.Control
                    type={passwordType}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  ></Form.Control>
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label> Confirmer votre mot de passe</Form.Label>
                <InputGroup>
                  <Button
                    size="sm"
                    style={{
                      borderColor: "transparent",
                      marginRight: 5,
                      backgroundColor: "#d7dce4",
                    }}
                    onClick={() => togglePassword()}
                  >
                    {passwordType === "password" ? (
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEye} />
                      </InputGroup.Text>
                    ) : (
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEyeSlash} />
                      </InputGroup.Text>
                    )}
                  </Button>
                  <Form.Control
                    type={passwordType}
                    required
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  ></Form.Control>
                </InputGroup>
                {formData.confirmPassword !== formData.password &&
                formData.confirmPassword !== "" ? (
                  <MuiAlert severity="warning">Mot de passe ne correspond pas</MuiAlert>
                ) : (
                  <span></span>
                )}
              </Form.Group>
            </Col>
  
              <Col md={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    required
                    type="file"
                    onChange={(e) =>
                      setFormData({ ...formData, userimage: e.target.files[0] })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
  
           

            <div className="mt-3">
              <Button variant="primary" onClick={(e) => Submit()}>
                Sauvegarder
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  };
  export default Addsuperadmin;
  