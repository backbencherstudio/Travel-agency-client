/* eslint-disable react/prop-types */
import { LineChart } from "@mui/x-charts";

const Chart = ({ title, data, timeInterval, setTimeInterval }) => {
  const getFilteredData = () => {
    switch (timeInterval) {
      case "weekly":
        return data.filter((d) => d.x.startsWith("Week"));
      case "yearly":
        return data.filter((d) => d.x.length === 4 && !isNaN(d.x));
      case "monthly":
      default:
        return data.filter((d) => {
          const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          return months.includes(d.x);
        });
    }
  };

  const filteredData = getFilteredData();
  // console.log(filteredData); // Debugging to check the filtered data

  return (
    <div className="border rounded-xl p-4 my-4 bg-white">
      {/* Filter buttons */}
      <div className="flex justify-between" style={{ marginBottom: "16px" }}>
        <h1 className="text-[24px] font-semibold">{title} Statistics</h1>
        <select
          value={timeInterval}
          onChange={(e) => setTimeInterval(e.target.value)}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            fontSize: "14px",
            border: "1px solid #e86731",
            borderRadius: "4px",
            margin: "0 8px",
            color: "#e86731",
          }}
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* LineChart */}
      <div style={{ width: "100%", height: "300px" }}>
        <LineChart
          xAxis={[
            {
              scaleType: "band",
              data: filteredData.map((data) => data.x),
            },
          ]}
          series={[
            {
              data: filteredData.map((data) => data.y),
              label: `${title} `,
              color: "tomato",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Chart;
