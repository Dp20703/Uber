import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../Context/MainContext";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  // const [userData, setUserData] = useState({})

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  // console.log(user)

  // Function to handle form submission of signup form:
  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    };
    // console.log(newUser);

    //Send user's data to register in databases using axios post method:
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );
      if (response.status === 201) {
        // console.log(response.data)
        const data = response.data;
        localStorage.setItem("token", data.token);
        setUser(data.user);
        alert("User Registration successful!");
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          alert("Please fill in all required fields.");
        } else if (error.response.status === 409) {
          alert("Email already exists. Try another.");
        } else {
          alert("An unexpected error occurred. Try again later.");
        }
      } else {
        alert("Network error. Please check your connection.");
      }
    }
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <div className="p-7 flex flex-col justify-between h-screen items-center ">
        <div>
          <img
            className="w-16 mb-10"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="uber-logo"
          />
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <h1 className="mb-2 font-medium text-lg">Enter your name:</h1>
            <div className="mb-6 flex gap-4 ">
              <input
                type="text"
                className="bg-[#eeeeee]  rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
                placeholder="First name"
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
                required
              />
              <input
                type="text"
                className="bg-[#eeeeee]  rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
                placeholder="Last name"
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
              />
            </div>
            <h1 className="text-lg font-medium mb-2">Enter your email:</h1>
            <input
              type="text"
              className="bg-[#eeeeee] mb-6 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              placeholder="example@gmail.com"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <h1 className="font-medium text-lg mb-2">Enter your password:</h1>
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
              Create account
            </button>
          </form>
          <p className="text-center">
            Already have an account?
            <Link to="/login" className="text-[#111] font-semibold underline">
              Login
            </Link>
          </p>
        </div>
        <div className="w-full">
          <p className="text-[10px] leading-tight">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline font-bold"> Google Policy </span>and{" "}
            <span className="underline font-bold">Terms of Service</span> apply.
          </p>
        </div>
      </div>
    </>
  );
};

export default UserSignup;
