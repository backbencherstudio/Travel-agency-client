import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import uploadIcon from '../../../assets/dashboard/upload-icon.svg';
import Select from 'react-select';
import TourPlan from '../../../Components/Dashboard/Packages/AddPackage/TourPlan';
import image1 from '../../../assets/img/tour-details/image-1.png';
import image2 from '../../../assets/img/tour-details/image-2.png';
import image3 from '../../../assets/img/tour-details/image-3.png';
import image4 from '../../../assets/img/tour-details/image-4.png';
import axios from 'axios';
import axiosClient from '../../../axiosClient';

const AddPackage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isDragging, setIsDragging] = useState(false);
    const [includedPackages, setIncludedPackages] = useState([]);
    const [excludedPackages, setExcludedPackages] = useState([]);
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [policies, setPolicies] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [images, setImages] = useState([]);
    const [tourPlan, setTourPlan] = useState([
        { day: 1, title: '', overview: '', images: [] },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resTag = await axiosClient.get('api/admin/tag');
                setTags(resTag.data.data.map(tag => ({ value: tag.id, label: tag.name })));
    
                const resCategory = await axiosClient.get('api/admin/category');
                setCategories(resCategory.data.data.map(cat => ({ value: cat.id, label: cat.name })));

                const resPolicies = await axiosClient.get('api/admin/package-cancellation-policy');
                setPolicies(resPolicies.data.data.map(cat => ({ value: cat.id, label: cat.policy })));

                const resDestinations = await axiosClient.get('api/admin/destination');
                setDestinations(resDestinations.data.data.map(cat => ({ value: cat.id, label: cat.name })));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [])

    // console.log('tags', tags)
    // console.log('categories', categories)

    // console.log('includedPackages', includedPackages)
    console.log('policies', policies)

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

    const onSubmit = async (data) => {
        const formDataObject = {
            ...data,
            includedPackages,
            excludedPackages,
            package_images: images.map((image) => image.file),
            tourPlan,
        };
        const form = new FormData();
        for (let key in formDataObject) {
            if (key === 'tourPlan') {
                // handle trip_plans_images
                formDataObject[key].forEach((tripPlan, index) => {
                    tripPlan.images.forEach((image) => form.append(`trip_plans_images`, image));
                });
                form.append(key, JSON.stringify(formDataObject[key]));
            } else if (key === 'package_images') {
                formDataObject[key].forEach((image) => form.append('package_images', image));
            } else if (key === 'includedPackages' || key === 'excludedPackages') {
                const packages = formDataObject[key].map((item) => ({ id: item.value })); // Transform to desired format
                console.log('packages', packages)
                form.append(key === 'includedPackages' ? 'included_packages' : 'excluded_packages', JSON.stringify(packages));
            } else {
                form.append(key, formDataObject[key]);
            }
        }

        for (let pair of form.entries()) {
            console.log(pair[0], pair[1]);
        }

        // Uncomment to send the form data to your API
        const url = "http://192.168.10.159:4000/api/admin/package";
        const res = await axiosClient.post(url, form, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log('Response:', res.data);
    };

    const handleIncludedPackagesChange = (selected) => {
        setIncludedPackages(selected || []);  // Store the selected objects in state
    };

    const handleExcludedPackagesChange = (selected) => {
        setExcludedPackages(selected || []);  // Store the selected objects in state
    };

    console.log('first', includedPackages)

    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold text-[#080613]">Add New Travel Package</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className="bg-white min-h-screen pt-8 px-6 pb-6 rounded-lg flex flex-col gap-4">
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
                                    {...register('name', { required: 'Package name is required' })}
                                    className="w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
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
                                    <p className="text-xs md:text-base text-black rounded-full">
                                        Drag & Drop or <span className="text-[#EB5B2A]">Choose File</span> to upload
                                    </p>
                                    <p className="mt-1 text-xs md:text-base text-gray-400 text-center">
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
                                    options={tags}  // Tags are now in { value: id, label: name } format
                                    isMulti
                                    value={includedPackages}  // This will be an array of objects in { value, label } format
                                    onChange={handleIncludedPackagesChange}
                                    placeholder="Select included items"
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                />
                            </div>

                            {/* Excluded Packages */}
                            <div>
                                <label className="block text-gray-500 text-base font-medium mb-2">Excluded Package</label>
                                <Select
                                    options={tags}  // Tags are now in { value: id, label: name } format
                                    isMulti
                                    value={excludedPackages}  // This will be an array of objects in { value, label } format
                                    onChange={handleExcludedPackagesChange}
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
                        <div className='p-4 bg-[#FDEFEA] rounded-2xl h-fit mt-4 md:mt-0'>
                            <div className="flex flex-col gap-4 col-span-2">
                                <div>
                                    <label className="block text-gray-500 text-base font-medium mb-4">
                                        Package/Tour Category
                                    </label>
                                    <select
                                        type="text"
                                        placeholder="Select a package"
                                        {...register('package_category', { required: 'Package/Tour category is required' })}
                                        className="text-base text-[#C9C9C9] w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                    >
                                        <option value="" className="text-base text-[#C9C9C9]">Select a package</option>
                                        {categories.map(cat => (
                                            <option key={cat.value} value={cat.value}>{cat.label}</option> // Ensure a return for each <option>
                                        ))}
                                    </select>
                                    {errors.package_category && (
                                        <p className="text-red-500 text-xs mt-1">{errors.package_category.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-500 text-base font-medium mb-4">
                                        Destination
                                    </label>
                                    <select
                                        type="text"
                                        placeholder="Select a destination"
                                        {...register('destination_id', { required: 'Destination is required' })}
                                        className="text-base text-[#C9C9C9] w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                    >
                                        <option value="" className="text-base text-[#C9C9C9]">Select a destination</option>
                                        {destinations.map(cat => (
                                            <option key={cat.value} value={cat.value}>{cat.label}</option> // Ensure a return for each <option>
                                        ))}
                                    </select>
                                    {errors.destination_id && (
                                        <p className="text-red-500 text-xs mt-1">{errors.destination_id.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-500 text-base font-medium mb-4">
                                        Package Price ($)
                                    </label>
                                    <input
                                        type='number'
                                        placeholder="Start Price :"
                                        {...register('price', { required: 'Price is required' })}
                                        className="w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                    />
                                    {errors.price && (
                                        <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-500 text-base font-medium mb-4">
                                        Package Duration (Days)
                                    </label>
                                    <select
                                        placeholder="Select days"
                                        {...register('duration', { required: 'Package duration is required' })}
                                        className="text-base text-[#C9C9C9] w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                    >
                                        <option value="" className='text-base text-[#C9C9C9]'>Select days</option>
                                        <option value="2">2</option>
                                        <option value="4">4</option>
                                        <option value="6">6</option>
                                        <option value="8">8</option>
                                        <option value="10">10</option>
                                    </select>
                                    {errors.duration && (
                                        <p className="text-red-500 text-xs mt-1">{errors.duration.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-500 text-base font-medium mb-4">
                                        Min. Capacity
                                    </label>
                                    <select
                                        placeholder="Select min capacity"
                                        {...register('min_capacity', { required: 'Min. capacity is required' })}
                                        className="text-base text-[#C9C9C9] w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                    >
                                        <option value="" className='text-base text-[#C9C9C9]'>Select min. capacity</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                    {errors.min_capacity && (
                                        <p className="text-red-500 text-xs mt-1">{errors.min_capacity.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-500 text-base font-medium mb-4">
                                        Max. Capacity
                                    </label>
                                    <select
                                        placeholder="Select max. capacity"
                                        {...register('max_capacity', { required: 'Max. capacity is required' })}
                                        className="text-base text-[#C9C9C9] w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                    >
                                        <option value="" className='text-base text-[#C9C9C9]'>Select max. capacity</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                    {errors.max_capacity && (
                                        <p className="text-red-500 text-xs mt-1">{errors.max_capacity.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-500 text-base font-medium mb-4">
                                        Type
                                    </label>
                                    <select
                                        placeholder="Select max. capacity"
                                        {...register('type', { required: 'Type is required' })}
                                        className="text-base text-[#C9C9C9] w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                    >
                                        <option value="" className='text-base text-[#C9C9C9]'>Select Package Type</option>
                                        <option value="tour">Tour</option>
                                        <option value="cruise">Cruise</option>
                                    </select>
                                    {errors.max_capacity && (
                                        <p className="text-red-500 text-xs mt-1">{errors.max_capacity.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-500 text-base font-medium mb-4">
                                        Cancellation Policy
                                    </label>
                                    <select
                                        type="text"
                                        placeholder="Enter cancellation policy"
                                        {...register('cancellation_policy_id')}
                                        className="text-base text-[#C9C9C9] w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                    >
                                        <option value="" className="text-base text-[#C9C9C9]">Select a policy</option>
                                        {policies.map(cat => (
                                            <option key={cat.value} value={cat.value}>{cat.label}</option> // Ensure a return for each <option>
                                        ))}
                                    </select>
                                    {/* {errors.cancelation_policy && (
                                        <p className="text-red-500 text-xs mt-1">{errors.cancelation_policy.message}</p>
                                    )} */}
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
                                                    className="w-full h-[120px] rounded-lg object-cover"
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
