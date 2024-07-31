"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import DataTable from "@/components/tables/dataTable";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import { MdOutlineViewHeadline } from "react-icons/md";
import Pagination from "@/components/pagination/pagination";
import { inputStyle, labelStyle } from "@/components/ui/style";
import NoVehicleMessage from "@/components/commonComponents/clientLevelUser/noVehicle";
import {
  CategoryFilter,
  ClientFilter,
  Search,
  Status
} from "@/components/reuseableComponent/filter/filters";
import {VehicleState} from "@/utils/staticData"
import Loading from  "@/components/commonComponents/spinner/DataFetching"

const AllRepoDetails = (props) => {
  const { childrenRequire } = props;

  const [filteredData, setFilteredData] = useState(null);
  const [page, setPage] = useState(1);
  const [vehicleCategory, setAllVehicleCategory] = useState([]);
  const [registrationNum, setRegistrationNum] = useState(null);
  const [catFilter, setCatFilter] = useState("");
  const [vehicleStatus, setVehicleStatus] = useState("");
  const [limit, setLimit] = useState(5);
  const [Category, setVehiclecat] = useState("");
  const [allyard, setAllYard] = useState([]);
  const [selectedYard, setSelectedYard] = useState("");
  const [allVehicleOwnerships, setAllVehicleOwerships] = useState(null);
  const [yardFilter, setYardFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [children, setChildren] = useState([]);
  const [searchLoading,setSearchLoading]=useState(false)

  const [client, setClient] = useState("");

  // const fetchChildren = useCallback(async () => {
  //   try {
  //     const response = await axiosInstance.get(
  //       `/clientorg/client_lvl_super_org/child/_org`
  //     );
  //     console.log("fetchChildren response",response);
      
  //     setChildren(response?.data?.res?.clientLvlOrg);
      
  //   } catch (error) {
  //     // toast.error(error?.response?.data?.message);
  //     console.log("fetchChildren error", error);
  //   }
  // }, []);

  // useEffect(() => {
  //   // fetchAllVehicleCategory();
  //   fetchChildren();
  //   // fetchAllYards();
  // }, []);

  const  FetchAllRepoVehilces=
    // useCallback(
    async () => {
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        if (client) {
          params.append("cl_org_id", client);
        }

        if (Category) {
          params.append("vehicle_category_id", Category);
        }
      
        if (vehicleStatus) {
          params.append("status", vehicleStatus);
        }
        if (registrationNum) {
          params.append("searchByRegNo", registrationNum);
        }

        const response = await axiosInstance.get(
          `/repossession/vehicle?${params.toString()}`
        );

      

        console.log("all vehicle ownership", response);

        setAllVehicleOwerships(response?.data?.res?.repoVehicle);

        setFilteredData(response?.data?.res?.totalCount);

        // console.log("response of vehicle ownership00001", response);
      } catch (error) {
        console.log("fetchChildren error", error);
      } finally {
        setLoading(true);
      }
    };
  // [page, limit,Category, selectedYard, vehicleStatus]
  // );
  // //
  const allYardsOptions = allyard?.map((item) => ({
    value: item?.id,
    label: item?.yard_name,
  }));

  console.log(children);

  const superClientOptions = children.map((item) => ({
    value: item.id,
    label: item.org_name,
  }));
  const handleClient = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    setClient(e.target.value);
    // setRoleFilter(selectedOption.text)
    // setClientSelection(true)
  };

  console.log("searchLoading",searchLoading);
  


  useEffect(() => {
    FetchAllRepoVehilces();
  }, [statusFilter, Category, vehicleStatus, page, filteredData, client,registrationNum]);

  const UsersData = allVehicleOwnerships || [];

  const userColumn = useMemo(
    () => [
      {
        header: "Client",
        accessorKey: "cl_org.org_name",
      },
      {
        header: "Reg Number",
        accessorKey: "reg_number",
      },
      {
        header: "make",
        accessorKey: "make",
      },
      {
        header: "model",
        accessorKey: "model",
      },
      {
        header: "Status",
        accessorKey: "status",
      },
      {
        header: "Category ",
        accessorKey: "vehicle_category.name",
      },
      {
        header: "code",
        accessorKey: "code",
      },
      {
        header: "View",
        cell: ({ row }) => <View row={row} />,
      },
    ],
    [filteredData]
  );

// console.log("HADLING SEARCH FOR THIS",registrationNum);

if (searchLoading) {
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <Loading/>
    </div>
  );
}

  return (
    <div className="w-full">
      <h1 className="text-center font-roboto text-lg font-bold py-2 uppercase">
        All Repo Vehicles
      </h1>
      <div className=" grid grid-cols-3  gap-4 items-end px-3 ">
        {/* <div className="flex flex-col w-40 ml-5">
          <label htmlFor="state" className={labelStyle?.data}>
            Select Category
          </label>
          <select
            id="state"
            className={inputStyle?.data}
            defaultValue=""
            onChange={handleCatChange}
          >
            <option value="">All Category</option>
            {vehicleCategory.map((option, index) => (
              <option key={index} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col ml-5">
          <label htmlFor="client" className={labelStyle.data}>
            Select Client
          </label>

          <select
            id="client"
            className={inputStyle.data}
            onChange={handleClient}
          >
            <option value="">Select Client</option>
            {superClientOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div> */}

        {/* <div>
          <ClientFilter />
        </div> */}
        
        <div>
          <CategoryFilter label="Select Category" options={VehicleState}/>
        </div>
       
        <div>
          <Search placeholder='Search by Registration Number' searchLoading={searchLoading} setSearchVehicle={setRegistrationNum} setSearchLoading={setSearchLoading} />
        </div>
      </div>
      <div>
        {filteredData?.totalCount < 1 ? (
          <NoVehicleMessage typeFilter="Vehicles" catFilter={catFilter} />
        ) : (
          <div className="w-full">
            <DataTable data={UsersData} columns={userColumn} />
            <div className="w-full text-center">
              {filteredData?.totalCount > 0 && (
                <Pagination
                  page={page}
                  setPage={setPage}
                  limit={limit}
                  totalDataCount={filteredData?.totalCount}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRepoDetails;

const View = ({ row }) => {
  return (
    <div className="flex justify-center items-center border space-x-1 w-20 bg-gray-700 text-white p-1 rounded-md">
      <p>
        <MdOutlineViewHeadline />
      </p>
      <Link
        href={`/repoUserVehicles/${row.original.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        View
      </Link>
    </div>
  );
};
