import {AccountStatus} from "@/utils/staticData"
export const RoleSelect = ({ roleOptions, setRoleFilter }) => {
    return (
      <div className="max-w-md mx-auto mt-4">
        <label htmlFor="role-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select a Role
        </label>
        <select
          id="role-select"
          className="block w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option disabled value="">Select a role</option>
          {roleOptions.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    );
  };

  export const SelectStatus = ({ options, setAccountStatus }) => {
    return (
      <div className="max-w-md mx-auto mt-4">
        <label htmlFor="role-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Status
        </label>
        <select
          id="role-select"
          className="block w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          onChange={(e) => setAccountStatus(e.target.value)}
        >
          <option disabled value="">Select a role</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    );
  };