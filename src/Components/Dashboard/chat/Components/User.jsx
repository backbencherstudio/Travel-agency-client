import { Link } from "react-router-dom";

const User = ({ id, image, name, hint, time, active = false }) => {
  return (
    <>
      {/* Unread Message Item */}
      <li
        className={`unread px-5 py-[15px] ${
          active == true ? "active" : ""
        } transition-all ease-in-out border-b border-white/20`}
      >
        <Link to={`/dashboard/chat/${id}`}>
          <div className="relative flex">
            <div className="relative self-center mr-3">
              <img
                src={image}
                className="rounded-full w-9 h-9 object-cover"
                alt="Avatar"
              />

              {/* ========== active status ========== */}
              <span className="absolute w-2.5 h-2.5 border-2 border-white bg-red-400 rounded-full top-7 right-1"></span>
            </div>
            <div className="flex-grow overflow-hidden">
              <h5 className="mb-1 text-base truncate">{name}</h5>
              <p className="mb-0 text-gray-800 truncate text-14">{hint}</p>
            </div>
            <div className="text-gray-500 text-11">{time}</div>
          </div>
        </Link>
      </li>
      {/* Unread Message Item */}
    </>
  );
};

export default User;
