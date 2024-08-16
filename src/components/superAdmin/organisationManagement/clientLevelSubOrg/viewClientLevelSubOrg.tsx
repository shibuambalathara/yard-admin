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
import { inputStyle } from "@/components/ui/style";
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
  client_category_id: string;
  org_name: string;
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
  client_category_id: string;
  org_name: string;
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
//   org_name: string;
//  client_category_id: string;
// };

const ViewIndividualClientLevelSubOrg = ({ subOrgId }) => {
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

  const router = useRouter();

  // console.log("clientLevelOrgData",clientLevelOrg);
  // console.log("vehicleCategoryData",allVehicleCategory);
  // console.log("clientLevelSubUsersData",clientLevelSubUsers);
  // console.log("clientCategoryData",category);

  // const FetchIndividualClientLevelSubOrg =

  //   async () => {
  //     try {
  //       const response = await axiosInstance.get(
  //         `/clientorg/client_lvl_sub_org/${subOrgId?.subOrgId}`
  //       );

  //       console.log("API Response:", response);

  //       const fetchedData = response?.data?.res;
  //       setAllClientLevelSubOrg(response?.data?.res);

  //       console.log("Fetched Data:", fetchedData);

  //       // const destructuredData={
  //       //   ...fetchedData
  //       // }

  //       const destructuredData = {
  //         cl_org_name: fetchedData?.cl_org?.cl_org_name,
  //         cl_org_id: fetchedData?.cl_org_id,
  //        client_category_id: fetchedData?.clsub_org_category_id,
  //         org_name: fetchedData?.org_name,
  //         code: fetchedData?.code,
  //         id: fetchedData?.id,
  //         user_id: fetchedData?.user_id,
  //         veh_cat: fetchedData?.veh_cat.map((cat) => ({
  //           id: cat?.id,
  //           vehicle_category: cat?.vehicle_category?.name,
  //           vehicle_category_id: cat?.vehicle_category_id,
  //           label: cat?.vehicle_category?.name,
  //           value: cat?.vehicle_category_id,
  //         })),
  //       };
  //       // const transformedOptions = fetchedData?.veh_cat?.map((item) => ({
  //       //   label: item.vehicle_category.name,
  //       //   value: item.vehicle_category_id,
  //       // }));
  //       // setOptions(transformedOptions);

  //       // console.log("transformedOptions", transformedOptions);

  //       // const defaultVals = fetchedData?.veh_cat?.map((item) => ({
  //       //   id: item.id,
  //       //   vehicle_category_id: item.vehicle_category_id,
  //       // }));

  //       // setDefaultValues(defaultVals);
  //       // console.log("defaultVals", defaultVals);

  //       setOptions(destructuredData.veh_cat);
  //       setDefaultValues(destructuredData.veh_cat);

  //       reset(destructuredData);

  //       toast.success(response?.data?.message);
  //     } catch (error) {
  //       console.error("Error fetching individual client level sub org:", error);
  //       toast.error(error?.response?.data?.message);
  //     }
  //   };

  const FetchIndividualClientLevelSubOrg = async () => {
    try {
      const response = await axiosInstance.get(
        `/clientorg/client_lvl_sub_org/${subOrgId?.subOrgId}`
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
        cl_org_name: fetchedData?.cl_org?.org_name,
        cl_org_id: fetchedData?.cl_org_id,
        client_category_id: fetchedData?.clsub_org_category_id,
        org_name: fetchedData?.org_name,
        code: fetchedData?.code,
        id: fetchedData?.id,
        user_id: fetchedData?.user_id,
        vehicleCatIdWithName: vehCatOptions,
      };

      console.log("destructeddata", destructuredData);

      reset(destructuredData);

      // toast.success(response?.data?.message);
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
    label: item.org_name,
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

  const onSubmit = async (data: ApiResponse) => {
    console.log("data for submit", data);

    const submittingData = {
      ...data,
      veh_cat: data?.vehicleCatIdWithName?.map((item) => item?.value),
      // cl_org_name: data?.cl_org_name?.toUpperCase(),
    };
    console.log("modified data for submit", submittingData);
    try {
      const response = await axiosInstance.put(
        `clientorg/client_lvl_sub_org/${subOrgId?.subOrgId}`,
        submittingData
      );
      console.log("response after sumbit of cl_lvl_org", response);
      toast.success(response?.data?.message);
      router.push("/organisationManagement/clientLevelSubOrg");
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.message);
    }
    // Handle form submission
  };

  return (
    <div className="min-h-screen flex flex-col  bg-gray-100 py-10">
      <div className="max-w-5xl w-full mx-auto p-8 bg-white shadow-lg rounded-lg mt-3">
        <div className="flex flex-col ">
          <div className="w-full  mb-">
            <h1 className="text-2xl font-bold text-black-700 pt-1  text-start">
              Edit Client Sub Organisation
            </h1>
            <div className="border-b mt-4"></div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full place-items-center"
          >
            <div>
              <InputField
                label=" Sub Organisation Name"
                type="text"
                name="org_name"
                register={register}
                errors={errors}
                pattern=""
              />
            </div>
            {/* <div>
              <SelectInput
                label="Select user"
                options={allSubUsers}
                name="user_id"
                register={register}
                error={errors}
                required={false}
                defaultValue=""
              />
            </div> */}
            <div className="p-4 w-80">
              <div className="p-4 w-80">
                <div className="flex flex-col w-full">
                  <label htmlFor="">Vehicle Category</label>

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
                </div>
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

            <div className="flex justify-end col-span-full">
              <button
                type="button"
                onClick={() => window.close()}
                className="bg-red-500 text-white py-3 px-8 rounded-lg hover:bg-red-600 transition duration-200 mr-4"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white py-3 px-8 rounded-lg hover:bg-green-600 transition duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewIndividualClientLevelSubOrg;
