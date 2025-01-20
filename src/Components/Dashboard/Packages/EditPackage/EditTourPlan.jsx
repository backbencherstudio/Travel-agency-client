import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import uploadIcon from '../../../../assets/dashboard/upload-icon.svg';
import axiosClient from '../../../../axiosClient';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
                className={`border border-dashed bg-white flex flex-col items-center rounded-lg py-8 cursor-pointer transition ${
                    isDragActive ? 'bg-purple-900/50 border-purple-600' : 'border-gray-200'
                }`}
            >
                <img
                    src={uploadIcon}
                    className="bg-[#EB5B2A] p-[10px] rounded-full mb-[6px]"
                    alt=""
                />
                <input {...getInputProps()} />
                <p className="text-xs md:text-base text-black rounded-full">
                    Drag & Drop or <span className="text-[#EB5B2A]">Choose File</span> to upload
                </p>
                <p className="mt-1 text-xs md:text-base text-gray-400 text-center">
                    Supported formats: jpeg, png
                </p>
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

const EditTourPlan = ({ package_id, tourPlan, setTourPlan, packageType }) => {
    const [loading, setLoading] =  useState(false);
    const navigate = useNavigate();

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

    const editDay = (dayId) => {
        navigate(`/dashboard/package/${package_id}/tour-plan/${dayId}`)
    }
    
    const deleteDay = async (index, dayId) => {
        const shouldDelete = window.confirm("Do you want to delete this package");
        if (shouldDelete) {
            setLoading(true);
            try {
                // API call to delete the day
                await axiosClient.delete(`/api/admin/package/${package_id}/package-trip-plan/${dayId}`);
                setTourPlan((prev) => {
                    const updatedPlan = prev.filter((_, idx) => idx !== index);
                    return updatedPlan.map((day, idx) => ({ ...day, day: idx + 1 })); // Reorder days
                });
                toast.info("Deleted Succesfully...")
            } catch (error) {
                console.error('Error deleting day:', error);
            }
            setLoading(false);
        }
    };

    console.log('tourPlan', tourPlan)

    return (
        <div>
            <div className="px-4 py-3 bg-[#fffcfb] border border-[#DFDFDF] rounded-lg">
                {tourPlan.map((dayPlan, index) => (
                    <div key={index} className=' flex flex-col gap-3 mb-4'>
                        <div className='flex justify-between'>
                            <h3 className="text-2xl font-medium text-[#4A4C56]">Day {dayPlan.day}</h3>
                            <div className='flex gap-4'>
                                <button
                                    onClick={() => editDay(dayPlan.id)}
                                    className=" bg-blue-500 text-white p-2 rounded-full"
                                    title="Edit Day"
                                >
                                    <FaEdit />
                                </button>
                                {loading ? (
                                    <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-600 border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                                        role="status">
                                        <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                    >Loading...</span>
                                    </div>
                                ) : (
                                // {/* Delete Day Button */}
                                <div>
                                    {tourPlan && (
                                        <button
                                        onClick={() => deleteDay(index, dayPlan.id)}
                                        className=" bg-red-500 text-white p-2 rounded-full"
                                        title="Delete Day"
                                        >
                                        <FaTrash />
                                        </button>
                                    )}
                                </div>
                                )}
                            </div>
                        </div>
                        <div className="p-4 bg-[#F0F4F9] rounded-lg flex flex-col gap-3">
                            {/* Trip Title */}
                            <div>
                                <label className="block text-gray-500 text-base font-medium mb-2">
                                    Trip Title
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
                                <label className="block text-gray-500 text-base font-medium mb-2">
                                    Trip Overview
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
                                <h2 className="text-base font-medium text-gray-500 mb-2">
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
                        {index === tourPlan.length -1 && (
                            <Link to={`/dashboard/package/${package_id}/tour-plan`} className={`px-2 py-[9px] bg-[#EB5B2A] flex items-center gap-1 text-white text-xs w-fit rounded ${packageType === "tour" ? "hidden" : "block"}`}>
                                <FaPlus className="w-3 h-3" /> Add Another Day
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};


export default EditTourPlan;
