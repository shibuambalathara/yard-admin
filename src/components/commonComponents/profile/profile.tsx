"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import useAuthStore from "@/store/useAuthStore";
import { getUserProfile, updateUserProfile } from "@/utils/commonApi/commonApi";
import { InputField } from "@/components/ui/fromFields";

type Document = {
  doc_name: string;
  doc_type: string;
  doc_src: string;
};
type FileInputs = {
  AADHAR_FRONT?: File | string;
  AADHAR_BACK?: File | string;
  PANCARD_FRONT?: File | string;
  PANCARD_BACK?: File | string;
};
type User = {
  code: string;
  contact: string;
  designation: string;
  document?: Document[];
  email: string;
  id: string;
  name: string;
  files: FileInputs;
};

const Profile = () => {
  const [user, setUser] = useState<User | null>({
    code: "",
    contact: "",
    designation: "",
    document: [],
    email: "",
    id: "",
    name: "",
    files: {
      AADHAR_FRONT: undefined,
      AADHAR_BACK: undefined,
      PANCARD_FRONT: undefined,
      PANCARD_BACK: undefined,
    },
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<User>();
  const { role } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        console.log("response", response);

        setUser(response);
        const cleanedPhoneNumber = response?.contact?.replace("+91", "");
        const modifiedData = { ...response, contact: cleanedPhoneNumber };
        reset(modifiedData);
      } catch (error) {
        console.error("error", error);
      }
    };

    fetchUserProfile();
  }, [reset]);

  const toggleDisabled = () => setIsDisabled(!isDisabled);

  
  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    docType: keyof FileInputs
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setUser((prevUser) => {
        if (prevUser) {
          const updatedDocument = prevUser.document
            ? prevUser.document.map((doc) =>
                doc.doc_type === docType ? { ...doc, doc_src: fileURL } : doc
              )
            : [{ doc_name: "", doc_type: docType, doc_src: fileURL }];

          return {
            ...prevUser,
            files: {
              ...prevUser.files,
              [docType]: file,
            },
            document: updatedDocument,
          };
        }
        return prevUser;
      });
      setValue(`files.${docType}`, file); // Ensure `docType` is a valid key
    }
  };

  const handleDeleteImage = (docType: string) => {
    setUser((prevUser) => {
      if (prevUser) {
        const updatedDocument = prevUser.document?.filter(
          (doc) => doc.doc_type !== docType
        );

        return {
          ...prevUser,
          [docType]: null,
          document: updatedDocument,
        };
      }
      return prevUser;
    });
    // setValue(docType as keyof User, null);
    // setValue(`files.${docType}`, null);
    setValue(`files.${docType as keyof FileInputs}`, null);


  };

  // const UpdateUserProfile = async (data: User) => {
  //   console.log("data on submit", data);

  //   try {
  //     const formData = new FormData();
  //     formData.append("name", data.name);
  //     formData.append("email", data.email);
  //     formData.append("contact", `+91${data.contact}`);
  //     formData.append("designation", data.designation);

  //     for (const key of Object.keys(data.files) as (keyof FileInputs)[]) {
  //       if (data.files[key] instanceof File) {
  //         formData.append(key, data.files[key]);
  //       }
  //     }

  //     const response = await updateUserProfile(formData);
  //     if (response?.data) {
  //       setIsDisabled(true);
  //       toast.success("Profile updated successfully!");

  //       // Optionally update the user in the store
  //       const updatedUserData = response?.data?.res;
  //       const updatedProperties = {
  //         name: updatedUserData.name,
  //         email: updatedUserData.email,
  //         contact: updatedUserData.contact,
  //         designation: updatedUserData.designation,
  //       };
  //       const currentUser = useAuthStore.getState().user;
  //       if (currentUser) {
  //         const updatedUser = { ...currentUser, ...updatedProperties };
  //         useAuthStore.setState({ user: updatedUser });
  //       }
  //     }
  //     //  else {
  //     //   throw new Error("Update failed");
  //     // }
  //   } catch (error) {
  //     console.log("error", error);

  //     toast.error("Profile update failed.");
  //   }
  // };
  const UpdateUserProfile = async (data: User) => {
    console.log("data on submit", data);
  
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("contact", `+91${data.contact}`);
      formData.append("designation", data.designation);
  
      for (const key of Object.keys(data.files) as (keyof FileInputs)[]) {
        if (data.files[key] instanceof File) {
          formData.append(key, data.files[key]);
        }
      }
  
      const response = await updateUserProfile(formData);
      if (response?.data) {
        setIsDisabled(true);
        toast.success("Profile updated successfully!");
  
        // Optionally update the user in the store
        const updatedUserData = response?.data?.res;
        const updatedProperties = {
          name: updatedUserData.name,
          email: updatedUserData.email,
          contact: updatedUserData.contact,
          designation: updatedUserData.designation,
        };
        const currentUser = useAuthStore.getState().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...updatedProperties };
          useAuthStore.setState({ user: updatedUser });
        }
      }
    } catch (error) {
      console.error('Error updating profile', error);
      toast.error("Profile update failed.");
    }
  };
  
  const isDocumentUpdateAllowed =
    role === "YARD_MANAGER" || role === "CLIENT_LEVEL_USER";

  // const renderDocument = (docType: string) => {
  //   const document = user?.document?.find((doc) => doc.doc_type === docType);

  //   return (
  //     <div className="col-span-1 relative">
  //       {document?.doc_src || user?.[docType] ? (
  //         <>
  //           <img
  //             src={document?.doc_src || URL.createObjectURL(user[docType] as File)}
  //             alt={docType}
  //             className="w-full h-auto rounded-lg"
  //           />
  //           <button
  //             onClick={() => handleDeleteImage(docType)}
  //             type="button"
  //             className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition duration-200"
  //           >
  //             <FaTrashAlt />
  //           </button>
  //         </>
  //       ) : (
  //         <label className="cursor-pointer">
  //           <div className="w-full h-full flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg">
  //             <FaPlus className="text-2xl text-gray-500" />
  //           </div>
  //           <input
  //             type="file"
  //             accept="image/*"
  //             className="hidden"
  //             onChange={(e) => handleFileUpload(e, docType)}
  //           />
  //         </label>
  //       )}
  //     </div>
  //   );
  // };

  const renderDocument = (docType: keyof FileInputs) => {
    const document = user?.document?.find((doc) => doc.doc_type === docType);

    return (
      <div className="col-span-1 relative">
        {document?.doc_src || (user?.files && user.files[docType]) ? (
          <>
            <img
              src={
                document?.doc_src ||
                URL.createObjectURL(user.files[docType] as File)
              }
              alt={docType}
              className="w-full h-auto rounded-lg"
            />
            <button
              onClick={() => handleDeleteImage(docType)}
              type="button"
              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition duration-200"
            >
              <FaTrashAlt />
            </button>
          </>
        ) : (
          <label className="cursor-pointer">
            <div className="w-full h-full flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg">
              <FaPlus className="text-2xl text-gray-500" />
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, docType)}
            />
          </label>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-gray-700">
              Update User Profile
            </h1>
          </div>
          <div
            onClick={toggleDisabled}
            className="flex items-center bg-blue-500 text-white py-2 px-4 space-x-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            <button type="button">Edit</button>
            <FaEdit className="text-base" />
          </div>
        </div>
        <form onSubmit={handleSubmit(UpdateUserProfile)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-1">
              <InputField
                label="Name"
                type="text"
                name="name"
                register={register}
                errors={errors}
                disabled={isDisabled}
                pattern
              />
            </div>
            <div className="col-span-1">
              <InputField
                name="email"
                label="Email"
                type="email"
                register={register}
                errors={errors}
                pattern={/^\S+@\S+$/i}
                disabled={isDisabled}
              />
            </div>
            <div className="col-span-1">
              <InputField
                name="contact"
                label="Contact"
                type="text"
                register={register}
                errors={errors}
                pattern={/^\d{10}$/}
                disabled={isDisabled}
              />
            </div>
            <div className="col-span-1">
              <InputField
                label="Designation"
                type="text"
                name="designation"
                register={register}
                errors={errors}
                disabled={isDisabled}
                pattern
              />
            </div>
            {/* Document Images */}
            {renderDocument("AADHAR_FRONT" as keyof FileInputs)}
            {renderDocument("AADHAR_BACK" as keyof FileInputs)}
            {renderDocument("PANCARD_FRONT" as keyof FileInputs)}
            {renderDocument("PANCARD_BACK" as keyof FileInputs)}
          </div>
          <div className="w-full text-center pt-4 space-x-4">
            {isDisabled ? (
              <button
                type="button"
                onClick={router.back}
                className="bg-red-500 text-white py-2 px-10 rounded-md hover:bg-red-600 transition duration-200"
              >
                Back
              </button>
            ) : (
              <div className="space-x-2">
                <button
                  onClick={toggleDisabled}
                  type="button"
                  className="bg-red-600 text-white py-2 px-10 rounded-md hover:bg-red-700 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white py-2 px-10 rounded-md hover:bg-green-700 transition duration-200"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
