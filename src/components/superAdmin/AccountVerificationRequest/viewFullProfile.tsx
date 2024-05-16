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

type Inputs = {
  name: string;
  email: string;
  contact: number;
  role: string;
  accountVerification: string; // Assuming accountVerification is a string
  validFrom: Date;
  validTo: Date;
  rejectionComment: string;
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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue
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
  console.log("profileid", profileId);

  const FetchUserDate = async () => {
    try {
      const response = await axiosInstance.get(
        `http://13.232.152.20/api/v1/yms/account/user/${profileId.profileId}`
      );
      console.log("RESPONSE FROM VEIW SINGLEUSER", response);
      setUserData(response.data.user);

    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    FetchUserDate();
  }, []);

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

  const AccountStatus=[
    {label:"Approved",value:"APPROVED"},
    {label:"Rejected",value:"REJECTED"}
  ]

  const onSubmit = (data: Inputs) => {
    // Handle form submission
  };

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
            defaultValue={userData?.name}
            required
            placeholder=""
          />
          <FormFieldInput
            label="Email"
            type="email"
            name="email"
            register={register}
            error={errors.email}
            defaultValue={userData?.email}
            required
            placeholder=" "
          />
          <FormFieldInput
            label="Contact"
            type="number"
            name="contact"
            register={register}
            error={errors.contact}
            defaultValue={parseInt(userData?.contact)}
            required
            placeholder=" "
          />
          <FormFieldInput
            label="Role"
            type="string"
            name="role"
            register={register}
            error={errors.role}
            defaultValue={userData?.role}
            required
            placeholder=" "
          />
          <SelectInput
            label="Account Verification"
            options={AccountStatus}
            name="accountVerification"
            register={register}
            error={errors.accountVerification}
            defaultValue=""
            required
            placeholder="Park "
            data={userData?.accountVerification}
          />
          <FormFieldInput
            label="Valid From"
            type="date"
            name="validFrom"
            register={register}
            error={errors.validFrom}
            defaultValue=""
            required
            placeholder="Park Fee Per Day"
          />
          <FormFieldInput
            label="valid To"
            type="date"
            name="validTo"
            register={register}
            error={errors.validTo}
            defaultValue=""
            required
            placeholder=" "
          />
          <TextArea
            label="Rejection Comment"
            type="number"
            name="rejectionComment"
            register={register}
            error={errors.rejectionComment}
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
