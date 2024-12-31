import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import uploadIcon from '../../../assets/dashboard/upload-icon.svg';
import Select from 'react-select';
import TourPlan from './TourPlan';
import image1 from '../../../assets/img/tour-details/image-1.png';
import image2 from '../../../assets/img/tour-details/image-2.png';
import image3 from '../../../assets/img/tour-details/image-3.png';
import image4 from '../../../assets/img/tour-details/image-4.png';

const AddPackage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isDragging, setIsDragging] = useState(false);
    const [includedPackages, setIncludedPackages] = useState([]);
    const [excludedPackages, setExcludedPackages] = useState([]);
    const [images, setImages] = useState([]);
    const [tourPlan, setTourPlan] = useState([
        { day: 1, title: '', overview: '', images: [] },
    ]);

    const imageGalleries = [
        { image: image1 },
        { image: image2 },
        { image: image3 },
        { image: image4 },
    ];
    console.log('imageGalleries', imageGalleries)
    const packageOptions = [
        { value: 'flight', label: 'Flight Ticket & Cab Transportation' },
        { value: 'meals', label: 'Breakfast, Lunch & Dinner' },
        { value: 'hotel', label: 'Hotel Accommodation' },
        { value: 'sight', label: 'Sight-Seeing' },
        { value: 'cityTour', label: 'City Tour' },
        { value: 'customDuty', label: 'Custom Duty' },
    ];

    const onImageDrop = (acceptedFiles) => {
        const newImages = acceptedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setImages((prev) => [...prev, ...newImages]);
        setIsDragging(false);
    };

    const imageDropzone = useDropzone({
        onDrop: onImageDrop,
        accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
        multiple: true,
        onDragEnter: () => setIsDragging(true),
        onDragLeave: () => setIsDragging(false),
    });

    const handleDeleteImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const onSubmit = (data) => {
        const formData = {
            ...data,
            includedPackages,
            excludedPackages,
            images: images.map((image) => image.file),
            tourPlan,
        };
        console.log('Form Data:', formData);
    };

    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold text-[#080613]">Add New Travel Package</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className="bg-white min-h-screen pt-8 px-6 pb-8 rounded-lg flex flex-col gap-6">
                    <div className="md:grid md:grid-cols-3 gap-8">
                        <div className="flex flex-col gap-8 col-span-2">
                            <h3 className="text-2xl font-semibold text-[#080613]">Package Details</h3>
                            {/* Package Name */}
                            <div>
                                <label className="block text-gray-500 text-base font-medium mb-2">
                                    Package Title
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your package title"
                                    {...register('packageTitle', { required: 'Package title is required' })}
                                    className="w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                />
                                {errors.packageTitle && (
                                    <p className="text-red-500 text-xs mt-1">{errors.packageTitle.message}</p>
                                )}
                            </div>

                            {/* Package Description */}
                            <div>
                                <label className="block text-gray-500 text-base font-medium mb-2">
                                    Package Description
                                </label>
                                <textarea
                                    placeholder="Enter package description"
                                    {...register('description', { required: 'Description is required' })}
                                    className="w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                                )}
                            </div>

                            {/* Image Upload Section */}
                            <div className="w-full">
                                <h2 className="text-base font-medium text-gray-500 mb-2">Upload Images</h2>
                                <div
                                    {...imageDropzone.getRootProps()}
                                    className={`border border-dashed flex flex-col items-center rounded-lg py-8 cursor-pointer transition ${
                                        isDragging ? 'bg-purple-900/50 border-purple-600' : 'border-gray-200'
                                    }`}
                                >
                                    <img src={uploadIcon} className="bg-[#EB5B2A] p-[10px] rounded-full mb-[6px]" alt="" />
                                    <input {...imageDropzone.getInputProps()} />
                                    <p className="text-base text-black rounded-full">
                                        Drag & Drop or <span className="text-[#EB5B2A]">Choose File</span> to upload
                                    </p>
                                    <p className="mt-1 text-sm md:text-base text-gray-400 text-center">
                                        Supported formats : jpeg, png
                                    </p>
                                </div>
                                <div className="mt-4 flex flex-wrap gap-4 justify-start items-start">
                                    {images.map((image, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={image.preview}
                                                alt=""
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                                onClick={() => handleDeleteImage(index)}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Included Packages */}
                            <div>
                                <label className="block text-gray-500 text-base font-medium mb-2">Included Package</label>
                                <Select
                                    options={packageOptions.slice(0, 3)}
                                    isMulti
                                    value={includedPackages}
                                    onChange={(selected) => setIncludedPackages(selected)}
                                    placeholder="Select included items"
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                />
                            </div>

                            {/* Excluded Packages */}
                            <div>
                                <label className="block text-gray-500 text-base font-medium mb-2">Excluded Package</label>
                                <Select
                                    options={packageOptions.slice(3)}
                                    isMulti
                                    value={excludedPackages}
                                    onChange={(selected) => setExcludedPackages(selected)}
                                    placeholder="Select excluded items"
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                />
                            </div>

                            {/* Tour Plan Section */}
                            <div className="flex flex-col gap-4">
                                <h3 className="text-2xl font-semibold text-[#080613]">Tour Plan</h3>
                                <TourPlan tourPlan={tourPlan} setTourPlan={setTourPlan} />
                            </div>
                        </div>
                        <div className='p-4 bg-[#FDEFEA] rounded-2xl h-fit'>
                            <div className="flex flex-col gap-4 col-span-2">
                                <div>
                                    <label className="block text-gray-500 text-base font-medium mb-4">
                                        Package/Tour Category
                                    </label>
                                    <select
                                        type="text"
                                        placeholder="Select a package"
                                        {...register('packageCategory', { required: 'Package/Tour category is required' })}
                                        className="text-base text-[#C9C9C9] w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                    >
                                        <option value="" className='text-base text-[#C9C9C9]'>Select a package</option>
                                        <option value="family-package">Family Package</option>
                                        <option value="romantic-package">Romantic Package</option>
                                        <option value="group-package">Group Package</option>
                                        <option value="special-package">Special Package</option>
                                    </select>
                                    {errors.packageCategory && (
                                        <p className="text-red-500 text-xs mt-1">{errors.packageCategory.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-500 text-base font-medium mb-4">
                                        Package Price ($)
                                    </label>
                                    <input
                                        type='number'
                                        placeholder="Start Price :"
                                        {...register('packagePrice', { required: 'Price is required' })}
                                        className="w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                    />
                                    {errors.packagePrice && (
                                        <p className="text-red-500 text-xs mt-1">{errors.packagePrice.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-500 text-base font-medium mb-4">
                                        Package Duration (Days)
                                    </label>
                                    <select
                                        placeholder="Select days"
                                        {...register('packageDuration', { required: 'Package duration is required' })}
                                        className="text-base text-[#C9C9C9] w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                    >
                                        <option value="" className='text-base text-[#C9C9C9]'>Select days</option>
                                        <option value="2">2</option>
                                        <option value="4">4</option>
                                        <option value="6">6</option>
                                        <option value="8">8</option>
                                        <option value="10">10</option>
                                    </select>
                                    {errors.packageCategory && (
                                        <p className="text-red-500 text-xs mt-1">{errors.packageCategory.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-500 text-base font-medium mb-4">
                                        Cancellation Policy
                                    </label>
                                    <input
                                        type='text'
                                        placeholder="Enter cancellation policy"
                                        {...register('packagePrice', { required: 'Price is required' })}
                                        className="w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                    />
                                    {errors.packagePrice && (
                                        <p className="text-red-500 text-xs mt-1">{errors.packagePrice.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-500 text-base font-medium mb-4">
                                        Image Gallery
                                    </label>
                                    <div className='grid grid-cols-2 gap-3'>
                                        {imageGalleries.map((gallery, index) => (
                                            <div key={index}>
                                                <img
                                                    src={gallery.image}
                                                    alt=""
                                                    className="w-full h-[120px] rounded-lg"
                                                    />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                        <button className="border border-[#061D35] px-20 py-3 rounded-full text-base font-normal text-[#4A4C56] hover:bg-[#061D35] hover:text-white">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="border border-[#061D35] px-16 py-3 rounded-full bg-[#061D35] text-base font-semibold text-white hover:bg-white hover:text-[#061D35]"
                        >
                            Add New Package
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddPackage;
