"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormFieldInput, SelectInput, ImageMaping } from "../../ui/fromFields";
import { formStyle } from "../../ui/style";
import Link from "next/link";
import img1 from "../../../../public/aadhar.jpg";
import img2 from "../../../../public/aadhar.jpg";
import img3 from "../../../../public/aadhar.jpg";
import img4 from "../../../../public/aadhar.jpg";
import Image from "next/image";
type Inputs = {
  name: string;
  email: string;
  contact: number;
  code: string;
};
const images = [img1, img2, img3]; // Array containing imported images

const ViewFullUserProfile = ({ profileId }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const Options = [
    { label: "Super Admin", value: "super_admin" },
    { label: "Yard Manager", value: "yard_manager" },
   
  ];

  const userIdProofTypes = [
    { label: "Aadhar ", value: "AADHAR" },
    { label: "Pancard ", value: "PANCARD" },

  ];

  const handleParkFee = () => {};
  return (
    <div className="  h-full w-full p-6">
      <h1 className="w-full uppercase border text-center text-lg font-semibold">
        Profile{" "}
      </h1>
      <div className="  w-full ">
        {/* <form
          action=""
          className="border scrollbar-hide grid grid-cols-2 w-full  h-[600px] content-start gap-y-8 overflow-y-scroll  p-4 justify-items-center"
        >
          <FormFieldInput
            label="Name"
            type="text"
            name="name"
            register={register}
            error={errors.parkfee}
            defaultValue=""
            required
            placeholder=""
          />
          <FormFieldInput
            label="Email"
            type="email"
            name="email"
            register={register}
            error={errors.parkfee}
            defaultValue=""
            required
            placeholder="Park "
          />
          <FormFieldInput
            label="Role"
            type="text"
            name="Role"
            register={register}
            error={errors.parkfee}
            defaultValue=""
            required
            placeholder="Park "
          />
          
          <SelectInput
            label="Role"
            
            name="role"
            register={register}
            options={Options}
            error={errors.parkfee}
            defaultValue=""
            required
           />
           
          <div>
          <FormFieldInput
            label="Aadhar"
            type="file"
            name="aadhar"
            register={register}
            error={errors.parkfee}
            defaultValue=""
            required
            placeholder="Park "
          />
    <Image src={img1} alt="" key="" className="h-52  text-center" />
          </div>
           <FormFieldInput
            label="Pancard"
            type="string"
            name="pancard"
            register={register}
            error={errors.parkfee}
            defaultValue=""
            required
            placeholder="Park "
          />
           <SelectInput
            label="Permission Status"
            name="role"
            register={register}
            options={Options}
            error={errors.parkfee}
            defaultValue=""
            required
           />
           <SelectInput
            label="Account Status"
            
            name="role"
            register={register}
            options={Options}
            error={errors.parkfee}
            defaultValue=""
            required
           />
          <FormFieldInput
            label="Account Valid From"
            type="date"
            name="parkfee"
            register={register}
            error={errors.parkfee}
            defaultValue=""
            required
            placeholder="Park Fee Per Day"
          />
          <FormFieldInput
            label="Account Valid Too"
            type="date"
            name="parkfee"
            register={register}
            error={errors.parkfee}
            defaultValue=""
            required
            placeholder="Park "
          />
          <FormFieldInput
            label="Created By"
            type="string"
            name="createdBy"
            register={register}
            error={errors.parkfee}
            defaultValue=""
            required
            placeholder="Park "
          />
          
          <div className="col-span-2 ">
            {" "}
            <ImageMaping images={images} />
          </div>
          <div className="w-full col-span-2 flex justify-between ">
            <button
              type="submit"
              className="bg-[#333333] text-white px-4 py-1 w-60"
            >
              Approve
            </button>
            <button
              type="submit"
              className="bg-[#333333] text-white px-4 py-1 w-60"
            >
              Reject
            </button>
          </div>
        </form> */}
      </div>
    </div>
  );
};

export default ViewFullUserProfile;
