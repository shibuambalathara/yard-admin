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
  name: string;
}

interface VehCat {
  id: string;
  vehicle_category: string;
  vehicle_category_id: string;
  label: string;
  value: string;
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
  veh_cat: VehCat[];
}

const ViewIndividualClientLevelSubOrg = ({ subOrgId }) => {
  // console.log("subOrgId", subOrgId);

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [clientLevelSubUsers, setClientLevelSubUsers] = useState([]);
  const [clientLevelSuperUsers, setClientLevelSuperUsers] = useState([]);
  const [category, setAllCategory] = useState([]);
  const [clientLevelOrg, setClientLevelOrg] = useState([]);
  const [allVehicleCategory, setAllVehicleCategory] = useState([]);
  const [clientLevelSubOrg, setAllClientLevelSubOrg] =
    useState<ApiResponse | null>();
  const [options, setOptions] = useState([]);
  const [defaultValues, setDefaultValues] = useState<VehCat[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ApiResponse>();

  const FetchClientLevelOrgs = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/clientorg/client_lvl_org`);
      setClientLevelOrg(response?.data?.res?.clientLevelOrg);

      // console.log("reponse of clientlevelorg ", response);

      toast.success(response?.data?.message);
    } catch (error) {
      // console.log("error", error);
      toast.error(error?.response?.data?.message);
    }
  }, []);

  const FetchVehicleCategory = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/vehicle/cat`);
      setAllVehicleCategory(response?.data?.vehicleCategory);

      console.log("reponse of vehiclecat ", response);

      toast.success(response?.data?.message);
    } catch (error) {
      // console.log("error", error);
      toast.error(error?.response?.data?.message);
    }
  }, []);

  // console.log("allVehicleCategory", allVehicleCategory);

  const FetchClientLevelSubUsers = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/user/users/assignment?role=CLIENT_LEVEL_SUB_USER`
      );
      setClientLevelSubUsers(response?.data?.data);

      // console.log("reponse of clientLevelSubUsers ", response);

      // toast.success("successs");
    } catch (error) {
      // console.log("error", error);
      toast.error(`something went wrong`);
    }
  }, []);

  const FetchAllClientCategory = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`clientorg/cat/`);

      setAllCategory(response?.data?.clientCategory);

      // console.log("resposne of FetchAllClientCategory",response);
      reset();
      // toast.success("successs");
    } catch (error) {
      // console.log("error", error);
      toast.error(`something went wrong`);
    }
  }, []);

  // const FetchIndividualClientLevelSubOrg = useCallback(async () => {
  //   try {
  //     const response = await axiosInstance.get(
  //       `/clientorg/client_lvl_sub_org/${subOrgId?.subOrgId}`
  //     );
  //     setAllClientLevelSubOrg(response?.data?.res);

  //     console.log("reponse of individual clientlevelsuborg ", response);
  //     const destructuredData={
  //       ...response?.data?.res,
  //       clsub_org_name:clientLevelSubOrg?.clsub_org_name,
  //       cl_org:clientLevelSubOrg?.cl_org?.cl_org_name,
  //       clsub_org_category:clientLevelSubOrg?.clsub_org_category?.name,
  //      user:clientLevelSubOrg?.user?.name

  //     }

  //     console.log("destructuredData",destructuredData);

  //     reset(destructuredData);

  //     toast.success(response?.data?.message);
  //   } catch (error) {
  //     // console.log("error", error);
  //     toast.error(error?.response?.data?.message);
  //   }
  // }, []);

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
  //         clsub_org_category_id: fetchedData?.clsub_org_category_id,
  //         clsub_org_name: fetchedData?.clsub_org_name,
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
  
      const vehCatOptions: VehCat[] = fetchedData?.veh_cat.map((cat) => ({
        id: cat?.id,
        vehicle_category: cat?.vehicle_category?.name,
        vehicle_category_id: cat?.vehicle_category_id,
        label: cat?.vehicle_category?.name,
        value: cat?.vehicle_category_id,
      }));
      
      setOptions(vehCatOptions);
      setDefaultValues(vehCatOptions);
  
      const destructuredData = {
        cl_org_name: fetchedData?.cl_org?.cl_org_name,
        cl_org_id: fetchedData?.cl_org_id,
        clsub_org_category_id: fetchedData?.clsub_org_category_id,
        clsub_org_name: fetchedData?.clsub_org_name,
        code: fetchedData?.code,
        id: fetchedData?.id,
        user_id: fetchedData?.user_id,
        veh_cat: vehCatOptions,
      };
  
      reset(destructuredData);
  
      toast.success(response?.data?.message);
    } catch (error) {
      console.error("Error fetching individual client level sub org:", error);
      toast.error(error?.response?.data?.message);
    }
  };
  
 

  // console.log("clientLevelSubOrg",clientLevelSubOrg);

  useEffect(() => {
    FetchClientLevelOrgs();
    FetchAllClientCategory();
    FetchClientLevelSubUsers();
    FetchVehicleCategory();
    FetchIndividualClientLevelSubOrg();
  }, []);

  // console.log("options", options);
  console.log("defaultVals", defaultValues);

  const allSubUsers = clientLevelSubUsers?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  // console.log("ALL USERS", allSubUsers);

  const allClientCategory = category?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const allClientLevelOrganisations = clientLevelOrg?.map((item) => ({
    value: item.id,
    label: item.cl_org_name,
  }));
  const allVehicleCategorys = allVehicleCategory?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  console.log("options001", allVehicleCategory);

  let result = allSubUsers.filter(
    (item) => item?.value == clientLevelSubOrg?.user_id
  );

  // console.log("results",result);

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
    let set1 = new Set(array1.map(item => item[key]));

    // Filter array2 to find objects whose key is missing in array1
    let missingElements = array2.filter(item => !set1.has(item[key]));

    // Add missing elements to array1
    array1.push(...missingElements);

    return array1;
}

let array1Updated = updateArray(allVehicleCategorys, defaultValues, 'value');

console.log("array1Updated",array1Updated);


  // let uniquesData=defaultValues?.filter((item)=>item?.value !== )


  // console.log("default values",clientLevelSubOrg?.veh_cat);

  const onSubmit = async (data: ApiResponse) => {
    console.log("data for submit", data)
    // const submittingData = {
    //   ...data,
    //   // cl_org_name: data?.cl_org_name?.toUpperCase(),
    // };
    // console.log("modified data for submit", submittingData);
    // try {
    //   const response = await axiosInstance.put(
    //     `clientorg/client_lvl_org/${subOrgId?.clientLevelOrgId}`,
    //     submittingData
    //   );
    //   console.log("response after sumbit of cl_lvl_org", response);
    //   toast.success(response?.data?.message);
    // } catch (error) {
    //   console.log("error", error);
    //   toast.error(error?.response?.data?.message);
    // }
    //   // Handle form submission
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <div className="max-w-5xl w-full mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-blue-700 mb-8">
            Edit Client Organisation
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full place-items-center"
          >
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
            <div className="p-4 w-80">
  <div className="flex flex-col w-full">
    <label htmlFor="">Auction Allowed States</label>
    <Controller
      name="veh_cat"
      control={control}
      defaultValue={defaultValues}
      render={({ field }) => (
        <Select
          className={`${inputStyle.data}`}
          options={array1Updated}
          {...field}
          isMulti
          getOptionValue={(option) => option.value} // value is vehicle_category_id
          getOptionLabel={(option) => option.label} // label is vehicle_category name
        />
      )}
    />
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
