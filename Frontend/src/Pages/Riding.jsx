import React from "react";
import { Link, useLocation } from "react-router-dom"; // Added useLocation
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../Context/SocketContext";
import LiveTracking from "../Components/LiveTracking";

const Riding = () => {
  const location = useLocation();
  const { ride } = location.state || {}; // Retrieve ride data
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  socket.on("ride-ended", () => {
    navigate("/home");
  });
  return (
    <div className="h-screen w-screen">
      <div className="h-2/4 w-full">
        <img
          className="w-16 absolute top-5 left-5 z-50"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="uber-logo"
        />
        <Link
          to="/home"
          className="fixed z-50 top-2 right-2 w-10 h-10 flex justify-center items-center rounded-full bg-white "
        >
          <i className="ri-home-5-line text-lg font-medium" />
        </Link>
        <LiveTracking />
      </div>

      <div className="h-1/4 w-full p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-24"
            src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
            alt="uber-car"
          />
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">
              {ride?.captain.fullname.firstname}
            </h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">
              {ride?.captain.vehical.plate}
            </h4>
            <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center justify-between">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2 ">
              <i className="ri-square-fill text-lg" />
              <div>
                <h4 className="text-xl font-medium">562/11-A</h4>
                <p className="text-base text-gray-600 -mt-1">
                  {ride?.destination}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3 border-b-2 ">
              <i className="ri-money-rupee-circle-fill text-xl" />
              <div>
                <h4 className="text-xl font-medium">₹{ride?.fare} </h4>
                <p className="text-base text-gray-600 -mt-1">Cash Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className="mt-5 w-full bg-black p-2 rounded-lg text-white font-semibold">
          <Link to={"/home"}> Make a Payment</Link>
        </button>
      </div>
    </div>
  );
};

export default Riding;
