"use client";
import {
  InputField,
  SelectChange,
} from "@/components/ui/fromFields";
import axiosInstance from "@/utils/axios";
import { states } from "@/utils/staticData";
import { useState, useEffect, useCallback } from "react";
import { Cities } from "@/utils/cities";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  org_name: string;
  id: string;
  city: string;
  state: string;
};

const ViewRepoManagement = ({ clientSuperId, onClose,fetchData }) => {
  const [individual, setIndividual] = useState<Inputs | null>(null);
  const [selectState, setSelectState] = useState("");
  const [filterCities, setFilterCities] = useState([]);
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
    const uniqueStates = Cities.reduce((acc, current) => {
      if (!acc.includes(current.state)) {
        acc.push(current.state);
      }
      return acc;
    }, []);
    setUniqueStates(uniqueStates);
  }, []);

  const fetchOrganisation = useCallback(async () => {
    try {
      const allOrganisations = await axiosInstance.get(
        `/repo-agency/${clientSuperId}`
      );
      const orgData = allOrganisations?.data?.res;
      setIndividual(orgData);
      reset(orgData);
      if (orgData?.state) {
        setSelectState(orgData.state);
        setFilterCities(
          Cities.filter((state) => state.state === orgData.state).map(
            (value) => value.city
          )
        );
      }
    } catch (error) {
      console.error("Error fetching organization data:", error);
    }
  }, [clientSuperId, reset]);

  useEffect(() => {
    fetchOrganisation();
  }, [fetchOrganisation]);

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setSelectState(selectedState);
    setValue("city", "");
    setFilterCities(
      Cities.filter((state) => state.state === selectedState).map(
        (value) => value.city
      )
    );
  };
  const editRepo = useCallback(
    async (data: Inputs) => {
      const modifiedData = {
        ...data,
      };

      try {
        
        const response = await axiosInstance.put(`/repo-agency/${clientSuperId}`, modifiedData);
        toast.success(response?.data?.message);
        fetchData()
        onClose()
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    },
    [clientSuperId]
  );

  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-md border">
        <div className="flex w-full justify-between text-gray-400 uppercase text-lg border-b mb-5 pb-1">
          <h1 className="font-bold">Edit Repo</h1>
        </div>
        <form   onSubmit={handleSubmit(editRepo)} className="border-gray-200"  >
          <div className="max-w-7xl mx-auto grid grid-cols-1 gap-5 justify-center place-items-center p-2 border">
            <div>
              <InputField
                label="Super Organisation Name"
                type="text"
                name="org_name"
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
              defaultValue={individual?.state || ""}
              handleChange={handleStateChange}
            />
            <SelectChange
              label="City"
              name="city"
              options={filterCities.map((city) => ({
                value: city,
                label: city,
              }))}
              register={register}
              errors={errors}
              required={true}
              defaultValue={individual?.city || ""}
            />
          </div>
          <div className="w-full text-center p-1 mt-3 space-x-2 flex items-center justify-center">
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
