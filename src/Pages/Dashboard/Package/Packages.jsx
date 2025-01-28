import { useEffect, useState } from "react";
import PackageTable from "../../../Components/Dashboard/Packages/PackageTable";
import axiosClient from "../../../axiosClient";
import { useQuery } from "@tanstack/react-query";

const Packages = () => {
  const [tourDateFilter, setTourDateFilter] = useState("all");
  const [packageData, setPackageData] = useState([]);
  const [columns] = useState({
    packageName: true,
    package: true,
    details: true,
    budget: true,
    status: true,
    action: true,
    approval: true,
    created_at: true,
  });

  const { isLoading, isError, data = [], error, refetch } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
        const response = await axiosClient.get('/api/admin/package');
        return response.data;
    },
  });

console.log('data', data)

  // useEffect(() => {
  //   const fetchPackages = async () => {
  //       try {
  //           const resPackages = await axiosClient.get(`/api/admin/package`);
  //           console.log('resDetails', resPackages)
  //           setPackageData(resPackages.data.data);
  //       } catch (error) {
  //         console.error('Error fetching data:', error);
  //       }
  //   }
  //   fetchPackages();
  // }, [])

  return (
    <div>
      {isLoading ? (
        <div>
          Loading...
        </div>
      )
      :
      (
        <PackageTable
          tableType="package"
          title={"Travel Packages"}
          data={data?.data}
          setDateFilter={setTourDateFilter}
          dateFilter={tourDateFilter}
          columns={columns}
          refetch={refetch}
        />
      )
    }
    </div>
  );
};

export default Packages;
