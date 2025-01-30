import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import uploadIcon from '../../../../assets/dashboard/upload-icon.svg';
import axiosClient from '../../../../axiosClient';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

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

const TourPlanForm = () => {
    const { register, handleSubmit, setValue, formState: { errors }, } = useForm();
    const [images, setImages] = useState([]);
    const [loading, setLoading] =  useState(false);
    const { packageId } = useParams();
    const { planId } = useParams();

    console.log('packageId', packageId)
    console.log('planId', planId)

    useEffect(() => {
        const fetchTourPlan = async () => {
            const res = await axiosClient.get(`/api/admin/package/${packageId}/package-trip-plan/${planId}`);
            const tourData = res.data;
            console.log('tourData', tourData)
            if (tourData.data) {
                setValue('title', tourData.data?.title);
                setValue('description', tourData.data?.description);
                setImages(tourData.data?.package_trip_plan_images)
            }
        }
        if (planId) {
            fetchTourPlan();
        }
    }, [planId])

    // const handleInputChange = (index, field, value) => {
    //     setTourPlan((prev) => {
    //         const updatedPlan = [...prev];
    //         updatedPlan[index][field] = value;
    //         return updatedPlan;
    //     });
    // };

    // Function to add or update images
    const handleImageUpdate = (acceptedFiles) => {
        setImages((prev) => [...prev, ...acceptedFiles]);
    };

    // Function to delete an image by its index
    const handleImageDelete = (imageIndex) => {
        setImages((prev) => prev.filter((_, index) => index !== imageIndex));
    };

    // const addDay = () => {
    //     setTourPlan((prev) => [
    //         ...prev,
    //         { day: prev.length + 1, title: '', description: '', images: [] },
    //     ]);
    // };

    console.log('images', images)

    const handleTourPlanSubmit = async (data) => {
        console.log('data', data)
        const formDataObject = {
            ...data,
            images: images,
        };

        const form = new FormData();
        for (let key in formDataObject) {
        if (key === "images") {
            // handle trip_plans_images
            const planImages = [];
            images.forEach((image) => {
                if (image instanceof File) {
                    // Append the file directly if it's a File object
                    form.append(`images`, image);
                } else {
                    // Append the object as a JSON string if it's not a File object

                    // form.append(`trip_plans_images`, JSON.stringify(image));
                    planImages.push(image);
                }
            });
            form.append(`images`, JSON.stringify(planImages));
            console.log('trip_plans_images',planImages)
            // Append trip_plans as JSON
            // form.append("trip_plans", JSON.stringify(formDataObject[key]));
        } else {
            form.append(key, formDataObject[key]);
        }
        }

        for (let pair of form.entries()) {
        console.log(pair[0], pair[1]);
        }
        setLoading(true);
        if (packageId && planId) {   
            toast.info("Updating package...");
            // Uncomment to send the form data to your API
            const url = `/api/admin/package/${packageId}/package-trip-plan/${planId}`;
            const res = await axiosClient.patch(url, form, {
            headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Response:", res.data);
            if (res.data.success) {
                toast.info(res.data?.message);
            }
            setLoading(false);   
        } else {
            toast.info("Creating tour plan...");
            // Uncomment to send the form data to your API
            const url = `/api/admin/package/${packageId}/package-trip-plan`;
            const res = await axiosClient.post(url, form, {
            headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Response:", res.data);
            if (res.data.success) {
                toast.info(res.data?.message);
            }
            setLoading(false);   
        }
        
    }

    return (
        <div className='flex flex-col gap-4'>
            <h3 className="text-2xl font-semibold text-[#080613]">
                {planId ? "Edit" : "Add New"} Tour Plan
            </h3>
            <div className="px-4 py-3 bg-[#fffcfb] border border-[#DFDFDF] rounded-lg">
                <form onSubmit={handleSubmit(handleTourPlanSubmit)} className=' flex flex-col gap-3 mb-4'>
                    <div className='flex justify-between'>
                        <h3 className="text-2xl font-medium text-[#4A4C56]">Day Plan</h3>
                    </div>
                    <div className="p-4 bg-[#F0F4F9] rounded-lg flex flex-col gap-3">
                        {/* Trip Title */}
                        <div>
                            <label className="block text-gray-500 text-base font-medium mb-2">
                                Trip Title
                            </label>
                            <input
                                type="text"
                                {...register("title", {
                                    required: "Title is required",
                                })}
                                placeholder="Enter your package title"
                                className="w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-xs mt-1">
                                {errors.title.message}
                                </p>
                            )}
                        </div>

                        {/* Trip Overview */}
                        <div>
                            <label className="block text-gray-500 text-base font-medium mb-2">
                                Trip Overview
                            </label>
                            <input
                                type="text"
                                {...register("description", {
                                    required: "Description is required",
                                })}
                                placeholder="Enter package description"
                                className="w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                            />
                            {errors.description && (
                                <p className="text-red-500 text-xs mt-1">
                                {errors.description.message}
                                </p>
                            )}
                        </div>

                        {/* Upload Images */}
                        <div className="w-full">
                            <h2 className="text-base font-medium text-gray-500 mb-2">
                                Upload Images
                            </h2>
                            <ImageUploader
                                images={images}
                                onImageDrop={(acceptedFiles) =>
                                    handleImageUpdate(acceptedFiles)
                                }
                                onImageDelete={(imageIndex) =>
                                    handleImageDelete(imageIndex)
                                }
                            />
                        </div>
                    </div>
                    {/* {index === tourPlan.length -1 && (

                        <button
                        onClick={addDay}
                        className="px-2 py-[9px] bg-[#EB5B2A] flex items-center gap-1 text-white text-xs w-fit rounded"
                        >
                        <FaPlus className="w-3 h-3" /> Add Another Day
                    </button>
                    )} */}
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                    <Link
                        to="/dashboard/packages"
                        className="border border-[#061D35] px-20 py-3 rounded-full text-base font-normal text-[#4A4C56] hover:bg-[#061D35] hover:text-white"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="border border-[#061D35] px-16 py-3 rounded-full bg-[#061D35] text-base font-semibold text-white hover:bg-white hover:text-[#061D35]"
                    >
                        {loading && planId ? 'Updating...' : loading ? 'Creating...' : `${planId ? "Update" : "Add New"} Tour Plan` }
                        
                    </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default TourPlanForm;
