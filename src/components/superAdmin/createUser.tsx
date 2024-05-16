"use client";

import { useForm } from "react-hook-form";
import { FormFieldInput, SelectInput,FormFieldPassword } from "../ui/fromFields";
import { formStyle } from "../ui/style";

import React from "react";
import Link from "next/link";
type Inputs = {
  name: string;
  email: string;
  contact: number;
  role:string
  aadhar: string;
  accountValidFrom: string;
  accountValidTo:string;
};
const CreateUser = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const bidStatusOptions = [
   
    { label: "Yard Manager", value: "yard_manager" },
    
    { label: "Client Level  User", value: "client_level_user" },
    
  ];

  const onSubmit = (data) => {
    // console.log("ONSUBMIT", data);
  }

  return (
    <div className="flex py-14 justify-center border-2 h-screen w-full ">
      <form className={`${formStyle.data} bg-white rounded-md overflow-hidden overflow-y-scroll scrollbar-hide`} onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full  text-center uppercase font-bold">
          <h1>Create User </h1>
        </div>
        <FormFieldInput
          label="Name"
          type="text"
          name="name"
          register={register}
          error={errors.name}
          defaultValue=""
          required
          placeholder=""
        />
        <FormFieldInput
          label="Email"
          type="email"
          name="email"
          register={register}
          error={errors.email}
          defaultValue=""
          required
          placeholder=""
        />
        <FormFieldInput
          label="Contact"
          type="number"
          name="contact"
          register={register}
          error={errors.contact}
          defaultValue=""
          required
          placeholder=""
        />
        
        {/* <SelectInput
          label="Role"
          name="role"
          defaultValue="Select  Role"
          options={bidStatusOptions}
          register={register}
          error={errors.role}
          required
        /> */}


<FormFieldInput
          label="Upload aadhar"
          type="file"
          name="contact"
          register={register}
          error={errors.contact}
          defaultValue=""
          required
          placeholder="Upload Aadhar"
        />

<FormFieldInput
          label="Account Valid From"
          type="Date"
          name="contact"
          register={register}
          error={errors.contact}
          defaultValue=""
          required
          placeholder="Upload Aadhar"
        />
        <FormFieldInput
          label="Account Valid Too"
          type="Date"
          name="contact"
          register={register}
          error={errors.contact}
          defaultValue=""
          required
          placeholder="Upload Aadhar"
        />
        

        {/* Confirm Password Field */}
        
          {/* {errors.confirmPassword && <p className="text-red-500">Passwords do not match</p>} */}

        <div className="w-full">
          <button
            type="submit"
            className="bg-[#333333] text-white px-4 py-1 w-full"
          >
            Create User
          </button>
        </div>
        
      </form>
    </div>
  );
};

export default CreateUser;
