import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const getCarDetails = async () => {
      // const { data } = await fetchCar(id);
      const res = await axios.get(
        `http://localhost:5000/api/cars/${id}`,
        
        {
          headers: { token: localStorage.getItem("token") },
        }
      );

      setCar(res.data);
    };
    getCarDetails();
  }, [id]);

  const handleDelete = async () => {
    // await deleteCar(id);
      const res = await axios.delete(
        `http://localhost:5000/api/cars/${id}`,

        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      console.log(res)
    navigate("/dashboard");
  };

  if (!car) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-3xl mb-3">{car.title}</h2>
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
      <p className="mt-3 text-gray-700">{car.description}</p>
      <p className="mt-1 text-gray-500">Tags: {car.tags.join(", ")}</p>
      <div className="flex gap-3 mt-5">
        <button
          onClick={() => navigate(`/cars/edit/${id}`)}
          className="btn-style"
        >
          Edit
        </button>
        <button onClick={handleDelete} className="btn-style bg-red-500">
          Delete
        </button>
      </div>
    </div>
  );
};

export default CarDetail;
