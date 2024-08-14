import axiosInstance from "@/utils/axios";
import { useCallback, useEffect, useState } from "react";


// const FetchAllClientCategory = useCallback(async () => {
//     try {
//       const response = await axiosInstance.get(`clientorg/cat/`);

//     //   setAllCategory(response?.data?.clientCategory);

//       console.log("resposne of FetchAllClientCategory",response);
//       return response?.data?.clientCategory
//     //   reset();
//     //   toast.success("successs");
//     } catch (error) {
//       console.log("error", error);
//     //   toast.error(`something went wrong`);
//     }
//   }, []);



  const useFetchYards = () => {
    const [yards, setYards] = useState([]);
  
    const fetchAllYard = useCallback(async () => {
      try {
        const response = await axiosInstance.get(`/yard`);
        console.log("yard response", response);
  
        const yardData = response?.data?.res.yard.map((item) => ({
          value: item?.id,
          label: item?.org_name,
        }));
  
        setYards(yardData);
      } catch (error) {
        console.log("Error fetching yards", error);
      }
    }, []);
  
    useEffect(() => {
      fetchAllYard();
    }, [fetchAllYard]);
  
    return yards;
  };
  
  export default useFetchYards;