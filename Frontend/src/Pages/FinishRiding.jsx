import React from "react";
import { Link } from "react-router-dom";

const FinishRiding = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
        className="w-[93%] p-1 absolute text-center top-0"
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line" />
      </h5>
      <h2 className="text-2xl font-semibold mb-5">Finish this Ride</h2>
      <div className="flex justify-between items-center bg-yellow-400 p-3 rounded-xl mt-4">
        <div className="flex justify-between items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-conver"
            src="https://th.bing.com/th/id/OIP.PoSJIiqvHj9bFWYlWLNE7AHaHa?w=158&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7"
            alt="user-pic"
          />
          <h3 className="font-medium text-xl">Shreya Patel</h3>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="flex flex-col gap-2 items-center justify-between">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-y-2 ">
            <i className="ri-map-pin-2-fill text-lg" />
            <div>
              <h4 className="text-xl font-medium">562/11-A</h4>
              <p className="text-base text-gray-600 -mt-1">
                Kankariya Talab, Ahmedabad
              </p>
            </div>
          </div>
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
        <div className="w-full mt-6">
          <Link
            to={"/captain-home"}
            className="flex justify-center text-lg items-center mt-10 w-full bg-green-500 p-3 rounded-lg text-white font-semibold"
          >
            Finish Ride
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FinishRiding;
