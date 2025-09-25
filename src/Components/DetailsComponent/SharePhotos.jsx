import { FaRegCopy } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";

export default function SharePhotos({ img, title, handleSharePhoto }) {
  const shareUrl = window.location.href;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied!");
  };

  const shareOptions = [
    {
      label: "Copy Link",
      action: copyLink,
      Icon: <FaRegCopy size={18} />,
    },
    {
      label: "Email",
      action: () =>
        (window.location.href = `mailto:?subject=${encodeURIComponent(
          title
        )}&body=${encodeURIComponent(shareUrl)}`),
      Icon: <MdEmail size={18} />,
    },
    {
      label: "WhatsApp",
      action: () =>
        window.open(`https://wa.me/?text=${encodeURIComponent(shareUrl)}`),
      Icon: <FaWhatsapp size={18} />,
    },
    {
      label: "Facebook",
      action: () =>
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl
          )}`
        ),
      Icon: <FaSquareFacebook size={18} />,
    },
    {
      label: "Messenger",
      action: () =>
        window.open(
          `https://www.facebook.com/dialog/send?link=${encodeURIComponent(
            shareUrl
          )}&app_id=YOUR_APP_ID&redirect_uri=${encodeURIComponent(shareUrl)}`
        ),
      Icon: <FaFacebookMessenger size={18} />,
    },
    {
      label: "X",
      action: () =>
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            shareUrl
          )}&text=${encodeURIComponent(title)}`
        ),
      Icon: <FaSquareXTwitter size={18} />,
    },
  ];

  return (
    <div className="bg-white px-4 sm:px-6 py-6 rounded-xl w-[650px] flex flex-col gap-3 relative">
      <Toaster position="top-center" />
      <div className="flex flex-col gap-5 items-center">
        {/* Header */}
        <div>
          <h3 className="text-[#0F1416] text-[24px] font-semibold text-center">
            Share this place
          </h3>
          <p className="text-[14px] text-[#58677D] text-center">
            Thank you for your booking. Here are your collection details
          </p>
        </div>

        {/* Image */}
        <div className="w-[170px] h-[120px]">
          <img
            src={img}
            alt="Preview"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Title */}
        <h3 className="text-[20px] font-semibold text-[#0F1416] text-center">
          {title}
        </h3>
      </div>

      {/* Share Buttons */}
      <div className="flex flex-wrap justify-center">
        {shareOptions.map((link, idx) => (
          <button
            key={idx}
            onClick={link.action}
            type="button"
            className="w-[250px] sm:w-[280px] flex gap-2 items-center m-2 border border-[#ECEFF3] p-2 rounded-md hover:bg-gray-50 transition"
          >
            {link.Icon}
            <span>{link.label}</span>
          </button>
        ))}
      </div>

      {/* Close Button */}
      <div
        className="absolute top-4 left-4 cursor-pointer"
        onClick={handleSharePhoto}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M15 1L1 15M1 1L15 15"
            stroke="#0F1416"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}