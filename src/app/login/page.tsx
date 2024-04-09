"use client";

import LogInComponent from "@/components/auth/loginUsingpassword";
import LoginUsingOtp from "@/components/auth/loginUsingOtp";
import React from "react";
import yms from "../../../public/yard managment system.jpg";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import Logo from "../../../public/login-logo.png";
import AuthTemplate from "../../components/templates/AuthTemplate";
const Login = () => {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <AuthTemplate>
      {/* <div className='w-full'><LogInComponent/></div> */}
      <div className=" w-96 flex items-center justify-center  z-[10] relative ">
        <div className="  p-1 py-4 px-4  ">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded bg-blue-900/20 p-1   ">
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full rounded py-2.5 text-sm font-medium leading-5",
                    "ring-white ring-opacity-60 ring-offset-2  focus:outline-none focus:ring-2",

                    selected ? "bg-gray-500 text-white" : "bg-white text-black"
                  )
                }
              >
                Login Using OTP
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full rounded py-2.5 text-sm font-medium leading-5",
                    "ring-white ring-opacity-60  ring-offset-0 focus:outline-none focus:ring-2",
                    selected ? "bg-gray-500 text-white" : "bg-white text-black"
                  )
                }
              >
                Login Using Password
              </Tab>
            </Tab.List>

            <Tab.Panels className="mt-2">
              <Tab.Panel>
                <LoginUsingOtp />
              </Tab.Panel>

              <Tab.Panel>
                <LogInComponent />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </AuthTemplate>
  );
};

export default Login;
