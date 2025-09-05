import React from 'react';
import Slider from 'react-slick';

const data = [
  { title: "Active Users", value: 1200 },
  { title: "Total Placed", value: 875 },
  { title: "Company Partnerships", value: 23 }
];

function DataSlider() {
  // Settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  return (
    <div className="bg-gradient-to-r from-[#d9beed] to-[#b490d0] p-8 rounded-lg shadow-lg mt-5 mb-5">
      <h2 className="text-white text-2xl font-bold text-center mb-6">Statistics Overview</h2>
      <Slider {...settings}>
        {data.map((item, index) => (
          <div key={index} className="px-4">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center h-40">
              <p className="text-gray-800 text-xl font-semibold">{item.title}</p>
              <p className="text-gray-600 text-2xl">{item.value}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default DataSlider;
