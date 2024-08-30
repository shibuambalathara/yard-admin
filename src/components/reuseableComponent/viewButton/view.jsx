import Link from "next/link";
import { MdOutlineViewHeadline } from "react-icons/md";

const ClickableDiv = ({ path, id }) => {
  console.log("path", path);
  console.log("id=", id);

  return (
    <Link href={`/${path}/${id}`} target="_blank" rel="noopener noreferrer">
      <div
        className={`flex items-center py-1 px-3 space-x-1 bg-gray-700 text-white rounded-md cursor-pointer`}
      >
        <p>
          <MdOutlineViewHeadline />
        </p>
        <p>View</p>
      </div>
    </Link>
  );
};

export default ClickableDiv;

// const View = ({ row }) => {
//     console.log("row", row);
  
//     const id = row?.original?.id;
//     console.log("id from all ", id);
  
//     let path = "/userManagement";
//     return <ClickableDiv path={path} id={id} />;
//   };
  
