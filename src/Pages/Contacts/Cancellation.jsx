import React, { useEffect, useState } from "react";
import cancel from "../../assets/img/contact/cancel.png";
import HeroSection from "../../Components/HeroSection/HeroSection";
import ParentComponent from "../../Components/ParentComponent/ParentComponent";
import axiosClient from "../../axiosClient";

const Cancellation = () => {
  const [cancellation, setCancellation] = useState(""); // Store the cancellation policy text
  const [loading, setLoading] = useState(false);

  // Fetch cancellation data from API
  const fetchCancellation = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/api/cancellation-policy");
      console.log("API Response:", response.data);

      // Assuming the response data is structured as shown in the Postman screenshot
      if (response.data && response.data.data) {
        setCancellation(response.data.data.cancellation_policy); // Set the cancellation policy text
      } else {
        console.error("API did not return the expected data.");
        setCancellation(""); // Clear cancellation text if data is invalid
      }
    } catch (error) {
      console.error("Error while fetching cancellation_policy:", error);
      setCancellation(""); // Clear cancellation text if there's an error
    } finally {
      setLoading(false);
    }
  };

  // Call fetchCancellation when the component mounts
  useEffect(() => {
    fetchCancellation(); // Fetch cancellation policy data on mount
  }, []);

  const links = [
    { name: "Home", path: "/" },
    { name: "Cancellation", path: "/cancellation" },
  ];

  return (
    <>
      <HeroSection
        bgImg={cancel}
        pageName="Cancellation Policies"
        links={links}
        description="We understand that travel plans can change unexpectedly. Our cancellation policy is designed to provide flexibility while ensuring fairness to all our customers."
      />

      <ParentComponent>
        <div className="content grid lg:grid-cols-2 w-[70%] lg:w-auto">
          <div className="left mb-12">
            <div className="flex flex-row sm:flex-col gap-4 text-[#0155FE]">
              <h1 className="sm:text-[62px] text-4xl flex flex-col">
                Cancellation
              </h1>
              <h1 className="sm:text-[62px] text-4xl flex flex-col">
                Policies
              </h1>
            </div>
          </div>

          <div className="right">
            {/* Show loading text while data is being fetched */}
            {loading && <p>Loading Cancellation Policies...</p>}

            {/* Render cancellation policy if available */}
            {cancellation ? (
              <div dangerouslySetInnerHTML={{ __html: cancellation }}></div>
            ) : (
              <p>No cancellation policies available at the moment.</p>
            )}
          </div>
        </div>
      </ParentComponent>
    </>
  );
};

export default Cancellation;
