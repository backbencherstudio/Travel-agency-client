import { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { FaRegTrashAlt, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { FaRegSquarePlus } from "react-icons/fa6";
import { IoIosCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { BsThreeDots } from "react-icons/bs";

const PackageTable = ({ tableType = "", title, data, columns }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpenAction, setIsOpenAction] = useState(null);
    const [showTab, setShowTab] = useState('all');
    const navigate = useNavigate();
    const actionRefs = useRef(new Map());
  
    // Pagination states
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
  

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    const handleRowClick = (id) => {
      navigate(`${id}`);
    };

    console.log('data', data)

    const toggleActionOpen = (e, id) => {
      e.stopPropagation();
      setIsOpenAction(isOpenAction === id ? null : id);
    }
    console.log('isOpenAction', isOpenAction)

    const handleActiveTab = (tab) => {
      setShowTab(tab)
    }
    
    useEffect(() => {
      const handleClickOutside = (event) => {
        // Check if the click is outside all dropdowns
        if (
          Array.from(actionRefs.current.values()).every(
            (ref) => ref && !ref.contains(event.target)
          )
        ) {
          setIsOpenAction(null);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    return (
      <div className="">
        <div className="flex my-5 justify-between flex-wrap">
          <h1 className="font-semibold text-[24px]">{title}</h1>{" "}
          {(tableType === "blog" || tableType === "package") && (
            <Link
              // onClick={() => navigate("/dashboard/add-package")}
              to="/dashboard/add-package"
              className="text-[16px] font-medium px-4 py-2 bg-[#eb5b2a] text-white rounded-md flex  items-center gap-1.5 hover:bg-opacity-90"
            >
              <FaRegSquarePlus className="text-xl" /> Add{" "}
              {tableType.charAt(0).toUpperCase() + tableType.slice(1)}
            </Link>
          )}
        </div>
        <Paper style={{ borderRadius: "10px" }}>
          <div className="flex flex-col lg:flex-row justify-between items-end  gap-3 px-4 pt-4 rounded-t-xl">
            <div className="flex gap-6 border-b border-[#EAECF0] w-full lg:w-1/2">
              <button className={`text-sm md:text-base font-semibold text-[#667085] px-4 pb-3 ${showTab === 'all' && 'border-b-2 border-[#EB5B2A] text-[#A7411E]'}`} onClick={() => setShowTab('all')}>All Packages</button>
              <button className={`text-sm md:text-base font-semibold text-[#667085] px-4 pb-3  ${showTab === 'tour' && 'border-b-2 border-[#EB5B2A] text-[#A7411E]'}`} onClick={() => setShowTab('tour')}>Tour Packages</button>
              <button className={`text-sm md:text-base font-semibold text-[#667085] px-4 pb-3  ${showTab === 'cruise' && 'border-b-2 border-[#EB5B2A] text-[#A7411E]'}`} onClick={() => setShowTab('cruise')}>Cruises Packages</button>
            </div>
            <div className="relative right-0">
              <input
                type="text"
                placeholder="Search anything"
                className="py-1.5 pl-10 bg-[#F7F8F8] rounded-md focus:outline-none focus:border-orange-400 w-full placeholder:text-xs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute top-3 left-3 text-zinc-400" />
            </div>
            {/* <select
              className="md:col-span-1"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              style={{
                // width:'100%',
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: "14px",
                border: "1px solid #e86731",
                borderRadius: "4px",
                color: "#e86731",
              }}
            >
              <option value="all">All</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select> */}
          </div>
          <TableContainer sx={{ padding: "16px" }}>
            <Table
              sx={{
                border: "1px solid #e0e0e0",
  
                // "& th, & td": { border: "1px solid #E0E5E5", color: "gray" },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>Package Name</TableCell>
                  <TableCell>Package</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>Budget</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
  
              <TableBody className="text-nowrap">
                {data
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((item, index) => (
                    <TableRow
                      className={`cursor-pointer hover:bg-[#fdf0ea]`}
                      key={index}
                      onClick={() => handleRowClick(item.id)}
                    >
                        <TableCell style={{ minWidth: "250px" }}>
                          <div className="flex items-center gap-2">
                            <img src={item.package_Images[0]} alt="" className=" w-28 h-20 rounded-md" />
                            <div className="flex flex-col gap-[5px]">
                              <p className="text-xs font-normal text-[#475467]">#{item.id}</p>
                              <p className="text-xs font-medium text-black">{item.name}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell style={{ minWidth: "200px", color: '#475467', fontSize: '12px' }}>{item.package_category}</TableCell>
                        <TableCell style={{
                            minWidth: "200px",
                            color: '#475467',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis', 
                            fontSize: '12px'
                        }}>{item.description}</TableCell>
                        <TableCell style={{ minWidth: "200px", color: '#475467', fontSize: '12px' }}>{item.price}</TableCell>
                      {columns?.category && (
                        <TableCell>{item.category}</TableCell>
                      )}
                      {columns?.phone && <TableCell>{item.phone}</TableCell>}
                      {columns?.email && <TableCell>{item.email}</TableCell>}
                      {columns?.country && <TableCell>{item.country}</TableCell>}
                      
                      {columns?.duration && (
                        <TableCell>{item.duration}</TableCell>
                      )}
                      {columns?.destination && (
                        <TableCell style={{ minWidth: "200px" }}>
                          {/* Added minWidth for Name column */}
                          <div className="flex items-center gap-3">
                            <img
                              className="rounded-full"
                              src={item.destinationImg}
                              alt={item.destination}
                              style={{ width: "40px", height: "40px" }} // fixed size for the image
                            />
                            <span className="truncate">{item.destination}</span>{" "}
                            {/* Added truncate to prevent overflow */}
                          </div>
                        </TableCell>
                      )}
                      {columns?.amount && <TableCell>{item.amount}</TableCell>}
                      {columns?.status && <TableCell><p>{item.status === 1 ? (
                          <p className="flex items-center gap-1 text-[#067647] font-medium px-3 py-[2px] border border-[#ABEFC6] bg-[#ECFDF3] rounded-2xl">
                            <IoIosCheckmark className="text-xl text-[#17B26A]" />
                            Active
                          </p>
                        )
                        : 
                        (
                          <p className="flex items-center gap-1 text-[#B42318] font-medium px-3 py-[2px] border border-[#FECDCA] bg-[#FEF3F2] rounded-2xl">
                            <RxCross2 className="text-sm text-[#B42318]" />
                            Inactive
                          </p>
                        )}
                        </p>
                      </TableCell>}
                      {columns?.action && (
                        <TableCell>
                          <div className="relative">
                            <button
                                onClick={(e) => toggleActionOpen(e, item.id)}
                                className="text-lg p-text p-1 rounded-full"
                            >
                                <BsThreeDots />
                            </button>
                            {isOpenAction === item.id && (
                                <div className={`bg-white p-4 absolute flex flex-col top-full right-0 mt-2 space-y-1 rounded-2xl shadow-2xl popup w-60 z-50`} ref={(ref) =>
                                  ref && actionRefs.current.set(item.id, ref)
                                }>
                                  <div className="w-4 h-4 bg-white rotate-45 absolute -top-[7px] right-[25px] hidden xl:block shadow-2xl"></div>
                                  <button className="flex item-center gap-3 p-3 hover:bg-[#EB5B2A] rounded-md text-base text-zinc-600 hover:text-white duration-300">
                                    <MdEdit className="text-2xl" /> 
                                    Edit Package Details
                                  </button>
                                  <button className="flex item-center gap-3 p-3 hover:bg-[#EB5B2A] rounded-md text-base text-zinc-600 hover:text-white duration-300">
                                    <FaRegTrashAlt className="text-xl" />
                                      Delete Forever
                                  </button>
                                </div>
                            )}
                            </div>
                          {/* <div className="flex gap-5 ">
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`update/${item.id}`);
                              }}
                              className="text-[#1a9835] border border-[#1a9835] rounded-full h-10 w-10 text-[24px] text-center flex justify-center items-center hover:bg-[#1a983528]"
                            >
                              <FiEdit3 />
                            </div>
                            <div className="text-[#eb3d4d] border border-[#eb3d4d] hover:bg-[#eb3d4f1e] rounded-full h-10 w-10 text-[24px] text-center flex justify-center items-center">
                              <MdDeleteOutline />
                            </div>
                          </div> */}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
  
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
}

export default PackageTable