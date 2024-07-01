"use client"
import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "@/utils/axios";
import useAuthStore from '@/store/useAuthStore';
import { GiToken } from "react-icons/gi";
const FileUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const accessToken = useAuthStore.getState().token;

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    const dataUpperCase = {
      cl_org_id: "clwvy3b59002114fcukflaulh",
      vehicle_category_id: "clwp4f8jx000nttj2kb7acu40",
      loan_number: "311",
      actual_entry_date: "2024-06-05T00:00:00.000Z",
      mfg_year: "2024-06-14T00:00:00.000Z",
      make: "STRING",
      model: "STRING007",
      variant: "STRING",
      colour: "STRING",
      condition: "STRING",
      start_condition: "1",
      reg_number: "KL08BC0144",
      eng_number: "STRING",
      chasis_number: "STRING",
      odometer: "444",
      board_type: "STRING",
      rc_available: "YES",
      key_count: "4",
    };

    for (const key in dataUpperCase) {
      formData.append(key, dataUpperCase[key]);
    }

    formData.append("FRONT_IMAGE", selectedFile);
    formData.append("BACK_IMAGE", selectedFile);
    formData.append("RIGHT_IMAGE", selectedFile);
    formData.append("LEFT_IMAGE", selectedFile);
    formData.append("ODOMETER_IMAGE", selectedFile);
    formData.append("INTERIOR_IMAGE", selectedFile);
    formData.append("OTHER_IMAGE", selectedFile);

    

    // const token = accessToken;

    // axios
    //   .post("http://13.232.152.20/api/v1/yms/vehicle/create", formData, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "multipart/form-data",
    //     },
    //     maxBodyLength: Infinity,
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     alert("File uploaded successfully");
    //   })
    //   .catch((error) => {
    //     console.error("There was an error uploading the file!", error);
    //     alert("File upload failed");
    //   });

    const tokens = accessToken; // Replace with your JWT token
console.log(tokens);

// try {
//   const response = await fetch("http://13.232.152.20/api/v1/yms/vehicle/create", {
//     method: "POST",
//     body: formData,
//     headers: {
//       Authorization: `Bearer ${tokens}`,
//     },
//   });

//   if (response.ok) {
//     console.log("File uploaded successfully");
//     alert("File uploaded successfully");
//   } else {
//     console.error("Error occurred while uploading the file:", response.statusText);
//     alert("File upload failed");
//   }
// } catch (error) {
//   console.error("Error occurred while uploading the file:", error);
//   alert("File upload failed");
// }


      try {
        console.log('Submitting form data to /vehicle/create');
        const response = await axiosInstance.post("/vehicle/create", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          maxBodyLength: Infinity,
        

        });
        
        console.log('Response received:', response);
        // toast.success(response?.data?.res?.message);
      } catch (error) {
        console.error('Error occurred:', error);
       
      }

  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="file"
        name="file"
        onChange={(e) => setSelectedFile(e.target.files?.[0])}
      />
      <input type="submit" value="Upload" />
    </form>
  );
};

export default FileUploadForm;



// function UploadForm() {
//   const [file, setFile] = useState<File>()
//   const [selectedFile, setSelectedFile] = useState(null);

//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     if (!file) return

//     try {
//       const data = new FormData()
//       data.set('file', file)

//       const res = await fetch('/vehicle/create', {
//         method: 'POST',
//         body: data
//       })

//       console.log("response",res);
      
//       // handle the error
//       if (!res.ok) throw new Error(await res.text())
//     } catch (e: any) {
//       // Handle errors here
//       console.error(e)
//     }
//   }

//   return (
//     <form onSubmit={onSubmit}>
//       <input
//         type="file"
//         name="file"
//         onChange={(e) => setFile(e.target.files?.[0])}
//       />
//       <input type="submit" value="Upload" />
//     </form>
//   )
// }

// export default UploadForm
