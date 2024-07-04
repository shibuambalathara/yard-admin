import {AccountStatus} from "@/utils/staticData"
import { inputStyle, labelStyle } from "../ui/style";
export const RoleSelect = ({ roleOptions, setRoleFilter, placeholder = "select a role" }) => {
  return (
    <div className="max-w-md mx-auto mt-4">
      <select
        id="role-select"
        className="block w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        onChange={(e) => setRoleFilter(e.target.value)}
      >
        <option  value="">{placeholder}</option>
        {roleOptions.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};


export const FilterComponent = ({
  label,
  name,
  options,
  defaultValue,
  disabled = false,
  placeholder="",
  setValue
}) => {
  // console.log("errors",errors);

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className={labelStyle?.data}>
        {label}
      </label>
      <select
        disabled={disabled}
        id={name}
        className={inputStyle?.data}
        defaultValue={defaultValue}
        onChange={(e) => setValue(e.target.value)}
      >
        <option value="" disabled hidden>
          {label ? label : placeholder}
        </option>
        {options &&
          options?.map((option, index) => (
            <option key={index} value={option?.value}>
              {option?.label}
            </option>
          ))}
      </select>
    </div>
  );
};


  export const SelectStatus = ({ options, setAccountStatus }) => {
    return (
      <div className="max-w-md mx-auto mt-4">
        <label htmlFor="role-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Status
        </label>
        <select
          id="role-select"
          className="block w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          onChange={(e) => setAccountStatus(e.target.value)}
        >
          <option disabled value="">Select a role</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    );
  };