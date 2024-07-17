"use client";
import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

const App = () => {
  const [images, setImages] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImages([...images, URL.createObjectURL(file)]);
    }
  };

  const handleSubmit = () => {
    // Handle the submit logic here
    console.log("Images submitted:", images);
    setImages([]);
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center  min-h-screen w-full">
      <div className=" p-6 rounded-lg shadow-lg w-full max-w-6xl mt-4">
        <h1 className="text-2xl font-bold mb-4">Upload Vehicle Images</h1>
        <div className="flex flex-wrap items-center mb-4">
          {images.map((image, index) => (
            <div>
              <img
                key={index}
                src={image}
                alt={`Upload Preview ${index}`}
                className="w-40 h-40 ml-4 mb-4 space-x-2"
              />
            </div>
          ))}
          <div className="ml-4">
            <label className=" w-40 h-40 border-4 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer mb-4">
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
        {images.length > 0 && (
          <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
