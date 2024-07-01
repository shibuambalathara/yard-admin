"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormFieldInput,
  SelectInput,
  ImageMaping,
  TextArea,
} from "../../ui/fromFields";
import { formStyle, inputStyle,divStyle } from "../../ui/style";
import img1 from "../../../../public/aadhar.jpg";
import img2 from "../../../../public/aadhar.jpg";
import img3 from "../../../../public/aadhar.jpg";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loading from "@/app/(home)/(superAdmin)/loading";
import { Role } from "@/utils/staticData";

type Inputs = {
  name: string;
  email: string;
  contact: number;
  role: string;
  designation: string;
  account_verification: string;
  account_usage_from: Date;
  account_usage_to: Date;
  rejection_cmnt: string;
  document: {
    type: string;
    name: string;
    image: string;
  };
};
const images = [img1, img2, img3];

const ViewFullProfile = ({ profileId }) => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [initialData, setInitialData] = useState<Inputs | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const router = useRouter();
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

  const FetchUserDate = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/account/user/${profileId.profileId}`
      );
      setUserData(response.data.res);
      const modifiedData = {
        ...response?.data?.res,
        account_verification: response?.data?.res?.account_verification,
        account_usage_from:
          response?.data?.res?.account_usage_from?.split("T")[0],
        account_usage_to: response?.data?.res?.account_usage_to?.split("T")[0],
      };

      reset(modifiedData);
      setInitialData(modifiedData);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    FetchUserDate();
  }, [profileId.profileId]);

  const handleUserUpdate = async (data: Inputs) => {
    console.log("Data",data);
    
    const validFrom = data?.account_usage_from
      ? new Date(data.account_usage_from).toISOString()
      : null;
    const validTo = data?.account_usage_to
      ? new Date(data.account_usage_to).toISOString()
      : null;

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
      setUserData(response.data.res);
      router.push("/accountVerificationRequest");
      toast.success(response?.data?.message);
    } catch (error) {
      console.log("error", error);
      // toast.error(error?.response?.data?.message[0]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveClick = () => {
    setModalType("APPROVE");
    setIsModalOpen(true);
  };

  const handleRejectClick = () => {
    setModalType("REJECT");
    setIsModalOpen(true);
  };

  const handleModalSubmit = (data: Inputs) => {
    if (modalType === "APPROVE") {
      setValue("account_verification", "APPROVED");
    } else if (modalType === "REJECT") {
      setValue("account_verification", "REJECTED");
    }
    handleSubmit(handleUserUpdate)();
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  const currentAccountVerification = watch("account_verification");

  return (
    <div className="h-full w-full p-6">
      <h1 className="w-full uppercase border text-center text-lg font-semibold">
        {userData?.name}
      </h1>
      <div className="w-full">
        <form
          onSubmit={handleSubmit(handleUserUpdate)}
          action=""
          className="border scrollbar-hide grid grid-cols-2 w-full h-[600px] content-start gap-y-8 overflow-y-scroll p-4 justify-items-center"
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

          <div className="  space-y-2  col-span-1 ">
          <div className={`${divStyle?.data} text-center justify-center ` }>
            <button
              type="button"
              onClick={handleApproveClick}
              className="bg-green-500 text-white px-4 py-2 border w-40 rounded-md border-none "
            >
              Approve
            </button>
           </div>

           <div className={`${divStyle?.data} justify-center`}>
          <button
              type="button"
              onClick={handleRejectClick}
              className="bg-red-500 text-white px-4 py-2 border w-40 rounded-md"
            >
              Reject
            </button>
          </div>
          </div>

          <div className="col-span-2 border">
            <ImageMaping images={images} />
          </div>
          {/* <div className="w-full col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-[#333333] text-white px-4 py-1 w-60"
            >
              Submit
            </button>
          </div> */}
        </form>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-1/3 border flex flex-col justify-center items-center">
            <h2 className="text-xl font-semibold mb-4">
              {modalType === "APPROVE" ? "Approve Account" : "Reject Account"}
            </h2>
            <form
              onSubmit={handleSubmit(handleModalSubmit)}
            >
              {modalType === "APPROVE" && (
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
                    label="Valid To"
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

              {modalType === "REJECT" && (
                <TextArea
                  label="Rejection Comment"
                  type="text"
                  name="rejection_cmnt"
                  register={register}
                  error={errors.rejection_cmnt}
                  defaultValue=""
                  required
                  placeholder="Rejection Reason "
                />
              )}
              <div className="flex justify-center mt-4 ">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 mr-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`${
                    modalType === "APPROVE"
                      ? "bg-green-500"
                      : "bg-red-500"
                  } text-white px-4 py-2 rounded-md`}
                >
                  {modalType === "APPROVE" ? "Approve" : "Reject"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewFullProfile;
