import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../Context/MainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtectWrapper = ({ children }) => {
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");
  // console.log(token);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setIsLoading(false);
          setUser(response.data);
          //   alert("User profile got successfully");
          console.log("User profile got successfully");
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [token]);

  if (isLoading) {
    return <>Loading......</>;
  }

  return <>{children}</>;
};

export default UserProtectWrapper;
