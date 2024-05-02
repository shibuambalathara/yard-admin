

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
import { VscDebugDisconnect } from "react-icons/vsc";
import { TfiViewListAlt } from "react-icons/tfi";

export const client_level_super_user = [
  { title: "Dashboard", icon: <MdDashboard />, path: "/" },
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
  {
    title: "Dependent User",
    icon: <FaCarOn />,

    submenu: true,
    submenuItems: [
      {
        title: "Create Client User ",
        icon: <LiaTruckMovingSolid />,
        path: "/profile",
      },
      {
        title: "Create Client Sub User  ",
        icon: <TfiTruck />,
        path: "/profile",
      },
      {
        title: "Manage User  ",
        icon: <TfiTruck />,
        path: "/profile",
      },
      
    ],
  },
  {
    title: "Associated Client Management ",
    icon: <FaCarOn />,

    submenu: true,
    submenuItems: [
      {
        title: "Client Level Org ",
        icon: <LiaTruckMovingSolid />,
        path: "/profile",
      },
      {
        title: "Client Level Sub Org   ",
        icon: <TfiTruck />,
        path: "/profile",
      },
      {
        title: "Manage User  ",
        icon: <TfiTruck />,
        path: "/profile",
      },
      
    ],
  },

  {
    title: "Un-Associated Creation  ",
    icon: <FaCarOn />,

    submenu: true,
    submenuItems: [
      {
        title: "Yard ",
        icon: <LiaTruckMovingSolid />,
        path: "/profile",
      },
      {
        title: "Client Level Org   ",
        icon: <TfiTruck />,
        path: "/profile",
      },
      {
        title: "View Un-Associated Creation ",
        icon: <TfiTruck />,
        path: "/profile",
      },
      
    ],
  },
  
  
  
  {
    title: "User Management",
    icon: <MdOutlineAddIcCall />,
    path: "/support",
  },
  {
    title: "Linked Client Management",
    icon: <FaHandsHelping />,
    path: "/report-bug",
  },
];


export const super_admin = [
    { title: "Dashboard", icon: <MdDashboard />, path: "/adminDashboard" },
    {
        title: "Account Verification Requests ",
        icon: <RiAccountPinBoxFill />,
        path: "/accountVerificationRequest",
      },
    
    {
        title: "Vehicle Category Management ",
        icon: <ImTruck />,
        path: "/vehicleCategoryManagement",
    
      // submenu: true,
      // submenuItems: [
      //   {
      //       title: "Manage Category ",
      //       icon: <MdManageHistory />,
    
      //       path: "/",
      //     },
    
  
        
      // ],
    },
  
    {
        title: "Client Category Management ",
        icon: <FaUsers />,
      submenu: true,
      submenuItems: [
        {
            title: "Manage Category ",
            icon: <MdManageHistory />,
            path: "/",
          },
    
  
        
      ],
    },
   
    {
        title: "User Management",
        icon: <FaUserCircle />,
        path: "/userManagement",
      },
      {
        title: "Organisation Management ",
        icon: <CgOrganisation />,
        path: "/",
      },
      {
        title: "Link Accounts  ",
    icon: <FaLink />,

      submenu: true,
      submenuItems: [
        {
            title: "Connect Client Level Super User",
            icon: <VscDebugDisconnect />,
            path: "/",
          },
          {
            title: "View Connections",
            icon: <FaUsersViewfinder />,
            path: "/",
          },
    
  
        
      ],
    },
  ];


// export const super_admin = [
//   {
//     title: "Dashboard",
//     icon: <MdDashboard />,
//     path: "/",
//   },
//   {
//     title: "Account Verification Requests ",
//     icon: <RiAccountPinBoxFill />,
//     path: "/",
//   },
//   {
//     title: "Vehicle Category Management ",
//     icon: <ImTruck />,

//     childrens: [
//       {
//         title: "Manage Category ",
//         icon: <MdManageHistory />,

//         path: "/",
//       },
//     ],
//   },
//   {
//     title: "Client Category Management ",
//     icon: <FaUsers />,
//     childrens: [
//       {
//         title: "Manage Category ",
//         icon: <MdManageHistory />,
//         path: "/",
//       },
//     ],
//   },
//   {
//     title: "User Management",
//     icon: <FaUserCircle />,
//     path: "/",
//   },
//   {
//     title: "Organisation Management ",
//     icon: <CgOrganisation />,
//     path: "/",
//   },
//   {
//     title: "Link Accounts  ",
//     icon: <FaLink />,
//     childrens: [
//       {
//         title: "Connect Client Level Super User",
//         icon: <VscDebugDisconnect />,
//         path: "/",
//       },
//       {
//         title: "View Connections",
//         icon: <FaUsersViewfinder />,
//         path: "/",
//       },
//     ],
//   },
// ];

// export const client_level_super_user = [
//   {
//     title: "Dashboard",
//     icon: <MdDashboard />,
//     path: "/table",
//   },
//   {
//     title: "Yard",
//     icon: <GiHomeGarage />,
//     childrens: [
//       {
//         title: "Yard Details",
//         icon: <TbListDetails />,
//         path: "/",
//       },
//       {
//         title: "Yard Rent Details",
//         icon: <TbListDetails />,
//         path: "/about",
//       },
//     ],
//   },
//   {
//     title: "Vehicle Ownership Requests",
//     icon: <ImTruck />,
//     childrens: [
//       {
//         title: "Manage Request",
//         icon: <MdManageHistory />,
//         path: "/login",
//       },
//       {
//         title: "Review Request Status",
//         icon: <TbStatusChange />,
//         path: "/register",
//       },
//     ],
//   },
//   {
//     title: "Vehicle Tracking",
//     icon: <FaCarOn />,
//     childrens: [
//       {
//         title: "View Inbound Vehicles",
//         icon: <LiaTruckMovingSolid />,
//         path: "/profile",
//       },
//       {
//         title: "View Outbound Vehicles",
//         icon: <TfiTruck />,
//         path: "/profile",
//       },
//     ],
//   },

//   {
//     title: "contact",
//     icon: <MdOutlineAddIcCall />,
//     path: "/support",
//   },
//   {
//     title: "Help",
//     icon: <FaHandsHelping />,
//     path: "/report-bug",
//   },
// ];




export const admin = [
  {
    title: "ADMIN",
  },
  {
    title: "user1",
    icon: "",
    childrens: [
      {
        title: "Home",
        icon: "@",
        path: "/",
      },
      {
        title: "About",
        icon: "@",
        path: "/about",
      },
      {
        title: "Contact",
        icon: "@",
        childrens: [
          {
            title: "Facebook",
            icon: "@",
          },
          {
            title: "Twitter",
            icon: "@",
          },
          {
            title: "Instagram",
            icon: "@",
          },
        ],
      },
      {
        title: "FAQ",
        icon: "@",
      },
    ],
  },
  {
    title: "user2",
    icon: "@",
    childrens: [
      {
        title: "Login",
        path: "/login",
      },
      {
        title: "Register",
        path: "/register",
      },
      {
        title: "Forgot Password",
        path: "/forgot-password",
      },
      {
        title: "Reset Password",
        path: "/reset-password",
      },
    ],
  },
  {
    title: "user3",
    icon: "@",
    childrens: [
      {
        title: "Profile",
        path: "/profile",
      },
      {
        title: "Settings",
        childrens: [
          {
            title: "Account",
            path: "/settings/account",
          },
          {
            title: "Billing",
            childrens: [
              {
                title: "Payment",
                path: "/settings/billing/payment",
              },
              {
                title: "Subscription",
                path: "/settings/billing/subscription",
              },
            ],
          },
          {
            title: "Notifications",
            path: "/settings/notifications",
          },
        ],
      },
      {
        title: "Logout",
        path: "/logout",
      },
    ],
  },
  {
    title: "user4",
    icon: "@",
    childrens: [
      {
        title: "Search",
        path: "/search",
      },
      {
        title: "History",
        path: "/history",
      },
    ],
  },
  {
    title: "Support",
    icon: "@",
    path: "/support",
  },
  {
    title: "Report Bug",
    icon: "@",
    path: "/report-bug",
  },
];

export const yardManager = [
  { title: "Dashboard", icon: <MdDashboard />, path: "/yardDashboard" },
  {
    title: "Park Fee",
   
    icon: <GiHomeGarage />,
    submenu: true,
    submenuItems: [
      {
        title: "Add Park Fee",
        icon: <TbListDetails />,
        path: "/parkfee/addParkFee",
      },

      {
        title: "Manage Park Fee",
        icon: <TbListDetails />,
        path: "/parkfee/manageparkfee",
      },
    ],
  },

  {
    title: "Vehicles",
    icon: <ImTruck />,
    submenu: true,
    submenuItems: [
      {
        title: "Add Vehicle",
        icon: <MdManageHistory />,
        path: "/vehicle/addvehicle",
      },

      {
        title: "Manage Vehicle",
        icon: <TbStatusChange />,
        path: "/vehicle/managevehicle",
      },
      {
        title: "Manage Reject Request",
        icon: <TbStatusChange />,
        path: "/vehicle/managerequestreject",
      },
    ],
  },
  
  {
    title: "Waviers",
    icon: <FaCarOn />,

    submenu: true,
    submenuItems: [
      {
        title: " Manage Request ",
        icon: <LiaTruckMovingSolid />,
        path: "/wavier/managerequest",
      },
      {
        title: "Review Request  ",
        icon: <TfiTruck />,
        path: "/wavier/reviewrequest",
      },
      
    ],
  },
  {
    title: "Release Vehicles ",
    icon: <FaCarOn />,

    submenu: true,
    submenuItems: [
      {
        title: "Initiate Release",
        icon: <LiaTruckMovingSolid />,
        path: "/releasevehicle/initiateRelease",
      },
      {
        title: " Release History ",
        icon: <TfiTruck />,
        path: "/releasevehicle/releaseHistory",
      },
      
    ],
  },
  {
    title: "Create Independent User",
    icon: <FaCarOn />,

    submenu: true,
    submenuItems: [
      {
        title: "Create a Yard-Manager         ",
        icon: <LiaTruckMovingSolid />,
        path: "/createIndependentUser/createYardManager",
      },
      {
        title: "Create a Client",
        icon: <TfiTruck />,
        path: "/createIndependentUser/createAClient",
      },
      
    ],
  },

];

