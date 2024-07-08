"use client";
import { useEffect,useState } from "react";
import { useForm } from "react-hook-form";
import { FormFieldInput, SelectInput,FormFieldPassword, SelectComponent } from "../ui/fromFields";
import { formStyle } from "../ui/style";
import axiosInstance from "@/utils/axios";
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";
import React from "react";
import Link from "next/link";
type Inputs = {
  name: string;
  email: string;
  contact: number;
  designation: string;
  role: string;
  password: string;
  confirmPassword:string;
};
const UserRegistration = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
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

  const bidStatusOptions = [
   
    { label: "Yard Manager", value: "YARD_MANAGER" },
    
    { label: "Client Level  User", value: "CLIENT_LEVEL_USER" },

    
  ];

  const password = watch('password');
  
  const onSubmit = async (data: Inputs) => {
    try {
      // console.log("ONSUBMIT", data);
      
      // Modify the contact number to include "91" prefix
      const modifiedData = {
        ...data,
        contact: `+91${data.contact}`,
        name:data?.name.toUpperCase()

      };

      const response = await axiosInstance.post('/user/signup', modifiedData);
      // console.log("Response:", response);
      setSuccess({
        text: "Registration Success.",
    });
      router.push('/login');

    } catch (error) {
      console.error("Error:", error.response);
      toast.error(error?.response?.data?.message)
      

    }
  };

  return (
    <div className="flex items-center justify-center  h-screen w-full ">
      <form className={`${formStyle.data} bg-white rounded-md overflow-hidden sm:max-w-2xl sm:w-full  border-4 border-gray-200`} onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full  text-center uppercase font-bold">
          <h1>Fill the form to Register </h1>
        </div>
        <div className="grid sm:grid-cols-2 w-full ">
        <FormFieldInput
          label=""
          type="text"
          name="name"
          register={register}
          error={errors.name}
          defaultValue=""
          required
          placeholder="Name"
        />
        <FormFieldInput
          label=""
          type="email"
          name="email"
          register={register}
          error={errors.email}
          defaultValue=""
          required
          placeholder="Email"
        />
        <FormFieldInput
          label=""
          type="text"
          name="contact"
          register={register}
          error={errors.contact}
          defaultValue=""
          required
          placeholder="contact"
        />
        <FormFieldInput
          label=""
          type="text"
          name="designation"
          register={register}
          error={errors.designation}
          defaultValue=""
          required
          placeholder="Designation"
        />
        <SelectComponent
          label=""
          name="role"
          defaultValue=""
          options={bidStatusOptions}
          register={register}
          errors={errors}                             
          required={true}
          placeholder="Please Select Role"

       
        />
        <FormFieldPassword
          label=""
          type="password"
          name="password"
          register={register}
          error={errors} // Pass the error message from useForm hook
          defaultValue=""
          required
          placeholder="Password"
          isConfirmPassword={false}
          confirmValue=""
        />

        {/* Confirm Password Field */}
        <FormFieldPassword
          label=""
          type="password"
          name="confirmPassword"
          register={register}
          error={errors} // Pass the error message from useForm hook
          defaultValue=""
          required
          placeholder="Confirm Password"
          isConfirmPassword={true}
          confirmValue={password}
        />
        </div>
          {/* {errors.confirmPassword && <p className="text-red-500">Passwords do not match</p>} */}

        <div className=" w--full text-center ">
          <button
            type="submit"
            className="bg-[#333333] text-white px-4 py-1 w-52 rounded"
          >
            Submit
          </button>
        </div>
        <div className="w-full flex text-center  justify-center space-x-2">
          <p>Have an account ? </p> <p className="text-blue-400"><Link href='/login'>Login</Link></p>
        </div>
      </form>
    </div>
  );
};

export default UserRegistration;
