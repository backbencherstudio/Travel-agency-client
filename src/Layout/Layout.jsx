import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider/AuthProvider";
import Loading from "../Shared/Loading";

const Layout = () => {
  const { loading, user } = useContext(AuthContext);
  // console.log('user', user);
  
  return (
    <div className="min-h-screen flex flex-col">
      {loading ? (
        <Loading />
      )
      : 
      (
      <div className="animate-from-middle">
        <Navbar />
        <div className="flex-grow">
          <Outlet />
        </div>
        <div className="bg-[#061D35]">
          <Footer />
        </div>
      </div>
      )}
    </div>
  );
};

export default Layout;
