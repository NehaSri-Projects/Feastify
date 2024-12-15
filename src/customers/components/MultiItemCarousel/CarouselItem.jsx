import React from 'react';
import { topMeels } from '../../../Data/topMeels';
import "./CarouselItem.css"
const CarouselItem = ({ image, title }) => {
  return (
    <div className='carousel-item flex flex-col justify-center items-center'>
      <img
        className='w-[10rem] h-[10rem] lg:w-[8rem] lg:h-[8rem] rounded-full object-cover object-center'
        src={image}
        alt={title}
      />
      <span className='py-5 font-semibold text-xl text-black'>{title}</span>
    </div>
  );
};

export default CarouselItem;
