import FileUploadInput, { ExcelUploadInput } from '@/components/ui/fromFields'
import React from 'react'
import { useForm } from 'react-hook-form';

const AddMultipleVehicle = () => {
  type Inputs = {
    files: {
      EXCEL_FILE: FileList;
    };
  };

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    console.log(data);
    // handle form submission
  };

  return (
    <div className="max-w-4xl mx-auto p-8  rounded-lg  space-y-8">
     
      <form
        className="space-y-6"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <div className="space-y-4">
          <ExcelUploadInput
            label="Excel Upload"
            name="files.EXCEL_FILE"
            register={register}
            accept=".xlsx, .xls, .csv"
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
      </form>
    </div>
  )
}

export default AddMultipleVehicle;
