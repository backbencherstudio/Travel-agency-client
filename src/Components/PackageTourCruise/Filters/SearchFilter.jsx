import { CiSearch } from "react-icons/ci";

const SearchFilter = ({ searchDestination, onSearchChange }) => {
  return (
    <div className="flex gap-2 border items-center py-2 px-5 rounded-md">
      <CiSearch className="text-3xl" />
      <input
        className="outline-none w-full"
        type="text"
        placeholder="Search Destination"
        defaultValue={searchDestination}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchFilter;