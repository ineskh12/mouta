import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Button, Card } from "@themesberg/react-bootstrap";

import Profile1 from "../assets/img/team/profile-picture-1.jpg";
import ProfileCover from "../assets/img/profile-cover.jpg";
import "react-image-gallery/styles/css/image-gallery.css";
import axios from "axios";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useParams } from "react-router-dom";
import Test from "./Test";
import { useTranslation } from "react-i18next";

export default function ProfileCardWidget() {
  
  const { t } = useTranslation();

  const [images, setImages] = React.useState(null);
  const [prof, setprof] = React.useState(null);
  const [videos, setVideos] = React.useState(undefined);

  let { id } = useParams();
  console.log(id);
  React.useEffect(() => {
    let shouldCancel = false;

    const call = async () => {
      const response = await axios.get(
        "http://skiesbook.com:3000/api/v1/profile/" + id
      );
      response.data.files.forEach((element, index) => {
        response.data.files[index] = "http://skiesbook.com:3000/uploads/" + element;
      });
      setprof(response.data);
      setVideos(
        response.data.files.filter(
          (ext) =>
            ext.slice(-3) === "mp4" ||
            ext.slice(-3) === "mov" ||
            ext.slice(-4) === "avi" ||
            ext.slice(-3) === "wmv"
        )
      );

      let photos = response.data.files.filter(
        (ext) =>
          ext.slice(-3) === "png" ||
          ext.slice(-3) === "jpg" ||
          ext.slice(-4) === "jpeg" ||
          ext.slice(-3) === "gif"
      );
      if (
        !shouldCancel &&
        response.data.files &&
        response.data.files.length > 0
      ) {
        setImages(
          photos.map((url) => ({
            original: `${url}`,
            thumbnail: `${url}`,
          }))
        );
      }
    };
    call();
    return () => (shouldCancel = true);
  }, []);

  const ProfileWidget = () => {
    return images ? <ImageGallery items={images} /> : null;
  };

  const Theprofile = () => {
    const Banner = process.env.REACT_APP_API_IMAGE + "/" + prof?.banner;
    return (
      <Card border="light" className="text-center p-0 mb-4">
        <div
          style={{ backgroundImage: `url(${Banner})` }}
          className="profile-cover rounded-top"
        />

        <Card.Body className="pb-5">
          <Card.Img
            src={"http://skiesbook.com:3000/uploads/" + prof?.profileImage}
            alt="Neil Portrait"
            className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4"
          />
          <Card.Title>
            {prof?.profileName + " " + prof?.profileLastName}
          </Card.Title>
          <Card.Subtitle className="fw-normal">
            {prof?.profileDatebirth} --- {prof?.profileDatebirth}
          </Card.Subtitle>
          <Card.Text className="text-gray mb-4">New York, USA</Card.Text>
          <div class="row d-flex justify-content-center">
            <div class="col-md-8 col-lg-9 col-xl-8">
              <div class="d-flex">
                <div class="flex-grow-1 ms-4 ps-3">
                  <figure>
                    <blockquote class="blockquote mb-4">
                      <p>
                        <i class="fas fa-quote-left fa-lg text-warning me-2"></i>
                        <span class="font-italic">{prof?.bio}</span>
                      </p>
                    </blockquote>
                    <figcaption class="blockquote-footer">
                      {prof?.profileName + " " + prof?.profileLastName}{" "}
                      <cite title="Source Title">{prof?.quote}</cite>
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </div>
          <Button variant="primary" size="sm" className="me-2">
            <FontAwesomeIcon icon={faUserPlus} className="me-1" /> 
            {t('contact_the_family_via')} {prof?.profileEmail}
          </Button>
          <Button variant="secondary" size="sm">
            {t('send_message')}
          </Button>
          <Card.Body style={{ width: "100%" }}>
            <Card.Title>{t('image_gallery')}</Card.Title>
            <ProfileWidget></ProfileWidget>
            <Card.Title className="mt-4">{t('video_gallery')}</Card.Title>

            <Test wow={videos} id={id} />
          </Card.Body>
        </Card.Body>
      </Card>
    );
  };

  return <Theprofile />;
}
