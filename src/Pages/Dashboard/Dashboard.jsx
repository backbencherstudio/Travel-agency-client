import { useState, useEffect } from "react";
import { FaRegBell, FaRegUser } from "react-icons/fa";
import { IoClose, IoGolfOutline, IoMenu } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiTrolleySuitcase } from "react-icons/pi";
import { MdOutlinePayment } from "react-icons/md";
import { GrArticle } from "react-icons/gr";
import image from "../../assets/img/logo.png";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(
    localStorage.getItem("tab") || "Dashboard"
  );
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showCloseIcon, setShowCloseIcon] = useState(false);

  useEffect(() => {
    localStorage.setItem("tab", selectedTab);
  }, [selectedTab]);

  useEffect(() => {
    if (isSidebarOpen) {
      const timer = setTimeout(() => setShowCloseIcon(true), 150); // Delay for close icon
      return () => clearTimeout(timer);
    } else {
      setShowCloseIcon(false);
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    // Close the sidebar when location changes (i.e., when navigating)
    setSidebarOpen(false);
  }, [location]);

  const handleNavigation = (tab, path) => {
    setSelectedTab(tab);
    navigate(path);
  };

  return (
    <div className="lg:flex h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:translate-x-0 lg:relative w-[280px] bg-white border p-5 z-50 h-screen`}
      >
        <h1 className="text-2xl font-bold mb-5">Admin</h1>
        <nav className="flex flex-col gap-4">
          <button
            onClick={() => handleNavigation("Dashboard", "")}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === "Dashboard"
                ? "bg-[#fdf0ea] primary_text font-semibold"
                : "hover:bg-zinc-300"
            }`}
          >
            <LuLayoutDashboard />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => handleNavigation("Tour", "tour-list")}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === "Tour"
                ? "bg-[#fdf0ea] primary_text font-semibold"
                : "hover:bg-zinc-300"
            }`}
          >
            <IoGolfOutline />
            <span>Tour</span>
          </button>
          <button
            onClick={() => handleNavigation("Users", "user-list")}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === "Users"
                ? "bg-[#fdf0ea] primary_text font-semibold"
                : "hover:bg-zinc-300"
            }`}
          >
            <FaRegUser />
            <span>Users</span>
          </button>
          <button
            onClick={() => handleNavigation("Package", "package")}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === "Package"
                ? "bg-[#fdf0ea] primary_text font-semibold"
                : "hover:bg-zinc-300"
            }`}
          >
            <PiTrolleySuitcase />
            <span>Package</span>
          </button>
          <button
            onClick={() => handleNavigation("Payment", "payment")}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === "Payment"
                ? "bg-[#fdf0ea] primary_text font-semibold"
                : "hover:bg-zinc-300"
            }`}
          >
            <MdOutlinePayment />
            <span>Payment History</span>
          </button>
          <button
            onClick={() => handleNavigation("Blog", "blog-list")}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === "Blog"
                ? "bg-[#fdf0ea] primary_text font-semibold"
                : "hover:bg-zinc-300"
            }`}
          >
            <GrArticle />
            <span>Blog</span>
          </button>
        </nav>
        <button className="absolute bottom-5 flex gap-3 text-[16px] hover:bg-[#fdf0ea] hover:text-[#ec6931] p-2 px-5 rounded-md text-[#72777F]">
          <CiLogout className="mt-1" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-y-auto h-screen">
        <header className="flex items-center justify-between bg-zinc-50 p-4 shadow-md">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="lg:hidden text-2xl text-orange-500"
          >
            {isSidebarOpen && showCloseIcon ? (
              <IoClose className="absolute top-7 left-60 z-50 transition-all ease-linear hover:bg-[#fdf0ea] rounded-full" />
            ) : (
              <IoMenu />
            )}
          </button>
          <div></div>
          <div className="flex">
            <input
              type="text"
              placeholder="Search"
              className="p-2 border mx-5 rounded-lg bg-no-repeat bg-left pl-10 hidden md:block"
              style={{
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 24 24" width="20px" height="20px"><path d="M10 2a8 8 0 015.664 13.736l5.316 5.316a1 1 0 01-1.414 1.414l-5.316-5.316A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z"></path></svg>')`,
                backgroundSize: "16px 16px",
                backgroundPosition: "10px center",
              }}
            />
            <div className=" border mr-5 rounded-full h-10 w-10 flex justify-center items-center text-gray-400 cursor-pointer">
              <FaRegBell />
            </div>
            <div className="flex">
              <div className=" border mr-1 rounded-full h-10 w-10 flex justify-center items-center text-gray-400 cursor-pointer">
                <img
                  src={image}
                  className="h-full w-full rounded-full object-cover"
                  alt=""
                />
              </div>
              <div>
                <h1 className="font-semibold text-[16px]">Tren bold</h1>
                <p className="text-[12px] text-[#72777F]">Admin</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          <div className="p-5">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
