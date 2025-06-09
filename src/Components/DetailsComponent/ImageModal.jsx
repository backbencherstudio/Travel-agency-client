import React from 'react'

const ImageModal = ({ showImageModal, setShowImageModal, images, modalImageIndex, setModalImageIndex, activeTab, setActiveTab, details }) => {
    return (
        <div className="fixed inset-0 z-50  flex flex-col justify-between items-center bg-[#232a2f]">
            <div className='flex flex-row justify-center items-center py-5 w-full relative border-b border-[#A5A5AB]'>
                <div className='flex flex-row justify-between items-center gap-8'>
                    <p className='font-medium text-white'>Huacachha Oats & Most reviewed company in Peru!</p>
                    <button className='bg-[#EB5B2A] text-sm font-semibold text-white px-4 py-2 rounded-full'>Check Availability</button>
                </div>
                {/* Close Button */}
                <button onClick={() => setShowImageModal(false)} className=" text-gray-400 text-2xl absolute right-0">
                    <span className='flex items-center px-2 bg-gray-100 rounded-full'>&times;</span>
                </button>
            </div>
            <div className="relative w-full h-full py-8">
                {/* Tabs */}
                <div className="flex justify-center mb-4">
                    <button
                        className={`px-4 py-2 ${activeTab === 'provider' ? 'border-b-2 border-white text-white' : 'text-gray-400'}`}
                        onClick={() => setActiveTab('provider')}
                    >
                        Provider photos ({details?.package_files?.length})
                    </button>
                    <button
                        className={`px-4 py-2 ${activeTab === 'traveler' ? 'border-b-2 border-white text-white' : 'text-gray-400'}`}
                        onClick={() => setActiveTab('traveler')}
                    >
                        Traveler photos (0)
                    </button>
                </div>
                {/* Main Image */}
                <div className="relative flex items-center justify-center w-full max-w-7xl mx-auto">
                    {/* Left Arrow */}
                    <button
                        className="absolute left-0 z-10 p-2 text-white bg-black bg-opacity-50 rounded-full"
                        onClick={() => setModalImageIndex((modalImageIndex - 1 + images.length) % images.length)}
                    >
                        &#8592;
                    </button>
                    <img
                        src={images[modalImageIndex]?.file_url}
                        alt=""
                        className="max-h-[400px] rounded-xl mx-auto"
                    />
                    {/* Right Arrow */}
                    <button
                        className="absolute right-0 z-10 p-2 text-white bg-black bg-opacity-50 rounded-full"
                        onClick={() => setModalImageIndex((modalImageIndex + 1) % images.length)}
                    >
                        &#8594;
                    </button>
                </div>
                <div className=''>
                    {/* Photo count */}
                    <div className="text-white mt-2 text-right">{modalImageIndex + 1}/{images.length}</div>
                    {/* Thumbnails */}
                    <div className="flex gap-2 mt-4 h-full">
                        {images.map((img, idx) => (
                            <img
                                key={img.file_url}
                                src={img.file_url}
                                alt=""
                                className={`h-24 w-24 object-cover rounded cursor-pointer ${idx === modalImageIndex ? 'ring-2 ring-white' : ''}`}
                                onClick={() => setModalImageIndex(idx)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageModal