import { RiAdminFill } from "react-icons/ri";
import {
  MdDashboard,
  MdManageHistory,
  MdOutlineAddIcCall,
  MdOutlinePreview,
} from "react-icons/md";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { ImTruck } from "react-icons/im";
import { FaUsers, FaUserCircle, FaLink, FaHandsHelping } from "react-icons/fa";
import { CgOrganisation } from "react-icons/cg";
import { GiHomeGarage } from "react-icons/gi";
import { TbListDetails, TbStatusChange } from "react-icons/tb";
import { FaCarOn, FaUsersViewfinder } from "react-icons/fa6";
import { TfiTruck } from "react-icons/tfi";
import { LiaTruckMovingSolid } from "react-icons/lia";
import { HiBuildingOffice2 } from "react-icons/hi2";

export const client_level_super_user = [
  { title: "Dashboard", icon: <MdDashboard /> },
  {
    title: "Yard",
    path: "/",
    icon: <GiHomeGarage />,
    submenu: true,
    submenuItems: [
      {
        title: "Yard Details",
        icon: <TbListDetails />,
        path: "/",
      },

      {
        title: "Yard Rent Details",
        icon: <TbListDetails />,
        path: "/about",
      },
    ],
  },

  {
    title: "Vehicle Ownership Requests",
    icon: <ImTruck />,
    submenu: true,
    submenuItems: [
      {
        title: "Manage Request",
        icon: <MdManageHistory />,
        path: "/login",
      },

      {
        title: "Review Request Status",
        icon: <TbStatusChange />,
        path: "/register",
      },
    ],
  },
  {
    title: "Vehicle Tracking",
    icon: <FaCarOn />,

    submenu: true,
    submenuItems: [
      {
        title: "View Inbound Vehicles",
        icon: <LiaTruckMovingSolid />,
        path: "/profile",
      },
      {
        title: "View Outbound Vehicles",
        icon: <TfiTruck />,
        path: "/profile",
      },
    ],
  },
  {
    title: "Waviers",
    icon: <FaCarOn />,

    submenu: true,
    submenuItems: [
      {
        title: "Request Waiver",
        icon: <LiaTruckMovingSolid />,
        path: "/profile",
      },
      {
        title: "Review Request Status ",
        icon: <TfiTruck />,
        path: "/profile",
      },
    ],
  },
  {
    title: "Vehicle Release",
    icon: <FaCarOn />,

    submenu: true,
    submenuItems: [
      {
        title: "Initiate Release",
        icon: <LiaTruckMovingSolid />,
        path: "/profile",
      },
      {
        title: "Revert Release  ",
        icon: <TfiTruck />,
        path: "/profile",
      },
    ],
  },
];

export const Super_Admin = [
  { title: "Dashboard", icon: <MdDashboard /> },
  {
    title: "Account Verification Requests ",
    icon: <RiAccountPinBoxFill />,
    path: "/accountVerificationRequest",
  },

  {
    title: "Vehicle Category Management ",
    icon: <ImTruck />,
    path: "/vehicleCategoryManagement",
  },

  {
    title: "Client Category Management ",
    icon: <FaUsers />,
    path: "/clientCategoryManagement",
  },

  {
    title: "User Management",
    icon: <FaUserCircle />,
    path: "/userManagement",
  },
  {
    title: "Organisation Management ",
    icon: <CgOrganisation />,
    // path: "/",
    submenu: true,
    submenuItems: [
      {
        title: "Client Level Super Organisation  ",
        icon: <HiBuildingOffice2 />,
        path: "/organisationManagement/clientLevelSuperOrg",
      },
      {
        title: "Client Level Organisation   ",
        icon: <HiBuildingOffice2 />,
        path: "/organisationManagement/clientLevelOrg",
      },
      {
        title: "Client Level Sub Organisation    ",
        icon: <HiBuildingOffice2 />,
        path: "/organisationManagement/clientLevelSubOrg",
      },
      {
        title: "Yard  Organisation  ",
        icon: <HiBuildingOffice2 />,
        path: "/organisationManagement/yardManagement",
      },
    ],
  },
];

export const yardManager = [
  { title: "Dashboard", icon: <MdDashboard /> },
  {
    title: "Park Fee",
    path: "/parkfee",

    icon: <GiHomeGarage />,
  },

  {
    title: "Vehicles",
    icon: <ImTruck />,
    path: "/vehicle",
  },
  {
    title: "Vehicle Ownership",
    icon: <ImTruck />,
    path: "/vehicleOwnership",
  },
  {
    title: "Vehicle Release",
    icon: <ImTruck />,
    submenu: true,
    submenuItems: [
      {
        title: "Initiated Vehicles",
        icon: <TbStatusChange />,
        path: "/releasevehicle/initiatedVehicles",
      },
      {
        title: "Released Vehicles",
        icon: <MdManageHistory />,
        path: "/releasevehicle/releasedVehicles",
      },
    ],
  },
  {
    title: "Waiver",
    icon: <FaCarOn />,
    path: "/waiver ",
  }
  // {
  //   title: "Release Vehicles ",
  //   icon: <FaCarOn />,

  //   submenu: true,
  //   submenuItems: [
  //     {
  //       title: "Initiate Release",
  //       icon: <LiaTruckMovingSolid />,
  //       path: "/releasevehicle/initiateRelease",
  //     },
  //     {
  //       title: " Release History ",
  //       icon: <TfiTruck />,
  //       path: "/releasevehicle/releaseHistory",
  //     },
  //   ],
  // },
];

export const clientLevelUser = [
  { title: "Dashboard", icon: <MdDashboard /> },

  {
    title: "Vehicle Ownership Requests",
    icon: <ImTruck />,
    path: "/vehicleOwnershipClientOrg",
  },
  {
    title: "Vehicles",
    icon: <FaCarOn />,

    submenu: true,
    submenuItems: [
      {
        title: "Instock Vehicles",
        icon: <LiaTruckMovingSolid />,
        path: "/vehicles/instockVehicles",
      },
      {
        title: "Initiated Vehicles  ",
        icon: <TfiTruck />,
        path: "/vehicles/initiatedVehicles",
      },
      {
        title: "Released Vehicles  ",
        icon: <LiaTruckMovingSolid />,
        path: "/vehicles/releasedVehicles",
      },
      {
        title: "Cancelled Vehicles  ",
        icon: <TfiTruck />,
        path: "/vehicles/cancelledVehicles",
      },
    ],
  },
  {
    title: "Vehicle Tracking",
    icon: <FaCarOn />,

    submenu: true,
    submenuItems: [
      {
        title: "View Inbound Vehicles",
        icon: <LiaTruckMovingSolid />,
        path: "/",
      },
      {
        title: "View Outbound Vehicles",
        icon: <TfiTruck />,
        path: "/",
      },
    ],
  },
  {
    title: "Waiver",
    icon: <FaCarOn />,

    submenu: true,
    submenuItems: [
      {
        title: "Eligible for Waiver",
        icon: <LiaTruckMovingSolid />,
        path: "/waivers",
      },
      {
        title: "View Created Waiver ",
        icon: <TfiTruck />,
        path: "/waivers/viewCreatedWaivers",
      },
    ],
  },
];

export const clientLevelSuperUser = [
  { title: "Dashboard", icon: <MdDashboard /> },

  {
    title: "Vehicle Ownership Requests",
    icon: <ImTruck />,
    path: "/vehicleSuperOwnership",
  },
  {
    title: "Vehicles",
    icon: <FaCarOn />,

    submenu: true,
    submenuItems: [
      {
        title: "Instock Vehicles",
        icon: <LiaTruckMovingSolid />,
        path: "/vehiclesSuperOrg/instockVehicles",
      },
      {
        title: "Initiated Vehicles  ",
        icon: <TfiTruck />,
        path: "/vehiclesSuperOrg/initiatedVehicles",
      },
      {
        title: "Released Vehicles  ",
        icon: <LiaTruckMovingSolid />,
        path: "/vehiclesSuperOrg/releasedVehicles",
      },
      {
        title: "Cancelled Vehicles  ",
        icon: <TfiTruck />,
        path: "/vehiclesSuperOrg/cancelledVehicles",
      },
    ],
  },
  {
    title: "User Management",
    icon: <FaCarOn />,
    path: "/userCreation",
  },

  {
    title: "Organisation Management",
    icon: <FaCarOn />,

    submenu: true,
    submenuItems: [
      {
        title: "Client Level Organisation",
        icon: <LiaTruckMovingSolid />,
        path: "/superUserOrgManagement",
      },
      {
        title: "Client Level Sub Organisation",
        icon: <LiaTruckMovingSolid />,
        path: "/superUserOrgManagement/subOrganisation",
      },
      ,
    ],
  },
  {
    title: "Waiver",
    icon: <FaCarOn />,

    submenu: true,
    submenuItems: [
      {
        title: "Eligible For Waiver",
        icon: <LiaTruckMovingSolid />,
        path: "/superWaiver",
      },
      {
        title: "View Created Waiver ",
        icon: <TfiTruck />,
        path: "/superWaiver/viewCreatedWaivers",
      },
    ],
  },
];

export const clientLevelSubUser = [
  { title: "Dashboard", icon: <MdDashboard /> },

  {
    title: "Vehicle Ownership Requests",
    icon: <ImTruck />,
    path: "/vehicleSubOwnership",
  },
  
  {
    title: "Vehicle Tracking",
    icon: <FaCarOn />,

    submenu: true,
    submenuItems: [
      {
        title: "View Inbound Vehicles",
        icon: <LiaTruckMovingSolid />,
        path: "/",
      },
      {
        title: "View Outbound Vehicles",
        icon: <TfiTruck />,
        path: "/",
      },
    ],
  },
];
