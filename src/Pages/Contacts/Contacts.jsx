// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
// import { useForm } from "react-hook-form";
import image from "../../assets/img/banner/contact.png";
import "./contacts.css";
import HeroSection from "../../Components/HeroSection/HeroSection";
import ParentComponent from "../../Components/ParentComponent/ParentComponent";
import axios from "axios";

const Contacts = () => {


    const links = [
        { name: "Home", path: "/" },
        { name: "Contacts", path: "/contacts" },
      ];


  // form validation
  const handleFormData = (e) => {
    e.preventDefault();

    if (
      first_name === "" ||
      last_name === "" ||
      email === "" ||
      Phone_number === ""
    ) {
      alert("all fields are required");
    } else {
      axios
        .post("http://localhost:5050/users", {
          first_name: first_name,
          last_name: last_name,
          email: email,
          Phone_number: Phone_number,
          message: message,
        })
        .then((res) => {
          console.log(res.data); // Check if data exists and is valid
          setInput({
            first_name: "",
            last_name: "",
            email: "",
            Phone_number: "",
            message: "",
          });
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    }
  };

  // get form data
  const [input, setInput] = useState({
    first_name: "",
    last_name: "",
    email: "",
    Phone_number: "",
    message: "",
  });

  let { first_name, last_name, email, Phone_number, message } = input;
  console.log(input);

  return (
    <>
      <div className="bg-white">

      <HeroSection
        bgImg={image}
        pageName="Contact Us"
        links={links}
        description="Whether you’re ready to book your next adventure, need assistance with your itinerary, or have questions about our services, our team is here to support you every step of the way."
      />

        <div className="horizontal"> </div>

        <ParentComponent>
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* -----------------------------------------Form start--------------- */}
            <div className="bg-[#F5F7F9] rounded-lg shadow-md border p-[32px] ">
              <form action="" onSubmit={handleFormData}>
                <div className="mb-6">
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
                        value={first_name}
                        onChange={(e) =>
                          setInput({ ...input, first_name: e.target.value })
                        }
                        type="text"
                        id="first_name"
                        className="w-full rounded-lg border py-2 px-3"
                      />
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
                        value={last_name}
                        onChange={(e) =>
                          setInput({ ...input, last_name: e.target.value })
                        }
                        type="text"
                        id="last_name"
                        className="w-full rounded-lg border py-2 px-3"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="address"
                      className="block text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) =>
                        setInput({ ...input, email: e.target.value })
                      }
                      type="text"
                      id="address"
                      className="w-full rounded-lg border py-2 px-3"
                    />
                  </div>
                  <div className="mt-4">
                    <label htmlFor="city" className="block text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      placeholder="+1 (555) 000-0000"
                      value={Phone_number}
                      onChange={(e) =>
                        setInput({ ...input, Phone_number: e.target.value })
                      }
                      type="number"
                      id="city"
                      className="w-full rounded-lg border py-2 px-3"
                    />
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="Message"
                      className="block text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <input
                      placeholder="Leave us a message..."
                      value={message}
                      onChange={(e) =>
                        setInput({ ...input, message: e.target.value })
                      }
                      type="text"
                      id="city"
                      className="w-full rounded-lg border pb-14 pt-2 px-3"
                    />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded border focus:ring-blue-500 focus:ring-2"
                  />
                  <label
                    htmlFor="default-checkbox"
                    className="ms-2 text-sm text-gray-900"
                  >
                    You agree to our friendly privacy policy.
                  </label>
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    className="w-full bg-[#EB5B2A] text-white text-base font-semibold py-4 px-4 mt-2 rounded-full hover:bg-[#EB5B2A] transition"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* -----------------------------------------Form end--------------- */}

            {/* -----------------------------------------Map start--------------- */}
            <div className=" ">
              <div
                className="bg-white overflow-hidden rounded-lg shadow-md border h-full w-full"
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
            {/* -----------------------------------------Map End--------------- */}
          </div>



        </ParentComponent>

            {/* -----------------------------------------text-content start--------------- */}
            <div className="contact2 w-[100%] h-[478px] bg-[#F0F4F9] ">

            <h1 className="text-center pt-20 pb-12">We’d love to hear from you</h1>

                <div className="w-[1216px] mx-auto grid grid-cols-3 gap-8">
                </div>
            </div>
            {/* -----------------------------------------text-content End--------------- */}

      </div>
    </>
  );
};

export default Contacts;
