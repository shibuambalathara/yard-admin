"use client";
import React from "react";

const ConfirmationModal = ({ isOpen, onCancel, onConfirm ,text}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50 drop-shadow-sm">
      <div className="bg-white w-full md:max-w-md mx-auto rounded-lg shadow-lg overflow-hidden animate-fade-in-down">
        <div className="relative p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Confirm Action</h2>
           
          </div>
          <p className="text-gray-700 mb-6">Are you sure you want to initiate the vehicle release?</p>
          <div className="flex justify-end gap-3">
            
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-red-500 text-white rounded-lg ml-2 hover:bg-red-600 focus:outline-none"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
            >
              Confirm
            </button>
          </div>  
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
