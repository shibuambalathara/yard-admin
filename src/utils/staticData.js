// export const bidStatusOptions = [
//   { label: "Super Admin", value: "super_admin" },
//   { label: "Yard Manager", value: "yard_manager" },
//   { label: "Client Level Super User", value: "client_level_super_user" },
//   { label: "Client Level  User", value: "client_level_user" },
//   { label: "Client Level Sub User", value: "client_level_subsuer" },
// ];
export const RoleAliass = {
  SUPER_ADMIN: "SUPER ADMIN ",
  YARD_MANAGER: "YARD MANAGER",
  CLIENT_LEVEL_SUPER_USER: "CLIENT LEVEL SUPER USER",
  CLIENT_LEVEL_USER: "CLIENT LEVEL USER",
  CLIENT_LEVEL_SUB_USER: "CLIENT LEVEL SUB USER",
  REPO_USER:"REPO USER"
};

export const RepossessionStatus = {
  REPOSSESSION_APPROVED: "REPOSSESSION APPROVED",
  REPOSSESSION_REJECTED: "REPOSSESSION REJECTED",
  REPOSSESSION_REQUESTED: "REPOSSESSION REQUESTED",
};
export const HeaderRole = {
  SUPER_ADMIN: "SUPER ADMIN ",
  YARD_MANAGER: "YARD MANAGER",
  CLIENT_LEVEL_SUPER_USER: " SUPER USER",
  CLIENT_LEVEL_USER: " USER",
  CLIENT_LEVEL_SUB_USER: " SUB USER",
};

export const superOrgCat = [
  { label: "GOVERNMENT", value: "GOVERNMENT" },
  { label: "INSURANCE", value: "INSURANCE" },
  { label: "BANK", value: "BANK" },
];

export const Role = [
  { label: "Super Admin", value: "SUPER_ADMIN" },
  { label: "Yard Manager", value: "YARD_MANAGER" },
  { label: "Client Level Super User", value: "CLIENT_LEVEL_SUPER_USER" },
  { label: "Client Level  User", value: "CLIENT_LEVEL_USER" },
  { label: "Client Level Sub User", value: "CLIENT_LEVEL_SUB_USER" },
  { label: "Repo User", value: "REPO_USER" },
  { label: "Repo Admin", value: "REPO_ADMIN" },
];

export const SuperUserChildren = [
  { label: "Yard Manager", value: "YARD_MANAGER" },
  { label: "Client Level  User", value: "CLIENT_LEVEL_USER" },
  { label: "Client Level Sub User", value: "CLIENT_LEVEL_SUB_USER" },
];

export const AccountStatus = [
  { label: "PENDING", value: "PENDING" },
  { label: "REJECTED", value: "REJECTED" },
  { label: "APPROVED", value: "APPROVED" },
];
export const RepoStatus = [
  // { label: "PENDING", value: "PENDING" },
  { label: "REJECTED", value: "" },
  { label: "APPROVED", value: "REPOSSESSION_APPROVED" },
];

export const UserStatus = [
  { label: "ACTIVE", value: 1 },
  { label: "INACTIVE", value: 0 },
  ,
];
export const VehicleEntryStatus = [
  { label: "ENTRY REQUESTED", value: "ENTRY_REQUESTED" },
  { label: "ENTRY APPROVED", value: "ENTRY_APPROVED" },
  { label: "ENTRY REJECTED", value: "ENTRY_REJECTED" },
  { label: "ENTRY CANCELLED", value: "ENTRY_CANCELLED" },
];

export const vehicleEntryAlias = {
  ENTRY_REQUESTED: "ENTRY REQUESTED",
  ENTRY_APPROVED: "ENTRY APPROVED",
  ENTRY_REJECTED: "ENTRY REJECTED",
  ENTRY_CANCELLED: "ENTRY CANCELLED",
};

export const YardEntryStatus = [
  { label: "ENTRY PENDING", value: false },
  { label: "ENTRY COMPLETED ", value: true },
];

export const demo = [
  { label: "DEMO1", value: "DEMO1" },
  { label: "DEMO2", value: "DEMO2" },
  { label: "DEMO3", value: "DEMO3" },
];

export const VehicleState = [
  { label: "PENDING", value: "PENDING" },
  { label: "REJECTED", value: "REJECTED" },
  { label: "APPROVED", value: "APPROVED" },
];

export const RepoStatus2 = [
  { label: "PENDING", value: "PENDING" },
  { label: "ONGOING", value: "ONGOING" },
  { label: "CLOSED", value: "CLOSED" },
];

export const ReleaseStatus = [
  { label: "INITIATED", value: "INITIATED" },
  { label: "CANCELLED", value: "CANCELLED" },
];

export const WaiverStatus = [
  { label: "PENDING", value: "PENDING" },
  { label: "CANCELLED", value: "CANCELLED" },
  // { label: "APPROVED", value: "APPROVED" },
];
// export const YardWaiver = [
//   { label: "PENDING", value: "PENDING" },
//   { label: "CANCELLED", value: "CANCELLED" },
//   { label: "APPROVED", value: "APPROVED" },
// ];
export const vehicleStatus = [
  { label: "YES", value: 1 },
  { label: "NO", value: 0 },
];

export const DocumentType = [
  { label: "Aadhar", value: "AADHAR" },
  { label: "Pancard", value: "PANCARD" },
];

export const paymentStatus = [
  { label: "SUCCESS", value: "SUCCESS" },
  { label: "FAILED", value: "FAILED" },
  { label: "PENDING", value: "PENDING" },
];

export const superUserStatus = [
  { label: "ACTIVE", value: 1 },
  { label: "INACTIVE", value: 0 },
];

export const Country = [{ label: "INDIA", value: "INDIA" }];

export const State = [
  { label: "ANDHRA PRADESH", value: "ANDHRA PRADESH" },
  { label: "ARUNACHAL PRADESH", value: "ARUNACHAL PRADESH" },
  { label: "ASSAM", value: "ASSAM" },
  { label: "BIHAR", value: "BIHAR" },
  { label: "CHHATTISGARH", value: "CHHATTISGARH" },
  { label: "GOA", value: "GOA" },
  { label: "GUJARAT", value: "GUJARAT" },
  { label: "HARYANA", value: "HARYANA" },
  { label: "HIMACHAL PRADESH", value: "HIMACHAL PRADESH" },
  { label: "JHARKHAND", value: "JHARKHAND" },
  { label: "KARNATAKA", value: "KARNATAKA" },
  { label: "KERALA", value: "KERALA" },
  { label: "MADHYA PRADESH", value: "MADHYA PRADESH" },
  { label: "MAHARASHTRA", value: "MAHARASHTRA" },
  { label: "MANIPUR", value: "MANIPUR" },
  { label: "MEGHALAYA", value: "MEGHALAYA" },
  { label: "MIZORAM", value: "MIZORAM" },
  { label: "NAGALAND", value: "NAGALAND" },
  { label: "ODISHA", value: "ODISHA" },
  { label: "PUNJAB", value: "PUNJAB" },
  { label: "RAJASTHAN", value: "RAJASTHAN" },
  { label: "SIKKIM", value: "SIKKIM" },
  { label: "TAMIL NADU", value: "TAMIL NADU" },
  { label: "TELANGANA", value: "TELANGANA" },
  { label: "TRIPURA", value: "TRIPURA" },
  { label: "UTTAR PRADESH", value: "UTTAR PRADESH" },
  { label: "UTTARAKHAND", value: "UTTARAKHAND" },
  { label: "WEST BENGAL", value: "WEST BENGAL" },
];

export const states = [
  {
    state: "ANDHRA PRADESH",
    districts: [
      "ANANTAPUR",
      "CHITTOOR",
      "EAST GODAVARI",
      "GUNTUR",
      "KRISHNA",
      "KURNOOL",
      "NELLORE",
      "PRAKASAM",
      "SRIKAKULAM",
      "VISAKHAPATNAM",
      "VIZIANAGARAM",
      "WEST GODAVARI",
      "YSR KADAPA",
    ],
  },
  {
    state: "ARUNACHAL PRADESH",
    districts: [
      "TAWANG",
      "WEST KAMENG",
      "EAST KAMENG",
      "PAPUM PARE",
      "KURUNG KUMEY",
      "KRA DAADI",
      "LOWER SUBANSIRI",
      "UPPER SUBANSIRI",
      "WEST SIANG",
      "EAST SIANG",
      "SIANG",
      "UPPER SIANG",
      "LOWER SIANG",
      "LOWER DIBANG VALLEY",
      "DIBANG VALLEY",
      "ANJAW",
      "LOHIT",
      "NAMSAI",
      "CHANGLANG",
      "TIRAP",
      "LONGDING",
    ],
  },
  {
    state: "ASSAM",
    districts: [
      "BAKSA",
      "BARPETA",
      "BISWANATH",
      "BONGAIGAON",
      "CACHAR",
      "CHARAIDEO",
      "CHIRANG",
      "DARRANG",
      "DHEMAJI",
      "DHUBRI",
      "DIBRUGARH",
      "GOALPARA",
      "GOLAGHAT",
      "HAILAKANDI",
      "HOJAI",
      "JORHAT",
      "KAMRUP METROPOLITAN",
      "KAMRUP",
      "KARBI ANGLONG",
      "KARIMGANJ",
      "KOKRAJHAR",
      "LAKHIMPUR",
      "MAJULI",
      "MORIGAON",
      "NAGAON",
      "NALBARI",
      "DIMA HASAO",
      "SIVASAGAR",
      "SONITPUR",
      "SOUTH SALMARA-MANKACHAR",
      "TINSUKIA",
      "UDALGURI",
      "WEST KARBI ANGLONG",
    ],
  },
  {
    state: "BIHAR",
    districts: [
      "ARARIA",
      "ARWAL",
      "AURANGABAD",
      "BANKA",
      "BEGUSARAI",
      "BHAGALPUR",
      "BHOJPUR",
      "BUXAR",
      "DARBHANGA",
      "EAST CHAMPARAN (MOTIHARI)",
      "GAYA",
      "GOPALGANJ",
      "JAMUI",
      "JEHANABAD",
      "KAIMUR (BHABUA)",
      "KATIHAR",
      "KHAGARIA",
      "KISHANGANJ",
      "LAKHISARAI",
      "MADHEPURA",
      "MADHUBANI",
      "MUNGER (MONGHYR)",
      "MUZAFFARPUR",
      "NALANDA",
      "NAWADA",
      "PATNA",
      "PURNIA (PURNIA)",
      "ROHTAS",
      "SAHARSA",
      "SAMASTIPUR",
      "SARAN",
      "SHEIKHPURA",
      "SHEOHAR",
      "SITAMARHI",
      "SIWAN",
      "SUPAUL",
      "VAISHALI",
      "WEST CHAMPARAN",
    ],
  },
  {
    state: "CHANDIGARH (UT)",
    districts: ["CHANDIGARH"],
  },
  {
    state: "CHHATTISGARH",
    districts: [
      "BALOD",
      "BALODA BAZAR",
      "BALRAMPUR",
      "BASTAR",
      "BEMETARA",
      "BIJAPUR",
      "BILASPUR",
      "DANTEWADA (SOUTH BASTAR)",
      "DHAMTARI",
      "DURG",
      "GARIYABAND",
      "JANJGIR-CHAMPA",
      "JASHPUR",
      "KABIRDHAM (KAWARDHA)",
      "KANKER (NORTH BASTAR)",
      "KONDAGAON",
      "KORBA",
      "KOREA (KORIYA)",
      "MAHASAMUND",
      "MUNGELI",
      "NARAYANPUR",
      "RAIGARH",
      "RAIPUR",
      "RAJNANDGAON",
      "SUKMA",
      "SURAJPUR",
      "SURGUJA",
    ],
  },
  {
    state: "DADRA AND NAGAR HAVELI (UT)",
    districts: ["DADRA AND NAGAR HAVELI"],
  },
  {
    state: "DAMAN AND DIU (UT)",
    districts: ["DAMAN", "DIU"],
  },
  {
    state: "DELHI (NCT)",
    districts: [
      "CENTRAL DELHI",
      "EAST DELHI",
      "NEW DELHI",
      "NORTH DELHI",
      "NORTH EAST DELHI",
      "NORTH WEST DELHI",
      "SHAHDARA",
      "SOUTH DELHI",
      "SOUTH EAST DELHI",
      "SOUTH WEST DELHI",
      "WEST DELHI",
    ],
  },
  {
    state: "GOA",
    districts: ["NORTH GOA", "SOUTH GOA"],
  },
  {
    state: "GUJARAT",
    districts: [
      "AHMEDABAD",
      "AMRELI",
      "ANAND",
      "ARAVALLI",
      "BANASKANTHA (PALANPUR)",
      "BHARUCH",
      "BHAVNAGAR",
      "BOTAD",
      "CHHOTA UDEPUR",
      "DAHOD",
      "DANGS (AHWA)",
      "DEVBHOOMI DWARKA",
      "GANDHINAGAR",
      "GIR SOMNATH",
      "JAMNAGAR",
      "JUNAGADH",
      "KACHCHH",
      "KHEDA (NADIAD)",
      "MAHISAGAR",
      "MEHSANA",
      "MORBI",
      "NARMADA (RAJPIPLA)",
      "NAVSARI",
      "PANCHMAHAL (GODHRA)",
      "PATAN",
      "PORBANDAR",
      "RAJKOT",
      "SABARKANTHA (HIMMATNAGAR)",
      "SURAT",
      "SURENDRANAGAR",
      "TAPI (VYARA)",
      "VADODARA",
      "VALSAD",
    ],
  },
  {
    state: "HARYANA",
    districts: [
      "AMBALA",
      "BHIWANI",
      "CHARKHI DADRI",
      "FARIDABAD",
      "FATEHABAD",
      "GURGAON",
      "HISAR",
      "JHAJJAR",
      "JIND",
      "KAITHAL",
      "KARNAL",
      "KURUKSHETRA",
      "MAHENDRAGARH",
      "MEWAT",
      "PALWAL",
      "PANCHKULA",
      "PANIPAT",
      "REWARI",
      "ROHTAK",
      "SIRSA",
      "SONIPAT",
      "YAMUNANAGAR",
    ],
  },
  {
    state: "HIMACHAL PRADESH",
    districts: [
      "BILASPUR",
      "CHAMBA",
      "HAMIRPUR",
      "KANGRA",
      "KINNAUR",
      "KULLU",
      "LAHAUL & SPITI",
      "MANDI",
      "SHIMLA",
      "SIRMAUR (SIRMOUR)",
      "SOLAN",
      "UNA",
    ],
  },
  {
    state: "JAMMU AND KASHMIR",
    districts: [
      "ANANTNAG",
      "BANDIPORE",
      "BARAMULLA",
      "BUDGAM",
      "DODA",
      "GANDERBAL",
      "JAMMU",
      "KARGIL",
      "KATHUA",
      "KISHTWAR",
      "KULGAM",
      "KUPWARA",
      "LEH",
      "POONCH",
      "PULWAMA",
      "RAJOURI",
      "RAMBAN",
      "REASI",
      "SAMBA",
      "SHOPIAN",
      "SRINAGAR",
      "UDHAMPUR",
    ],
  },
  {
    state: "JHARKHAND",
    districts: [
      "BOKARO",
      "CHATRA",
      "DEOGHAR",
      "DHANBAD",
      "DUMKA",
      "EAST SINGHBHUM",
      "GARHWA",
      "GIRIDIH",
      "GODDA",
      "GUMLA",
      "HAZARIBAGH",
      "JAMTARA",
      "KHUNTI",
      "KODERMA",
      "LATEHAR",
      "LOHARDAGA",
      "PAKUR",
      "PALAMU",
      "RAMGARH",
      "RANCHI",
      "SAHEBGANJ",
      "SARAIKELA-KHARSAWAN",
      "SIMDEGA",
      "WEST SINGHBHUM",
    ],
  },
  {
    state: "KARNATAKA",
    districts: [
      "BAGALKOT",
      "BANGALORE RURAL",
      "BANGALORE URBAN",
      "BANGALORE URBAN",
      "BANGALORE RURAL",
      "BAGALKOT",
      "BANGALORE RURAL",
      "BANGALORE URBAN",
      "BELGAUM",
      "BELLARY",
      "BIDAR",
      "CHAMARAJANAGAR",
      "CHIKBALLAPUR",
      "CHIKKAMAGALURU (CHIKMAGALUR)",
      "CHITRADURGA",
      "DAKSHINA KANNADA",
      "DAVANGERE",
      "DHARWAD",
      "GADAG",
      "GULBARGA",
      "HASSAN",
      "HAVERI",
      "KODAGU",
      "KOLAR",
      "KOPPAL",
      "MANDYA",
      "MYSORE",
      "RAICHUR",
      "RAMANAGARA",
      "SHIMOGA",
      "TUMKUR",
      "UDUPI",
      "UTTARA KANNADA (KARWAR)",
      "YADGIR",
    ],
  },
  {
    state: "KERALA",
    districts: [
      "ALAPPUZHA",
      "ERNAKULAM",
      "IDUKKI",
      "KANNUR",
      "KASARAGOD",
      "KOLLAM",
      "KOTTAYAM",
      "KOZHIKODE",
      "MALAPPURAM",
      "PALAKKAD",
      "PATHANAMTHITTA",
      "THIRUVANANTHAPURAM",
      "THRISSUR",
      "WAYANAD",
    ],
  },
  {
    state: "LADAKH (UT)",
    districts: ["KARGIL", "LEH"],
  },
  {
    state: "LAKSHADWEEP (UT)",
    districts: [
      "AGATTI",
      "AMINI",
      "ANDROTH",
      "BITHRA",
      "CHETLAT",
      "KADAMATH",
      "KAVARATTI",
      "KILTHAN",
      "MINICOY",
    ],
  },
  {
    state: "MADHYA PRADESH",
    districts: [
      "AGAR MALWA",
      "ALIRAJPUR",
      "ANUPPUR",
      "ASHOKNAGAR",
      "BALAGHAT",
      "BARWANI",
      "BETUL",
      "BHIND",
      "BHOPAL",
      "BURHANPUR",
      "CHHATARPUR",
      "CHHINDWARA",
      "DAMOH",
      "DATIA",
      "DEWAS",
      "DHAR",
      "DINDORI",
      "GUNA",
      "GWALIOR",
      "HARDA",
      "HOSHANGABAD",
      "INDORE",
      "JABALPUR",
      "JHABUA",
      "KATNI",
      "KHANDWA",
      "KHARGONE",
      "MANDLA",
      "MANDSAUR",
      "MORENA",
      "NARSINGHPUR",
      "NEEMUCH",
      "PANNA",
      "RAISEN",
      "RAJGARH",
      "RATLAM",
      "REWA",
      "SAGAR",
      "SATNA",
      "SEHORE",
      "SEONI",
      "SHAHDOL",
      "SHAJAPUR",
      "SHEOPUR",
      "SHIVPURI",
      "SIDHI",
      "SINGRAULI",
      "TIKAMGARH",
      "UJJAIN",
      "UMARIA",
      "VIDISHA",
    ],
  },
  {
    state: "MAHARASHTRA",
    districts: [
      "AHMEDNAGAR",
      "AKOLA",
      "AMRAVATI",
      "AURANGABAD",
      "BEED",
      "BHANDARA",
      "BULDHANA",
      "CHANDRAPUR",
      "DHULE",
      "GADCHIROLI",
      "GONDIA",
      "HINGOLI",
      "JALGAON",
      "JALNA",
      "KOLHAPUR",
      "LATUR",
      "MUMBAI CITY",
      "MUMBAI SUBURBAN",
      "NAGPUR",
      "NANDED",
      "NANDURBAR",
      "NASHIK",
      "OSMANABAD",
      "PALGHAR",
      "PARBHANI",
      "PUNE",
      "RAIGAD",
      "RATNAGIRI",
      "SANGLI",
      "SATARA",
      "SINDHUDURG",
      "SOLAPUR",
      "THANE",
      "WARDHA",
      "WASHIM",
      "YAVATMAL",
    ],
  },
  {
    state: "MANIPUR",
    districts: [
      "BISHNUPUR",
      "CHANDEL",
      "CHURACHANDPUR",
      "IMPHAL EAST",
      "IMPHAL WEST",
      "JIRIBAM",
      "KAKCHING",
      "KAMJONG",
      "KANGPOKPI",
      "NONEY",
      "PEREN",
      "PHERZAWL",
      "SENAPATI",
      "TAMENGLONG",
      "TENGNOUPAL",
      "THOUBAL",
      "UKHRUL",
    ],
  },
  {
    state: "MEGHALAYA",
    districts: [
      "EAST GARO HILLS",
      "EAST JAINTIA HILLS",
      "EAST KHASI HILLS",
      "NORTH GARO HILLS",
      "RI BHOI",
      "SOUTH GARO HILLS",
      "SOUTH WEST GARO HILLS",
      "SOUTH WEST KHASI HILLS",
      "WEST GARO HILLS",
      "WEST JAINTIA HILLS",
      "WEST KHASI HILLS",
    ],
  },
  {
    state: "MIZORAM",
    districts: [
      "AIZAWL",
      "CHAMPHAI",
      "KOLASIB",
      "LAWNGTLAI",
      "LUNGLEI",
      "MAMIT",
      "SAIHA",
      "SERCHHIP",
    ],
  },
  {
    state: "NAGALAND",
    districts: [
      "DIMAPUR",
      "KIPHIRE",
      "KOHIMA",
      "LONGLENG",
      "MOKOKCHUNG",
      "MON",
      "PEREN",
      "PHEK",
      "TUENSANG",
      "WOKHA",
      "ZUNHEBOTO",
    ],
  },
  {
    state: "ODISHA",
    districts: [
      "ANGUL",
      "BALANGIR",
      "BALASORE",
      "BARGARH",
      "BHADRAK",
      "BOUDH",
      "CUTTACK",
      "DEOGARH",
      "DHENKANAL",
      "GAJAPATI",
      "GANJAM",
      "JAGATSINGHAPUR",
      "JAJPUR",
      "JHARSUGUDA",
      "KALAHANDI",
      "KANDHAMAL",
      "KENDRAPARA",
      "KENDUJHAR (KEONJHAR)",
      "KHORDHA",
      "KORAPUT",
      "MALKANGIRI",
      "MAYURBHANJ",
      "NABARANGPUR",
      "NAYAGARH",
      "NUAPADA",
      "PURI",
      "RAYAGADA",
      "SAMBALPUR",
      "SONEPUR",
      "SUNDARGARH",
    ],
  },
  {
    state: "PUDUCHERRY (UT)",
    districts: ["KARAIKAL", "MAHE", "PUDUCHERRY", "YANAM"],
  },
  {
    state: "PUNJAB",
    districts: [
      "AMRITSAR",
      "BARNALA",
      "BATHINDA",
      "FARIDKOT",
      "FATEHGARH SAHIB",
      "FAZILKA",
      "FIROZEPUR",
      "GURDASPUR",
      "HOSHIARPUR",
      "JALANDHAR",
      "KAPURTHALA",
      "LUDHIANA",
      "MANSA",
      "MOGA",
      "MUKTSAR",
      "NAWANSHAHR (SHAHEED BHAGAT SINGH NAGAR)",
      "PATHANKOT",
      "PATIALA",
      "RUPNAGAR",
      "SANGRUR",
      "SAS NAGAR (MOHALI)",
      "TARN TARAN",
    ],
  },
  {
    state: "RAJASTHAN",
    districts: [
      "AJMER",
      "ALWAR",
      "BANSWARA",
      "BARAN",
      "BARMER",
      "BHARATPUR",
      "BHILWARA",
      "BIKANER",
      "BUNDI",
      "CHITTORGARH",
      "CHURU",
      "DAUSA",
      "DHOLPUR",
      "DUNGARPUR",
      "HANUMANGARH",
      "JAIPUR",
      "JAISALMER",
      "JALORE",
      "JHALAWAR",
      "JHUNJHUNU",
      "JODHPUR",
      "KARAULI",
      "KOTA",
      "NAGAUR",
      "PALI",
      "PRATAPGARH",
      "RAJSAMAND",
      "SAWAI MADHOPUR",
      "SIKAR",
      "SIROHI",
      "SRI GANGANAGAR",
      "TONK",
      "UDAIPUR",
    ],
  },
  {
    state: "SIKKIM",
    districts: ["EAST SIKKIM", "NORTH SIKKIM", "SOUTH SIKKIM", "WEST SIKKIM"],
  },
  {
    state: "TAMIL NADU",
    districts: [
      "ARIYALUR",
      "CHENNAI",
      "COIMBATORE",
      "CUDDALORE",
      "DHARMAPURI",
      "DINDIGUL",
      "ERODE",
      "KANCHIPURAM",
      "KANNIYAKUMARI",
      "KARUR",
      "KRISHNAGIRI",
      "MADURAI",
      "NAGAPATTINAM",
      "NAMAKKAL",
      "NILGIRIS",
      "PERAMBALUR",
      "PUDUKKOTTAI",
      "RAMANATHAPURAM",
      "SALEM",
      "SIVAGANGA",
      "THANJAVUR",
      "THENI",
      "THOOTHUKUDI (TUTICORIN)",
      "TIRUCHIRAPPALLI",
      "TIRUNELVELI",
      "TIRUPPUR",
      "TIRUVALLUR",
      "TIRUVANNAMALAI",
      "TIRUVARUR",
      "VELLORE",
      "VILLUPURAM",
      "VIRUDHUNAGAR",
    ],
  },
  {
    state: "TELANGANA",
    districts: [
      "ADILABAD",
      "BHADRADRI KOTHAGUDEM",
      "HYDERABAD",
      "JAGTIAL",
      "JANGOAN",
      "JAYASHANKAR BHUPALAPALLY",
      "JOGULAMBA GADWAL",
      "KAMAREDDY",
      "KARIMNAGAR",
      "KHAMMAM",
      "KUMURAM BHEEM ASIFABAD",
      "MAHABUBABAD",
      "MAHABUBNAGAR",
      "MANCHERIAL",
      "MEDAK",
      "MEDCHAL-MALKAJGIRI",
      "NAGARKURNOOL",
      "NALGONDA",
      "NIRMAL",
      "NIZAMABAD",
      "PEDDAPALLI",
      "RAJANNA SIRCILLA",
      "RANGAREDDY",
      "SANGAREDDY",
      "SIDDIPET",
      "SURYAPET",
      "VIKARABAD",
      "WANAPARTHY",
      "WARANGAL (RURAL)",
      "WARANGAL (URBAN)",
      "YADADRI BHUVANAGIRI",
    ],
  },
  {
    state: "TRIPURA",
    districts: [
      "DHALAI",
      "GOMATI",
      "KHOWAI",
      "NORTH TRIPURA",
      "SEPAHIJALA",
      "SOUTH TRIPURA",
      "UNAKOTI",
      "WEST TRIPURA",
    ],
  },
  {
    state: "UTTAR PRADESH",
    districts: [
      "AGRA",
      "ALIGARH",
      "ALLAHABAD",
      "AMBEDKAR NAGAR",
      "AMETHI (CHHATRAPATI SAHUJI MAHARAJ NAGAR)",
      "AMROHA (J.P. NAGAR)",
      "AURAIYA",
      "AZAMGARH",
      "BAGHPAT",
      "BAHRAICH",
      "BALLIA",
      "BALRAMPUR",
      "BANDA",
      "BARABANKI",
      "BAREILLY",
      "BASTI",
      "BIJNOR",
      "BUDAUN",
      "BULANDSHAHR",
      "CHANDAULI",
      "CHITRAKOOT",
      "DEORIA",
      "ETAH",
      "ETAWAH",
      "FAIZABAD",
      "FARRUKHABAD",
      "FATEHPUR",
      "FIROZABAD",
      "GAUTAM BUDDHA NAGAR",
      "GHAZIABAD",
      "GHAZIPUR",
      "GONDA",
      "GORAKHPUR",
      "HAMIRPUR",
      "HAPUR (PANCHSHEEL NAGAR)",
      "HARDOI",
      "HATHRAS",
      "JALAUN",
      "JAUNPUR",
      "JHANSI",
      "KANNAUJ",
      "KANPUR DEHAT",
      "KANPUR NAGAR",
      "KANSHIRAM NAGAR (KASGANJ)",
      "KAUSHAMBI",
      "KHERI",
      "KUSHINAGAR (PADRAUNA)",
      "LALITPUR",
      "LUCKNOW",
      "MAHARAJGANJ",
      "MAHOBA",
      "MAINPURI",
      "MATHURA",
      "MAU",
      "MEERUT",
      "MIRZAPUR",
      "MORADABAD",
      "MUZAFFARNAGAR",
      "PILIBHIT",
      "PRATAPGARH",
      "RAE BARELI",
      "RAMPUR",
      "SAHARANPUR",
      "SAMBHAL (BHEEM NAGAR)",
      "SANT KABIR NAGAR",
      "SHAHJAHANPUR",
      "SHAMLI",
      "SHRAVASTI",
      "SIDDHARTH NAGAR",
      "SITAPUR",
      "SONBHADRA",
      "SULTANPUR",
      "UNNAO",
      "VARANASI",
    ],
  },
  {
    state: "UTTARAKHAND",
    districts: [
      "ALMORA",
      "BAGESHWAR",
      "CHAMOLI",
      "CHAMPAWAT",
      "DEHRADUN",
      "HARIDWAR",
      "NAINITAL",
      "PAURI GARHWAL",
      "PITHORAGARH",
      "RUDRAPRAYAG",
      "TEHRI GARHWAL",
      "UDHAM SINGH NAGAR",
      "UTTARKASHI",
    ],
  },
  {
    state: "WEST BENGAL",
    districts: [
      "ALIPURDUAR",
      "BANKURA",
      "BIRBHUM",
      "COOCH BEHAR",
      "DAKSHIN DINAJPUR (SOUTH DINAJPUR)",
      "DARJEELING",
      "HOOGHLY",
      "HOWRAH",
      "JALPAIGURI",
      "JHARGRAM",
      "KALIMPONG",
      "KOLKATA",
      "MALDAH",
      "MURSHIDABAD",
      "NADIA",
      "NORTH 24 PARGANAS",
      "PASCHIM BURDWAN (WEST BURDWAN)",
      "PASCHIM MEDINIPUR (WEST MEDINIPUR)",
      "PURBA BURDWAN (EAST BURDWAN)",
      "PURBA MEDINIPUR (EAST MIDNAPORE)",
      "PURULIA",
      "SOUTH 24 PARGANAS",
      "UTTAR DINAJPUR (NORTH DINAJPUR)",
    ],
  },
];

export const cities = [
  {
    city: "KOLHAPUR",
    state: "MAHARASHTRA",
  },
  {
    city: "PORT BLAIR",
    state: "ANDAMAN & NICOBAR ISLANDS",
  },
  {
    city: "ADILABAD",
    state: "TELANGANA",
  },
  {
    city: "ADONI",
    state: "ANDHRA PRADESH",
  },
  {
    city: "AMADALAVALASA",
    state: "ANDHRA PRADESH",
  },
  {
    city: "AMALAPURAM",
    state: "ANDHRA PRADESH",
  },
  {
    city: "ANAKAPALLE",
    state: "ANDHRA PRADESH",
  },
  {
    city: "ANANTAPUR",
    state: "ANDHRA PRADESH",
  },
  {
    city: "BADEPALLE",
    state: "ANDHRA PRADESH",
  },
  {
    city: "BANGANAPALLE",
    state: "ANDHRA PRADESH",
  },
  {
    city: "BAPATLA",
    state: "ANDHRA PRADESH",
  },
  {
    city: "BELLAMPALLE",
    state: "ANDHRA PRADESH",
  },
  {
    city: "BETHAMCHERLA",
    state: "ANDHRA PRADESH",
  },
  {
    city: "BHADRACHALAM",
    state: "ANDHRA PRADESH",
  },
  {
    city: "BHAINSA",
    state: "ANDHRA PRADESH",
  },
  {
    city: "BHIMUNIPATNAM",
    state: "ANDHRA PRADESH",
  },
  {
    city: "BHIMAVARAM",
    state: "ANDHRA PRADESH",
  },
  {
    city: "BHONGIR",
    state: "TELANGANA",
  },
  {
    city: "BOBBILI",
    state: "ANDHRA PRADESH",
  },
  {
    city: "BODHAN",
    state: "TELANGANA",
  },
  {
    city: "CHILAKALURIPET",
    state: "ANDHRA PRADESH",
  },
  {
    city: "CHIRALA",
    state: "ANDHRA PRADESH",
  },
  {
    city: "CHITTOOR",
    state: "ANDHRA PRADESH",
  },
  {
    city: "CUDDAPAH",
    state: "ANDHRA PRADESH",
  },
  {
    city: "DEVARAKONDA",
    state: "TELANGANA",
  },
  {
    city: "DHARMAVARAM",
    state: "ANDHRA PRADESH",
  },
  {
    city: "ELURU",
    state: "ANDHRA PRADESH",
  },
  {
    city: "FAROOQNAGAR",
    state: "TELANGANA",
  },
  {
    city: "GADWAL",
    state: "TELANGANA",
  },
  {
    city: "GOOTY",
    state: "ANDHRA PRADESH",
  },
  {
    city: "GUDIVADA",
    state: "ANDHRA PRADESH",
  },
  {
    city: "GUDUR",
    state: "ANDHRA PRADESH",
  },
  {
    city: "GUNTAKAL",
    state: "ANDHRA PRADESH",
  },
  {
    city: "GUNTUR",
    state: "ANDHRA PRADESH",
  },
  {
    city: "HANUMAN JUNCTION",
    state: "ANDHRA PRADESH",
  },
  {
    city: "HINDUPUR",
    state: "ANDHRA PRADESH",
  },
  {
    city: "HYDERABAD",
    state: "TELANGANA",
  },
  {
    city: "ICHHAPURAM",
    state: "ANDHRA PRADESH",
  },
  {
    city: "JAGGAIAHPET",
    state: "ANDHRA PRADESH",
  },
  {
    city: "JAGTIAL",
    state: "TELANGANA",
  },
  {
    city: "JAMMALAMADUGU",
    state: "ANDHRA PRADESH",
  },

  {
    city: "JANGAON",
    state: "TELANGANA",
  },
  {
    city: "KADAPA",
    state: "ANDHRA PRADESH",
  },
  {
    city: "KADIRI",
    state: "ANDHRA PRADESH",
  },
  {
    city: "KAGAZNAGAR",
    state: "TELANGANA",
  },
  {
    city: "KAKINADA",
    state: "ANDHRA PRADESH",
  },
  {
    city: "KALYANDURG",
    state: "ANDHRA PRADESH",
  },
  {
    city: "KAMAREDDY",
    state: "TELANGANA",
  },
  {
    city: "KANDUKUR",
    state: "ANDHRA PRADESH",
  },
  {
    city: "KARIMNAGAR",
    state: "TELANGANA",
  },
  {
    city: "KAVALI",
    state: "ANDHRA PRADESH",
  },
  {
    city: "KHAMMAM",
    state: "TELANGANA",
  },
  {
    city: "KORATLA",
    state: "TELANGANA",
  },
  {
    city: "KOTHAGUDEM",
    state: "TELANGANA",
  },
  {
    city: "KOTHAPETA",
    state: "ANDHRA PRADESH",
  },
  {
    city: "KOVVUR",
    state: "ANDHRA PRADESH",
  },
  {
    city: "KURNOOL",
    state: "ANDHRA PRADESH",
  },
  {
    city: "KYATHAMPALLE",
    state: "TELANGANA",
  },
  {
    city: "MACHERLA",
    state: "ANDHRA PRADESH",
  },
  {
    city: "MACHILIPATNAM",
    state: "ANDHRA PRADESH",
  },
  {
    city: "MADANAPALLE",
    state: "ANDHRA PRADESH",
  },
  {
    city: "MAHABUBNAGAR",
    state: "TELANGANA",
  },
  {
    city: "MANCHERIAL",
    state: "TELANGANA",
  },
  {
    city: "MANDAMARRI",
    state: "TELANGANA",
  },
  {
    city: "MANDAPETA",
    state: "ANDHRA PRADESH",
  },
  {
    city: "MANUGURU",
    state: "TELANGANA",
  },
  {
    city: "MARKAPUR",
    state: "ANDHRA PRADESH",
  },
  {
    city: "MEDAK",
    state: "TELANGANA",
  },
  {
    city: "MIRYALAGUDA",
    state: "TELANGANA",
  },
  {
    city: "MOGALTHUR",
    state: "ANDHRA PRADESH",
  },
  {
    city: "NAGARI",
    state: "ANDHRA PRADESH",
  },
  {
    city: "NAGARKURNOOL",
    state: "TELANGANA",
  },
  {
    city: "NANDYAL",
    state: "ANDHRA PRADESH",
  },
  {
    city: "NARASAPUR",
    state: "ANDHRA PRADESH",
  },
  {
    city: "NARASARAOPET",
    state: "ANDHRA PRADESH",
  },
  {
    city: "NARAYANPET",
    state: "TELANGANA",
  },
  {
    city: "NARSIPATNAM",
    state: "ANDHRA PRADESH",
  },
  {
    city: "NELLORE",
    state: "ANDHRA PRADESH",
  },
  {
    city: "NIDADAVOLE",
    state: "ANDHRA PRADESH",
  },
  {
    city: "NIRMAL",
    state: "TELANGANA",
  },
  {
    city: "NIZAMABAD",
    state: "TELANGANA",
  },
  {
    city: "NUZVID",
    state: "ANDHRA PRADESH",
  },
  {
    city: "ONGOLE",
    state: "ANDHRA PRADESH",
  },
  {
    city: "PALACOLE",
    state: "ANDHRA PRADESH",
  },
  {
    city: "PALASA-KASIBUGGA",
    state: "ANDHRA PRADESH",
  },
  {
    city: "PALWANCHA",
    state: "TELANGANA",
  },
  {
    city: "PARVATHIPURAM",
    state: "ANDHRA PRADESH",
  },
  {
    city: "PEDANA",
    state: "ANDHRA PRADESH",
  },
  {
    city: "PEDDAPURAM",
    state: "ANDHRA PRADESH",
  },
  {
    city: "PITHAPURAM",
    state: "ANDHRA PRADESH",
  },
  {
    city: "PONDUR",
    state: "ANDHRA PRADESH",
  },
  {
    city: "PONNUR",
    state: "ANDHRA PRADESH",
  },
  {
    city: "PRODDATUR",
    state: "ANDHRA PRADESH",
  },
  {
    city: "PUNGANUR",
    state: "ANDHRA PRADESH",
  },
  {
    city: "PUTTUR",
    state: "ANDHRA PRADESH",
  },
  {
    city: "RAJAHMUNDRY",
    state: "ANDHRA PRADESH",
  },
  {
    city: "RAJAM",
    state: "ANDHRA PRADESH",
  },
  {
    city: "RAMACHANDRAPURAM",
    state: "ANDHRA PRADESH",
  },
  {
    city: "RAMAGUNDAM",
    state: "TELANGANA",
  },
  {
    city: "RAYACHOTI",
    state: "ANDHRA PRADESH",
  },
  {
    city: "RAYADURG",
    state: "ANDHRA PRADESH",
  },
  {
    city: "RENIGUNTA",
    state: "ANDHRA PRADESH",
  },
  {
    city: "REPALLE",
    state: "ANDHRA PRADESH",
  },

  {
    city: "SADASIVPET",
    state: "TELANGANA",
  },
  {
    city: "SALUR",
    state: "ANDHRA PRADESH",
  },
  {
    city: "SAMALKOT",
    state: "ANDHRA PRADESH",
  },
  {
    city: "SANGAREDDY",
    state: "TELANGANA",
  },
  {
    city: "SATTENAPALLE",
    state: "ANDHRA PRADESH",
  },
  {
    city: "SIDDIPET",
    state: "TELANGANA",
  },
  {
    city: "SINGAPUR",
    state: "ANDHRA PRADESH",
  },
  {
    city: "SIRCILLA",
    state: "TELANGANA",
  },
  {
    city: "SRIKAKULAM",
    state: "ANDHRA PRADESH",
  },
  {
    city: "SRIKALAHASTI",
    state: "ANDHRA PRADESH",
  },
  {
    city: "SURYAPET",
    state: "TELANGANA",
  },
  {
    city: "TADEPALLIGUDEM",
    state: "ANDHRA PRADESH",
  },
  {
    city: "TADIPATRI",
    state: "ANDHRA PRADESH",
  },
  {
    city: "TANDUR",
    state: "TELANGANA",
  },
  {
    city: "TANUKU",
    state: "ANDHRA PRADESH",
  },
  {
    city: "TENALI",
    state: "ANDHRA PRADESH",
  },
  {
    city: "TIRUPATI",
    state: "ANDHRA PRADESH",
  },
  {
    city: "TUNI",
    state: "ANDHRA PRADESH",
  },
  {
    city: "URAVAKONDA",
    state: "ANDHRA PRADESH",
  },
  {
    city: "VENKATAGIRI",
    state: "ANDHRA PRADESH",
  },
  {
    city: "VIKARABAD",
    state: "TELANGANA",
  },
  {
    city: "VIJAYAWADA",
    state: "ANDHRA PRADESH",
  },
  {
    city: "VINUKONDA",
    state: "ANDHRA PRADESH",
  },
  {
    city: "VISAKHAPATNAM",
    state: "ANDHRA PRADESH",
  },
  {
    city: "VIZIANAGARAM",
    state: "ANDHRA PRADESH",
  },
  {
    city: "WANAPARTHY",
    state: "TELANGANA",
  },
  {
    city: "WARANGAL",
    state: "TELANGANA",
  },
  {
    city: "YELLANDU",
    state: "TELANGANA",
  },
  {
    city: "YEMMIGANUR",
    state: "ANDHRA PRADESH",
  },
  {
    city: "YERRAGUNTLA",
    state: "ANDHRA PRADESH",
  },
  {
    city: "ZAHEERABAD",
    state: "TELANGANA",
  },
  {
    city: "RAJAMPET",
    state: "ANDHRA PRADESH",
  },
  {
    city: "ALONG",
    state: "ARUNACHAL PRADESH",
  },
  {
    city: "BOMDILA",
    state: "ARUNACHAL PRADESH",
  },
  {
    city: "ITANAGAR",
    state: "ARUNACHAL PRADESH",
  },
  {
    city: "NAHARLAGUN",
    state: "ARUNACHAL PRADESH",
  },
  {
    city: "PASIGHAT",
    state: "ARUNACHAL PRADESH",
  },
  {
    city: "ABHAYAPURI",
    state: "ASSAM",
  },
  {
    city: "AMGURI",
    state: "ASSAM",
  },
  {
    city: "ANANDNAGAR",
    state: "ASSAM",
  },
  {
    city: "BARPETA",
    state: "ASSAM",
  },
  {
    city: "BARPETA ROAD",
    state: "ASSAM",
  },
  {
    city: "BILASIPARA",
    state: "ASSAM",
  },
  {
    city: "BONGAIGAON",
    state: "ASSAM",
  },
  {
    city: "DHEKIAJULI",
    state: "ASSAM",
  },
  {
    city: "DHUBRI",
    state: "ASSAM",
  },
  {
    city: "DIBRUGARH",
    state: "ASSAM",
  },
  {
    city: "DIGBOI",
    state: "ASSAM",
  },
  {
    city: "DIPHU",
    state: "ASSAM",
  },
  {
    city: "DISPUR",
    state: "ASSAM",
  },
  {
    city: "GAURIPUR",
    state: "ASSAM",
  },
  {
    city: "GOALPARA",
    state: "ASSAM",
  },
  {
    city: "GOLAGHAT",
    state: "ASSAM",
  },
  {
    city: "GUWAHATI",
    state: "ASSAM",
  },
  {
    city: "HAFLONG",
    state: "ASSAM",
  },
  {
    city: "HAILAKANDI",
    state: "ASSAM",
  },
  {
    city: "HOJAI",
    state: "ASSAM",
  },
  {
    city: "JORHAT",
    state: "ASSAM",
  },
  {
    city: "KARIMGANJ",
    state: "ASSAM",
  },
  {
    city: "KOKRAJHAR",
    state: "ASSAM",
  },
  {
    city: "LANKA",
    state: "ASSAM",
  },
  {
    city: "LUMDING",
    state: "ASSAM",
  },
  {
    city: "MANGALDOI",
    state: "ASSAM",
  },
  {
    city: "MANKACHAR",
    state: "ASSAM",
  },
  {
    city: "MARGHERITA",
    state: "ASSAM",
  },
  {
    city: "MARIANI",
    state: "ASSAM",
  },
  {
    city: "MARIGAON",
    state: "ASSAM",
  },
  {
    city: "NAGAON",
    state: "ASSAM",
  },
  {
    city: "NALBARI",
    state: "ASSAM",
  },
  {
    city: "NORTH LAKHIMPUR",
    state: "ASSAM",
  },
  {
    city: "RANGIYA",
    state: "ASSAM",
  },
  {
    city: "SIBSAGAR",
    state: "ASSAM",
  },
  {
    city: "SILAPATHAR",
    state: "ASSAM",
  },
  {
    city: "SILCHAR",
    state: "ASSAM",
  },
  {
    city: "TEZPUR",
    state: "ASSAM",
  },
  {
    city: "TINSUKIA",
    state: "ASSAM",
  },
  {
    city: "AMARPUR",
    state: "BIHAR",
  },
  {
    city: "ARARIA",
    state: "BIHAR",
  },
  {
    city: "ARERAJ",
    state: "BIHAR",
  },
  {
    city: "ARRAH",
    state: "BIHAR",
  },
  {
    city: "ASARGANJ",
    state: "BIHAR",
  },

  {
    city: "Aurangabad",
    state: "Bihar",
  },
  {
    city: "Bagaha",
    state: "Bihar",
  },
  {
    city: "Bahadurganj",
    state: "Bihar",
  },
  {
    city: "Bairgania",
    state: "Bihar",
  },
  {
    city: "Bakhtiarpur",
    state: "Bihar",
  },
  {
    city: "Banka",
    state: "Bihar",
  },
  {
    city: "Banmankhi Bazar",
    state: "Bihar",
  },
  {
    city: "Barahiya",
    state: "Bihar",
  },
  {
    city: "Barauli",
    state: "Bihar",
  },
  {
    city: "Barbigha",
    state: "Bihar",
  },
  {
    city: "Barh",
    state: "Bihar",
  },
  {
    city: "Begusarai",
    state: "Bihar",
  },
  {
    city: "Behea",
    state: "Bihar",
  },
  {
    city: "Bettiah",
    state: "Bihar",
  },
  {
    city: "Bhabua",
    state: "Bihar",
  },
  {
    city: "Bhagalpur",
    state: "Bihar",
  },
  {
    city: "Bihar Sharif",
    state: "Bihar",
  },
  {
    city: "Bikramganj",
    state: "Bihar",
  },
  {
    city: "Bodh Gaya",
    state: "Bihar",
  },
  {
    city: "Buxar",
    state: "Bihar",
  },
  {
    city: "Chandan Bara",
    state: "Bihar",
  },
  {
    city: "Chanpatia",
    state: "Bihar",
  },
  {
    city: "Chhapra",
    state: "Bihar",
  },
  {
    city: "Colgong",
    state: "Bihar",
  },
  {
    city: "Dalsinghsarai",
    state: "Bihar",
  },
  {
    city: "Darbhanga",
    state: "Bihar",
  },
  {
    city: "Daudnagar",
    state: "Bihar",
  },
  {
    city: "Dehri-on-Sone",
    state: "Bihar",
  },
  {
    city: "Dhaka",
    state: "Bihar",
  },
  {
    city: "Dighwara",
    state: "Bihar",
  },
  {
    city: "Dumraon",
    state: "Bihar",
  },
  {
    city: "Fatwah",
    state: "Bihar",
  },
  {
    city: "Forbesganj",
    state: "Bihar",
  },
  {
    city: "Gaya",
    state: "Bihar",
  },
  {
    city: "Gogri Jamalpur",
    state: "Bihar",
  },
  {
    city: "Gopalganj",
    state: "Bihar",
  },
  {
    city: "Hajipur",
    state: "Bihar",
  },
  {
    city: "Hilsa",
    state: "Bihar",
  },
  {
    city: "Hisua",
    state: "Bihar",
  },
  {
    city: "Islampur",
    state: "Bihar",
  },
  {
    city: "Jagdispur",
    state: "Bihar",
  },
  {
    city: "Jamalpur",
    state: "Bihar",
  },
  {
    city: "Jamui",
    state: "Bihar",
  },
  {
    city: "Jehanabad",
    state: "Bihar",
  },
  {
    city: "Jhajha",
    state: "Bihar",
  },
  {
    city: "Jhanjharpur",
    state: "Bihar",
  },
  {
    city: "Jogabani",
    state: "Bihar",
  },
  {
    city: "Kanti",
    state: "Bihar",
  },
  {
    city: "Katihar",
    state: "Bihar",
  },
  {
    city: "Khagaria",
    state: "Bihar",
  },
  {
    city: "Kharagpur",
    state: "Bihar",
  },
  {
    city: "Kishanganj",
    state: "Bihar",
  },
  {
    city: "Lakhisarai",
    state: "Bihar",
  },
  {
    city: "Lalganj",
    state: "Bihar",
  },
  {
    city: "Madhepura",
    state: "Bihar",
  },
  {
    city: "Madhubani",
    state: "Bihar",
  },
  {
    city: "Maharajganj",
    state: "Bihar",
  },
  {
    city: "Mahnar Bazar",
    state: "Bihar",
  },
  {
    city: "Makhdumpur",
    state: "Bihar",
  },
  {
    city: "Maner",
    state: "Bihar",
  },
  {
    city: "Manihari",
    state: "Bihar",
  },
  {
    city: "Marhaura",
    state: "Bihar",
  },
  {
    city: "Masaurhi",
    state: "Bihar",
  },
  {
    city: "Mirganj",
    state: "Bihar",
  },
  {
    city: "Mokameh",
    state: "Bihar",
  },

  {
    city: "Motihari",
    state: "Bihar",
  },
  {
    city: "Motipur",
    state: "Bihar",
  },
  {
    city: "Munger",
    state: "Bihar",
  },
  {
    city: "Murliganj",
    state: "Bihar",
  },
  {
    city: "Muzaffarpur",
    state: "Bihar",
  },
  {
    city: "Narkatiaganj",
    state: "Bihar",
  },
  {
    city: "Naugachhia",
    state: "Bihar",
  },
  {
    city: "Nawada",
    state: "Bihar",
  },
  {
    city: "Nokha",
    state: "Bihar",
  },
  {
    city: "Patna",
    state: "Bihar",
  },
  {
    city: "Piro",
    state: "Bihar",
  },
  {
    city: "Purnia",
    state: "Bihar",
  },
  {
    city: "Rafiganj",
    state: "Bihar",
  },
  {
    city: "Rajgir",
    state: "Bihar",
  },
  {
    city: "Ramnagar",
    state: "Bihar",
  },
  {
    city: "Raxaul Bazar",
    state: "Bihar",
  },
  {
    city: "Revelganj",
    state: "Bihar",
  },
  {
    city: "Rosera",
    state: "Bihar",
  },
  {
    city: "Saharsa",
    state: "Bihar",
  },
  {
    city: "Samastipur",
    state: "Bihar",
  },

  {
    city: "Sasaram",
    state: "Bihar",
  },
  {
    city: "Sheikhpura",
    state: "Bihar",
  },
  {
    city: "Sheohar",
    state: "Bihar",
  },
  {
    city: "Sherghati",
    state: "Bihar",
  },
  {
    city: "Silao",
    state: "Bihar",
  },
  {
    city: "Sitamarhi",
    state: "Bihar",
  },
  {
    city: "Siwan",
    state: "Bihar",
  },
  {
    city: "Sonepur",
    state: "Bihar",
  },
  {
    city: "Sugauli",
    state: "Bihar",
  },
  {
    city: "Sultanganj",
    state: "Bihar",
  },
  {
    city: "Supaul",
    state: "Bihar",
  },
  {
    city: "Warisaliganj",
    state: "Bihar",
  },
  {
    city: "Ahiwara",
    state: "Chhattisgarh",
  },
  {
    city: "Akaltara",
    state: "Chhattisgarh",
  },
  {
    city: "Ambagarh Chowki",
    state: "Chhattisgarh",
  },
  {
    city: "Ambikapur",
    state: "Chhattisgarh",
  },
  {
    city: "Arang",
    state: "Chhattisgarh",
  },
  {
    city: "Bade Bacheli",
    state: "Chhattisgarh",
  },
  {
    city: "Balod",
    state: "Chhattisgarh",
  },
  {
    city: "Baloda Bazar",
    state: "Chhattisgarh",
  },
  {
    city: "Bemetra",
    state: "Chhattisgarh",
  },
  {
    city: "Bhatapara",
    state: "Chhattisgarh",
  },
  {
    city: "Bilaspur",
    state: "Chhattisgarh",
  },
  {
    city: "Birgaon",
    state: "Chhattisgarh",
  },
  {
    city: "Champa",
    state: "Chhattisgarh",
  },
  {
    city: "Chirmiri",
    state: "Chhattisgarh",
  },
  {
    city: "Dalli-Rajhara",
    state: "Chhattisgarh",
  },
  {
    city: "Dhamtari",
    state: "Chhattisgarh",
  },
  {
    city: "Dipka",
    state: "Chhattisgarh",
  },
  {
    city: "Dongargarh",
    state: "Chhattisgarh",
  },
  {
    city: "Durg-Bhilai Nagar",
    state: "Chhattisgarh",
  },
  {
    city: "Gobranawapara",
    state: "Chhattisgarh",
  },
  {
    city: "Jagdalpur",
    state: "Chhattisgarh",
  },
  {
    city: "Janjgir",
    state: "Chhattisgarh",
  },
  {
    city: "Jashpurnagar",
    state: "Chhattisgarh",
  },
  {
    city: "Kanker",
    state: "Chhattisgarh",
  },
  {
    city: "Kawardha",
    state: "Chhattisgarh",
  },
  {
    city: "Kondagaon",
    state: "Chhattisgarh",
  },
  {
    city: "Korba",
    state: "Chhattisgarh",
  },
  {
    city: "Mahasamund",
    state: "Chhattisgarh",
  },
  {
    city: "Mahendragarh",
    state: "Chhattisgarh",
  },
  {
    city: "Mungeli",
    state: "Chhattisgarh",
  },
  {
    city: "Naila Janjgir",
    state: "Chhattisgarh",
  },
  {
    city: "Raigarh",
    state: "Chhattisgarh",
  },
  {
    city: "Raipur",
    state: "Chhattisgarh",
  },
  {
    city: "Rajnandgaon",
    state: "Chhattisgarh",
  },
  {
    city: "Sakti",
    state: "Chhattisgarh",
  },
  {
    city: "Tilda Newra",
    state: "Chhattisgarh",
  },
  {
    city: "Amli",
    state: "Dadra & Nagar Haveli",
  },
  {
    city: "Silvassa",
    state: "Dadra & Nagar Haveli",
  },
  {
    city: "Daman and Diu",
    state: "Daman and Diu (UT)",
  },
  {
    city: "Asola",
    state: "Delhi (NCT)",
  },
  {
    city: "Delhi",
    state: "Delhi (NCT)",
  },
  {
    city: "Aldona",
    state: "Goa",
  },
  {
    city: "Curchorem Cacora",
    state: "Goa",
  },
  {
    city: "Madgaon",
    state: "Goa",
  },
  {
    city: "Mapusa",
    state: "Goa",
  },
  {
    city: "Margao",
    state: "Goa",
  },
  {
    city: "Marmagao",
    state: "Goa",
  },
  {
    city: "Panaji",
    state: "Goa",
  },
  {
    city: "Ahmedabad",
    state: "Gujarat",
  },
  {
    city: "Amreli",
    state: "Gujarat",
  },
  {
    city: "Anand",
    state: "Gujarat",
  },
  {
    city: "Ankleshwar",
    state: "Gujarat",
  },
  {
    city: "Bharuch",
    state: "Gujarat",
  },
  {
    city: "Bhavnagar",
    state: "Gujarat",
  },
  {
    city: "Bhuj",
    state: "Gujarat",
  },
  {
    city: "Cambay",
    state: "Gujarat",
  },
  {
    city: "Dahod",
    state: "Gujarat",
  },
  {
    city: "Deesa",
    state: "Gujarat",
  },
  {
    city: "Dharampur",
    state: "Gujarat",
  },
  {
    city: "Dholka",
    state: "Gujarat",
  },
  {
    city: "Gandhinagar",
    state: "Gujarat",
  },
  {
    city: "Godhra",
    state: "Gujarat",
  },
  {
    city: "Himatnagar",
    state: "Gujarat",
  },
  {
    city: "Idar",
    state: "Gujarat",
  },
  {
    city: "Jamnagar",
    state: "Gujarat",
  },
  {
    city: "Junagadh",
    state: "Gujarat",
  },
  {
    city: "Kadi",
    state: "Gujarat",
  },
  {
    city: "Kalavad",
    state: "Gujarat",
  },
  {
    city: "Kalol",
    state: "Gujarat",
  },
  {
    city: "Kapadvanj",
    state: "Gujarat",
  },
  {
    city: "Karjan",
    state: "Gujarat",
  },
  {
    city: "Keshod",
    state: "Gujarat",
  },
  {
    city: "Khambhalia",
    state: "Gujarat",
  },
  {
    city: "Khambhat",
    state: "Gujarat",
  },
  {
    city: "Kheda",
    state: "Gujarat",
  },
  {
    city: "Khedbrahma",
    state: "Gujarat",
  },
  {
    city: "Kheralu",
    state: "Gujarat",
  },
  {
    city: "Kodinar",
    state: "Gujarat",
  },
  {
    city: "Lathi",
    state: "Gujarat",
  },
  {
    city: "Limbdi",
    state: "Gujarat",
  },
  {
    city: "Lunawada",
    state: "Gujarat",
  },
  {
    city: "Mahesana",
    state: "Gujarat",
  },
  {
    city: "Mahuva",
    state: "Gujarat",
  },
  {
    city: "Manavadar",
    state: "Gujarat",
  },
  {
    city: "Mandvi",
    state: "Gujarat",
  },
  {
    city: "Mangrol",
    state: "Gujarat",
  },
  {
    city: "Mansa",
    state: "Gujarat",
  },
  {
    city: "Mehmedabad",
    state: "Gujarat",
  },
  {
    city: "Modasa",
    state: "Gujarat",
  },
  {
    city: "Morvi",
    state: "Gujarat",
  },
  {
    city: "Nadiad",
    state: "Gujarat",
  },
  {
    city: "Navsari",
    state: "Gujarat",
  },
  {
    city: "Padra",
    state: "Gujarat",
  },
  {
    city: "Palanpur",
    state: "Gujarat",
  },
  {
    city: "Palitana",
    state: "Gujarat",
  },
  {
    city: "Pardi",
    state: "Gujarat",
  },
  {
    city: "Patan",
    state: "Gujarat",
  },
  {
    city: "Petlad",
    state: "Gujarat",
  },
  {
    city: "Porbandar",
    state: "Gujarat",
  },
  {
    city: "Radhanpur",
    state: "Gujarat",
  },
  {
    city: "Rajkot",
    state: "Gujarat",
  },
  {
    city: "Rajpipla",
    state: "Gujarat",
  },
  {
    city: "Rajula",
    state: "Gujarat",
  },
  {
    city: "Ranavav",
    state: "Gujarat",
  },
  {
    city: "Rapar",
    state: "Gujarat",
  },

  {
    city: "Salaya",
    state: "Gujarat",
  },
  {
    city: "Sanand",
    state: "Gujarat",
  },
  {
    city: "Savarkundla",
    state: "Gujarat",
  },
  {
    city: "Sidhpur",
    state: "Gujarat",
  },
  {
    city: "Sihor",
    state: "Gujarat",
  },
  {
    city: "Songadh",
    state: "Gujarat",
  },
  {
    city: "Surat",
    state: "Gujarat",
  },

  {
    city: "Talaja",
    state: "Gujarat",
  },
  {
    city: "Thangadh",
    state: "Gujarat",
  },
  {
    city: "Tharad",
    state: "Gujarat",
  },
  {
    city: "Umbergaon",
    state: "Gujarat",
  },
  {
    city: "Umreth",
    state: "Gujarat",
  },
  {
    city: "Una",
    state: "Gujarat",
  },
  {
    city: "Unjha",
    state: "Gujarat",
  },
  {
    city: "Upleta",
    state: "Gujarat",
  },
  {
    city: "Vadnagar",
    state: "Gujarat",
  },
  {
    city: "Vadodara",
    state: "Gujarat",
  },
  {
    city: "Valsad",
    state: "Gujarat",
  },
  {
    city: "Vapi",
    state: "Gujarat",
  },
  {
    city: "Veraval",
    state: "Gujarat",
  },
  {
    city: "Vijapur",
    state: "Gujarat",
  },
  {
    city: "Viramgam",
    state: "Gujarat",
  },
  {
    city: "Visnagar",
    state: "Gujarat",
  },
  {
    city: "Vyara",
    state: "Gujarat",
  },
  {
    city: "Wadhwan",
    state: "Gujarat",
  },
  {
    city: "Wankaner",
    state: "Gujarat",
  },
  {
    city: "Adalaj",
    state: "Gujarat",
  },
  {
    city: "Adityana",
    state: "Gujarat",
  },
  {
    city: "Alang",
    state: "Gujarat",
  },
  {
    city: "Ambaji",
    state: "Gujarat",
  },
  {
    city: "Ambaliyasan",
    state: "Gujarat",
  },
  {
    city: "Andada",
    state: "Gujarat",
  },
  {
    city: "Anjar",
    state: "Gujarat",
  },
  {
    city: "Anklav",
    state: "Gujarat",
  },
  {
    city: "Antaliya",
    state: "Gujarat",
  },
  {
    city: "Arambhada",
    state: "Gujarat",
  },
  {
    city: "Atul",
    state: "Gujarat",
  },
  {
    city: "Ballabhgarh",
    state: "Haryana",
  },
  {
    city: "Ambala",
    state: "Haryana",
  },
  {
    city: "Asankhurd",
    state: "Haryana",
  },
  {
    city: "Assandh",
    state: "Haryana",
  },
  {
    city: "Ateli",
    state: "Haryana",
  },
  {
    city: "Babiyal",
    state: "Haryana",
  },
  {
    city: "Bahadurgarh",
    state: "Haryana",
  },
  {
    city: "Barwala",
    state: "Haryana",
  },
  {
    city: "Bhiwani",
    state: "Haryana",
  },
  {
    city: "Charkhi Dadri",
    state: "Haryana",
  },
  {
    city: "Cheeka",
    state: "Haryana",
  },
  {
    city: "Ellenabad 2",
    state: "Haryana",
  },
  {
    city: "Faridabad",
    state: "Haryana",
  },

  {
    city: "Fatehabad",
    state: "Haryana",
  },
  {
    city: "Ganaur",
    state: "Haryana",
  },
  {
    city: "Gharaunda",
    state: "Haryana",
  },
  {
    city: "Gohana",
    state: "Haryana",
  },
  {
    city: "Gurgaon",
    state: "Haryana",
  },
  {
    city: "Haibat(Yamuna Nagar)",
    state: "Haryana",
  },
  {
    city: "Hansi",
    state: "Haryana",
  },
  {
    city: "Hisar",
    state: "Haryana",
  },
  {
    city: "Hodal",
    state: "Haryana",
  },
  {
    city: "Jhajjar",
    state: "Haryana",
  },
  {
    city: "Jind",
    state: "Haryana",
  },
  {
    city: "Kaithal",
    state: "Haryana",
  },
  {
    city: "Kalan Wali",
    state: "Haryana",
  },
  {
    city: "Kalka",
    state: "Haryana",
  },
  {
    city: "Karnal",
    state: "Haryana",
  },
  {
    city: "Ladwa",
    state: "Haryana",
  },
  {
    city: "Mahendragarh",
    state: "Haryana",
  },
  {
    city: "Mandi Dabwali",
    state: "Haryana",
  },
  {
    city: "Narnaul",
    state: "Haryana",
  },
  {
    city: "Narwana",
    state: "Haryana",
  },
  {
    city: "Palwal",
    state: "Haryana",
  },
  {
    city: "Panchkula",
    state: "Haryana",
  },
  {
    city: "Panipat",
    state: "Haryana",
  },
  {
    city: "Pehowa",
    state: "Haryana",
  },
  {
    city: "Pinjore",
    state: "Haryana",
  },
  {
    city: "Rania",
    state: "Haryana",
  },
  {
    city: "Ratia",
    state: "Haryana",
  },
  {
    city: "Rewari",
    state: "Haryana",
  },
  {
    city: "Rohtak",
    state: "Haryana",
  },
  {
    city: "Safidon",
    state: "Haryana",
  },
  {
    city: "Samalkha",
    state: "Haryana",
  },
  {
    city: "Shahbad",
    state: "Haryana",
  },
  {
    city: "Sirsa",
    state: "Haryana",
  },
  {
    city: "Sohna",
    state: "Haryana",
  },
  {
    city: "Sonipat",
    state: "Haryana",
  },
  {
    city: "Taraori",
    state: "Haryana",
  },
  {
    city: "Thanesar",
    state: "Haryana",
  },
  {
    city: "Tohana",
    state: "Haryana",
  },
  {
    city: "Yamunanagar",
    state: "Haryana",
  },
  {
    city: "Arki",
    state: "Himachal Pradesh",
  },
  {
    city: "Baddi",
    state: "Himachal Pradesh",
  },
  {
    city: "Bilaspur",
    state: "Himachal Pradesh",
  },
  {
    city: "Chamba",
    state: "Himachal Pradesh",
  },
  {
    city: "Dalhousie",
    state: "Himachal Pradesh",
  },
  {
    city: "Dharamsala",
    state: "Himachal Pradesh",
  },
  {
    city: "Hamirpur",
    state: "Himachal Pradesh",
  },
  {
    city: "Mandi",
    state: "Himachal Pradesh",
  },
  {
    city: "Nahan",
    state: "Himachal Pradesh",
  },
  {
    city: "Shimla",
    state: "Himachal Pradesh",
  },
  {
    city: "Solan",
    state: "Himachal Pradesh",
  },
  {
    city: "Sundarnagar",
    state: "Himachal Pradesh",
  },
  {
    city: "Jammu",
    state: "Jammu and Kashmir",
  },
  {
    city: "Achabbal",
    state: "Jammu and Kashmir",
  },
  {
    city: "Akhnoor",
    state: "Jammu and Kashmir",
  },
  {
    city: "Anantnag",
    state: "Jammu and Kashmir",
  },
  {
    city: "Arnia",
    state: "Jammu and Kashmir",
  },
  {
    city: "Awantipora",
    state: "Jammu and Kashmir",
  },
  {
    city: "Bandipore",
    state: "Jammu and Kashmir",
  },
  {
    city: "Baramula",
    state: "Jammu and Kashmir",
  },
  {
    city: "Kathua",
    state: "Jammu and Kashmir",
  },
  {
    city: "Leh",
    state: "Jammu and Kashmir",
  },
  {
    city: "Punch",
    state: "Jammu and Kashmir",
  },

  {
    city: "Rajauri",
    state: "Jammu & Kashmir",
  },
  {
    city: "Sopore",
    state: "Jammu & Kashmir",
  },
  {
    city: "Srinagar",
    state: "Jammu & Kashmir",
  },
  {
    city: "Udhampur",
    state: "Jammu & Kashmir",
  },
  {
    city: "Amlabad",
    state: "Jharkhand",
  },
  {
    city: "Ara",
    state: "Jharkhand",
  },
  {
    city: "Barughutu",
    state: "Jharkhand",
  },
  {
    city: "Bokaro Steel City",
    state: "Jharkhand",
  },
  {
    city: "Chaibasa",
    state: "Jharkhand",
  },
  {
    city: "Chakradharpur",
    state: "Jharkhand",
  },
  {
    city: "Chandrapura",
    state: "Jharkhand",
  },
  {
    city: "Chatra",
    state: "Jharkhand",
  },
  {
    city: "Chirkunda",
    state: "Jharkhand",
  },
  {
    city: "Churi",
    state: "Jharkhand",
  },
  {
    city: "Daltonganj",
    state: "Jharkhand",
  },
  {
    city: "Deoghar",
    state: "Jharkhand",
  },
  {
    city: "Dhanbad",
    state: "Jharkhand",
  },
  {
    city: "Dumka",
    state: "Jharkhand",
  },
  {
    city: "Garhwa",
    state: "Jharkhand",
  },
  {
    city: "Ghatshila",
    state: "Jharkhand",
  },
  {
    city: "Giridih",
    state: "Jharkhand",
  },
  {
    city: "Godda",
    state: "Jharkhand",
  },
  {
    city: "Gomoh",
    state: "Jharkhand",
  },
  {
    city: "Gumia",
    state: "Jharkhand",
  },
  {
    city: "Gumla",
    state: "Jharkhand",
  },
  {
    city: "Hazaribag",
    state: "Jharkhand",
  },
  {
    city: "Hussainabad",
    state: "Jharkhand",
  },
  {
    city: "Jamshedpur",
    state: "Jharkhand",
  },
  {
    city: "Jamtara",
    state: "Jharkhand",
  },
  {
    city: "Jhumri Tilaiya",
    state: "Jharkhand",
  },
  {
    city: "Khunti",
    state: "Jharkhand",
  },
  {
    city: "Lohardaga",
    state: "Jharkhand",
  },
  {
    city: "Madhupur",
    state: "Jharkhand",
  },
  {
    city: "Mihijam",
    state: "Jharkhand",
  },
  {
    city: "Musabani",
    state: "Jharkhand",
  },
  {
    city: "Pakaur",
    state: "Jharkhand",
  },
  {
    city: "Patratu",
    state: "Jharkhand",
  },
  {
    city: "Phusro",
    state: "Jharkhand",
  },
  {
    city: "Ramngarh",
    state: "Jharkhand",
  },
  {
    city: "Ranchi",
    state: "Jharkhand",
  },
  {
    city: "Sahibganj",
    state: "Jharkhand",
  },
  {
    city: "Saunda",
    state: "Jharkhand",
  },
  {
    city: "Simdega",
    state: "Jharkhand",
  },
  {
    city: "Tenu Dam-cum-Kathhara",
    state: "Jharkhand",
  },
  {
    city: "Arasikere",
    state: "Karnataka",
  },
  {
    city: "Bangalore",
    state: "Karnataka",
  },
  {
    city: "Belgaum",
    state: "Karnataka",
  },
  {
    city: "Bellary",
    state: "Karnataka",
  },
  {
    city: "Chamrajnagar",
    state: "Karnataka",
  },
  {
    city: "Chikkaballapur",
    state: "Karnataka",
  },
  {
    city: "Chintamani",
    state: "Karnataka",
  },
  {
    city: "Chitradurga",
    state: "Karnataka",
  },
  {
    city: "Gulbarga",
    state: "Karnataka",
  },
  {
    city: "Gundlupet",
    state: "Karnataka",
  },
  {
    city: "Hassan",
    state: "Karnataka",
  },
  {
    city: "Hospet",
    state: "Karnataka",
  },
  {
    city: "Hubli",
    state: "Karnataka",
  },
  {
    city: "Karkala",
    state: "Karnataka",
  },
  {
    city: "Karwar",
    state: "Karnataka",
  },
  {
    city: "Kolar",
    state: "Karnataka",
  },
  {
    city: "Kota",
    state: "Karnataka",
  },
  {
    city: "Lakshmeshwar",
    state: "Karnataka",
  },
  {
    city: "Lingsugur",
    state: "Karnataka",
  },
  {
    city: "Maddur",
    state: "Karnataka",
  },
  {
    city: "Madhugiri",
    state: "Karnataka",
  },
  {
    city: "Madikeri",
    state: "Karnataka",
  },
  {
    city: "Magadi",
    state: "Karnataka",
  },
  {
    city: "Mahalingpur",
    state: "Karnataka",
  },
  {
    city: "Malavalli",
    state: "Karnataka",
  },
  {
    city: "Malur",
    state: "Karnataka",
  },
  {
    city: "Mandya",
    state: "Karnataka",
  },
  {
    city: "Mangalore",
    state: "Karnataka",
  },
  {
    city: "Manvi",
    state: "Karnataka",
  },

  {
    city: "Mudalgi",
    state: "Karnataka",
  },
  {
    city: "Mudbidri",
    state: "Karnataka",
  },

  {
    city: "Muddebihal",
    state: "Karnataka",
  },
  {
    city: "Mudhol",
    state: "Karnataka",
  },
  {
    city: "Mulbagal",
    state: "Karnataka",
  },
  {
    city: "Mundargi",
    state: "Karnataka",
  },
  {
    city: "Mysore",
    state: "Karnataka",
  },
  {
    city: "Nanjangud",
    state: "Karnataka",
  },
  {
    city: "Pavagada",
    state: "Karnataka",
  },
  {
    city: "Puttur",
    state: "Karnataka",
  },
  {
    city: "Rabkavi Banhatti",
    state: "Karnataka",
  },
  {
    city: "Raichur",
    state: "Karnataka",
  },
  {
    city: "Ramanagaram",
    state: "Karnataka",
  },
  {
    city: "Ramdurg",
    state: "Karnataka",
  },
  {
    city: "Ranibennur",
    state: "Karnataka",
  },
  {
    city: "Robertson Pet",
    state: "Karnataka",
  },
  {
    city: "Ron",
    state: "Karnataka",
  },
  {
    city: "Sadalgi",
    state: "Karnataka",
  },
  {
    city: "Sagar",
    state: "Karnataka",
  },
  {
    city: "Sakleshpur",
    state: "Karnataka",
  },
  {
    city: "Sandur",
    state: "Karnataka",
  },
  {
    city: "Sankeshwar",
    state: "Karnataka",
  },
  {
    city: "Saundatti-Yellamma",
    state: "Karnataka",
  },
  {
    city: "Savanur",
    state: "Karnataka",
  },
  {
    city: "Sedam",
    state: "Karnataka",
  },
  {
    city: "Shahabad",
    state: "Karnataka",
  },
  {
    city: "Shahpur",
    state: "Karnataka",
  },
  {
    city: "Shiggaon",
    state: "Karnataka",
  },
  {
    city: "Shikapur",
    state: "Karnataka",
  },
  {
    city: "Shimoga",
    state: "Karnataka",
  },
  {
    city: "Shorapur",
    state: "Karnataka",
  },
  {
    city: "Shrirangapattana",
    state: "Karnataka",
  },
  {
    city: "Sidlaghatta",
    state: "Karnataka",
  },
  {
    city: "Sindgi",
    state: "Karnataka",
  },
  {
    city: "Sindhnur",
    state: "Karnataka",
  },
  {
    city: "Sira",
    state: "Karnataka",
  },
  {
    city: "Sirsi",
    state: "Karnataka",
  },
  {
    city: "Siruguppa",
    state: "Karnataka",
  },
  {
    city: "Srinivaspur",
    state: "Karnataka",
  },
  {
    city: "Talikota",
    state: "Karnataka",
  },
  {
    city: "Tarikere",
    state: "Karnataka",
  },
  {
    city: "Tekkalakota",
    state: "Karnataka",
  },
  {
    city: "Terdal",
    state: "Karnataka",
  },
  {
    city: "Tiptur",
    state: "Karnataka",
  },
  {
    city: "Tumkur",
    state: "Karnataka",
  },
  {
    city: "Udupi",
    state: "Karnataka",
  },
  {
    city: "Vijayapura",
    state: "Karnataka",
  },
  {
    city: "Wadi",
    state: "Karnataka",
  },
  {
    city: "Yadgir",
    state: "Karnataka",
  },
  {
    city: "Adoor",
    state: "Kerala",
  },
  {
    city: "Akathiyoor",
    state: "Kerala",
  },
  {
    city: "Alappuzha",
    state: "Kerala",
  },
  {
    city: "Ancharakandy",
    state: "Kerala",
  },
  {
    city: "Aroor",
    state: "Kerala",
  },
  {
    city: "Ashtamichira",
    state: "Kerala",
  },
  {
    city: "Attingal",
    state: "Kerala",
  },
  {
    city: "Avinissery",
    state: "Kerala",
  },
  {
    city: "Chalakudy",
    state: "Kerala",
  },
  {
    city: "Changanassery",
    state: "Kerala",
  },
  {
    city: "Chendamangalam",
    state: "Kerala",
  },
  {
    city: "Chengannur",
    state: "Kerala",
  },
  {
    city: "Cherthala",
    state: "Kerala",
  },
  {
    city: "Cheruthazham",
    state: "Kerala",
  },
  {
    city: "Chittur-Thathamangalam",
    state: "Kerala",
  },
  {
    city: "Chockli",
    state: "Kerala",
  },
  {
    city: "Erattupetta",
    state: "Kerala",
  },
  {
    city: "Guruvayoor",
    state: "Kerala",
  },
  {
    city: "Irinjalakuda",
    state: "Kerala",
  },
  {
    city: "Kadirur",
    state: "Kerala",
  },
  {
    city: "Kalliasseri",
    state: "Kerala",
  },
  {
    city: "Kalpetta",
    state: "Kerala",
  },
  {
    city: "Kanhangad",
    state: "Kerala",
  },
  {
    city: "Kanjikkuzhi",
    state: "Kerala",
  },
  {
    city: "Kannur",
    state: "Kerala",
  },
  {
    city: "Kasaragod",
    state: "Kerala",
  },
  {
    city: "Kayamkulam",
    state: "Kerala",
  },

  {
    city: "Kochi",
    state: "Kerala",
  },
  {
    city: "Kodungallur",
    state: "Kerala",
  },
  {
    city: "Kollam",
    state: "Kerala",
  },
  {
    city: "Koothuparamba",
    state: "Kerala",
  },
  {
    city: "Kothamangalam",
    state: "Kerala",
  },
  {
    city: "Kottayam",
    state: "Kerala",
  },
  {
    city: "Kozhikode",
    state: "Kerala",
  },
  {
    city: "Kunnamkulam",
    state: "Kerala",
  },
  {
    city: "Malappuram",
    state: "Kerala",
  },
  {
    city: "Mattannur",
    state: "Kerala",
  },
  {
    city: "Mavelikkara",
    state: "Kerala",
  },
  {
    city: "Mavoor",
    state: "Kerala",
  },
  {
    city: "Muvattupuzha",
    state: "Kerala",
  },
  {
    city: "Nedumangad",
    state: "Kerala",
  },
  {
    city: "Neyyattinkara",
    state: "Kerala",
  },
  {
    city: "Ottappalam",
    state: "Kerala",
  },
  {
    city: "Palai",
    state: "Kerala",
  },
  {
    city: "Palakkad",
    state: "Kerala",
  },
  {
    city: "Panniyannur",
    state: "Kerala",
  },
  {
    city: "Pappinisseri",
    state: "Kerala",
  },
  {
    city: "Paravoor",
    state: "Kerala",
  },
  {
    city: "Pathanamthitta",
    state: "Kerala",
  },
  {
    city: "Payyannur",
    state: "Kerala",
  },
  {
    city: "Peringathur",
    state: "Kerala",
  },
  {
    city: "Perinthalmanna",
    state: "Kerala",
  },
  {
    city: "Perumbavoor",
    state: "Kerala",
  },
  {
    city: "Ponnani",
    state: "Kerala",
  },
  {
    city: "Punalur",
    state: "Kerala",
  },
  {
    city: "Quilandy",
    state: "Kerala",
  },
  {
    city: "Shoranur",
    state: "Kerala",
  },
  {
    city: "Taliparamba",
    state: "Kerala",
  },
  {
    city: "Thiruvalla",
    state: "Kerala",
  },
  {
    city: "Thiruvananthapuram",
    state: "Kerala",
  },
  {
    city: "Thodupuzha",
    state: "Kerala",
  },
  {
    city: "Thrissur",
    state: "Kerala",
  },
  {
    city: "Tirur",
    state: "Kerala",
  },
  {
    city: "Vadakara",
    state: "Kerala",
  },
  {
    city: "Vaikom",
    state: "Kerala",
  },
  {
    city: "Varkala",
    state: "Kerala",
  },
  {
    city: "Kavaratti",
    state: "Lakshadweep (UT)",
  },
  {
    city: "Ashok Nagar",
    state: "Madhya Pradesh",
  },
  {
    city: "Balaghat",
    state: "Madhya Pradesh",
  },
  {
    city: "Betul",
    state: "Madhya Pradesh",
  },
  {
    city: "Bhopal",
    state: "Madhya Pradesh",
  },
  {
    city: "Burhanpur",
    state: "Madhya Pradesh",
  },
  {
    city: "Chhatarpur",
    state: "Madhya Pradesh",
  },
  {
    city: "Dabra",
    state: "Madhya Pradesh",
  },
  {
    city: "Datia",
    state: "Madhya Pradesh",
  },
  {
    city: "Dewas",
    state: "Madhya Pradesh",
  },
  {
    city: "Dhar",
    state: "Madhya Pradesh",
  },
  {
    city: "Fatehabad",
    state: "Madhya Pradesh",
  },

  {
    city: "Gwalior",
    state: "Madhya Pradesh",
  },
  {
    city: "Indore",
    state: "Madhya Pradesh",
  },
  {
    city: "Itarsi",
    state: "Madhya Pradesh",
  },
  {
    city: "Jabalpur",
    state: "Madhya Pradesh",
  },
  {
    city: "Katni",
    state: "Madhya Pradesh",
  },
  {
    city: "Kotma",
    state: "Madhya Pradesh",
  },
  {
    city: "Lahar",
    state: "Madhya Pradesh",
  },
  {
    city: "Lundi",
    state: "Madhya Pradesh",
  },
  {
    city: "Maharajpur",
    state: "Madhya Pradesh",
  },
  {
    city: "Mahidpur",
    state: "Madhya Pradesh",
  },
  {
    city: "Maihar",
    state: "Madhya Pradesh",
  },
  {
    city: "Malajkhand",
    state: "Madhya Pradesh",
  },
  {
    city: "Manasa",
    state: "Madhya Pradesh",
  },
  {
    city: "Manawar",
    state: "Madhya Pradesh",
  },
  {
    city: "Mandideep",
    state: "Madhya Pradesh",
  },
  {
    city: "Mandla",
    state: "Madhya Pradesh",
  },
  {
    city: "Mandsaur",
    state: "Madhya Pradesh",
  },
  {
    city: "Mauganj",
    state: "Madhya Pradesh",
  },
  {
    city: "Mhow Cantonment",
    state: "Madhya Pradesh",
  },
  {
    city: "Mhowgaon",
    state: "Madhya Pradesh",
  },
  {
    city: "Morena",
    state: "Madhya Pradesh",
  },
  {
    city: "Multai",
    state: "Madhya Pradesh",
  },
  {
    city: "Murwara",
    state: "Madhya Pradesh",
  },
  {
    city: "Nagda",
    state: "Madhya Pradesh",
  },

  {
    city: "Nainpur",
    state: "Madhya Pradesh",
  },
  {
    city: "Narsinghgarh",
    state: "Madhya Pradesh",
  },
  {
    city: "Neemuch",
    state: "Madhya Pradesh",
  },
  {
    city: "Nepanagar",
    state: "Madhya Pradesh",
  },
  {
    city: "Niwari",
    state: "Madhya Pradesh",
  },
  {
    city: "Nowgong",
    state: "Madhya Pradesh",
  },
  {
    city: "Nowrozabad",
    state: "Madhya Pradesh",
  },
  {
    city: "Pachore",
    state: "Madhya Pradesh",
  },
  {
    city: "Pali",
    state: "Madhya Pradesh",
  },
  {
    city: "Panagar",
    state: "Madhya Pradesh",
  },
  {
    city: "Pandhurna",
    state: "Madhya Pradesh",
  },
  {
    city: "Panna",
    state: "Madhya Pradesh",
  },
  {
    city: "Pasan",
    state: "Madhya Pradesh",
  },
  {
    city: "Pipariya",
    state: "Madhya Pradesh",
  },
  {
    city: "Pithampur",
    state: "Madhya Pradesh",
  },
  {
    city: "Porsa",
    state: "Madhya Pradesh",
  },
  {
    city: "Prithvipur",
    state: "Madhya Pradesh",
  },
  {
    city: "Raghogarh-Vijaypur",
    state: "Madhya Pradesh",
  },
  {
    city: "Rahatgarh",
    state: "Madhya Pradesh",
  },
  {
    city: "Raisen",
    state: "Madhya Pradesh",
  },
  {
    city: "Rajgarh",
    state: "Madhya Pradesh",
  },
  {
    city: "Ratlam",
    state: "Madhya Pradesh",
  },
  {
    city: "Rau",
    state: "Madhya Pradesh",
  },
  {
    city: "Rehli",
    state: "Madhya Pradesh",
  },
  {
    city: "Rewa",
    state: "Madhya Pradesh",
  },
  {
    city: "Sabalgarh",
    state: "Madhya Pradesh",
  },
  {
    city: "Sagar",
    state: "Madhya Pradesh",
  },
  {
    city: "Sanawad",
    state: "Madhya Pradesh",
  },
  {
    city: "Sarangpur",
    state: "Madhya Pradesh",
  },
  {
    city: "Sarni",
    state: "Madhya Pradesh",
  },
  {
    city: "Satna",
    state: "Madhya Pradesh",
  },
  {
    city: "Sausar",
    state: "Madhya Pradesh",
  },
  {
    city: "Sehore",
    state: "Madhya Pradesh",
  },
  {
    city: "Sendhwa",
    state: "Madhya Pradesh",
  },
  {
    city: "Seoni",
    state: "Madhya Pradesh",
  },
  {
    city: "Seoni-Malwa",
    state: "Madhya Pradesh",
  },
  {
    city: "Shahdol",
    state: "Madhya Pradesh",
  },
  {
    city: "Shajapur",
    state: "Madhya Pradesh",
  },
  {
    city: "Shamgarh",
    state: "Madhya Pradesh",
  },
  {
    city: "Sheopur",
    state: "Madhya Pradesh",
  },
  {
    city: "Shivpuri",
    state: "Madhya Pradesh",
  },
  {
    city: "Shujalpur",
    state: "Madhya Pradesh",
  },
  {
    city: "Sidhi",
    state: "Madhya Pradesh",
  },
  {
    city: "Sihora",
    state: "Madhya Pradesh",
  },
  {
    city: "Singrauli",
    state: "Madhya Pradesh",
  },
  {
    city: "Sironj",
    state: "Madhya Pradesh",
  },
  {
    city: "Sohagpur",
    state: "Madhya Pradesh",
  },
  {
    city: "Tarana",
    state: "Madhya Pradesh",
  },
  {
    city: "Tikamgarh",
    state: "Madhya Pradesh",
  },
  {
    city: "Ujhani",
    state: "Madhya Pradesh",
  },
  {
    city: "Ujjain",
    state: "Madhya Pradesh",
  },
  {
    city: "Umaria",
    state: "Madhya Pradesh",
  },
  {
    city: "Vidisha",
    state: "Madhya Pradesh",
  },
  {
    city: "Wara Seoni",
    state: "Madhya Pradesh",
  },
  {
    city: "Ahmednagar",
    state: "Maharashtra",
  },
  {
    city: "Akola",
    state: "Maharashtra",
  },
  {
    city: "Amravati",
    state: "Maharashtra",
  },
  {
    city: "Aurangabad",
    state: "Maharashtra",
  },
  {
    city: "Baramati",
    state: "Maharashtra",
  },
  {
    city: "Chalisgaon",
    state: "Maharashtra",
  },
  {
    city: "Chinchani",
    state: "Maharashtra",
  },
  {
    city: "Devgarh",
    state: "Maharashtra",
  },
  {
    city: "Dhule",
    state: "Maharashtra",
  },
  {
    city: "Dombivli",
    state: "Maharashtra",
  },
  {
    city: "Durgapur",
    state: "Maharashtra",
  },
  {
    city: "Ichalkaranji",
    state: "Maharashtra",
  },
  {
    city: "Jalna",
    state: "Maharashtra",
  },
  {
    city: "Kalyan",
    state: "Maharashtra",
  },
  {
    city: "Latur",
    state: "Maharashtra",
  },
  {
    city: "Loha",
    state: "Maharashtra",
  },
  {
    city: "Lonar",
    state: "Maharashtra",
  },
  {
    city: "Lonavla",
    state: "Maharashtra",
  },
  {
    city: "Mahad",
    state: "Maharashtra",
  },
  {
    city: "Mahuli",
    state: "Maharashtra",
  },
  {
    city: "Malegaon",
    state: "Maharashtra",
  },
  {
    city: "Malkapur",
    state: "Maharashtra",
  },
  {
    city: "Manchar",
    state: "Maharashtra",
  },
  {
    city: "Mangalvedhe",
    state: "Maharashtra",
  },
  {
    city: "Mangrulpir",
    state: "Maharashtra",
  },
  {
    city: "Manjlegaon",
    state: "Maharashtra",
  },
  {
    city: "Manmad",
    state: "Maharashtra",
  },
  {
    city: "Manwath",
    state: "Maharashtra",
  },
  {
    city: "Mehkar",
    state: "Maharashtra",
  },
  {
    city: "Mhaswad",
    state: "Maharashtra",
  },
  {
    city: "Miraj",
    state: "Maharashtra",
  },
  {
    city: "Morshi",
    state: "Maharashtra",
  },
  {
    city: "Mukhed",
    state: "Maharashtra",
  },

  {
    city: "Mul",
    state: "Maharashtra",
  },
  {
    city: "Mumbai",
    state: "Maharashtra",
  },
  {
    city: "Murtijapur",
    state: "Maharashtra",
  },
  {
    city: "Nagpur",
    state: "Maharashtra",
  },
  {
    city: "Nalasopara",
    state: "Maharashtra",
  },
  {
    city: "Nanded-Waghala",
    state: "Maharashtra",
  },
  {
    city: "Nandgaon",
    state: "Maharashtra",
  },
  {
    city: "Nandura",
    state: "Maharashtra",
  },
  {
    city: "Nandurbar",
    state: "Maharashtra",
  },
  {
    city: "Narkhed",
    state: "Maharashtra",
  },
  {
    city: "Nashik",
    state: "Maharashtra",
  },
  {
    city: "Navi Mumbai",
    state: "Maharashtra",
  },
  {
    city: "Nawapur",
    state: "Maharashtra",
  },
  {
    city: "Nilanga",
    state: "Maharashtra",
  },
  {
    city: "Osmanabad",
    state: "Maharashtra",
  },
  {
    city: "Ozar",
    state: "Maharashtra",
  },
  {
    city: "Pachora",
    state: "Maharashtra",
  },
  {
    city: "Paithan",
    state: "Maharashtra",
  },
  {
    city: "Palghar",
    state: "Maharashtra",
  },
  {
    city: "Pandharkaoda",
    state: "Maharashtra",
  },
  {
    city: "Pandharpur",
    state: "Maharashtra",
  },
  {
    city: "Panvel",
    state: "Maharashtra",
  },
  {
    city: "Parbhani",
    state: "Maharashtra",
  },
  {
    city: "Parli",
    state: "Maharashtra",
  },
  {
    city: "Parola",
    state: "Maharashtra",
  },
  {
    city: "Partur",
    state: "Maharashtra",
  },
  {
    city: "Pathardi",
    state: "Maharashtra",
  },
  {
    city: "Pathri",
    state: "Maharashtra",
  },
  {
    city: "Patur",
    state: "Maharashtra",
  },
  {
    city: "Pauni",
    state: "Maharashtra",
  },
  {
    city: "Pen",
    state: "Maharashtra",
  },
  {
    city: "Phaltan",
    state: "Maharashtra",
  },
  {
    city: "Pulgaon",
    state: "Maharashtra",
  },
  {
    city: "Pune",
    state: "Maharashtra",
  },
  {
    city: "Purna",
    state: "Maharashtra",
  },
  {
    city: "Pusad",
    state: "Maharashtra",
  },
  {
    city: "Rahuri",
    state: "Maharashtra",
  },
  {
    city: "Rajura",
    state: "Maharashtra",
  },
  {
    city: "Ramtek",
    state: "Maharashtra",
  },
  {
    city: "Ratnagiri",
    state: "Maharashtra",
  },
  {
    city: "Raver",
    state: "Maharashtra",
  },
  {
    city: "Risod",
    state: "Maharashtra",
  },
  {
    city: "Sailu",
    state: "Maharashtra",
  },
  {
    city: "Sangamner",
    state: "Maharashtra",
  },
  {
    city: "Sangli",
    state: "Maharashtra",
  },
  {
    city: "Sangole",
    state: "Maharashtra",
  },
  {
    city: "Sasvad",
    state: "Maharashtra",
  },
  {
    city: "Satana",
    state: "Maharashtra",
  },
  {
    city: "Satara",
    state: "Maharashtra",
  },
  {
    city: "Savner",
    state: "Maharashtra",
  },
  {
    city: "Sawantwadi",
    state: "Maharashtra",
  },
  {
    city: "Shahade",
    state: "Maharashtra",
  },
  {
    city: "Shegaon",
    state: "Maharashtra",
  },
  {
    city: "Shendurjana",
    state: "Maharashtra",
  },
  {
    city: "Shirdi",
    state: "Maharashtra",
  },
  {
    city: "Shirpur-Warwade",
    state: "Maharashtra",
  },
  {
    city: "Shirur",
    state: "Maharashtra",
  },
  {
    city: "Shrigonda",
    state: "Maharashtra",
  },
  {
    city: "Shrirampur",
    state: "Maharashtra",
  },
  {
    city: "Sillod",
    state: "Maharashtra",
  },
  {
    city: "Sinnar",
    state: "Maharashtra",
  },
  {
    city: "Solapur",
    state: "Maharashtra",
  },
  {
    city: "Soyagaon",
    state: "Maharashtra",
  },
  {
    city: "Talegaon Dabhade",
    state: "Maharashtra",
  },
  {
    city: "Talode",
    state: "Maharashtra",
  },
  {
    city: "Tasgaon",
    state: "Maharashtra",
  },
  {
    city: "Tirora",
    state: "Maharashtra",
  },
  {
    city: "Tuljapur",
    state: "Maharashtra",
  },
  {
    city: "Tumsar",
    state: "Maharashtra",
  },
  {
    city: "Uran",
    state: "Maharashtra",
  },
  {
    city: "Uran Islampur",
    state: "Maharashtra",
  },
  {
    city: "Wadgaon Road",
    state: "Maharashtra",
  },
  {
    city: "Wai",
    state: "Maharashtra",
  },
  {
    city: "Wani",
    state: "Maharashtra",
  },
  {
    city: "Wardha",
    state: "Maharashtra",
  },
  {
    city: "Warora",
    state: "Maharashtra",
  },
  {
    city: "Warud",
    state: "Maharashtra",
  },
  {
    city: "Washim",
    state: "Maharashtra",
  },
  {
    city: "Yevla",
    state: "Maharashtra",
  },
  {
    city: "Uchgaon",
    state: "Maharashtra",
  },
  {
    city: "Udgir",
    state: "Maharashtra",
  },
  {
    city: "Umarga",
    state: "Maharashtra",
  },
  {
    city: "Umarkhed",
    state: "Maharashtra",
  },
  {
    city: "Umred",
    state: "Maharashtra",
  },
  {
    city: "Vadgaon Kasba",
    state: "Maharashtra",
  },
  {
    city: "Vaijapur",
    state: "Maharashtra",
  },
  {
    city: "Vasai",
    state: "Maharashtra",
  },
  {
    city: "Virar",
    state: "Maharashtra",
  },
  {
    city: "Vita",
    state: "Maharashtra",
  },
  {
    city: "Yavatmal",
    state: "Maharashtra",
  },
  {
    city: "Yawal",
    state: "Maharashtra",
  },
  {
    city: "Imphal",
    state: "Manipur",
  },
  {
    city: "Kakching",
    state: "Manipur",
  },
  {
    city: "Lilong",
    state: "Manipur",
  },
  {
    city: "Mayang Imphal",
    state: "Manipur",
  },
  {
    city: "Thoubal",
    state: "Manipur",
  },
  {
    city: "Jowai",
    state: "Meghalaya",
  },
  {
    city: "Nongstoin",
    state: "Meghalaya",
  },
  {
    city: "Shillong",
    state: "Meghalaya",
  },
  {
    city: "Tura",
    state: "Meghalaya",
  },
  {
    city: "Aizawl",
    state: "Mizoram",
  },
  {
    city: "Champhai",
    state: "Mizoram",
  },
  {
    city: "Lunglei",
    state: "Mizoram",
  },
  {
    city: "Saiha",
    state: "Mizoram",
  },
  {
    city: "Dimapur",
    state: "Nagaland",
  },
  {
    city: "Kohima",
    state: "Nagaland",
  },
  {
    city: "Mokokchung",
    state: "Nagaland",
  },
  {
    city: "Tuensang",
    state: "Nagaland",
  },
  {
    city: "Wokha",
    state: "Nagaland",
  },
  {
    city: "Zunheboto",
    state: "Nagaland",
  },
  {
    city: "Anandapur",
    state: "Odisha",
  },
  {
    city: "Anugul",
    state: "Odisha",
  },
  {
    city: "Asika",
    state: "Odisha",
  },
  {
    city: "Balangir",
    state: "Odisha",
  },
  {
    city: "Balasore",
    state: "Odisha",
  },
  {
    city: "Baleshwar",
    state: "Odisha",
  },
  {
    city: "Bamra",
    state: "Odisha",
  },
  {
    city: "Barbil",
    state: "Odisha",
  },
  {
    city: "Bargarh",
    state: "Odisha",
  },
  {
    city: "Baripada",
    state: "Odisha",
  },
  {
    city: "Basudebpur",
    state: "Odisha",
  },
  {
    city: "Belpahar",
    state: "Odisha",
  },
  {
    city: "Bhadrak",
    state: "Odisha",
  },
  {
    city: "Bhawanipatna",
    state: "Odisha",
  },
  {
    city: "Bhuban",
    state: "Odisha",
  },
  {
    city: "Bhubaneswar",
    state: "Odisha",
  },
  {
    city: "Biramitrapur",
    state: "Odisha",
  },
  {
    city: "Brahmapur",
    state: "Odisha",
  },
  {
    city: "Brajrajnagar",
    state: "Odisha",
  },
  {
    city: "Byasanagar",
    state: "Odisha",
  },
  {
    city: "Cuttack",
    state: "Odisha",
  },
  {
    city: "Debagarh",
    state: "Odisha",
  },
  {
    city: "Dhenkanal",
    state: "Odisha",
  },
  {
    city: "Gunupur",
    state: "Odisha",
  },
  {
    city: "Hinjilicut",
    state: "Odisha",
  },
  {
    city: "Jagatsinghapur",
    state: "Odisha",
  },
  {
    city: "Jajapur",
    state: "Odisha",
  },
  {
    city: "Jaleswar",
    state: "Odisha",
  },
  {
    city: "Jatani",
    state: "Odisha",
  },
  {
    city: "Jeypore",
    state: "Odisha",
  },
  {
    city: "Jharsuguda",
    state: "Odisha",
  },
  {
    city: "Joda",
    state: "Odisha",
  },
  {
    city: "Kantabanji",
    state: "Odisha",
  },
  {
    city: "Karanjia",
    state: "Odisha",
  },
  {
    city: "Kendrapara",
    state: "Odisha",
  },
  {
    city: "Kendujhar",
    state: "Odisha",
  },
  {
    city: "Khordha",
    state: "Odisha",
  },
  {
    city: "Koraput",
    state: "Odisha",
  },
  {
    city: "Malkangiri",
    state: "Odisha",
  },
  {
    city: "Nabarangpur",
    state: "Odisha",
  },
  {
    city: "Paradip",
    state: "Odisha",
  },
  {
    city: "Parlakhemundi",
    state: "Odisha",
  },
  {
    city: "Pattamundai",
    state: "Odisha",
  },
  {
    city: "Phulabani",
    state: "Odisha",
  },
  {
    city: "Puri",
    state: "Odisha",
  },
  {
    city: "Rairangpur",
    state: "Odisha",
  },
  {
    city: "Rajagangapur",
    state: "Odisha",
  },
  {
    city: "Rourkela",
    state: "Odisha",
  },
  {
    city: "Rayagada",
    state: "Odisha",
  },
  {
    city: "Sambalpur",
    state: "Odisha",
  },
  {
    city: "Soro",
    state: "Odisha",
  },
  {
    city: "Sunabeda",
    state: "Odisha",
  },
  {
    city: "Sundargarh",
    state: "Odisha",
  },
  {
    city: "Talcher",
    state: "Odisha",
  },
  {
    city: "Titlagarh",
    state: "Odisha",
  },
  {
    city: "Umarkote",
    state: "Odisha",
  },
  {
    city: "Karaikal",
    state: "Puducherry",
  },
  {
    city: "Mahe",
    state: "Puducherry",
  },
  {
    city: "Pondicherry",
    state: "Puducherry",
  },
  {
    city: "Yanam",
    state: "Puducherry",
  },
  {
    city: "Ahmedgarh",
    state: "Punjab",
  },
  {
    city: "Amritsar",
    state: "Punjab",
  },
  {
    city: "Barnala",
    state: "Punjab",
  },
  {
    city: "Batala",
    state: "Punjab",
  },
  {
    city: "Bathinda",
    state: "Punjab",
  },
  {
    city: "Bhagha Purana",
    state: "Punjab",
  },
  {
    city: "Budhlada",
    state: "Punjab",
  },
  {
    city: "Chandigarh",
    state: "Punjab",
  },
  {
    city: "Dasuya",
    state: "Punjab",
  },
  {
    city: "Dhuri",
    state: "Punjab",
  },
  {
    city: "Dinanagar",
    state: "Punjab",
  },
  {
    city: "Faridkot",
    state: "Punjab",
  },
  {
    city: "Fazilka",
    state: "Punjab",
  },
  {
    city: "Firozpur",
    state: "Punjab",
  },
  {
    city: "Firozpur Cantt.",
    state: "Punjab",
  },
  {
    city: "Giddarbaha",
    state: "Punjab",
  },
  {
    city: "Gobindgarh",
    state: "Punjab",
  },
  {
    city: "Gurdaspur",
    state: "Punjab",
  },
  {
    city: "Hoshiarpur",
    state: "Punjab",
  },
  {
    city: "Jagraon",
    state: "Punjab",
  },
  {
    city: "Jaitu",
    state: "Punjab",
  },
  {
    city: "Jalalabad",
    state: "Punjab",
  },
  {
    city: "Jalandhar",
    state: "Punjab",
  },
  {
    city: "Jalandhar Cantt.",
    state: "Punjab",
  },
  {
    city: "Jandiala",
    state: "Punjab",
  },
  {
    city: "Kapurthala",
    state: "Punjab",
  },
  {
    city: "Karoran",
    state: "Punjab",
  },
  {
    city: "Kartarpur",
    state: "Punjab",
  },
  {
    city: "Khanna",
    state: "Punjab",
  },
  {
    city: "Kharar",
    state: "Punjab",
  },
  {
    city: "Kot Kapura",
    state: "Punjab",
  },
  {
    city: "Kurali",
    state: "Punjab",
  },
  {
    city: "Longowal",
    state: "Punjab",
  },
  {
    city: "Ludhiana",
    state: "Punjab",
  },
  {
    city: "Malerkotla",
    state: "Punjab",
  },
  {
    city: "Malout",
    state: "Punjab",
  },
  {
    city: "Mansa",
    state: "Punjab",
  },
  {
    city: "Maur",
    state: "Punjab",
  },
  {
    city: "Moga",
    state: "Punjab",
  },

  {
    city: "Mohali",
    state: "Punjab",
  },
  {
    city: "Morinda",
    state: "Punjab",
  },
  {
    city: "Mukerian",
    state: "Punjab",
  },
  {
    city: "Muktsar",
    state: "Punjab",
  },
  {
    city: "Nabha",
    state: "Punjab",
  },
  {
    city: "Nakodar",
    state: "Punjab",
  },
  {
    city: "Nangal",
    state: "Punjab",
  },
  {
    city: "Nawanshahr",
    state: "Punjab",
  },
  {
    city: "Pathankot",
    state: "Punjab",
  },
  {
    city: "Patiala",
    state: "Punjab",
  },
  {
    city: "Patran",
    state: "Punjab",
  },
  {
    city: "Patti",
    state: "Punjab",
  },
  {
    city: "Phagwara",
    state: "Punjab",
  },
  {
    city: "Phillaur",
    state: "Punjab",
  },
  {
    city: "Qadian",
    state: "Punjab",
  },
  {
    city: "Raikot",
    state: "Punjab",
  },
  {
    city: "Rajpura",
    state: "Punjab",
  },
  {
    city: "Rampura Phul",
    state: "Punjab",
  },
  {
    city: "Rupnagar",
    state: "Punjab",
  },
  {
    city: "Samana",
    state: "Punjab",
  },
  {
    city: "Sangrur",
    state: "Punjab",
  },
  {
    city: "Sirhind Fatehgarh Sahib",
    state: "Punjab",
  },
  {
    city: "Sujanpur",
    state: "Punjab",
  },
  {
    city: "Sunam",
    state: "Punjab",
  },
  {
    city: "Talwara",
    state: "Punjab",
  },
  {
    city: "Tarn Taran",
    state: "Punjab",
  },
  {
    city: "Urmar Tanda",
    state: "Punjab",
  },
  {
    city: "Zira",
    state: "Punjab",
  },
  {
    city: "Zirakpur",
    state: "Punjab",
  },
  {
    city: "Bali",
    state: "Rajasthan",
  },
  {
    city: "Banswara",
    state: "Rajasthan",
  },
  {
    city: "Ajmer",
    state: "Rajasthan",
  },
  {
    city: "Alwar",
    state: "Rajasthan",
  },
  {
    city: "Bandikui",
    state: "Rajasthan",
  },
  {
    city: "Baran",
    state: "Rajasthan",
  },
  {
    city: "Barmer",
    state: "Rajasthan",
  },
  {
    city: "Bikaner",
    state: "Rajasthan",
  },
  {
    city: "Fatehpur",
    state: "Rajasthan",
  },

  {
    city: "Jaipur",
    state: "Rajasthan",
  },
  {
    city: "Jaisalmer",
    state: "Rajasthan",
  },
  {
    city: "Jodhpur",
    state: "Rajasthan",
  },
  {
    city: "Kota",
    state: "Rajasthan",
  },
  {
    city: "Lachhmangarh",
    state: "Rajasthan",
  },
  {
    city: "Ladnun",
    state: "Rajasthan",
  },
  {
    city: "Lakheri",
    state: "Rajasthan",
  },
  {
    city: "Lalsot",
    state: "Rajasthan",
  },
  {
    city: "Losal",
    state: "Rajasthan",
  },
  {
    city: "Makrana",
    state: "Rajasthan",
  },
  {
    city: "Malpura",
    state: "Rajasthan",
  },
  {
    city: "Mandalgarh",
    state: "Rajasthan",
  },
  {
    city: "Mandawa",
    state: "Rajasthan",
  },
  {
    city: "Mangrol",
    state: "Rajasthan",
  },
  {
    city: "Merta City",
    state: "Rajasthan",
  },
  {
    city: "Mount Abu",
    state: "Rajasthan",
  },
  {
    city: "Nadbai",
    state: "Rajasthan",
  },
  {
    city: "Nagar",
    state: "Rajasthan",
  },
  {
    city: "Nagaur",
    state: "Rajasthan",
  },
  {
    city: "Nargund",
    state: "Rajasthan",
  },
  {
    city: "Nasirabad",
    state: "Rajasthan",
  },
  {
    city: "Nathdwara",
    state: "Rajasthan",
  },
  {
    city: "Navalgund",
    state: "Rajasthan",
  },

  {
    city: "Nawalgarh",
    state: "Rajasthan",
  },
  {
    city: "Neem-Ka-Thana",
    state: "Rajasthan",
  },
  {
    city: "Nelamangala",
    state: "Rajasthan",
  },
  {
    city: "Nimbahera",
    state: "Rajasthan",
  },
  {
    city: "Nipani",
    state: "Rajasthan",
  },
  {
    city: "Niwai",
    state: "Rajasthan",
  },
  {
    city: "Nohar",
    state: "Rajasthan",
  },
  {
    city: "Nokha",
    state: "Rajasthan",
  },
  {
    city: "Pali",
    state: "Rajasthan",
  },
  {
    city: "Phalodi",
    state: "Rajasthan",
  },
  {
    city: "Phulera",
    state: "Rajasthan",
  },
  {
    city: "Pilani",
    state: "Rajasthan",
  },
  {
    city: "Pilibanga",
    state: "Rajasthan",
  },
  {
    city: "Pindwara",
    state: "Rajasthan",
  },
  {
    city: "Pipar City",
    state: "Rajasthan",
  },
  {
    city: "Prantij",
    state: "Rajasthan",
  },
  {
    city: "Pratapgarh",
    state: "Rajasthan",
  },
  {
    city: "Raisinghnagar",
    state: "Rajasthan",
  },
  {
    city: "Rajakhera",
    state: "Rajasthan",
  },
  {
    city: "Rajaldesar",
    state: "Rajasthan",
  },
  {
    city: "Rajgarh (Alwar)",
    state: "Rajasthan",
  },

  {
    city: "Rajgarh (Churu)",
    state: "Rajasthan",
  },
  {
    city: "Rajsamand",
    state: "Rajasthan",
  },
  {
    city: "Ramganj Mandi",
    state: "Rajasthan",
  },
  {
    city: "Ramngarh",
    state: "Rajasthan",
  },
  {
    city: "Ratangarh",
    state: "Rajasthan",
  },
  {
    city: "Rawatbhata",
    state: "Rajasthan",
  },
  {
    city: "Rawatsar",
    state: "Rajasthan",
  },
  {
    city: "Reengus",
    state: "Rajasthan",
  },
  {
    city: "Sadri",
    state: "Rajasthan",
  },
  {
    city: "Sadulshahar",
    state: "Rajasthan",
  },
  {
    city: "Sagwara",
    state: "Rajasthan",
  },
  {
    city: "Sambhar",
    state: "Rajasthan",
  },
  {
    city: "Sanchore",
    state: "Rajasthan",
  },
  {
    city: "Sangaria",
    state: "Rajasthan",
  },
  {
    city: "Sardarshahar",
    state: "Rajasthan",
  },
  {
    city: "Sawai Madhopur",
    state: "Rajasthan",
  },
  {
    city: "Shahpura",
    state: "Rajasthan",
  },
  {
    city: "Sheoganj",
    state: "Rajasthan",
  },
  {
    city: "Sikar",
    state: "Rajasthan",
  },
  {
    city: "Sirohi",
    state: "Rajasthan",
  },
  {
    city: "Sojat",
    state: "Rajasthan",
  },
  {
    city: "Sri Madhopur",
    state: "Rajasthan",
  },
  {
    city: "Sujangarh",
    state: "Rajasthan",
  },
  {
    city: "Sumerpur",
    state: "Rajasthan",
  },
  {
    city: "Suratgarh",
    state: "Rajasthan",
  },
  {
    city: "Taranagar",
    state: "Rajasthan",
  },

  {
    city: "Todabhim",
    state: "Rajasthan",
  },
  {
    city: "Todaraisingh",
    state: "Rajasthan",
  },
  {
    city: "Tonk",
    state: "Rajasthan",
  },
  {
    city: "Udaipur",
    state: "Rajasthan",
  },
  {
    city: "Udaipurwati",
    state: "Rajasthan",
  },
  {
    city: "Vijainagar",
    state: "Rajasthan",
  },
  {
    city: "Gangtok",
    state: "Sikkim",
  },

  {
    city: "Arakkonam",
    state: "Tamil Nadu",
  },
  {
    city: "Arcot",
    state: "Tamil Nadu",
  },
  {
    city: "Aruppukkottai",
    state: "Tamil Nadu",
  },
  {
    city: "Bhavani",
    state: "Tamil Nadu",
  },
  {
    city: "Chengalpattu",
    state: "Tamil Nadu",
  },
  {
    city: "Chinna Salem",
    state: "Tamil Nadu",
  },
  {
    city: "Coimbatore",
    state: "Tamil Nadu",
  },
  {
    city: "Coonoor",
    state: "Tamil Nadu",
  },
  {
    city: "Cuddalore",
    state: "Tamil Nadu",
  },
  {
    city: "Dharmapuri",
    state: "Tamil Nadu",
  },
  {
    city: "Dindigul",
    state: "Tamil Nadu",
  },
  {
    city: "Erode",
    state: "Tamil Nadu",
  },
  {
    city: "Gudalur",
    state: "Tamil Nadu",
  },
  {
    city: "Kanchipuram",
    state: "Tamil Nadu",
  },
  {
    city: "Karaikudi",
    state: "Tamil Nadu",
  },
  {
    city: "Karungal",
    state: "Tamil Nadu",
  },
  {
    city: "Karur",
    state: "Tamil Nadu",
  },
  {
    city: "Kolankodu",
    state: "Tamil Nadu",
  },
  {
    city: "Lalgudi",
    state: "Tamil Nadu",
  },
  {
    city: "Madurai",
    state: "Tamil Nadu",
  },

  {
    city: "Nagapattinam",
    state: "Tamil Nadu",
  },
  {
    city: "Nagercoil",
    state: "Tamil Nadu",
  },
  {
    city: "Namagiripettai",
    state: "Tamil Nadu",
  },
  {
    city: "Namakkal",
    state: "Tamil Nadu",
  },
  {
    city: "Nandivaram-Guduvancheri",
    state: "Tamil Nadu",
  },
  {
    city: "Nanjikottai",
    state: "Tamil Nadu",
  },
  {
    city: "Natham",
    state: "Tamil Nadu",
  },
  {
    city: "Nellikuppam",
    state: "Tamil Nadu",
  },
  {
    city: "Neyveli",
    state: "Tamil Nadu",
  },
  {
    city: "O Valley",
    state: "Tamil Nadu",
  },
  {
    city: "Oddanchatram",
    state: "Tamil Nadu",
  },
  {
    city: "P.N.Patti",
    state: "Tamil Nadu",
  },
  {
    city: "Pacode",
    state: "Tamil Nadu",
  },
  {
    city: "Padmanabhapuram",
    state: "Tamil Nadu",
  },
  {
    city: "Palani",
    state: "Tamil Nadu",
  },
  {
    city: "Palladam",
    state: "Tamil Nadu",
  },
  {
    city: "Pallapatti",
    state: "Tamil Nadu",
  },
  {
    city: "Pallikonda",
    state: "Tamil Nadu",
  },
  {
    city: "Panagudi",
    state: "Tamil Nadu",
  },
  {
    city: "Panruti",
    state: "Tamil Nadu",
  },
  {
    city: "Paramakudi",
    state: "Tamil Nadu",
  },
  {
    city: "Parangipettai",
    state: "Tamil Nadu",
  },
  {
    city: "Pattukkottai",
    state: "Tamil Nadu",
  },
  {
    city: "Perambalur",
    state: "Tamil Nadu",
  },
  {
    city: "Peravurani",
    state: "Tamil Nadu",
  },
  {
    city: "Periyakulam",
    state: "Tamil Nadu",
  },
  {
    city: "Periyasemur",
    state: "Tamil Nadu",
  },
  {
    city: "Pernampattu",
    state: "Tamil Nadu",
  },
  {
    city: "Pollachi",
    state: "Tamil Nadu",
  },
  {
    city: "Polur",
    state: "Tamil Nadu",
  },
  {
    city: "Ponneri",
    state: "Tamil Nadu",
  },
  {
    city: "Pudukkottai",
    state: "Tamil Nadu",
  },
  {
    city: "Pudupattinam",
    state: "Tamil Nadu",
  },
  {
    city: "Puliyankudi",
    state: "Tamil Nadu",
  },
  {
    city: "Punjaipugalur",
    state: "Tamil Nadu",
  },
  {
    city: "Rajapalayam",
    state: "Tamil Nadu",
  },
  {
    city: "Ramanathapuram",
    state: "Tamil Nadu",
  },
  {
    city: "Rameswaram",
    state: "Tamil Nadu",
  },
  {
    city: "Rasipuram",
    state: "Tamil Nadu",
  },
  {
    city: "Salem",
    state: "Tamil Nadu",
  },
  {
    city: "Sankarankoil",
    state: "Tamil Nadu",
  },
  {
    city: "Sankari",
    state: "Tamil Nadu",
  },
  {
    city: "Sathyamangalam",
    state: "Tamil Nadu",
  },
  {
    city: "Sattur",
    state: "Tamil Nadu",
  },
  {
    city: "Shenkottai",
    state: "Tamil Nadu",
  },
  {
    city: "Sholavandan",
    state: "Tamil Nadu",
  },
  {
    city: "Sholingur",
    state: "Tamil Nadu",
  },
  {
    city: "Sirkali",
    state: "Tamil Nadu",
  },
  {
    city: "Sivaganga",
    state: "Tamil Nadu",
  },
  {
    city: "Sivagiri",
    state: "Tamil Nadu",
  },
  {
    city: "Sivakasi",
    state: "Tamil Nadu",
  },
  {
    city: "Srivilliputhur",
    state: "Tamil Nadu",
  },
  {
    city: "Surandai",
    state: "Tamil Nadu",
  },
  {
    city: "Suriyampalayam",
    state: "Tamil Nadu",
  },
  {
    city: "Tenkasi",
    state: "Tamil Nadu",
  },
  {
    city: "Thammampatti",
    state: "Tamil Nadu",
  },
  {
    city: "Thanjavur",
    state: "Tamil Nadu",
  },
  {
    city: "Tharamangalam",
    state: "Tamil Nadu",
  },
  {
    city: "Tharangambadi",
    state: "Tamil Nadu",
  },
  {
    city: "Theni Allinagaram",
    state: "Tamil Nadu",
  },
  {
    city: "Thirumangalam",
    state: "Tamil Nadu",
  },
  {
    city: "Thirunindravur",
    state: "Tamil Nadu",
  },
  {
    city: "Thiruparappu",
    state: "Tamil Nadu",
  },
  {
    city: "Thirupuvanam",
    state: "Tamil Nadu",
  },
  {
    city: "Thiruthuraipoondi",
    state: "Tamil Nadu",
  },
  {
    city: "Thiruvallur",
    state: "Tamil Nadu",
  },
  {
    city: "Thiruvarur",
    state: "Tamil Nadu",
  },
  {
    city: "Thoothukudi",
    state: "Tamil Nadu",
  },
  {
    city: "Thuraiyur",
    state: "Tamil Nadu",
  },
  {
    city: "Tindivanam",
    state: "Tamil Nadu",
  },
  {
    city: "Tiruchendur",
    state: "Tamil Nadu",
  },
  {
    city: "Tiruchengode",
    state: "Tamil Nadu",
  },
  {
    city: "Tiruchirappalli",
    state: "Tamil Nadu",
  },
  {
    city: "Tirukalukundram",
    state: "Tamil Nadu",
  },
  {
    city: "Tirukkoyilur",
    state: "Tamil Nadu",
  },

  {
    city: "Tirunelveli",
    state: "Tamil Nadu",
  },
  {
    city: "Tirupathur",
    state: "Tamil Nadu",
  },
  {
    city: "Tiruppur",
    state: "Tamil Nadu",
  },
  {
    city: "Tiruttani",
    state: "Tamil Nadu",
  },
  {
    city: "Tiruvannamalai",
    state: "Tamil Nadu",
  },
  {
    city: "Tiruvethipuram",
    state: "Tamil Nadu",
  },
  {
    city: "Tittakudi",
    state: "Tamil Nadu",
  },
  {
    city: "Udhagamandalam",
    state: "Tamil Nadu",
  },
  {
    city: "Udumalaipettai",
    state: "Tamil Nadu",
  },
  {
    city: "Unnamalaikadai",
    state: "Tamil Nadu",
  },
  {
    city: "Usilampatti",
    state: "Tamil Nadu",
  },
  {
    city: "Uthamapalayam",
    state: "Tamil Nadu",
  },
  {
    city: "Uthiramerur",
    state: "Tamil Nadu",
  },
  {
    city: "Vadakkuvalliyur",
    state: "Tamil Nadu",
  },
  {
    city: "Vadalur",
    state: "Tamil Nadu",
  },
  {
    city: "Vadipatti",
    state: "Tamil Nadu",
  },
  {
    city: "Valparai",
    state: "Tamil Nadu",
  },
  {
    city: "Vandavasi",
    state: "Tamil Nadu",
  },
  {
    city: "Vaniyambadi",
    state: "Tamil Nadu",
  },
  {
    city: "Vedaranyam",
    state: "Tamil Nadu",
  },
  {
    city: "Vellakoil",
    state: "Tamil Nadu",
  },
  {
    city: "Vellore",
    state: "Tamil Nadu",
  },
  {
    city: "Vikramasingapuram",
    state: "Tamil Nadu",
  },
  {
    city: "Viluppuram",
    state: "Tamil Nadu",
  },
  {
    city: "Virudhachalam",
    state: "Tamil Nadu",
  },
  {
    city: "Virudhunagar",
    state: "Tamil Nadu",
  },
  {
    city: "Viswanatham",
    state: "Tamil Nadu",
  },
  {
    city: "Agartala",
    state: "Tripura",
  },
  {
    city: "Badharghat",
    state: "Tripura",
  },
  {
    city: "Dharmanagar",
    state: "Tripura",
  },
  {
    city: "Indranagar",
    state: "Tripura",
  },
  {
    city: "Jogendranagar",
    state: "Tripura",
  },
  {
    city: "Kailasahar",
    state: "Tripura",
  },
  {
    city: "Khowai",
    state: "Tripura",
  },
  {
    city: "Pratapgarh",
    state: "Tripura",
  },
  {
    city: "Udaipur",
    state: "Tripura",
  },
  {
    city: "Achhnera",
    state: "Uttar Pradesh",
  },
  {
    city: "Adari",
    state: "Uttar Pradesh",
  },
  {
    city: "Agra",
    state: "Uttar Pradesh",
  },

  {
    city: "Aligarh",
    state: "Uttar Pradesh",
  },
  {
    city: "Allahabad",
    state: "Uttar Pradesh",
  },
  {
    city: "Amroha",
    state: "Uttar Pradesh",
  },
  {
    city: "Azamgarh",
    state: "Uttar Pradesh",
  },
  {
    city: "Bahraich",
    state: "Uttar Pradesh",
  },
  {
    city: "Ballia",
    state: "Uttar Pradesh",
  },
  {
    city: "Balrampur",
    state: "Uttar Pradesh",
  },
  {
    city: "Banda",
    state: "Uttar Pradesh",
  },
  {
    city: "Bareilly",
    state: "Uttar Pradesh",
  },
  {
    city: "Chandausi",
    state: "Uttar Pradesh",
  },
  {
    city: "Dadri",
    state: "Uttar Pradesh",
  },
  {
    city: "Deoria",
    state: "Uttar Pradesh",
  },
  {
    city: "Etawah",
    state: "Uttar Pradesh",
  },
  {
    city: "Fatehabad",
    state: "Uttar Pradesh",
  },
  {
    city: "Fatehpur",
    state: "Uttar Pradesh",
  },
  {
    city: "Greater Noida",
    state: "Uttar Pradesh",
  },
  {
    city: "Hamirpur",
    state: "Uttar Pradesh",
  },
  {
    city: "Hardoi",
    state: "Uttar Pradesh",
  },
  {
    city: "Jajmau",
    state: "Uttar Pradesh",
  },
  {
    city: "Jaunpur",
    state: "Uttar Pradesh",
  },
  {
    city: "Jhansi",
    state: "Uttar Pradesh",
  },
  {
    city: "Kalpi",
    state: "Uttar Pradesh",
  },
  {
    city: "Kanpur",
    state: "Uttar Pradesh",
  },
  {
    city: "Kota",
    state: "Uttar Pradesh",
  },
  {
    city: "Laharpur",
    state: "Uttar Pradesh",
  },
  {
    city: "Lakhimpur",
    state: "Uttar Pradesh",
  },
  {
    city: "Lal Gopalganj Nindaura",
    state: "Uttar Pradesh",
  },
  {
    city: "Lalganj",
    state: "Uttar Pradesh",
  },
  {
    city: "Lalitpur",
    state: "Uttar Pradesh",
  },
  {
    city: "Lar",
    state: "Uttar Pradesh",
  },
  {
    city: "Loni",
    state: "Uttar Pradesh",
  },
  {
    city: "Lucknow",
    state: "Uttar Pradesh",
  },
  {
    city: "Mathura",
    state: "Uttar Pradesh",
  },
  {
    city: "Meerut",
    state: "Uttar Pradesh",
  },
  {
    city: "Modinagar",
    state: "Uttar Pradesh",
  },
  {
    city: "Muradnagar",
    state: "Uttar Pradesh",
  },
  {
    city: "Nagina",
    state: "Uttar Pradesh",
  },
  {
    city: "Najibabad",
    state: "Uttar Pradesh",
  },
  {
    city: "Nakur",
    state: "Uttar Pradesh",
  },
  {
    city: "Nanpara",
    state: "Uttar Pradesh",
  },
  {
    city: "Naraura",
    state: "Uttar Pradesh",
  },
  {
    city: "Naugawan Sadat",
    state: "Uttar Pradesh",
  },
  {
    city: "Nautanwa",
    state: "Uttar Pradesh",
  },

  {
    city: "Nawabganj",
    state: "Uttar Pradesh",
  },
  {
    city: "Nehtaur",
    state: "Uttar Pradesh",
  },
  {
    city: "NOIDA",
    state: "Uttar Pradesh",
  },
  {
    city: "Noorpur",
    state: "Uttar Pradesh",
  },
  {
    city: "Obra",
    state: "Uttar Pradesh",
  },
  {
    city: "Orai",
    state: "Uttar Pradesh",
  },
  {
    city: "Padrauna",
    state: "Uttar Pradesh",
  },
  {
    city: "Palia Kalan",
    state: "Uttar Pradesh",
  },
  {
    city: "Parasi",
    state: "Uttar Pradesh",
  },
  {
    city: "Phulpur",
    state: "Uttar Pradesh",
  },
  {
    city: "Pihani",
    state: "Uttar Pradesh",
  },
  {
    city: "Pilibhit",
    state: "Uttar Pradesh",
  },
  {
    city: "Pilkhuwa",
    state: "Uttar Pradesh",
  },
  {
    city: "Powayan",
    state: "Uttar Pradesh",
  },
  {
    city: "Pukhrayan",
    state: "Uttar Pradesh",
  },
  {
    city: "Puranpur",
    state: "Uttar Pradesh",
  },
  {
    city: "Purquazi",
    state: "Uttar Pradesh",
  },
  {
    city: "Purwa",
    state: "Uttar Pradesh",
  },
  {
    city: "Rae Bareli",
    state: "Uttar Pradesh",
  },
  {
    city: "Rampur",
    state: "Uttar Pradesh",
  },
  {
    city: "Rampur Maniharan",
    state: "Uttar Pradesh",
  },
  {
    city: "Rasra",
    state: "Uttar Pradesh",
  },
  {
    city: "Rath",
    state: "Uttar Pradesh",
  },
  {
    city: "Renukoot",
    state: "Uttar Pradesh",
  },
  {
    city: "Reoti",
    state: "Uttar Pradesh",
  },
  {
    city: "Robertsganj",
    state: "Uttar Pradesh",
  },
  {
    city: "Rudauli",
    state: "Uttar Pradesh",
  },
  {
    city: "Rudrapur",
    state: "Uttar Pradesh",
  },
  {
    city: "Sadabad",
    state: "Uttar Pradesh",
  },
  {
    city: "Safipur",
    state: "Uttar Pradesh",
  },
  {
    city: "Saharanpur",
    state: "Uttar Pradesh",
  },
  {
    city: "Sahaspur",
    state: "Uttar Pradesh",
  },
  {
    city: "Sahaswan",
    state: "Uttar Pradesh",
  },
  {
    city: "Sahawar",
    state: "Uttar Pradesh",
  },
  {
    city: "Sahjanwa",
    state: "Uttar Pradesh",
  },
  {
    city: "Saidpur",
    state: "Ghazipur",
  },
  {
    city: "Sambhal",
    state: "Uttar Pradesh",
  },
  {
    city: "Samdhan",
    state: "Uttar Pradesh",
  },
  {
    city: "Samthar",
    state: "Uttar Pradesh",
  },
  {
    city: "Sandi",
    state: "Uttar Pradesh",
  },
  {
    city: "Sandila",
    state: "Uttar Pradesh",
  },
  {
    city: "Sardhana",
    state: "Uttar Pradesh",
  },
  {
    city: "Seohara",
    state: "Uttar Pradesh",
  },
  {
    city: "Shahabad",
    state: "Hardoi",
  },
  {
    city: "Shahabad",
    state: "Rampur",
  },
  {
    city: "Shahganj",
    state: "Uttar Pradesh",
  },
  {
    city: "Shahjahanpur",
    state: "Uttar Pradesh",
  },
  {
    city: "Shamli",
    state: "Uttar Pradesh",
  },
  {
    city: "Shamsabad",
    state: "Agra",
  },
  {
    city: "Shamsabad",
    state: "Farrukhabad",
  },
  {
    city: "Sherkot",
    state: "Uttar Pradesh",
  },
  {
    city: "Shikarpur",
    state: "Bulandshahr",
  },
  {
    city: "Shikohabad",
    state: "Uttar Pradesh",
  },
  {
    city: "Shishgarh",
    state: "Uttar Pradesh",
  },
  {
    city: "Siana",
    state: "Uttar Pradesh",
  },
  {
    city: "Sikanderpur",
    state: "Uttar Pradesh",
  },
  {
    city: "Sikandra Rao",
    state: "Uttar Pradesh",
  },
  {
    city: "Sikandrabad",
    state: "Uttar Pradesh",
  },
  {
    city: "Sirsaganj",
    state: "Uttar Pradesh",
  },
  {
    city: "Sirsi",
    state: "Uttar Pradesh",
  },

  {
    city: "Sitapur",
    state: "Uttar Pradesh",
  },
  {
    city: "Soron",
    state: "Uttar Pradesh",
  },
  {
    city: "Suar",
    state: "Uttar Pradesh",
  },
  {
    city: "Sultanpur",
    state: "Uttar Pradesh",
  },
  {
    city: "Sumerpur",
    state: "Uttar Pradesh",
  },
  {
    city: "Tanda",
    state: "Uttar Pradesh",
  },
  {
    city: "Tetri Bazar",
    state: "Uttar Pradesh",
  },
  {
    city: "Thakurdwara",
    state: "Uttar Pradesh",
  },
  {
    city: "Thana Bhawan",
    state: "Uttar Pradesh",
  },
  {
    city: "Tilhar",
    state: "Uttar Pradesh",
  },
  {
    city: "Tirwaganj",
    state: "Uttar Pradesh",
  },
  {
    city: "Tulsipur",
    state: "Uttar Pradesh",
  },
  {
    city: "Tundla",
    state: "Uttar Pradesh",
  },
  {
    city: "Unnao",
    state: "Uttar Pradesh",
  },
  {
    city: "Utraula",
    state: "Uttar Pradesh",
  },
  {
    city: "Varanasi",
    state: "Uttar Pradesh",
  },
  {
    city: "Vrindavan",
    state: "Uttar Pradesh",
  },
  {
    city: "Warhapur",
    state: "Uttar Pradesh",
  },
  {
    city: "Zaidpur",
    state: "Uttar Pradesh",
  },
  {
    city: "Zamania",
    state: "Uttar Pradesh",
  },
  {
    city: "Almora",
    state: "Uttarakhand",
  },
  {
    city: "Bazpur",
    state: "Uttarakhand",
  },
  {
    city: "Chamba",
    state: "Uttarakhand",
  },
  {
    city: "Dehradun",
    state: "Uttarakhand",
  },
  {
    city: "Haldwani",
    state: "Uttarakhand",
  },
  {
    city: "Haridwar",
    state: "Uttarakhand",
  },
  {
    city: "Jaspur",
    state: "Uttarakhand",
  },
  {
    city: "Kashipur",
    state: "Uttarakhand",
  },
  {
    city: "Kichha",
    state: "Uttarakhand",
  },
  {
    city: "Kotdwara",
    state: "Uttarakhand",
  },
  {
    city: "Manglaur",
    state: "Uttarakhand",
  },
  {
    city: "Mussoorie",
    state: "Uttarakhand",
  },

  {
    city: "Nagla",
    state: "Uttarakhand",
  },
  {
    city: "Nainital",
    state: "Uttarakhand",
  },
  {
    city: "Pauri",
    state: "Uttarakhand",
  },
  {
    city: "Pithoragarh",
    state: "Uttarakhand",
  },
  {
    city: "Ramnagar",
    state: "Uttarakhand",
  },
  {
    city: "Rishikesh",
    state: "Uttarakhand",
  },
  {
    city: "Roorkee",
    state: "Uttarakhand",
  },
  {
    city: "Rudrapur",
    state: "Uttarakhand",
  },
  {
    city: "Sitarganj",
    state: "Uttarakhand",
  },
  {
    city: "Tehri",
    state: "Uttarakhand",
  },
  {
    city: "Muzaffarnagar",
    state: "Uttar Pradesh",
  },
  {
    city: "Adra",
    state: "Purulia",
  },
  {
    city: "Alipurduar",
    state: "West Bengal",
  },
  {
    city: "Arambagh",
    state: "West Bengal",
  },
  {
    city: "Asansol",
    state: "West Bengal",
  },
  {
    city: "Baharampur",
    state: "West Bengal",
  },
  {
    city: "Bally",
    state: "West Bengal",
  },
  {
    city: "Balurghat",
    state: "West Bengal",
  },
  {
    city: "Bankura",
    state: "West Bengal",
  },
  {
    city: "Barakar",
    state: "West Bengal",
  },
  {
    city: "Barasat",
    state: "West Bengal",
  },
  {
    city: "Bardhaman",
    state: "West Bengal",
  },
  {
    city: "Bidhannagar",
    state: "West Bengal",
  },
  {
    city: "Chinsurah",
    state: "West Bengal",
  },
  {
    city: "Contai",
    state: "West Bengal",
  },
  {
    city: "Cooch Behar",
    state: "West Bengal",
  },
  {
    city: "Darjeeling",
    state: "West Bengal",
  },
  {
    city: "Durgapur",
    state: "West Bengal",
  },
  {
    city: "Haldia",
    state: "West Bengal",
  },
  {
    city: "Howrah",
    state: "West Bengal",
  },
  {
    city: "Islampur",
    state: "West Bengal",
  },
  {
    city: "Jhargram",
    state: "West Bengal",
  },
  {
    city: "Kharagpur",
    state: "West Bengal",
  },
  {
    city: "Kolkata",
    state: "West Bengal",
  },
  {
    city: "Mainaguri",
    state: "West Bengal",
  },
  {
    city: "Mal",
    state: "West Bengal",
  },
  {
    city: "Mathabhanga",
    state: "West Bengal",
  },
  {
    city: "Medinipur",
    state: "West Bengal",
  },
  {
    city: "Memari",
    state: "West Bengal",
  },
  {
    city: "Monoharpur",
    state: "West Bengal",
  },
  {
    city: "Murshidabad",
    state: "West Bengal",
  },
  {
    city: "Nabadwip",
    state: "West Bengal",
  },
  {
    city: "Naihati",
    state: "West Bengal",
  },
  {
    city: "Panchla",
    state: "West Bengal",
  },
  {
    city: "Pandua",
    state: "West Bengal",
  },
  {
    city: "Paschim Bardhaman",
    state: "West Bengal",
  },
  {
    city: "Purulia",
    state: "West Bengal",
  },
  {
    city: "Raghunathpur",
    state: "West Bengal",
  },
  {
    city: "Raiganj",
    state: "West Bengal",
  },
  {
    city: "Rampurhat",
    state: "West Bengal",
  },
  {
    city: "Ranaghat",
    state: "West Bengal",
  },
  {
    city: "Sainthia",
    state: "West Bengal",
  },
  {
    city: "Santipur",
    state: "West Bengal",
  },
  {
    city: "Siliguri",
    state: "West Bengal",
  },
  {
    city: "Sonamukhi",
    state: "West Bengal",
  },
  {
    city: "Srirampore",
    state: "West Bengal",
  },
  {
    city: "Suri",
    state: "West Bengal",
  },
  {
    city: "Taki",
    state: "West Bengal",
  },
  {
    city: "Tamluk",
    state: "West Bengal",
  },
  {
    city: "Tarakeswar",
    state: "West Bengal",
  },
  {
    city: "Chikmagalur",
    state: "Karnataka",
  },
  {
    city: "Davanagere",
    state: "Karnataka",
  },
  {
    city: "Dharwad",
    state: "Karnataka",
  },
  {
    city: "Gadag",
    state: "Karnataka",
  },
  {
    city: "Chennai",
    state: "Tamil Nadu",
  },
];
