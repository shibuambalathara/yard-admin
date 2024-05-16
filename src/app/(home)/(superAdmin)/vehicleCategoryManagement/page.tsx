
"use client";
import { useMemo } from 'react'
import { useState,useEffect } from 'react';
import data from "@/components/tables/mockData.json"
import DataTable from "@/components/tables/dataTable"
import Link from 'next/link';
import axiosInstance from '@/utils/axios'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const VehicleCategoryManagement = () => {

  const [category,setCategory]=useState()
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [page,setpage]=useState(1)
  const router = useRouter();
  // console.log("vehicle category managgemtne page mounted");

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

useEffect(() => {
  console.log('page mount');

  return () => {
    console.log('page unmounted');
  }
}, [])


const fetchData = () => {
  const logTime = () => {
    return new Date().getTime();
  };

  const startTime = logTime();
  console.log('Start of fetchData:', new Date(startTime).toLocaleTimeString());
  
  axiosInstance.get(`/vehicle/cat`)
    .then(response => {
      const endTime = logTime();
      const timeDifference = (endTime - startTime) / 1000; // Convert milliseconds to seconds
      console.log('End of API call:', new Date(endTime).toLocaleTimeString());
      console.log('Time difference between start and end of fetchData  in vehicle page:', timeDifference, 'seconds');

      console.log('RESPONSE OF VEHICLE CAT', response);
      setCategory(response?.data?.vehicleCategory);
      setSuccess({
        text: response?.data?.message,
      });
    })
    .catch(error => {
      console.log('error from vehiclecat', error);
      toast.error(error?.response?.data?.message);
    });
};


// console.log('useState from veh-cat',category);


  useEffect(()=>{
    fetchData()
  },[])
    // const categoryData = useMemo(() => category, [])

    const categoryColumn = useMemo(
      () => [
        {
          header: 'Name',
          accessorKey: 'name',
        },
        {
          header: 'description ',
          accessorKey: 'description',
        },
        {
          header: 'view ',
          accessorKey: 'id',
          cell: ({ row }) => View(row),
        },
        
    ],[])
  return (
    <div className='w-full p-2 '>
        <h1 className='text-center font-roboto text-lg font-bold py-4 uppercase'>Manage Vehcile Category</h1>
        <div className=" w-36  flex flex-col text-center space-y-2  mx-4">
          <Link href="/vehicleCategoryManagement/addCategory" className="bg-gray-700 text-white px-4 py-1 ml-3 rounded-md "
>Add Category</Link>
          </div>  
        <div>
      {category &&<DataTable data={category} columns={categoryColumn} />}  
        </div>
        
        </div>
  )
}

export default VehicleCategoryManagement


const View = (row) => {
  // console.log("view", row);
  return (
    <div>
      <Link href={`/vehicleCategoryManagement/${row.original.id}`}>View</Link>
    </div>
  );
};