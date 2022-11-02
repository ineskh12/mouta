import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  InputGroup,
  ButtonGroup,
  Dropdown,
} from "@themesberg/react-bootstrap";
import axios from "axios";
import jwt_decode from "jwt-decode";
import MuiAlert from "@material-ui/lab/Alert";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import USstates from "./UsStates.json";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import PhoneInput from "react-phone-input-2";

const AddClient = () => {
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem("token"));
  let decoded = null;
  if (token !== null) decoded = jwt_decode(token);
  const [formData, setFormData] = useState({
    name: "",
    lastn: "",
    Datebirth: new Date(),
    email: "",
    sex: "",
    password: "",
    confirmPassword: "",
    userimage: "",
    phone: "",
    address: "Canada",
    postalcode: "",
    role: "client",
    graveyard: decoded.graveyardId,
  });
  const [inputList, setInputList] = useState([
    {
      profileName: "",
      profileLastName: "",
      profileDatebirth: new Date(),
      profileDatedeath: new Date(),
      gender: "F",
      cords: "",
      modeDeath: "I",
      profileEmail: formData.email,
      hometown: "",
      graveyard: decoded.graveyardId,
      banner: "banner.jpg",
      profileImage: "avatar.jpg",
    },
  ]);
  const [value, setValue] = useState();

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleInputChange2 = (e, index) => {
    const list = [...inputList];
    list[index]['profileDatebirth'] = e;
    setInputList(list);
  };

  const handleInputChange3 = (e, index) => {
    const list = [...inputList];
    list[index]['profileDatedeath'] = e;
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        profileName: "",
        profileLastName: "",
        profileDatebirth: new Date(),
        profileDatedeath: new Date(),
        gender: "F",
        cords: "",
        modeDeath: "I",
        profileEmail: formData.email,
        hometown: "",
        graveyard: decoded.graveyardId,
        banner: "banner.jpg",
        profileImage: "avatar.jpg",
      },
    ]);
  };


  const [birthday, setBirthday] = useState("05/05/2000");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const Submit = async (e) => {
    e.preventDefault();
    formData.Datebirth = moment(birthday).format("DD-MM-YYYY");
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
    mydata.append("address", formData.address);
    mydata.append("postalcode", formData.postalcode);

    mydata.append("graveyard", decoded.graveyardId);
    mydata.append("profiles", JSON.stringify(inputList));
    mydata.append("vendor", decoded.userId);

    await axios
      .post(
        "http://www.skiesbook.com:3000/api/v1/users/addclient",
        mydata,
        config
      )
      .then((response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Client ajouté avec succès",
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            history.push("/adminclients");
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
  };

  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const [country, setCountry] = useState("Canada");
  const [region, setRegion] = useState([
    {
      name: "Alberta",
      abbreviation: "AB",
    },
    {
      name: "British Columbia",
      abbreviation: "BC",
    },
    {
      name: "Manitoba",
      abbreviation: "MB",
    },
    {
      name: "New Brunswick",
      abbreviation: "NB",
    },
    {
      name: "Newfoundland and Labrador",
      abbreviation: "NL",
    },
    {
      name: "Northwest Territories",
      abbreviation: "NT",
    },
    {
      name: "Nova Scotia",
      abbreviation: "NS",
    },
    {
      name: "Nunavut",
      abbreviation: "NU",
    },
    {
      name: "Ontario",
      abbreviation: "ON",
    },
    {
      name: "Prince Edward Island",
      abbreviation: "PE",
    },
    {
      name: "Quebec",
      abbreviation: "QC",
    },
    {
      name: "Saskatchewan",
      abbreviation: "SK",
    },
    {
      name: "Yukon Territory",
      abbreviation: "YT",
    },
  ]);
  function handleChange(val) {
    console.log(val);
    setCountry(val);
    if (val === "Canada") {
      setRegion([
        {
          name: "Alberta",
          abbreviation: "AB",
        },
        {
          name: "British Columbia",
          abbreviation: "BC",
        },
        {
          name: "Manitoba",
          abbreviation: "MB",
        },
        {
          name: "New Brunswick",
          abbreviation: "NB",
        },
        {
          name: "Newfoundland and Labrador",
          abbreviation: "NL",
        },
        {
          name: "Northwest Territories",
          abbreviation: "NT",
        },
        {
          name: "Nova Scotia",
          abbreviation: "NS",
        },
        {
          name: "Nunavut",
          abbreviation: "NU",
        },
        {
          name: "Ontario",
          abbreviation: "ON",
        },
        {
          name: "Prince Edward Island",
          abbreviation: "PE",
        },
        {
          name: "Quebec",
          abbreviation: "QC",
        },
        {
          name: "Saskatchewan",
          abbreviation: "SK",
        },
        {
          name: "Yukon Territory",
          abbreviation: "YT",
        },
      ]);
    } else if (val === "Etats Unis") {
      setRegion(USstates);
    }
    setFormData({ ...formData, address: val });
  }
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
        <h5 className="mb-4">Information général</h5>
        <Form onSubmit={(e) => Submit(e)}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Nom</Form.Label>
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
                <Form.Label>Prénom</Form.Label>
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
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DatePicker
                   inputFormat="dd/MM/yyyy"

                    disableFuture
                    label="Date de naissance"
                    openTo="year"
                    views={["year", "month", "day"]}
                    value={formData.Datebirth}
                    onChange={(e) => setFormData({ ...formData, Datebirth: e })}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
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
                  <option value="0">Sexe</option>
                  <option value="F">Femme</option>
                  <option value="M">Homme</option>
                  <option value="I">Indéterminé</option>
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
            <Col sm={6} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Pays </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(val) => handleChange(val.target.value)}
                  defaultValue="C"
                >
                  <option val="C">Canada</option>
                  <option val="US">Etats Unis</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label>Région</Form.Label>
              <Form.Group>
                <Form.Select
                  onBlur={(region) =>
                    setFormData({
                      ...formData,
                      address: formData.address.concat(
                        " ," + region.target.value
                      ),
                    })
                  }
                >
                  {region.map((option) => (
                    <option key={option}>{option.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
         
            <Col sm={3} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Ville</Form.Label>
                <Form.Control
                  onBlur={(ville) =>
                    setFormData({
                      ...formData,
                      address: formData.address.concat(
                        " ," + ville.target.value
                      ),
                    })
                  }
                  required
                  type="text"
                />
              </Form.Group>
            </Col>
            <Col sm={2} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  onBlur={(zipCode) =>
                    setFormData({
                      ...formData,
                      address: formData.address.concat(
                        " ," + zipCode.target.value
                      ),
                    })
                  }
                  required
                  type="text"
                />
              </Form.Group>
            </Col>
          
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, userimage: e.target.files[0] })
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <h5 className="my-4">Informations du Cimetière </h5>
          <Row>
            <Col sm={4} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Cimetière</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  value={decoded.graveyardName}
                />
              </Form.Group>
            </Col>
          </Row>

          <h5 className="my-4">Information des profiles </h5>

          {inputList.map((x, i) => {
            return (
              <>
                <h6 className="my-4"> Profile num {i + 1} </h6>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group id="firstName">
                      <Form.Label>Nom</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="profileName"
                        defaultvalue={x.profileName}
                        onChange={(e) => handleInputChange(e, i)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group id="lastName">
                      <Form.Label>Prénom</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="profileLastName"
                        defaultvalue={x.profileLastName}
                        onChange={(e) => handleInputChange(e, i)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col md={6} className="mb-3">
                    <Form.Group id="birthday">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <DatePicker
                                            inputFormat="dd/MM/yyyy"

                            disableFuture
                            label="Date de naissance"
                            name="profileDatebirth"
                            open={false}
                            views={["year", "month", "day"]}
                            value={formData.Datebirth}
                            onChange={(e) => handleInputChange2(e, i)}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group id="birthday">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <DatePicker
                                            inputFormat="dd/MM/yyyy"

                            disableFuture
                            label="Date de décés"
                            name="profileDatedeath"
                            open={false}
                            views={["year", "month", "day"]}
                            value={formData.Datebirth}
                            onChange={(e) => handleInputChange3(e, i)}
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
                        defaultValue="F"
                        name="gender"
                        onChange={(e) => handleInputChange(e, i)}
                      >
                        <option value="F">Femme</option>
                        <option value="M">Homme</option>
                        <option value="I">Indéterminé</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group id="Emplacement du funérailles">
                      <Form.Label>Emplacement du funérailles</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="cords"
                        onChange={(e) => handleInputChange(e, i)}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Group id="funérailles">
                      <Form.Label>Modes de funérailles</Form.Label>
                      <Form.Select
                        defaultValue="I"
                        name="modeDeath"
                        onChange={(e) => handleInputChange(e, i)}
                      >
                        <option value="I">Inhumation (Enterrement) </option>
                        <option value="C">Crémation (Incinération)</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group id="emal">
                      <Form.Label>Email de référence</Form.Label>
                      <Form.Control
                        required
                        name="profileEmail"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange(e, i)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group id="ville">
                      <Form.Label>ville natale</Form.Label>
                      <Form.Control
                        required
                        name="hometown"
                        type="text"
                        onChange={(e) => handleInputChange(e, i)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="ml-50" variant="primary">
                  {inputList.length !== 1 && (
                    <Button
                      style={{ marginBottom: 20, marginLeft: 20 }}
                      className="text-danger ml-50"
                      variant="secondary"
                      onClick={() => handleRemoveClick(i)}
                      
                    >
                      Supprimer
                    </Button>
                  )}
                  {inputList.length - 1 === i && (
                    <Button
                      style={{ marginBottom: 20, marginLeft: 20 }}
                      className="ml-50"
                      variant="secondary"
                      onClick={handleAddClick}
                    >
                      Ajouter un autre profil
                    </Button>
                  )}
                </div>
              </>
            );
          })}

          <div className="mt-3">
            <Button variant="primary" type="submit">
              Sauvegarder
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
export default AddClient;
