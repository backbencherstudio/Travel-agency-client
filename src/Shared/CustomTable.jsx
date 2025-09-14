/* eslint-disable react/prop-types */
import { useState } from "react";
import client1 from '../assets/img/Admin Dashboard/client1.png';
import client2 from '../assets/img/Admin Dashboard/client2.png';
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaRegSquarePlus } from "react-icons/fa6";
import TablePagination from "./TablePagination";
import userAvatar from '../../src/assets/img/avatar/user.png'
import Swal from 'sweetalert2'

// Sort icon component to avoid repetition
const SortIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M4.50314 8.00314C4.674 7.83229 4.951 7.83229 5.12186 8.00314L7 9.88128L8.87814 8.00314C9.049 7.83229 9.326 7.83229 9.49686 8.00314C9.66771 8.174 9.66771 8.451 9.49686 8.62186L7.30936 10.8094C7.1385 10.9802 6.8615 10.9802 6.69064 10.8094L4.50314 8.62186C4.33229 8.451 4.33229 8.174 4.50314 8.00314Z" fill="#757D83" />
    <path fillRule="evenodd" clipRule="evenodd" d="M4.50314 5.99686C4.674 6.16771 4.951 6.16771 5.12186 5.99686L7 4.11872L8.87814 5.99686C9.049 6.16771 9.326 6.16771 9.49686 5.99686C9.66771 5.826 9.66771 5.549 9.49686 5.37814L7.30936 3.19064C7.1385 3.01979 6.8615 3.01979 6.69064 3.19064L4.50314 5.37814C4.33229 5.549 4.33229 5.826 4.50314 5.99686Z" fill="#757D83" />
  </svg>
);

// Status icon components
const PendingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="7" height="6" viewBox="0 0 7 6" fill="none">
    <circle cx="3.3999" cy="3" r="3" fill="#0E457D" />
  </svg>
);

const ConfirmedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
    <path d="M10.3999 3L4.8999 8.5L2.3999 6" stroke="#17B26A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CancelledIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
    <path d="M9.30005 3.5L4.30005 8.5M4.30005 3.5L9.30005 8.5" stroke="#F04438" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CustomTable = ({ tableType = "", title, columns,data }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  const handleChangePage = (event, newPage) => {
    console.log(newPage)
    setPage(newPage);
  };

  const handleNextPage = (event) => {
    setPage(prev => prev + 1)
  };

  const handlePreviousPage = ()=>{
    setPage(prev => Math.max(0,prev - 1))
  }

  const handleRowClick = (id) => {
    if (tableType === "user" || tableType === "blog") {
      navigate(`${id}`);
    }
  };

  // const [data] = useState([
  //   {
  //     id: 1,
  //     name: "Raphael Goodman",
  //     package_name: "Venice Dreams",
  //     img: client1,
  //     date: "Jun 25, 2024",
  //     price: 1500,
  //     status: "confirmed"
  //   },
  //   {
  //     id: 2,
  //     name: "Kathryn Murphy",
  //     package_name: "Safari Adventure",
  //     img: client2,
  //     date: "Jun 25, 2024",
  //     price: 3200,
  //     status: "pending"
  //   },
  //   {
  //     id: 3,
  //     name: "Jerome Bell",
  //     package_name: "Alpine Escape",
  //     img: client1,
  //     date: "Jun 25, 2024",
  //     price: 2100,
  //     status: "cancelled"
  //   },
  //   {
  //     id: 4,
  //     name: "Kathryn Murphy",
  //     package_name: "Safari Adventure",
  //     img: client2,
  //     date: "Jun 25, 2024",
  //     price: 3200,
  //     status: "pending"
  //   },
  //   {
  //     id: 5,
  //     name: "Raphael Goodman",
  //     package_name: "Venice Dreams",
  //     img: client1,
  //     date: "Jun 25, 2024",
  //     price: 1500,
  //     status: "confirmed"
  //   },
  //   {
  //     id: 6,
  //     name: "Jerome Bell",
  //     package_name: "Alpine Escape",
  //     img: client1,
  //     date: "Jun 25, 2024",
  //     price: 2100,
  //     status: "cancelled"
  //   },
  //   {
  //     id: 7,
  //     name: "Kathryn Murphy",
  //     package_name: "Safari Adventure",
  //     img: client2,
  //     date: "Jun 25, 2024",
  //     price: 3200,
  //     status: "pending"
  //   },
  //   {
  //     id: 8,
  //     name: "Jerome Bell",
  //     package_name: "Alpine Escape",
  //     img: client1,
  //     date: "Jun 25, 2024",
  //     price: 2100,
  //     status: "cancelled"
  //   },
  //   {
  //     id: 9,
  //     name: "Kathryn Murphy",
  //     package_name: "Safari Adventure",
  //     img: client2,
  //     date: "Jun 25, 2024",
  //     price: 3200,
  //     status: "pending"
  //   },
  //   {
  //     id: 10,
  //     name: "Raphael Goodman",
  //     package_name: "Venice Dreams",
  //     img: client1,
  //     date: "Jun 25, 2024",
  //     price: 1500,
  //     status: "confirmed"
  //   },
  // ]);

  // Filter data based on search and status
  const filteredData = data?.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.package_name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Paginate data
  const paginatedData = filteredData?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const getStatusStyles = (status) => {
    switch (status) {
      case "pending":
        return "text-[#0A3159] bg-[#E7ECF2] border-[#90A9C3]";
      case "cancelled":
        return "text-[#B42318] bg-[#FEF3F2] border-[#FECDCA]";
      case "confirmed":
        return "text-[#067647] bg-[#ECFDF3] border-[#ABEFC6]";
      default:
        return "";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <PendingIcon />;
      case "confirmed":
        return <ConfirmedIcon />;
      case "cancelled":
        return <CancelledIcon />;
      default:
        return null;
    }
  };


  const hanldeDeleteModal= async(id)=>{
    const result = await Swal.fire({
      title: 'Delete this booking?',
      text: 'Are you sure you want to delete this booking? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    })

    if (result.isConfirmed) {
      console.log("Delete item : ",id);
      // try {
      //   const res = await axiosClient.delete(`api/admin/package/${id}`)
      //   await Swal.fire(
      //     'Deleted!',
      //     'The package has been deleted successfully.',
      //     'success'
      //   )
      //   refetch()
      // } catch (error) {
      //   await Swal.fire('Error!', 'Failed to delete the package.', 'error')
      //   console.error('Failed to delete package:', error)
      // }
    }
  }

  return (
    <div className="bg-white p-4 rounded-xl flex flex-col gap-4">
      <div className="flex justify-between flex-wrap">
        <h1 className="font-semibold text-[24px] text-center sm:text-start w-full">{title}</h1>
        {(tableType === "blog" || tableType === "package") && (
          <Link
            to="/dashboard/add-package"
            className="text-[16px] font-medium px-4 py-2 bg-[#eb5b2a] text-white rounded-md flex items-center gap-1.5 hover:bg-opacity-90"
          >
            <FaRegSquarePlus className="text-xl" /> Add{" "}
            {tableType.charAt(0).toUpperCase() + tableType.slice(1)}
          </Link>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-end gap-[14px] items-center rounded-t-xl">
          <div className="relative md:col-span-1 bg-[#F7F8F8] rounded-lg">
            <input
              type="text"
              placeholder="Search anything..."
              className="placeholder:text-[#CACACA] placeholder:text-[12px] py-1.5 pl-10 rounded-md focus:outline-none w-full lg:w-[80%] bg-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute top-3 left-3 text-zinc-400 cursor-pointer" />
          </div>
          <select
            className="md:col-span-1"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "8px",
              cursor: "pointer",
              fontSize: "12px",
              border: "1px solid #e86731",
              borderRadius: "4px",
              color: "#fff",
              backgroundColor: "#EB5B2A",
              outline: "none"
            }}
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        {/* Table  */}
        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto min-w-[768px]">
            <thead>
              <tr>
                <th>
                  <div className="flex items-center gap-1">
                    <span className="text-[#475467] font-medium text-[12px]">Name</span>
                    <SortIcon />
                  </div>
                </th>
                <th>
                  <div className="flex items-center gap-1">
                    <span className="text-[#475467] font-medium text-[12px]">Package</span>
                    <SortIcon />
                  </div>
                </th>
                <th>
                  <div className="flex items-center gap-1">
                    <span className="text-[#475467] font-medium text-[12px]">Date</span>
                    <SortIcon />
                  </div>
                </th>
                <th>
                  <div className="flex items-center gap-1">
                    <span className="text-[#475467] font-medium text-[12px]">Price</span>
                    <SortIcon />
                  </div>
                </th>
                <th>
                  <div className="flex items-center gap-1">
                    <span className="text-[#475467] font-medium text-[12px]">Status</span>
                    <SortIcon />
                  </div>
                </th>
                <th>
                  <div className="flex items-center gap-1">
                    <span className="text-[#475467] font-medium text-[12px]">Action</span>
                    <SortIcon />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData?.length > 0 ? (
                paginatedData?.map(client => (
                  <tr key={client.id} className="border-b border-[#F2F3F4] hover:bg-gray-50">
                    <td className="py-4">
                      <div className="flex gap-1 items-center">
                        <img
                          src={client?.avatar || userAvatar}
                          alt="Client"
                          width={24}
                          height={24}
                          className="rounded-full"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/24';
                          }}
                        />
                        <h3 className="text-[#000E19] text-nowrap text-[12px] font-medium">{client?.name}</h3>
                      </div>
                    </td>
                    <td className="py-4 text-[#475467] text-[12px] text-nowrap">{client?.package}</td>
                    <td className="py-4 text-[#475467] text-[12px] text-nowrap">{client.date}</td>
                    <td className="py-4 text-[#475467] text-[12px]">{client?.amount?.toLocaleString()}</td>
                    <td className="py-4">
                      <div className={`flex items-center gap-1 px-[6px] py-[2px] w-[107px] rounded-full border text-[12px] ${getStatusStyles(client.status)}`}>
                        {getStatusIcon(client.status)}
                        <span>{client.status.charAt(0).toUpperCase() + client.status.slice(1)}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-1">
                        <button className="p-1 hover:bg-gray-100 rounded" onClick={()=>hanldeDeleteModal(client?.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                            <path d="M11.1667 3.99992V3.46659C11.1667 2.71985 11.1667 2.34648 11.0213 2.06126C10.8935 1.81038 10.6895 1.60641 10.4387 1.47858C10.1534 1.33325 9.78007 1.33325 9.03333 1.33325H7.96667C7.21993 1.33325 6.84656 1.33325 6.56135 1.47858C6.31046 1.60641 6.10649 1.81038 5.97866 2.06126C5.83333 2.34648 5.83333 2.71985 5.83333 3.46659V3.99992M7.16667 7.66659V10.9999M9.83333 7.66659V10.9999M2.5 3.99992H14.5M13.1667 3.99992V11.4666C13.1667 12.5867 13.1667 13.1467 12.9487 13.5746C12.7569 13.9509 12.451 14.2569 12.0746 14.4486C11.6468 14.6666 11.0868 14.6666 9.96667 14.6666H7.03333C5.91323 14.6666 5.35318 14.6666 4.92535 14.4486C4.54903 14.2569 4.24307 13.9509 4.05132 13.5746C3.83333 13.1467 3.83333 12.5867 3.83333 11.4666V3.99992" stroke="#475467" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <Link to={`booking-request/${client.id}`} className="p-1 hover:bg-gray-100 rounded">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M17.606 8.21222C18.5723 9.22894 18.5723 10.7737 17.606 11.7904C15.9762 13.5052 13.177 15.8346 9.9974 15.8346C6.8178 15.8346 4.01864 13.5052 2.38882 11.7904C1.42248 10.7737 1.42248 9.22894 2.38882 8.21222C4.01864 6.49741 6.8178 4.16797 9.9974 4.16797C13.177 4.16797 15.9762 6.49741 17.606 8.21222Z" stroke="#475467" strokeWidth="1.5" />
                            <path d="M12.4974 10.0013C12.4974 11.382 11.3781 12.5013 9.9974 12.5013C8.61668 12.5013 7.4974 11.382 7.4974 10.0013C7.4974 8.62059 8.61668 7.5013 9.9974 7.5013C11.3781 7.5013 12.4974 8.62059 12.4974 10.0013Z" stroke="#475467" strokeWidth="1.5" />
                          </svg>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 text-center text-gray-500">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <TablePagination handleChangePage={handleChangePage} handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} page={page} filteredData={filteredData} rowsPerPage={rowsPerPage}/>
      </div>
    </div>
  );
};

export default CustomTable;