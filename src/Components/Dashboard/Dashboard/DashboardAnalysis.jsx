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
  const [chartType, setChartType] = useState("Total Booking");
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
      // console.log("Dashboard API Response:", response.data);
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
      title: "Total Booking",
      amount: loading ? "Loading..." : error ? "0" : stats.total_bookings.toLocaleString(),
      icon: (<svg className={`font-extrabold text-[24px] m-2`} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M16.1532 2.61511H14.3071V1.99972C14.3071 1.83651 14.2422 1.67999 14.1268 1.56458C14.0114 1.44917 13.8549 1.38434 13.6917 1.38434C13.5285 1.38434 13.3719 1.44917 13.2565 1.56458C13.1411 1.67999 13.0763 1.83651 13.0763 1.99972V2.61511H6.92244V1.99972C6.92244 1.83651 6.8576 1.67999 6.7422 1.56458C6.62679 1.44917 6.47026 1.38434 6.30705 1.38434C6.14384 1.38434 5.98732 1.44917 5.87191 1.56458C5.7565 1.67999 5.69167 1.83651 5.69167 1.99972V2.61511H3.84552C3.5191 2.61511 3.20604 2.74478 2.97523 2.97559C2.74442 3.20641 2.61475 3.51946 2.61475 3.84588V16.1536C2.61475 16.48 2.74442 16.793 2.97523 17.0239C3.20604 17.2547 3.5191 17.3843 3.84552 17.3843H16.1532C16.4796 17.3843 16.7927 17.2547 17.0235 17.0239C17.2543 16.793 17.384 16.48 17.384 16.1536V3.84588C17.384 3.51946 17.2543 3.20641 17.0235 2.97559C16.7927 2.74478 16.4796 2.61511 16.1532 2.61511ZM5.69167 3.84588V4.46126C5.69167 4.62447 5.7565 4.781 5.87191 4.8964C5.98732 5.01181 6.14384 5.07665 6.30705 5.07665C6.47026 5.07665 6.62679 5.01181 6.7422 4.8964C6.8576 4.781 6.92244 4.62447 6.92244 4.46126V3.84588H13.0763V4.46126C13.0763 4.62447 13.1411 4.781 13.2565 4.8964C13.3719 5.01181 13.5285 5.07665 13.6917 5.07665C13.8549 5.07665 14.0114 5.01181 14.1268 4.8964C14.2422 4.781 14.3071 4.62447 14.3071 4.46126V3.84588H16.1532V6.30742H3.84552V3.84588H5.69167ZM16.1532 16.1536H3.84552V7.53818H16.1532V16.1536ZM13.204 9.56434C13.2612 9.62149 13.3066 9.68936 13.3376 9.76407C13.3685 9.83877 13.3845 9.91885 13.3845 9.99972C13.3845 10.0806 13.3685 10.1607 13.3376 10.2354C13.3066 10.3101 13.2612 10.378 13.204 10.4351L9.51167 14.1274C9.45452 14.1846 9.38665 14.23 9.31194 14.261C9.23723 14.292 9.15716 14.3079 9.07628 14.3079C8.99541 14.3079 8.91534 14.292 8.84063 14.261C8.76592 14.23 8.69805 14.1846 8.6409 14.1274L6.79475 12.2813C6.67927 12.1658 6.6144 12.0092 6.6144 11.8459C6.6144 11.6826 6.67927 11.526 6.79475 11.4105C6.91022 11.295 7.06683 11.2302 7.23013 11.2302C7.39343 11.2302 7.55004 11.295 7.66552 11.4105L9.07628 12.822L12.3332 9.56434C12.3904 9.50712 12.4582 9.46173 12.5329 9.43076C12.6076 9.39979 12.6877 9.38385 12.7686 9.38385C12.8495 9.38385 12.9295 9.39979 13.0042 9.43076C13.079 9.46173 13.1468 9.50712 13.204 9.56434Z" fill="white" />
      </svg>),
      image: revenue,
      revenueData: stats.revenue_per_month,
    },
    {
      title: "Total User",
      amount: loading ? "Loading..." : error ? "0" : stats.total_users.toLocaleString(),
      icon: (<svg className={`font-extrabold text-[24px] m-2`} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0015 6.9246C8.642 6.9246 7.53993 8.02667 7.53993 9.38614C7.53993 10.7456 8.642 11.8477 10.0015 11.8477C11.3609 11.8477 12.463 10.7456 12.463 9.38614C12.463 8.02667 11.3609 6.9246 10.0015 6.9246ZM6.30916 9.38614C6.30916 7.34694 7.96226 5.69383 10.0015 5.69383C12.0407 5.69383 13.6938 7.34694 13.6938 9.38614C13.6938 11.4253 12.0407 13.0784 10.0015 13.0784C7.96226 13.0784 6.30916 11.4253 6.30916 9.38614Z" fill="white" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0015 13.0784C9.09233 13.0784 8.20094 13.3297 7.42611 13.8053C6.65129 14.2809 6.02329 14.9618 5.61173 15.7724C5.45787 16.0755 5.08748 16.1964 4.78443 16.0426C4.48138 15.8887 4.36043 15.5183 4.51429 15.2153C5.02874 14.2019 5.81374 13.3509 6.78227 12.7564C7.75081 12.1619 8.86504 11.8477 10.0015 11.8477C11.1379 11.8477 12.2521 12.1619 13.2207 12.7564C14.1892 13.3509 14.9742 14.2019 15.4886 15.2153C15.6425 15.5183 15.5216 15.8887 15.2185 16.0426C14.9155 16.1964 14.5451 16.0755 14.3912 15.7724C13.9796 14.9618 13.3517 14.2809 12.5768 13.8053C11.802 13.3297 10.9106 13.0784 10.0015 13.0784Z" fill="white" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0784 4.46306C13.0784 4.1232 13.3539 3.84768 13.6938 3.84768H17.3861C17.726 3.84768 18.0015 4.1232 18.0015 4.46306C18.0015 4.80293 17.726 5.07845 17.3861 5.07845H13.6938C13.3539 5.07845 13.0784 4.80293 13.0784 4.46306Z" fill="white" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5399 2.00153C15.8798 2.00153 16.1553 2.27704 16.1553 2.61691V6.30922C16.1553 6.64909 15.8798 6.9246 15.5399 6.9246C15.2001 6.9246 14.9245 6.64909 14.9245 6.30922V2.61691C14.9245 2.27704 15.2001 2.00153 15.5399 2.00153Z" fill="white" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0015 3.2323C8.66264 3.2323 7.35388 3.6293 6.24069 4.37312C5.12749 5.11693 4.25986 6.17414 3.74751 7.41105C3.23517 8.64797 3.10111 10.009 3.36231 11.3221C3.6235 12.6352 4.26821 13.8414 5.2149 14.7881C6.16159 15.7348 7.36775 16.3795 8.68086 16.6407C9.99396 16.9019 11.355 16.7678 12.5919 16.2555C13.8289 15.7431 14.8861 14.8755 15.6299 13.7623C16.3737 12.6491 16.7707 11.3404 16.7707 10.0015V9.38614C16.7707 9.04627 17.0462 8.77076 17.3861 8.77076C17.726 8.77076 18.0015 9.04627 18.0015 9.38614V10.0015C18.0015 11.5838 17.5323 13.1305 16.6532 14.4461C15.7742 15.7617 14.5247 16.7871 13.0629 17.3926C11.6011 17.9981 9.99259 18.1565 8.44075 17.8478C6.8889 17.5391 5.46343 16.7772 4.34461 15.6584C3.22579 14.5396 2.46387 13.1141 2.15519 11.5622C1.8465 10.0104 2.00493 8.40187 2.61043 6.94006C3.21593 5.47825 4.24131 4.22882 5.55691 3.34977C6.8725 2.47072 8.41922 2.00153 10.0015 2.00153L10.6169 2.00153C10.9567 2.00154 11.2322 2.27706 11.2322 2.61692C11.2322 2.95679 10.9567 3.23231 10.6168 3.2323L10.0015 3.2323Z" fill="white" />
      </svg>),
      image: traveler,
      travelerData: stats.users_per_month,
    },
    {
      title: "Total Guides",
      amount: loading ? "Loading..." : error ? "0" : `${stats.total_vendors.toLocaleString()}+ `,
      icon: (<svg className={`font-extrabold text-[24px] m-2`} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M18.9596 10.0001C18.9596 5.06008 14.9413 1.04175 10.0013 1.04175C5.0613 1.04175 1.04297 5.06008 1.04297 10.0001C1.04297 12.8917 2.42546 15.4601 4.5588 17.0993C4.56213 17.1026 4.56716 17.1043 4.5705 17.1076C6.07966 18.2635 7.95878 18.9584 10.0021 18.9584C12.0454 18.9584 13.9247 18.2635 15.4338 17.1076C15.4372 17.1043 15.4421 17.1026 15.4454 17.0993C17.5771 15.4601 18.9596 12.8917 18.9596 10.0001ZM2.29297 10.0001C2.29297 5.74925 5.75047 2.29175 10.0013 2.29175C14.2521 2.29175 17.7096 5.74925 17.7096 10.0001C17.7096 12.1026 16.8613 14.0101 15.4913 15.4018C15.1171 13.8176 13.9196 12.35 11.4263 12.35H8.57633C6.083 12.35 4.88462 13.8176 4.51129 15.4018C3.14129 14.0101 2.29297 12.1026 2.29297 10.0001ZM5.63383 16.3451C5.68216 15.4901 6.073 13.6 8.57633 13.6H11.4263C13.9296 13.6 14.3204 15.4901 14.3688 16.3451C13.1263 17.2034 11.6221 17.7084 10.0013 17.7084C8.38047 17.7084 6.87633 17.2026 5.63383 16.3451ZM10.008 11.4584C11.7305 11.4584 13.133 10.0567 13.133 8.33342C13.133 6.61008 11.7305 5.20842 10.008 5.20842C8.28552 5.20842 6.88302 6.61008 6.88302 8.33342C6.88302 10.0567 8.28468 11.4584 10.008 11.4584ZM10.008 6.45842C11.0413 6.45842 11.883 7.29925 11.883 8.33342C11.883 9.36758 11.0413 10.2084 10.008 10.2084C8.97468 10.2084 8.13302 9.36758 8.13302 8.33342C8.13302 7.29925 8.97468 6.45842 10.008 6.45842Z" fill="white" />
      </svg>),
      image: profit,
      profitData: stats.guides_per_month,
    },
    {
      title: "Total Earnings",
      amount: loading ? "Loading..." : error ? "$0" : `$${parseFloat(stats.total_revenue).toLocaleString()}`,
      icon: (<svg className={`font-extrabold text-[24px] m-2`} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M9.99756 2.00153C8.41531 2.00153 6.86859 2.47072 5.553 3.34977C4.23741 4.22882 3.21203 5.47825 2.60653 6.94006C2.00102 8.40187 1.8426 10.0104 2.15128 11.5622C2.45996 13.1141 3.22189 14.5396 4.34071 15.6584C5.45953 16.7772 6.88499 17.5391 8.43684 17.8478C9.98869 18.1565 11.5972 17.9981 13.059 17.3926C14.5208 16.7871 15.7703 15.7617 16.6493 14.4461C17.5284 13.1305 17.9976 11.5838 17.9976 10.0015C17.9953 7.88048 17.1517 5.84695 15.6519 4.34715C14.1521 2.84734 12.1186 2.00377 9.99756 2.00153ZM9.99756 16.7708C8.65873 16.7708 7.34997 16.3737 6.23678 15.6299C5.12358 14.8861 4.25596 13.8289 3.74361 12.592C3.23126 11.3551 3.09721 9.99402 3.3584 8.68091C3.61959 7.36781 4.2643 6.16165 5.21099 5.21496C6.15769 4.26826 7.36385 3.62356 8.67695 3.36236C9.99005 3.10117 11.3511 3.23523 12.588 3.74757C13.825 4.25992 14.8822 5.12755 15.626 6.24074C16.3698 7.35394 16.7668 8.6627 16.7668 10.0015C16.7648 11.7962 16.0509 13.5168 14.7819 14.7858C13.5128 16.0549 11.7922 16.7687 9.99756 16.7708ZM13.0745 11.54C13.0745 12.1112 12.8476 12.6591 12.4436 13.063C12.0397 13.4669 11.4919 13.6938 10.9206 13.6938H10.6129V14.3092C10.6129 14.4724 10.5481 14.629 10.4327 14.7444C10.3173 14.8598 10.1608 14.9246 9.99756 14.9246C9.83435 14.9246 9.67783 14.8598 9.56242 14.7444C9.44701 14.629 9.38218 14.4724 9.38218 14.3092V13.6938H8.15141C7.9882 13.6938 7.83167 13.629 7.71627 13.5136C7.60086 13.3982 7.53602 13.2417 7.53602 13.0784C7.53602 12.9152 7.60086 12.7587 7.71627 12.6433C7.83167 12.5279 7.9882 12.4631 8.15141 12.4631H10.9206C11.1655 12.4631 11.4002 12.3658 11.5734 12.1927C11.7465 12.0196 11.8437 11.7848 11.8437 11.54C11.8437 11.2952 11.7465 11.0604 11.5734 10.8873C11.4002 10.7142 11.1655 10.6169 10.9206 10.6169H9.07449C8.50325 10.6169 7.95541 10.39 7.55149 9.98606C7.14756 9.58214 6.92064 9.0343 6.92064 8.46306C6.92064 7.89183 7.14756 7.34399 7.55149 6.94007C7.95541 6.53614 8.50325 6.30922 9.07449 6.30922H9.38218V5.69383C9.38218 5.53062 9.44701 5.3741 9.56242 5.25869C9.67783 5.14328 9.83435 5.07845 9.99756 5.07845C10.1608 5.07845 10.3173 5.14328 10.4327 5.25869C10.5481 5.3741 10.6129 5.53062 10.6129 5.69383V6.30922H11.8437C12.0069 6.30922 12.1635 6.37405 12.2789 6.48946C12.3943 6.60487 12.4591 6.76139 12.4591 6.9246C12.4591 7.08781 12.3943 7.24434 12.2789 7.35975C12.1635 7.47515 12.0069 7.53999 11.8437 7.53999H9.07449C8.82967 7.53999 8.59488 7.63724 8.42177 7.81035C8.24866 7.98346 8.15141 8.21825 8.15141 8.46306C8.15141 8.70788 8.24866 8.94267 8.42177 9.11578C8.59488 9.28889 8.82967 9.38614 9.07449 9.38614H10.9206C11.4919 9.38614 12.0397 9.61306 12.4436 10.017C12.8476 10.4209 13.0745 10.9688 13.0745 11.54Z" fill="white" />
      </svg>),
      image: profit,
      profitData: stats.revenue_per_month,
    },
  ];

  return (
    <div className="w-full">
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
