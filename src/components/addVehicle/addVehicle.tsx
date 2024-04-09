"use client";

import React from 'react'
import { useForm } from "react-hook-form";
import { FormFieldInput, SelectInput,ImageMaping,RadioButtonInput } from "../../components/ui/fromFields";
import { formStyle,vehicleFormStyle, } from "../../components/ui/style";
import Link from 'next/link';


const AddVehicleComponent = () => {
    type Inputs = {
        name: string;
        email: string;
        contact: number;
        designation: string;
        role: string;
        password: string;
      };
      
        const {
          register,
          handleSubmit,
          watch,
          formState: { errors },
        } = useForm<Inputs>();
  return (
    <div className="flex items-center justify-center  h-screen  w-full">
      <form className={`${vehicleFormStyle.data}`}>
      <FormFieldInput
          label="Registration Number"
          type="text"
          name="reg_no"
          register={register}
          error={errors.name}
          defaultValue=""
          required
          placeholder=""
        />
        <FormFieldInput
          label="Make"
          type="text"
          name="make"
          register={register}
          error={errors.name}
          defaultValue=""
          required
          placeholder=""
        />
        <FormFieldInput
          label="Model"
          type="text"
          name="model"
          register={register}
          error={errors.email}
          defaultValue=""
          required
          placeholder=""
        />
        <FormFieldInput
          label="Variant"
          type="text"
          name="variant"
          register={register}
          error={errors.contact}
          defaultValue=""
          required
          placeholder=""
        />
        <FormFieldInput
          label="Color"
          type="text"
          name="color"
          register={register}
          error={errors.designation}
          defaultValue=""
          required
          placeholder=""
        />
         <FormFieldInput
          label="Condition"
          type="text"
          name="condition"
          register={register}
          error={errors.designation}
          defaultValue=""
          required
          placeholder=""
        />
         <FormFieldInput
          label="Start Condition"
          type="text"
          name="strt_condition"
          register={register}
          error={errors.designation}
          defaultValue=""
          required
          placeholder=""
        />
         <FormFieldInput
          label="Engine No"
          type="text"
          name="engine_no"
          register={register}
          error={errors.designation}
          defaultValue=""
          required
          placeholder=""
        />
         <FormFieldInput
          label="Chaiss No"
          type="text"
          name="chaiss_no"
          register={register}
          error={errors.designation}
          defaultValue=""
          required
          placeholder=""
        />
         <FormFieldInput
          label="Board Type"
          type="text"
          name="board_type"
          register={register}
          error={errors.designation}
          defaultValue=""
          required
          placeholder=""
        />
      <SelectInput
          label="Category"
          name="role"
          defaultValue="Select  Vehicle Category"
          options=""
          register={register}
          error={errors.role}
        />
         <FormFieldInput
          label="Contract  No"
          type="number"
          name="contract_no"
          register={register}
          error={errors.designation}
          defaultValue=""
          required
          placeholder=""
        />
         <FormFieldInput
          label="Loan No"
          type="number"
          name="loan_no"
          register={register}
          error={errors.designation}
          defaultValue=""
          required
          placeholder=""
        />
         <FormFieldInput
          label="Odometer"
          type="number"
          name="Odometer"
          register={register}
          error={errors.designation}
          defaultValue=""
          required
          placeholder=""
        />
         <FormFieldInput
          label="Key Count"
          type="text"
          name="key_count"
          register={register}
          error={errors.designation}
          defaultValue=""
          required
          placeholder=""
        />
           <FormFieldInput
          label="Manufacturing Date"
          type="date"
          name="mfg"
          register={register}
          error={errors.designation}
          defaultValue=""
          required
          placeholder=""
        />
        <FormFieldInput
          label="Entry Date"
          type="date"
          name="entry_date"
          register={register}
          error={errors.designation}
          defaultValue=""
          required
          placeholder=""
        />
        <FormFieldInput
          label="Actual Entry Date"
          type="date"
          name="act_entry_date"
          register={register}
          error={errors.designation}
          defaultValue=""
          required
          placeholder=""
        />
        <FormFieldInput
          label="Exit Date"
          type="date"
          name="exsist_date"
          register={register}
          error={errors.designation}
          defaultValue=""
          required
          placeholder=""
        />
        <FormFieldInput
          label="Actual Exit Date"
          type="date"
          name="mfg"
          register={register}
          error={errors.designation}
          defaultValue=""
          required
          placeholder=""
        />
            <RadioButtonInput
          label="Rc Availabel"
          type="radio"
          name="rc"
          register={register}
          error={errors.designation}
          defaultValue=""
          required
          placeholder=""
        />
        <ImageMaping  images=""/>
    
        <div className=" w-full col-span-2 text-center">
          <button
            type="submit"
            className="bg-[#333333] text-white px-4 py-1 w-20"
          >
            Submit
          </button>
        </div>
        
      </form>
    </div>
  )
}

export default AddVehicleComponent