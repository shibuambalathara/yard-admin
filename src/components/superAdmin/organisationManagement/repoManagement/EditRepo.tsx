"use client";
import {
  InputField,
  SelectChange,
  SelectComponent,
  SelectInput,
} from "@/components/ui/fromFields";
import axiosInstance from "@/utils/axios";
import { states } from "@/utils/staticData";
import { useState, useEffect, useCallback } from "react";
import { Cities } from "@/utils/cities";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  formStyle,
  inputStyle,
  labelStyle,
  loginInputStyle,
} from "../../../../components/ui/style";
import { log } from "console";
type Inputs = {
  yard_name: string;
  id: string;
  field_executive_name: string;
  field_executive_contact: number;
  city: string;
  state: string;
  postal_code: number;
  land_mark: string;
  street_name: string;
  user: string;
};

const ViewRepoManagement = ({ clientSuperId, onClose, fetchData }) => {
    const [yardData, setYardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [selectState, setSelectState] = useState("");
    const [filtercitys, setFiltercitys] = useState([]);
    const [Users, setUsers] = useState([]);
    const [uniqueStates, setUniqueStates] = useState([]);
  
    const router = useRouter();
    const {
      register,
      handleSubmit,
      reset,
      setValue,
      formState: { errors },
    } = useForm<Inputs>();
  
    useEffect(() => {
      // Extract unique state names from Cities array
      const uniqueStates = Cities.reduce((acc, current) => {
        if (!acc.includes(current.state)) {
          acc.push(current.state);
        }
        return acc;
      }, []);
  
      setUniqueStates(uniqueStates);
    }, []); // Only run once on component mount
    const FetchUsers = useCallback(async () => {
      try {
        const response = await axiosInstance.get(
          `/user/users/assignment?role=YARD_MANAGER`
        );
        setUsers(response?.data?.data);
  
        // toast.success(response?.data?.message);
      } catch (error) {
        // toast.error(error?.response?.data?.message);
        console.log(error);
      }
    }, []);
  
   
  

  
    useEffect(() => {
      if (selectState) {
        const stateData = Cities.filter((state) => state.state === selectState);
        setFiltercitys(stateData?.map((value) => value?.city));
      }
    }, [selectState]);
  
   
  
    const handleStateChange = (e) => {
      const selectedState = e.target.value;
      setSelectState(selectedState);
  
      setValue("city", "");
    };
  
    const AllUsers = Users?.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  
    let result = AllUsers.filter((item) => item?.label == yardData?.user);
    if (result.length === 0) {
      AllUsers.push({ value: yardData?.user_id, label: yardData?.user });
    } else {
      AllUsers.push({ value: yardData?.user_id, label: yardData?.user });
    }
  

  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-md border">
        <div className="flex  w-full justify-between text-gray-400 uppercase text-lg border-b mb-5 pb-1 ">
          <h1 className=" font-bold  ">Edit Repo </h1>
        </div>
        <form className="  border-gray-200 ">
          <div className="max-w-7xl mx-auto grid grid-cols-1 gap-5 justify-center place-items-center p-2 border ">
            <div className="mb-">
              <InputField
                label="Super Organisation Name"
                type="text"
                name="clsup_org_name"
                register={register}
                errors={errors}
                pattern=""
              />
            </div>
            
            
            <SelectChange
              label="State"
              name="state"
              options={uniqueStates}
              register={register}
              errors={errors}
              required={true}
              defaultValue=""
              handleChange={handleStateChange}
            />
            <SelectChange
              label="city"
              name="city"
              options={filtercitys.map((city) => ({
                value: city,
                label: city,
              }))}
              register={register}
              errors={errors}
              required={true}
              defaultValue=""
            />
          </div>
          <div className=" w-full text-center p-1 mt-3  space-x-2 flex items-center justify-center">
            <button
              type="button"
              onClick={() => onClose()}
              className="bg-red-500 text-white py-2 px-10 w-32 rounded hover:bg-red-600 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-10 w-32 rounded hover:bg-green-600 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewRepoManagement;
