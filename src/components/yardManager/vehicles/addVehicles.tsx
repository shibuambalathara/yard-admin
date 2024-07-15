"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import {
  SelectComponent,
  InputField,
  ImageMaping,
  RadioButtonInput,
  FileUploadInput,
} from "@/components/ui/fromFields";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
import { vehicleStatus } from "@/utils/staticData";
import DataLoading from "@/components/commonComponents/spinner/DataFetching";
import Spinner from "@/components/commonComponents/spinner/spinner";
import { useRouter } from "next/navigation";

const AddVehicle = () => {
  const [clientLevelOrg, setClientLevelOrg] = useState([]);
  const [vehicleCategory, setAllVehicleCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router=useRouter()

  type FileInputs = {
    FRONT_IMAGE: FileList;
    BACK_IMAGE: FileList;
    RIGHT_IMAGE: FileList;
    LEFT_IMAGE: FileList;
    ODOMETER_IMAGE: FileList;
    INTERIOR_IMAGE: FileList;
    OTHER_IMAGE: FileList;
  };
  type Inputs = {
    cl_org_id: string;
    vehicle_category_id: string;
    loan_number: string;
    actual_entry_date: string;
    mfg_year: string;
    make: string;
    model: string;
    variant: string;
    colour: string;
    condition: string;
    start_condition: string;
    reg_number: string;
    eng_number: string;
    chasis_number: string;
    odometer: string;
    board_type: string;
    rc_available: string;
    key_count: string;
    files: FileInputs; // Files property containing images
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>(
  //   {
  //   defaultValues: {
  //     cl_org_id: "STRING",
  //     vehicle_category_id: "STRING",
  //     loan_number: "STRING316",
  //     actual_entry_date: "STRING",
  //     mfg_year: "STRING",
  //     make: "STRING",
  //     model: "STRING",
  //     variant: "STRING",
  //     colour: "STRING",
  //     condition: "STRING",
  //     start_condition: "STRING",
  //     reg_number: "KL12GG5698",
  //     eng_number: "STRING",
  //     chasis_number: "STRING",
  //     odometer: "STRING",
  //     board_type: "STRING",
  //     rc_available: "STRING",
  //     key_count: "STRING",
  //   },
  // }
);

  const FetchClientLevelOrgs = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/clientorg/client_lvl_org`);
      setClientLevelOrg(response?.data?.res?.clientLevelOrg);
      // toast.success("Client level Organisations fetched successfully");
    } catch (error) {
      console.log("error",error);
      
      // toast.error("Failed to fetch client level Organisations");
    }
  }, []);

  const FetchAllVehicleCategory = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/Vehicle/cat`);
      setAllVehicleCategory(response?.data?.vehicleCategory);
      reset();
      // toast.success("Vehicle categories fetched successfully");
    } catch (error) {
      // toast.error("Failed to fetch vehicle categories");
      console.log("error",error);
      
    }
  }, []);

  const ClientOrganisations = clientLevelOrg?.map((item) => ({
    value: item.id,
    label: item.cl_org_name,
  }));

  const vehicleCategorys = vehicleCategory?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  useEffect(() => {
    FetchAllVehicleCategory();
    FetchClientLevelOrgs();
  }, [FetchAllVehicleCategory, FetchClientLevelOrgs]);

  const AddVehicle = useCallback(async (data: Inputs) => {
    console.log('data on submit',data);
    
    setIsLoading(true);
    const formData = new FormData();
    const actual_entry_date = data?.actual_entry_date ? new Date(data?.actual_entry_date).toISOString() : null;
    console.log("actual entry date", actual_entry_date);
     const mfg_year =data?.mfg_year ? new Date(data?.mfg_year).toISOString() : null;
    

    // Append other form data fields
    const dataUpperCase = {
      ...data,
      cl_org_id: data.cl_org_id,
      vehicle_category_id: data.vehicle_category_id,
      loan_number: data.loan_number,
      actual_entry_date: actual_entry_date,
      mfg_year: mfg_year,
      make: data.make,
      model: data.model,
      variant: data.variant,
      colour: data.colour,
      condition: data.condition,
      start_condition: data.start_condition,
      reg_number: data.reg_number,
      eng_number: data.eng_number,
      chasis_number: data.chasis_number,
      odometer: data.odometer,
      board_type: data.board_type,
      rc_available: data.rc_available,
      key_count: data.key_count,
    };
    // /   // Create a FormData object

    console.log("dataUpperCase",dataUpperCase);
    
    // Append each key-value pair to the FormData object
    for (const key in dataUpperCase) {
      formData.append(key, dataUpperCase[key]);
    }

    // Utility function to append files to FormData
    const appendFiles = (files: FileList, fieldName: string) => {
      console.log(`Appending files for field: ${fieldName}`);
      console.log(files);

      // Convert FileList to array
      const filesArray = Array.from(files);

      filesArray.forEach((file) => {
        formData.append(fieldName, file);
      });
    };

    // Append files to FormData
    appendFiles(data.files.FRONT_IMAGE, "FRONT_IMAGE");
    appendFiles(data.files.BACK_IMAGE, "BACK_IMAGE");
    appendFiles(data.files.RIGHT_IMAGE, "RIGHT_IMAGE");
    appendFiles(data.files.LEFT_IMAGE, "LEFT_IMAGE");
    appendFiles(data.files.ODOMETER_IMAGE, "ODOMETER_IMAGE");
    appendFiles(data.files.INTERIOR_IMAGE, "INTERIOR_IMAGE");
    appendFiles(data.files.OTHER_IMAGE, "OTHER_IMAGE");

    console.log("formdata",formData);
    

    try {
      console.log("Submitting form data to /vehicle/create");
      const response = await axiosInstance.post("/vehicle/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        maxBodyLength: Infinity,
      });
      console.log("Response received:", response);
      toast.success(response?.data?.message);
      reset()
      router.push("/vehicle")
      // router.push('/vehicle')
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
  }, []);

  if (isLoading) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <DataLoading/>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-extrabold text-gray-900">
          Add Vehicle Details
        </h2>
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit(AddVehicle)}
          encType="multipart/form-data"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
            <div>
              <SelectComponent
                label="Select Organisation"
                name="cl_org_id"
                options={ClientOrganisations}
                register={register}
                errors={errors}
                defaultValue=""
              />
            </div>
            <div>
              <SelectComponent
                label="Select Category"
                name="vehicle_category_id"
                options={vehicleCategorys}
                register={register}
                errors={errors}
                defaultValue=""
              />
            </div>

            <InputField
              label="Loan No"
              type="text"
              name="loan_number"
              register={register}
              errors={errors}
              pattern
            />
            <InputField
              label="Actual Entry Date"
              type="date"
              name="actual_entry_date"
              register={register}
              errors={errors}
              pattern
            />

            <InputField
              label="Manufacturing Date"
              type="date"
              name="mfg_year"
              register={register}
              errors={errors}
              pattern
            />

            <InputField
              label="Make"
              type="text"
              name="make"
              register={register}
              errors={errors}
              pattern
            />
            <InputField
              label="Model"
              type="text"
              name="model"
              register={register}
              errors={errors}
              pattern
            />
            <InputField
              label="Variant"
              type="text"
              name="variant"
              register={register}
              errors={errors}
              pattern
            />
            <InputField
              label="Colour"
              type="text"
              name="colour"
              register={register}
              errors={errors}
              required={false}
              pattern
            />
            <InputField
              label="Condition"
              type="text"
              name="condition"
              register={register}
              errors={errors}
              pattern
              required={false}
            />

            <div>
              <SelectComponent
                label="Start Condition"
                name="start_condition"
                options={vehicleStatus}
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
              />
            </div>
            <InputField
              label="Registration Number"
              type="text"
              name="reg_number"
              register={register}
              errors={errors}
              pattern
            />

            <InputField
              label="Engine No"
              type="text"
              name="eng_number"
              register={register}
              errors={errors}
              pattern
            />

            <InputField
              label="Chassis No"
              type="text"
              name="chasis_number"
              register={register}
              errors={errors}
              pattern
            />
            

            <InputField
              label="Odometer"
              type="number"
              name="odometer"
              register={register}
              errors={errors}
              pattern
            />

            <InputField
              label="Board Type"
              type="text"
              name="board_type"
              register={register}
              errors={errors}
              pattern
              required={false}

            />

            <div className="">
            <RadioButtonInput
              label="RC Available"
              type="radio"
              name="rc_available"
              register={register}
              error={errors}
              defaultValue=""
              placeholder=""
            />
            </div>

            <InputField
              label="Key Count"
              type="number"
              name="key_count"
              register={register}
              errors={errors}
              pattern
            />
            <FileUploadInput
              label="Front image"
              name="files.FRONT_IMAGE" // Accessing FRONT_IMAGE from files
              register={register}
              accept="image/*"
            
            />
            <FileUploadInput
              label="Back image"
              name="files.BACK_IMAGE" // Accessing BACK_IMAGE from files
              register={register}
              accept="image/*"
           
            />
            <FileUploadInput
              label="Right image"
              name="files.RIGHT_IMAGE" // Accessing RIGHT_IMAGE from files
              register={register}
              accept="image/*"
             
            />
            <FileUploadInput
              label="Left image"
              name="files.LEFT_IMAGE" // Accessing LEFT_IMAGE from files
              register={register}
              accept="image/*"
            
            />
            <FileUploadInput
              label="Odometer image"
              name="files.ODOMETER_IMAGE" // Accessing ODOMETER_IMAGE from files
              register={register}
              accept="image/*"
             
            />
            <FileUploadInput
              label="Interior image"
              name="files.INTERIOR_IMAGE" // Accessing INTERIOR_IMAGE from files
              register={register}
              accept="image/*"
              
            />
            <FileUploadInput
              label="Other image"
              name="files.OTHER_IMAGE" // Accessing OTHER_IMAGE from files
              register={register}
              accept="image/*"
              
            />
          </div>

          <div className="mt-6">
            <ImageMaping images="" />
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
    </div>
  );
};

export default AddVehicle;
