import { RiAdminFill, RiFilePaperLine } from "react-icons/ri";
import {
  MdDashboard,
  MdManageHistory,
  MdOutlineAddIcCall,
  MdOutlinePreview,
  MdWavingHand,
} from "react-icons/md";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { ImTruck } from "react-icons/im";
import { FaUsers, FaUserCircle, FaLink, FaHandsHelping, FaUser, FaHandshake, FaTruckLoading } from "react-icons/fa";
import { CgOrganisation } from "react-icons/cg";
import { GiHomeGarage } from "react-icons/gi";
import { TbListDetails, TbStatusChange } from "react-icons/tb";
import { FaCarOn, FaUsersViewfinder } from "react-icons/fa6";
import { TfiTruck } from "react-icons/tfi";
import { LiaTruckMovingSolid } from "react-icons/lia";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";

import { FaRegHandshake } from 'react-icons/fa';
import { MdDescription } from 'react-icons/md';
import { BsFillTruckFrontFill } from "react-icons/bs";
import { AiFillRightCircle } from "react-icons/ai";




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
    icon: <FaHandshake />,
    path: "/clientCategoryManagement",
  },

  {
    title: "User Management",
    icon: <FaUsers />,
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
      {
        title: "Repo  Organisation  ",
        icon: <HiBuildingOffice2 />,
        path: "/organisationManagement/repoManagement",
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
    icon: 
    <FaCarOn />,
    path: "/vehicle",
  },
  {
    title: "Vehicle Ownership",
    icon: <RiFilePaperLine />,
    path: "/vehicleOwnership",
  },
  {
    title: "Vehicle Release",
    icon: <FaTruckLoading />,
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
    icon: <MdWavingHand />,
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
    icon: <RiFilePaperLine />,
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
    title: "Waiver",
    icon: <MdWavingHand />,

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
  {
    title: "Repo Vehicles",
    icon: <BsFillTruckFrontFill />,
    path: "/repoVehicle",

    },
  {
    title: "Requested for Repos",
    icon: <AiFillRightCircle />,
    path: "",

    
  },


];

export const clientLevelSuperUser = [
  { title: "Dashboard", icon: <MdDashboard /> },

  {
    title: "Vehicle Ownership Requests",
    icon: <VscGitPullRequestNewChanges 
    />,
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
    icon: <FaUsers />,
    path: "/userCreation",
  },

  {
    title: "Organisation Management",
    icon: <CgOrganisation/>,

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
    icon: <FaRegHandshake />,

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
  {
    title: "Repo Vehicles",
    icon: <BsFillTruckFrontFill />,
    path: "/superUserRepoVehicle",

    },
  {
    title: "Requested for Repos",
    icon: <AiFillRightCircle />,
    path: "",

    
  },
];

export const clientLevelSubUser = [
  { title: "Dashboard", icon: <MdDashboard /> },

  {
    title: "Vehicle Ownership Requests",
    icon: <ImTruck />,
    path: "/vehicleSubOwnership",
  },
  
  // {
  //   title: "Vehicle Tracking",
  //   icon: <FaCarOn />,

  //   submenu: true,
  //   submenuItems: [
  //     {
  //       title: "View Inbound Vehicles",
  //       icon: <LiaTruckMovingSolid />,
  //       path: "/",
  //     },
  //     {
  //       title: "View Outbound Vehicles",
  //       icon: <TfiTruck />,
  //       path: "/",
  //     },
  //   ],
  // },
];


export const RepoUser = [
  { title: "Dashboard", icon: <MdDashboard /> },

  {
    title: "Repo Vehicle",
    icon: <ImTruck />,
    path: "/repoVehicle",
  },
  {
    title: "Requested repo Vehicle",
    icon: <ImTruck />,
    path: "/repoVehicle",
  },
  {
    title: "Requested",
    icon: <ImTruck />,
    path: "/vehicleSubOwnership",
  },
  {
    title: "Rejected",
    icon: <ImTruck />,
    path: "/vehicleSubOwnership",
  },
  {
    title: "Approved",
    icon: <ImTruck />,
    path: "/vehicleSubOwnership",
  },
  {
    title: "Repo Vehicle",
    icon: <ImTruck />,
    path: "/vehicleSubOwnership",
  },
  {
    title: "yard Available Vehicle",
    icon: <ImTruck />,
    path: "/vehicleSubOwnership",
  },
  
 
];

export const RepoAdmin = [
  { title: "Dashboard", icon: <MdDashboard /> },

  {
    title: "Repo Vehicle",
    icon: <ImTruck />,
    path: "/vehicleSubOwnership",
  },
  
  
 
];