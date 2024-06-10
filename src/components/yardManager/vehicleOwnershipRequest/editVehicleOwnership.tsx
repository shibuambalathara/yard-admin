"use client"
import { ImageMaping, InputField, RadioButtonInput, SelectComponent } from '@/components/ui/fromFields';
import axiosInstance from '@/utils/axios';
import { vehicleStatus } from '@/utils/staticData';
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
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
  req_date: string;
  res_by_ins_id: string;
  res_by_ins_type: string;
  res_by_user_id: string;
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
  ownership_status:string;
   status:string
   FRONT_IMAGE: File[] | null; // Array of File objects representing front images
   BACK_IMAGE: File[] | null; // Array of File objects representing back images
   RIGHT_IMAGE: File[] | null; // Array of File objects representing right images
   LEFT_IMAGE: File[] | null; // Array of File objects representing left images
   ODOMETER_IMAGE: File[] | null; // Array of File objects representing odometer images
   INTERIOR_IMAGE: File[] | null; // Array of File objects representing interior images
   OTHER_IMAGE: File[] | null; // Array of File objects representing other images
};


const EditVehicleOwnership = ({ownershipId}) => {
  
  const [clientLevelOrg, setClientLevelOrg] = useState([]);
  const [images, setImages] = useState<Record<string, ImageType[]>>({});
  const [vehicleImage, setVehicleImage] = useState<ImageData[]>([]);


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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Inputs>();

  console.log(ownershipId);
  
  const fetchVehicle = async () => {
  
  
   
    try {
      const response = await axiosInstance.get(
        `/ownership/${ownershipId?.vehicleOwnershipId}`
      );
      console.log(response);
      
      // console.log("fetched data of vechicle", response?.data?.res);

      const destructuredData = {
        ...response?.data?.res,
        ...response?.data?.res?.vehicle ,
        ownership_status:response?.data?.res?.status,
        app_entry_date: response?.data?.res?.vehicle?.app_entry_date?.split("T")[0],
        app_exit_date: response?.data?.res?.vehicle?.app_entry_date?.split("T")[0],
        mfg_year: response?.data?.res?.vehicle?.mfg_year.split("T")[0],
        actual_entry_date:
          response?.data?.res?.vehicle?.actual_entry_date?.split("T")[0],
        actual_exit_date: response?.data?.res?.vehicle?.actual_exit_date?.split("T")[0],
        status:response?.data?.res?.vehicle?.status
      };

      console.log("data", destructuredData);
     
     
      setVehicleImage(response?.data?.res?.vehicle?.vehicle_img);
      reset(destructuredData);
    } catch (error) {
      console.log("error", error);
    } finally {
      
    }
  };
 

  const FetchClientLevelOrgs = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/clientorg/client_lvl_org`);
      setClientLevelOrg(response?.data?.res?.clientLevelOrg);

      //   console.log("reponse of clientlevelorg ", response);

      toast.success("successs");
    } catch (error) {
      // console.log("error", error);
      toast.error(`something went wrong`);
    }
  }, []);

  useEffect(() => {
    fetchVehicle();
    FetchClientLevelOrgs()
  }, []);

  const editVehicle = useCallback(
    async (data: Inputs) => {
     
      
      console.log("data on submit", data.cl_org_id);

     
      
      try {
        const response = await axiosInstance.patch(
          `/ownership/re_assignment/${ownershipId?.vehicleOwnershipId}`,
         {cl_org_id: data?.cl_org_id}
        );
        console.log("res", response);

        toast.success(response?.data?.message);
      } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log(error);
      }
    },
    [ownershipId?.vehicleOwnershipId]
  );

  

  const ClientOrganisations = clientLevelOrg?.map((item) => ({
    value: item.id,
    label: item.cl_org_name,
  }));  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-extrabold text-gray-900">
          Vehicle Ownership
        </h2>

        <form onSubmit={handleSubmit(editVehicle)} className="mt-8 space-y-6">
        <div className='col-span-3  ml-8'>
              <SelectComponent
                label="Select Client"
                name="cl_org_id"
                options={ClientOrganisations}
                register={register}
                errors={errors}
                defaultValue=""
              />

             <InputField
              label="Ownership Status"
              type="text"
              name="ownership_status"
              register={register}
              errors={errors}
              pattern
            />
            </div>

            
            
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 place-items-center border mt-4 py-4">
            <h2 className='text-center text-xl font-semibold text-gray-900 col-span-3'> Vehicle Details</h2>
     
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
            {/* <InputField
              label="App Entry Date"
              type="date"
              name="app_entry_date"
              register={register}
              errors={errors}
              required={false}
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
            /> */}
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
              label="Vehicle Status"
              type="text"
              name="status"
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
            {/* <FileUploadInput
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
            /> */}
          </div>
          <div className="grid grid-cols-4  gap-4 col-span-3">
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
            
          ))}</div>

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
          {/* {Object.entries(images).map(([imageType, imageList]) => (
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
                
                </div>
              ))}
             
            </div>
          ))} */}
        </div>
      </div>
    </div>
  )
}

export default EditVehicleOwnership