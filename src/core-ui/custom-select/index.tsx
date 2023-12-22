import { CustomSelectTypes } from "./types";
export default function CustomSelect({
  options,
  handleBlur,
  handleChange,
  id,
  errors,
  values,
  touched,
  label,
}: CustomSelectTypes) {
  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor={id} className="block text-sm font-manrope">
        {label}
      </label>
      <div className="relative">
        <div className=" rounded-none shadow-sm w-full  relative  flex flex-row items-center">
          <select
            name={id}
            value={values[id]}
            // onChange={(value) => {
            // //   setFieldValue(id, value);
            // }}
            onChange={handleChange}
            onBlur={handleBlur}
            className="rounded-md border py-2 before:mr-3 select flex px-4 text-black font-light border-gray-300 ring-primary focus:ring-primary focus:border-primary appearance-none w-full  sm:text-sm sm:leading-5"
          >
            <option value="" className="text-gray-400">
              -- Select {id}
            </option>
            {options?.map((opt) => (
              <option value={opt?._id}>{opt?.name}</option>
            ))}
          </select>
        </div>
        {errors[id] && touched[id] ? (
          <p className="mt-1 text-sm text-red-600" id={`${id}-error`}>
            {errors[id]}.
          </p>
        ) : null}
      </div>
    </div>
  );
}