"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormFieldInput,
  SelectInput,
  ImageMaping,
  TextArea,
  AccountVerificatioSelect
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
  designation: string;
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
  const [initialData, setInitialData] = useState<Inputs | null>(null); // Store initial values
 const router =useRouter()
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
        `/account/user/${profileId.profileId}`
      );
      // console.log("RESPONSE FROM VEIW SINGLEUSER", response?.data?.res);
      setUserData(response.data.res);
      const modifiedData = {
        ...response?.data?.res,
        account_verification: response?.data?.res?.account_verification,
        account_usage_from:
          response?.data?.res?.account_usage_from?.split("T")[0],
        account_usage_to: response?.data?.res?.account_usage_to?.split("T")[0],
      };

      // console.log("modifiedDAta", modifiedData?.account_verification);

      reset(modifiedData);
      setInitialData(modifiedData); // Store the initial data
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    FetchUserDate();
  }, [profileId.profileId]);

  // console.log("initialData", initialData);
  const currentAccountVerification = watch("account_verification");

  // console.log("currentAccountVerification",currentAccountVerification);
  // console.log("initialData?.account_verification",initialData?.account_verification);
  

  const handleUserUpdate = async (data: Inputs) => {
    // console.log("data on submit", data);
    const validFrom = data?.account_usage_from ? new Date(data.account_usage_from).toISOString() : null;
    const validTo = data?.account_usage_to ? new Date(data.account_usage_to).toISOString() : null;

    const modifiedData = {
      ...data,
      name: data?.name?.toUpperCase(),
      account_usage_from: validFrom,
      account_usage_to: validTo,
      designation: data?.designation?.toUpperCase(),
    };

 

    try {
      const response = await axiosInstance.put(
        `/account/user/${profileId.profileId}`,
        modifiedData
      );
      console.log("UPDATE RESPONSE FROM VEIW SINGLEUSER", response);
      setUserData(response.data.res);
      router.push("/accountVerificationRequest")
      toast.success(response?.data?.message)
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.message[0])
    } finally {
      setIsLoading(false);
    }
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
          onSubmit={handleSubmit(handleUserUpdate)}
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
          <FormFieldInput
            label="Designation"
            type="text"
            name="designation"
            register={register}
            error={errors.designation}
            defaultValue=""
            required
            placeholder=" "
          />
          <SelectInput
            label="Role"
            options={Role}
            name="role"
            register={register}
            error={errors}
            defaultValue=""
            required
          />

          <AccountVerificatioSelect
            label="Account Verification"
            options={AccountStatus}
            name="account_verification"
            register={register}
            error={errors.account_verification}
            defaultValue=""
            required
            currentAccountVerification={currentAccountVerification}
          />
          {currentAccountVerification == "APPROVED" && (
            <>
              <FormFieldInput
                label="Valid From"
                type="date"
                name="account_usage_from"
                register={register}
                error={errors.account_usage_from}
                defaultValue=""
                required
                placeholder=""
              />
              <FormFieldInput
                label="valid To"
                type="date"
                name="account_usage_to"
                register={register}
                error={errors.account_usage_to}
                defaultValue=""
                required
                placeholder=" "
              />
            </>
          )}

{currentAccountVerification == "REJECTED" && (
            <TextArea
              label="Rejection Comment"
              type="number"
              name="rejection_cmnt"
              register={register}
              error={errors.rejection_cmnt}
              defaultValue=""
              required
              placeholder="Rejection Reason "
            />
          )}

          <div className="col-span-2 border ">
            {" "}
            <ImageMaping images={images} />
          </div>
          <div className="w-full col-span-2 flex justify-center   ">
            <button
              type="submit"
              className="bg-[#333333] text-white px-4 py-1 w-60"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewFullProfile;
