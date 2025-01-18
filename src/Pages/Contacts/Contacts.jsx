import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosClient from "../../axiosClient";
import axios from "axios";
import HeroSection from "../../Components/HeroSection/HeroSection";
import ParentComponent from "../../Components/ParentComponent/ParentComponent";
// Assets
import image from "../../assets/img/contact/contact.png";
import c1 from "../../assets/img/contact/cimg1.svg";
import c2 from "../../assets/img/contact/cimg2.svg";
import c3 from "../../assets/img/contact/cimg3.svg";
import "./contacts.css";
// SweetAlert2 for modal notifications
import Swal from "sweetalert2";


const Contacts = () => {
  // Tracks the loading state during form submission
  const [loading, setLoading] = useState(false);

  /**
   * Destructure 'reset' from useForm 
   * so we can reset the form fields after a successful submission
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // <-- add this
  } = useForm();

  /**
   * handleSubmit callback
   * Sends form data to the server via POST and displays SweetAlert2 modals
   * based on the API response (success or warning).
   */
  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      // Send POST request to save data in the database
      const response = await axiosClient.post("/api/contact", formData);

      // If the server indicates a successful operation
      if (response.data.success === true) {
        Swal.fire({
          title: "Success",
          text: response.data.message,
          icon: "success",
        });
        // Reset form fields after a successful submission
        reset();
      } else {
        // If the API responds with a non-success scenario
        Swal.fire({
          title: "Failed",
          text: response.data.message,
          icon: "warning",
          timer: 200, // auto-closes after 200ms (optional)
        });
      }
    } catch (error) {
      // Logs any error encountered during the request
      console.error("Error sending contact data:", error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong! Please try again.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Breadcrumb links for the hero section
  const links = [
    { name: "Home", path: "/" },
    { name: "Contacts", path: "/contacts" },
  ];

  return (
    <>
      {/* Hero Section with background image, page name, and navigation links */}
      <div className="bg-white">
        <HeroSection
          bgImg={image}
          pageName="Contact Us"
          links={links}
          description="Whether you’re ready to book your next adventure, need assistance with your itinerary, or have questions about our services, our team is here to support you every step of the way."
        />

        <div className="horizontal"></div>

        {/* Main Content Wrapper */}
        <ParentComponent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* -------------------------- Contact Form Section -------------------------- */}
            <div className="bg-[#F5F7F9] rounded-lg border p-[32px]">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                  {/* First Name & Last Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="first_name"
                        className="block text-[#344054] mb-1"
                      >
                        First name
                      </label>
                      <input
                        placeholder="First name"
                        {...register("first_name", {
                          required: "First name is required",
                        })}
                        type="text"
                        id="first_name"
                        className="w-full rounded-lg border py-2 px-3"
                      />
                      {errors.first_name && (
                        <p className="text-red-500 text-sm">
                          {errors.first_name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="last_name"
                        className="block text-gray-700 mb-1"
                      >
                        Last name
                      </label>
                      <input
                        placeholder="Last name"
                        {...register("last_name", {
                          required: "Last name is required",
                        })}
                        type="text"
                        id="last_name"
                        className="w-full rounded-lg border py-2 px-3"
                      />
                      {errors.last_name && (
                        <p className="text-red-500 text-sm">
                          {errors.last_name.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="mt-4">
                    <label htmlFor="email" className="block text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      placeholder="you@company.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email format",
                        },
                      })}
                      type="email"
                      id="email"
                      className="w-full rounded-lg border py-2 px-3"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone Number Field */}
                  <div className="mt-4">
                    <label htmlFor="phone" className="block text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      placeholder="+1 (555) 000-0000"
                      {...register("phone_number", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Phone number must be numeric",
                        },
                      })}
                      type="text"
                      id="phone"
                      className="w-full rounded-lg border py-2 px-3"
                    />
                    {errors.phone_number && (
                      <p className="text-red-500 text-sm">
                        {errors.phone_number.message}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="mt-4">
                    <label
                      htmlFor="message"
                      className="block text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      placeholder="Leave us a message..."
                      {...register("message", {
                        required: "Message is required",
                      })}
                      id="message"
                      className="w-full rounded-lg border pb-14 pt-2 px-3"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Checkbox Agreement */}
                <div className="flex items-center mt-2">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    {...register("policy", {
                      required: "You must agree to our policy",
                    })}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded border focus:ring-blue-500 focus:ring-2"
                  />
                  <label
                    htmlFor="default-checkbox"
                    className="ms-2 text-sm text-gray-900"
                  >
                    You agree to our friendly privacy policy.
                  </label>
                  {errors.policy && (
                    <p className="text-red-500 text-sm">
                      {errors.policy.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#EB5B2A] text-white text-base font-semibold py-4 px-4 mt-2 rounded-full hover:bg-[#d85529] transition"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
            {/* -------------------------- End Contact Form Section -------------------------- */}

            {/* -------------------------- Map Section -------------------------- */}
            <div>
              <div
                className="bg-white overflow-hidden rounded-lg border h-full w-full"
                style={{ aspectRatio: "16/16" }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2367.469642881246!2d90.39869322734249!3d23.778121523255784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c76925717c2d%3A0xcb33cf344a80553!2sMohakhali%20Bus%20Stop!5e0!3m2!1sen!2sbd!4v1734754290833!5m2!1sen!2sbd"
                  style={{ border: 0, width: "100%", height: "100%" }}
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
            </div>
            {/* -------------------------- End Map Section -------------------------- */}
          </div>
        </ParentComponent>

        {/* -------------------------- Additional Contact Info Section -------------------------- */}
        <div className="contact2 w-[100%] h-auto bg-[#F0F4F9] pb-24">
          <h1 className="text-center pt-20 pb-12 text-5xl md:text-5xl">
            We’d love to hear from you
          </h1>

          <div className="xl:w-[1152px] mx-auto grid xl:grid-cols-3 grid-cols-1 gap-4">
            {/* Email Info */}
            <div className="content flex flex-col items-center text-center mx-auto w-[363px] h-[192px]">
              <div className="icon p-3 bg-white shadow-sm rounded-full flex justify-center items-center mb-4">
                <img src={c1} alt="c1" className="h-6 w-6" />
              </div>
              <h1 className="text-xl font-bold mb-2">Email</h1>
              <p className="text-base mb-4 font-normal text-[#475467]">
                Our friendly team is here to help.
              </p>
              <p className="text-base text-[#0e457d] font-bold">
                <a href="mailto:hello@around360.com">hello@around360.com</a>
              </p>
            </div>

            {/* Office Location Info */}
            <div className="content flex flex-col items-center text-center mx-auto w-[363px] h-[192px]">
              <div className="icon p-3 bg-white shadow-sm rounded-full flex justify-center items-center mb-4">
                <img src={c2} alt="c2" className="h-6 w-6" />
              </div>
              <h1 className="text-xl font-bold mb-2">Office</h1>
              <p className="text-base mb-4 font-normal text-[#475467]">
                Come say hello at our office HQ.
              </p>
              <p className="text-base text-[#0e457d] font-bold">
                8 12 Victoria Road Barnsley, South Yorkshire S70 2BB
              </p>
            </div>

            {/* Phone Contact Info */}
            <div className="content flex flex-col items-center text-center mx-auto w-[363px] h-[192px]">
              <div className="icon p-3 bg-white shadow-sm rounded-full flex justify-center items-center mb-4">
                <img src={c3} alt="c3" className="h-6 w-6" />
              </div>
              <h1 className="text-xl font-bold mb-2">Phone</h1>
              <p className="text-base mb-4 font-normal text-[#475467]">
                We are available any time to talk with you.
              </p>
              <p className="text-base text-[#0e457d] font-bold">
                <a href="tel:602-774-4735">602-774-4735</a>
              </p>
            </div>
          </div>
        </div>
        {/* -------------------------- End Additional Contact Info Section -------------------------- */}
      </div>
    </>
  );
};

export default Contacts;
