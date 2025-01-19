import React from "react";

const LocationSearchPanel = (props) => {
  const locations = [
    "123 Main St Springfield, IL, USA",
    "456 Elm St San Francisco, CA, USA",
    "789 Oak St New York, NY, USA",
    "101 Pine St Seattle, WA, USA",
    "202 Maple St Austin, TX, USA",
  ];
  return (
    <div>
      {/* sample data for location */}
      {locations.map((elem, idx) => {
        return (
          <div
            onClick={() => {
              props.setPanelOpen(false);
              props.setVehicalPanel(true);
            }}
            key={idx}
            className="flex gap-4  justify-start items-center mb-2 rounded-xl border-2 border-gray-100 active:border-black p-3"
          >
            <h2 className="w-10 h-10 bg-[#eeee] rounded-full flex justify-center items-center">
              <i className="ri-map-pin-fill" />
            </h2>
            <h4 className="font-medium text-lg">{elem}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
