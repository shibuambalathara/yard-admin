"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { Role, DocumentType, Country, State, demo } from "@//utils/staticData";
import {
  FormFieldInput,
  SelectInput,
  SelectComponent,
  InputField,
  CustomMultiSelectForEdit,
} from "@/components/ui/fromFields";
import React from "react";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { inputStyle, labelStyle } from "@/components/ui/style";
import Select from "react-select";
import { Controller } from "react-hook-form";
import {
  FetchAllClientCategory,
  FetchClientLevelOrgs,
  FetchClientLevelSubUsers,
  FetchVehicleCategory,
} from "@/utils/commonApi/commonApi";

interface ClOrg {
  code: string;
  cl_org_name: string;
}

interface ClSubOrgCategory {
  name: string;
}

interface ClSubOrg {
  cl_org: ClOrg;
  cl_org_id: string;
  clsub_org_category: ClSubOrgCategory;
  clsub_org_category_id: string;
  clsub_org_name: string;
  code: string;
  id: string;
}

interface User {
  code: string;
  name: string;
  user_id: string;
}

interface VehicleCategory {
  label?: string;
  value?: string;
}

interface ApiResponse {
  cl_org: ClOrg;
  cl_org_id: string;
  clsub_org_category: ClSubOrgCategory;
  clsub_org_category_id: string;
  clsub_org_name: string;
  code: string;
  id: string;
  user: User;
  user_id: string;
  vehicleCatIdWithName: VehicleCategory[];
  veh_cat: string[];
}

// type Inputs = {
//   user_id: string;
//   cl_org_id: string;
//   veh_cat: [];
//   clsub_org_name: string;
//   clsub_org_category_id: string;
// };

const ViewIndividualClientLevelSubOrg = ({ subOrgId, onClose, fetchData }) => {
  console.log("subOrgId", subOrgId);

  const [clientLevelSubUsers, setClientLevelSubUsers] = useState([]);
  const [clientLevelOrg, setClientLevelOrg] = useState([]);
  const [category, setAllCategory] = useState([]);
  const [allVehicleCategory, setAllVehicleCategory] = useState([]);
  const [clientLevelSubOrg, setAllClientLevelSubOrg] =
    useState<ApiResponse | null>(null);
  const [options, setOptions] = useState<VehicleCategory[]>([]);
  const [defaultValues, setDefaultValues] = useState<VehicleCategory[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ApiResponse>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          clientLevelOrgData,
          vehicleCategoryData,
          clientLevelSubUsersData,
          clientCategoryData,
        ] = await Promise.all([
          FetchClientLevelOrgs(),
          FetchVehicleCategory(),
          FetchClientLevelSubUsers(),
          FetchAllClientCategory(),
        ]);

        setClientLevelOrg(clientLevelOrgData);
        setAllVehicleCategory(vehicleCategoryData);
        setClientLevelSubUsers(clientLevelSubUsersData);
        setAllCategory(clientCategoryData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data");
      }
    };

    fetchData();
  }, [subOrgId]);

  // console.log("clientLevelOrgData",clientLevelOrg);
  // console.log("vehicleCategoryData",allVehicleCategory);
  // console.log("clientLevelSubUsersData",clientLevelSubUsers);
  // console.log("clientCategoryData",category);

  const FetchIndividualClientLevelSubOrg = async () => {
    try {
      const response = await axiosInstance.get(
        `/clientorg/client_lvl_sub_org/${subOrgId}`
      );

      console.log("API Response:", response);

      const fetchedData = response?.data?.res;
      setAllClientLevelSubOrg(response?.data?.res);

      console.log("Fetched Data:", fetchedData);

      const vehCatOptions: VehicleCategory[] =
        fetchedData?.vehicleCatIdWithName?.map((cat) => ({
          value: cat.id,

          label: cat.name,
        }));

      setDefaultValues(vehCatOptions);

      const destructuredData = {
        cl_org_name: fetchedData?.cl_org?.cl_org_name,
        cl_org_id: fetchedData?.cl_org_id,
        clsub_org_category_id: fetchedData?.clsub_org_category_id,
        clsub_org_name: fetchedData?.clsub_org_name,
        code: fetchedData?.code,
        id: fetchedData?.id,
        user_id: fetchedData?.user_id,
        vehicleCatIdWithName: vehCatOptions,
      };

      console.log("destructeddata", destructuredData);

      reset(destructuredData);

     
    } catch (error) {
      console.error("Error fetching individual client level sub org:", error);
      // toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    FetchIndividualClientLevelSubOrg();
  }, [subOrgId]);

  const allSubUsers = clientLevelSubUsers?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const allClientCategory = category
    ?.filter((item) => item.name === "BANK")
    .map((item) => ({
      value: item.id,
      label: item.name,
    }));

  const allClientLevelOrganisations = clientLevelOrg?.map((item) => ({
    value: item.id,
    label: item.cl_org_name,
  }));
  const allVehicleCategorys = allVehicleCategory?.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  console.log("allVehicleCategory", allVehicleCategory);
  console.log("allVehicleCategorysssss", allVehicleCategorys);

  let result = allSubUsers.filter(
    (item) => item?.value == clientLevelSubOrg?.user_id
  );

  if (result.length === 0) {
    // The individual.user_id is not present in AllUsers, so we push a new item
    allSubUsers.push({
      label: clientLevelSubOrg?.user?.name,
      value: clientLevelSubOrg?.user_id,
    });
    // console.log("Updated AllUsers", AllUsers);
  } else {
    // If AllUsers is empty, we can directly push the new item
    allSubUsers.push({
      label: clientLevelSubOrg?.user?.name,
      value: clientLevelSubOrg?.user_id,
    });
    //   console.log("Updated AllUsers", AllUsers);
  }

  function updateArray(array1, array2, key) {
    // Create a Set of keys from array1
    let set1 = new Set(array1.map((item) => item[key]));

    // Filter array2 to find objects whose key is missing in array1
    let missingElements = array2.filter((item) => !set1.has(item[key]));

    // Add missing elements to array1
    array1.push(...missingElements);

    return array1;
  }

  const EditSubOrganisation = async (data: ApiResponse) => {
    console.log("data for submit", data);

    const submittingData = {
      ...data,
      veh_cat: data?.vehicleCatIdWithName?.map((item) => item?.value),
      // cl_org_name: data?.cl_org_name?.toUpperCase(),
    };
    console.log("modified data for submit", submittingData);
    try {
      const response = await axiosInstance.put(
        `clientorg/client_lvl_sub_org/${subOrgId}`,
        submittingData
      );
      console.log("response after sumbit of cl_lvl_org", response);
      toast.success(response?.data?.message);
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.message);
    }
    // Handle form submission
  };

  return (
    <div className="flex items-center justify-center relative z-50 ">
      <div className="bg-white rounded-lg shadow-2xl p-5 max-w-3xl  overflow-y-scroll scrollbar-hide  ">
        <h1 className="p-2 uppercase text-center">create sub Organisation</h1>
        <button
          className="absolute top-2 right-8 text-gray-400 hover:text-gray-600 transition duration-200"
          onClick={onClose}
          type="button"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <form
          className="space-y-2  "
          onSubmit={handleSubmit(EditSubOrganisation)}
        >
          <div className="max-w-7xl grid grid-cols-2 gap-5 p-2 justify-center place-items-center border  scrollbar-hide overflow-y-scroll ">
            <div>
              <InputField
                label=" Sub Organisation Name"
                type="text"
                name="clsub_org_name"
                register={register}
                errors={errors}
                pattern=""
              />
            </div>
            <div>
              <SelectInput
                label="Selec user"
                options={allSubUsers}
                name="user_id"
                register={register}
                error={errors}
                required={false}
                defaultValue=""
              />
            </div>
            <div className="w-72">
              {/* <div className="p-4 w-80"> */}
              <div className="flex flex-col w-full space-y-2">
                <label className={labelStyle.data} htmlFor="">
                  Vehicle Category
                </label>

                <Controller
                  name="vehicleCatIdWithName"
                  control={control}
                  defaultValue={defaultValues.map((state) => ({
                    label: state.label,
                    value: state.value,
                  }))}
                  render={({ field }) => (
                    <Select
                      options={allVehicleCategory.map((state) => ({
                        label: state.name,
                        value: state.id,
                      }))}
                      {...field}
                      isMulti
                      getOptionValue={(option) => option.value}
                      getOptionLabel={(option) => option.label}
                    />
                  )}
                />

                {/* </div> */}
              </div>
            </div>

            <div>
              <SelectInput
                label="Select Client Organisation "
                options={allClientLevelOrganisations}
                name="cl_org_id"
                register={register}
                error={errors}
                required={true}
                defaultValue=""
              />
            </div>
            <div>
              <SelectInput
                label=" Select Client Category"
                options={allClientCategory}
                name="clsub_org_category_id"
                register={register}
                error={errors}
                required={true}
                defaultValue=""
              />
            </div>
          </div>
          <div className="w-full  text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 uppercase to-blue-700 text-white py-3 px-6 rounded-lg w-60 hover:from-blue-600 hover:to-blue-800 transition duration-300 transform hover:scale-105"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewIndividualClientLevelSubOrg;
