import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./Slide.css";
import { getAllSlide } from 'actions/services/SlideServices'



function PrevButton({ onClick }) {
  return (
    <button onClick={onClick} className="slick-prev">
      <i className="fas fa-chevron-left"></i>
    </button>
  );
}
function NextButton({ onClick }) {
  return (
    <button onClick={onClick} className="slick-next">
      <i className="fas fa-chevron-right"></i>
    </button>
  );
}
export default function Slide() {

  const [slides, setSlides] = useState([]);
  const [content, setContent]= useState();

  // const getData = () => {
  //   getAllSlide()
  //     .then(res => setSlides(res.data),
      
  //       console.log("allslide", slides)
  //     )
  //     .catch(err => console.log(err))
  // }



  useEffect(() => {
    // getData();
  }, [])

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevButton />,
    nextArrow: <NextButton />,
  };


  return (
    <>
      <div className="row sm-gutter">
        <div className="col l-12 m-12 c-12">
      
          <img src="https://s3.cloud.cmctelecom.vn/tinhte1/2017/11/4186160_banner.png" alt="banner" />
        </div>
      </div>
    </>
  );
}
