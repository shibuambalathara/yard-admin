"use client";
import React,{useState} from "react";
import { FormFieldInputLoginInput } from "../ui/fromFields";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";

const ForgetPassword = () => {
    // const router = useRouter();
    const [mobileMode, setMobileMode] = useState(true);
    const [verificationMode, setVerificationMode] = useState(false);
    const [updatePasswordMode, setUpdatePasswordMode] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleFMobileNumber=()=>{
    setMobileMode(false)
    setVerificationMode(true)
  }

  const handleOtp=()=>{
    setVerificationMode(false)

    setUpdatePasswordMode(true)
  }

  const handlePassword=()=>{
    router.push(`/login`);
  }

  return (
    <div className="flex flex-col  h-full  w-96 border   ">
      <h1 className=" py-2 uppercase flex items-center justify-center   w-full bg-[#333333] text-center font-semibold  text-white font-roboto">
        Reset Password
      </h1>
      <div className="bg-white p-10">
      {mobileMode&& (
        <form
        action=""
        className="flex flex-col justify-center items-center  space-y-2  w-full mt-2 "
        onSubmit=""
      >
        <FormFieldInputLoginInput
          label=""
          type="text"
          name="mobile"
          register={register}
          error={errors.mobile}
          defaultValue=""
          required
          placeholder="Enter Your Mobile Number "
        />

        <div className="w-full">
          <button
            type="submit"
            className="bg-[#333333] text-white px-4 py-1 w-full rounded-md"
            onClick={handleFMobileNumber}
          >
            Submit
          </button>
        </div>
      </form>
      )}

      {verificationMode && (
        <form
        action=""
        className="flex flex-col justify-center items-center  space-y-2  w-full mt-2 "
        onSubmit=""
      >
        <FormFieldInputLoginInput
          label=""
          type="text"
          name="mobile"
          register={register}
          error={errors.mobile}
          defaultValue=""
          required
          placeholder="Please enter the OTP "
        />

        <div className="w-full space-y-2">
          <button
            type="submit"
            className="bg-[#333333] text-white px-4 py-1 w-full rounded-md"
            onClick={handleOtp}
          >
            Submit
          </button>
          <button
            type="submit"
            className="bg-[#333333] text-white px-4 py-1 w-full rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
      )}
      {updatePasswordMode && (
        <form
        action=""
        className="flex flex-col justify-center items-center  space-y-2  w-full mt-2 "
        onSubmit=""
      >
        <FormFieldInputLoginInput
          label=""
          type="text"
          name="password"
          register={register}
          error={errors.password}
          defaultValue=""
          required
          placeholder="Enter Your New Password "
        />

<FormFieldInputLoginInput
          label=""
          type="text"
          name="confirm_password"
          register={register}
          error={errors.mobile}
          defaultValue=""
          required
          placeholder="Confirm Your  Password "
        />

        <div className="w-full space-y-2">
          <button
            type="submit"
            className="bg-[#333333] text-white px-4 py-1 w-full rounded-md"
            onClick={handleOtp}
          >
            Update password
          </button>
          <button
        //   onClick={handlePassword}
            type="submit"
            className="bg-[#333333] text-white px-4 py-1 w-full rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
      )}
      
      </div>
    </div>
  );
};

export default ForgetPassword;
