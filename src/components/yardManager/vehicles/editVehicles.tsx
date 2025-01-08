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
} from "@/components/ui/fromFields";

import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loading from "@/app/(home)/(superAdmin)/loading";
import { vehicleStatus } from "@/utils/staticData";
import Image from "next/image";

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
  start_condition: string;
  reg_number: string;
  eng_number: string;
  chasis_number: string;
  odometer: string;
  board_type: string;
  rc_available: string;
  key_count: string;
};

type FileInputs = {
  [key: string]: FileList;
};

const EditIndividualVehicle = ({ vehicleId }) => {
  const [vehicleImage, setVehicleImage] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [vehicleCategory, setAllVehicleCategory] = useState([]);
  const [uploadImages, setUploadImages] = useState<FileInputs>({});

  const [previewImages, setPreviewImages] = useState<Record<string, string[]>>(
    {}
  );
  const [images, setImages] = useState<Record<string, ImageType[]>>({});

  useEffect(() => {
    const categorizedImages = vehicleImage.reduce<Record<string, ImageType[]>>(
      (acc, item) => {
        if (!acc[item.img_type]) {
          acc[item.img_type] = [];
        }
        acc[item.img_type].push({
          id: item.id,
          image_type: item.img_type,
          src: item.img_src,
          updated_at: item.updated_at,
        });
        return acc;
      },
      {}
    );

    setImages(categorizedImages);
  }, [vehicleImage]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Inputs>();
  const router = useRouter();

  const fetchVehicle = async () => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.get(
        `/vehicle/${vehicleId?.vehicleId}`
      );

      const destructuredData = {
        ...response?.data?.res,
        app_entry_date: response?.data?.res?.app_entry_date?.split("T")[0],
        app_exit_date: response?.data?.res?.app_exit_date?.split("T")[0],
        mfg_year: response?.data?.res?.mfg_year.split("T")[0],
        actual_entry_date:
          response?.data?.res?.actual_entry_date?.split("T")[0],
        actual_exit_date: response?.data?.res?.actual_exit_date?.split("T")[0],
      };

      setVehicleImage(response?.data?.res?.vehicle_img);
      console.log("the rsponse", response);
      reset(destructuredData);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const FetchAllVehicleCategory = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/vehicle/cat`);
      setAllVehicleCategory(response?.data?.vehicleCategory);
    } catch (error) {
      console.log("error from vehiclecat", error);
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

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    imageType: string,
    index: number
  ) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    setUploadImages((prevImages) => ({
      ...prevImages,
      [imageType]: selectedFiles,
    }));

    // Preview selected images
    const selectedFilesArray = Array.from(selectedFiles);
    const previewUrls = selectedFilesArray.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviewImages((prevImages) => ({
      ...prevImages,
      [imageType]: previewUrls,
    }));
  };

  const editImage = useCallback(
    async (data: Inputs) => {
      const formData = new FormData();
      console.log("formdata1:" + JSON.stringify(formData));
      const vehicleImgArray = Object.entries(uploadImages).flatMap(
        ([imageType, files]) => {
          return Array.from(files).map((file, index) => ({
            id: images[imageType]?.[index]?.id || "",
            img_type: imageType,
            img_src: images[imageType]?.[index]?.src || "",
            file: file,
          }));
        }
      );

      vehicleImgArray.forEach((img, index) => {
        formData.append(`vehicle_img[${index}][id]`, img.id);
        formData.append(`vehicle_img[${index}][img_type]`, img.img_type);
        formData.append(`vehicle_img[${index}][img_src]`, img.img_src);
        if (img.file) {
          formData.append(`vehicle_img[${index}][file]`, img.file);
        }
      });
      console.log("formdata2:" + JSON.stringify(formData));
      const modifiedData = {
        ...data,

        app_entry_date: data?.app_entry_date
          ? new Date(data?.app_entry_date)?.toISOString()
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

      Object.entries(modifiedData).forEach(([key, value]) => {
        if (key !== "vehicle_img" && value !== undefined) {
          formData.append(key, value);
        }
      });
      console.log(vehicleImgArray);
      console.log("formdata3:" + JSON.stringify(formData));

      try {
        const response = await axiosInstance.put(
          `/vehicle/${vehicleId?.vehicleId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            maxBodyLength: Infinity,
          }
        );

        fetchVehicle();
        toast.success(response?.data?.message);
      } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log(error?.response);
      }
    },
    [vehicleId?.vehicleId, uploadImages, images]
  );

  if (isLoading) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 lg:py-6  lg:px-8   sm:px-3 sm:py-3 ">
      <div className="lg:max-w-6xl w-full space-y-8 lg:p-10 p-3 bg-white rounded-xl shadow-lg">
        <h2 className="text-center md:text-2xl font-extrabold text-gray-900">
          Vehicle Details
        </h2>

        <form onSubmit={handleSubmit(editImage)} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 place-items-center">
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
              label="Actual Entry Date"
              type="date"
              name="actual_entry_date"
              register={register}
              errors={errors}
              pattern
              disabled ={true}
            />
            <InputField
              label="App Entry Date"
              type="date"
              name="app_entry_date"
              register={register}
              errors={errors}
              pattern
              disabled ={true}
            />
            <InputField
              label="App Exit Date"
              type="date"
              required={false}
              name="app_exit_date"
              register={register}
              errors={errors}
              pattern
              disabled ={true}
            />
            <InputField
              label="Actual Exit Date"
              required={false}
              type="date"
              name="actual_exit_date"
              register={register}
              errors={errors}
              pattern
              disabled ={true}
            />

            <DateField
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
          </div>

          <div className="grid grid-cols-2 gap-2">
            {Object.entries(images).map(([imageType, imageList]) => (
              <div
                key={imageType}
                className="border rounded-lg shadow-xl border-black"
              >
                <h2 className="text-center text-lg font-semibold">
                  {imageType
                    .replace("_", " ")
                    .toLowerCase()
                    .replace(/\b(\w)/g, (s) => s.toUpperCase())}
                  
                </h2>

                {imageList?.map((img, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center pb-4 mt-3"
                  >
                    {previewImages[imageType]?.[index] ? (
                      <Image
                        className="rounded-xl mb-2 h-56"
                        src={previewImages[imageType][index]}
                        alt={`${imageType} ${index}`}
                        width={400}
                        height={400}
                      />
                    ) : (
                      <Image
                        className="rounded-xl mb-2 h-56"
                        src={
                          typeof img === "string"
                            ? `${img} `
                            : `${img.src}? v=${img?.updated_at} `
                        }
                        alt={`${imageType} ${index}`}
                        width={400}
                        height={400}
                      />
                    )}
                    <input
                      className="mt-1 pl-14 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      type="file"
                      onChange={(e) => handleImageUpload(e, imageType, index)}
                    />
                  </div>
                ))}
                <div className="flex flex-wrap gap-4 mt-2"></div>
              </div>
            ))}
          </div>
          <div className="w-full  text-center space-x-4">
          <button
           onClick={()=>window.close()}
            type="button"
            className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg shadow-md hover:bg-red-700 transition duration-300"
          >
            Cancel
          </button>
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

export default EditIndividualVehicle;
