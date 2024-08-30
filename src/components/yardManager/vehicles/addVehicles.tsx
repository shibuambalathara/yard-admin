"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import {
  SelectComponent,
  InputField,
  ImageMaping,
  RadioButtonInput,
  FileUploadInput,
  DateField,
  SelectComponentWithOnchange,
  ControlledInputField,
} from "@/components/ui/fromFields";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
import { vehicleStatus } from "@/utils/staticData";
import DataLoading from "@/components/commonComponents/spinner/DataFetching";
import Spinner from "@/components/commonComponents/spinner/spinner";
import { useRouter } from "next/navigation";
import { inputStyle, labelStyle, loginInputStyle } from "@/components/ui/style";
import { log } from "console";

const AddVehicle = () => {
  const [clientLevelOrg, setClientLevelOrg] = useState([]);
  const [vehicleCategory, setAllVehicleCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState(null);
  const [vehicleCategoryId, setVehicleCategoryid] = useState("");
  const [orgId, setOrgId] = useState("");
  const [parkFee, setParkFee] = useState("");

  const router = useRouter();

  type FileInputs = {
    FRONT_IMAGE: FileList;
    BACK_IMAGE: FileList;
    RIGHT_IMAGE: FileList;
    LEFT_IMAGE: FileList;
    ODOMETER_IMAGE: FileList;
    INTERIOR_IMAGE: FileList;
    OTHER_IMAGE: FileList;
  };
  type Inputs = {
    cl_org_id: string;
    vehicle_category_id: string;
    loan_number: string;
    actual_entry_date: string;
    mfg_year: string;
    make: string;
    model: string;
    variant: string;
    colour: string;
    condition: string;
    start_condition: string;
    reg_number: string;
    eng_number: string;
    chasis_number: string;
    odometer: string;
    board_type: string;
    rc_available: string;
    park_fee_per_day: number;
    key_count: string;
    files: FileInputs; // Files property containing images
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>(
  //   {
  //   defaultValues: {
  //     loan_number: "STRING316",

  //     make: "STRING",
  //     model: "STRING",
  //     variant: "STRING",
  //     colour: "STRING",
  //     condition: "STRING",
  //     start_condition: "1",
  //     reg_number: "KL12GG5698",
  //     eng_number: "STRING",
  //     chasis_number: "STRING",
  //     odometer: "12345678",
  //     board_type: "STRING",
  //     rc_available: "YES", 
  //     key_count: "2",
  //   },
  // }
);

  const fetchParkFeeData = async () => {
    if (vehicleCategoryId && orgId) {
      try {
        const response = await axiosInstance.get(
          `/parkfee/?cl_org_id=${orgId}&vehicle_category_id=${vehicleCategoryId}`
        );
        let result = response?.data?.res?.parkFee[0]?.park_fee_per_day || ""; // Fallback to empty string
        console.log("fetch park fe", result);
        setValue("park_fee_per_day",result)
        setParkFee(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const FetchClientLevelOrgs = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/clientorg/client_lvl_org`);
      // console.log("response", response);

      setClientLevelOrg(response?.data?.res?.clientLevelOrg);
      // toast.success("Client level Organisations fetched successfully");
    } catch (error) {
      console.log("error", error);

      // toast.error("Failed to fetch client level Organisations");
    }
  }, []);

  const FetchAllVehicleCategory = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/Vehicle/cat`);
      setAllVehicleCategory(response?.data?.vehicleCategory);
      reset();
      // toast.success("Vehicle categories fetched successfully");
    } catch (error) {
      // toast.error("Failed to fetch vehicle categories");
      console.log("error", error);
    }
  }, []);

  const ClientOrganisations = clientLevelOrg?.map((item) => ({
    value: item.id,
    label: item.org_name,
  }));

  // console.log("ClientOrganisations",ClientOrganisations);

  const vehicleCategorys = vehicleCategory?.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  // console.log("vehicleCategorys",vehicleCategorys);

  useEffect(() => {
    FetchAllVehicleCategory();
    FetchClientLevelOrgs();
    fetchParkFeeData();
  }, [FetchAllVehicleCategory, FetchClientLevelOrgs, vehicleCategoryId]);

  const AddVehicle = useCallback(async (data: Inputs) => {
    console.log("data on submit", data);

    setIsLoading(true);
    const formData = new FormData();
    const actual_entry_date = data?.actual_entry_date
      ? new Date(data?.actual_entry_date).toISOString()
      : null;
    // console.log("actual entry date", actual_entry_date);
    const mfg_year = data?.mfg_year
      ? new Date(data?.mfg_year).toISOString()
      : null;

    // Append other form data fields
    const dataUpperCase = {
      ...data,
      park_fee_per_day: data?.park_fee_per_day.toString(),
      cl_org_id: data.cl_org_id,
      vehicle_category_id: data.vehicle_category_id,
      loan_number: data.loan_number,
      actual_entry_date: actual_entry_date,
      mfg_year: mfg_year,
      make: data.make,
      model: data.model,
      variant: data.variant,
      colour: data.colour,
      condition: data.condition,
      start_condition: data.start_condition,
      reg_number: data.reg_number,
      eng_number: data.eng_number,
      chasis_number: data.chasis_number,
      odometer: data.odometer,
      board_type: data.board_type,
      rc_available: data.rc_available,
      key_count: data.key_count,
    };
    // /   // Create a FormData object

    // console.log("dataUpperCase", dataUpperCase);

    // Append each key-value pair to the FormData object
    for (const key in dataUpperCase) {
      formData.append(key, dataUpperCase[key]);
    }

    // Utility function to append files to FormData
    const appendFiles = (files: FileList, fieldName: string) => {
      // console.log(`Appending files for field: ${fieldName}`);
      // console.log(files);

      // Convert FileList to array
      const filesArray = Array.from(files);

      filesArray.forEach((file) => {
        formData.append(fieldName, file);
      });
    };

    // Append files to FormData
    appendFiles(data?.files?.FRONT_IMAGE, "FRONT_IMAGE");
    appendFiles(data?.files?.BACK_IMAGE, "BACK_IMAGE");
    appendFiles(data?.files?.RIGHT_IMAGE, "RIGHT_IMAGE");
    appendFiles(data?.files?.LEFT_IMAGE, "LEFT_IMAGE");
    appendFiles(data?.files?.ODOMETER_IMAGE, "ODOMETER_IMAGE");
    appendFiles(data?.files?.INTERIOR_IMAGE, "INTERIOR_IMAGE");
    appendFiles(data?.files?.OTHER_IMAGE, "OTHER_IMAGE");

    console.log("formdata", formData);

    try {
      console.log("Submitting form data to /vehicle/create");
      const response = await axiosInstance.post("/vehicle/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        maxBodyLength: Infinity,
      });
      // console.log("Response received:", response);
      toast.success(response?.data?.message);
      reset();
      router.push("/vehicle");
      // router.push('/vehicle')
    } catch (error) {
      // const [vehicleCategoryId, setVehicleCategoryid] = useState("");
      // const [orgId, setOrgId] = useState("");
      console.log("park fee from above", parkFee);
      console.log("orgId fee from above", orgId);
      console.log("vehicleCategoryId fee from above", vehicleCategoryId);

      // setParkFee(parkFee);
      const errorMessages = error?.response?.data?.message;
      if (Array.isArray(errorMessages)) {
        errorMessages.forEach((msg) => {
          toast.error(msg);
        });
      } else {
        toast.error(error?.response?.data?.message);
      }
      console.error("Error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleOrgChange = (event) => {
    setOrgId(event.target.value);
    setVehicleCategoryid("");
    setParkFee(null);
  };

  const handleVehicleChange = (event) => {
    setVehicleCategoryid(event.target.value);
  };
  const handleParkFee = (e) => {
    console.log("got hitting");
    
    setParkFee(e.target.value);
  };

  // console.log("orgId with onchange", orgId);
  // console.log("vehicle category  with onchange", vehicleCategoryId);

  // console.log("orgId",orgId);
  // const [vehicleCategoryId,setVehicleCategoryid]=useState("")
  // const  [orgId,setOrgId] =useState("")
  // let pf=watch("park_fee_per_day")
  // console.log("pf",pf);

  // console.log("individual park fee", parkFee);

  if (isLoading) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <DataLoading />
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-extrabold text-gray-900">
          Add Vehicle Details
        </h2>
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit(AddVehicle)}
          encType="multipart/form-data"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
            <div>
              <SelectComponentWithOnchange
                label="Select Organisation"
                options={ClientOrganisations}
                name="cl_org_id"
                register={register}
                errors={errors}
                required={true}
                value={orgId}
                onChangeHandler={handleOrgChange}
              />
              
            </div>
            <div>
              
              <SelectComponentWithOnchange
                label="Select Category"
                options={vehicleCategorys}
                name="vehicle_category_id"
                register={register}
                errors={errors}
                required={true}
                value={vehicleCategoryId}
                onChangeHandler={handleVehicleChange}

              />
            </div>

            {/* <div className="flex flex-col h-fit ">
              <label
                className={`${labelStyle.data}`}
                htmlFor="park_fee_per_day"
              >
                Park Fee Per Day
              </label>
              <input
                type="number"
                {...register("park_fee_per_day")}
                className={`${inputStyle.data}`}
                value={parkFee || ""} // Fallback to empty string to ensure it's controlled
                onChange={(e) => setParkFee(e.target.value)} // Update the state when the input changes
              />
            </div> */}

            <ControlledInputField
              label=" Park Fee Per Day"
              type="number"
              name="park_fee_per_day"
              register={register}
              errors={errors}
              pattern
              required={true}
              // value={parkFee || ""} // Fallback to empty string to ensure it's controlled
              // stateValue={setParkFee}
            />
            <InputField
              label="Loan Number"
              type="text"
              name="loan_number"
              register={register}
              errors={errors}
              pattern
            />
            <DateField
              label="Actual Entry Date"
              type="date"
              name="actual_entry_date"
              register={register}
              errors={errors}
              pattern
            />

            <DateField
              label="Manufacturing Date"
              type="date"
              name="mfg_year"
              register={register}
              errors={errors}
              pattern
            />

            <InputField
              label="Make"
              type="text"
              name="make"
              register={register}
              errors={errors}
              pattern
            />
            <InputField
              label="Model"
              type="text"
              name="model"
              register={register}
              errors={errors}
              pattern
            />
            <InputField
              label="Variant"
              type="text"
              name="variant"
              register={register}
              errors={errors}
              pattern
            />
            <InputField
              label="Colour"
              type="text"
              name="colour"
              register={register}
              errors={errors}
              required={false}
              pattern
            />
            <InputField
              label="Condition"
              type="text"
              name="condition"
              register={register}
              errors={errors}
              pattern
              required={false}
            />

            <div>
              <SelectComponent
                label="Start Condition"
                name="start_condition"
                options={vehicleStatus}
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
              />
            </div>
            <InputField
              label="Registration Number"
              type="text"
              name="reg_number"
              register={register}
              errors={errors}
              pattern
            />

            <InputField
              label="Engine Number"
              type="text"
              name="eng_number"
              register={register}
              errors={errors}
              pattern
            />

            <InputField
              label="Chassis Number"
              type="text"
              name="chasis_number"
              register={register}
              errors={errors}
              pattern
            />

            <InputField
              label="Odometer"
              type="number"
              name="odometer"
              register={register}
              errors={errors}
              pattern
            />

            <InputField
              label="Board Type"
              type="text"
              name="board_type"
              register={register}
              errors={errors}
              pattern
              required={false}
            />

            <div className="">
              <RadioButtonInput
                label="RC Available"
                type="radio"
                name="rc_available"
                register={register}
                error={errors}
                defaultValue=""
                placeholder=""
              />
            </div>

            <InputField
              label="Key Count"
              type="number"
              name="key_count"
              register={register}
              errors={errors}
              pattern
            />
            <FileUploadInput
              label="Front image"
              name="files.FRONT_IMAGE" // Accessing FRONT_IMAGE from files
              register={register}
              accept="image/*"
            />
            <FileUploadInput
              label="Back image"
              name="files.BACK_IMAGE" // Accessing BACK_IMAGE from files
              register={register}
              accept="image/*"
            />
            <FileUploadInput
              label="Right image"
              name="files.RIGHT_IMAGE" // Accessing RIGHT_IMAGE from files
              register={register}
              accept="image/*"
            />
            <FileUploadInput
              label="Left image"
              name="files.LEFT_IMAGE" // Accessing LEFT_IMAGE from files
              register={register}
              accept="image/*"
            />
            <FileUploadInput
              label="Odometer image"
              name="files.ODOMETER_IMAGE" // Accessing ODOMETER_IMAGE from files
              register={register}
              accept="image/*"
            />
            <FileUploadInput
              label="Interior image"
              name="files.INTERIOR_IMAGE" // Accessing INTERIOR_IMAGE from files
              register={register}
              accept="image/*"
            />
            <FileUploadInput
              label="Other image"
              name="files.OTHER_IMAGE" // Accessing OTHER_IMAGE from files
              register={register}
              accept="image/*"
            />
          </div>

          <div className="mt-6">
            <ImageMaping images="" />
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
