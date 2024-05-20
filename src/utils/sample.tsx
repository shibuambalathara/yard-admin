"use client";
import { useForm } from "react-hook-form";
import {
  FormFieldInput,
  SelectInput,
  FormFieldPassword,
} from "../ui/fromFields";
import { formStyle, inputStyle } from "../ui/style";
import React from "react";
import Link from "next/link";
import { Role, documentType } from "../../utils/staticData";
type Inputs = {
  name: string;
  email: string;
  contact: number;
  designation: string;
  role: string;
  aadhar: string;
  accountValidFrom: string;
  password: string;
  account_usage_from: string;
  account_usage_to: string;
  document_type: string;
  document_value: string;
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
  };

  return (
    <div className="flex flex-col py-14 items-center  h-screen w-full ">
             <h1 className="uppercase font-bold">create User</h1>

      <form
        action=""
        
        // className={formStyle.data}
        className=" scrollbar-hide grid grid-cols-2 border max-w-4xl h-[600px] content-start gap-y-8  gap-x-6 overflow-y-scroll  p-12 justify-items-center"
      >
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
          placeholder=" "
        />
        <FormFieldInput
          label="Contact"
          type="number"
          name="contact"
          register={register}
          error={errors.contact}
          defaultValue=""
          required
          placeholder=" "
        />

        <SelectInput
          label="Role"
          options={Role}
          name="role"
          register={register}
          error={errors.role}
          defaultValue=""
          required
          placeholder=" "
          data=""
        />
        <FormFieldInput
          label="Designation"
          type="date"
          name="designation"
          register={register}
          error={errors.designation}
          defaultValue=""
          required
          placeholder=""
        />
        <FormFieldInput
          label="password"
          type="password"
          name="password"
          register={register}
          error={errors.password}
          defaultValue=""
          required
          placeholder=" "
        />
        <FormFieldInput
          label="Account Valid From"
          type="date"
          name="account_usage_from"
          register={register}
          error={errors.account_usage_from}
          defaultValue=""
          required
          placeholder=" "
        />
        <FormFieldInput
          label="Account Valid To"
          type="date"
          name="account_usage_to"
          register={register}
          error={errors.account_usage_to}
          defaultValue=""
          required
          placeholder=" "
        />
        <SelectInput
          label="Role"
          options={documentType}
          name="role"
          register={register}
          error={errors.document_type}
          defaultValue=""
          required
          placeholder=" "
          data=""
        />

        <div className="flex flex-col  w-96   shadow-sm   border-grey-600 text-gray-900 ">
          <label className="font-bold" htmlFor="document_value">
            Document Value
          </label>
          <input
            id="document_value"
            type="file"
            className="py-1 px-4 border border-grey-600"
            {...register("document_value", { required: true })}
          />
          {errors.document_value && <p>Document Value is required</p>}
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
