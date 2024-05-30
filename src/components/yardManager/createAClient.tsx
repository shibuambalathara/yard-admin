"use client"
import React from 'react'
import { useForm } from "react-hook-form";
import { FormFieldInput, SelectInput } from '../ui/fromFields';
import { formStyle } from "../ui/style";
import Link from 'next/link';
type Inputs = {
    vehicleCategory: string;
    clientUserCategory: string;
    ClientUserDropDown: number;
    parkfee: string;
  
  };
const CreateAClient = () => {

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

      const handleParkFee=()=>{

      }
    return (
        <div className="flex items-center justify-center border-2 h-full  w-full ">
          <form className={`${formStyle.data}`}
                      onSubmit={handleSubmit(handleParkFee)}

          >
            <div className="w-full  text-center uppercase font-bold">
              <h1>Add Park Fee</h1>
            </div>
            
            
            <SelectInput
              label=""
              name="vehicleCategory"
              defaultValue="select vehicle category"
              options={bidStatusOptions}
              register={register}
              error={errors}
            />
            <SelectInput
              label=""
              name="clientUserCategory"
              defaultValue="Select  Role"
              options={bidStatusOptions}
              register={register}
              error={errors}
            />
            <SelectInput
              label=""
              name="ClientUserDropDown"
              defaultValue="Select  Role"
              options={bidStatusOptions}
              register={register}
              error={errors}
            />
            <FormFieldInput
              label=""
              type="number"
              name="parkfee"
              register={register}
              error={errors.parkfee}
              defaultValue=""
              required
              placeholder="Park Fee Per Day"
            />
            
            <div className="w-full">
              <button
                type="submit"
                className="bg-[#333333] text-white px-4 py-1 w-full"
              >
                Submit
              </button>
            </div>
            
          </form>
        </div>
      );
}

export default CreateAClient