import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const states = [
  "",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Maharashtra",
  "Madhya Pradesh",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Tripura",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman & Nicobar (UT)",
  "Chandigarh (UT)",
  "Dadra & Nagar Haveli and Daman & Diu (UT)",
  "Delhi (NCT)",
  "Jammu & Kashmir (UT)",
  "Ladakh (UT)",
  "Lakshadweep (UT)",
  "Puducherry (UT)",
];

const Register = () => {
  const navigate = useNavigate();

  const [details, setdetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const registerApi = async () => {
    const response = await fetch("http://localhost:5000/api/users/signup", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(details),
    });
    const res = await response.json();
    const token = res.token;

    if (response.ok) {
      
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  };

  function getInputChangeHandler(e) {
    setdetails({ ...details, [e.target.name]: e.target.value });
  }

  return (
    <div className="h-screen w-screen items-center justify-center flex flex-col gap-4 ">
      <div className="flex flex-col gap-4 border border-black p-10">
        <span className="register-title text-2xl font-bold text-center">
          REGISTER
        </span>
        <form
          className="h-[50vh] w-[50vw] flex flex-col gap-4"
          method="POST"
          action="/products"
          onSubmit={(e) => {
            e.preventDefault();
            registerApi(e);
          }}
        >
          <div className="form-grid flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              name="username"
              onChange={getInputChangeHandler}
              className="p-3 border border-black"
            />
            <input
              className="p-3 border border-black"
              type="text"
              placeholder="Email"
              name="email"
              onChange={getInputChangeHandler}
            />

            <input
              className="p-3 border border-black"
              type="password"
              placeholder="Password"
              name="password"
              onChange={getInputChangeHandler}
            />
          </div>

          <button type="Submit" className="p-4 bg-blue-600">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
