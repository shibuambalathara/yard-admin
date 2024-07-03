import React, { useEffect, useState } from "react";
import { buttonStyle,inputStyle } from "../ui/style";

const Pagination = (props) => {
  const [pageValue, setPageValue] = useState(false);
  const [totalPages, setTotalPage] = useState();
  const [value, setValue] = useState();

  console.log("props", props);

  useEffect(() => {
    let totalPage = Math.ceil(props?.totalDataCount / props?.limit);
    setTotalPage(totalPage);
  }, [totalPages,props]);

  console.log("pages and total apage",props?.page, totalPages);

  const handlePagination = (value) => { 
    let convertedValue=parseInt(value)
    // console.log("value pf page form pagination", value);
    convertedValue > 0 && props?.setPage(convertedValue);
  };

  // console.log("page", props?.page);
  const handleLastPage = () => {
    console.log(
      "props?.totalDataCount",
      props?.totalDataCount,
      "props?.limi",
      props?.limit
    );
    if (props?.totalDataCount % props?.limit === 0) {
      console.log("reached at rem 0");
      props?.setPage(props?.totalDataCount / props?.limit);
    } else if (props?.totalDataCount % props?.limit > 0) {
      console.log("reached at reminder ");
      props?.setPage(Math.floor(props?.totalDataCount / props?.limit + 1));

    }
  };

  return (
    <>
    {/* { 
    props?.totalDataCount > props?.limit  && (  */}
      
      <div className="space-x-10 my-4 flex  justify-between items-center">
      <div className="w-full  space-x-4">
        <button
          className={`${buttonStyle.data}  ${
            props?.page === 1 ? "bg-stone-100 text-black" : " bg-gray-700"
          }`}
          onClick={() => props?.setPage(1)}
        >
          First page
        </button>
        <button
          disabled={props?.page < 2 ? true : false}
          onClick={() => props?.setPage(props?.page - 1)}
          className={`${buttonStyle.data}  ${
            props?.page < 2 ? "bg-stone-100 text-black" : " bg-gray-700"
          }`}
        >
          Previous page
        </button>
        <button
          
          disabled={props?.page >= totalPages && true}
          onClick={() => props?.setPage(props?.page + 1)}
          className={`${buttonStyle.data}  ${
            props?.page >= totalPages
              ? "bg-gray-100 text-black "
              : " bg-gray-700"
          }`}
        >
          Next page {}
        </button>
        <button 
          className={`${buttonStyle.data}  ${
            props?.page >= totalPages
              ? "bg-gray-100 text-black "
              : " bg-gray-700"
          }`}
          disabled={props?.page >= totalPages && true}
         onClick={handleLastPage}>last page</button>

      </div>
      <div className="flex w-full  justify-evenly">
        <div  className="">
          {" "}
          <span>{props?.page} out of</span> <span>{totalPages} page</span>
        </div>
        <div className="  space-x-4">
        <span> Go to</span>
          <input
            type="text"
            // className="border border-black w-40 placeholder:px-2"
            className={` w-48  text-gray-600 focus:outline-none focus:border font-normal  py-1 px-4  text-sm border-gray-300 rounded border`}
            onChange={(e) => handlePagination(e.target.value)}
            placeholder="Enter Page Number"
          />
          
        </div>
      </div>
    </div>
  {/* )} */}
    </>
  );
};

export default Pagination;
