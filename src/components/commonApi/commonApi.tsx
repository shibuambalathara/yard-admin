import axiosInstance from "@/utils/axios";
import { useCallback } from "react";


const FetchAllClientCategory = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`clientorg/cat/`);

    //   setAllCategory(response?.data?.clientCategory);

      console.log("resposne of FetchAllClientCategory",response);
      return response?.data?.clientCategory
    //   reset();
    //   toast.success("successs");
    } catch (error) {
      console.log("error", error);
    //   toast.error(`something went wrong`);
    }
  }, []);