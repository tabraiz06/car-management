import React, { useEffect, useState } from "react";

import CarCard from "../components/CarCard";
import axios from "axios";

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // const { data } = await fetchCars();
      const res = await axios.get("http://localhost:5000/api/cars", {
        headers: { token: localStorage.getItem("token") },
      });
      setCars(res.data);
    };
    fetchData();
  }, []);

  const filteredCars = cars.filter(
    (car) =>
      car.title.toLowerCase().includes(search.toLowerCase()) ||
      car.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-5">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {filteredCars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
