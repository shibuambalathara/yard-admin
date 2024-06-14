"use client";
import React, { useState,useEffect } from "react";
import Image from "next/image";
import yms from "../../../public/yard managment system.jpg";
import { FormFieldInput, FormFieldInputLoginInput } from "../ui/fromFields";
import { useForm } from "react-hook-form";
import Link from "next/link";
import useAuthStore from '../../store/useAuthStore';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import axiosInstance from "../../utils/axios"
import toast from "react-hot-toast";


// import Router from "next/router";
import { loginInputStyle } from "../../components/ui/style";
const LogInPassword = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState(""); // State to manage login error message
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
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
    formState: { errors },
  } = useForm();
  const registering = useAuthStore((state) => state.register);
  // console.log("register",registering);
  const handleLogin = async(data) => {
    try {
      // console.log("handleLogin", data);
  
      const { email, password } = data; // Extract email and password from form data
  
      // Send user credentials to the server
      const response = await axiosInstance.post('/auth/login', {
        email: email,
        password: password
      });
      
      console.log("log from login",response);
      // console.log('User FROM API RESPONSE', response.data);
  
      // If API call is successful, register user, set token, and redirect
      const user = {
        name:response?.data?.user?.name ,
        email: response?.data?.user?.email, // Use the email from the form data
        role: response?.data?.user?.role,
        organisation:response?.user?.organisation
      };
      const authToken = response.data.user.accessToken;
      // console.log("TOKEN FROM API RESPONSE",authToken);
      const role = response.data.user.role;
      localStorage.setItem('token',authToken)
      registering(user, authToken, role);
      Cookies.set('authToken', authToken);
      setSuccess({
        text: "You have been successfully logged in.",
    });
      // router.push('/');
    } catch (error) {
      console.error('ERROR FROM fetching users:', error.response.data.message);
      setLoginError(error.response.data.message);
      setError({
        text: "Invalid username or password.",
    });


    }
  };
  
  
 

  return (
    <div className="  flex items-center justify-center  ">
   

      <div className="w-96 h-full border drop-shadow-xl flex flex-col ">
        <h1 className=" py-2 uppercase flex items-center justify-center   w-full bg-[#333333] text-center font-semibold  text-white font-roboto">
          Login
        </h1>
        <div className="flex flex-col w-full    bg-white p-4  ">
          <form
            action=""
            className="flex flex-col justify-center items-center  space-y-2  w-full  "
            onSubmit={handleSubmit(handleLogin)}
          >
            <FormFieldInputLoginInput
              label=""
              type="email"
              name="email"
              register={register}
              error={errors.email}
              defaultValue=""
              required
              placeholder="Your Email"
            />
            <FormFieldInputLoginInput
              label=""
              type="password"
              name="password"
              register={register}
              error={errors.password}
              defaultValue=""
              placeholder="Your Password"
              required
            />
            {loginError && (
              <p className="text-red-500 text-sm mt-1">{loginError}</p>
            )}

            <div className="w-full">
              <button
                type="submit"
                className="bg-[#333333] text-white px-4 py-1 w-full"
              >
                Submit
              </button>
            </div>
          </form>
          <div className="text-center flex  flex-col text-sm w-full space-y-1 mt-2">
            <div className="w-full flex justify-center space-x-1 text-sm">
              {" "}
              <p>Don't have an account ?</p> <Link className="text-blue-800 text-sm" href="/register">create account </Link>
            </div>
            <Link className="text-red-400" href="/resetpassword">Forget Password ? </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInPassword;
