"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loading from "@/app/(home)/(superAdmin)/loading";
import { InputField } from "@/components/ui/fromFields";


type Inputs = {
  status: string;
  start_date?: string;
  end_date?: string;
  reason?: string;
};

const RepoRespond = ({ onClose, vehicleId, fetchData, status, user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const handleRepoRequest = async (data: Inputs) => {
    setIsLoading(true);

    const modifiedData: Partial<Inputs> = {
      status,
      ...(status === "REPOSSESSION_REJECTED" || status === "REPOSSESSION_REQUESTED") && { reason: data.reason }
    };

    try {
      const apiUrl = (() => {
        switch (status) {
          case "REPOSSESSION_REQUESTED":
            return `repossession/repo_veh_req/cancel_repossession/${vehicleId}`;
          case "REPOSSESSION_REJECTED":
            return `repossession/repo_veh_req/reject_repossession/${vehicleId?.vehId}`;
          case "REPOSSESSION_APPROVED":
            return `repossession/repo_veh_req/approve_repossession/${vehicleId?.vehId}`;
          default:
            throw new Error("Invalid status");
        }
      })();

      const response = await axiosInstance.patch(apiUrl, modifiedData);

      toast.success(response?.data?.message);
      fetchData();
      onClose();

      if (status !== "REPOSSESSION_REQUESTED") {
        router.push(user === 'client' ? '/requestedRepo' : '/SuperRequestedRepo');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong. Please contact support.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = () => {
    handleSubmit(handleRepoRequest)();
    setConfirmModalOpen(false);
  };

  const handleReject = () => {
     onClose()
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center border-2 h-full w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center relative z-50">
      <div className="bg-white rounded-lg shadow-2xl p-5 max-w-5xl w-full space-y-3">
        <div>
          <h1 className="p-2 uppercase text-start font-semibold text-base text-slate-400">
            Repo Request
          </h1>
          <div className="border-b"></div>
        </div>

        {status === "REPOSSESSION_APPROVED" ? (
          <>
            <ConfirmationModal
              open={confirmModalOpen}
              onConfirm={handleConfirm}
              onCancel={handleReject}
              message="Are you sure you want to approve this repossession?"
            />
            
          </>
        ) : (
          <form className="space-y-2" onSubmit={handleSubmit(handleRepoRequest)}>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-2 border p-4 place-items-center h-auto overflow-y-scroll scrollbar-hide">
              {(status === "REPOSSESSION_REJECTED" || status === "REPOSSESSION_REQUESTED") && (
                <InputField
                  placeholder={status === "REPOSSESSION_REQUESTED" ? "Eg:Sorry, by mistake" : "Eg:Not Satisfied"}
                  label="Reason"
                  type="text"
                  name="reason"
                  register={register}
                  errors={errors}
                  pattern
                />
              )}
            </div>
            <div className="w-full text-center space-x-4">
              <button
                onClick={() => onClose()}
                type="button"
                className="bg-gradient-to-r from-red-500 uppercase to-red-700 text-white py-2 px-8 rounded-lg hover:from-red-600 hover:to-red-800 transition duration-300 transform hover:scale-105"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 uppercase to-green-700 text-white py-2 px-6 rounded-lg hover:from-green-600 hover:to-green-800 transition duration-300 transform hover:scale-105"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RepoRespond;
export const ConfirmationModal = (props) => {
  const { open, onConfirm, onCancel, message }= props
  // if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 px-16 rounded shadow-lg">
        <p className="text-lg font-bold mb-4">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};


