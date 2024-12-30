import { useState } from "react";
import CustomTable from "../../../Shared/CustomTable";
import { bookingData } from "../../../data/data";

const Packages = () => {
  const [tourDateFilter, setTourDateFilter] = useState("all");
  const [columns] = useState({
    bookingId: true,
    name: true,
    date: true,
    destination: true,
    amount: true,
    status: true,
  });
  return (
    <div>
      <CustomTable
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
