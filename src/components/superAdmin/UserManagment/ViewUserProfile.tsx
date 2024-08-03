"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  FormFieldInput,
  SelectInput,
  SelectInputOptional,
  SelectInputWithChange,
} from "../../ui/fromFields";
import { FaEdit } from "react-icons/fa";

import { formStyle, inputStyle, labelStyle } from "../../ui/style";
import Link from "next/link";
import img1 from "../../../../public/aadhar.jpg";
import img2 from "../../../../public/aadhar.jpg";
import img3 from "../../../../public/aadhar.jpg";
import img4 from "../../../../public/aadhar.jpg";
import Image from "next/image";
import { Role, DocumentType } from "@/utils/staticData";
import axiosInstance from "@/utils/axios";
import Loading from "@/app/(home)/(superAdmin)/loading";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FetchOrganisation } from "@/utils/commonApi/commonApi";
import { log } from "console";
import useAuthStore from "@/store/useAuthStore";

type OrgDetail = {
  code: string;
  id: string;
  org_name: string;
  org_type: string;
};
type Inputs = {
  name: string;
  email: string;
  contact: number;
  designation: string;
  role: string;
  aadhar: string;
  accountValidFrom: string;
  password: string;
  account_usage_from: string;
  account_usage_to: string;
  document_type: string;
  document_value: string;
  orgDetail: OrgDetail;
};
const images = [img1, img2, img3]; // Array containing imported images

const ViewFullUserProfile = ({ profileId }) => {
  const [success, setSuccess] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [error, setError] = useState(null);
  const [initialData, setInitialData] = useState<Inputs | null>(null); // Store initial values
  const [isLoading, setIsLoading] = useState(true); // Initially set to true to show loading spinner
  const [organisation, setOrganisation] = useState([]);
  const [isOrganisation, setIsOrganisation] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (success) {
      toast.success(success.text ? success.text : "Success");
      setTimeout(() => {
        setSuccess(null);
      }, 2000);
    }
    if (error) {
      toast.error(
        error.text ? error.text : "Something went wrong. Please contact support"
      );
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  }, [success, error]);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const FetchUserData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `user/fetch/${profileId.profileId}`
      );
      // console.log("response of view user", response);

      if (
        response?.data?.res?.orgDetail?.org_name !== "" ||
        response?.data?.res?.orgDetail?.org_name !== undefined
      ) {
        setIsOrganisation(true);
      }

      console.log("response viewData: ", response);

      const resetData = {
        ...response?.data?.res,

        org_name: response?.data?.res?.orgDetail?.org_name,

        document_value: response?.data?.res?.documents?.document_value,

        document_type: response?.data?.res?.documents?.document_type,
        account_usage_from:
          response?.data?.res?.account_usage_from?.split("T")[0],
        account_usage_to: response?.data?.res?.account_usage_to?.split("T")[0],
      };

      // console.log("resetData",resetData)

      const orgResponse = await FetchOrganisation(response?.data?.res?.role);

      //  console.log("orgResponse",orgResponse);
      const formattedOrganisations = orgResponse?.data?.res.map((org) => ({
        label: org?.org_name,
        value: org?.id,
      }));

      formattedOrganisations?.unshift({
        label: "Select Organisation",
        value: "",
      });

      // Add "No Organisation" option

      // console.log("formattedOrganisations",formattedOrganisations);
      setOrganisation(formattedOrganisations);
      // console.log("or",formattedOrganisations);

      setUserRole(response?.data?.res?.role);
      setInitialData(resetData);
      reset(resetData);
    } catch (error) {
      console.log("error", error);
      setError({
        text: error?.response?.data?.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  
  

  useEffect(() => {
    FetchUserData();
  }, [profileId]);





  const onSubmit = async (data: Inputs) => {
    const validFrom = new Date(data?.account_usage_from).toISOString();
    const validTo = new Date(data?.account_usage_to).toISOString();
    const orgId = data?.orgDetail?.id === "" ? null : data?.orgDetail?.id;

    const modifiedData = {
      ...data,
      name: data?.name?.toUpperCase(),
      account_usage_from: validFrom,
      account_usage_to: validTo,
      org_id: orgId,
    };
    const currentUser = useAuthStore.getState().user;

    console.log("current user from store",currentUser);
    try {
      const response = await axiosInstance.put(
        `/user/update/${profileId.profileId}`,
        modifiedData
      );
      toast.success(response?.data?.message);
    } catch (error) {
      console.error("Error updating user data", error);
      toast.error(error?.response?.data?.message);
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="flex w-full h-screen items-center justify-center">
  //       <Loading />
  //     </div>
  //   );
  // }

  const handleRoleChange = async (event) => {
    const selectedRole = event.target.value;
    setUserRole(selectedRole);

    try {
      const response = await FetchOrganisation(selectedRole);
      // console.log("response from handleRoleChange", response);

      // setOrganisation(response?.data?.res || []);
      const formattedOrganisations = response?.data?.res.map((org) => ({
        label: org?.org_name,
        value: org?.id,
      }));
      formattedOrganisations?.unshift({
        label: "Select Organisation",
        value: "",
      });

      // console.log("formattedOrganisations",formattedOrganisations);
      // reset({ orgDetail: "" });
      setOrganisation(formattedOrganisations);
      // reset({ org_id: "" });
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  // console.log("user role",userRole);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Update User</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="mb-">
              <FormFieldInput
                label="Name"
                type="text"
                name="name"
                register={register}
                error={errors.name}
                required
                defaultValue=""
                placeholder=""
              />
            </div>
            <div className="mb-">
              <FormFieldInput
                label="Email"
                type="email"
                name="email"
                register={register}
                error={errors.email}
                required
                placeholder=""
                defaultValue=""
              />
            </div>
            <div className="mb-">
              <FormFieldInput
                label="Contact"
                type="tel"
                name="contact"
                register={register}
                error={errors.contact}
                required
                placeholder=""
                defaultValue=""
              />
            </div>

            <div className="mb-">
              <SelectInputWithChange
                label="Role"
                options={Role}
                name="role"
                register={register}
                error={errors}
                required
                placeholder=""
                defaultValue="Select user role"
                handleRoleChange={handleRoleChange}
              />
            </div>
            <div className="">
              <SelectInputOptional
                label="Select Organisation"
                name="orgDetail.id"
                options={organisation}
                register={register}
                error={errors}
                required={false}
                defaultValue=""
              />
            </div>
            {/* <div className="mb-">
                <FormFieldInput
                  label="Select Organisation"
                  type="text"
                  name="orgDetail.org_name"
                  register={register}
                  error={errors.designation}
                  required
                  placeholder=""
                  defaultValue=""
                />
              </div> */}

            <div className="mb-">
              <FormFieldInput
                label="Designation"
                type="text"
                name="designation"
                register={register}
                error={errors.designation}
                required
                placeholder=""
                defaultValue=""
              />
            </div>

            <div className="mb-">
              <FormFieldInput
                label="Account Valid From"
                type="date"
                name="account_usage_from"
                register={register}
                error={errors.account_usage_from}
                required
                placeholder=""
                defaultValue=""
              />
            </div>
            <div className="mb-">
              <FormFieldInput
                label="Account Valid To"
                type="date"
                name="account_usage_to"
                register={register}
                error={errors.account_usage_to}
                required
                placeholder="Select account valid to date"
                defaultValue=""
              />
            </div>
            {/* <div className="mb- h-auto">
                <SelectInput
                  label="Document Type"
                  options={DocumentType}
                  name="document_type"
                  register={register}
                  error={errors}
                  required={true}
                  placeholder="Select document type"
                  defaultValue="Select document type"
                />
              </div> */}

            {/* <div className="col-span-2 w-72 space-y-1">
              <label className="block font-semibold " htmlFor="document_value">
                Document Value
              </label>
              <input
                id="document_value"
                type="file"
                className="py-1 px-4 border  border-gray-300  w-full"
                {...register("document_value", { required: false })}
              />
              {errors.document_value && (
                <p className="text-red-500">Document Value is required</p>
              )}
            </div> */}
            {/* <FileUploadInput
                  label=" Document Values"
                  name="document_value" 
                  register={register}
                  accept="image/*"
                  
                /> */}
          </div>
          <div className="w-full text-center pt-4 space-x-3">
            <button
              type="button"
              onClick={() => window.close()}
              className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewFullUserProfile;

// const EditOrganisation=()=>{

//   return (
//     <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
//     <div className="bg-white p-4 rounded-lg w-full max-w-md">

//       <div className="flex  w-full justify-between text-gray-400 uppercase text-lg border-b mb-5 pb-1">
//         <h1 className=" font-bold  ">Create super ORG</h1>

//       </div>
//       <form onSubmit={handleSubmit(onSubmit)} className="  border-gray-200 ">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 gap-5 justify-center place-items-center p-2 border ">
//           <div className="mb-">
//             <InputField
//               label="Super Organisation Name"
//               type="text"
//               name="org_name"
//               register={register}
//               errors={errors}
//               pattern=""
//             />
//           </div>
//           {/* <div className="mb-">
//             <SelectComponent
//               label="Select User"
//               options={AllUsers}
//               name="user_id"
//               register={register}
//               errors={errors}
//               required={true}
//               defaultValue=""
//             />
//           </div> */}

//           <div className="mb-">
//             <SelectComponent
//               label="Select Category "
//               options={AllCategory}
//               name="client_category_id"
//               register={register}
//               errors={errors}
//               required={true}
//               defaultValue=""
//             />
//           </div>
//           <div className="mb-">
//             {/* <SelectComponent
//               label=" Select Country"
//               options={Country}
//               name="country"
//               register={register}
//               errors={errors}
//               required={true}
//               defaultValue=""
//             /> */}
//           </div>
//           {/* <div className="mb-">
//             <SelectComponent
//               label="Select Organisation Children"
//               options={DocumentType}
//               name="clientLvlOrgIds"
//               register={register}
//               errors={errors}
//               required={true}
//               defaultValue=""
//             />
//           </div> */}
//         </div>

//         <div className=" w-full text-center p-1 mt-3  space-x-2">

//           <button
//           type="button"
//             // onClick={() => onClose()}
//             className="bg-red-500 text-white py-2 px-10 w-32 rounded hover:bg-red-600 transition duration-200"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//              className="bg-green-500 text-white py-2 px-8 w-32 rounded hover:bg-green-600 transition duration-200"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
//   )
// }
