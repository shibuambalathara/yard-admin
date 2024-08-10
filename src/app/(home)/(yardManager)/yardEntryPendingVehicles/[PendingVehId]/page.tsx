import IndividualEntryPendingVehicle from "@/components/yardManager/yardEntryPendingVehicles/individualEntryPending"


const IndividualPendingVehicle = ({params}:{params:{pendingVehId:string}})=> {
  return (
    <div> 
         <IndividualEntryPendingVehicle  pendingVehId={params}/> 
          </div>
  )
}

export default IndividualPendingVehicle