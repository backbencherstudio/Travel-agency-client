import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

const toOption = (id, label) => ({ value: id, label });

export default function AddTravellers({ travellersType, handleTravellers }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
    watch,
  } = useForm();
  const [show, setShow] = useState(false);
  const [options, setOptions] = useState([]);
  const ageValue = watch("age");

  const handleToggleForm = () => setShow(!show);

  const handleSelectChange = (value) => {
    setValue("type", value);
  };

  const onSubmit = (data) => {
    const age = parseInt(data.age, 10);
    if (age >= 12 && travellersType?.adult > 0) {
      data.type = toOption("adult", "Adult");
    } else if (age >= 2 && age <= 11 && travellersType?.child > 0) {
      data.type = toOption("child", "Child");
    } else if (age <= 1 && travellersType?.infant > 0) {
      data.type = toOption("infant", "Infant");
    } else {
      alert("No available slots for the selected traveller type.");
      return;
    }
    handleTravellers(data);
    reset();
  };

  useEffect(() => {
    setOptions((prev) => {
      const opt = [];
      if (travellersType?.adult) {
        opt.push("adult");
      }
      if (travellersType?.child) {
        opt.push("child");
      }
      if (travellersType?.infant) {
        opt.push("infant");
      }

      return opt;
    });
  }, [travellersType]);

  useEffect(()=>{
    console.log("age changed:", ageValue)
  },[ageValue])

  return (
    <div>
      {options.length >= 1 &&<div
        className="text-xl font-medium mb-1"
      >
        Add Travellers
      </div>}
      {options.length >= 1 && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-1">
            <label htmlFor="name" className="block">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Enter name here." })}
              className="px-5 py-3 w-full rounded-lg border border-zinc-300 focus:outline-none focus:border-[#EB5B2A]"
              placeholder="Enter name"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <label htmlFor="age" className="block">
              Age
            </label>
            <input
              type="number"
              id="age"
              {...register("age", { required: "Enter age here." })}
              className="px-5 py-3 w-full rounded-lg border border-zinc-300 focus:outline-none focus:border-[#EB5B2A]"
              placeholder="Enter age"
            />
            {errors.age && <p className="text-red-500">{errors.age.message}</p>}
          </div>
          <div className="space-y-1">
            <label htmlFor="type" className="block">
              Type
            </label>
            <input
              type="text"
              disabled
              value={ageValue >= 12 ? "adult" : ageValue >= 11 ? "child" : "infant"}
              className="px-5 py-3 w-full rounded-lg border border-zinc-300 focus:outline-none focus:border-[#EB5B2A]"
              placeholder="Enter user type"
            />
          </div>
          {errors.type && <p className="text-red-500">{errors.type.message}</p>}
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-[#EB5B2A] text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-300 text-black px-4 py-2 rounded"
              onClick={handleToggleForm}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
