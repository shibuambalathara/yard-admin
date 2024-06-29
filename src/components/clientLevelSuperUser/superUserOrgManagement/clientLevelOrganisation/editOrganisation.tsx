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

  console.log("clientLevelSuperUsers",clientLevelSuperUsers);
  

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
     

      toast.success("fetched clientlevelsuper orgs");
    } catch (error) {
      // console.log("error", error);
      toast.error(`error in creating superOrg`);
    }
  }, []);

  useEffect(() => {
    FetchIndividualClientLevelOrg();
  }, []);

  const AllClientUsers = clientLevelUsers?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  console.log("allclientLevelUsers",AllClientUsers);
  

  let result = AllClientUsers.filter(
    (item) => item?.value !== individual?.user_id
  );
 
  console.log("result--0001",result);
  


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
      onClose(),
      fetchData ()
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.message);
    }
    //   // Handle form submission
  };

  return (
    <div className="flex items-center justify-center relative z-50 ">
      <div className="bg-white rounded-lg shadow-2xl p-5 max-w-5xl relative  space-y-">
        <h1 className=" uppercase text-center mb-4">Update Organisation</h1>
        <button
          className="absolute top-0 p-2 right-0 text-gray-400 hover:text-gray-600 transition duration-200"
          onClick={() => onClose()}
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
          onSubmit={handleSubmit(EditClientLevelOrg)}
        >
          <div className="grid  grid-cols-1 md:grid-cols-1 gap-2  place-items-center h-auto overflow-y-scroll scrollbar-hide ">
            <InputField
              label=" "
              type="text"
              name="cl_org_name"
              register={register}
              errors={errors}
              pattern=""
              placeholder="Enter Organisation"
            />

            <div className="mb-">
              <SelectComponent
                label=""
                options={AllClientUsers}
                name="user_id"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
                placeholder="Select User"
              />
            </div>
            {/* <div className="mb-">
              <SelectComponent
                label="Selec super organisation"
                options={clientLevelSuperUsers}
                name="clsup_org_id"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
              />
            </div> */}
            <div className="mb-">
              <SelectComponent
                label=""
                options={AllCategory}
                name="cl_org_category_id"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
                placeholder="Select Category"
              />
            </div>
            {/* <div className="mb-">
              <SelectComponent
                label=" Select Country"
                options={Country}
                name="country"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
              />
            </div> */}
            <div className="mb-">
              {/* <SelectComponent
                label=" "
                options={State}
                name="state"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
                placeholder="Select State"
              /> */}
              <div className="mb-">
                <SelectComponent
                  label=""
                  options={State}
                  name="state"
                  register={register}
                  errors={errors}
                  required={true}
                  defaultValue=""
                  placeholder="Select State"
                />
              </div>
            </div>
            {/* <div className="mb-">
              <SelectComponent
                label="Select Organisation Children"
                options={DocumentType}
                name="clientLvlOrgIds"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
              />
            </div> */}
          </div>
          <div className="w-full  text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 uppercase to-blue-700 text-white py-3 px-6 rounded-lg w-60 hover:from-blue-600 hover:to-blue-800 transition duration-300 transform hover:scale-105"
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
