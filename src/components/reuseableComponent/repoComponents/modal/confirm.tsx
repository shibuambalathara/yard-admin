
export const ConfirmationModal = (props) => {
    const { open, onConfirm, onCancel, message }= props
    // if (!open) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 px-16 rounded shadow-lg">
          <p className="text-lg font-bold mb-4">{message}</p>
          <div className="flex justify-center space-x-4">
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  
  