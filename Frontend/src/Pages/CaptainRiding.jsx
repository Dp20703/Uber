import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FinishRiding from "./FinishRiding";
import LiveTracking from "../Components/LiveTracking";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;
  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [finishRidePanel]);

  return (
    <div className="h-screen relative flex flex-col justify-end">
      {" "}
      <div className="fixed flex items-center  justify-between w-screen top-0 p-3">
        <img
          className="w-16"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="uber-logo"
        />
        <Link
          to="/captain-login"
          className="w-10 h-10 flex justify-center items-center rounded-full bg-white "
        >
          <i className="ri-logout-box-r-line text-lg font-medium" />
        </Link>
      </div>
      {/* <div className="h-4/5 w-full ">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="map"
        />
      </div> */}
      <div
        onClick={() => {
          setFinishRidePanel(true);
        }}
        className="relative h-1/5 w-full p-6 bg-yellow-400 flex items-center justify-between"
      >
        <h5
          onClick={() => {
            setFinishRidePanel(true);
          }}
          className="w-[93%] p-1 absolute text-center top-0 "
        >
          <i className="text-3xl text-black ri-arrow-up-wide-line" />
        </h5>
        <h5 className="font-semibold text-xl">4 KM away</h5>
        <button className=" bg-green-500 p-3 px-10  rounded-lg text-white font-semibold">
          Complete Ride
        </button>
      </div>
      <div
        ref={finishRidePanelRef}
        className="fixed z- [500] w-full px-3 py-10 bottom-0 translate-y-full bg-white pt-14"
      >
        <FinishRiding ride={rideData} setFinishRidePanel={setFinishRidePanel} />
      </div>
      <div className="h-screen fixed w-screen top-0 z-[-1]">
        <LiveTracking />
      </div>
    </div>
  );
};

export default CaptainRiding;
