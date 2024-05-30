"use client"
import Image from "next/image";
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import {
  formStyle,
  inputStyle,
  labelStyle,
  loginInputStyle,
} from "./style";
import { Role, AccountStatus } from "@/utils/staticData";
import { useFormContext } from 'react-hook-form';
import { useState,useEffect } from "react";


export const FormFieldInput = ({
  label,
  type,
  name,
  register,
  defaultValue,
  error,
  placeholder,
  
  ...rest
}) => {
  // console.log('defaultValue', defaultValue);

  return (
    <div className="flex flex-col h-fit ">
      <label className={`${labelStyle.data}`} htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        defaultValue={defaultValue}
        {...register(name, rest)}
        className={`${inputStyle.data} ${name===`name` && `uppercase`}`}
        placeholder={placeholder}
      />

      {error && <p className="text-red-500">{`${label} Required`}</p>}
    </div>
  );
};


export const InputField = ({
  name,
  label,
  type = "text",
  register,
  errors,
  pattern,
}) => {
 
  return (
    <div className="mb-">
      <label  className={`${labelStyle.data}`}>{label}</label>
      <input
        type={type}
        {...register(name, {
          required: `${label} is required`,
          pattern: {
            value: pattern,
            message: `${label} is invalid`,
          },
        })}
        // className="w-96 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        className={`${inputStyle.data} ${name===`name` && `uppercase`}`}
       

      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
}


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

      {error && <p className="text-red-500">{`${label} Required`}</p>}
    </div>
  );
};

export const RadioButtonInput = ({
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
    // <div className="flex flex-col ">

    //   <label  className={`${labelStyle.data}`} htmlFor={name}>
    //     {label}
    //   </label>
    //   <input
    //     type={type}
    //     defaultValue={defaultValue}
    //     {...register(name, rest)}
    //     className={`${inputStyle.data}`}
    //     placeholder={placeholder}

    //   />

    //   {error && <p className="text-red-500">{`${label} Required`}</p>}
    // </div>
    <div className="flex flex-col  space-x-2 ">
      <p className={`${labelStyle.data}`}>{label}</p>

      <div className="space-x-2 flex items-center">
        <label className={`${labelStyle.data}`}>
          <input
            type="radio"
            value="yes"

            // checked={selectedOption === 'yes'}
            // onChange={handleOptionChange}
          />
          Yes
        </label>
        <label className={`${labelStyle.data}`}>
          <input
            type="radio"
            value="no"

            // checked={selectedOption === 'no'}
            // onChange={handleOptionChange}
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
  
  ...rest
}) => {
 


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
          {defaultValue }
        </option>
        {options &&
          options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      {error && <p className="text-red-500">{`${label} Required`}</p>}
    </div>
  );
};



export const SelectComponent= ({
  label,
  name,
  options,
  register,
  errors,
  required = false,
  defaultValue
}) => {
// console.log("errors",errors);

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className={labelStyle?.data}>
        {label}
      </label>
      <select
        id={name}
        {...register(name, { required: required && "This field is required" })}
        // className="py-1 px-12 border border-gray-300 rounded"
        className={inputStyle.data}
        defaultValue={defaultValue}

      >
        <option value="" disabled hidden>
          {label}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && <p className="text-red-500">{name} is required</p>}
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
    if (currentAccountVerification === "APPROVED" || currentAccountVerification === "REJECTED") {
      setFilteredOptions(options.filter(option => option.value !== "PENDING"));
    } else {
      setFilteredOptions(options);
    }
  }, [currentAccountVerification, options]);

  console.log('CURRENT OPTIONS', filteredOptions);

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
          {defaultValue }
        </option>
        {options &&
          filteredOptions?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      {error && <p className="text-red-500">{`${label} Required`}</p>}
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
        className="w-96 h-20 border placeholder:pt-4 p-4 placeholder:text-center placeholder:my-auto"
      ></textarea>
            {error && <p className="text-red-500">{`${label} Required`}</p>}

    </div>
  );
};
