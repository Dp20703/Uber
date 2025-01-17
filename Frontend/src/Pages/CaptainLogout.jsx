import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CaptainLogout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log(token);

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem("token");
        alert("Captain Logged out Successfully");
        console.log("Captain Logged out Successfully");
        navigate("/Captain-login");
      }
    })
    .catch((error) => {
      if (error.response) {
        // Server responded with a status outside the 2xx range
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          alert("Session expired, please login again.");
          console.log("Session expired");
          navigate("/captain-login");
        } else {
          alert(
            `Error: ${error.response.data.message || "Something went wrong!"}`
          );
          console.error("Error Response:", error.response.data);
        }
      } else if (error.request) {
        // No response received from the server
        alert("No response from server. Please check your network connection.");
        console.error("No Response:", error.request);
      } else {
        // General error (e.g., coding issue)
        alert("An error occurred while processing your request.");
        console.error("Error Message:", error.message);
      }
    });

  return <div>CaptainLogout</div>;
};

export default CaptainLogout;
