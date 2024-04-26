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
import { FormFieldInput, SelectInput,ImageMaping } from '../../ui/fromFields';
import { formStyle } from "../../ui/style";
import Link from 'next/link';
import img1 from "../../../../public/aadhar.jpg"
import img2 from "../../../../public/aadhar.jpg"
import img3 from "../../../../public/aadhar.jpg"
import img4 from "../../../../public/aadhar.jpg"
type Inputs = {
    vehicleCategory: string;
    clientUserCategory: string;
    ClientUserDropDown: number;
    parkfee: string;
  
  };
  const images = [img1, img2, img3]; // Array containing imported images

const ViewFullProfile = ({profileId}) => {

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
        // <div className="flex flex-col items-center justify-center border-2 border-green-800 p-6 h-full   w-full ">
        //     <div className='border-2 h-full w-full p-4 overflow-y-scroll'>
        //     <div className="w-full  text-center uppercase font-bold">
        //       <h1>Add Park Fee</h1>
        //     </div>
        //        <form className=" h-full   grid   grid-cols-2   gap-y-2 gap-x-2  ">

        //     <FormFieldInput
        //       label=""
        //       type="number"
        //       name="parkfee"
        //       register={register}
        //       error={errors.parkfee}
        //       defaultValue=""
        //       required
        //       placeholder="Park Fee Per Day"
        //     />
        //     <FormFieldInput
        //       label=""
        //       type="number"
        //       name="parkfee"
        //       register={register}
        //       error={errors.parkfee}
        //       defaultValue=""
        //       required
        //       placeholder="Park Fee Per Day"
        //     />
        //     <FormFieldInput
        //       label=""
        //       type="number"
        //       name="parkfee"
        //       register={register}
        //       error={errors.parkfee}
        //       defaultValue=""
        //       required
        //       placeholder="Park Fee Per Day"
        //     />
        //     <FormFieldInput
        //       label=""
        //       type="number"
        //       name="parkfee"
        //       register={register}
        //       error={errors.parkfee}
        //       defaultValue=""
        //       required
        //       placeholder="Park Fee Per Day"
        //     />
        //     <FormFieldInput
        //       label=""
        //       type="number"
        //       name="parkfee"
        //       register={register}
        //       error={errors.parkfee}
        //       defaultValue=""
        //       required
        //       placeholder="Park Fee Per Day"
        //     />
        //     <FormFieldInput
        //       label=""
        //       type="number"
        //       name="parkfee"
        //       register={register}
        //       error={errors.parkfee}
        //       defaultValue=""
        //       required
        //       placeholder="Park Fee Per Day"
        //     />
        //     <FormFieldInput
        //       label=""
        //       type="number"
        //       name="parkfee"
        //       register={register}
        //       error={errors.parkfee}
        //       defaultValue=""
        //       required
        //       placeholder="Park Fee Per Day"
        //     />
        //     <FormFieldInput
        //       label=""
        //       type="number"
        //       name="parkfee"
        //       register={register}
        //       error={errors.parkfee}
        //       defaultValue=""
        //       required
        //       placeholder="Park Fee Per Day"
        //     />
        //     <FormFieldInput
        //       label=""
        //       type="number"
        //       name="parkfee"
        //       register={register}
        //       error={errors.parkfee}
        //       defaultValue=""
        //       required
        //       placeholder="Park Fee Per Day"
        //     />
        //     <FormFieldInput
        //       label=""
        //       type="number"
        //       name="parkfee"
        //       register={register}
        //       error={errors.parkfee}
        //       defaultValue=""
        //       required
        //       placeholder="Park Fee Per Day"
        //     />
        //          <FormFieldInput
        //       label=""
        //       type="number"
        //       name="parkfee"
        //       register={register}
        //       error={errors.parkfee}
        //       defaultValue=""
        //       required
        //       placeholder="Park Fee Per Day"
        //     />
            
        //     <div className="w-full col-span-2 flex justify-between border">
        //       <button
        //         type="submit"
        //         className="bg-[#333333] text-white px-4 py-1 w-60"
        //       >
        //         Submit
        //       </button>
        //       <button
        //         type="submit"
        //         className="bg-[#333333] text-white px-4 py-1 w-60"
        //       >
        //         Submit
        //       </button>
        //     </div>
            
        //   </form>
        //     </div>
        // </div>
<div className='  h-full w-full p-6'>
<h1 className='w-full uppercase border text-center text-lg font-semibold'>Profile {profileId.profileId}</h1>
<div  className='  w-full '>
    <form action="" className="border scrollbar-hide grid grid-cols-2 w-full  h-[600px] content-start gap-y-8 overflow-y-scroll  p-4 justify-items-center">
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
            <FormFieldInput
              label=""
              type="number"
              name="parkfee"
              register={register}
              error={errors.parkfee}
              defaultValue=""
              required
              placeholder="Park "
            />
            <FormFieldInput
              label=""
              type="number"
              name="parkfee"
              register={register}
              error={errors.parkfee}
              defaultValue=""
              required
              placeholder="Park "
            />
            <FormFieldInput
              label=""
              type="number"
              name="parkfee"
              register={register}
              error={errors.parkfee}
              defaultValue=""
              required
              placeholder="Park "
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
            <FormFieldInput
              label=""
              type="number"
              name="parkfee"
              register={register}
              error={errors.parkfee}
              defaultValue=""
              required
              placeholder="Park "
            />
            <FormFieldInput
              label=""
              type="number"
              name="parkfee"
              register={register}
              error={errors.parkfee}
              defaultValue=""
              required
              placeholder="Park "
            />
            <FormFieldInput
              label=""
              type="number"
              name="parkfee"
              register={register}
              error={errors.parkfee}
              defaultValue=""
              required
              placeholder="Park "
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
            <FormFieldInput
              label=""
              type="number"
              name="parkfee"
              register={register}
              error={errors.parkfee}
              defaultValue=""
              required
              placeholder="Park "
            />
            <FormFieldInput
              label=""
              type="number"
              name="parkfee"
              register={register}
              error={errors.parkfee}
              defaultValue=""
              required
              placeholder="Park "
            />
            <FormFieldInput
              label=""
              type="number"
              name="parkfee"
              register={register}
              error={errors.parkfee}
              defaultValue=""
              required
              placeholder="Park "
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
            <FormFieldInput
              label=""
              type="number"
              name="parkfee"
              register={register}
              error={errors.parkfee}
              defaultValue=""
              required
              placeholder="Park "
            />
            <FormFieldInput
              label=""
              type="number"
              name="parkfee"
              register={register}
              error={errors.parkfee}
              defaultValue=""
              required
              placeholder="Park "
            />
            <FormFieldInput
              label=""
              type="number"
              name="parkfee"
              register={register}
              error={errors.parkfee}
              defaultValue=""
              required
              placeholder="Park "
            />
            <FormFieldInput
              label=""
              type="number"
              name="parkfee"
              register={register}
              error={errors.parkfee}
              defaultValue=""
              required
              placeholder="Park "
            />
            <FormFieldInput
              label=""
              type="number"
              name="parkfee"
              register={register}
              error={errors.parkfee}
              defaultValue=""
              required
              placeholder="Park "
            />
            <FormFieldInput
              label=""
              type="number"
              name="parkfee"
              register={register}
              error={errors.parkfee}
              defaultValue=""
              required
              placeholder="Park "
            />
           <div className='col-span-2 '> <ImageMaping images={images}/></div>
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
            
    </form>
</div>
</div>

      );
}

export default ViewFullProfile