"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FileUploadInput, {
  FormFieldInput,
  ImageMaping,
  InputField,
  RadioButtonInput,
  SelectComponent,
  SelectInput,
  TextArea,
} from "@/components/ui/fromFields";
import { formStyle } from "@/components/ui/style";

import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loading from "@/app/(home)/(superAdmin)/loading";
import { vehicleStatus } from "@/utils/staticData";

interface ImageData {
  img_type: string;
  img_src: string;
  img_name: string;
}
interface ImageType {
  src: string;
  name: string;
}
type Inputs = {
  yard_id: string;
  cl_org_id: string;
  vehicle_category_id: string;
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
  Start_condition: string;
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

const EditIndividualVehicle = ({ vehicleId }) => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [vehiclecategoryData, setVehicleCategoryData] = useState(null);
  const [vehicleImage, setVehicleImage] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [clientLevelOrg, setClientLevelOrg] = useState([]);
  const [vehicleCategory, setAllVehicleCategory] = useState([]);

  const [images, setImages] = useState<Record<string, ImageType[]>>({});

  useEffect(() => {
    const categorizedImages = vehicleImage.reduce<Record<string, ImageType[]>>(
      (acc, item) => {
        if (!acc[item.img_type]) {
          acc[item.img_type] = [];
        }
        acc[item.img_type].push({ src: item.img_src, name: item.img_name });
        return acc;
      },
      {}
    );

    setImages(categorizedImages);
  }, [vehicleImage]);

  // console.log('images',images);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Inputs>();
  const router = useRouter();

  const sliderSettings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const fetchVehicle = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/vehicle/${vehicleId?.vehicleId}`
      );

      console.log("fetched data of vechicle", response?.data?.res);

      const destructuredData = {
        ...response?.data?.res,
        app_entry_date: response?.data?.res?.app_entry_date?.split("T")[0],
        app_exit_date: response?.data?.res?.app_entry_date?.split("T")[0],
        mfg_year: response?.data?.res?.mfg_year.split("T")[0],
        actual_entry_date:
          response?.data?.res?.actual_entry_date?.split("T")[0],
        actual_exit_date: response?.data?.res?.actual_exit_date?.split("T")[0],
      };

      console.log("data", destructuredData);
      // console.log("vehicle", response);
      setVehicleCategoryData(response?.data?.res);
      setVehicleImage(response?.data?.res?.vehicle_img);
      reset(destructuredData);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const FetchAllVehicleCategory = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/Vehicle/cat`);

      setAllVehicleCategory(response?.data?.vehicleCategory);

      // console.log("resposne of vehicle category", response);
      // reset();
  
    } catch (error) {
      console.log("error from vehiclecat", error);
      //   toast.error(error?.me);
    }
  }, []);

  useEffect(() => {
    fetchVehicle();
    FetchAllVehicleCategory();
  }, []);

  const vehicleCategorys = vehicleCategory?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const ClientOrganisations = clientLevelOrg?.map((item) => ({
    value: item.id,
    label: item.cl_org_name,
  }));
  //  console.log('org',ClientOrganisations);

  const editVehicle = useCallback(
    async (data: Inputs) => {
     

      console.log("data on submit", data);

      const modifiedData = {
        ...data,
        app_entry_date: data?.app_entry_date
          ?new Date(data?.app_entry_date)?.toISOString()
          : null,
        app_exit_date: data?.app_exit_date
          ? new Date(data?.app_exit_date)?.toISOString()
          : null,
        mfg_year: data?.mfg_year
          ? new Date(data?.mfg_year)?.toISOString()
          : null,
        actual_entry_date: data?.actual_entry_date
          ? new Date(data?.actual_entry_date)?.toISOString()
          : null,
        actual_exit_date: data?.actual_exit_date
          ? new Date(data?.actual_exit_date)?.toISOString()
          : null,
      };
      console.log("destructure", modifiedData);

      try {
        const response = await axiosInstance.put(
          `/vehicle/${vehicleId?.vehicleId}`,
          modifiedData
        );
        console.log("res", response);

        toast.success(response?.data?.message);
        router.push("/vehicle")
      } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log(error);
      }
    },
    [vehicleId?.vehicleId]
  );

 

  if (isLoading) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-extrabold text-gray-900">
          Vehicle Details
        </h2>

        <form onSubmit={handleSubmit(editVehicle)} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 place-items-center">
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
              label="Actuall Entry Date"
              type="date"
              name="actual_entry_date"
              register={register}
              errors={errors}
              pattern
            />
            <InputField
              label="App Entry Date"
              type="date"
              name="app_entry_date"
              register={register}
              errors={errors}
              pattern
            />
            <InputField
              label="App Exit Date"
              type="date"
              required={false}
              name="app_exit_date"
              register={register}
              errors={errors}
              pattern
            />
            <InputField
              label="Actual Exit Date"
              required={false}
              type="date"
              name="actual_exit_date"
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

            <div>
              <SelectComponent
                label="Start Condition"
                name="start_condition"
                options={vehicleStatus}
                register={register}
                errors={errors}
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
            <div className="justify-self-center">
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
              label="Front Images"
              name="FRONT_IMAGE"
              register={register}
              accept="image/*"
              
            />
            <FileUploadInput
              label="Back Images"
              name="BACK_IMAGE"
              register={register}
              accept="image/*"
              
            />
            <FileUploadInput
              label="Right Images"
              name="RIGHT_IMAGE"
              register={register}
              accept="image/*"
              
            />
            <FileUploadInput
              label="left Images"
              name="LEFT_IMAGE"
              register={register}
              accept="image/*"
              
            />
            <FileUploadInput
              label="Odometer Images"
              name="ODOMETER_IMAGE"
              register={register}
              accept="image/*"
              
            />
            <FileUploadInput
              label="Interior Images"
              name="INTERIOR_IMAGE"
              register={register}
              accept="image/*"
              
            />
            <FileUploadInput
              label="Other Images"
              name="OTHER_IMAGE"
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
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(images).map(([imageType, imageList]) => (
            <div
              key={imageType}
              className="border rounded-lg shadow-xl border-black  "
            >
              <h2 className="text-center text-lg font-semibold">
                {imageType
                  .replace("_", " ")
                  .toLowerCase()
                  .replace(/\b(\w)/g, (s) => s.toUpperCase())}
                s
              </h2>
              {/* <Carousel>  */}
              {imageList?.map((image, index) => (
                <div
                  key={index}
                  className="flex justify-center pb-4 items-center"
                >
                  <img
                    className="rounded-xl"
                    src={image.src}
                    alt={`${imageType} ${index}`}
                    style={{ width: "70%" }}
                  />
                  {/* <p>{image.name}</p> */}
                </div>
              ))}
              {/* </Carousel>  */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditIndividualVehicle;
