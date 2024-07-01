
"use client"
const ConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
        <div className="bg-white w-full md:max-w-md mx-auto rounded-lg shadow-lg overflow-hidden animate-fade-in-down">
          <div className="relative p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Confirm Action</h2>
             
            </div>
            <div className="mb-4">
            <p className="text-gray-700 ">
              Are you sure you want to initiate the vehicle release?
            </p>
            <p className="text-xs text-red-700">* Careful once done action cannot be reverted</p>
            </div>
           
            <div className="flex justify-end">
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
              >
                Confirm
              </button>
              <button
                onClick={onCancel}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg ml-2 hover:bg-gray-400 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmationModal