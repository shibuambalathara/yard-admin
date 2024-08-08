import FileUploadInput, { ExcelUploadInput, SelectComponent } from '@/components/ui/fromFields';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from "@/utils/axios";
import { useRouter } from 'next/router';
import toast from "react-hot-toast";

const AddMultipleVehicle = (props) => {
  const { superRequire } = props;
console.log(superRequire);

  type Inputs = {
    files: {
      EXCEL_FILE: FileList;
    };
    cl_org_id: string;
  };

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();
  const [isLoading, setIsLoading] = useState(false);
  const [children, setChildren] = useState([]);
 const routes=useRouter()
  const fetchChildren = useCallback(async () => {
    if (superRequire) {
      try {
        const response = await axiosInstance.get(`/clientorg/client_lvl_super_org/child/_org`);
        setChildren(response?.data?.res?.clientLvlOrg);
        console.log(response);
      } catch (error) {
        console.log("error", error);
      }
    }
  }, [superRequire]);

  useEffect(() => {
    fetchChildren();
  }, [fetchChildren]);

  const superClientOptions = children.map(item => ({
    value: item.id,
    label: item.org_name
  }));

  const onSubmit = async (data: Inputs) => {
    setIsLoading(true);
    const formData = new FormData();
    if (data?.files?.EXCEL_FILE && data?.files?.EXCEL_FILE?.length > 0) {
      formData.append('file', data.files.EXCEL_FILE[0]);
    }
    if (superRequire && data.cl_org_id) {
      formData.append('cl_org_id', data.cl_org_id);
    }

    try {
      console.log("Submitting form data to /repossession/upload/vehicles", data);
      const response = await axiosInstance.post("/repossession/upload/vehicles", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Response received:", response);
      toast.success(response?.data?.message);
      reset();
     
    } catch (error) {
      const errorMessages = error?.response?.data?.message;
      if (Array.isArray(errorMessages)) {
        errorMessages.forEach((msg) => {
          toast.error(msg);
        });
      } else {
        toast.error(error?.response?.data?.message);
      }
      console.error("Error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 rounded-lg space-y-8">
      <form
        className="space-y-6"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        {superRequire && (
          <SelectComponent
            label="Select Organisation"
            name="cl_org_id"
            options={superClientOptions}
            register={register}
            errors={errors}
            defaultValue=""
            required={true}
          />
        )}
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
            disabled={isLoading}
          >
            {isLoading ? 'Uploading...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMultipleVehicle;
