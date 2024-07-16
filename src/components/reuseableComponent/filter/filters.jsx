import React from 'react';
import {inputStyle,labelStyle} from "@/components/ui/style"

export const CategoryFilter = (props) => {
  const {label,handleCatChange, options } = props;

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
        <option value="">  {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option?.value}>
            {option?.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export const Search = (props) => {
    const {label, setSearchVehicle, placeholder}= props;
  
    return (
      <div className="flex flex-col w-40  ml-5">
        <label htmlFor="state" className={labelStyle?.data}>
          {label}
        </label>
        <input className={inputStyle?.data} placeholder={placeholder} onChange={setSearchVehicle} />
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
          {vehicleCategorys.map((option, index) => (
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
          {vehicleCategorys.map((option, index) => (
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
          {vehicleCategorys.map((option, index) => (
            <option key={index} value={option?.value}>
              {option?.label}
            </option>
          ))}
        </select>
      </div>
    );
  };