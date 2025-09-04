import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import uploadIcon from "../../../assets/dashboard/upload-icon.svg";
import Select from "react-select";
import image1 from "../../../assets/img/tour-details/image-1.png";
import image2 from "../../../assets/img/tour-details/image-2.png";
import image3 from "../../../assets/img/tour-details/image-3.png";
import image4 from "../../../assets/img/tour-details/image-4.png";
import axiosClient from "../../../axiosClient";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import EditTourPlan from "../../../Components/Dashboard/Packages/EditPackage/EditTourPlan";

const toOption = (id, label) => ({ value: id, label });
const getSelectedOptions = (options, selectedIds) =>
  options.filter(o => selectedIds.some(s => s.id === o.value));

const EditPackage = () => {
  const { id } = useParams();
  const editId = id;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    resetField,
  } = useForm();

  const [isDragging, setIsDragging] = useState(false);
  const [packageType, setPackageType] = useState("tour");

  // reference data
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [travellerTypes, setTravellerTypes] = useState([]);
  const [extraServices, setExtraServices] = useState([]);

  // selections
  const [includedPackages, setIncludedPackages] = useState([]);
  const [excludedPackages, setExcludedPackages] = useState([]);
  const [selectedDestinations, setSelectedDestinations] = useState([]); // [{id}]
  const [selectedLanguages, setSelectedLanguages] = useState([]);       // [{id}]
  const [selectedTravellerTypes, setSelectedTravellerTypes] = useState([]); // [{id}]
  const [serviceIds, setServicesIds] = useState([]); // number[] (IDs only)

  // media + tour plan
  const [images, setImages] = useState([]); // mix of {id, file_url|video_url} or {file, preview, type}
  const [tourPlan, setTourPlan] = useState([
    { id: null, day: 1, title: "", description: "", images: [] },
  ]);

  const [loading, setLoading] = useState(false);
  const previewsRef = useRef(new Set());

  /** -------- Fetch reference + edit data -------- */
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [
          resTag,
          resCategory,
          resPolicies,
          resDestinations,
          resServices,
          resLanguages,
          resTravellerTypes,
          resPackage,
        ] = await Promise.all([
          axiosClient.get("api/admin/tag"),
          axiosClient.get("api/admin/category"),
          axiosClient.get("api/admin/package-cancellation-policy"),
          axiosClient.get("api/admin/destination"),
          axiosClient.get("api/admin/extra-service"),
          axiosClient.get("api/admin/language"),
          axiosClient.get("api/admin/traveller-type"),
          editId ? axiosClient.get(`api/admin/package/${editId}`) : Promise.resolve({ data: { data: null } }),
        ]);

        if (!mounted) return;

        // options
        setTags((resTag.data?.data || []).map(t => toOption(t.id, t.name)));
        setCategories((resCategory.data?.data || []).map(c => toOption(c.id, c.name)));
        setPolicies((resPolicies.data?.data || []).map(p => toOption(p.id, p.policy)));
        setDestinations((resDestinations.data?.data || []).map(d => toOption(d.id, d.name)));
        setExtraServices(resServices.data?.data || []);
        setLanguages(resLanguages.data?.data || []);
        setTravellerTypes(resTravellerTypes.data?.data || []);

        // prefill for edit
        const pkg = resPackage.data?.data;
        if (pkg) {
          setValue("name", pkg.name || "");
          setValue("description", pkg.description || "");
          setValue("price", pkg.price ?? "");
          setValue("duration", pkg.duration ?? "");
          setValue("duration_type", pkg.duration_type || "");
          setValue("min_capacity", pkg.min_capacity ?? "");
          setValue("max_capacity", pkg.max_capacity ?? "");
          setValue("cancellation_policy_id", pkg.cancellation_policy?.id || "");
          setValue("type", pkg.type || "");
          setPackageType(pkg.type || "tour");

          // categories (assuming single category id; if array needed, adapt)
          if (pkg.package_categories?.length) {
            // choose first category id
            const firstCat = pkg.package_categories[0]?.category?.id;
            if (firstCat) setValue("package_category", firstCat);
          }

          // destinations
          if (pkg.package_destinations?.length) {
            const dest = pkg.package_destinations.map(d => ({ id: d.destination.id }));
            setSelectedDestinations(dest);
            setValue("destinations", dest);
          }

          // languages
          if (pkg.package_languages?.length) {
            const langs = pkg.package_languages.map(l => ({ id: l.language.id }));
            setSelectedLanguages(langs);
            setValue("languages", langs);
          }

          // traveller types
          if (pkg.package_traveller_types?.length) {
            const tts = pkg.package_traveller_types.map(t => ({ id: t.traveller_type.id }));
            setSelectedTravellerTypes(tts);
            setValue("travellerTypes", tts);
          }

          // services as IDs
          if (pkg.package_extra_services?.length) {
            const svcIds = pkg.package_extra_services.map(s => s.extra_service?.id).filter(Boolean);
            setServicesIds(svcIds);
          }

          // files already in server
          setImages(pkg.package_files || []);

          // trip plans
          if (pkg.package_trip_plans?.length) {
            setTourPlan(
              pkg.package_trip_plans.map((plan, idx) => ({
                id: plan.id,
                day: idx + 1,
                title: plan.title || "",
                description: plan.description || "",
                images: plan.package_trip_plan_images?.map(img => img) || [],
              }))
            );
          }

          // tags
          if (pkg.package_tags?.length) {
            setIncludedPackages(
              pkg.package_tags
                .filter(t => t.type === "included")
                .map(t => toOption(t.tag.id, t.tag.name))
            );
            setExcludedPackages(
              pkg.package_tags
                .filter(t => t.type === "excluded")
                .map(t => toOption(t.tag.id, t.tag.name))
            );
          }
        }
      } catch (e) {
        console.error(e);
        toast.error("Failed to load package data.");
      }
    })();

    return () => {
      mounted = false;
      previewsRef.current.forEach(url => URL.revokeObjectURL(url));
      previewsRef.current.clear();
    };
  }, [editId, setValue]);

  /** -------- Dropzone -------- */
  const onImageDrop = (acceptedFiles) => {
    // current caps
    const existingVideos = images.filter(i => i.type === "video" || i?.video_url).length;
    const existingImages = images.filter(i => i.type !== "video" && !i?.video_url).length;

    const videoFiles = [];
    const imageFiles = [];
    acceptedFiles.forEach(file => {
      if (file.type.startsWith("video/")) videoFiles.push(file);
      else imageFiles.push(file);
    });

    if (existingVideos + videoFiles.length > 2) {
      toast.error("Maximum 2 videos allowed");
      return;
    }
    if (existingImages + imageFiles.length > 10) {
      toast.error("Maximum 10 images allowed");
      return;
    }

    const next = [...videoFiles, ...imageFiles].map(file => {
      const isVideo = file.type.startsWith("video/");
      const preview = isVideo ? null : URL.createObjectURL(file);
      if (preview) previewsRef.current.add(preview);
      return { file, preview, type: isVideo ? "video" : "image" };
    });
    if (next.length) setImages(prev => [...prev, ...next]);
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

  /** -------- Options (memo) -------- */
  const destinationOptions = useMemo(() => destinations, [destinations]);
  const categoryOptions = useMemo(() => categories, [categories]);
  const policyOptions = useMemo(() => policies, [policies]);
  const languageOptions = useMemo(
    () => languages.map(l => toOption(l.id, l.name)),
    [languages]
  );
  const travellerTypeOptions = useMemo(
    () => travellerTypes.map(t => toOption(t.id, t.type)),
    [travellerTypes]
  );

  /** -------- Select handlers -------- */
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

  const handleTravellerTypesChange = (selected) => {
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

  /** -------- Submit (PATCH edit) -------- */
  const onSubmit = async (data) => {
    // media minimums are relaxed in edit; keep only caps via dropzone

    const form = new FormData();

    // primitives
    form.append("name", data.name ?? "");
    form.append("description", data.description ?? "");
    if (data.package_category) form.append("package_category", data.package_category);
    if (data.price != null && data.price !== "") form.append("price", String(data.price));
    if (data.duration) form.append("duration", String(data.duration));
    if (data.duration_type) form.append("duration_type", data.duration_type);
    if (data.min_capacity) form.append("min_capacity", String(data.min_capacity));
    if (data.max_capacity) form.append("max_capacity", String(data.max_capacity));
    if (data.type) form.append("type", data.type);
    if (data.cancellation_policy_id) form.append("cancellation_policy_id", data.cancellation_policy_id);

    // relations
    form.append("destinations", JSON.stringify(selectedDestinations));         // [{id}]
    form.append("languages", JSON.stringify(selectedLanguages));               // [{id}]
    form.append("traveller_types", JSON.stringify(selectedTravellerTypes));    // [{id}]
    form.append("extra_services", JSON.stringify(serviceIds.map(id => ({ id })))); // [{id}]

    // tags
    const inc = (includedPackages || []).map(i => ({ id: i.value }));
    const exc = (excludedPackages || []).map(i => ({ id: i.value }));
    form.append("included_packages", JSON.stringify(inc));
    form.append("excluded_packages", JSON.stringify(exc));

    // package media
    const existingPackageImages = [];
    images.forEach(item => {
      if (item.file) {
        form.append("package_files", item.file); // new uploads
      } else if (item.id) {
        existingPackageImages.push({ id: item.id }); // keep existing by id
      }
    });
    form.append("package_images", JSON.stringify(existingPackageImages));

    // trip plans: files + existing refs
    const trip_plans_images_json = [];
    (tourPlan || []).forEach(plan => {
      (plan.images || []).forEach(img => {
        // img may be File, {file}, or existing row with id
        if (img instanceof File || img?.file instanceof File) {
          form.append("trip_plans_images", img.file ? img.file : img);
        } else if (img?.id) {
          trip_plans_images_json.push({ id: img.id });
        } else {
          // fallback for objects carrying urls only
          trip_plans_images_json.push(img);
        }
      });
    });
    form.append("trip_plans_images", JSON.stringify(trip_plans_images_json));
    form.append("trip_plans", JSON.stringify(tourPlan));

    try {
      setLoading(true);
      toast.info("Updating package...");
      const url = `${import.meta.env.VITE_API_BASE_URL}/api/admin/package/${editId}`;
      const res = await axiosClient.patch(url, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data?.success) {
        toast.success("Package updated successfully!");
      } else {
        toast.error(res.data?.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Error updating package");
    } finally {
      setLoading(false);
    }
  };

  /** static gallery */
  const imageGalleries = useMemo(() => ([
    { image: image1 }, { image: image2 }, { image: image3 }, { image: image4 },
  ]), []);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-semibold text-[#080613]">
        {editId ? "Edit" : "Add New"} Travel Package
      </h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white min-h-screen pt-8 px-6 pb-6 rounded-lg flex flex-col gap-4">
          <div className="md:grid md:grid-cols-3 gap-8">
            {/* LEFT */}
            <div className="flex flex-col gap-8 col-span-2">
              <h3 className="text-2xl font-semibold text-[#080613]">Package Details</h3>

              {/* name */}
              <div>
                <label className="block text-gray-500 text-base font-medium mb-2">Package Title</label>
                <input
                  type="text"
                  placeholder="Enter your package title"
                  {...register("name", { required: "Package name is required" })}
                  className="w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                  aria-invalid={!!errors.name}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              {/* description */}
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

              {/* upload */}
              <div className="w-full">
                <h2 className="text-base font-medium text-gray-500 mb-2">Upload Images</h2>
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

                {/* thumbs */}
                <div className="mt-4 flex flex-wrap gap-4">
                  {images.map((file, index) => (
                    <div key={file.id ?? index} className="relative">
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
                          src={file.preview || file?.file_url}
                          alt="preview"
                          className="w-16 h-16 object-cover rounded-lg cursor-pointer"
                          onClick={() => window.open(file.preview || file?.file_url, "_blank")}
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

              {/* tags */}
              <div className={`${packageType === "tour" ? "hidden" : "block"}`}>
                <label className="block text-gray-500 text-base font-medium mb-2">Included Package</label>
                <Select
                  options={tags}
                  isMulti
                  value={includedPackages}
                  onChange={setIncludedPackages}
                  placeholder="Select included items"
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>

              <div className={`${packageType === "tour" ? "hidden" : "block"}`}>
                <label className="block text-gray-500 text-base font-medium mb-2">Excluded Package</label>
                <Select
                  options={tags}
                  isMulti
                  value={excludedPackages}
                  onChange={setExcludedPackages}
                  placeholder="Select excluded items"
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>

              {/* actions (left) */}
              <div className="flex flex-col md:flex-row justify-center md:items-end gap-4 h-full">
                <Link
                  to="/dashboard/packages"
                  className="border border-[#061D35] px-8 xl:px-20 py-3 rounded-full text-base font-normal text-center text-[#4A4C56] hover:bg-[#061D35] hover:text-white"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="border border-[#061D35] px-8 xl:px-16 py-3 rounded-full bg-[#061D35] text-base font-semibold text-white hover:bg-white hover:text-[#061D35]"
                  disabled={loading}
                >
                  {loading ? (editId ? "Updating..." : "Creating...") : (editId ? "Update Package" : "Add New Package")}
                </button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="p-4 bg-[#FDEFEA] rounded-2xl h-fit mt-4 md:mt-0">
              <div className="flex flex-col gap-4">
                {/* type */}
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
                    <option value="cruise">Cruise</option>
                    <option value="package">Package</option>
                  </select>
                  {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>}
                </div>

                {/* category */}
                <div>
                  <label className="block text-gray-500 text-base font-medium mb-4">Package/Tour Category</label>
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

                {/* destinations */}
                <div>
                  <label className="block text-gray-500 text-base font-medium mb-4">
                    Destination{packageType === "package" ? "s" : ""}
                  </label>
                  {packageType === "package" ? (
                    <Select
                      isMulti
                      options={destinationOptions}
                      value={getSelectedOptions(destinationOptions, selectedDestinations)}
                      onChange={handleDestinationChange}
                      placeholder="Select destinations"
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  ) : (
                    <Select
                      options={destinationOptions}
                      value={destinationOptions.find(o => selectedDestinations[0]?.id === o.value) || null}
                      onChange={handleDestinationChange}
                      placeholder="Select a destination"
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  )}
                  {errors.destinations && <p className="text-red-500 text-xs mt-1">{errors.destinations.message}</p>}
                </div>

                {/* traveller types */}
                <div>
                  <label className="block text-gray-500 text-base font-medium mb-4">Traveller Type</label>
                  <Select
                    isMulti
                    options={travellerTypeOptions}
                    value={getSelectedOptions(travellerTypeOptions, selectedTravellerTypes)}
                    onChange={handleTravellerTypesChange}
                    placeholder="Select traveller types"
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>

                {/* price */}
                <div>
                  <label className="block text-gray-500 text-base font-medium mb-4">Package Price ($)</label>
                  <input
                    type="number"
                    placeholder="Start Price :"
                    {...register("price", { required: "Price is required", min: { value: 0, message: "Must be >= 0" }, valueAsNumber: true })}
                    className="w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                    aria-invalid={!!errors.price}
                  />
                  {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                </div>

                {/* duration + type */}
                <div className="flex flex-col 2xl:flex-row gap-4">
                  <div>
                    <label className="block text-gray-500 text-base font-medium mb-4">
                      Package Duration <span className="text-xs">(Days/Hours)</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Write duration"
                      {...register("duration", { required: "Package duration is required" })}
                      className="text-base text-[#333] w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                      aria-invalid={!!errors.duration}
                      min={1}
                    />
                    {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration.message}</p>}
                  </div>
                  <div>
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

                {/* min/max capacity */}
                {/* <div>
                  <label className="block text-gray-500 text-base font-medium mb-4">Min. Capacity</label>
                  <select
                    {...register("min_capacity", { required: "Min. capacity is required" })}
                    className="text-base text-[#333] w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                    aria-invalid={!!errors.min_capacity}
                  >
                    <option value="">Select min. capacity</option>
                    {[1,2,3,4,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                  {errors.min_capacity && <p className="text-red-500 text-xs mt-1">{errors.min_capacity.message}</p>}
                </div>

                <div>
                  <label className="block text-gray-500 text-base font-medium mb-4">Max. Capacity</label>
                  <select
                    {...register("max_capacity", { required: "Max. capacity is required" })}
                    className="text-base text-[#333] w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                    aria-invalid={!!errors.max_capacity}
                  >
                    <option value="">Select max. capacity</option>
                    {[1,2,3,4,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                  {errors.max_capacity && <p className="text-red-500 text-xs mt-1">{errors.max_capacity.message}</p>}
                </div> */}

                {/* policy */}
                <div>
                  <label className="block text-gray-500 text-base font-medium mb-4">Cancellation Policy</label>
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

                {/* extra services */}
                <div>
                  <ul className="flex flex-col gap-2 max-w-full mx-auto text-base w-full p-4 rounded-md border border-gray-200 bg-white">
                    <li>
                      <details className="group">
                        <summary className="flex items-center justify-between gap-2 font-medium hover:cursor-pointer">
                          <span className="flex gap-2 text-gray-500 text-base font-medium">Extra Service</span>
                          <svg className="w-4 h-4 text-gray-500 transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                          </svg>
                        </summary>
                        <article>
                          <ul className="flex flex-col gap-3 mt-4">
                            {extraServices?.map(service => (
                              <li className="flex gap-2 items-center" key={service.id}>
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

                {/* language */}
                <div>
                  <label className="block text-gray-500 text-base font-medium mb-4">Language</label>
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

                {/* static gallery */}
                <div>
                  <label className="block text-gray-500 text-base font-medium mb-4">Image Gallery</label>
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

          {/* Tour Plan Section */}
          <div className="flex flex-col gap-4 mt-4">
            <h3 className="text-2xl font-semibold text-[#080613]">Tour Plan</h3>
            <EditTourPlan
              package_id={editId}
              tourPlan={tourPlan}
              setTourPlan={setTourPlan}
              packageType={packageType}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPackage;