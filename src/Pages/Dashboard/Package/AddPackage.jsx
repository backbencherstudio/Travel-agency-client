import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import uploadIcon from "../../../assets/dashboard/upload-icon.svg";
import Select from "react-select";
import TourPlan from "../../../Components/Dashboard/Packages/AddPackage/TourPlan";
import image1 from "../../../assets/img/tour-details/image-1.png";
import image2 from "../../../assets/img/tour-details/image-2.png";
import image3 from "../../../assets/img/tour-details/image-3.png";
import image4 from "../../../assets/img/tour-details/image-4.png";
import axiosClient from "../../../axiosClient";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { UserServices } from "~/userServices/user.services";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../../../Components/ui/select"

/** Helpers */
const toOption = (id, label) => ({ value: id, label });
const getSelectedOptions = (options, selectedIds) =>
  options.filter(o => selectedIds.some(s => s.id === o.value));

const AddPackage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    resetField,
  } = useForm({
    defaultValues: {
      destinations: [],
      languages: [],
      travellerTypes: [],
      destination_type: "day",
      type: "", // user chooses later
      duration_type: "",
      price: undefined,
      name: "",
      description: "",
      cancellation_policy_id: "",
      package_category: "",
    },
  });

  const [isDragging, setIsDragging] = useState(false);
  const [includedPackages, setIncludedPackages] = useState([]);
  const [excludedPackages, setExcludedPackages] = useState([]);
  const [packageType, setPackageType] = useState("tour");
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [images, setImages] = useState([]);
  const [extraServices, setExtraServices] = useState([]);
  const [serviceIds, setServicesIds] = useState([]); // array<number>
  const [languages, setLanguages] = useState([]);
  const [travellerTypes, setTravellerTypes] = useState([]);
  const [tourPlan, setTourPlan] = useState([
    { id: null, day: 1, title: "", description: "", images: [] },
  ]);
  const [loading, setLoading] = useState(false);

  const [selectedDestinations, setSelectedDestinations] = useState([]); // [{id}]
  const [selectedLanguages, setSelectedLanguages] = useState([]); // [{id}]
  const [selectedTravellerTypes, setSelectedTravellerTypes] = useState([]); // [{id}]
  const [meetingPoints, setMeetingPoints] = useState();

  const previewsRef = useRef(new Set()); // track object URLs to revoke


  const fetchMeetingPlace = async () => {
    try {
      console.clear();
      console.log("Fetching places.")
      const res = await UserServices.getAllPlaces();
      console.log("Meeting places:", res.data);
      setMeetingPoints(res.data); // update state if you need it
    } catch (error) {
      console.error("Failed to fetch meeting places:", error);
    }
  };


  useEffect(() => {
    fetchMeetingPlace()
  }, [])


  /** ----- Fetch all base data once ----- */
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const [
          resTag,
          resCategory,
          resPolicies,
          resDestinations,
          resTravellerTypes,
          resServices,
          resLanguages,
        ] = await Promise.all([
          axiosClient.get("api/admin/tag"),
          axiosClient.get("api/admin/category"),
          axiosClient.get("api/admin/package-cancellation-policy"),
          axiosClient.get("api/admin/destination"),
          axiosClient.get("api/admin/traveller-type"),
          axiosClient.get("api/admin/extra-service"),
          axiosClient.get("api/admin/language"),
        ]);

        if (!isMounted) return;

        setTags((resTag.data?.data || []).map(t => toOption(t.id, t.name)));
        setCategories((resCategory.data?.data || []).map(c => toOption(c.id, c.name)));
        setPolicies((resPolicies.data?.data || []).map(p => toOption(p.id, p.policy)));
        setDestinations((resDestinations.data?.data || []).map(d => toOption(d.id, d.name)));
        setTravellerTypes(resTravellerTypes.data?.data || []);
        setExtraServices(resServices.data?.data || []);
        setLanguages(resLanguages.data?.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load reference data. Please refresh.");
      }
    })();

    return () => {
      isMounted = false;
      // Revoke any remaining previews on unmount
      previewsRef.current.forEach(url => URL.revokeObjectURL(url));
      previewsRef.current.clear();
    };
  }, []);

  /** ----- Dropzone ----- */
  const onImageDrop = (acceptedFiles) => {
    if (!acceptedFiles?.length) return;

    const next = acceptedFiles.map((file) => {
      const isVideo = file.type.startsWith("video/");
      const preview = isVideo ? null : URL.createObjectURL(file);
      if (preview) previewsRef.current.add(preview);
      return { file, preview, type: isVideo ? "video" : "image" };
    });
    setImages(prev => [...prev, ...next]);
    setIsDragging(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onImageDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
      "video/*": [".mp4", ".avi", ".mov"],
    },
    multiple: true,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  const handleDeleteImage = (index) => {
    setImages(prev => {
      const copy = [...prev];
      const item = copy[index];
      if (item?.preview) {
        URL.revokeObjectURL(item.preview);
        previewsRef.current.delete(item.preview);
      }
      copy.splice(index, 1);
      return copy;
    });
  };

  /** ----- Select options (memoized) ----- */
  const destinationOptions = useMemo(() => destinations, [destinations]);
  const tagOptions = useMemo(() => tags, [tags]);
  const categoryOptions = useMemo(() => categories, [categories]);
  const policyOptions = useMemo(() => policies, [policies]);
  const [selectedMeetingPoint,setSelectedMeetingPoint] = useState("");
  const languageOptions = useMemo(
    () => languages.map(l => toOption(l.id, l.name)),
    [languages]
  );
  const travellerTypeOptions = useMemo(
    () => travellerTypes.map(t => toOption(t.id, t.type)),
    [travellerTypes]
  );

  /** ----- Select handlers ----- */
  const handleIncludedPackagesChange = (selected) => setIncludedPackages(selected || []);
  const handleExcludedPackagesChange = (selected) => setExcludedPackages(selected || []);

  const handleDestinationChange = (selected) => {
    if (Array.isArray(selected)) {
      const ids = selected.map(s => ({ id: s.value }));
      setSelectedDestinations(ids);
      setValue("destinations", ids);
    } else if (selected) {
      const ids = [{ id: selected.value }];
      setSelectedDestinations(ids);
      setValue("destinations", ids);
    } else {
      setSelectedDestinations([]);
      setValue("destinations", []);
    }
  };

  const handleLanguageChange = (selected) => {
    if (Array.isArray(selected)) {
      const ids = selected.map(s => ({ id: s.value }));
      setSelectedLanguages(ids);
      setValue("languages", ids);
    } else if (selected) {
      const ids = [{ id: selected.value }];
      setSelectedLanguages(ids);
      setValue("languages", ids);
    } else {
      setSelectedLanguages([]);
      setValue("languages", []);
    }
  };

  const handleTravellerTypeChange = (selected) => {
    if (Array.isArray(selected)) {
      const ids = selected.map(s => ({ id: s.value }));
      setSelectedTravellerTypes(ids);
      setValue("travellerTypes", ids);
    } else if (selected) {
      const ids = [{ id: selected.value }];
      setSelectedTravellerTypes(ids);
      setValue("travellerTypes", ids);
    } else {
      setSelectedTravellerTypes([]);
      setValue("travellerTypes", []);
    }
  };

  const handleExtraServices = (serviceId, isChecked) => {
    setServicesIds(prev =>
      isChecked ? [...new Set([...prev, serviceId])] : prev.filter(id => id !== serviceId)
    );
  };

  /** ----- Submit ----- */
  const onSubmit = async (data) => {
    // Validate media minimums
    const videoCount = images.filter(f => f.type === "video" || f?.video_url).length;
    const imageCount = images.filter(f => f.type !== "video" && !f?.video_url).length;
    // if (videoCount < 1) {
    //   toast.error("Please upload at least 1 video");
    //   return;
    // }
    if (imageCount < 3) {
      toast.error("Please upload at least 3 images");
      return;
    }

    // Build payload
    const form = new FormData();

    // Simple fields
    form.append("name", data.name ?? "");
    form.append("description", data.description ?? "");
    if (data.package_category) form.append("package_category", data.package_category);
    if (data.price != null && data.price !== "")
      form.append("price", String(data.price));
    if (data.duration) form.append("duration", String(data.duration));
    if (data.duration_type) form.append("duration_type", data.duration_type);
    if (data.type) form.append("type", data.type);
    if (data.cancellation_policy_id)
      form.append("cancellation_policy_id", data.cancellation_policy_id);

    // Multi relations (IDs)
    form.append("destinations", JSON.stringify(selectedDestinations)); // [{id}]
    form.append("languages", JSON.stringify(selectedLanguages));       // [{id}]
    form.append("traveller_types", JSON.stringify(selectedTravellerTypes)); // [{id}]
    form.append("extra_services", JSON.stringify(serviceIds.map(id => ({ id })))); // [{id}]

    // Tags (included/excluded)
    const inc = (includedPackages || []).map(i => ({ id: i.value }));
    const exc = (excludedPackages || []).map(i => ({ id: i.value }));
    form.append("included_packages", JSON.stringify(inc));
    form.append("excluded_packages", JSON.stringify(exc));

    // Package images: append new files; send existing URLs separately
    const existingPackageImages = [];
    images.forEach(item => {
      if (item.file) {
        // new upload
        form.append("package_files", item.file);
      } else if (item.image_url || item.video_url) {
        // sent back from server on edit flow
        existingPackageImages.push(item);
      }
    });
    form.append("package_images", JSON.stringify(existingPackageImages)); // [{image_url}|{video_url}]

    // Trip plan: append files + JSON
    // Attach *file* images to `trip_plans_images` and keep non-files in `trip_plans_images_json`
    const trip_plans_images_json = [];
    (tourPlan || []).forEach(plan => {
      (plan.images || []).forEach(img => {
        if (img instanceof File || img?.file instanceof File) {
          form.append("trip_plans_images", img.file ? img.file : img);
        } else {
          // Likely existing object with image_url or id
          trip_plans_images_json.push(img);
        }
      });
    });
    form.append("trip_plans_images", JSON.stringify(trip_plans_images_json));
    form.append("trip_plans", JSON.stringify(tourPlan));

    // Debug (optional)
    // for (let p of form.entries()) console.log(p[0], p[1]);

    try {
      setLoading(true);
      toast.info("Creating package...");

      const url = `${import.meta.env.VITE_API_BASE_URL}/api/admin/package`;
      const res = await axiosClient.post(url, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.success) {
        toast.success("Package created successfully!");
        // Optional: reset fields
        // previews cleanup
        previewsRef.current.forEach(url => URL.revokeObjectURL(url));
        previewsRef.current.clear();
        setImages([]);
        setIncludedPackages([]);
        setExcludedPackages([]);
        setSelectedDestinations([]);
        setSelectedLanguages([]);
        setSelectedTravellerTypes([]);
        setServicesIds([]);
        setTourPlan([{ id: null, day: 1, title: "", description: "", images: [] }]);
        resetField("name"); resetField("description"); resetField("price"); resetField("duration");
        resetField("type"); resetField("duration_type"); resetField("package_category");
        resetField("cancellation_policy_id");
      } else {
        toast.error(res.data?.message || "Failed to create package");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Error creating package");
    } finally {
      setLoading(false);
    }
  };

  /** UI image gallery (static) */
  const imageGalleries = useMemo(() => ([
    { image: image1 },
    { image: image2 },
    { image: image3 },
    { image: image4 },
  ]), []);

  return (
    <div className="flex flex-col gap-4">
      <Helmet>
        <title>Around 360 - Add Package</title>
      </Helmet>

      <h3 className="text-2xl font-semibold text-[#080613]">Add New Travel Package</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white min-h-screen pt-8 px-0 sm:px-6 pb-6 rounded-lg flex flex-col gap-4">
          <div className="md:grid md:grid-cols-3 gap-8 px-2">
            {/* LEFT */}
            <div className="flex flex-col gap-8 col-span-2">
              <h3 className="text-2xl font-semibold text-[#080613]">Package Details</h3>

              {/* Name */}
              <div>
                <label className="block text-gray-500 text-base font-medium mb-2">Tour Title</label>
                <input
                  type="text"
                  placeholder="Enter your package title"
                  {...register("name", { required: "Package name is required" })}
                  className="w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                  aria-invalid={!!errors.name}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-500 text-base font-medium mb-2">Package Description</label>
                <textarea
                  placeholder="Enter package description"
                  {...register("description", { required: "Description is required" })}
                  className="w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                  aria-invalid={!!errors.description}
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
              </div>

              {/* Upload */}
              <div className="w-full">
                <h2 className="text-base font-medium text-gray-500 mb-2">Upload Media</h2>
                <div
                  {...getRootProps()}
                  className={`border border-dashed flex flex-col items-center rounded-lg py-8 cursor-pointer transition ${isDragging ? "bg-purple-900/5 border-purple-600" : "border-gray-200"}`}
                >
                  <img src={uploadIcon} className="bg-[#EB5B2A] p-[10px] rounded-full mb-[6px]" alt="" />
                  <input {...getInputProps()} aria-label="Upload images or videos" />
                  <p className="text-xs md:text-base text-black">
                    Drag & Drop or <span className="text-[#EB5B2A]">Choose File</span> to upload
                  </p>
                  <p className="mt-1 text-xs md:text-base text-gray-400 text-center">
                    Supported: jpeg, png, webp, mp4, avi, mov
                  </p>
                </div>

                {/* Thumbs */}
                <div className="mt-4 flex flex-wrap gap-4">
                  {images.map((file, index) => (
                    <div key={index} className="relative">
                      {file.type === "video" || file?.video_url ? (
                        <div
                          className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer"
                          onClick={() => window.open(file.video_url || URL.createObjectURL(file.file), "_blank")}
                          title="Open video"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                      ) : (
                        <img
                          src={file.preview || file?.image_url}
                          alt="preview"
                          className="w-16 h-16 object-cover rounded-lg cursor-pointer"
                          onClick={() => window.open(file.preview || file?.image_url, "_blank")}
                        />
                      )}
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        onClick={() => handleDeleteImage(index)}
                        aria-label="Remove media"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Included/Excluded tags */}
              <div>
                <label className="block text-gray-500 text-base font-medium mb-2">Included Package</label>
                <Select
                  options={tagOptions}
                  isMulti
                  value={includedPackages}
                  onChange={handleIncludedPackagesChange}
                  placeholder="Select included items"
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>

              <div>
                <label className="block text-gray-500 text-base font-medium mb-2">Excluded Package</label>
                <Select
                  options={tagOptions}
                  isMulti
                  value={excludedPackages}
                  onChange={handleExcludedPackagesChange}
                  placeholder="Select excluded items"
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>

              <div>
                <label className="block text-gray-500 text-base font-medium mb-2">Select A Meeting Point</label>
                <select
                  placeholder="Select a meeting point"
                  className="w-full border p-2 rounded-sm"
                  value={selectedMeetingPoint}
                  onChange={(value)=> setSelectedMeetingPoint(value)}
                >
                  {
                    meetingPoints?.map(item=>(
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))
                  }
                </select>
              </div>

              {/* Trip plan */}
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-semibold text-[#080613]">Trip Plan</h3>
                <TourPlan tourPlan={tourPlan} setTourPlan={setTourPlan} packageType={packageType} />
              </div>
            </div>

            {/* RIGHT */}
            <div className="p-4 bg-[#FDEFEA] rounded-2xl h-fit mt-4 md:mt-0">
              <div className="flex flex-col gap-4">
                {/* Package type (select) */}
                <div>
                  <label className="block text-gray-500 text-base font-medium mb-4">Package Type</label>
                  <select
                    {...register("type", { required: "Type is required" })}
                    className="text-base text-[#333] w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                    value={packageType}
                    onChange={(e) => setPackageType(e.target.value)}
                    aria-invalid={!!errors.type}
                  >
                    <option value="">Select Package Type</option>
                    <option value="tour">Tour</option>
                    <option value="package">Package</option>
                  </select>
                  {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-[#444] text-base font-medium mb-4">Package/Tour Category</label>
                  <select
                    {...register("package_category", { required: "Package/Tour category is required" })}
                    className="text-base text-[#333] w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                    aria-invalid={!!errors.package_category}
                  >
                    <option value="">Select a category</option>
                    {categoryOptions.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                  {errors.package_category && <p className="text-red-500 text-xs mt-1">{errors.package_category.message}</p>}
                </div>

                {/* Destinations */}
                <div>
                  <label className="block text-gray-500 text-base font-medium mb-4">
                    Destination{packageType === "package" ? "s" : ""}
                  </label>
                  <Select
                    isMulti
                    options={destinationOptions}
                    value={getSelectedOptions(destinationOptions, selectedDestinations)}
                    onChange={handleDestinationChange}
                    placeholder="Select destinations"
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                  {errors.destinations && <p className="text-red-500 text-xs mt-1">{errors.destinations.message}</p>}
                </div>

                {/* Traveller Type */}
                <div>
                  <label className="block text-gray-500 text-base font-medium mb-4">Traveller Type</label>
                  <Select
                    isMulti
                    options={travellerTypeOptions}
                    value={getSelectedOptions(travellerTypeOptions, selectedTravellerTypes)}
                    onChange={handleTravellerTypeChange}
                    placeholder="Select traveller type"
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>

                {/* Duration + Type */}
                <div className="flex flex-col 2xl:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-[#444] text-base font-medium mb-4">Package Duration</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="Write duration"
                      {...register("duration", { required: "Package duration is required" })}
                      className="text-base text-[#333] w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                      aria-invalid={!!errors.duration}
                    />
                    {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration.message}</p>}
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-500 text-base font-medium mb-4">Duration Type</label>
                    <select
                      {...register("duration_type", { required: "Duration Type is required" })}
                      className="text-base text-[#333] w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                      aria-invalid={!!errors.duration_type}
                    >
                      <option value="">Select Duration Type</option>
                      <option value="days">Days</option>
                      <option value="hours">Hours</option>
                    </select>
                    {errors.duration_type && <p className="text-red-500 text-xs mt-1">{errors.duration_type.message}</p>}
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <label className="block text-[#444] text-base font-medium">Package Price ($)</label>
                  <input
                    type="number"
                    placeholder="Price"
                    {...register("price", { min: { value: 0, message: "Must be >= 0" }, valueAsNumber: true })}
                    className="w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                    aria-invalid={!!errors.price}
                  />
                  {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                </div>

                {/* Cancellation policy */}
                <div>
                  <label className="block text-[#444] text-base font-medium mb-4">Cancellation Policy</label>
                  <select
                    {...register("cancellation_policy_id")}
                    className="text-base text-[#333] w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                  >
                    <option value="">Select a policy</option>
                    {policyOptions.map(p => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </div>

                {/* Extra Services accordion */}
                <div>
                  <ul className="flex flex-col gap-2 max-w-full mx-auto text-base w-full p-4 rounded-md border border-gray-200 bg-white">
                    <li>
                      <details className="group">
                        <summary className="flex items-center justify-between gap-2 font-medium hover:cursor-pointer">
                          <span className="flex gap-2 text-[#444] text-base font-medium">Extra Service</span>
                          <svg className="w-4 h-4 text-gray-500 transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                          </svg>
                        </summary>
                        <article className="mt-4">
                          <ul className="flex flex-col gap-3">
                            {extraServices?.map(service => (
                              <li className="flex items-center gap-2" key={service.id}>
                                <input
                                  type="checkbox"
                                  checked={serviceIds.includes(service.id)}
                                  onChange={(e) => handleExtraServices(service.id, e.target.checked)}
                                  className="w-4 h-4"
                                  id={`svc-${service.id}`}
                                />
                                <label htmlFor={`svc-${service.id}`} className="text-base text-[#49556D]">
                                  {service.name}
                                </label>
                              </li>
                            ))}
                          </ul>
                        </article>
                      </details>
                    </li>
                  </ul>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-[#444] text-base font-medium mb-4">Language</label>
                  <Select
                    isMulti
                    options={languageOptions}
                    value={getSelectedOptions(languageOptions, selectedLanguages)}
                    onChange={handleLanguageChange}
                    placeholder="Select language"
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>

                {/* Static gallery */}
                <div>
                  <label className="block text-[#444] text-base font-medium mb-4">Image Gallery</label>
                  <div className="grid grid-cols-2 gap-3">
                    {imageGalleries.map((g, i) => (
                      <div key={i}>
                        <img src={g.image} alt="" className="w-full h-[120px] rounded-lg object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Actions */}
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
              disabled={loading}
            >
              {loading ? "Creating..." : "Add New Package"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPackage;
