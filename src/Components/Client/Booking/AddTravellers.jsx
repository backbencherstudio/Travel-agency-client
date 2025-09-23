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
  } = useForm();
  const [show, setShow] = useState(false);
  const [options, setOptions] = useState([]);

  const handleToggleForm = () => setShow(!show);

  const handleSelectChange = (value) => {
    setValue("type", value);
  };

  const onSubmit = (data) => {
    handleTravellers(data);
    reset();
  };

  useEffect(() => {
    console.clear();
    console.log("Traveller types : ", travellersType);
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

  return (
    <div>
      {!show && options.length >=1 && (
        <button
          className="flex gap-2 items-center justify-center p-3 bg-[#EB5B2A] rounded-full text-white text-base font-medium w-full mt-2"
          type="button"
          onClick={handleToggleForm}
        >
          + Add Travellers
        </button>
      )}
      {show && options.length >=1 && (
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
            <Controller
              control={control}
              name="type"
              defaultValue={[]}
              rules={{
                required: "Please select a type",
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={options.map((opt) => toOption(opt, opt))}
                  onChange={handleSelectChange}
                  placeholder="Select type"
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              )}
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
