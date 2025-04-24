import React, { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LocationSearchPanel from "../Components/LocationSearchPanel";
import VehicalPanel from "../Components/VehicalPanel";
import ConfirmRide from "../Context/ConfirmRide";
import LookingForDriver from "../Components/LookingForDriver";
import WaitingForDriver from "../Components/WaitingForDriver";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SocketContext } from "../Context/SocketContext";
import { UserDataContext } from "../Context/MainContext";
import LiveTracking from "../Components/LiveTracking";

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
  const findTripPanelRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicalType, setVehicalType] = useState(null);
  const [ride, setRide] = useState(null);

  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);

  socket.on("ride-confirmed", (ride) => {
    setVehicalFound(false);
    setWaitingForDriver(true);
    setRide(ride);
  });

  socket.on("ride-started", (ride) => {
    console.log("ride");
    setWaitingForDriver(false);
    navigate("/riding", { state: { ride } }); // Updated navigate to include ride data
  });

  socket.on("ride-confirmed", (ride) => {
    setVehicalFound(false);
    setWaitingForDriver(true);
    setRide(ride);
  });
  // Function to handle pickup change
  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("handle Pickup Response:", response.data);
      setPickupSuggestions(response.data);
    } catch {
      // handle error
    }
  };

  // Function to handle destination change
  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("handle Destination Response:", response.data);
      setDestinationSuggestions(response.data);
    } catch {
      // handle error
    }
  };

  // Function to find a trip
  async function findTrip() {
    setVehicalPanel(true);
    setPanelOpen(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("Get Fare Response:", response.data);
    setFare(response.data);
  }
  // Function to create a new ride
  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicalType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("Create ride response:", response.data);
  }
  // Function to handle form submission
  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (panelOpen) {
      //findTrip panel:
      gsap.to(findTripPanelRef.current, {
        zIndex: 999,
      });
      //Location panel:
      gsap.to(panelRef.current, {
        height: "70%",
        padding: 24,
      });
      //panel close icon:
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      });
    } else {
      //findTrip panel:
      gsap.to(findTripPanelRef.current, {
        zIndex: 1,
      });
      //Location panel:
      gsap.to(panelRef.current, {
        height: "0%",
        padding: 0,
      });
      //panel close icon:
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
      <div className="h-full w-full">
        <img
          className="w-16  absolute top-5 left-5 z-50"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="uber-logo"
        />
        <LiveTracking />
        <Link
          to="/user/logout"
          className=" top-2 right-2 fixed  z-[999]  h-14 z-1 flex justify-end  items-center rounded-full bg-white "
        >
          <i className="ri-logout-box-r-line text-lg font-medium my-3 mx-5 z-1" />
        </Link>
      </div>
      {/*Search trip panel */}
      <div className=" top-0 h-screen w-full flex flex-col absolute justify-end">
        <div ref={findTripPanelRef} className="bg-white h-[35%] relative p-7">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute right-8 top-8 text-2xl opacity-0 z-[39999] "
          >
            <i className="ri-arrow-down-wide-line z-[3999]" />
          </h5>
          <h4 className="font-semibold text-3xl">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute flex flex-col top-[38%] left-10 justify-center">
              <p className="ri-progress-8-fill text-sm" />
              <div className=" h-12 ml-1 w-1 bg-black rounded-full" />
              <p className="ri-square-fill text-sm" />
            </div>
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={handlePickupChange}
              className="bg-[#eee] w-full text-lg mt-6 px-12 py-2 rounded-lg"
              type="text"
              placeholder="Add a pick-up location"
              required
            />
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              value={destination}
              required
              onChange={handleDestinationChange}
              className="bg-[#eee] w-full text-lg mt-4 px-12 py-2 rounded-lg"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
          <button
            onClick={findTrip}
            className="bg-black text-white px-4 py-2 rounded-lg mt-4 w-full"
          >
            Find Trip
          </button>
        </div>
        {/* location panel */}
        <div ref={panelRef} className="bg-white h-0 ">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPanelOpen={setPanelOpen}
            setVehicalPanel={setVehicalPanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
            setVehicalFound={setVehicalFound}
          />
        </div>
      </div>

      {/* vehicalPanel */}
      <div
        ref={vehicalPanelRef}
        className="fixed z-10  w-full px-3 py-10 bottom-0 bg-white pt-14 translate-y-full"
      >
        <VehicalPanel
          fare={fare}
          selectVehical={setVehicalType}
          setVehicalPanel={setVehicalPanel}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicalFound={setVehicalFound}
          setPanelOpen={setPanelOpen}
        />
      </div>

      {/* confirmRidePanel */}
      <div
        ref={confirmRidePanelRef}
        className="fixed z-10  w-full px-3 py-10 bottom-0 bg-white pt-14 translate-y-full"
      >
        <ConfirmRide
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          vehicalType={vehicalType}
          fare={fare}
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
        <LookingForDriver
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          vehicalType={vehicalType}
          fare={fare}
          setVehicalFound={setVehicalFound}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicalPanel={setVehicalPanel}
        />
      </div>
      {/* WaitingForDriver */}
      <div
        ref={waitingForDriverRef}
        className="fixed z-10  w-full px-3 py-10 bottom-0 bg-white pt-14 translate-y-full"
      >
        <WaitingForDriver
          setWaitingForDriver={setWaitingForDriver}
          setVehicalFound={setVehicalFound}
          ride={ride}
          waitingForDriver={waitingForDriver}
        />
      </div>
    </div>
  );
};

export default Home;
