import { useState } from "react";
import { bookingData } from "../../../data/data";
import PackageTable from "../../../Components/Dashboard/Packages/PackageTable";

const Packages = () => {
  const [tourDateFilter, setTourDateFilter] = useState("all");
  const [columns] = useState({
    packageName: true,
    package: true,
    details: true,
    budget: true,
    status: true,
    action: true,
  });
  return (
    <div>
      <PackageTable
        tableType="package"
        title={"Travel Packages"}
        data={bookingData}
        setDateFilter={setTourDateFilter}
        dateFilter={tourDateFilter}
        columns={columns}
      />
    </div>
  );
};

export default Packages;
