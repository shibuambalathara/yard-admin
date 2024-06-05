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

const AddVehicle = () => {
  const [clientLevelOrg, setClientLevelOrg] = useState([]);
  const [vehicleCategory, setAllVehicleCategory] = useState([]);

  type Inputs = {
    yard_id: string;
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
    FRONT_IMAGE: File[] | null; // Array of File objects representing front images
    BACK_IMAGE: File[] | null; // Array of File objects representing back images
    RIGHT_IMAGE: File[] | null; // Array of File objects representing right images
    LEFT_IMAGE: File[] | null; // Array of File objects representing left images
    ODOMETER_IMAGE: File[] | null; // Array of File objects representing odometer images
    INTERIOR_IMAGE: File[] | null; // Array of File objects representing interior images
    OTHER_IMAGE: File[] | null; // Array of File objects representing other images
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const FetchClientLevelOrgs = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/clientorg/client_lvl_org`);
      setClientLevelOrg(response?.data?.res?.clientLevelOrg);
      toast.success("Client level organizations fetched successfully");
    } catch (error) {
      toast.error("Failed to fetch client level organizations");
    }
  }, []);

  const FetchAllVehicleCategory = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/Vehicle/cat`);
      setAllVehicleCategory(response?.data?.vehicleCategory);
      reset();
      toast.success("Vehicle categories fetched successfully");
    } catch (error) {
      toast.error("Failed to fetch vehicle categories");
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

  const AddVehcile = useCallback(async (data: Inputs) => {
    console.log("data of adding vehciel", data);

    const actual_entry_date = new Date(data?.actual_entry_date).toISOString();
    const mfg_year = new Date(data?.mfg_year).toISOString();

    const modifiedData = {
      ...data,
      actual_entry_date,
      mfg_year,
    };

    try {
      const response = await axiosInstance.post(
        "/vehicle/create",
        modifiedData
      );
      console.log("response of creating vehicle",response);

      toast.success(response?.data?.res?.message);
    } catch (error) {
        console.log(error);
        
      toast.error(error?.response?.data?.message);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-extrabold text-gray-900">
          Add Vehicle Details
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(AddVehcile)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
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
              type="number"
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
            <InputField
              label="Start Condition"
              type="text"
              name="start_condition"
              register={register}
              errors={errors}
              pattern
            />
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
            />

            <InputField
              label="Board Type"
              type="text"
              name="board_type"
              register={register}
              errors={errors}
              pattern
            />

            <RadioButtonInput
              label="RC Available"
              type="radio"
              name="rc_available"
              register={register}
              error={errors}
              defaultValue=""
              placeholder=""
            />

            <InputField
              label="Key Count"
              type="text"
              name="key_count"
              register={register}
              errors={errors}
              pattern
            />
            <FileUploadInput
              label="Front Images"
              name="FRONT_IMAGE"
              register={register}
              accept="image/*"
              multiple
            />
            <FileUploadInput
              label="Back Images"
              name="BACK_IMAGE"
              register={register}
              accept="image/*"
              multiple
            />
            <FileUploadInput
              label="Right Images"
              name="RIGHT_IMAGE"
              register={register}
              accept="image/*"
              multiple
            />
            <FileUploadInput
              label="left Images"
              name="LEFT_IMAGE"
              register={register}
              accept="image/*"
              multiple
            />
            <FileUploadInput
              label="Odometer Images"
              name="ODOMETER_IMAGE"
              register={register}
              accept="image/*"
              multiple
            />
            <FileUploadInput
              label="Interior Images"
              name="INTERIOR_IMAGE"
              register={register}
              accept="image/*"
              multiple
            />
            <FileUploadInput
              label="Other Images"
              name="OTHER_IMAGE"
              register={register}
              accept="image/*"
              multiple
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
