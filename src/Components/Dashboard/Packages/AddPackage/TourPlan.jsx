import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaPlus } from 'react-icons/fa';
import uploadIcon from '../../../../assets/dashboard/upload-icon.svg';
import { LuTrash2 } from 'react-icons/lu';

const ImageUploader = ({ images, onImageDrop, onImageDelete }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onImageDrop,
        accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
        multiple: true,
    });

    return (
        <div>
            {/* Dropzone Area */}
            <div
                {...getRootProps()}
                className={`border border-dashed bg-white flex flex-col items-center rounded-lg py-8 cursor-pointer transition ${isDragActive ? 'bg-purple-900/50 border-purple-600' : 'border-gray-200'
                    }`}
            >
                <img
                    src={uploadIcon}
                    className="bg-[#F6B49D] p-[10px] rounded-full mb-[6px]"
                    alt=""
                />
                <input {...getInputProps()} />
                <p className="text-xs md:text-base text-black rounded-full">
                    Drag & Drop or <span className="text-[#EB5B2A]">Choose File</span> to upload
                </p>
                {/* <p className="mt-1 text-xs md:text-base text-gray-400 text-center">
                    Supported formats: jpeg, png
                </p> */}
            </div>

            {/* Image Thumbnails */}
            <div className="mt-4 flex flex-wrap gap-4 justify-start items-start">
                {images.map((file, idx) => {
                    const imageUrl = file instanceof File || file instanceof Blob ? URL.createObjectURL(file) : file.image_url;
                    return (
                        <div key={idx} className="relative w-16 h-16">
                            {/* Image Thumbnail */}
                            <img
                                src={imageUrl}
                                alt={imageUrl}
                                className="w-full h-full object-cover rounded-lg"
                            />
                            {/* Delete Button */}
                            <button
                                onClick={() => onImageDelete(idx)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                title="Delete"
                            >
                                &times;
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const TourPlan = ({ tourPlan, setTourPlan, packageType }) => {

    const handleInputChange = (index, field, value) => {
        setTourPlan((prev) => {
            const updatedPlan = [...prev];
            updatedPlan[index][field] = value;
            return updatedPlan;
        });
    };

    const handleImageUpdate = (index, acceptedFiles) => {
        setTourPlan((prev) => {
            const updatedPlan = [...prev];
            updatedPlan[index].images = [
                ...(updatedPlan[index].images || []),
                ...acceptedFiles,
            ];
            return updatedPlan;
        });
    };

    const handleImageDelete = (dayIndex, imageIndex) => {
        setTourPlan((prev) => {
            const updatedPlan = [...prev];
            updatedPlan[dayIndex].images.splice(imageIndex, 1);
            return updatedPlan;
        });
    };

    const addDay = () => {
        setTourPlan((prev) => [
            ...prev,
            { day: prev.length + 1, title: '', description: '', images: [] },
        ]);
    };

    const deleteDay = (index) => {
        setTourPlan((prev) => {
            const updatedPlan = prev.filter((_, idx) => idx !== index);
            return updatedPlan.map((day, idx) => ({ ...day, day: idx + 1 })); // Reorder days
        });
    };

    // console.log('tourPlan', tourPlan)

    return (
        <div>
            <div className="px-4 py-3 bg-[#fffcfb] border border-[#DFDFDF] rounded-lg">
                {tourPlan.map((dayPlan, index) => (
                    <div key={index} className=' flex flex-col gap-3 mb-4'>
                        <div className='flex justify-between'>
                            <h3 className="text-2xl font-medium text-[#4A4C56]">Day {dayPlan.day}</h3>
                            {/* Delete Day Button */}
                            {tourPlan.length > 1 && index > 0 && (
                                <button
                                    onClick={() => deleteDay(index)}
                                    className='text-red-600 hover:text-red-700 transform duration-300'
                                    title="Delete Day"
                                >
                                    <LuTrash2 className='text-lg' />
                                </button>
                            )}
                        </div>
                        <div>
                            <div>
                                <label htmlFor="">title</label>
                                <input type="text" name="" id="" />
                            </div>
                            <div>
                                <label htmlFor="">Description</label>
                                <input type="text" name="" id="" />
                            </div>
                            <div>
                                <label htmlFor="">Time</label>
                                <input type="text" name="" id="" />
                            </div>
                        </div>
                        <div className="p-4 bg-[#F0F4F9] rounded-lg flex flex-col gap-3">
                            {/* Trip Title */}
                            <div>
                                <label className="block text-[#4A4C56] text-base font-medium mb-2">
                                    Tour Title
                                </label>
                                <input
                                    type="text"
                                    value={dayPlan.title}
                                    onChange={(e) =>
                                        handleInputChange(index, 'title', e.target.value)
                                    }
                                    placeholder="Enter your package title"
                                    className="w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                />
                            </div>

                            {/* Trip Overview */}
                            <div>
                                <label className="block text-[#4A4C56] text-base font-medium mb-2">
                                    Plan Overview
                                </label>
                                <input
                                    type="text"
                                    value={dayPlan.description}
                                    onChange={(e) =>
                                        handleInputChange(index, 'description', e.target.value)
                                    }
                                    placeholder="Enter package description"
                                    className="w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                />
                            </div>

                            {/* Upload Images */}
                            <div className="w-full">
                                <h2 className="text-base font-medium text-[#4A4C56] mb-2">
                                    Upload Images
                                </h2>
                                <ImageUploader
                                    images={dayPlan.images}
                                    onImageDrop={(acceptedFiles) =>
                                        handleImageUpdate(index, acceptedFiles)
                                    }
                                    onImageDelete={(imageIndex) =>
                                        handleImageDelete(index, imageIndex)
                                    }
                                />
                            </div>
                        </div>
                        {/* {index === tourPlan.length - 1 && (

                            <button
                                onClick={addDay}
                                className={`px-2 py-[9px] bg-[#EB5B2A] flex items-center gap-1 text-white text-xs w-fit rounded ${packageType === "tour" ? "hidden" : "block"}`}
                            >
                                <FaPlus className="w-3 h-3" /> Add Another Day
                            </button>
                        )} */}
                    </div>
                ))}
                {/* <button className='bg-[#EB5B2A] flex items-center gap-1 px-2 py-3 text-white font-medium rounded-md cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10.0013 4.16602V15.8327M4.16797 9.99935H15.8346" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span>Add Another Day</span>
            </button> */}
                <button
                type='button'
                    onClick={addDay}
                    className={`px-2 py-[9px] bg-[#EB5B2A] flex items-center gap-1 text-white text-xs w-fit rounded`}
                >
                    <FaPlus className="w-3 h-3" /> Add Another Day
                </button>
            </div>
        </div>
    );
};


export default TourPlan;
