/* eslint-disable react/prop-types */
import { useState } from "react";

const TravelChart = ({ statusData }) => {
  const total =
    statusData.complete +
    statusData.pending +
    statusData.cancel +
    statusData.notReady;

  const completePercentage = (statusData.complete / total) * 100;
  const pendingPercentage = (statusData.pending / total) * 100;
  const cancelPercentage = (statusData.cancel / total) * 100;
  const notReadyPercentage = (statusData.notReady / total) * 100;

  // State to manage the hover tooltip visibility and content
  const [tooltip, setTooltip] = useState(null);

  // Function to show the tooltip on hover
  const handleMouseEnter = (status) => {
    setTooltip(status);
  };

  // Function to hide the tooltip
  const handleMouseLeave = () => {
    setTooltip(null);
  };

  // Tooltip content based on the hovered bar
  const getTooltipContent = (status) => {
    return (
      <div className="bg-[#eb5b2a] text-white p-2 rounded-md text-sm">
        <p>{status.name}</p>
        <p>
          {status.count} ({status.percentage.toFixed(2)}%)
        </p>
      </div>
    );
  };

  return (
    <div className="bg-white my-5 p-4 rounded-lg shadow md:col-span-1">
      <h1 className="text-[16px]">Travel Packages</h1>
      <div className="flex rounded-lg gap-1 mt-4 relative">
        {/* Complete */}
        <div
          className="h-16 rounded-l-lg"
          style={{
            width: `${completePercentage}%`,
            backgroundColor: "#fdefea",
          }}
          onMouseEnter={() =>
            handleMouseEnter({
              name: "Confirmed",
              count: statusData.complete,
              percentage: completePercentage,
            })
          }
          onMouseLeave={handleMouseLeave}
        >
          {tooltip && tooltip.name === "Confirmed" && (
            <div className="absolute top-[-30px] left-[50%] transform -translate-x-[50%]">
              {getTooltipContent(tooltip)}
            </div>
          )}
        </div>
        {/* Pending */}
        <div
          className="h-16"
          style={{ width: `${pendingPercentage}%`, backgroundColor: "#e7ecf2" }}
          onMouseEnter={() =>
            handleMouseEnter({
              name: "Pending",
              count: statusData.pending,
              percentage: pendingPercentage,
            })
          }
          onMouseLeave={handleMouseLeave}
        >
          {tooltip && tooltip.name === "Pending" && (
            <div className="absolute top-[-30px] left-[50%] transform -translate-x-[50%]">
              {getTooltipContent(tooltip)}
            </div>
          )}
        </div>
        {/* Cancel */}
        <div
          className="h-16"
          style={{ width: `${cancelPercentage}%`, backgroundColor: "#b4c5d7" }}
          onMouseEnter={() =>
            handleMouseEnter({
              name: "Cancel",
              count: statusData.cancel,
              percentage: cancelPercentage,
            })
          }
          onMouseLeave={handleMouseLeave}
        >
          {tooltip && tooltip.name === "Cancel" && (
            <div className="absolute top-[-30px] left-[50%] transform -translate-x-[50%]">
              {getTooltipContent(tooltip)}
            </div>
          )}
        </div>
        {/* Not Ready */}
        <div
          className="h-16 rounded-r-lg"
          style={{
            width: `${notReadyPercentage}%`,
            backgroundColor: "#90a9c3",
          }}
          onMouseEnter={() =>
            handleMouseEnter({
              name: "Not Ready",
              count: statusData.notReady,
              percentage: notReadyPercentage,
            })
          }
          onMouseLeave={handleMouseLeave}
        >
          {tooltip && tooltip.name === "Not Ready" && (
            <div className="absolute top-[-30px] left-[50%] transform -translate-x-[50%]">
              {getTooltipContent(tooltip)}
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 mt-10 gap-6">
        <div className="border-l-8 border-[#fdefea] rounded-md pl-3">
          <p className="text-[12px] font-medium">Confirmed</p>
          <p className="text-[24px] font-semibold">{statusData?.complete}</p>
        </div>
        <div className="border-l-8 border-[#e7ecf2] rounded-md pl-3">
          <p className="text-[12px] font-medium">Pending</p>
          <p className="text-[24px] font-semibold">{statusData?.pending}</p>
        </div>
        <div className="border-l-8 border-[#b4c5d7] rounded-md pl-3">
          <p className="text-[12px] font-medium">Cancel</p>
          <p className="text-[24px] font-semibold">{statusData?.cancel}</p>
        </div>
        <div className="border-l-8 border-[#90a9c3] rounded-md pl-3">
          <p className="text-[12px] font-medium">Not Ready</p>
          <p className="text-[24px] font-semibold">{statusData?.notReady}</p>
        </div>
      </div>
    </div>
  );
};

export default TravelChart;
