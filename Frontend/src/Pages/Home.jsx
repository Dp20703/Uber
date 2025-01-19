import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LocationSearchPanel from "../Components/LocationSearchPanel";
import VehicalPanel from "../Components/VehicalPanel";
import ConfirmRide from "../Context/ConfirmRide";
import LookingForDriver from "../Components/LookingForDriver";
import WaitingForDriver from "../Components/WaitingForDriver";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehicalPanel, setVehicalPanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicalFound, setVehicalFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const waitingForDriverRef = useRef(null);
  const vehicalFoundRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicalPanelRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding: 24,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        padding: 0,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehicalPanel) {
      gsap.to(vehicalPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehicalPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehicalPanel]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (vehicalFound) {
      gsap.to(vehicalFoundRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehicalFoundRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehicalFound]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingForDriver]);

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute top-5 left-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="uber-logo"
      />
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      {/*Search trip panel */}
      <div className=" top-0 h-screen w-full flex flex-col absolute justify-end">
        <div className="bg-white h-[30%] relative p-7">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute right-8 top-8 text-2xl opacity-0"
          >
            <i className="ri-arrow-down-wide-line" />
          </h5>
          <h4 className="font-semibold text-3xl">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute flex flex-col top-[42%] left-10 justify-center">
              <p className="ri-progress-8-fill text-sm" />
              <div className=" h-12 ml-1 w-1 bg-black rounded-full" />
              <p className="ri-square-fill text-sm" />
            </div>
            <input
              onClick={() => {
                setPanelOpen(true);
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
              }}
              className="bg-[#eee] w-full text-lg mt-6 px-12 py-2 rounded-lg"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setPanelOpen(true);
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              className="bg-[#eee] w-full text-lg mt-4 px-12 py-2 rounded-lg"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        {/* location panel */}
        <div ref={panelRef} className="bg-white h-0 ">
          <LocationSearchPanel
            setVehicalPanel={setVehicalPanel}
            setPanelOpen={setPanelOpen}
          />
        </div>
      </div>

      {/* vehicalPanel */}
      <div
        ref={vehicalPanelRef}
        className="fixed z-10  w-full px-3 py-10 bottom-0 bg-white pt-14 translate-y-full"
      >
        <VehicalPanel
          setVehicalPanel={setVehicalPanel}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>

      {/* confirmRidePanel */}
      <div
        ref={confirmRidePanelRef}
        className="fixed z-10  w-full px-3 py-10 bottom-0 bg-white pt-14 translate-y-full"
      >
        <ConfirmRide
          setVehicalFound={setVehicalFound}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicalPanel={setVehicalPanel}
        />
      </div>
      {/* lookingForDriver  */}
      <div
        ref={vehicalFoundRef}
        className="fixed z-10  w-full px-3 py-10 bottom-0 bg-white pt-14 translate-y-full"
      >
        <LookingForDriver setVehicalFound={setVehicalFound} />
      </div>
      {/* WaitingForDriver */}
      <div
        ref={waitingForDriverRef}
        className="fixed z-10  w-full px-3 py-10 bottom-0 bg-white pt-14 translate-y-full"
      >
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
