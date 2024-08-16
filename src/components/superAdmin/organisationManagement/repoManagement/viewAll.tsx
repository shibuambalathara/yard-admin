"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import DataTable from "@/components/tables/dataTable";
import { Role } from "@/utils/staticData";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import CreateUserModal from "@/components/superAdmin/UserManagment/createUser";
import { RoleSelect } from "@/components/commonComponents/role";
import Loading from "@/app/(home)/(superAdmin)/loading";
import toast from "react-hot-toast";
import { FaUserSlash, FaUser, FaRegEye } from "react-icons/fa";
import { FaUserLargeSlash, FaUserLarge } from "react-icons/fa6";
import { GrFormView } from "react-icons/gr";
import { MdOutlineViewHeadline } from "react-icons/md";
import CreateClientLevelOrg from "@/components/superAdmin/organisationManagement/clientLevelOrg/addClientLevelOrgs";
import Pagination from "@/components/pagination/pagination";
import { CgOrganisation } from "react-icons/cg";
import AddRepo from "./AddRepo";
import { inputStyle, labelStyle } from "@/components/ui/style";
import { Cities } from "@/utils/cities";
import ViewRepoManagement from "./EditRepo";

const AllRepoManagemnet = () => {
  const [filteredData, setFilteredData] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [catFilter, setCatFilter] = useState("");
  const [yardFilter, setYardFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Initially set to true to show loading spinner
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [selectedState, setSelectedState] = useState("");
  const [filterDistricts, setFilterDistricts] = useState([]);
  const [selectDistrict, setSelectDistrict] = useState("");
  const stateDropdownRef = useRef(null);
  const [stateAndCities, setAllStatesAndCities] = useState([]);
  const [uniqueStates, setUniqueStates] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  useEffect(() => {
    // Extract unique state names from Cities array
    const uniqueStates = Cities?.reduce((acc, current) => {
      if (!acc.includes(current?.state)) {
        acc.push(current?.state);
      }
      return acc;
    }, []);

    setUniqueStates(uniqueStates);
  }, []); // Only run once on component mount

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.get(
        `/repo-agency?page=${page}&limit=${limit}&state=${selectedState}&city=${selectDistrict}`
      );
      console.log("all yards", response);
      setFilteredData(response?.data?.res);

      setSuccess({
        text: response?.data?.message,
      });
    } catch (error) {
      setError({
        text: error?.response?.data?.message,
      });
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page, selectedState, selectDistrict]);
  console.log("filt", filteredData);
  const handleEditClick = (userId) => {
    setSelectedUserId(userId);
    setEditModalOpen(true);
  };
  const UsersData = filteredData?.repoAgency || [];

  const userColumn = useMemo(
    () => [
      {
        header: "organization name",
        accessorKey: "org_name",
      },
      {
        header: "state",
        accessorKey: "state",
      },
      {
        header: "City",
        accessorKey: "city",
      },
      {
        header: "Code",
        accessorKey: "code",
      },

      {
        id: "view",
        header: "View ",
        cell: ({ row }) => (
          <div className="w-20">
            <View row={row} onEditClick={handleEditClick} />
          </div>
        ),
      },
    ],
    [filteredData]
  );

  console.log("filteredData subOrg", filteredData);

  // const handleStateChange = (e) => {
  //   const selectedState = e.target.value;
  //   // console.log("selectedState from handle change",selectedState);

  //   setSelectedState(selectedState);
  //   const stateData = Cities.filter((item) => item.state === selectedState);
  //   console.log("selected state from state array", stateData);

  //   !selectedState && setFilterDistricts([]);

  //   stateData ? setFilterDistricts(stateData?.map((item) => item?.city)) : [];
  //   setSelectDistrict("");

  //   setCatFilter(e.target.value);
  // };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;

    setSelectedState(selectedState);

    const stateData = Cities.filter((item) => item.state === selectedState);

    setFilterDistricts(selectedState ? stateData.map((item) => item.city) : []);
    setSelectDistrict(""); // Reset city selection to show placeholder
    // setCatFilter(e.target.value);
  };
  console.log("filtered districts", filterDistricts);

  const handleDistricChange = (e) => {
    setSelectDistrict(e.target.value);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    // setSelectedUserId(null);
  };

  return (
    <div className="w-full">
      <h1 className="text-center font-roboto text-lg font-bold py-2 uppercase">
        Repo Management
      </h1>
      <div className="grid grid-cols-3 px-5 items-center  gap-4  justify-center">
        {/*  */}
        <div className="flex flex-col w-24 ml-px  ">
          <label htmlFor="state" className={labelStyle?.data}>
            Select State
          </label>
          <select
            id="state"
            className={inputStyle?.data}
            defaultValue=""
            onChange={handleStateChange}
            ref={stateDropdownRef}
          >
            <option>Select State</option>
            <option value="">ALL STATE</option>

            {uniqueStates.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          {/* {errors.state && (
              <p className="text-red-500">State is required</p>
                          )} */}
        </div>

        <div className="flex flex-col ">
          <label htmlFor="district" className={labelStyle?.data}>
            Select District
          </label>

          <select
            id="district"
            className={inputStyle?.data}
            value={selectDistrict} // Bind the value to state
            onChange={handleDistricChange}
          >
            <option value="" disabled hidden>
              Select City
            </option>
            {filterDistricts?.map((option, index) => (
              <option key={index} value={option}>
                {option}  
              </option>
            ))}
          </select>

          {/* {errors.state && (
    <p className="text-red-500">State is required</p>
  )} */}
        </div>
        <div className="self-end justify-self-end mb-2 flex gap-5">
          <button
            onClick={handleModalOpen}
            className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-200 mr-12"
          >
            Add
          </button>
        </div>
        <div className="w-full relative">
          {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
              <AddRepo onClose={handleModalClose} fetchData={fetchData} />
            </div>
          )}
        </div>
      </div>
      {editModalOpen && (
        <div className="w-full relative">
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
            <ViewRepoManagement
              clientSuperId={selectedUserId}
              onClose={handleEditModalClose}
              fetchData={fetchData}
            />
          </div>
        </div>
      )}
      <div>
        {filteredData?.totalCount < 1 ? (
          <div className="flex flex-col justify-center items-center h-96 p-8">
            <div className="mb-6">
              <CgOrganisation className="text-red-500 font-bold text-6xl" />
            </div>
            <p className="text-gray-700 text-md font-semibold mb-2 uppercase">
              <>
                <span>No Organization Found</span>
              </>
            </p>
          </div>
        ) : (
          <>
            {filteredData && (
              <>
                <DataTable data={UsersData} columns={userColumn} />
                <div className="w-full text-center">
                  {filteredData?.totalCount > 0 && (
                    <Pagination
                      page={page}
                      setPage={setPage}
                      totalDataCount={filteredData?.totalCount}
                      limit={limit}
                    />
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllRepoManagemnet;
const View = ({ row, onEditClick }) => {
  console.log("row form category", row);

  return (
    <div
      onClick={() => onEditClick(row?.original?.id)}
      className="flex justify-center items-center py-1 px-3   space-x-2 bg-gray-700 rounded-md  text-white"
    >
      <p>
        <MdOutlineViewHeadline />
      </p>

      <span> View</span>
    </div>
  );
};
