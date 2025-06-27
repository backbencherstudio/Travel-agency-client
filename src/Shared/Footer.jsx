import { useState, useRef, useEffect, useContext } from "react";
import logo from "../assets/img/Logo_new.png";
import { Link } from "react-router-dom";
import FooterApis from "../Apis/FooterApis";
import becomeVendor from "../assets/img/footer/vendor.png";
import { AuthContext } from "../Context/AuthProvider/AuthProvider";

const Footer = () => {
  const [links, setLinks] = useState([]);
  const contentRefs = useRef([]);
  const { user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const data = await FooterApis.getFooterData();
        setLinks(data.data.social_media_links);
      } catch (error) {
        console.error("Error fetching Links:", error);
      }
    };

    fetchLinks();
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="max-w-[1216px] px-4 lg:px-6 xl:px-0 md:px-8 mx-auto text-white">
      <div className="flex flex-col lg:flex-row justify-between gap-8 xl:gap-12 py-20">
        <div className="flex flex-col gap-8">
          <img src={logo} alt="" className=" object-contain w-52" />
          <div className="flex flex-col gap-6">
            <p className="text-xl font-normal md">
              Explore the world with us! Find inspiration, plan adventures, and
              make unforgettable memories every journey.
            </p>
            <div className="flex justify-between py-2 pl-4 pr-2 border-[0.5px] border-[#8f8f8f] rounded-lg bg-[#1d3349] w-full md:w-fit">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-[#1d3349] focus:outline-none text-base w-[150px] sm:w-fit"
              />
              <div className="flex gap-[6px] px-4 py-2 bg-[#0E457D] items-center rounded-md">
                <button className="text-sm">Sign Up</button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3.3335 8H12.6668"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 3.33301L12.6667 7.99967L8 12.6663"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* Links */}
        <div className="flex flex-col gap-6">
          <div className="text-base font-bold">Quick Links</div>
          <div className="flex sm:flex-col flex-wrap gap-3">
            <Link to="/" onClick={handleLinkClick} className="text-base hover:text-orange-500">
              Home
            </Link>
            <Link to="/tours" onClick={handleLinkClick} className="text-base hover:text-orange-500">Tours</Link>
{/*             <Link to="/cruises" onClick={handleLinkClick} className="text-base hover:text-orange-500">Cruises</Link> */}
            <Link to="/packages" onClick={handleLinkClick} className="text-base hover:text-orange-500">Packages</Link>
            <Link to="/reservations" onClick={handleLinkClick} className="text-base hover:text-orange-500">Reservations</Link>
            <Link to="/blogs" onClick={handleLinkClick} className="text-base hover:text-orange-500">Blogs</Link>
            {/* <Link to="/about" onClick={handleLinkClick} className="text-base hover:text-orange-500">About</Link> */}
            <Link to="/contacts" onClick={handleLinkClick} className="text-base hover:text-orange-500">Contact Us</Link>
          </div>
        </div>
        {/* contact */}
        <div className="flex flex-col gap-6">
          <div className="text-base font-bold">Contact</div>
          <div className="flex flex-col gap-8">
            <div className="flex gap-[10px] items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="18"
                viewBox="0 0 19 18"
                fill="none"
              >
                <path
                  d="M13.417 9C15.4881 9 17.167 7.32107 17.167 5.25C17.167 3.17893 15.4881 1.5 13.417 1.5C11.3459 1.5 9.66699 3.17893 9.66699 5.25C9.66699 5.84988 9.80785 6.41686 10.0583 6.91968C10.1248 7.0533 10.147 7.20603 10.1084 7.35023L9.88506 8.18499C9.7881 8.54737 10.1196 8.87889 10.482 8.78193L11.3168 8.55858C11.461 8.52 11.6137 8.54215 11.7473 8.6087C12.2501 8.85914 12.8171 9 13.417 9Z"
                  fill="white"
                />
                <path
                  d="M6.69518 5.48713L7.18194 6.35933C7.62122 7.14644 7.44488 8.17899 6.75303 8.87085C6.75302 8.87085 6.75303 8.87085 6.75302 8.87085C6.75291 8.87097 5.91393 9.71016 7.43538 11.2316C8.95617 12.7524 9.79533 11.9148 9.79614 11.914C9.79616 11.9139 9.79615 11.914 9.79618 11.9139C10.488 11.2221 11.5206 11.0458 12.3077 11.485L13.1799 11.9718C14.3684 12.6351 14.5088 14.3019 13.4641 15.3466C12.8363 15.9744 12.0673 16.4629 11.2172 16.4951C9.78607 16.5493 7.3557 16.1872 4.91777 13.7492C2.47984 11.3113 2.11765 8.88092 2.17191 7.44982C2.20413 6.5997 2.69259 5.83068 3.32035 5.20292C4.36506 4.15821 6.03187 4.29858 6.69518 5.48713Z"
                  fill="white"
                />
              </svg>
              <p className="text-base">602-774-4735</p>
            </div>
            <div className="flex gap-[10px] items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="18"
                viewBox="0 0 19 18"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.04567 3.87868C2.16699 4.75736 2.16699 6.17157 2.16699 9C2.16699 11.8284 2.16699 13.2426 3.04567 14.1213C3.92435 15 5.33856 15 8.16699 15H11.167C13.9954 15 15.4096 15 16.2883 14.1213C17.167 13.2426 17.167 11.8284 17.167 9C17.167 6.17157 17.167 4.75736 16.2883 3.87868C15.4096 3 13.9954 3 11.167 3H8.16699C5.33857 3 3.92435 3 3.04567 3.87868ZM14.5991 5.6399C14.798 5.87855 14.7658 6.23324 14.5271 6.43212L12.8797 7.80492C12.215 8.35892 11.6762 8.80794 11.2006 9.11379C10.7052 9.43239 10.2228 9.63366 9.66699 9.63366C9.11118 9.63366 8.62875 9.43239 8.13338 9.11379C7.65783 8.80794 7.11903 8.35892 6.45426 7.80493L4.80689 6.43212C4.56823 6.23324 4.53599 5.87855 4.73487 5.6399C4.93375 5.40124 5.28844 5.369 5.5271 5.56788L7.14627 6.91719C7.84599 7.50028 8.33179 7.90381 8.74193 8.1676C9.13895 8.42294 9.40819 8.50866 9.66699 8.50866C9.9258 8.50866 10.195 8.42294 10.5921 8.1676C11.0022 7.90381 11.488 7.50028 12.1877 6.91718L13.8069 5.56788C14.0455 5.369 14.4002 5.40124 14.5991 5.6399Z"
                  fill="white"
                />
              </svg>
              <p className="text-base">hello@around360.com</p>
            </div>
            <div className="flex gap-[10px] items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.6672 1.66699C6.98526 1.66699 4.00049 5.00248 4.00049 8.75033C4.00049 12.4688 6.12826 16.5107 9.44804 18.0624C10.2219 18.4241 11.1124 18.4241 11.8863 18.0624C15.2061 16.5107 17.3338 12.4688 17.3338 8.75033C17.3338 5.00248 14.3491 1.66699 10.6672 1.66699ZM10.6672 10.0003C11.5876 10.0003 12.3338 9.25413 12.3338 8.33366C12.3338 7.41318 11.5876 6.66699 10.6672 6.66699C9.74668 6.66699 9.00049 7.41318 9.00049 8.33366C9.00049 9.25413 9.74668 10.0003 10.6672 10.0003Z"
                  fill="white"
                />
              </svg>
              <p className="text-base">
                8 12 Victoria Road Barnsley, South Yorkshire S70 2BB
              </p>
            </div>
          </div>
        </div>

        {/* social links */}
        <div className="flex flex-col gap-6 ">
          <div className="text-base font-bold">Follow Us on</div>
          <div className="flex flex-row flex-wrap gap-3">
            {/* ===============================*/}

            {links.map((link) => (
              <Link
                key={link.name}
                to={link.url}
                className="bg-[#EDFAFF] p-[8.571px] rounded-full hover:bg-white"
              >
                {/* "facebook" */}
                {link.name.toLowerCase() === "facebook" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 30 24"
                    fill="none"
                  >
                    {/* Facebook */}
                    <g clipPath="url(#clip0_5494_555)">
                      <path
                        d="M19.7562 4.36653H22.3645V0.732241C21.9145 0.682718 20.3669 0.571289 18.5645 0.571289C14.8038 0.571289 12.2276 2.46367 12.2276 5.94177V9.14272H8.07764V13.2056H12.2276V23.4284H17.3157V13.2065H21.2979L21.93 9.14367H17.3145V6.34462C17.3157 5.17034 17.711 4.36653 19.7562 4.36653Z"
                        fill="#1D1F2C"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_5494_555">
                        <rect
                          width="28.5714"
                          height="22.8571"
                          fill="white"
                          transform="translate(0.714355 0.571289)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                )}

                {/* "twitter" */}
                {link.name.toLowerCase() === "twitter" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 26 20"
                    fill="none"
                  >
                    {/* Twitter */}
                    <g clipPath="url(#clip0_5494_565)">
                      <path
                        d="M15.3241 8.46864L24.4308 0H22.2728L14.3655 7.3532L8.04989 0H0.765625L10.316 11.1193L0.765625 20H2.92374L11.2741 12.2348L17.9438 20H25.2281L15.3236 8.46864H15.3241ZM12.3683 11.2173L11.4006 10.1101L3.70134 1.29967H7.01608L13.2295 8.40994L14.1971 9.51718L22.2738 18.7594H18.9591L12.3683 11.2177V11.2173Z"
                        fill="#1D1F2C"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_5494_565">
                        <rect
                          width="25"
                          height="20"
                          fill="white"
                          transform="translate(0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                )}

                {/* "linkedin" */}
                {link.name.toLowerCase() === "linkedin" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    {/* LinkedIn */}
                    <path
                      d="M15.8333 2.5C16.2754 2.5 16.6993 2.67559 17.0118 2.98816C17.3244 3.30072 17.5 3.72464 17.5 4.16667V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H15.8333ZM15.4167 15.4167V11C15.4167 10.2795 15.1304 9.5885 14.621 9.07903C14.1115 8.56955 13.4205 8.28333 12.7 8.28333C11.9917 8.28333 11.1667 8.71667 10.7667 9.36667V8.44167H8.44167V15.4167H10.7667V11.3083C10.7667 10.6667 11.2833 10.1417 11.925 10.1417C12.2344 10.1417 12.5312 10.2646 12.75 10.4834C12.9688 10.7022 13.0917 10.9989 13.0917 11.3083V15.4167H15.4167ZM5.73333 7.13333C6.10464 7.13333 6.46073 6.98583 6.72328 6.72328C6.98583 6.46073 7.13333 6.10464 7.13333 5.73333C7.13333 4.95833 6.50833 4.325 5.73333 4.325C5.35982 4.325 5.0016 4.47338 4.73749 4.73749C4.47338 5.0016 4.325 5.35982 4.325 5.73333C4.325 6.50833 4.95833 7.13333 5.73333 7.13333ZM6.89167 15.4167V8.44167H4.58333V15.4167H6.89167Z"
                      fill="#1D1F2C"
                    />
                  </svg>
                )}

                {/* "instagram" */}
                {link.name.toLowerCase() === "instagram" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    {/* Instagram */}
                    <path
                      d="M11.2515 1.87602L11.2488 1.87603L9.53544 1.87519L9.53423 1.87519C8.93226 1.87374 8.33029 1.88061 7.72851 1.89582C7.72846 1.89582 7.7284 1.89582 7.72835 1.89582C7.7283 1.89582 7.72825 1.89582 7.7282 1.89583L7.57195 1.89985L6.98672 1.9245C6.98622 1.92453 6.98573 1.92455 6.98523 1.92457C6.15712 1.96358 5.62068 2.09208 5.15972 2.27054L5.15464 2.27251L5.15463 2.27248C4.6839 2.45002 4.2576 2.72819 3.90553 3.08757L3.89601 3.09729L3.89591 3.09718C3.5362 3.44872 3.25791 3.87426 3.07016 4.34848C2.8824 4.8227 2.79211 5.32762 2.81367 5.8319L2.81583 5.83357C2.92182 7.37304 3.40474 8.74761 4.20969 9.87253L5.16246 11.0207L7.30263 11.4597L9.08879 13.0526L9.22003 13.2215L9.23516 13.2538C9.32488 13.3967 9.46172 13.5119 9.62532 13.5708L9.8047 13.6136L9.98188 13.6644L10.0152 13.6787C10.0152 13.6787 9.9991 13.6893 10.0005 13.6872C10.0019 13.6851 10.0016 13.6874 10.0005 13.6872C10.0118 13.6866 10.0158 13.6783 10.0158 13.6782C10.0158 13.6782 10.0158 13.6781 10.0158 13.6781L9.98199 13.6643L9.80508 13.6135C9.46264 13.5119 9.32549 13.3967 9.23578 13.2539L9.22062 13.2216L9.08901 13.0531L7.30285 11.4597L5.16268 11.0207L4.20991 9.87252C3.40498 8.74761 2.9218 7.37304 2.8158 5.83356L2.79367 5.8319C2.79211 5.32761 2.8824 4.82269 3.07016 4.34848L3.25792 3.87426C3.5362 3.44872 3.89591 3.09718 3.89601 3.09729L3.90553 3.08757C4.25761 2.72819 4.6839 2.45003 5.15464 2.27251L5.15972 2.27054C5.62068 2.09208 6.15712 1.96358 6.98523 1.92457C6.98573 1.92455 6.98622 1.92453 6.98672 1.9245L7.57195 1.89985L7.7282 1.89583C7.72825 1.89582 7.7283 1.89582 7.72835 1.89582C7.7284 1.89582 7.72846 1.89582 7.72851 1.89582C8.33029 1.88061 8.93226 1.87374 9.53423 1.87519L9.53544 1.87519L11.2488 1.87603L11.2515 1.87602Z"
                      fill="#1D1F2C"
                    />
                  </svg>
                )}
              </Link>
            ))}

            {/* ===============================*/}
          </div>
          {/* Become a vendor */}
          <Link
            to="/become-a-vendor"
            className="w-fit flex gap-2 items-center text-sm text-white bg-orange-500 px-4 py-2 rounded-md"
          >
            <img src={becomeVendor} alt="Become a vendor" className="w-6 h-6" />
            <div className="flex flex-col">
              <p className="text-white text-sm font-bold">
                Become a vendor
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div className="text-center py-8 text-sm">
        Copyright © 2024 All rights reserved
      </div>
    </div>
  );
};

export default Footer;
