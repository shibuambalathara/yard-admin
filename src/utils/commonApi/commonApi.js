import axiosInstance from "@/utils/axios";
import { useCallback } from "react";
import toast from "react-hot-toast";
export const fetchClientLevelSuperUsers = async () => {
  try {
    const response = await axiosInstance.get(`/clientorg/client_lvl_super_org`);
    const transformedArray = response?.data?.res?.clientLvlSuperOrg.map(
      (item) => ({
        label: item.clsup_org_name,
        value: item.id,
      })
    );
    return transformedArray;
  } catch (error) {
    console.error("Error fetching client level super users", error);
    throw error;
  }
};

export const fetchSuperUserUsers = async () => {
  try {
    const response = await axiosInstance.get(
      `/user/users/created_by_ins?&status=1&role=CLIENT_LEVEL_USER`
    );
    // console.log("response 001",response);

    return response?.data?.res?.users;
    // .map((item) => ({
    //   value: item.id,
    //   label: item.name,
    // }));
    // console.log("response",response);
  } catch (error) {
    console.error("Error fetching client level users", error);
    throw error;
  }
};

export const FetchClientLevelOrgs = async () => {
  try {
    const response = await axiosInstance.get(`/clientorg/client_lvl_org`);
    const data = response?.data?.res?.clientLevelOrg;
    // toast.success(response?.data?.message);
    return data; // Return the fetched data
  } catch (error) {
    console.log("error FetchClientLevelOrgs",error);
    // toast.error(error?.response?.data?.message);
    return []; // Return an empty array or appropriate fallback
  }
}

export const FetchVehicleCategory = async () => {
  try {
    const response = await axiosInstance.get(`/vehicle/cat`);
    // console.log("respose of vehicle category",response);
    const data = response?.data?.vehicleCategory;
    // toast.success(response?.data?.message);
    return data; // Return the fetched data
  } catch (error) {
    console.log("error FetchVehicleCategory",error);

    // toast.error(error?.response?.data?.message);
    return []; // Return an empty array or appropriate fallback
  }
}

export const FetchClientLevelSubUsers = async () => {
  try {
    const response = await axiosInstance.get(`/user/users/assignment?role=CLIENT_LEVEL_SUB_USER`);
    const data = response?.data?.data;
    return data; // Return the fetched data
  } catch (error) {
    console.log("error FetchClientLevelSubUsers",error);

    // toast.error(error?.response?.data?.message);
    return []; // Return an empty array or appropriate fallback
  }
};

export const FetchAllClientCategory = async () => {
  try {
    const response = await axiosInstance.get(`clientorg/cat/`);
    const data = response?.data?.clientCategory;
    // reset();
    return data; // Return the fetched data
  } catch (error) {
    console.log("error FetchClientLevelSubUsers",error);
    // toast.error(error?.response?.data?.message);
    return []; // Return an empty array or appropriate fallback
  }
}


 
export const getUserProfile = async() => {
    try {
      const response = await axiosInstance.get('/user/profile'); // Adjust the URL as needed
      return response?.data?.res;

      console.log("profile response", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  export const updateUserProfile = async (data) => {
    try {
      const response = await axiosInstance.put(`/user/profile`, data); // replace `/path/to/api` with your actual API endpoint
      return response;
    } catch (error) {
      toast.error(error?.response?.data?.message );
      console.log("error",error);
    }
  };

  export const FetchOrganisation=async (data)=>{
    console.log("zzzzz",data);
    try {
      const response = await axiosInstance.get(
        `/user/organizations?role=${data}`
      ); 

      return response
    } catch (error) {
      console.log("fetch org error",error);
    }
  }