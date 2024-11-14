import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import CarForm from "./CarForm";
import axios from "axios";

const EditCar = () => {
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

  const handleFormSubmit = async (formData) => {
    // await updateCar(id, formData);
    const res = await axios.put(`http://localhost:5000/api/cars/${id}`,formData, {
      headers: { token: localStorage.getItem("token") },
    });
    console.log(res)
    navigate(`/cars/${id}`);
  };

  if (!car) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-3xl mb-5">Edit Car Details</h2>
      <CarForm car={car} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default EditCar;
