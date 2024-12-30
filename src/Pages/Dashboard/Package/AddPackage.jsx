import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import uploadIcon from '../../../assets/dashboard/upload-icon.svg'
import Select from 'react-select';
import TourPlan from './TourPlan';

const AddPackage = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [isDragging, setIsDragging] = useState({ audio: false, image: false });
    const [includedPackages, setIncludedPackages] = useState([]);
    const [excludedPackages, setExcludedPackages] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);
    const [image, setImage] = useState(null);

    const packageOptions = [
        { value: 'flight', label: 'Flight Ticket & Cab Transportation' },
        { value: 'meals', label: 'Breakfast, Lunch & Dinner' },
        { value: 'hotel', label: 'Hotel Accommodation' },
        { value: 'sight', label: 'Sight-Seeing' },
        { value: 'cityTour', label: 'City Tour' },
        { value: 'customDuty', label: 'Custom Duty' },
    ];

    const onImageDrop = (acceptedFiles) => {
        if (acceptedFiles[0]) {
          setImage(acceptedFiles[0]);
          const mediaUrl = URL.createObjectURL(acceptedFiles[0]);
          setPreviewImage(mediaUrl);
          console.log('Image File:', acceptedFiles[0]);
        }
        setIsDragging({ ...isDragging, image: false });
    };

    const imageDropzone = useDropzone({
        onDrop: onImageDrop,
        accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
        multiple: false,
        onDragEnter: () => setIsDragging({ ...isDragging, image: true }),
        onDragLeave: () => setIsDragging({ ...isDragging, image: false }),
    });

    const onSubmit = (data) => {
        const formData = {
            ...data,
            includedPackages,
            excludedPackages,
            image,
        };
        console.log('Form Data:', formData);
    };

  return (
    <div className='flex flex-col gap-4'>
        <h3 className='text-2xl font-semibold text-[#080613]'>Add New Travel Package</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className='bg-white min-h-screen pt-8 px-6 pb-8 rounded-lg flex flex-col md:grid md:grid-cols-2 gap-6'>
                <div className='flex flex-col gap-8'>
                    <h3 className='text-2xl font-semibold text-[#080613]'>Package Details</h3>
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
                        type="text"
                        placeholder="Enter package description"
                        {...register('description', { required: 'Description is required' })}
                        className="w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                        />
                        {errors.description && (
                        <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="w-full">
                        <h2 className="text-base font-medium text-gray-500 mb-2">Upload Images</h2>
                        <div
                        {...imageDropzone.getRootProps()}
                        className={`border border-dashed flex flex-col items-center rounded-lg py-8 cursor-pointer transition ${
                            isDragging.image ? 'bg-purple-900/50 border-purple-600' : 'border-gray-200'
                        }`}
                        >
                        <img src={uploadIcon} className='bg-[#EB5B2A] p-[10px] rounded-full mb-[6px]' alt="" />
                        <input {...imageDropzone.getInputProps()} />
                        <p className="text-base text-black rounded-full">
                            Drag & Drop or <span className='text-[#EB5B2A]'>Choose File</span> to upload
                        </p>
                        <p className="mt-1 text-sm md:text-base text-gray-400 text-center">Supported formats : jpeg, png</p>
                        {previewImage && <img src={previewImage} alt="" className='w-36 h-36 mt-4 object-cover rounded-lg' /> }
                        </div>
                    </div>

                    {/* Included Packages */}
                    <div>
                        <label className="block text-gray-500 text-base font-medium mb-2">
                            Included Package
                        </label>
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
                        <label className="block text-gray-500 text-base font-medium mb-2">
                            Excluded Package
                        </label>
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
                    {/* tourplan section */}
                    <div className='flex flex-col gap-4'>
                        <h3 className='text-2xl font-semibold text-[#080613]'>Tour Plan</h3>
                        <TourPlan />
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}

export default AddPackage