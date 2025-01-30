import { useState, useEffect } from "react";
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
import DashboardApis from "../../../Apis/DashboardApis";
import { Helmet } from "react-helmet-async";

const DashboardAnalysis = () => {
  const [chartType, setChartType] = useState("Booking");
  const [timeInterval, setTimeInterval] = useState("monthly");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total_bookings: 0,
    total_users: 0,
    total_vendors: 0,
    total_revenue: 0,
    revenue_per_month: [],
    bookings: [],
  });
  const [columns] = useState({
    bookingId: true,
    name: true,
    date: true,
    destination: true,
    amount: true,
    status: true,
  });

  const processBookingData = (bookings) => {
    return bookings.map((booking) => ({
      id: booking.id,
      bookingId: booking.id?.slice(-8)?.toUpperCase() || "N/A",
      name: booking.user?.name || "N/A",
      date: new Date(booking.created_at).toLocaleDateString(),
      destination: booking.booking_items?.[0]?.package?.name || "N/A",
      amount: `$${parseFloat(booking.total_amount || 0).toLocaleString()}`,
      status: booking.status?.charAt(0)?.toUpperCase() + booking.status?.slice(1) || "N/A",
    }));
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await DashboardApis.getDashboardData();
      console.log("Dashboard API Response:", response.data);
      if (response.success) {
        const data = response.data;
        setStats({
          total_bookings: data.total_bookings || 0,
          total_users: data.total_users || 0,
          total_vendors: data.total_vendors || 0,
          total_revenue: data.total_revenue || 0,
          revenue_per_month: data.revenue_per_month || [],
          bookings: processBookingData(data.bookings || []),
        });
      } else {
        setError(response.message || "Failed to load dashboard data");
      }
    } catch (err) {
      console.error("Dashboard data fetch error:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const dashboardData = [
    {
      title: "Booking",
      amount: loading ? "Loading..." : error ? "0" : stats.total_bookings.toLocaleString(),
      icon: FaRegCalendarCheck,
      image: revenue,
      revenueData: stats.revenue_per_month,
    },
    {
      title: "User",
      amount: loading ? "Loading..." : error ? "0" : stats.total_users.toLocaleString(),
      icon: PiUserCirclePlusBold,
      image: traveler,
      travelerData: stats.users_per_month,
    },
    {
      title: "Guides",
      amount: loading ? "Loading..." : error ? "0" : `${stats.total_vendors.toLocaleString()}+ `,
      icon: GrUserWorker,
      image: profit,
      profitData: stats.guides_per_month,
    },
    {
      title: "Earnings",
      amount: loading ? "Loading..." : error ? "$0" : `$${parseFloat(stats.total_revenue).toLocaleString()}`,
      icon: GiProfit,
      image: profit,
      profitData: stats.revenue_per_month,
    },
  ];

  return (
    <div>
       <Helmet>
        <title>Around 360 - Admin Dashboard</title>
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-4">
        {dashboardData.map((data, index) => (
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
          <Chart
            title={chartType}
            data={
              chartType === "Booking"
                ? stats.revenue_per_month
                : chartType === "User"
                ? stats.users_per_month || []
                : chartType === "Guides"
                ? stats.guides_per_month || []
                : stats.revenue_per_month
            }
            timeInterval={timeInterval}
            setTimeInterval={setTimeInterval}
          />
        </div>
        <TravelChart statusData={statusData} />
      </div>
      <CustomTable title={"Recent Booking"} data={stats.bookings} columns={columns} loading={loading} />
    </div>
  );
};

export default DashboardAnalysis;
