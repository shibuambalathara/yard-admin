"use client";

import { useForm } from "react-hook-form";
import { FormFieldInput, SelectInput } from "../../components/ui/fromFields";
import { formStyle } from "../../components/ui/style";

import React from "react";
import Link from "next/link";
type Inputs = {
  name: string;
  email: string;
  contact: number;
  designation: string;
  role: string;
  password: string;
};
const UserSignup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const bidStatusOptions = [
    { label: "Super Admin", value: "super_admin" },
    { label: "Yard Manager", value: "yard_manager" },
    { label: "Client Level Super User", value: "client_level_super_user" },
    { label: "Client Level  User", value: "client_level_user" },
    { label: "Client Level Sub User", value: "client_level_subsuer" },
  ];
  return (
    <div className="flex items-center justify-center border-2 h-screen w-full">
      <form className={`${formStyle.data}`}>
        <div className="w-full  text-center uppercase font-bold">
          <h1>Fill the form to Register</h1>
        </div>
        <FormFieldInput
          label=""
          type="text"
          name="name"
          register={register}
          error={errors.name}
          defaultValue=""
          required
          placeholder="Name"
        />
        <FormFieldInput
          label=""
          type="email"
          name="email"
          register={register}
          error={errors.email}
          defaultValue=""
          required
          placeholder="Email"
        />
        <FormFieldInput
          label=""
          type="number"
          name="contact"
          register={register}
          error={errors.contact}
          defaultValue=""
          required
          placeholder="contact"
        />
        <FormFieldInput
          label=""
          type="text"
          name="designation"
          register={register}
          error={errors.designation}
          defaultValue=""
          required
          placeholder="Designation"
        />
        <SelectInput
          label=""
          name="role"
          defaultValue="Select  Role"
          options={bidStatusOptions}
          register={register}
          error={errors.role}
        />
        <FormFieldInput
          label=""
          type="password"
          name="password"
          register={register}
          error={errors.password}
          defaultValue=""
          required
          placeholder="Password"
        />
        <FormFieldInput
          label=""
          type="password"
          name="confirmpassword"
          register={register}
          error={errors.password}
          defaultValue=""
          required
          placeholder="Confirm Password"
        />
        <div className="w-full">
          <button
            type="submit"
            className="bg-[#333333] text-white px-4 py-1 w-full"
          >
            Submit
          </button>
        </div>
        <div className="w-full flex text-center  justify-center space-x-2">
          <p>Have an account ? </p> <p className="text-blue-400"><Link href='/login'>Login</Link></p>
        </div>
      </form>
    </div>
  );
};

export default UserSignup;
