/* eslint-disable react/prop-types */
import { PiChartLineUpLight } from "react-icons/pi";

const DashboardCard = ({
  title,
  amount,
  percent,
  bgColor,
  bgColor2,
  txColor,
  icon: Icon,
  image,
  setChartType,
  chartType,
}) => {
  return (
    <div
      onClick={() => setChartType(title)}
      className={`${bgColor} p-2 rounded-lg ${
        chartType === title ? "shadow-lg bg-[#061d35] text-white" : ""
      }`}
    >
      <div className="flex items-center">
        <div className={`${bgColor2}  inline-block rounded-lg mr-2`}>
          <Icon className={`font-extrabold text-[24px] ${txColor} m-2`} />
        </div>
        <span className="text-lg font-semibold"> {title}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div>
          <h1 className="text-[28px] font-bold">${amount}</h1>
          <div className="flex items-center text-green-500 mt-3">
            <PiChartLineUpLight />
            <p>{percent}%</p>
          </div>
        </div>
        <div>
          <img src={image} alt={`${title} illustration`} />
        </div>
      </div>
      <p className="text-[14px] text-[#72777F] mt-2">
        Data obtain for last 30 days
      </p>
    </div>
  );
};

export default DashboardCard;
