import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { sendReview } from "~/Apis/clientApi/ClientBookApi";
import Swal from "sweetalert2";

export default function AddReviewTour() {
    const { id } = useParams();
    const [hasUserReviewed, setHasUserReviewed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userReview, setUserReview] = useState({});
    const [newReview, setNewReview] = useState({
        rating_value: 0,
        comment: '',
    });
    const handleStarClick = (rating) => {
        setNewReview(prevReview => ({
            ...prevReview,
            rating_value: rating,
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReview(prevReview => ({
            ...prevReview,
            [name]: value,
        }));
    };


    const handleSubmit = async () => {
        setLoading(true);
        try {
            const fd = new FormData();
            fd.append('rating_value', newReview.rating_value);
            fd.append('comment', newReview.comment);
            // Simulate API call
            const res = await sendReview(id, fd);
            if(res?.success){
                Swal.fire("Success", "Thanks for your review.", "success");
                setUserReview(newReview);
                setHasUserReviewed(true);
            }
        } catch (error) {
            console.error("Error submitting review:", error);
        }
        setLoading(false);
    }

    return (
        <div className="py-10 px-4">
            <div className='mt-10 '>
                <div className='border border-gray-300 rounded-lg p-5'>
                    <h3 className='text-lg font-semibold text-gray-700 mb-5 uppercase'>
                        Write Your Review
                    </h3>
                    {hasUserReviewed ? (
                        <div className='mb-4 flex items-center gap-2'>
                            <label className='block text-gray-600 '>Your Rating:</label>
                            <div className='flex items-center space-x-2'>
                                {[1, 2, 3, 4, 5].map(num => (
                                    <FaStar
                                        key={num}
                                        className={`text-2xl ${num <= userReview.rating_value
                                            ? 'text-orange-500'
                                            : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className='mb-4'>
                            <label className='block text-gray-600 mb-2'>Rating:</label>
                            <div className='flex items-center space-x-2'>
                                {[1, 2, 3, 4, 5].map(num => (
                                    <FaStar
                                        key={num}
                                        className={`cursor-pointer text-2xl ${num <= newReview.rating_value
                                            ? 'text-orange-500'
                                            : 'text-gray-300'
                                            }`}
                                        onClick={() => handleStarClick(num)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    <div className='mb-4'>
                        <label className='block text-gray-600 mb-2' htmlFor='comment'>
                            Comment:
                        </label>
                        <textarea
                            id='comment'
                            name='comment'
                            value={newReview.comment}
                            onChange={handleInputChange}
                            rows='4'
                            disabled={hasUserReviewed}
                            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#F9751A]'
                        />
                    </div>
                    <button onClick={handleSubmit} disabled={loading} type="button" className="border px-4 py-1 rounded-md bg-orange-500 text-white cursor-pointer hover:bg-orange-600 duration-300 disabled:opacity-50 disabled:cursor-not-allowed">{loading ? "Submitting..." : "Submit Review"}</button>
                </div>
            </div>
        </div>
    )
}