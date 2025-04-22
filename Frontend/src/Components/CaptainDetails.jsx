import React, { useContext } from "react";
import { CaptainDataContext } from "../Context/CaptainContext";

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);
  console.log("Captain Details:", captain);
  return (
    <div>
      {" "}
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <img
            className="h-10 w-10 object-cover  rounded-full "
            src="https://th.bing.com/th/id/OIP.q10JcSV8pb4VJV_RW6MzvwHaHa?rs=1&pid=ImgDetMain"
            alt="captain-img"
          />
          <h5 className="text-xl font-medium capitalize">
            {captain.fullname.firstname + " " + captain.fullname.lastname}
          </h5>
        </div>

        <div>
          <h5 className="text-xl font-medium">₹325.25</h5>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex justify-center items-start p-3 mt-8 bg-gray-100 rounded-xl gap-5">
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-timer-2-line" />
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-speed-up-line" />
          <h5 className="text-lg font-medium">30 Km</h5>
          <p className="text-sm text-gray-600">Total Distance</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-todo-line" />
          <h5 className="text-lg font-medium">20</h5>
          <p className="text-sm text-gray-600">Total Jobs</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
