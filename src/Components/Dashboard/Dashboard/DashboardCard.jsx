/* eslint-disable react/prop-types */

const DashboardCard = ({
  title,
  amount,
  icon,
  setChartType,
  chartType,
}) => {
  return (
    <div
      onClick={() => setChartType(title)}
      className={`px-3 py-6 rounded-lg ${
        chartType === title ? "shadow-lg bg-[#061D35] text-white" : "bg-white "
      }`}
    >
      <div className="flex items-start w-fit gap-3">
        <div
          className={` bg-[#eb5b2a] text-white inline-block rounded-lg w-fit`}
        >
          {icon}
        </div>
        <div>
          <span className={`text-[12px] font-medium ${
                  chartType === title ? "text-[#E9E9EA] " : "text-[#4A4C56]"
                }`}> {title}</span>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <h1
                className={`text-[24px]  font-bold ${
                  chartType === title ? "text-white" : "text-[#0F1416]"
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
