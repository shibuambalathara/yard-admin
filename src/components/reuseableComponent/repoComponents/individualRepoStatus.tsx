"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FileUploadInput, {
  FormFieldInput,
  ImageMaping,
  InputField,
  RadioButtonInput,
  SelectChange,
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
import Link from "next/link";
import RepoRespond from "./modal/requestRespond";

import { Cities } from "@/utils/cities";

type Inputs = {
  repo_vehicle:
  {org_name: string;
    code: string;
    reg_number: string;}
     cl_org: string;
  end_date:string;
  initial_city: string;
  initial_state: string;
};

type FileInputs = {
  [key: string]: FileList;
};

const IndividualStatuss = (props) => {
  const{ vehicleId,user,disable }=props
  const [vehicleImage, setVehicleImage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [responseStatus, setResponseStatus] = useState('');
  const [uploadImages, setUploadImages] = useState<FileInputs>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [filtercitys, setFiltercitys] = useState([]);
  const [uniqueStates, setUniqueStates] = useState([]);
  const [selectState, setSelectState] = useState("");
  const [previewImages, setPreviewImages] = useState<Record<string, string[]>>(
    {}
  );
 console.log(vehicleId)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Inputs>();
  const router = useRouter();
  useEffect(() => {
    // Extract unique state names from Cities array
    const uniqueStates = Cities.reduce((acc, current) => {
      if (!acc.includes(current.state)) {
        acc.push(current.state);
      }
      return acc;
    }, []);

    setUniqueStates(uniqueStates);
  }, []); 




  useEffect(() => {
    if (selectState) {
      const stateData = Cities.filter((state) => state.state === selectState);
      setFiltercitys(stateData?.map((value) => value?.city));
    }
  }, [selectState]);

  const onClose=()=>{
    window.close()
    }



  const fetchVehicle = useCallback(async () => {
    try {
      setIsLoading(true);
  
      const endpoint =
        user === 'client'
          ? `/repossession/repo_veh_req/${vehicleId?.repoId}`
          : `/repossession/repo_veh_req/${vehicleId?.vehId}`;
      const response = await axiosInstance.get(endpoint);
      setResponseStatus(response?.data?.res?.status)
      const destructuredData = {
        cl_org: response?.data?.res?.repo_vehicle?.cl_org?.code,
        org_name: response?.data?.res?.repo_vehicle?.cl_org?.org_name,
        code: response?.data?.res?.repo_vehicle?.code,
        reg_number: response?.data?.res?.repo_vehicle?.reg_number,
        initial_city: response?.data?.res?.initial_city,
        initial_state: response?.data?.res?.initial_state,
        end_date:response?.data?.res?.end_date?.slice(0, 16),
      };
      console.log(response);
      setSelectState(destructuredData?.initial_state);
      setVehicleImage(response?.data?.res?.vehicle_img);
      reset( destructuredData );
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
      // Optionally, display an error message to the user
    } finally {
      setIsLoading(false);
    }
  }, [user, vehicleId, reset, setVehicleImage, setIsLoading]);
  useEffect(() => {
    fetchVehicle();
  }, []);
  const RepoReAssignment = async (data: Inputs) => {
    setIsLoading(true);
    try {
     

     
      
      const  modifiedData = {
          initial_city: data.initial_city,
          initial_state:data.initial_state
        };
      

      console.log( modifiedData);
      const response = await axiosInstance.patch(`repossession/repo_veh_req/update_request_repossession/${vehicleId?.vehId}`, modifiedData);
      console.log("Response:", response);
      toast.success(response?.data?.message);

      // fetchData();
      // onClose();
      // router.push('/requestedRepo');
    } catch (error) {
      console.error("Error:", error.response);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setSelectState(selectedState);

    setValue("initial_city", "");
  };

  if (isLoading) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  const handleModalAccept = () => {
    setModalOpen(true);
    setStatus('REPOSSESSION_APPROVED')
  };
  const handleModalReject = () => {
    setModalOpen(true);
    setStatus('REPOSSESSION_REJECTED')
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen flex items-start   justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-extrabold text-gray-900">
          Vehicle Details
        </h2>

        <form onSubmit={handleSubmit(RepoReAssignment)} className="mt-8 ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <InputField
              label="CL Org Code"
              type="text"
              name="cl_org"
              register={register}
              errors={errors}
              pattern
              disabled={true}
            />
            { user!=='client' &&(<InputField
              label="Org Name"
              type="text"
              name="org_name"
              register={register}
              errors={errors}
              pattern
              disabled={true}
            />)}
            
            <InputField
              label="Code"
              type="text"
              name="code"
              register={register}
              errors={errors}
              pattern
              disabled={true}
            />
            <InputField
              label="Registration Number"
              type="text"
              name="reg_number"
              register={register}
              errors={errors}
              pattern
              disabled={true}
            />
            <SelectChange
            label="State"
            name="initial_state"
            options={uniqueStates}
            register={register}
            errors={errors}
            required={true}
            defaultValue=""
            handleChange={handleStateChange}
            disabled={responseStatus!=='REPOSSESSION_REQUESTED'}
          />
          <SelectComponent
            label="city"
            name="initial_city"
            options={filtercitys.map((city) => ({
              value: city,
              label: city,
            }))}
            register={register}
            errors={errors}
            required={true}
            defaultValue=""
            disabled={responseStatus!=='REPOSSESSION_REQUESTED'}
          />
             { responseStatus==='REPOSSESSION_APPROVED' && (
              <InputField
              label="End Date & Time"
              type="datetime-local"
              name="end_date"
              register={register}
              errors={errors}
              pattern
              disabled={true}
            />
             )}
             
          </div>
                   
         
  <>
    

    <div className="w-full text-center p-1 mt-16 space-x-2">
      <button
        type="button"
        onClick={() => onClose()}
        className="bg-red-500 text-white py-2 px-8 w-32 rounded hover:bg-red-600 transition duration-200"
      >
        CANCEL
      </button>
      { responseStatus==='REPOSSESSION_REQUESTED' && (
      <button
        onClick={handleModalAccept}
        className="bg-green-500 text-white py-2 px-8 w-32 rounded hover:bg-green-600 transition duration-200"
      >
        SUBMIT
      </button>
      )}
    </div>
  </>

        </form>

  {/* {responseStatus==='REPOSSESSION_REQUESTED' && (
    <div className="w-full text-center p-1 mt-3 space-x-2">
      <button
        type="button"
        // onClick={() => onClose()}
        className="bg-red-500 text-white py-2 px-10 w-32 rounded hover:bg-red-600 transition duration-200"
      >
        CANCEL
      </button>
      <button
        onClick={handleModalAccept}
         className="bg-green-500 text-white py-2 px-8 w-32 rounded hover:bg-green-600 transition duration-200"
      >
        SUBMIT
      </button>
    </div>
  )} */}


      </div>
    </div>
  );
};

export default IndividualStatuss;
