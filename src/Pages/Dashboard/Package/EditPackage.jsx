import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import uploadIcon from "../../../assets/dashboard/upload-icon.svg";
import Select from "react-select";
import TourPlan from "../../../Components/Dashboard/Packages/AddPackage/TourPlan";
import image1 from "../../../assets/img/tour-details/image-1.png";
import image2 from "../../../assets/img/tour-details/image-2.png";
import image3 from "../../../assets/img/tour-details/image-3.png";
import image4 from "../../../assets/img/tour-details/image-4.png";
import axios from "axios";
import axiosClient from "../../../axiosClient";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import EditTourPlan from "../../../Components/Dashboard/Packages/EditPackage/EditTourPlan";

const EditPackage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [isDragging, setIsDragging] = useState(false);
  const [packageName, setPackageName] = useState('');
  const [includedPackages, setIncludedPackages] = useState([]);
  const [excludedPackages, setExcludedPackages] = useState([]);
  const [packageType, setPackageType] = useState("tour");
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [images, setImages] = useState([]);
  const [extraServices, setExtraServices] = useState([]);
  const [serviceIds, setServicesIds] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [travellerTypes, setTravellerTypes] = useState([]);
  const [selectedTravellerTypes, setSelectedTravellerTypes] = useState([]);
  const [tourPlan, setTourPlan] = useState([
      { id: null, day: 1, title: "", description: "", images: [] },
    ]);
  const [loading, setLoading] = useState(false);
  const [selectedDestinations, setSelectedDestinations] = useState([]);

  console.log('selectedTravellerTypes', selectedTravellerTypes)

  const { id } = useParams();
  const editId = id;
//   console.log("editId", editId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resTag = await axiosClient.get("api/admin/tag");
        setTags(
          resTag.data?.data?.map((tag) => ({
            value: tag?.id,
            label: tag?.name,
          }))
        );

        const resCategory = await axiosClient.get("api/admin/category");
        setCategories(
          resCategory.data?.data?.map((cat) => ({
            value: cat?.id,
            label: cat?.name,
          }))
        );

        const resPolicies = await axiosClient.get(
          "api/admin/package-cancellation-policy"
        );
        setPolicies(
          resPolicies.data?.data?.map((cat) => ({
            value: cat?.id,
            label: cat?.policy,
          }))
        );

        const resDestinations = await axiosClient.get("api/admin/destination");
        setDestinations(
          resDestinations.data?.data?.map((cat) => ({
            value: cat?.id,
            label: cat?.name,
          }))
        );

        const resServices = await axiosClient.get("api/admin/extra-service");
        setExtraServices(resServices.data?.data);

        const resLanguages = await axiosClient.get("api/admin/language");
        setLanguages(resLanguages.data?.data);

        const resTravellerTypes = await axiosClient.get("api/admin/traveller-type");
        setTravellerTypes(resTravellerTypes.data?.data);

        if (editId) {
          const resPackage = await axiosClient.get(
            `api/admin/package/${editId}`
          );
          const packageData = resPackage.data.data;
          console.log("packageData", packageData);
          setValue("name", packageData.name);
          setPackageName(packageData.name);
          setValue("description", packageData.description);
          setValue(
            "package_category",
            packageData.package_categories?.map(
              (category) => category?.category?.id
            )
          );
          setPackageType(packageData.type);
          if (packageData.package_destinations) {
            setSelectedDestinations(
              packageData.package_destinations.map(dest => ({ id: dest.destination.id }))
            );
            setValue('destinations', 
              packageData.package_destinations.map(dest => ({ id: dest.destination.id }))
            );
          } else if (packageData.package_destinations) {
            setSelectedDestinations([{ id: packageData.package_destinations.destination.id }]);
            setValue('destinations', [{ id: packageData.package_destinations.destination.id }]);
          }
          if (packageData.package_languages) {
            setSelectedLanguages(
              packageData.package_languages.map(dest => ({ id: dest.language.id }))
            );
            setValue('languages', 
              packageData.package_languages.map(dest => ({ id: dest.language.id }))
            );
          }
          if (packageData.package_traveller_types) {
            setSelectedTravellerTypes(
              packageData.package_traveller_types.map(dest => ({ id: dest.traveller_type.id }))
            );
            setValue('travellerTypes', 
              packageData.package_traveller_types.map(dest => ({ id: dest.traveller_type.id }))
            );
          }
          setValue("price", packageData.price);
          setValue("duration", packageData.duration);
          setValue("duration_type", packageData.duration_type);
          setValue("min_capacity", packageData.min_capacity);
          setValue("max_capacity", packageData.max_capacity);
          // setSelectedPolicy(packageData.cancellation_policy?.id || "");
          setValue("cancellation_policy_id", packageData.cancellation_policy?.id)
          setValue("type", packageData.type);
          setValue("language", packageData.language);
          setImages(packageData.package_files);
          setIncludedPackages(
            packageData.package_tags
              ?.filter((tag) => tag?.type === "included")
              .map((tag) => ({ value: tag?.tag?.id, label: tag?.tag?.name }))
          );
          setExcludedPackages(
            packageData.package_tags
              ?.filter((tag) => tag?.type === "excluded")
              .map((tag) => ({ value: tag?.tag?.id, label: tag?.tag?.name }))
          );
          setServicesIds(
            packageData.package_extra_services?.map((service) => ({
              id: service.extra_service?.id, // Extract `id` and wrap it in an object
            }))
          )
          if (packageData.package_trip_plans && packageData.package_trip_plans.length > 0) {
            setTourPlan(
              packageData.package_trip_plans?.map((plan, index) => ({
                id: plan?.id,
                day: index + 1,
                title: plan?.title || "",
                description: plan?.description || "",
                images: plan?.package_trip_plan_images?.map((img) => img),
              }))
            );
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [editId]);

  console.log('service ids', serviceIds)
  // console.log('tags', tags)
  // console.log('categories', categories)

  console.log("selectedDestinations", selectedDestinations);
  // console.log('includedPackages', includedPackages)
  console.log("policies", policies);
  console.log("images", images);

  const imageGalleries = [
    { image: image1 },
    { image: image2 },
    { image: image3 },
    { image: image4 },
  ];
  console.log("imageGalleries", imageGalleries);
  const packageOptions = [
    { value: "flight", label: "Flight Ticket & Cab Transportation" },
    { value: "meals", label: "Breakfast, Lunch & Dinner" },
    { value: "hotel", label: "Hotel Accommodation" },
    { value: "sight", label: "Sight-Seeing" },
    { value: "cityTour", label: "City Tour" },
    { value: "customDuty", label: "Custom Duty" },
  ];

  const onImageDrop = (acceptedFiles) => {
    // Count existing images and videos
    const existingVideos = images.filter(file => file.type === 'video' || file?.video_url).length;
    const existingImages = images.filter(file => file.type !== 'video' && !file?.video_url).length;

    // First, separate videos and images
    const videoFiles = [];
    const imageFiles = [];
    
    // Categorize new files
    acceptedFiles.forEach(file => {
      if (file.type.startsWith('video/')) {
        videoFiles.push(file);
      } else {
        imageFiles.push(file);
      }
    });

    // Check limits
    if (existingVideos + videoFiles.length > 2) {
      toast.error('Maximum 2 videos allowed');
      return;
    }

    if (existingImages + imageFiles.length > 10) {
      toast.error('Maximum 10 images allowed');
      return;
    }

    // Process accepted files
    const newFiles = [...videoFiles, ...imageFiles].map(file => {
      const isVideo = file.type.startsWith('video/');
      return {
        file,
        preview: isVideo ? null : URL.createObjectURL(file),
        type: isVideo ? 'video' : 'image',
      };
    });

    if (newFiles.length > 0) {
      setImages(prev => [...prev, ...newFiles]);
    }
    setIsDragging(false);
  };

  const imageDropzone = useDropzone({
    onDrop: onImageDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png"], "video/*": [".mp4", ".avi", ".mov"] },
    multiple: true,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  const handleDeleteImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    // Count images and videos
    const videoCount = images.filter(file => file.type === 'video' || file?.video_url).length;
    const imageCount = images.filter(file => file.type !== 'video' && !file?.video_url).length;

    // Validate minimum requirements
    // if (videoCount < 1) {
    //   toast.error('Please upload at least 1 video');
    //   return;
    // }
    // if (imageCount < 3) {
    //   toast.error('Please upload at least 3 images');
    //   return;
    // }
    const formDataObject = {
      ...data,
      includedPackages,
      excludedPackages,
      serviceIds,
      package_images: images.map((image) => (image.file ? image.file : image)),
      destinations: selectedDestinations,
    };

    const package_images = [];
    const imagesArray = [];

    // for(tourPlan) {
    //     tourPlan.images.map(tripImage => (
    //         imagesArray.push(tripImage);
    //     ))
    // }
    for (const image in images) {
      package_images.push(image);
    }

    const form = new FormData();
    for (let key in formDataObject) {
      if (key === "tourPlan") {
        // handle trip_plans_images
        const trip_plans_images = [];
        formDataObject[key].forEach((tripPlan, index) => {
          tripPlan.images.forEach((image) => {
            if (image instanceof File) {
              // Append the file directly if it's a File object
              form.append(`trip_plans_images`, image);
            } else {
              // Append the object as a JSON string if it's not a File object

              // form.append(`trip_plans_images`, JSON.stringify(image));
              trip_plans_images.push(image);
            }
          });
        });
        form.append(`trip_plans_images`, JSON.stringify(trip_plans_images));
        console.log('trip_plans_images', trip_plans_images)
        // Append trip_plans as JSON
        form.append("trip_plans", JSON.stringify(formDataObject[key]));
      } else if (key === "package_images") {
        const package_files = [];
        formDataObject[key].forEach((image) => {
          if (image instanceof File) {
            // Append the file directly if it's a File object
            form.append("package_files", image);
          } else {
            // const package_images = [];
            // const imagesArray = [];
            // for(tourPlan) {
            //     tourPlan.images.map(tripImage => (
            //         imagesArray.push(tripImage);
            //     ))
            // }
            // for (const img in image) {
            package_files.push(image);
            // }
          }
        });
        console.log("result", package_images);

        form.append("package_images", JSON.stringify(package_images));
      } else if (key === "includedPackages" || key === "excludedPackages") {
        const packages = formDataObject[key].map((item) => ({
          id: item.value,
        }));
        form.append(
          key === "includedPackages"
            ? "included_packages"
            : "excluded_packages",
          JSON.stringify(packages)
        );
      } else if (key === "serviceIds") {
        form.append("extra_services", JSON.stringify(serviceIds));
      } else if (key === "destinations") {
        form.append("destinations", JSON.stringify(selectedDestinations));
      } else if (key === "languages") {
        form.append("languages", JSON.stringify(selectedLanguages));
      } else if (key === "travellerTypes") {
        form.append("traveller_types", JSON.stringify(selectedTravellerTypes));
      } else {
        form.append(key, formDataObject[key]);
      }
    }

    for (let pair of form.entries()) {
      console.log(pair[0], pair[1]);
    }
    setLoading(true);
    if (editId) {
        toast.info("Updating package...");
        // Uncomment to send the form data to your API
        const url = `${import.meta.env.VITE_API_BASE_URL}/api/admin/package/${editId}`;
        // const url = `http://192.168.10.159:4000/api/admin/package/${editId}`;
        const res = await axiosClient.patch(url, form, {
        headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Response:", res.data);
        if (res.data.success) {
            toast.info("Package updated successfully!");
        }
        setLoading(false);
    }
  };

  const handleIncludedPackagesChange = (selected) => {
    setIncludedPackages(selected || []); // Store the selected objects in state
  };

  const handleExcludedPackagesChange = (selected) => {
    setExcludedPackages(selected || []); // Store the selected objects in state
  };

  console.log("includedPackages", includedPackages);

  const handleExtraServices = (serviceId, isChecked) => {
    console.log('serviceId', serviceId)
    console.log('isChecked', isChecked)
    if (isChecked) {
      // Add the service ID as an object if checked
      setServicesIds((prev) => [...prev, { id: serviceId }]);
    } else {
      // Remove the service ID object if unchecked
      setServicesIds((prev) => prev.filter((service) => service.id !== serviceId));
    }
  };

  const handleDestinationChange = (selected) => {
    if (Array.isArray(selected)) {
      // For multiple selections (package type)
      setSelectedDestinations(selected.map(item => ({ id: item.value })));
      setValue('destinations', selected.map(item => ({ id: item.value })));
    } else if (selected) {
      // For single selection (tour/cruise type)
      setSelectedDestinations([{ id: selected.value }]);
      setValue('destinations', [{ id: selected.value }]);
    } else {
      // Handle clearing the selection
      setSelectedDestinations([]);
      setValue('destinations', []);
    }
  };

  const handleLanguageChange = (selected) => {
    if (Array.isArray(selected)) {
      setSelectedLanguages(selected.map(item => ({ id: item.value })));
      setValue('languages', selected.map(item => ({ id: item.value })));
    } else if (selected) {
      setSelectedLanguages([{ id: selected.value }]);
      setValue('languages', [{ id: selected.value }]);
    } else {
      setSelectedLanguages([]);
      setValue('languages', []);
    }
  };

  const handleTravellerTypesChange = (selected) => {
    if (Array.isArray(selected)) {
      setSelectedTravellerTypes(selected.map(item => ({ id: item.value })));
      setValue('travellerTypes', selected.map(item => ({ id: item.value })));
    } else if (selected) {
      setSelectedTravellerTypes([{ id: selected.value }]);
      setValue('travellerTypes', [{ id: selected.value }]);
    } else {
      setSelectedTravellerTypes([]);
      setValue('travellerTypes', []);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-semibold text-[#080613]">
        {editId ? "Edit" : "Add New"} Travel Package
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="bg-white min-h-screen pt-8 px-6 pb-6 rounded-lg flex flex-col gap-4">
          <div className="md:grid md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-8 col-span-2 ">
              <h3 className="text-2xl font-semibold text-[#080613]">
                Package Details
              </h3>
              {/* Package Name */}
              <div>
                <label className="block text-gray-500 text-base font-medium mb-2">
                  Package Title
                </label>
                <input
                  type="text"
                  placeholder="Enter your package title"
                  {...register("name", {
                    required: "Package name is required",
                  })}
                  className="w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Package Description */}
              <div>
                <label className="block text-gray-500 text-base font-medium mb-2">
                  Package Description
                </label>
                <textarea
                  placeholder="Enter package description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Image Upload Section */}
              <div className="w-full">
                <h2 className="text-base font-medium text-gray-500 mb-2">
                  Upload Images
                </h2>
                <div
                  {...imageDropzone.getRootProps()}
                  className={`border border-dashed flex flex-col items-center rounded-lg py-8 cursor-pointer transition ${
                    isDragging
                      ? "bg-purple-900/50 border-purple-600"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={uploadIcon}
                    className="bg-[#EB5B2A] p-[10px] rounded-full mb-[6px]"
                    alt=""
                  />
                  <input {...imageDropzone.getInputProps()} />
                  <p className="text-xs md:text-base text-black rounded-full">
                    Drag & Drop or{" "}
                    <span className="text-[#EB5B2A]">Choose File</span> to
                    upload
                  </p>
                  <p className="mt-1 text-xs md:text-base text-gray-400 text-center">
                    Supported formats : jpeg, png, mp4, avi, mov
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-4 justify-start items-start">
                  {images.map((file, index) => (
                    <div key={index} className="relative">
                      {file.type === 'video' || file?.video_url ? (
                        <div 
                          className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer"
                          onClick={() => window.open(file.video_url || URL.createObjectURL(file.file), '_blank')}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                      ) : (
                        <img
                          src={file.preview || file?.file_url}
                          alt={file.preview || file?.fileurl}
                          className="w-16 h-16 object-cover rounded-lg cursor-pointer"
                          onClick={() => window.open(file.preview || file?.file_url, '_blank')}
                        />
                      )}
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
              <div className={`${packageType === "tour" ? "hidden" : "block"}`}>
                <label className="block text-gray-500 text-base font-medium mb-2">
                  Included Package
                </label>
                <Select
                  options={tags} // Tags are now in { value: id, label: name } format
                  isMulti
                  value={includedPackages} // This will be an array of objects in { value, label } format
                  onChange={handleIncludedPackagesChange}
                  placeholder="Select included items"
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>

              {/* Excluded Packages */}
              <div className={`${packageType === "tour" ? "hidden" : "block"}`}>
                <label className="block text-gray-500 text-base font-medium mb-2">
                  Excluded Package
                </label>
                <Select
                  options={tags} // Tags are now in { value: id, label: name } format
                  isMulti
                  value={excludedPackages} // This will be an array of objects in { value, label } format
                  onChange={handleExcludedPackagesChange}
                  placeholder="Select excluded items"
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>
            
            {/* <div className="flex flex-col md:flex-row justify-between items-end gap-4"> */}
                <div className="flex flex-col md:flex-row justify-center  md:items-end gap-4 h-full">
                    <Link
                    to="/dashboard/packages"
                    className="border border-[#061D35] px-8 xl:px-20 py-3 rounded-full text-base font-normal text-center text-[#4A4C56] hover:bg-[#061D35] hover:text-white"
                    >
                    Cancel
                    </Link>
                    <button
                    type="submit"
                    className="border border-[#061D35] px-8 xl:px-16 py-3 rounded-full bg-[#061D35] text-base font-semibold text-white hover:bg-white hover:text-[#061D35]"
                    >
                        {loading && editId ? 'Updating...' : loading ? 'Creating...' : `${editId ? "Update" : "Add New"} Package` }
                    
                    </button>
                </div>
                {/* <Link to={`/dashboard/edit-package/${packageName}/tour-plan/${editId}`} className="border border-[#061D35] px-16 py-3 rounded-full bg-[#061D35] text-base font-semibold text-white hover:bg-white hover:text-[#061D35]">
                    Edit Trip Plans
                </Link> */}
            {/* </div> */}
            </div>
            <div className="p-4 bg-[#FDEFEA] rounded-2xl h-fit mt-4 md:mt-0">
              <div className="flex flex-col gap-4 col-span-2">
                <div>
                  <label className="block text-gray-500 text-base font-medium mb-4">
                    Package Type
                  </label>
                  <select
                    placeholder="Select Package Type"
                    {...register("type", { required: "Type is required" })}
                    className="text-base text-[#C9C9C9] w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                    value={packageType}
                    onChange={(e) => setPackageType(e.target.value)}
                  >
                    <option value="" className="text-base text-[#C9C9C9]">
                      Select Package Type
                    </option>
                    <option value="tour">Tour</option>
                    <option value="cruise">Cruise</option>
                    <option value="package">Package</option>
                  </select>
                  {errors.type && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.type.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-500 text-base font-medium mb-4">
                    Package/Tour Category
                  </label>
                  <select
                    type="text"
                    placeholder="Select a package"
                    {...register("package_category", {
                      required: "Package/Tour category is required",
                    })}
                    className="text-base text-[#C9C9C9] w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                  >
                    <option value="" className="text-base text-[#C9C9C9]">
                      Select a package
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option> // Ensure a return for each <option>
                    ))}
                  </select>
                  {errors.package_category && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.package_category.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-500 text-base font-medium mb-4">
                    Destination{packageType === 'package' ? 's' : ''}
                  </label>
                  {packageType === 'package' ? (
                    <Select
                      isMulti
                      options={destinations}
                      value={destinations.filter(option => 
                        selectedDestinations.some(dest => dest.id === option.value)
                      )}
                      onChange={handleDestinationChange}
                      placeholder="Select destinations"
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  ) : (
                    <Select
                      options={destinations}
                      value={destinations.find(option => 
                        selectedDestinations[0]?.id === option.value
                      )}
                      onChange={handleDestinationChange}
                      placeholder="Select a destination"
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  )}
                  {errors.destinations && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.destinations.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-500 text-base font-medium mb-4">
                    Traveller Type
                  </label>
                  <Select
                    isMulti
                    options={travellerTypes?.map(type => ({
                      value: type.id,
                      label: type.type
                    }))}
                    value={travellerTypes
                      ?.filter(type => selectedTravellerTypes?.some(sel => sel.id === type.id))
                      .map(type => ({
                        value: type.id,
                        label: type.type
                      }))}
                    onChange={handleTravellerTypesChange}
                    placeholder="Select traveller types"
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 text-base font-medium mb-4">
                    Package Price ($)
                  </label>
                  <input
                    type="number"
                    placeholder="Start Price :"
                    {...register("price", { required: "Price is required" })}
                    className="w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.price.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col 2xl:flex-row gap-4">
                  <div>
                    <label className="block text-gray-500 text-base font-medium mb-4">
                      Package Duration <span className="text-xs">(Days/Hours)</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Write duration"
                      {...register("duration", {
                        required: "Package duration is required",
                      })}
                      className="text-base text-[#C9C9C9] w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                    />
                    {errors.duration && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.duration.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-500 text-base font-medium mb-4">
                      Duration Type
                    </label>
                    <select
                      placeholder="Select Package Type"
                      {...register("duration_type", { required: "Duration Type is required" })}
                      className="text-base text-[#C9C9C9] w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                    >
                      <option value="" className="text-base text-[#C9C9C9]">
                        Select Duration Type
                      </option>
                      <option value="days">Days</option>
                      <option value="hours">Hours</option>
                    </select>
                    {errors.duration_type && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.duration_type.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-500 text-base font-medium mb-4">
                    Min. Capacity
                  </label>
                  <select
                    placeholder="Select min capacity"
                    {...register("min_capacity", {
                      required: "Min. capacity is required",
                    })}
                    className="text-base text-[#C9C9C9] w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                  >
                    <option value="" className="text-base text-[#C9C9C9]">
                      Select min. capacity
                    </option>
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
                    <p className="text-red-500 text-xs mt-1">
                      {errors.min_capacity.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-500 text-base font-medium mb-4">
                    Max. Capacity
                  </label>
                  <select
                    placeholder="Select max. capacity"
                    {...register("max_capacity", {
                      required: "Max. capacity is required",
                    })}
                    className="text-base text-[#C9C9C9] w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                  >
                    <option value="" className="text-base text-[#C9C9C9]">
                      Select max. capacity
                    </option>
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
                    <p className="text-red-500 text-xs mt-1">
                      {errors.max_capacity.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-500 text-base font-medium mb-4">
                    Cancellation Policy
                  </label>
                  <select
                    type="text"
                    placeholder="Enter cancellation policy"
                    {...register("cancellation_policy_id")}
                    className="text-base text-[#C9C9C9] w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                    // defaultChecked={selectedPolicy ? selectedPolicy : ''}
                  >
                    <option value="" className="text-base text-[#C9C9C9]">
                      Select a policy
                    </option>
                    {policies.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option> // Ensure a return for each <option>
                    ))}
                  </select>
                  {/* {errors.cancelation_policy && (
                                        <p className="text-red-500 text-xs mt-1">{errors.cancelation_policy.message}</p>
                                    )} */}
                </div>
                <div>
                  <ul class="flex flex-col gap-2 max-w-full mx-auto text-base text-[#C9C9C9] w-full p-4 rounded-md border border-gray-200 bg-white">
                    <li>
                        <details class="group">
                            <summary
                                class="flex items-center justify-between gap-2 font-medium marker:content-none hover:cursor-pointer">
                                <span class="flex gap-2 text-gray-500 text-base font-medium">
                                    Extra Service
                                </span>
                                <svg class="w-4 h-4 text-gray-500 transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg"
                                    width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                                    </path>
                                </svg>
                            </summary>
                            <article class="">
                                <ul class="flex flex-col gap-4 mt-4">
                                  {extraServices?.map(service => 
                                    <li class="flex gap-2" key={service.id}>
                                      <input
                                        type="checkbox"
                                        value={service.id}
                                        checked={serviceIds.some((s) => s.id === service?.id)}
                                        onClick={(e) => handleExtraServices(service.id, e.target.checked)}
                                        className="w-4 text-[#49556D]"
                                      />
                                      <p className="text-base text-[#49556D]">{service.name}</p>
                                    </li>
                                  )}
                                </ul>
                            </article>
                        </details>
                    </li>
                  </ul>
                </div>
                <div>
                <label className="block text-gray-500 text-base font-medium mb-4">
                    Language
                  </label>
                  <Select
                    isMulti
                    options={languages.map(lang => ({
                      value: lang.id,
                      label: lang.name
                    }))}
                    value={languages
                      .filter(lang => selectedLanguages.some(sel => sel.id === lang.id))
                      .map(lang => ({
                        value: lang.id,
                        label: lang.name
                      }))}
                    onChange={handleLanguageChange}
                    placeholder="Select language"
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                  {/* {errors.language && (
                          <p className="text-red-500 text-xs mt-1">{errors.language.message}</p>
                      )} */}
                </div>
                <div>
                  <label className="block text-gray-500 text-base font-medium mb-4">
                    Image Gallery
                  </label>
                  <div className="grid grid-cols-2 gap-3">
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
          {/* Tour Plan Section */}
          <div className="flex flex-col gap-4 mt-4">
            <h3 className="text-2xl font-semibold text-[#080613]">
                Tour Plan
            </h3>
            <EditTourPlan package_id={editId} tourPlan={tourPlan} setTourPlan={setTourPlan} packageType={packageType} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPackage;
