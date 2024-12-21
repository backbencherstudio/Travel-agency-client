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
import { statusData } from "../../../data/data";

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
  const bookingData = [
    {
      bookingId: 901923,
      customerName: "Robert Downi",
      customerImg: "https://via.placeholder.com/40?text=RD",
      destination: "London",
      destinationImg: "https://via.placeholder.com/40?text=LD",
      amount: "$1200",
      status: "Complete",
      date: "June 12, 2024",
    },
    {
      bookingId: 901924,
      customerName: "John Doe",
      customerImg: "https://via.placeholder.com/40?text=JD",
      destination: "New York",
      destinationImg: "https://via.placeholder.com/40?text=NY",
      amount: "$1500",
      status: "Pending",
      date: "June 13, 2024",
    },
    {
      bookingId: 901925,
      customerName: "Jane Smith",
      customerImg: "https://via.placeholder.com/40?text=JS",
      destination: "Paris",
      destinationImg: "https://via.placeholder.com/40?text=PR",
      amount: "$2000",
      status: "Complete",
      date: "June 14, 2024",
    },
    {
      bookingId: 901926,
      customerName: "Michael Johnson",
      customerImg: "https://via.placeholder.com/40?text=MJ",
      destination: "Tokyo",
      destinationImg: "https://via.placeholder.com/40?text=TOK",
      amount: "$1700",
      status: "Canceled",
      date: "June 15, 2024",
    },
    {
      bookingId: 901927,
      customerName: "Emily Davis",
      customerImg: "https://via.placeholder.com/40?text=ED",
      destination: "Sydney",
      destinationImg: "https://via.placeholder.com/40?text=SYD",
      amount: "$1800",
      status: "Complete",
      date: "June 16, 2024",
    },
    {
      bookingId: 901928,
      customerName: "William Brown",
      customerImg: "https://via.placeholder.com/40?text=WB",
      destination: "Berlin",
      destinationImg: "https://via.placeholder.com/40?text=BR",
      amount: "$1300",
      status: "Pending",
      date: "June 17, 2024",
    },
    {
      bookingId: 901929,
      customerName: "Olivia White",
      customerImg: "https://via.placeholder.com/40?text=OW",
      destination: "Rome",
      destinationImg: "https://via.placeholder.com/40?text=RO",
      amount: "$1100",
      status: "Complete",
      date: "June 18, 2024",
    },
    {
      bookingId: 901930,
      customerName: "James Black",
      customerImg: "https://via.placeholder.com/40?text=JB",
      destination: "Amsterdam",
      destinationImg: "https://via.placeholder.com/40?text=AMS",
      amount: "$1400",
      status: "Complete",
      date: "June 19, 2024",
    },
    {
      bookingId: 901931,
      customerName: "Sophia Harris",
      customerImg: "https://via.placeholder.com/40?text=SH",
      destination: "Rome",
      destinationImg: "https://via.placeholder.com/40?text=RO",
      amount: "$1600",
      status: "Complete",
      date: "June 20, 2024",
    },
    {
      bookingId: 901932,
      customerName: "Benjamin Wilson",
      customerImg: "https://via.placeholder.com/40?text=BW",
      destination: "Dubai",
      destinationImg: "https://via.placeholder.com/40?text=DU",
      amount: "$2500",
      status: "Canceled",
      date: "June 21, 2024",
    },
    {
      bookingId: 901933,
      customerName: "Charlotte Moore",
      customerImg: "https://via.placeholder.com/40?text=CM",
      destination: "London",
      destinationImg: "https://via.placeholder.com/40?text=LD",
      amount: "$1400",
      status: "Complete",
      date: "June 22, 2024",
    },
    {
      bookingId: 901934,
      customerName: "Liam Taylor",
      customerImg: "https://via.placeholder.com/40?text=LT",
      destination: "Las Vegas",
      destinationImg: "https://via.placeholder.com/40?text=LV",
      amount: "$2200",
      status: "Complete",
      date: "June 23, 2024",
    },
    {
      bookingId: 901935,
      customerName: "Amelia Clark",
      customerImg: "https://via.placeholder.com/40?text=AC",
      destination: "Madrid",
      destinationImg: "https://via.placeholder.com/40?text=MA",
      amount: "$1300",
      status: "Pending",
      date: "June 24, 2024",
    },
    {
      bookingId: 901936,
      customerName: "Ethan Lewis",
      customerImg: "https://via.placeholder.com/40?text=EL",
      destination: "Paris",
      destinationImg: "https://via.placeholder.com/40?text=PR",
      amount: "$1900",
      status: "Complete",
      date: "June 25, 2024",
    },
    {
      bookingId: 901937,
      customerName: "Ava Walker",
      customerImg: "https://via.placeholder.com/40?text=AW",
      destination: "New York",
      destinationImg: "https://via.placeholder.com/40?text=NY",
      amount: "$1600",
      status: "Pending",
      date: "June 26, 2024",
    },
    {
      bookingId: 901938,
      customerName: "Mason Scott",
      customerImg: "https://via.placeholder.com/40?text=MS",
      destination: "Tokyo",
      destinationImg: "https://via.placeholder.com/40?text=TOK",
      amount: "$2100",
      status: "Complete",
      date: "June 27, 2024",
    },
    {
      bookingId: 901939,
      customerName: "Isabella Adams",
      customerImg: "https://via.placeholder.com/40?text=IA",
      destination: "Dubai",
      destinationImg: "https://via.placeholder.com/40?text=DU",
      amount: "$2300",
      status: "Complete",
      date: "June 28, 2024",
    },
    {
      bookingId: 901940,
      customerName: "Lucas Nelson",
      customerImg: "https://via.placeholder.com/40?text=LN",
      destination: "Barcelona",
      destinationImg: "https://via.placeholder.com/40?text=BCN",
      amount: "$1600",
      status: "Complete",
      date: "June 29, 2024",
    },
    {
      bookingId: 901941,
      customerName: "Mia Perez",
      customerImg: "https://via.placeholder.com/40?text=MP",
      destination: "Sydney",
      destinationImg: "https://via.placeholder.com/40?text=SYD",
      amount: "$1500",
      status: "Pending",
      date: "June 30, 2024",
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
