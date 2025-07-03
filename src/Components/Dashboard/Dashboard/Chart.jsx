/* eslint-disable react/prop-types */
import { LineChart } from "@mui/x-charts";

const Chart = ({ title, data, timeInterval, setTimeInterval }) => {
  // Default data for different time intervals
  const defaultData = {
    weekly: [
      { x: "Week 1", y: 0 },
      { x: "Week 2", y: 0 },
      { x: "Week 3", y: 0 },
      { x: "Week 4", y: 0 },
    ],
    monthly: [
      { x: "Jan", y: 0 },
      { x: "Feb", y: 0 },
      { x: "Mar", y: 0 },
      { x: "Apr", y: 0 },
      { x: "May", y: 0 },
      { x: "Jun", y: 0 },
      { x: "Jul", y: 0 },
      { x: "Aug", y: 0 },
      { x: "Sep", y: 0 },
      { x: "Oct", y: 0 },
      { x: "Nov", y: 0 },
      { x: "Dec", y: 0 },
    ],
    yearly: [
      { x: "2021", y: 0 },
      { x: "2022", y: 0 },
      { x: "2023", y: 0 },
      { x: "2024", y: 0 },
    ],
  };

  const getWeekNumber = (date) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfMonth = date.getDate();
    return Math.ceil((dayOfMonth + firstDayOfMonth.getDay()) / 7);
  };

  const formatApiData = () => {
    if (!Array.isArray(data)) {
      console.warn("Data is not an array:", data);
      return [];
    }

    return data.map(item => {
      // Handle different data structures based on chartType
      const date = new Date(item.month || item.date);
      let value = 0;

      if (title === "User") {
        value = parseInt(item.users) || 0;
      } else if (title === "Guides") {
        value = parseInt(item.guides) || 0;
      } else {
        // For Booking and Earnings
        value = parseFloat(item.revenue) || 0;
      }

      return {
        date,
        value
      };
    });
  };

  const getFilteredData = () => {
    const formattedData = formatApiData();

    if (formattedData.length === 0) {
      return defaultData[timeInterval];
    }

    switch (timeInterval) {
      case "weekly": {
        const weeklyData = {};
        formattedData.forEach(item => {
          const weekNum = getWeekNumber(item.date);
          const weekKey = `Week ${weekNum}`;
          weeklyData[weekKey] = (weeklyData[weekKey] || 0) + item.value;
        });

        return defaultData.weekly.map(week => ({
          x: week.x,
          y: weeklyData[week.x] || 0
        }));
      }

      case "yearly": {
        const yearlyData = {};
        formattedData.forEach(item => {
          const year = item.date.getFullYear().toString();
          yearlyData[year] = (yearlyData[year] || 0) + item.value;
        });

        return defaultData.yearly.map(year => ({
          x: year.x,
          y: yearlyData[year.x] || 0
        }));
      }

      case "monthly":
      default: {
        const monthlyData = {};
        formattedData.forEach(item => {
          const month = item.date.toLocaleString('en-US', { month: 'short' });
          monthlyData[month] = (monthlyData[month] || 0) + item.value;
        });

        return defaultData.monthly.map(month => ({
          x: month.x,
          y: monthlyData[month.x] || 0
        }));
      }
    }
  };

  const filteredData = getFilteredData();

  // Calculate min and max values for better chart scaling
  const maxValue = Math.max(...filteredData.map(item => item.y));
  const minValue = Math.min(...filteredData.map(item => item.y));
  const yAxisBuffer = (maxValue - minValue) * 0.1; // Add 10% padding

  return (
    <div className="border rounded-xl p-4 my-4 bg-white">
      <div className="flex flex-col sm:flex-row gap-4 justify-between" style={{ marginBottom: "16px" }}>
        <h1 className="text-[24px] font-semibold text-center sm:text-start">
          {title === "Earnings" ? "Revenue" : title} Statistics
        </h1>
        <select
          value={timeInterval}
          onChange={(e) => setTimeInterval(e.target.value)}
          style={{
            color: "#fff",
            padding: "8px 16px",
            cursor: "pointer",
            fontSize: "14px",
            backgroundColor: "#EB5B2A",
            borderRadius: "4px",
            margin: "0 8px",
          }}
        >
          <option value="weekly">This Month</option>
          <option value="monthly">This Year</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div style={{ width: "100%", height: "300px" }}>
        <LineChart
          xAxis={[
            {
              scaleType: "band",
              data: filteredData.map(item => item.x),
              tickLabelStyle: {
                angle: 45,
                textAnchor: 'start',
                fontSize: 12
              },
              disableLine: true,
            },
          ]}
          yAxis={[
            {
              min: Math.max(0, minValue - yAxisBuffer),
              max: maxValue + yAxisBuffer,
              disableLine: true,
              valueFormatter: (value) => `$${value}`,
            }
          ]}
          series={[
            {
              data: filteredData.map(item => item.y),
              label: title,
              color: "#ff971833",
              curve: "natural",
              area: true,
              showMark: true,
            },
          ]}
          grid={{
            horizontal: true,
            vertical: false,
          }}
          slotProps={{
            legend: {
              hidden: true
            }
          }}
        />
      </div>
    </div>
  );
};

export default Chart;
