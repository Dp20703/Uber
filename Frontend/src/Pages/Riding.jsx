import React from "react";
import { Link } from "react-router-dom";

const Riding = () => {
  return (
    <div className="h-screen w-screen">
      <img
        className="w-16 absolute top-5 left-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="uber-logo"
      />
      <Link
        to="/home"
        className="fixed  top-2 right-2 w-10 h-10 flex justify-center items-center rounded-full bg-white "
      >
        <i className="ri-home-5-line text-lg font-medium" />
      </Link>
      <div className="h-1/2 w-full ">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="map"
        />
      </div>
      <div className="h-1/2 w-full p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-24"
            src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
            alt="uber-car"
          />
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">Darshan</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">
              MH27 0220 3438
            </h4>
            <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center justify-between">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2 ">
              <i className="ri-square-fill text-lg" />
              <div>
                <h4 className="text-xl font-medium">Oppsite Lijjat House</h4>
                <p className="text-base text-gray-600 -mt-1">Ahmedabad</p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3 border-b-2 ">
              <i className="ri-money-rupee-circle-fill text-xl" />
              <div>
                <h4 className="text-xl font-medium">₹195</h4>
                <p className="text-base text-gray-600 -mt-1">Cash Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className="mt-5 w-full bg-black p-2 rounded-lg text-white font-semibold">
         <Link to={'/home'}> Make a Payment</Link>
        </button>
      </div>
    </div>
  );
};

export default Riding;
