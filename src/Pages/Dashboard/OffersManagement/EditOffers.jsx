import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OfferManagementApis from "~/Apis/OfferManagementApis";

export default function EditOffers() {
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.pathname.split("/")[location.pathname.split("/").length - 1];  // Extracting the ID from URL

    const [isUnlimited, setIsUnlimited] = useState(false);
    const [status, setStatus] = useState(true);
    const [codeName, setCodeName] = useState('');
    const [discountType, setDiscountType] = useState('');
    const [creationDate, setCreationDate] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [usageLimit, setUsageLimit] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const title = "Promo Code Management";

    // Fetching the offer data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await OfferManagementApis.getOne(id);
                if (response.errors) {
                    setError(response.message);
                } else {
                    const offer = response.data;
                    setCodeName(offer.code);
                    setDiscountType(offer.amount_type);
                    setCreationDate(offer.starts_at?.split("T")[0]); // Only date part
                    setExpirationDate(offer.expires_at?.split("T")[0]); // Only date part
                    setUsageLimit(offer.max_uses === 9999 ? '' : offer.max_uses);
                    setIsUnlimited(offer.max_uses === 9999);
                    setStatus(offer.status === 1); // Assuming 1 means Active
                }
            } catch (err) {
                setError("An error occurred while fetching offer details.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newData = {
            code: codeName,
            amount_type: discountType,
            creation_date: creationDate,
            expiration_date: expirationDate,
            status: status ? 1 : 2,
            max_uses: isUnlimited ? 9999 : usageLimit,
        };


        console.log("Status : ",typeof newData.status)

        try {
            const response = await OfferManagementApis.updateAll(id, newData);
            if (response.errors) {
                setError(response.message);
            } else {
                // Redirect or show success message
                // navigate("/dashboard/offers");
            }
        } catch (err) {
            setError("An error occurred while updating the offer.");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="overflow-hidden py-5" style={{ minHeight: "calc(100vh - 100px)" }}>
            <div className='flex flex-col sm:flex-row justify-between items-center pb-5'>
                <h1 className='text-[#0D0E0D] text-[20px]'>{title}</h1>
            </div>
            <div className="bg-white p-6 rounded-lg overflow-y-auto">
                {error && <div className="text-red-500">{error}</div>}
                <form className="space-y-6" onSubmit={handleSubmit}>
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
                            value={codeName}
                            onChange={(e) => setCodeName(e.target.value)}
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
                            value={discountType}
                            onChange={(e) => setDiscountType(e.target.value)}
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
                                value={creationDate}
                                onChange={(e) => setCreationDate(e.target.value)}
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
                                value={expirationDate}
                                onChange={(e) => setExpirationDate(e.target.value)}
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
                                onClick={(e) => { e.preventDefault(); setStatus(!status); }}
                                aria-checked={status}
                                className={`w-10 h-5 rounded-full relative transition-colors duration-200 focus:outline-none ${status ? 'bg-[#22CAAD]' : 'bg-gray-300'}`}
                            >
                                <span
                                    className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ${status ? '-translate-x-[18px]' : 'translate-x-[2px]'}`}
                                />
                            </button>
                            <span className="text-sm">{status ? 'Active' : 'Inactive'}</span>
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
                            className={`w-full p-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#EB5B2A] focus:border-transparent ${isUnlimited ? 'bg-gray-100 text-gray-400' : ''}`}
                            value={usageLimit}
                            onChange={(e) => setUsageLimit(e.target.value)}
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
    );
}
