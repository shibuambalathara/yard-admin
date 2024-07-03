"use client"
import React from 'react'
import { FormFieldInput, FormFieldInputLoginInput } from "../ui/fromFields";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import useAuthStore from '../../store/useAuthStore';
import Cookies from 'js-cookie';

const LoginUsingOtp = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

      const registering = useAuthStore((state) => state.register);
      // console.log("register",registering);
      const handleLogin = () => {
        // console.log("handleLogin from otp compoennt");
        const user = {
          name: "prince",
          email: "prince@example.com", // Provide an appropriate email
          designation: "admin", // Provide an appropriate designation
          role: "admin"
        };// You may receive more user data from authentication
        const authToken = 'some_authentication_token';
        const role="admin"
        registering(user,role);
        Cookies.set('authToken', authToken, { expires: 7 });
        // console.log("ablljflajsdf");
      //   if(!!authToken)
        router.push('/');
        
       };
  return (
    <div className=" bg-red-100  flex items-center justify-center  ">
    

    <div className="w-96 h-full border drop-shadow-xl flex flex-col ">
      <h1 className=" py-2 uppercase flex items-center justify-center   w-full bg-[#333333] text-center font-semibold  text-white font-roboto">
        Login
      </h1>
      <div className="flex flex-col p-6 w-full h-full   bg-white  ">
        <form
          action=""
          className="flex flex-col justify-center items-center  space-y-2  w-full  "
          onSubmit={handleSubmit(handleLogin)}
        >
          <FormFieldInputLoginInput
            label=""
            type="text"
            name="mobile"
            register={register}
            error={errors.mobile}
            defaultValue=""
            required
            placeholder="Enter Your mobile Number "
          />
          

          <div className="w-full">
            <button
              type="submit"
              className="bg-[#333333] text-white px-4 py-1 w-full"
              // onClick={handleLogin}
            >
              Submit
            </button>
          </div>
        </form>
            <div className="text-center flex  flex-col text-sm w-full  justify-center pt-2">
            <div className="w-full flex justify-center space-x-1 text-sm">
                {" "}
                <p>Don't have an account ?</p> <Link className="text-blue-800 text-sm" href="/register">create account </Link>
            </div>

            </div>
      </div>
    </div>
  </div>
  )
}

export default LoginUsingOtp