import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "demo@user.com",
    password: "password",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const { data } = await login(formData);
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );

      console.log(res.data);

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="h-screen w-screen items-center justify-center flex flex-col gap-4">
      <div className="flex flex-col gap-4 border border-black p-10">
        <form
          onSubmit={handleSubmit}
          className="h-[50vh] w-[50vw] flex flex-col gap-4"
        >
          <h2 className="text-2xl mb-5 text-center">Login</h2>
          <input
            name="email"
            type="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            className="p-3 border border-black"
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
            className="p-3 border border-black"
          />
          <button type="submit" className="p-4 bg-blue-600">
            Login
          </button>
          <div className="texts underline">
            <Link to={"/signup"}>dont have an accout Sign up now</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
