import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaPlus } from "react-icons/fa";
import uploadIcon from "../../../../assets/dashboard/upload-icon.svg";
import { LuTrash2 } from "react-icons/lu";

const ImageUploader = ({ images, onImageDrop, onImageDelete }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onImageDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    multiple: true,
  });

  return (
    <div>
      {/* Dropzone Area */}
      <div
        {...getRootProps()}
        className={`border border-dashed bg-white flex flex-col items-center rounded-lg py-8 cursor-pointer transition ${
          isDragActive
            ? "bg-purple-900/50 border-purple-600"
            : "border-gray-200"
        }`}
      >
        <img
          src={uploadIcon}
          className="bg-[#F6B49D] p-[10px] rounded-full mb-[6px]"
          alt=""
        />
        <input {...getInputProps()} />
        <p className="text-xs md:text-base text-black rounded-full">
          Drag & Drop or <span className="text-[#EB5B2A]">Choose File</span> to
          upload
        </p>
      </div>

      {/* Image Thumbnails */}
      <div className="mt-4 flex flex-wrap gap-4 justify-start items-start">
        {images?.map((file, idx) => {
          const imageUrl =
            file instanceof File || file instanceof Blob
              ? URL.createObjectURL(file)
              : file.image_url;
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
  const handlePlanChange = (dayIndex, planIndex, field, value) => {
    setTourPlan((prev) => {
      const updatedPlan = [...prev];
      updatedPlan[dayIndex].tripPlan[planIndex][field] = value;
      return updatedPlan;
    });
  };

  const handleImageUpdate = (dayIndex, acceptedFiles) => {
    setTourPlan((prev) => {
      const updatedPlan = [...prev];
      updatedPlan[dayIndex].images = [
        ...(updatedPlan[dayIndex].images || []),
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
      {
        day: prev.length + 1,
        id: null,
        tripPlan: [{ title: "", description: "", time: 0, ticket: "free" }],
        images: [],
      },
    ]);
  };

  const addPlan = (dayIndex) => {
    setTourPlan((prev) => {
      const updatedPlan = [...prev];
      if (updatedPlan[dayIndex]?.tripPlan) {

          updatedPlan[dayIndex].tripPlan = [
            ...updatedPlan[dayIndex].tripPlan,
            {
              title: "",
              description: "",
              time: 0,
              ticket: "free",
            },
          ];
      }else{
        updatedPlan[dayIndex].tripPlan = [
            {
              title: "",
              description: "",
              time: 0,
              ticket: "free",
            },
          ];
      }
      return updatedPlan;
    });
  };

  const deletePlan = (dayIndex, planIndex) => {
    setTourPlan((prev) => {
      const updatedPlan = [...prev];
      if (updatedPlan[dayIndex].tripPlan.length > 1) {
        updatedPlan[dayIndex].tripPlan.splice(planIndex, 1);
      }
      return updatedPlan;
    });
  };

  const deleteDay = (index) => {
    setTourPlan((prev) => {
      const updatedPlan = prev.filter((_, idx) => idx !== index);
      return updatedPlan.map((day, idx) => ({ ...day, day: idx + 1 }));
    });
  };

  return (
    <div>
      <div className="px-4 py-3 bg-[#fffcfb] border border-[#DFDFDF] rounded-lg">
        {tourPlan?.map((dayPlan, dayIndex) => (
          <div
            key={dayIndex}
            className="flex flex-col gap-3 mb-6 p-4 bg-white rounded-lg border border-gray-200"
          >
            <div className="flex justify-between items-center">
              {packageType === "package" && (
                <h3 className="text-2xl font-medium text-[#4A4C56]">
                  Day {dayPlan.day}
                </h3>
              )}
              {/* Delete Day Button */}
              {tourPlan.length > 1 && (
                <button
                  onClick={() => deleteDay(dayIndex)}
                  className="text-red-600 hover:text-red-700 transform duration-300 p-2"
                  title="Delete Day"
                >
                  <LuTrash2 className="text-lg" />
                </button>
              )}
            </div>

            {/* Trip plan fields for each plan in the day */}
            {dayPlan?.tripPlan?.map((plan, planIndex) => (
              <div
                key={planIndex}
                className="p-4 bg-[#F0F4F9] rounded-lg flex flex-col gap-3 relative"
              >
                {dayPlan?.tripPlan?.length > 1 && (
                  <button
                    onClick={() => deletePlan(dayIndex, planIndex)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-700"
                    title="Remove Plan"
                  >
                    <LuTrash2 className="text-md" />
                  </button>
                )}

                <div>
                  <label className="block text-[#4A4C56] text-base font-medium mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={plan.title}
                    onChange={(e) =>
                      handlePlanChange(
                        dayIndex,
                        planIndex,
                        "title",
                        e.target.value
                      )
                    }
                    className="w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                    placeholder="Enter activity title"
                  />
                </div>

                <div>
                  <label className="block text-[#4A4C56] text-base font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    value={plan.description}
                    onChange={(e) =>
                      handlePlanChange(
                        dayIndex,
                        planIndex,
                        "description",
                        e.target.value
                      )
                    }
                    className="w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600 min-h-[100px]"
                    placeholder="Describe this activity"
                  />
                </div>

                <div>
                  <label className="block text-[#4A4C56] text-base font-medium mb-2">
                    Time (minutes)
                  </label>
                  <input
                    type="number"
                    value={plan.time}
                    onChange={(e) =>
                      handlePlanChange(
                        dayIndex,
                        planIndex,
                        "time",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-[#4A4C56] text-base font-medium mb-2">
                    Ticket
                  </label>
                  <select
                    value={plan.ticket}
                    onChange={(e) =>
                      handlePlanChange(
                        dayIndex,
                        planIndex,
                        "ticket",
                        e.target.value
                      )
                    }
                    className="w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                  >
                    <option value="free">Admission Ticket Free</option>
                    <option value="paid">Admission Ticket Paid</option>
                  </select>
                </div>
              </div>
            ))}

            <div className="px-4">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  addPlan(dayIndex);
                }}
                className="px-2 py-[9px] bg-[#EB5B2A] flex items-center gap-1 text-white text-xs w-fit rounded hover:bg-[#d14a20] transition-colors"
              >
                <FaPlus className="w-3 h-3" /> Add Another Plan
              </button>
            </div>

            <div className="p-4 bg-[#F0F4F9] rounded-lg flex flex-col gap-3">
              {/* Upload Images */}
              <div className="w-full">
                <h2 className="text-base font-medium text-[#4A4C56] mb-2">
                  Upload Images
                  {packageType === "package" && (
                    <span> for Day {dayPlan.day}</span>
                  )}
                </h2>
                <ImageUploader
                  images={dayPlan.images}
                  onImageDrop={(acceptedFiles) =>
                    handleImageUpdate(dayIndex, acceptedFiles)
                  }
                  onImageDelete={(imageIndex) =>
                    handleImageDelete(dayIndex, imageIndex)
                  }
                />
              </div>
            </div>
          </div>
        ))}

        {packageType === "package" && (
          <button
            type="button"
            onClick={addDay}
            className="px-2 py-[9px] bg-[#EB5B2A] flex items-center gap-1 text-white text-xs w-fit rounded hover:bg-[#d14a20] transition-colors mt-4"
          >
            <FaPlus className="w-3 h-3" /> Add Another Day
          </button>
        )}
      </div>
    </div>
  );
};

export default TourPlan;