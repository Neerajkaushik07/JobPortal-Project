import React from 'react'
import image1 from "../assets/images/img1.png"
import image2 from "../assets/images/img2.png"
import image3 from "../assets/images/img2.png"

import image4 from "../assets/images/img2.png"

import image5 from "../assets/images/img2.png"

import image6 from "../assets/images/img2.png"


const imageArray=[
    {src:image1},
    {src:image2},
    {src:image3},
    {src:image4},
    {src:image5},
    {src:image6},
    
]
function Partners() {
  return (
    <div className="flex flex-row flex-wrap justify-center items-center m-4 shadow-md shadow-richblack-200">
            {imageArray.map((item, index) => (
                <div key={index} className="m-2">
                    <img src={item.src} alt={`Partner ${index + 1}`} width={200} height={200} loading="lazy" />
                </div>
            ))}
        </div>
  )
}

export default Partners

