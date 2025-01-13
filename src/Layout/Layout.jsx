import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Loading from "../Shared/Loading";

const Layout = () => {
  const { loading } = useContext(AuthContext);
  return (
    <div className="min-h-screen flex flex-col">
      {loading && (
        <Loading />
      )}
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <div className="bg-[#061D35]">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
