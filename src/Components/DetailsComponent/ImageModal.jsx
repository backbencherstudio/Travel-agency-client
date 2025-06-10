import React, { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ImageModal = ({ showImageModal, setShowImageModal, images, modalImageIndex, setModalImageIndex, activeTab, setActiveTab, details }) => {
    const thumbnailsRef = useRef(null);

    const handleWheel = (e) => {
        if (thumbnailsRef.current) {
            e.preventDefault();
            thumbnailsRef.current.scrollLeft += e.deltaY;
        }
    };

    return (
        <div className="fixed inset-0 z-50  flex flex-col justify-between items-center bg-[#232a2f]">
            <div className='flex flex-row justify-center items-center py-5 w-full relative border-b border-[#A5A5AB]'>
                <div className='flex flex-col md:flex-row justify-between items-center gap-8 mt-10 md:mt-0'>
                    <p className='font-medium text-white text-sm md:text-base'>Huacachha Oats & Most reviewed company in Peru!</p>
                    <button className='bg-[#EB5B2A] text-sm font-semibold text-white px-4 py-2 rounded-full'>Check Availability</button>
                </div>
                {/* Close Button */}
                <button onClick={() => setShowImageModal(false)} className=" text-gray-400 text-2xl absolute right-0 md:right-4 top-4 md:top-4">
                    <span className='flex items-center px-2 bg-gray-100 rounded-full'>&times;</span>
                </button>
            </div>
            <div className="relative w-full h-full pt-8 flex flex-col justify-between items-center">
                <div className='w-full'>
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
                            className="absolute left-0 z-10 p-2 text-[#0E457D] bg-white rounded-full"
                            onClick={() => setModalImageIndex((modalImageIndex - 1 + images.length) % images.length)}
                        >
                           <ChevronLeft className='text-[#0E457D] text-2xl'/>
                        </button>
                        <img
                            src={images[modalImageIndex]?.file_url}
                            alt=""
                            className="max-h-[400px] rounded-xl mx-auto"
                        />
                        {/* Right Arrow */}
                        <button
                            className="absolute right-0 z-10 p-2 text-[#0E457D] bg-white bg-opacity-50 rounded-full"
                            onClick={() => setModalImageIndex((modalImageIndex + 1) % images.length)}
                        >
                            <ChevronRight className='text-[#0E457D] text-2xl'/>
                        </button>
                    </div>
                </div>
                <div className='w-full'>
                    {/* Photo count */}
                    <div className="text-white mt-2 text-right">{modalImageIndex + 1}/{images.length}</div>
                    {/* Thumbnails Container */}
                    <div 
                        ref={thumbnailsRef}
                        onWheel={handleWheel}
                        className="flex gap-2 mt-4 h-full overflow-x-auto scrollbar-hide"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {images.map((img, idx) => (
                            <img
                                key={img.file_url}
                                src={img.file_url}
                                alt=""
                                className={`h-24 w-24 object-cover rounded cursor-pointer flex-shrink-0 ${idx === modalImageIndex ? 'border border-white rounded-xl' : ''}`}
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