const Detail = ({ title, value }) => (
    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
      <dt className="text-sm font-bold text-gray-500">{title}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        {value ? value : "N/A"}
      </dd>
    </div>
  );
  
  const DetailsSection = ({ details }) => {
    return (
      <div className="border border-gray-200 px-4 py-5 sm:p-0 rounded">
        <dl className="sm:divide-y sm:divide-gray-200">
          {details.map((detail, index) => (
            <Detail key={index} title={detail.title} value={detail.value} />
          ))}
        </dl>
      </div>
    );
  };
  
  const YardDetails = ({ vehicle }) => {
    const details = [
      { title: "Yard Name", value: vehicle?.vehicle_ownership?.vehicle?.yard?.yard_name },
      { title: "Yard Code", value: vehicle?.vehicle_ownership?.vehicle?.yard?.code },
      { title: "Current Days In Yard", value: vehicle?.curr_days_in_yard },
      { title: "Total Park Fee", value: vehicle?.curr_total_park_fee },
      { title: "Total Waiver Park Fee", value: vehicle?.curr_total_waiver_park_fee },
    ];
  
    return <DetailsSection details={details} />;
  };
  
  const VehicleDetails = ({ vehicle }) => {
    const actual_entry_date = vehicle?.vehicle_ownership?.vehicle?.actual_entry_date ? vehicle?.vehicle_ownership?.vehicle?.actual_entry_date.split("T")[0] : null;
    const details = [
      { title: "Actual Entry Date", value: actual_entry_date },
      { title: "Code", value: vehicle?.vehicle_ownership?.vehicle?.code },
      { title: "Make", value: vehicle?.vehicle_ownership?.vehicle?.make },
      { title: "Model", value: vehicle?.vehicle_ownership?.vehicle?.model },
      { title: "Park Fee Per Day", value: vehicle?.vehicle_ownership?.vehicle?.park_fee_per_day },
      { title: "Registration Number", value: vehicle?.vehicle_ownership?.vehicle?.reg_number },
      { title: "Vehicle Category", value: vehicle?.vehicle_ownership?.vehicle?.vehicle_category?.name },
    ];
  
    return <DetailsSection details={details} />;
  };
  
  const VehicleOwnerships = ({ vehicle }) => {
    const details = [
      { title: "Client Organisation Name", value: vehicle?.vehicle_ownership?.cl_org?.cl_org_name },
      { title: "Code", value: vehicle?.vehicle_ownership?.cl_org?.code },
      { title: "Comment", value: vehicle?.vehicle_ownership?.comment },
      { title: "Status", value: vehicle?.vehicle_ownership?.status },
    ];
  
    return <DetailsSection details={details} />;
  };
  
  const ReleaseDetails = ({ vehicle }) => {
    console.log("vehicle from ReleaseDetails",vehicle?.release_detail?.release_date);
    
    const release_details = vehicle?.release_detail?.release_date ? vehicle?.release_detail?.release_date?.split("T")[0] : null;
console.log("release_details",release_details);

    const details = [
      { title: "Collected Amount", value: vehicle?.release_detail?.collected_amount },
      { title: "Days In Yard", value: vehicle?.release_detail?.days_in_yard },
      { title: "Payment Document", value: vehicle?.release_detail?.payment_doc },
      { title: "Payment Status", value: vehicle?.release_detail?.payment_status },
      { title: "Receiver Name", value: vehicle?.release_detail?.receiver_name },
      { title: "Receiver Contact", value: vehicle?.release_detail?.receiver_contact },
      { title: "Release Date", value:  release_details },
      { title: "Release Document", value: vehicle?.release_detail?.release_doc },
      { title: "Total Amount", value: vehicle?.release_detail?.total_amount },
      { title: "Total Park Fee", value: vehicle?.release_detail?.total_park_fee },
      { title: "Total Waiver Park Fee", value: vehicle?.release_detail?.total_waiver_park_fee },
    ];
  
    return <DetailsSection details={details} />;
  };
  
  export { YardDetails, VehicleDetails, VehicleOwnerships, ReleaseDetails };
  