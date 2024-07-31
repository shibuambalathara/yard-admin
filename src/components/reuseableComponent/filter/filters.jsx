import React, { useState,useEffect } from "react";
import { inputStyle, labelStyle } from "@/components/ui/style";
import useDebounce from "@/components/reuseableComponent/customHooks/customHooks"


export const CategoryFilter = (props) => {
  const { label, handleCatChange, options } = props;

  console.log("options",);

  return (
    <div className="flex flex-col w-40  ml-5">
      <label htmlFor="state" className={labelStyle?.data}>
        {label}
      </label>
      <select
        id="state"
        className={inputStyle?.data}
        defaultValue=""
        onChange={handleCatChange}
      >
        <option value=""> {label}</option>
        {options &&
          options.map((option, index) => (
            <option key={index} value={option?.value}>
              {option?.label}
            </option>
          ))}
      </select>
    </div>
  );
};
export const Status = (props) => {
  const { label, setStatusFilter, options } = props;
  const handleStatus=(e)=>{
    setStatusFilter(e.target.value)
  }

  return (
    <div className="flex flex-col w-40  ml-5">
      <label htmlFor="status" className={labelStyle?.data}>
        {label}
      </label>
      <select
        id="status"
        className={inputStyle?.data}
        defaultValue=""
        onChange={handleStatus}
      >
        <option value=""> {label}</option>
        {options &&
          options.map((option, index) => (
            <option key={index} value={option?.value}>
              {option?.label}
            </option>
          ))}
      </select>
    </div>
  );
};

export const Search = (props) => {
  const { label, setSearchVehicle, placeholder } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 200); // Debounce for 300ms
  // const handleSearch = (e) => {
  //   const value= e.target.value.toUpperCase()

  //   setSearchVehicle(value);
  // };


  // Update the search term and set it to uppercase
  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    setSearchTerm(value);
  };

  // Use the debounced value to update the search vehicle state
  useEffect(() => {
    setSearchVehicle(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchVehicle]);

  return (
    <div className="flex flex-col w-40  ml-5">
      <label htmlFor="state" className={labelStyle?.data}>
        {label}
      </label>
      <input
        className={`${inputStyle?.data} uppercase placeholder:capitalize`}
        placeholder={placeholder}
        onChange={handleSearch}

       
      />
    </div>
  );
};

export const ClientFilter = (props) => {
  const { labelStyle, inputStyle, handleCatChange, vehicleCategorys } = props;

  return (
    <div className="flex flex-col w-40  ml-5">
      <label htmlFor="state" className={labelStyle?.data}>
        Select Category
      </label>
      <select
        id="state"
        className={inputStyle?.data}
        defaultValue=""
        onChange={handleCatChange}
      >
        <option value="">All Category</option>
        {vehicleCategorys &&
          vehicleCategorys.map((option, index) => (
            <option key={index} value={option?.value}>
              {option?.label}
            </option>
          ))}
      </select>
    </div>
  );
};

export const StateFilter = (props) => {
  const { labelStyle, inputStyle, handleCatChange, vehicleCategorys } = props;

  return (
    <div className="flex flex-col w-40  ml-5">
      <label htmlFor="state" className={labelStyle?.data}>
        Select Category
      </label>
      <select
        id="state"
        className={inputStyle?.data}
        defaultValue=""
        onChange={handleCatChange}
      >
        <option value="">All Category</option>
        {vehicleCategorys &&
          vehicleCategorys.map((option, index) => (
            <option key={index} value={option?.value}>
              {option?.label}
            </option>
          ))}
      </select>
    </div>
  );
};
export const CityFilter = (props) => {
  const { labelStyle, inputStyle, handleCatChange, vehicleCategorys } = props;

  return (
    <div className="flex flex-col w-40  ml-5">
      <label htmlFor="state" className={labelStyle?.data}>
        Select Category
      </label>
      <select
        id="state"
        className={inputStyle?.data}
        defaultValue=""
        onChange={handleCatChange}
      >
        <option value="">All Category</option>
        {vehicleCategorys &&
          vehicleCategorys.map((option, index) => (
            <option key={index} value={option?.value}>
              {option?.label}
            </option>
          ))}
      </select>
    </div>
  );
};
