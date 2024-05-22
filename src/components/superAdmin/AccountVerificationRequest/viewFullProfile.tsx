"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormFieldInput,
  SelectInput,
  ImageMaping,
  TextArea,
} from "../../ui/fromFields";
import { formStyle } from "../../ui/style";
import Link from "next/link";
import img1 from "../../../../public/aadhar.jpg";
import img2 from "../../../../public/aadhar.jpg";
import img3 from "../../../../public/aadhar.jpg";
import img4 from "../../../../public/aadhar.jpg";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loading from "@/app/(home)/(superAdmin)/loading";
import { Role, AccountStatus } from "@/utils/staticData";

type Inputs = {
  name: string;
  email: string;
  contact: number;
  role: string;
  account_verification: string; // Assuming accountVerification is a string

  account_usage_from: Date;
  account_usage_to: Date;
  rejection_cmnt: string;
  document: {
    type: string;
    name: string;
    image: string;
  };
};
const images = [img1, img2, img3]; // Array containing imported images

const ViewFullProfile = ({ profileId }) => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null); // State to store fetched user data
  const [isLoading, setIsLoading] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Inputs>();

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
  // console.log("profileid", profileId);

  const FetchUserDate = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `http://13.232.152.20/api/v1/yms/account/user/${profileId.profileId}`
      );
      console.log("RESPONSE FROM VEIW SINGLEUSER", response?.data?.res);
      setUserData(response.data.res);
      const modifiedData = {
        ...response?.data?.res,

        account_usage_from:
          response?.data?.res?.account_usage_from?.split("T")[0],
        account_usage_to: response?.data?.res?.to?.split("T")[0],
      };

      console.log("modifiedDAta", modifiedData?.account_verification);

      reset(modifiedData);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    FetchUserDate();
  }, [profileId.profileId]);

  // useEffect(() => {
  //   if (userData) {
  //     // Set default values for each form field
  //     setValue("name", userData.name);
  //     setValue("email", userData.email);
  //     setValue("contact", userData.contact);
  //     setValue("role", userData.role);
  //     setValue("accountVerification", userData.accountVerification);
  //     setValue("validFrom", userData.accountValidFrom);
  //     setValue("validTo", userData.accountValidTo);
  //     setValue("rejectionComment", userData.rejectionComment);
  //     // Handle setting default value for document if available
  //     if (userData.documents && userData.documents.length > 0) {
  //       setValue("document", {
  //         type: userData.documents[0].type,
  //         name: userData.documents[0].name,
  //         image: userData.documents[0].image,
  //       });
  //     }
  //   }
  // }, [userData, setValue]);

  const onSubmit = (data: Inputs) => {
    // Handle form submission
  };

  if (isLoading) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="  h-full w-full p-6">
      <h1 className="w-full uppercase border text-center text-lg font-semibold">
        {userData?.name}
      </h1>
      <div className="  w-full ">
        <form
          action=""
          className="border scrollbar-hide grid grid-cols-2 w-full  h-[600px] content-start gap-y-8 overflow-y-scroll  p-4 justify-items-center"
        >
          <FormFieldInput
            label="Name"
            type="text"
            name="name"
            register={register}
            error={errors.name}
            defaultValue=""
            required
            placeholder=""
          />
          <FormFieldInput
            label="Email"
            type="email"
            name="email"
            register={register}
            error={errors.email}
            defaultValue=""
            required
            placeholder=" "
          />
          <FormFieldInput
            label="Contact"
            type="tel"
            name="contact"
            register={register}
            error={errors.contact}
            defaultValue=""
            required
            placeholder=" "
          />
          <SelectInput
            label="Role"
            options={Role}
            name="role"
            register={register}
            error={errors.role}
            defaultValue=""
            required
            
          />
          <SelectInput
            label="Account Verification"
            options={AccountStatus}
            name="account_verification"
            register={register}
            error={errors.account_verification}
            defaultValue=""
            required
            
          />
          <FormFieldInput
            label="Valid From"
            type="date"
            name="validFrom"
            register={register}
            error={errors.account_usage_from}
            defaultValue=""
            required
            placeholder="Park Fee Per Day"
          />
          <FormFieldInput
            label="valid To"
            type="date"
            name="validTo"
            register={register}
            error={errors.account_usage_to}
            defaultValue=""
            required
            placeholder=" "
          />
          <TextArea
            label="Rejection Comment"
            type="number"
            name="rejectionComment"
            register={register}
            error={errors.rejection_cmnt}
            defaultValue=""
            required
            placeholder="Rejection Reason "
          />

          <div className="col-span-2 ">
            {" "}
            <ImageMaping images={images} />
          </div>
          <div className="w-full col-span-2 flex justify-between ">
            <button
              type="submit"
              className="bg-[#333333] text-white px-4 py-1 w-60"
            >
              Approve
            </button>
            <button
              type="submit"
              className="bg-[#333333] text-white px-4 py-1 w-60"
            >
              Reject
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewFullProfile;
