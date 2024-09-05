"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FileUploadInput, {
  DateField,
  FormFieldInput,
  ImageMaping,
  InputField,
  RadioButtonInput,
  SelectComponent,
  SelectInput,
  TextArea,
  ThreeDayDate,
} from "@/components/ui/fromFields";

import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loading from "@/app/(home)/(superAdmin)/loading";
import { vehicleStatus } from "@/utils/staticData";
import Image from "next/image";
// import { log } from "console";
interface ImageData {
  img_type: string;
  img_src: string;
  img_name: string;
  id: string;
  updated_at: string;
}

interface ImageType {
  src: string;
  image_type: string;
  id: string;
  updated_at: string;
}

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
  id: string;
  is_in_vehicle_table: boolean; // false
  yard_id: string;
  cl_org_id: string;
  cl_org: {
    org_name: string;
  };

  repo_vehicle: {
    vehicle_category_id: string;
    vehicle_category: {
      name: string;
    };
    loan_number: string;
    actual_entry_date: string;
    app_entry_date: string;
    app_exit_date: string;
    actual_exit_date: string;
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
    odometer: number;
    board_type: string;
    rc_available: string;
    key_count: number;
  };

  files: FileInputs;
};
type User = {
  code: string;
  name: string;
};

type ClOrg = {
  code: string;
  org_name: string;
  cl_org_id: string;
};

type VehicleCategory = {
  name: string;
  vehicle_category_id: string;
};

type RepoVehicle = {
  cl_org_id: string;
  cl_org: {
    org_name: string;
  };
  expected_entry_date: string; // ISO date string
  id: string;
  actual_entry_date: string;
  app_entry_date: string;
  app_exit_date: string;
  actual_exit_date: string;
  vehicle_category_id: string;
  vehicle_category: {
    name: string;
  };
  variant: string;
  colour: string;
  condition: string;
  start_condition: string;

  odometer: number;
  board_type: string;
  rc_available: string;
  key_count: number;
  chasis_number: string;
  code: string;
  eng_number: string;
  is_in_vehicle_table: boolean;
  loan_number: string;
  make: string;
  mfg_year: string;
  model: string;
  reg_number: string;
  repo_by_user_org: {
    user: User;
  };
  status: string;
  files: FileInputs;
};

// type ApiResponse = {
//   expected_entry_date: string; // ISO date string
//   id: string;
//   repo_vehicle: RepoVehicle;
//   files: FileInputs;

// };

const IndividualEntryPending = ({ pendingVehId }) => {
  // console.log(pendingVehId?.PendingVehId);

  const [isLoading, setIsLoading] = useState(true);
  const [vehicleCategory, setAllVehicleCategory] = useState([]);
  const [FormDatas, setFormDatas] = useState<RepoVehicle>();
  const [vehicleData, setVehicleData] = useState<RepoVehicle>();
  const [clientLevelOrg, setClientLevelOrg] = useState([]);
  const [previewImages, setPreviewImages] = useState<Record<string, string[]>>(
    {}
  );
  const [images, setImages] = useState<Record<string, ImageType[]>>({});

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<RepoVehicle>();
  const router = useRouter();

  const fetchVehicle = async () => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.get(
        `/repo_yard/vehicle/entry/${pendingVehId?.PendingVehId}`
      );

      console.log("response fsrom fech vehi", response);

      const destructuredData = {
        ...response?.data?.res?.repo_vehicle,
        mfg_year: response?.data?.res?.repo_vehicle?.mfg_year?.split("T")[0],
        vehicle_category:
          response?.data?.res?.repo_vehicle?.vehicle_category?.name,
      };
      // console.log("destructuredData", destructuredData);

      setVehicleData(response?.data?.res);
      reset(destructuredData);
      setFormDatas(destructuredData);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log("vehicleData", vehicleData);

  const FetchAllVehicleCategory = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/vehicle/cat`);
      setAllVehicleCategory(response?.data?.vehicleCategory);
    } catch (error) {
      console.log("error from vehiclecat", error);
    }
  }, []);
  const FetchClientLevelOrgs = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/clientorg/client_lvl_org`);
      // console.log("response", response);

      setClientLevelOrg(response?.data?.res?.clientLevelOrg);
      // toast.success("Client level Organisations fetched successfully");
    } catch (error) {
      console.log("error", error);

      // toast.error("Failed to fetch client level Organisations");
    }
  }, []);

  useEffect(() => {
    fetchVehicle();
    FetchAllVehicleCategory();
    FetchClientLevelOrgs();
  }, []);

  const vehicleCategorys = vehicleCategory?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const ClientOrganisations = clientLevelOrg?.map((item) => ({
    value: item.id,
    label: item.org_name,
  }));

  // console.log("ClientOrganisations", ClientOrganisations);

  const AddVehicle = useCallback(async (data: RepoVehicle) => {
    console.log("data on submit", data);

    setIsLoading(true);
    const formData = new FormData();
    const actual_entry_date = data?.actual_entry_date
      ? new Date(data?.actual_entry_date).toISOString()
      : null;

    const mfg_year = data?.mfg_year
      ? new Date(data?.mfg_year).toISOString()
      : null;

    const dataUpperCase = {
      ...data,
      repo_veh_yard_req_id: pendingVehId?.PendingVehId,

      vehicle_category_id: data?.vehicle_category_id,
      loan_number: data?.loan_number,
      actual_entry_date: actual_entry_date,
      mfg_year: mfg_year,
      make: data?.make,
      model: data?.model,
      variant: data?.variant,
      condition: data?.condition,
      start_condition: data?.start_condition,
      reg_number: data?.reg_number,
      eng_number: data?.eng_number,
      chasis_number: data?.chasis_number,
      odometer: data?.odometer,
      board_type: data?.board_type,
      rc_available: data?.rc_available,
      key_count: data?.key_count,
    };
    // /   // Create a FormData object

    console.log("dataUpperCase", dataUpperCase);

    // Append each key-value pair to the FormData object
    for (const key in dataUpperCase) {
      formData.append(key, dataUpperCase[key]);
    }

    // Utility function to append files to FormData
    const appendFiles = (files: FileList, fieldName: string) => {
      // console.log(`Appending files for field: ${fieldName}`);
      // console.log(files);

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

    // console.log("formdata",formData);

    try {
      console.log("Submitting form data to /vehicle/create");
      const response = await axiosInstance.post("/vehicle/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        maxBodyLength: Infinity,
      });
      // console.log("Response received:", response);
      toast.success(response?.data?.message);
      reset(FormDatas);
      router.push("/yardEntryPendingVehicles");
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
        <Loading />
      </div>
    );
  }

  // console.log("9090909090", vehicleData?.cl_org?.org_name);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <h2 className="text-center md:text-2xl font-extrabold text-gray-900">
          Vehicle Details
        </h2>

        <form onSubmit={handleSubmit(AddVehicle)} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 place-items-center">
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
              label="Loan Number"
              type="text"
              name="loan_number"
              register={register}
              errors={errors}
              pattern
            />

            <InputField
              label="Loan Number"
              type="text"
              name="loan_number"
              register={register}
              errors={errors}
              pattern
              required={true}
            />
            <ThreeDayDate
              label="Actual Entry Date"
              type="date"
              name="actual_entry_date"
              register={register}
              errors={errors}
              pattern
              required={true}
            />
            {/* <InputField
              label="App Entry Date"
              type="date"
              name="app_entry_date"
              register={register}
              errors={errors}
              pattern
              required={true}
            /> */}

            <DateField
              label="Manufacturing Date"
              type="date"
              name="mfg_year"
              register={register}
              errors={errors}
              pattern
              required={true}
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
              required={true}
            />
            <InputField
              label="Colour"
              type="text"
              name="colour"
              register={register}
              errors={errors}
              pattern
            />
            <InputField
              label="Condition"
              type="text"
              name="condition"
              register={register}
              errors={errors}
              pattern
            />

            <div>
              <SelectComponent
                label="Start Condition"
                name="start_condition"
                options={vehicleStatus}
                register={register}
                errors={errors}
                defaultValue=""
                required={true}
              />
            </div>
            <InputField
              label="Registration Number"
              type="text"
              name="reg_number"
              register={register}
              errors={errors}
              pattern
              required={true}
            />

            <InputField
              label="Engine Number"
              type="text"
              name="eng_number"
              register={register}
              errors={errors}
              pattern
            />

            <InputField
              label="Chassis Number"
              type="text"
              name="chasis_number"
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
            />

            <InputField
              label="Odometer"
              type="number"
              name="odometer"
              register={register}
              errors={errors}
              pattern
              required={true}
            />

            {/* <InputField
              label="Board Type"
              type="text"
              name="board_type"
              register={register}
              errors={errors}
              pattern
            /> */}
            <div className="justify-self-center">
              <RadioButtonInput
                label="RC Available"
                type="radio"
                name="rc_available"
                register={register}
                error={errors}
                defaultValue=""
                placeholder=""
                required={false}
              />
            </div>

            <InputField
              label="Key Count"
              type="number"
              name="key_count"
              register={register}
              errors={errors}
              pattern
              required={true}
            />
            <div className="col-span-3  w-full ">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 place-items-center ">
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
            </div>
          </div>

          <div className="">
            <div className="text-center space-x-6">
            <button
                type="button"
                onClick={()=>{
                  window.close()
                }}
                className=" px-6 py-2 bg-red-600  text-white font-medium rounded-lg shadow-md hover:bg-red-700 transition duration-300 "
              >
                Cancel
              </button>
              <button
                type="submit"
                className=" px-6 py-2 bg-blue-600  text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300 "
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IndividualEntryPending;
