import { useState } from "react";
import { GiProfit } from "react-icons/gi";
import { FaRegCalendarCheck } from "react-icons/fa";
import { PiUserCirclePlusBold } from "react-icons/pi";
import { GrUserWorker } from "react-icons/gr";
import revenue from "../../../assets/dashboard/revenue.svg";
import traveler from "../../../assets/dashboard/traveler.svg";
import profit from "../../../assets/dashboard/profit.svg";
import DashboardCard from "./DashboardCard";
import Chart from "./Chart";
import CustomTable from "../../../Shared/CustomTable";
import TravelChart from "./TravelChart";
import { bookingData, statusData } from "../../../data/data";

const DashboardAnalysis = () => {
  const [chartType, setChartType] = useState("Booking");
  const [timeInterval, setTimeInterval] = useState("monthly");
  const [tourDateFilter, setTourDateFilter] = useState("all");
  const [columns] = useState({
    bookingId: true,
    name: true,
    date: true,
    destination: true,
    amount: true,
    status: true,
  });

  const dashboardData = [
    {
      title: "Booking",
      amount: "1,930",
      icon: FaRegCalendarCheck,
      image: revenue,
      revenueData: [
        { x: "Jan", y: 12000 },
        { x: "Feb", y: 15000 },
        { x: "Mar", y: 17000 },
        { x: "Apr", y: 19000 },
        { x: "May", y: 27000 },
        { x: "June", y: 17000 },
        { x: "Week 1", y: 1000 },
        { x: "Week 2", y: 1200 },
        { x: "Week 3", y: 1100 },
        { x: "Week 4", y: 1400 },
        { x: "Week 5", y: 1100 },
        { x: "Week 6", y: 1800 },
        { x: "2021", y: 25000 },
        { x: "2022", y: 30000 },
        { x: "2023", y: 35000 },
        { x: "2024", y: 20000 },
        { x: "2025", y: 50000 },
      ],
    },
    {
      title: "User",
      amount: "2,930",
      icon: PiUserCirclePlusBold,
      image: traveler,
      travelerData: [
        { x: "Jan", y: 12000 },
        { x: "Feb", y: 15000 },
        { x: "Mar", y: 17000 },
        { x: "Apr", y: 19000 },
        { x: "May", y: 27000 },
        { x: "June", y: 17000 },
        { x: "Week 1", y: 1000 },
        { x: "Week 2", y: 1200 },
        { x: "Week 3", y: 1100 },
        { x: "Week 4", y: 1400 },
        { x: "Week 5", y: 1100 },
        { x: "Week 6", y: 1800 },
        { x: "2021", y: 25000 },
        { x: "2022", y: 30000 },
        { x: "2023", y: 35000 },
        { x: "2024", y: 20000 },
        { x: "2025", y: 50000 },
      ],
    },
    {
      title: "Guides",
      amount: "140+ ",
      icon: GrUserWorker,
      image: profit,
      profitData: [
        { x: "Jan", y: 12000 },
        { x: "Feb", y: 15000 },
        { x: "Mar", y: 17000 },
        { x: "Apr", y: 19000 },
        { x: "May", y: 27000 },
        { x: "June", y: 17000 },
        { x: "Week 1", y: 1000 },
        { x: "Week 2", y: 1200 },
        { x: "Week 3", y: 1100 },
        { x: "Week 4", y: 1400 },
        { x: "Week 5", y: 1100 },
        { x: "Week 6", y: 1800 },
        { x: "2021", y: 25000 },
        { x: "2022", y: 30000 },
        { x: "2023", y: 35000 },
        { x: "2024", y: 20000 },
        { x: "2025", y: 50000 },
      ],
    },
    {
      title: "Earnings",
      amount: "$12,930",
      icon: GiProfit,
      image: profit,
      profitData: [
        { x: "Jan", y: 12000 },
        { x: "Feb", y: 15000 },
        { x: "Mar", y: 17000 },
        { x: "Apr", y: 19000 },
        { x: "May", y: 27000 },
        { x: "June", y: 17000 },
        { x: "Week 1", y: 1000 },
        { x: "Week 2", y: 1200 },
        { x: "Week 3", y: 1100 },
        { x: "Week 4", y: 1400 },
        { x: "Week 5", y: 1100 },
        { x: "Week 6", y: 1800 },
        { x: "2021", y: 25000 },
        { x: "2022", y: 30000 },
        { x: "2023", y: 35000 },
        { x: "2024", y: 20000 },
        { x: "2025", y: 50000 },
      ],
    },
  ];

  return (
    <div className="">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-4">
          {dashboardData?.map((data, index) => (
            <DashboardCard
              key={index}
              title={data.title}
              amount={data.amount}
              icon={data.icon}
              image={data.image}
              chartType={chartType}
              setChartType={setChartType}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-3">
          <div className="md:col-span-2">
            {chartType === "Booking" ? (
              <Chart
                title="Booking"
                data={dashboardData[0].revenueData}
                timeInterval={timeInterval}
                setTimeInterval={setTimeInterval}
              />
            ) : chartType === "User" ? (
              <Chart
                title="User"
                data={dashboardData[1].travelerData}
                timeInterval={timeInterval}
                setTimeInterval={setTimeInterval}
              />
            ) : chartType === "Guides" ? (
              <Chart
                title="Guides"
                data={dashboardData[1].travelerData}
                timeInterval={timeInterval}
                setTimeInterval={setTimeInterval}
              />
            ) : (
              <Chart
                title="Profit"
                data={dashboardData[2].profitData}
                timeInterval={timeInterval}
                setTimeInterval={setTimeInterval}
              />
            )}
          </div>
          <TravelChart statusData={statusData} />
        </div>
      </div>
      <CustomTable
        title={"Recent Booking"}
        data={bookingData}
        setDateFilter={setTourDateFilter}
        dateFilter={tourDateFilter}
        columns={columns}
      />
    </div>
  );
};

export default DashboardAnalysis;
