import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

interface ImageUploadProps {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ images, setImages }) => {
  const [error, setError] = useState<string | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImages((prevImages) => [...prevImages, file]);
    }else{
      
      setError("Please upload at least one image.");
    }
  };

  return (
    <div className="col-span-2">
      <h1 className="block text-gray-700 text-sm font-bold ">
        Upload Images
      </h1>
      <input
        type="file"
        name="files"
        onChange={handleFileChange}
        multiple
        className="hidden"
        // required= {true}
        
      />
      <div className="flex flex-wrap items-center mb-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(image)}
              alt={`Upload Preview ${index}`}
              className="lg:w-72 w-full border border-stone-500-800 p-1 rounded-md h-48 ml-4 mb-4 space-x-2"
            />
          </div>
        ))}
        <div className="ml-4">
          <label className="lg:w-72 w-48 h-40 border-4 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer mb-4">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="flex items-center justify-center space-x-2 ml-2">
              <CiCirclePlus className="w-4 h-4 text-blue-600" />
              <span className="text-gray-500">Choose file</span>
            </div>
          </label>
        </div>
      </div>
      {error && <p className="pl-4 text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default ImageUpload;
