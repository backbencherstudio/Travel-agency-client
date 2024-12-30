/* eslint-disable react/prop-types */
import { useState } from "react";
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
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegSquarePlus } from "react-icons/fa6";

const CustomTable = ({ tableType = "", title, data, columns }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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
    if (tableType === "user" || tableType === "blog") {
      navigate(`${id}`);
    } else {
      // navigate(`/other-list/${id}`);
    }
  };

  return (
    <div className="">
      <div className="flex my-5 justify-between flex-wrap">
        <h1 className="font-semibold text-[24px]">{title}</h1>{" "}
        {(tableType === "blog" || tableType === "package") && (
          <button
            onClick={() => navigate("create/new")}
            className="text-[16px] font-medium px-4 py-2 bg-[#eb5b2a] text-white rounded-md flex  items-center gap-1.5 hover:bg-opacity-90"
          >
            <FaRegSquarePlus className="text-xl" /> Add{" "}
            {tableType.charAt(0).toUpperCase() + tableType.slice(1)}
          </button>
        )}
      </div>
      <Paper style={{ borderRadius: "10px" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 items-center  gap-3 px-4 pt-4 rounded-t-xl">
          <div></div>
          <div></div>
          <div className="relative md:col-span-1">
            <input
              type="text"
              placeholder="Search..."
              className="py-1.5 pl-10 border border-zinc-300 rounded-md focus:outline-none focus:border-orange-400 w-full lg:w-[80%]"
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
                {columns?.bookingId && <TableCell>Booking Id</TableCell>}
                {columns?.tourId && <TableCell>Tour Id</TableCell>}
                {columns?.name && <TableCell>Customer Name</TableCell>}
                {columns?.username && <TableCell>User Name</TableCell>}
                {columns?.blogName && <TableCell>Blog Name</TableCell>}
                {columns?.category && <TableCell>Category</TableCell>}
                {columns?.email && <TableCell> Email</TableCell>}
                {columns?.phone && <TableCell>Phone</TableCell>}
                {columns?.country && <TableCell>Country</TableCell>}
                {columns?.traveler && <TableCell>Traveler</TableCell>}
                {columns?.date && <TableCell>Date</TableCell>}
                {columns?.duration && <TableCell>Duration</TableCell>}
                {columns?.destination && <TableCell>Destination</TableCell>}
                {columns?.amount && <TableCell>Amount</TableCell>}
                {columns?.status && <TableCell>Status</TableCell>}
                {columns?.action && <TableCell>Action</TableCell>}
              </TableRow>
            </TableHead>

            <TableBody className="text-nowrap">
              {data
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((item) => (
                  <TableRow
                    className={`${
                      (tableType === "user" || tableType === "blog") &&
                      "cursor-pointer hover:bg-[#fdf0ea]"
                    }`}
                    key={item?.bookingId}
                    onClick={() => handleRowClick(item.id)}
                  >
                    {columns?.bookingId && (
                      <TableCell>{item.bookingId}</TableCell>
                    )}
                    {columns?.tourId && <TableCell>{item.bookingId}</TableCell>}
                    {columns?.name && (
                      <TableCell style={{ minWidth: "200px" }}>
                        {/* Added minWidth for Name column */}
                        <div className="flex items-center gap-3">
                          <img
                            className="rounded-full"
                            src={item.customerImg}
                            alt={item.customerName}
                            style={{ width: "40px", height: "40px" }} // fixed size for the image
                          />
                          <span className="truncate">{item.customerName}</span>{" "}
                          {/* Added truncate to prevent overflow */}
                        </div>
                      </TableCell>
                    )}
                    {columns?.username && (
                      <TableCell style={{ minWidth: "200px" }}>
                        {/* Added minWidth for Name column */}
                        <div className="flex items-center gap-3">
                          <img
                            className="rounded-full"
                            src={item.customerImg}
                            alt={item.customerName}
                            style={{ width: "40px", height: "40px" }} // fixed size for the image
                          />
                          <span className="truncate">{item.name}</span>{" "}
                          {/* Added truncate to prevent overflow */}
                        </div>
                      </TableCell>
                    )}
                    {columns?.blogName && (
                      <TableCell
                        style={{ width: "400px", textWrap: "break-word" }}
                      >
                        {/* Added minWidth for Name column */}
                        <div className="flex items-center gap-3">
                          <img
                            className="rounded-full"
                            src={item.headerImg}
                            alt={item.header}
                            style={{ width: "40px", height: "40px" }} // fixed size for the image
                          />
                          <span
                            className="truncate"
                            style={{
                              wordWrap: "break-word",
                            }}
                          >
                            {item.header}
                          </span>
                          {/* Added truncate to prevent overflow */}
                        </div>
                      </TableCell>
                    )}
                    {columns?.category && (
                      <TableCell>{item.category}</TableCell>
                    )}
                    {columns?.phone && <TableCell>{item.phone}</TableCell>}
                    {columns?.email && <TableCell>{item.email}</TableCell>}
                    {columns?.country && <TableCell>{item.country}</TableCell>}
                    {columns?.traveler && (
                      <TableCell style={{ minWidth: "200px" }}>
                        {/* Added minWidth for Name column */}
                        <div className="flex items-center gap-3">
                          <img
                            className="rounded-full"
                            src={item.customerImg}
                            alt={item.customerName}
                            style={{ width: "40px", height: "40px" }} // fixed size for the image
                          />
                          <span className="truncate">{item.customerName}</span>{" "}
                          {/* Added truncate to prevent overflow */}
                        </div>
                      </TableCell>
                    )}

                    {columns?.date && <TableCell>{item.date}</TableCell>}
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
                    {columns?.status && <TableCell>{item.status}</TableCell>}
                    {columns?.action && (
                      <TableCell>
                        <div className="flex gap-5 ">
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
                        </div>
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
};

export default CustomTable;
