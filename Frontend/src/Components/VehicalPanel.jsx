import React from "react";

const VehicalPanel = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setVehicalPanel(false);
          props.setVehicalFound(false);
        }}
        className="w-[93%] p-1 absolute text-center top-0"
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line" />
      </h5>
      <h2 className="text-2xl font-semibold mb-5">Choose a Vehical</h2>

      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.selectVehical("car");
        }}
        className="flex justify-between items-center  w-full px-3 py-8  border-2 rounded-xl active:border-black mb-2  bg-gray-100"
      >
        <img
          className="h-14"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt="uber-car"
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base">
            UberGo
            <span>
              <i className="ri-user-3-fill" />4
            </span>
          </h4>
          <h5 className="text-base font-medium">2 minus away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹{props.fare.car}</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.selectVehical("motorcycle");
        }}
        className="flex justify-between items-center  w-full px-3 py-6 bg-gray-100  border-2 rounded-xl active:border-black mb-2 "
      >
        <img
          className="h-14"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt="uber-moto"
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base">
            Moto
            <span>
              <i className="ri-user-3-fill" />1
            </span>
          </h4>
          <h5 className="text-base font-medium">2 minus away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, motorcycle rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹{props.fare.motorcycle}</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.selectVehical("auto");
        }}
        className="flex justify-between items-center bg-gray-100  w-full px-3 py-6  border-2 rounded-xl active:border-black mb-2 "
      >
        <img
          className="h-14"
          src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
          alt="uber-auto"
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base">
            UberAuto
            <span>
              <i className="ri-user-3-fill" />3
            </span>
          </h4>
          <h5 className="text-base font-medium">3 minus away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, auto rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹{props.fare.auto}</h2>
      </div>
    </div>
  );
};

export default VehicalPanel;
