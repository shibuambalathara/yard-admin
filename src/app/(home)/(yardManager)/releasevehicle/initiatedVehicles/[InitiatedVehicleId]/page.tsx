
import InitiatedVehicle from "@/components/yardManager/vehicleRelease/initiatedVehicles/individualInitiatedVehicle"


const IndividualInitiatedVehicle = ({params}:{params:{initiatedId:string}})=> {
  return (
    <div> 
         <InitiatedVehicle  initiatedId={params}/> 
          </div>
  )
}

export default IndividualInitiatedVehicle