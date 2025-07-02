import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";


export default function Pagination({ data, handlePageChange, currentPage, pageLeft, pageRight, totalPages }) {
    console.log("Pagination : ", data)
    return (<div className="flex justify-center items-center mt-10 mb-4 max-w-[1200px] mx-auto font-bold">
        <div className="flex items-center border border-[#D0D5DD] rounded-lg sm:px-4">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center gap-1 pr-2 sm:px-3 ${currentPage === 1
                    ? "text-gray-400"
                    : "text-gray-700 hover:text-blue-600"
                    } text-xs sm:text-base`}
            >
                <MdKeyboardArrowLeft className="text-xl" />
                Previous
            </button>

            <div className="flex border-l">
                {pageLeft.map((number) => (
                    <div key={number} className="border-r border-[#D0D5DD] m-auto">
                        <button
                            onClick={() => handlePageChange(number)}
                            className={` ${currentPage === number
                                ? "bg-orange-600 text-white"
                                : "text-[#182230] hover:bg-gray-100"
                                }  text-xs sm:text-base w-[25px] h-[25px] sm:w-[40px] sm:h-[40px] m-1`}
                        >
                            {number}
                        </button>
                    </div>
                ))}

                {pageRight.length != 0 ? (
                    <div className="border-r h-full">
                        <div className="px-3 py-1">...</div>
                    </div>
                ) : (
                    <div></div>
                )}
                {pageRight.map((number) => (
                    <div key={number} className="border-l border-[#D0D5DD]">
                        <button
                            onClick={() => handlePageChange(number)}
                            className={`w-[25px] h-[25px] sm:w-[40px] sm:h-[40px] m-1 ${currentPage === number
                                ? "bg-orange-600 text-white"
                                : "text-gray-700 hover:bg-gray-100"
                                } text-xs sm:text-base`}
                        >
                            {number}
                        </button>
                    </div>
                ))}
            </div>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex text-xs sm:text-base items-center gap-1 pl-2 sm:px-3 ${currentPage === totalPages
                    ? "text-gray-400"
                    : "text-gray-700 hover:text-blue-600"
                    }`}
            >
                Next
                <MdKeyboardArrowRight className="text-xl" />
            </button>
        </div>
    </div>
    )
}