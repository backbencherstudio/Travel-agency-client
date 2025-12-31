import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthProvider/AuthProvider";
import Loading from "../Shared/Loading";

const Layout = () => {
  const { loading, user } = useContext(AuthContext);
  // console.log('user', user);

  // Ensure body is scrollable on initial mount in case previous views disabled it
  useEffect(() => {
    document.body.style.overflow = "auto";
    document.body.style.overflowY = "auto";
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      {loading ? (
        <Loading />
      )
      : 
      (
      <div className="animate-from-middle">
        <ScrollRestoration />
        <Navbar />
        <div className="flex-grow">
          <Outlet />
        </div>
        <div className="bg-[#03101e]">
          <Footer />
        </div>
      </div>
      )}
    </div>
  );
};

export default Layout;
