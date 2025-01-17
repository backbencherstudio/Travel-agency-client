import * as React from "react";
import avatar from "../../../assets/img/avatar/avatar-3.png"
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

import { useEffect, useState } from "react";
import PackageTable from "../../../Components/Dashboard/Packages/PackageTable";
import axiosClient from "../../../axiosClient";
import { useQuery } from "@tanstack/react-query";



const VendorDetails = () => {


    const [tourDateFilter, setTourDateFilter] = useState("all");
    const [packageData, setPackageData] = useState([]);
    const [columns] = useState({
      packageName: true,
      package: true,
      details: true,
      budget: true,
      status: true,
      action: true,
    });
  
    const { isLoading, isError, data = [], error, refetch } = useQuery({
      queryKey: ['packages'],
      queryFn: async () => {
          const response = await axiosClient.get('/api/admin/package');
          return response.data;
      },
    });
  
    


  return (
    <>
      <div className="content min-h-[calc(100vh-80px)] w-full bg-white p-6">
        <div className="userData">
            <div className="top grid grid-cols-12 gap-4">
                <div className="first col-span-12 md:col-span-2 flex flex-col items-center">
                     <img src={avatar} alt="" className="w-[200px] rounded-full object-cover mb-4" />
                     <h1 className="text-xl font-medium text-center mb-[3px] ">Ralph Edwards</h1>
                        <div className="rateing flex justify-center mb-1">
                            <Stack spacing={1}>
                            <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                            </Stack>
                        </div>
                        <p className="text-sm font-normal text-center">15 Reviews</p>
                </div>
                <div className="second md:col-span-10 col-span-12">
                    <h1 className="font-semibold text-lg mb-6">Vendor Profile</h1>
                      <div className="boxes grid md:grid-cols-10 w-full md:gap-4 ">

                            <div className="h-16 px-3 py-2 bg-gray-50 rounded border border-[#e9eaec] mb-4 md:col-span-5 w-full flex-col justify-start items-start inline-flex">
                                <h2 className="self-stretch text-[#a1a1a1] text-sm font-normal mb-[3px]">Vendor Name</h2>
                                <h1 className="self-stretch text-[#030b09] text-sm font-normal ">Esther Howard</h1>
                            </div>
                            <div className="h-16 px-3 py-2 bg-gray-50 rounded border border-[#e9eaec] mb-4 md:col-span-5 w-full flex-col justify-start items-start inline-flex">
                                <h2 className="self-stretch text-[#a1a1a1] text-sm font-normal mb-[3px]">Email Address</h2>
                                <h1 className="self-stretch text-[#030b09] text-sm font-normal ">esther.h@demo.com</h1>
                            </div>
                            <div className="h-16 px-3 py-2 bg-gray-50 rounded border border-[#e9eaec] mb-4 md:col-span-5 w-full flex-col justify-start items-start inline-flex">
                                <h2 className="self-stretch text-[#a1a1a1] text-sm font-normal mb-[3px]">Mobile Number</h2>
                                <h1 className="self-stretch text-[#030b09] text-sm font-normal ">(208) 555-0112</h1>
                            </div>
                            <div className="min-h-16 px-3 py-2 bg-gray-50 rounded border border-[#e9eaec] mb-4 md:col-span-5 w-full flex-col justify-start items-start inline-flex">
                                <h2 className="self-stretch text-[#a1a1a1] text-sm font-normal mb-[3px]">Address</h2>
                                <h1 className="self-stretch text-[#030b09] text-sm font-normal ">2118 Thornridge Cir. Syracuse, Connecticut 35624</h1>
                            </div>


                            <div className="h-16 px-3 py-2 bg-gray-50 rounded border border-[#e9eaec] mb-4 md:col-span-3 w-full flex-col justify-start items-start inline-flex">
                                <h2 className="self-stretch text-[#a1a1a1] text-sm font-normal mb-[3px]">Join Date</h2>
                                <h1 className="self-stretch text-[#030b09] text-sm font-normal ">12 March 2024</h1>
                            </div>
                            <div className="h-16 px-3 py-2 bg-gray-50 rounded border border-[#e9eaec] mb-4 md:col-span-4 w-full flex-col justify-start items-start inline-flex">
                                <h2 className="self-stretch text-[#a1a1a1] text-sm font-normal mb-[3px]">Gender </h2>
                                <h1 className="self-stretch text-[#030b09] text-sm font-normal ">Male</h1>
                            </div>
                            <div className="h-16 px-3 py-2 bg-gray-50 rounded border border-[#e9eaec] mb-4 md:col-span-3 w-full flex-col justify-start items-start inline-flex">
                                <h2 className="self-stretch text-[#a1a1a1] text-sm font-normal mb-[3px]">Date Of Birth</h2>
                                <h1 className="self-stretch text-[#030b09] text-sm font-normal ">12 January 1999</h1>
                            </div>


                      </div>
                </div>
            </div>
        </div>

<h1 className="mt-8 mb-6 text-lg font-semibold">Vendor Tour Package</h1>

{/* package table part */}
<div>
      {isLoading ? (
        <div>
          Loading...
        </div>
      )
      :
      (
        <PackageTable
          data={data?.data}
          setDateFilter={setTourDateFilter}
          dateFilter={tourDateFilter}
          columns={columns}
          refetch={refetch}
        />
      )
    }
    </div>
{/* package table part */}



      </div>
    </>
  );
};

export default VendorDetails;
