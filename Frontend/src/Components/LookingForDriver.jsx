import React from "react";

const LookingForDriver = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setVehicalFound(false);
        }}
        className="w-[93%] p-1 absolute text-center top-0"
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line" />
      </h5>
      <h2 className="text-2xl font-semibold mb-5">Looking for a Driver</h2>

      <div className="flex flex-col gap-2 items-center justify-between">
        <img
          className="h-24 "
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt="uber-car"
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-y-2 ">
            <i className="ri-map-pin-2-fill text-lg" />
            <div>
              <h4 className="text-xl font-medium">562/11-A</h4>
              <p className="text-base text-gray-600 -mt-1">
                {props.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 ">
            <i className="ri-square-fill text-lg" />
            <div>
              <h4 className="text-xl font-medium">562/11-A</h4>
              <p className="text-base text-gray-600 -mt-1">{props.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 ">
            <i className="ri-money-rupee-circle-fill text-xl" />
            <div>
              <h4 className="text-xl font-medium">₹{props.fare[props.vehicalType]}</h4>
              <p className="text-base text-gray-600 -mt-1">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
