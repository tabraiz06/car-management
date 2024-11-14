import React from "react";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => (
  <div className="p-4 bg-white shadow-md">
    <div className="flex gap-5">
      {car.images.map((img, index) => (
        <img
          key={index}
          src={`./images/${img}`}
          alt={car.title}
          className="w-40 h-40 object-cover"
        />
      ))}
    </div>
    <h3 className="text-xl mt-2">{car.title}</h3>
    <p className="text-gray-500">{car.description}</p>
    <Link to={`/cars/${car._id}`} className="btn-link mt-2">
      View Details
    </Link>
  </div>
);

export default CarCard;
