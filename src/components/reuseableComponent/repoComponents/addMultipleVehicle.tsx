import FileUploadInput from '@/components/ui/fromFields'
import React from 'react'
import { useForm } from 'react-hook-form';

const AddMultipleVehicle = () => {
    type Inputs = {
         // Files property containing images
      };
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<Inputs>(
     
    );
  return (
    <div className="max-w-6xl w-full space-y-8 p-20 ">
        <form
          className="mt-8 space-y-6"
        //   onSubmit={''}
          encType="multipart/form-data"
        >
          <div className="grid grid-cols-1  gap-6 place-items-center">
            {/* <div>
              <SelectComponent
                label="Select Organisation"
                name="cl_org_id"
                options={''}
                register={register}
                errors={errors}
                defaultValue=""
              />
            </div>
            <div>
              <SelectComponent
                label="Select Category"
                name="vehicle_category_id"
                options={'vehicleCategorys'}
                register={register}
                errors={errors}
                defaultValue=""
              />
            </div> */}

           
            <FileUploadInput
              label="Excel Upload"
              name="files.LEFT_IMAGE" // Accessing LEFT_IMAGE from files
              register={register}
              accept="image/*"
            
            />
            </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form></div>
  )
}

export default AddMultipleVehicle