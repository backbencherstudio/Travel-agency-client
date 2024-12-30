/* eslint-disable react/prop-types */

const DashboardCard = ({
  title,
  amount,
  icon: Icon,
  setChartType,
  chartType,
}) => {
  return (
    <div
      onClick={() => setChartType(title)}
      className={`p-2 rounded-lg ${
        chartType === title ? "shadow-lg bg-[#061d35] text-white" : "bg-white "
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={` bg-[#eb5b2a] text-white inline-block rounded-lg mr-2`}
        >
          <Icon className={`font-extrabold text-[24px] m-2`} />
        </div>
        <div>
          <span className="text-lg font-semibold"> {title}</span>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
              <h1
                className={`text-[28px]  font-bold ${
                  chartType === title ? "text-white" : "text-black"
                }`}
              >
                {amount}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
