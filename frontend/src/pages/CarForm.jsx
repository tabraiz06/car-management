import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const CarForm = ({ car }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imgFile, setImgFile] = useState([]);

  const [formData, setFormData] = useState({
    title: car?.title || "",
    description: car?.description || "",
    tags: car?.tags.join(", ") || "",
  });

  const handleImageChange = (e) => {
    console.log(e.target.files);
    // const selectedFile = e.target.files;
    setImgFile([...e.target.files]);
    const file = e.target.files;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    const newFormData = new FormData();
    newFormData.append("title", formData.title);
    newFormData.append("description", formData.description);
    newFormData.append("tags", formData.tags);

    newFormData.append("images", imgFile);
    imgFile.forEach((image) => {
      newFormData.append("images", image);
    });
    e.preventDefault();
    if (car) {
      // await updateCar(car._id, formData);
      const res = await axios.put(
        `http://localhost:5000/api/cars/${car._id}`,
        newFormData,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      console.log(res);
      navigate(`/cars/${car._id}`);
    } else {
      const res = await axios.post(
        `http://localhost:5000/api/cars`,
        newFormData,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      console.log(res);
      navigate(`/dashboard`);
      // await createCar(newFormData);
    }
  };

  return (
    <div className="h-screen w-screen items-center justify-center flex flex-col gap-4">
      <div className="flex flex-col gap-4 border border-black p-10">
        <h1 className="text-2xl mb-5 text-center">
          {car ? "Update Car details" : "Add Car details"}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="h-[50vh] w-[50vw] flex flex-col gap-4"
        >
          <input
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={formData.title}
            className="p-3 border border-black"
          />
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            value={formData.description}
            className="p-3 border border-black"
          />
          <input
            name="tags"
            placeholder="Tags (comma-separated)"
            onChange={handleChange}
            value={formData.tags}
            className="p-3 border border-black"
          />
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="p-3 border border-black"
          />
          <button type="submit" className="p-4 bg-blue-600">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CarForm;
