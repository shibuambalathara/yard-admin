"use client";
import Image from "next/image";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import { formStyle, inputStyle, labelStyle, loginInputStyle } from "./style";
import { Role, AccountStatus } from "@/utils/staticData";
import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
// import 'react-select/dist/react-select.css';

export const FormFieldInput = ({
  label,
  type,
  name,
  register,
  defaultValue,
  error,
  placeholder,
  disabled=false,
  ...rest
}) => {
  const handleInputChange = (event) => {
    if (
      name !== "email" &&
      name !== "password" &&
      name !== "date" &&
      name !== "number"
    ) {
      event.target.value = event.target.value.toUpperCase();
    }
  };
  return (
    <div className="flex flex-col h-fit ">
      <label className={`${labelStyle.data}`} htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        defaultValue={defaultValue}
        {...register(name, rest)}
        className={`${inputStyle.data}`}
        placeholder={placeholder}
        onChange={handleInputChange}
        disabled={disabled}
      />

      {error && <p className="text-red-500 text-start">{`This field is required`}</p>}
    </div>
  );
};

export const InputField = ({
  name,
  label,
  type = "text",
  register,
  errors,
  required = true,
  pattern,
  disabled = false,
  placeholder=""
}) => {
  const handleInputChange = (event) => {
    if (
      name !== "email" &&
      name !== "password" &&
      name !== "date" &&
      name !== "number"
    ) {
      event.target.value = event.target.value.toUpperCase();
    }
  };
  return (
    <div className="mb-">
      {/* export const labelStyle={data:`text-gray-800 text-sm font-semibold leading-tight tracking-normal `} */}

      <label className={`${labelStyle.data}`}>{label}</label>
      <input
        disabled={disabled}
        type={type}
        {...register(name, {
          required: required && `${label} is required`,
          pattern: {
            value: pattern,
            message: `${label} is invalid`,
          },
        })}
        // className="w-96 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        // export const inputStyle={data:`py-1 px-4 block w-72 mb-1 mt-2 text-gray-600 focus:outline-none focus:border font-normal  h-10 flex items-center pl-3 text-sm border-gray-300 rounded border `}

        className={`${inputStyle.data} ${name === `name` && `uppercase`} ${disabled && `bg-gray-100`} `}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      {errors[name] && (
        <p className="text-red-500  mt-1">{'This field is required'}</p>
      )}
    </div>
  );
};

export const FormFieldPassword = ({
  label,
  type,
  name,
  register,
  error,
  defaultValue,
  required,
  placeholder,
  isConfirmPassword,
  confirmValue,
}) => {
  // console.log('error',error);

  return (
    <div className="flex flex-col h-fit">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        {...register(name, {
          required: required,
          validate: (value) => {
            // Check if this is the confirm password field and if it matches the password field
            if (isConfirmPassword && value !== confirmValue) {
              return "Passwords do not match";
            }
            return true;
          },
        })}
        placeholder={placeholder}
        className={`${inputStyle.data}`}
      />
      {/* {error && <p className="text-red-500">{`${label} Required`}</p>} */}
      {/* {error && <p className="text-red-500">{error}</p>}  */}
      {error?.confirmPassword?.type == "required" &&
        name == "confirmPassword" && (
          <p className="text-red-500">{`${label} Required`}</p>
        )}
      {error?.password?.type == "required" && name == "password" && (
        <p className="text-red-500">{`${label} Required`}</p>
      )}
      {error?.confirmPassword?.type == "validate" &&
        name == "confirmPassword" && (
          <p className="text-red-500">{`${label} password doest match`}</p>
        )}
      {/* {error.password.type == "required" &&<p className="text-red-500">{`${label} Required`}</p> } */}
    </div>
  );
};

export const FormFieldInputLoginInput = ({
  label,
  type,
  name,
  register,
  defaultValue,
  error,
  placeholder,
  ...rest
}) => {
  // console.log('REST FROM FORM', rest);

  return (
    <div className="flex flex-col w-full ">
      <label className={`${labelStyle.data}`} htmlFor={name}>
        {/* {label} */}
      </label>
      <input
        type={type}
        defaultValue={defaultValue}
        {...register(name, rest)}
        className={`${loginInputStyle.data}`}
        placeholder={placeholder}
      />

      {error && <p className="text-red-500">This field is required</p>}
    </div>
  );
};

export const RadioButtonInput = ({
  label,
  name,
  register,
  defaultValue,
  error,
  placeholder,
  ...rest
}) => {
  return (
    <div className="flex flex-col space-x-2 w-72">
      <p className={`${labelStyle.data} ml-1`}>{label}</p>

      <div className="space-x-4 flex items-start justify-start mt-3 w-">
        <label className={`${labelStyle.data}`}>
          <input
            type="radio"
            value="YES"
            name={name}
            {...register(name)} // Spread the register function with the name
            className=""
          />
          Yes
        </label>
        <label className={`${labelStyle.data}`}>
          <input
            type="radio"
            value="NO"
            name={name}
            {...register(name)} // Spread the register function with the name
            className=""
          />
          No
        </label>
      </div>
    </div>
  );
};

//old one
export const SelectInput = ({
  label,
  name,
  options,
  defaultValue,
  error,
  register,
  required,
  disabled = false,
  ...rest
}) => {
  // console.log("options",options);

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className={`${labelStyle?.data}`}>
        {label}
      </label>
      <select
      disabled={disabled}
        {...register(name, { required: required })}
        className={`${inputStyle?.data}`}
        {...rest}
        // defaultValue={defaultValue}
      >
        {/* <option disabled  selected >
        {label}
        </option> */}
        {options &&
          options?.map((option) => (
            <option key={option?.value} value={option?.value}>
              {option.label}
            </option>
          ))}
      </select>
      {error[name] && <p className="text-red-500">This field is required</p>}
    </div>
  );
};

export const SelectComponent = ({
  label,
  name,
  options,
  register,
  errors,
  required = false,
  defaultValue,
  disabled = false,
  placeholder=""
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
        {...register(name, { required: required && "This field is required" })}
        // className="py-1 px-12 border border-gray-300 rounded"
        className={inputStyle?.data}
        defaultValue={defaultValue}
      >
        <option value="" disabled hidden>
          {placeholder ? placeholder : label}
        </option>
        {options &&
          options?.map((option, index) => (
            <option key={index} value={option?.value}>
              {option?.label}
            </option>
          ))}
      </select>
      {errors && errors[name] && (
        <p className="text-red-500">This field is required</p>
      )}
    </div>
  );
};

export const AccountVerificatioSelect = ({
  label,
  name,
  options,
  defaultValue,
  error,
  register,
  currentAccountVerification,
  ...rest
}) => {
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    if (
      currentAccountVerification === "APPROVED" ||
      currentAccountVerification === "REJECTED"
    ) {
      setFilteredOptions(
        options.filter((option) => option.value !== "PENDING")
      );
    } else {
      setFilteredOptions(options);
    }
  }, [currentAccountVerification, options]);

  console.log("CURRENT OPTIONS", filteredOptions);

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className={`${labelStyle.data}`}>
        {label}
      </label>
      <select
        {...register(name, { required: true })}
        className={`${inputStyle.data}`}
        {...rest}
        defaultValue={defaultValue}
      >
        <option disabled value={defaultValue}>
          {defaultValue}
        </option>
        {options &&
          filteredOptions?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      {error && <p className="text-red-500">{`This field is required`}</p>}
    </div>
  );
};

export const ImageMaping = ({ images }) => {
  return (
    <div className="grid grid-cols-3 gap-x-6  gap-y-4 m-2">
      {images &&
        images?.map((imgs, index) => {
          return (
            <div className=" bg-gray-50 rounded-2xl">
              <div className="text-center">
                {" "}
                <p>Image {index + 1}</p>
              </div>

              <div className=" flex justify-center">
                <Image
                  src={imgs}
                  alt={imgs}
                  key={index}
                  // className="h-52  text-center"
                  height={250}
                  width={300}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export const TextArea = ({
  name,
  type,
  defaultValue,
  error,
  label,
  placeholder,
  register,
  ...rest
}) => {
  // console.log('default value frm textare',defaultValue);
  return (
    <div className="flex flex-col ">
      <label htmlFor={name} className={`${labelStyle.data}`}>
        {label}
      </label>

      <textarea
        {...register(name)}
        name={name}
        id=""
        defaultValue={defaultValue}
        placeholder={placeholder}
        cols="30"
        rows="10"
        className="w-96 h-20 border-2 py-6 px-2 mt-2  place "
      ></textarea>
      {error && <p className="text-red-500">This field is required</p>}
    </div>
  );
};

export const FileUploadInput = ({
  label,
  name,
  register,
  accept,
  
}) => {
  return (
    <div>
      <label className={`${labelStyle.data}`}>{label}</label>
      <input
        id={name}
        name={name}
        type="file"
        accept={accept}
        
        className={`${inputStyle.data} `}
        {...register(name)}
      />
    </div>
  );
};

// const labelStyle = {
//   data: "text-gray-700 mb-2"
// };

const inputStyles = {
  data: "w-full",
};

const customStyles = {
  container: (provided) => ({
    ...provided,
    width: "100%",
  }),
  control: (provided) => ({
    ...provided,
    width: "100%",

    borderWidth: "1px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    width: "100%",
  }),
  menu: (provided) => ({
    ...provided,
    width: "100%",
  }),
  input: (provided) => ({
    ...provided,
    width: "100%",
  }),
  multiValue: (provided) => ({
    ...provided,
    width: "auto",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    width: "auto",
  }),
};

  export const CustomMultiSelect = ({
    control,
    name,
    options,
    placeholder,
    label,
    defaultValue,
    rules={} // Accept rules as a prop
  }) => {
    return (
      <div className="flex flex-col w-full">
        <label className="mb-2">
          {label}
        </label>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue} // Set default value
          rules={rules} // Apply validation rules
          render={({ field, fieldState: { error } }) => (
            <>
              <Select
                {...field}
                isMulti
                options={options}
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder={placeholder}
                onChange={(selected) =>
                  field.onChange(selected?.map((option) => option?.value))
                }
                value={options?.filter((option) =>
                  field?.value?.includes(option?.value)
                )}
              />
              {error && <p className="text-red-500 mt-2">This field is required</p>}
            </>
          )}
        />
      </div>
    );
  }


export const CustomMultiSelectForEdit = ({
  control,
  name,
  options,
  placeholder,
  label,
  defaultValue = []
}) => {
  return (
    <div className="flex flex-col w-full">
      <label className={labelStyle.data}>
        {label || "Select Vehicle Category"}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue?.map((state) => ({
          label: state.name,
          value: state.id,
        }))}
        render={({ field }) => (
          <Select
            {...field}
            isMulti
            options={options}
            className={inputStyles.data}
            classNamePrefix="react-select"
            placeholder={placeholder}
            onChange={(selected) => field.onChange(selected)}
            value={options?.filter((option) =>
              field?.value?.some((val) => val.vehicle_category_id === option.value)
            )}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
          />
        )}
      />
    </div>
  );
};

 


export default FileUploadInput;
