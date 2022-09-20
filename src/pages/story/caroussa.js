import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const Carrousa = ({ photos }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };
  return (
    <>
    {console.log(photos)}
      <Carousel responsive={responsive}>
        {photos?.map((img, i) => (
          <div  key={i}>
            {img.split(".").pop() === "mp4" ? (
              <>
                <div className="okbb"></div>
                <video
                  style={{ borderRadius: "10px" }}
                  className="story "
                  src={img}
                 
                ></video>
              </>
            ) : (
              <div
                style={{
                  backgroundImage: `url(${img})`,
                  backgroundRepeat: "no-repeat",
                }}
                className="story"
               
              ></div>
            )}

            {/* 
                                     <div
                                      style={{
                                        backgroundImage: `url(${img})`,
                                        backgroundRepeat: "no-repeat",
                                      }}
                                      className="story"
                                      onClick={() => {
                                        displayImage(img);
                                      }}
                                    ></div> 
                                    <p> {img.type}</p> */}
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default Carrousa;
