import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  console.log("User Logout page loading..");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token found:", token);

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("token");
          alert("User Logged out Successfully");
          console.log("User Logged out Successfully");
          navigate("/login");
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            localStorage.removeItem("token");
            alert("Session expired, please login again.");
            navigate("/login");
          } else {
            alert(
              `Error: ${error.response.data.message || "Something went wrong!"}`
            );
            console.error("Error Response:", error.response.data);
          }
        } else if (error.request) {
          alert(
            "No response from server. Please check your network connection."
          );
          console.error("No Response:", error.request);
        } else {
          alert("An error occurred while processing your request.");
          console.error("Error Message:", error.message);
        }
      });
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default UserLogout;
