import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OfferManagementApis from "~/Apis/OfferManagementApis";

export default function CreateOffers() {
    const navigate = useNavigate();

    const [isUnlimited, setIsUnlimited] = useState(false);
    const [name, setName] = useState('');
    const [codeName, setCodeName] = useState('');
    const [description, setDescription] = useState('');
    const [discountType, setDiscountType] = useState('');
    const [amount, setAmount] = useState('');
    const [startDate, setStartDate] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [usageLimit, setUsageLimit] = useState('');
    const [maxUsesPerUser, setMaxUsesPerUser] = useState('');
    const [minType, setMinType] = useState('');
    const [minAmount, setMinAmount] = useState('');
    const [minQuantity, setMinQuantity] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const title = "Create Promo Code";

    const handleSubmit = async (e) => {

        
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        const newData = {
            name: name,
            code: codeName,
            description: description,
            amount_type: discountType,
            amount: parseFloat(amount),
            max_uses: isUnlimited ? 9999 : parseInt(usageLimit),
            max_uses_per_user: parseInt(maxUsesPerUser),
            starts_at: startDate,
            expires_at: expirationDate,
            min_type: minType,
            min_amount: parseFloat(minAmount),
            min_quantity: parseInt(minQuantity),
        };

        try {
            console.log("Submitting form...");
            const response = await OfferManagementApis.post(newData);
            if (response.errors) {
                setError(response.message);
            } else {
                navigate("/dashboard/offers-management");
            }
        } catch (err) {
            setError("An error occurred while creating the offer.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="overflow-hidden py-5" style={{ minHeight: "calc(100vh - 100px)" }}>
            <div className='flex flex-col sm:flex-row justify-between items-center pb-5'>
                <h1 className='text-[#0D0E0D] text-[20px]'>{title}</h1>
            </div>
            <div className="bg-white p-6 rounded-lg overflow-y-auto">
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-[#4A4C56] font-medium">
                            Offer Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter offer name (e.g., 10% discount)"
                            className="w-full p-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#EB5B2A] focus:border-transparent"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Code Name */}
                    <div className="space-y-2">
                        <label htmlFor="codeName" className="block text-[#4A4C56] font-medium">
                            Code Name
                        </label>
                        <input
                            type="text"
                            id="codeName"
                            name="codeName"
                            placeholder="Enter discount code (e.g., TEST10)"
                            className="w-full p-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#EB5B2A] focus:border-transparent"
                            value={codeName}
                            onChange={(e) => setCodeName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-[#4A4C56] font-medium">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Enter offer description"
                            rows={3}
                            className="w-full p-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#EB5B2A] focus:border-transparent resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
                            className="w-full p-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#EB5B2A] focus:border-transparent"
                            value={discountType}
                            onChange={(e) => setDiscountType(e.target.value)}
                            required
                        >
                            <option value="">Select discount type</option>
                            <option value="percentage">Percentage</option>
                            <option value="fixed">Fixed amount</option>
                        </select>
                    </div>

                    {/* Amount */}
                    <div className="space-y-2">
                        <label htmlFor="amount" className="block text-[#4A4C56] font-medium">
                            Discount Amount
                        </label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            placeholder="Enter discount amount"
                            step="0.01"
                            className="w-full p-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#EB5B2A] focus:border-transparent"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>

                    {/* Date Fields */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="startDate" className="block text-[#4A4C56] font-medium">
                                Start Date
                            </label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                className="w-full p-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#EB5B2A] focus:border-transparent"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
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

                    {/* Usage Limit */}
                    <div className="space-y-2">
                        <label htmlFor="usageLimit" className="block text-[#4A4C56] font-medium">
                            Total Usage Limit
                        </label>
                        <input
                            type="number"
                            id="usageLimit"
                            name="usageLimit"
                            disabled={isUnlimited}
                            placeholder={isUnlimited ? 'Unlimited' : 'Enter total usage limit'}
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

                    {/* Max Uses Per User */}
                    <div className="space-y-2">
                        <label htmlFor="maxUsesPerUser" className="block text-[#4A4C56] font-medium">
                            Max Uses Per User
                        </label>
                        <input
                            type="number"
                            id="maxUsesPerUser"
                            name="maxUsesPerUser"
                            placeholder="Enter max uses per user"
                            className="w-full p-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#EB5B2A] focus:border-transparent"
                            value={maxUsesPerUser}
                            onChange={(e) => setMaxUsesPerUser(e.target.value)}
                            required
                        />
                    </div>

                    {/* Minimum Type */}
                    <div className="space-y-2">
                        <label htmlFor="minType" className="block text-[#4A4C56] font-medium">
                            Minimum Type
                        </label>
                        <select
                            id="minType"
                            name="minType"
                            className="w-full p-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#EB5B2A] focus:border-transparent"
                            value={minType}
                            onChange={(e) => setMinType(e.target.value)}
                            required
                        >
                            <option value="">Select minimum type</option>
                            <option value="amount">Amount</option>
                            <option value="quantity">Quantity</option>
                        </select>
                    </div>

                    {/* Minimum Amount */}
                    <div className="space-y-2">
                        <label htmlFor="minAmount" className="block text-[#4A4C56] font-medium">
                            Minimum Amount
                        </label>
                        <input
                            type="number"
                            id="minAmount"
                            name="minAmount"
                            placeholder="Enter minimum amount"
                            step="0.01"
                            className="w-full p-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#EB5B2A] focus:border-transparent"
                            value={minAmount}
                            onChange={(e) => setMinAmount(e.target.value)}
                            required
                        />
                    </div>

                    {/* Minimum Quantity */}
                    <div className="space-y-2">
                        <label htmlFor="minQuantity" className="block text-[#4A4C56] font-medium">
                            Minimum Quantity
                        </label>
                        <input
                            type="number"
                            id="minQuantity"
                            name="minQuantity"
                            placeholder="Enter minimum quantity"
                            className="w-full p-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#EB5B2A] focus:border-transparent"
                            value={minQuantity}
                            onChange={(e) => setMinQuantity(e.target.value)}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="py-3 px-4 bg-[#EB5B2A] text-white font-medium rounded-lg hover:bg-[#D45326] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#EB5B2A] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating...' : 'Create Promo Code'}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/dashboard/offers")}
                            className="py-3 px-4 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
