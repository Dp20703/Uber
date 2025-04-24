import React from "react";

const RidePopUp = (props) => {
  console.log("RidePop Props:", props);
  return (
    <div>
      <h5
        onClick={() => {
          props.setRidePopUpPanel(false);
        }}
        className="w-[93%] p-1 absolute text-center top-0"
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line" />
      </h5>
      <h2 className="text-2xl font-semibold mb-5">New Ride Available!</h2>
      <div className="flex justify-between items-center bg-yellow-400 p-3 rounded-xl mt-4">
        <div className="flex justify-between items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-conver"
            src="https://th.bing.com/th/id/OIP.PoSJIiqvHj9bFWYlWLNE7AHaHa?w=158&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7"
            alt="user-pic"
          />
          <h3 className="font-medium text-xl">
            {props.ride?.user.fullname.firstname +
              " " +
              props.ride?.user.fullname.lastname}
          </h3>
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
                {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 ">
            <i className="ri-square-fill text-lg" />
            <div>
              <h4 className="text-xl font-medium">562/11-A</h4>
              <p className="text-base text-gray-600 -mt-1">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 ">
            <i className="ri-money-rupee-circle-fill text-xl" />
            <div>
              <h4 className="text-xl font-medium">₹{props.ride?.fare} </h4>
              <p className="text-base text-gray-600 -mt-1">Cash Cash</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full mt-5">
          <button
            onClick={() => {
              props.setConfirmRidePopUpPanel(true);
              props.confirmRide();
            }}
            className=" bg-green-600 w-full text-white font-semibold py-4 mx-2 px-10 rounded-lg"
          >
            Accept
          </button>

          <button
            onClick={() => {
              props.setRidePopUpPanel(false);
            }}
            className=" w-full bg-gray-300 text-gray-700 font-semibold py-4 mx-2 px-10 rounded-lg"
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
