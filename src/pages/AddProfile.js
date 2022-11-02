import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  InputGroup,
} from "@themesberg/react-bootstrap";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {
  BrowserRouter as Router,
  useHistory,
  useParams,
} from "react-router-dom";
import Qrcode from "./QrCode";
import { DropzoneArea } from "material-ui-dropzone";
import Swal from "sweetalert2";


const AddProfile = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [timer, setTimer] = useState(0);

  let decoded = null;
  if (token !== null) decoded = jwt_decode(token);
   let history = useHistory()
 
  const Submit = async (e) =>{
          e.preventDefault();

    const mydata = new FormData();
    mydata.append("profileimage", formData.profileImage);
    mydata.append("banner", formData.banner);
    for (let i = 0; i < formData.files.length; i++) {
      mydata.append("files", formData.files[i]);
    }

    mydata.append("bio", formData.bio);

    //mydata.append("files[]", formData.profileImage);
    // mydata.append("files[]", formData.banner);
    let timerInterval

    const config = {
      onUploadProgress: progressEvent => {

          Swal.fire({
          title: 'Your Profile is being Created',
          html: 'Your files are uploading remaining <b></b> milliseconds.',
          timer: progressEvent.loaded/100,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
          }
        })
      }

  }
    mydata.append("cimitiere", decoded.cimitiere);
    await axios
      .put("http://www.skiesbook.com:3000/api/v1/profile/update/" + id, mydata,config)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
     
      console.log(config);



  }

  const [data, setData] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://www.skiesbook.com:3000/api/v1/profile/" + id
        );
        setData(response);
        console.log(response);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);
  const [birthday, setBirthday] = useState("2020-01-01");

  const [formData, setFormData] = useState({
    profileName: data.profileName,
    profileLastName: data.profileLastName,
    profileDatebirth: data.profileDatebirth,
    bio: data.bio,
    files: "",
    profileDatedeath: data.profileDatedeath,
    profileEmail: data.profileEmail,
    profileImage: "",
    banner: "",
  });
  const eventhandler = async (data) => {
    setFormData({ ...formData, files: data });
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Parcours</h5>
        <Form onSubmit={(e)=>Submit(e)}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  disabled
                  defaultValue={data.profileName}
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
                  disabled
                  defaultValue={data.profileLastName}
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
                <Form.Label>Date de naissance</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={setBirthday}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={
                          data.profileDatebirth
                            ? moment(data.profileDatebirth).format("DD/MM/YYYY")
                            : ""
                        }
                        placeholder="mm/dd/yyyy"
                        onFocus={openCalendar}
                      />
                    </InputGroup>
                  )}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="birthday">
                <Form.Label>Date de décès</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={setBirthday}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={
                          data.profileDatedeath
                            ? moment(data.profileDatedeath).format("MM/DD/YYYY")
                            : ""
                        }
                        placeholder="mm/dd/yyyy"
                        onFocus={openCalendar}
                      />
                    </InputGroup>
                  )}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Bio </Form.Label>
                <textarea
                  className="form-control"
                  required
                  rows={8}
                  type="textarea"
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                ></textarea>
              </Form.Group>
            </Col>
           
          </Row>

          <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Email de référence</Form.Label>
                <Form.Control
                required
                  defaultValue={data.profileEmail}
                  type="email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          <Row>
           

            <Col md={6} className="mb-3">
              <Form.Group id="firstName" >
                <Form.Label>Banner</Form.Label>
                <DropzoneArea
                required
                  acceptedFiles={[".jpg", ".jpeg", ".png", ".gif"]}
                  dropzoneText="Déposez votre Banner ici"
                  filesLimit={1}
                  showFileNames={true}
                  maxFileSize={2000000}
                  onChange={(files) =>
                    setFormData({ ...formData, banner: files[0] })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Profile image</Form.Label>
                <DropzoneArea
                required
                  acceptedFiles={[".jpg", ".jpeg", ".png", ".gif"]}
                  filesLimit={1}
                  dropzoneText="Déposez votre photo de profile ici"
                  showFileNames={true}
                  maxFileSize={2000000}
                  onChange={(files) =>
                    setFormData({ ...formData, profileImage: files[0] })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
          <Form.Label>Upload your files here</Form.Label>

          <DropzoneArea
          required
            acceptedFiles={[".jpg", ".jpeg", ".png", ".gif", ".mp4"]}
            filesLimit={20}
            dropzoneText="Déposez le reste de vos fichiers multimédia ici"

            showFileNames={true}
            maxFileSize={500000000}
            onChange={(files) => setFormData({ ...formData, files: files })}
          />
          </Row>

          <div className="mt-3">
            <Button type="submit" variant="primary">
              Sauvegarder
            </Button>
          </div>
        </Form>

        <Col md={6} className="mb-3 mt-2">
        <h5 className="mb-4">Parcours</h5>
          <Qrcode
            myvalue={"http://www.skiesbook.com/graveyard/defun/" + id}
          ></Qrcode>
        </Col>
      </Card.Body>
    </Card>
  );
};
export default AddProfile;
