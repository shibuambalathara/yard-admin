import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Image from 'next/image';

interface VehicleImageGridProps {
  vehicleImages: string[]; // Array of image URLs
  onImageDelete?: (url: string) => void; // Optional function to handle image deletion
}

const VehicleImageGrid: React.FC<VehicleImageGridProps> = ({
  vehicleImages,
  onImageDelete,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {vehicleImages?.map((url, index) => (
        <div key={index} className="group cursor-pointer relative">
          <Image
            src={url}
            alt={`Vehicle Image ${index + 1}`}
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105 shadow-lg"
          />
          {/* Conditionally render delete button only if onImageDelete is provided */}
          {onImageDelete && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button   

                type="button"
                onClick={() => onImageDelete(url)}
                className="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <FaTrashAlt className="text-red-500" />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VehicleImageGrid;