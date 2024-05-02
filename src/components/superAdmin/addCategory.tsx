// import React from 'react'

// const ViewFullProfile = ({profileId}) => {
//   return (
//     <>
//     <div>viewFullProfile form profile component{profileId.profileId}</div>
//     <div>
        
//     </div>
//     </>
//   )
// }

// export default ViewFullProfile

"use client"
import React from 'react'
import { useForm } from "react-hook-form";
import { FormFieldInput, SelectInput,ImageMaping,TextArea } from '../ui/fromFields';
import { formStyle } from "..//ui/style";
import Link from 'next/link';

type Inputs = {
    vehicleCategory: string;
    clientUserCategory: string;
    ClientUserDropDown: number;
    parkfee: string;
  
  };


const Addcategory = () => {

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
            <h1>Add Vehicle Category</h1>
          </div>
          
          
          
          <FormFieldInput
            label=""
            type="text"
            name="parkfee"
            register={register}
            error={errors.parkfee}
            defaultValue=""
            required
            placeholder="Enter Category Name"
          />
          <TextArea
           
            type="text"
            name="parkfee"
            register={register}
            error={errors.parkfee}
            defaultValue=""
            required
            placeholder=" Enter Description"
          />
         
          
          <div className="w-full">
            <button
              type="submit"
              className="bg-[#333333] text-white px-4 py-1 w-full"
            >
              Add
            </button>
          </div>
          
        </form>
      </div>

      );
}

export default Addcategory