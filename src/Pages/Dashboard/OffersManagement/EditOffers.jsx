import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";

export default function EditOffers() {
    const [isUnlimited, setIsUnlimited] = useState(false);
    const id = location.pathname.split("/")[location.pathname.split("/").length-1];
    const [status, setStatus] = useState(true)
    const [data,setData] = useState([]);
    const title = "Promo Code Management";
    const handleSubmit=(e)=>{
        e.preventDefault();
        const newData = {
            code_name: e.target.codeName.value,
            discount_type: e.target.discountType.value,
            creation_date: e.target.creationDate.value,
            expiration_date: e.target.expirationDate.value,
            status: status?1:0,
            usage_limit: isUnlimited? 9999:e.target.usageLimit.value
        }
        setData(prev => [...prev,newData]);
    }
    return (
        <div className="overflow-hidden py-5" style={{ minHeight: "calc(100vh - 100px)" }}>
            <div className='flex flex-col sm:flex-row justify-between items-center pb-5'>
                <h1 className='text-[#0D0E0D] text-[20px]'>{title}</h1>
            </div>
            <div className="bg-white p-6 rounded-lg overflow-y-auto">
                <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                    {/* Code Name */}
                    <div className="space-y-2">
                        <label htmlFor="codeName" className="block text-[#4A4C56] font-medium">
                            Code Name
                        </label>
                        <input
                            type="text"
                            id="codeName"
                            name="codeName"
                            placeholder="Enter discount code"
                            className="w-full p-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#EB5B2A] focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Discount Type */}
                    <div className="space-y-2">
                        <label htmlFor="discountType" className="block text-[#4A4C56] font-medium">
                            Discount Type
                        </label>
                        <select
                            id="discountType"
                            name="discountType"
                            className="w-full p-3 border border-gray-300 rounded-lg text-sm outline-none"
                            required
                        >
                            <option value="">Select discount type</option>
                            <option value="percentage">Percentage</option>
                            <option value="fixed">Fixed amount</option>
                        </select>
                    </div>

                    {/* Date Fields */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="creationDate" className="block text-[#4A4C56] font-medium">
                                Creation Date
                            </label>
                            <input
                                type="date"
                                id="creationDate"
                                name="creationDate"
                                className="w-full p-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#EB5B2A] focus:border-transparent"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="expirationDate" className="block text-[#4A4C56] font-medium">
                                Expiration Date
                            </label>
                            <input
                                type="date"
                                id="expirationDate"
                                name="expirationDate"
                                className="w-full p-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#EB5B2A] focus:border-transparent"
                                required
                            />
                        </div>
                    </div>

                    {/* Status Toggle */}
                    <div className="space-y-2">
                        <label className="block text-[#4A4C56] font-medium">Status</label>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                role="switch"
                                onClick={(e)=> {e.preventDefault();setStatus(!status)}}
                                aria-checked={status}
                                className={`w-10 h-5 rounded-full relative transition-colors duration-200 focus:outline-none ${status ? 'bg-[#22CAAD]' : 'bg-gray-300'
                                    }`}
                            >
                                <span
                                    className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ${status ? '-translate-x-[18px]' : 'translate-x-[2px]'
                                        }`}
                                />
                            </button>
                            <span className="text-sm">{status ? 'Inactive' : 'Active'}</span>
                        </div>
                    </div>

                    {/* Usage Limit */}
                    <div className="space-y-2">
                        <label htmlFor="usageLimit" className="block text-[#4A4C56] font-medium">
                            Usage Limit
                        </label>
                        <input
                            type="number"
                            id="usageLimit"
                            name="usageLimit"
                            disabled={isUnlimited}
                            placeholder={isUnlimited ? 'Unlimited' : 'Enter usage limit'}
                            className={`w-full p-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#EB5B2A] focus:border-transparent ${isUnlimited ? 'bg-gray-100 text-gray-400' : ''
                                }`}
                        />
                    </div>

                    {/* Unlimited Checkbox */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="unlimitedUsage"
                            name="unlimitedUsage"
                            checked={isUnlimited}
                            onChange={() => setIsUnlimited(!isUnlimited)}
                            className="w-5 h-5 border-2 border-[#A6AAAC] rounded focus:ring-[#EB5B2A] text-[#EB5B2A]"
                        />
                        <label htmlFor="unlimitedUsage" className="text-[#4A4C56] font-medium">
                            Unlimited usage
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="py-3 px-4 bg-[#EB5B2A] text-white font-medium rounded-lg hover:bg-[#D45326] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#EB5B2A] focus:ring-offset-2"
                    >
                        Save Promo Code
                    </button>
                </form>
            </div>
        </div>
    )
}