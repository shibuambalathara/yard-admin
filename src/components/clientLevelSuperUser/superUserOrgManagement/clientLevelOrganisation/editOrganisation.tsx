"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { Role, DocumentType, Country, State } from "@//utils/staticData";
import {
  FormFieldInput,
  SelectInput,
  SelectComponent,
  InputField,
} from "@/components/ui/fromFields";
import React from "react";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  fetchSuperUserUsers,
  FetchAllClientCategory,
} from "@/utils/commonApi/commonApi";

const ViewIndividualClientLevelOrg = ({ userId, onClose, fetchData }) => {
  //   console.log("userId", userId);

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [users, setAllUsers] = useState([]);
  const [category, setAllCategory] = useState([]);
  const [individual, setIndividual] = useState<Inputs | null>(null);
  const [clientLevelUsers, setClientLevelUsers] = useState([]);
  const [clientLevelSuperUsers, setClientLevelSuperUsers] = useState([]);
  const [allClientcategory, setAllClientCategory] = useState([]);

  type Inputs = {
    user_id: string;
    clsup_org_id: string;
    cl_org_name: string;
    cl_org_category_id: string;
    country: string;
    state: string;
    user: string;
    cl_org_category: string;
  };
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientLevelSuperUserUsers, clientCategoryData] =
          await Promise.all([fetchSuperUserUsers(), FetchAllClientCategory()]);
        // console.log("useeffect", clientLevelSuperUserUsers);

        // setClientLevelSuperUsers(superUsersData);
        setClientLevelUsers(clientLevelSuperUserUsers);
        setAllClientCategory(clientCategoryData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  console.log("clientLevelSuperUsers", clientLevelSuperUsers);

  const FetchIndividualClientLevelOrg = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `clientorg/client_lvl_org/${userId}`
      );

      console.log("fetch  data of cl_lvl__org", response);

      const destructuredData = {
        ...response?.data?.res,
        cl_org_category: response?.data?.res?.cl_org_category?.name,
        user: response?.data?.res?.user?.name,
        clsup_org: response?.data?.res?.clsup_org?.clsup_org_name,
      };

      setIndividual(destructuredData);

      //   console.log("destructuredData", destructuredData);

      reset(destructuredData);
      //   console.log("d");

      // console.log("Form values after reset:", getValues());
    } catch (error) {
      console.log("error", error);
      // toast.error(`error in creating superOrg`);
    }
  }, []);

  useEffect(() => {
    FetchIndividualClientLevelOrg();
  }, []);

  const AllClientUsers = clientLevelUsers?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  console.log("allclientLevelUsers", AllClientUsers);

  let result = AllClientUsers.filter(
    (item) => item?.value !== individual?.user_id
  );

  console.log("result--0001", result);

  //   if (result.length === 0) {
  //     // The individual.user_id is not present in AllUsers, so we push a new item
  //     AllClientUsers.push({
  //       label: individual?.user,
  //       value: individual?.user_id,
  //     });
  //     // console.log("Updated AllUsers", AllUsers);
  //   }
  //   else {
  //     // If AllUsers is empty, we can directly push the new item
  //     AllClientUsers.push({
  //       label: individual?.user,
  //       value: individual?.user_id,
  //     });

  //   }

  //   console.log("AllUsers", AllUsers);

  const AllCategory = allClientcategory.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  // console.log("AllCat", AllCategory);

  const EditClientLevelOrg = async (data: Inputs) => {
    console.log("data for submit", data);

    const submittingData = {
      ...data,
      cl_org_name: data?.cl_org_name?.toUpperCase(),
    };

    console.log("modified data for submit", submittingData);

    try {
      const response = await axiosInstance.put(
        `clientorg/client_lvl_org/${userId}`,
        submittingData
      );
      console.log("response after sumbit of cl_lvl_org", response);
      toast.success(response?.data?.message);
      onClose(), fetchData();
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.message);
    }
    //   // Handle form submission
  };

  return (
    <div className="flex items-center justify-center relative z-50 ">
      <div className="bg-white rounded-lg shadow-2xl p-5 max-w-5xl w-full space-y-3 ">
        <div className="">
          <h1 className="p-2 uppercase text-start font-semibold text-base text-slate-400">
            Edit Organisation
          </h1>
          <div className="border-b "></div>
        </div>

        <form
          className="space-y-2  "
          onSubmit={handleSubmit(EditClientLevelOrg)}
        >
          <div className="grid  grid-cols-1 md:grid-cols-1 gap-2 border p-4 place-items-center h-auto overflow-y-scroll scrollbar-hide ">
            <InputField
              label=" Enter Organisation"
              type="text"
              name="cl_org_name"
              register={register}
              errors={errors}
              pattern=""
              placeholder=""
            />

            <div className="mb-">
              <SelectComponent
                label="Select User"
                options={AllClientUsers}
                name="user_id"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
                placeholder=""
              />
            </div>

            <div className="mb-">
              <SelectComponent
                label="Select Category"
                options={AllCategory}
                name="cl_org_category_id"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
                placeholder=""
              />
            </div>
            <div className="mb-">
              <SelectComponent
                label="Select State"
                options={State}
                name="state"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
                placeholder=""
              />
            </div>
          </div>
          <div className="w-full  text-center space-x-4">
            <button
              onClick={() => onClose()}
              type="button"
              className="bg-gradient-to-r from-red-500 uppercase to-red-700 text-white py-2 px-6 rounded-lg  hover:from-red-600 hover:to-red-800 transition duration-300 transform hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 uppercase to-green-700 text-white py-2 px-6 rounded-lg  hover:from-green-600 hover:to-green-800 transition duration-300 transform hover:scale-105"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewIndividualClientLevelOrg;
