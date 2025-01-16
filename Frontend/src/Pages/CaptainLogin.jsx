import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useAsyncError, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../Context/CaptainContext";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);

  //It will submit the form and set the email and password to the captainData state:
  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = { email: email, password: password };
    // console.log(captainData);
    setEmail("");
    setPassword("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        captainData
      );
      if ((response.status = 200)) {
        const data = response.data;
        // console.log(response);
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        alert("Captain login successfully!");
        console.log("Captain login successfully!");
        navigate("/captain-home");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          alert("Please fill in all required fields.");
        } else if (error.response.status === 401) {
          alert("Invalid email or password");
        } else if (error.response.status === 409) {
          alert("Email already exists. Try another.");
        } else {
          alert("An unexpected error occurred. Try again later.");
        }
      } else {
        alert("Network error. Please check your connection.");
      }
    }
  };
  return (
    <div className="p-7 flex flex-col justify-between h-screen items-center ">
      <div>
        <img
          className="w-20 mb-3"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="uber-logo"
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h1 className="text-lg font-medium mb-2">Enter Captain's email:</h1>
          <input
            type="text"
            className="bg-[#eeeeee] mb-6 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />

          <h1 className="font-medium text-lg mb-2">
            Enter Captain's password:
          </h1>
          <input
            className="border text-lg px-4 w-full py-2 bg-[#eeeeee] mb-6 rounded "
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="py-2 px-4 bg-[#111] text-white mb-6 text-lg font-semibold w-full rounded-lg">
            Login
          </button>
        </form>
        <p className="text-center">
          Don't have an account?
          <Link
            to="/captain-signup"
            className="text-[#111] font-semibold underline"
          >
            {" "}
            Sign up
          </Link>
        </p>
      </div>
      <div className="w-full">
        <Link
          to="/login"
          className="bg-[#111] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
