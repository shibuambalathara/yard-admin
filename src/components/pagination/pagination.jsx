import React from 'react'
import { buttonStyle } from "../ui/style";

const Pagination = (props) => {
  return (
    <div className="space-x-10 my-4 flex  justify-between items-center">
    <div className="w-full  space-x-4">
      <button
        className={`${buttonStyle.data}  ${
            props?.page===1
            ? "bg-stone-100 text-black"
            : " bg-gray-700"
        }`}
        onClick={() => props?.setPage(1)}
      >
        First page
      </button>
      <button
        // disabled={!table.getCanPreviousPage()}
        onClick={() => props?.setPage(props?.page-1)}
        className={`${buttonStyle.data}  ${
          props?.page<2
            ? "bg-stone-100 text-black"
            : " bg-gray-700"
        }`}
      >
        Previous page
      </button>
      <button
        disabled={props?.totalDataCount/(props?.page*10)===1}
        onClick={() => props?.setPage(props?.page+1)}
        className={`${buttonStyle.data}  ${
          props?.totalDataCount/(props?.page*10)===1
            ? "bg-gray-100 text-black "
          :
             " bg-gray-700"
        }`}
      >
        Next page {}
      </button>
      <button
        className={`${buttonStyle.data}  ${
          // count%10!=0?(count/10)+1:count/10 ? "bg-stone-100 " : 
          " bg-gray-700"
        }`}
        onClick={() =>props?.setPage( props?.totalDataCount%10!=0?(props?.totalDataCount/10)+1:props?.totalDataCount/10)}
        // disabled={}
      >
        Last page
      </button>
    </div>
    {/* <div className="flex  w-full justify-between">
      <span className="flex items-center gap-1 border px-2 py-1">
        <div>Page</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount().toLocaleString()}
        </strong>
      </span>
      <span className="flex items-center gap-1">
        Go to page:
        <input
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            setPage(e.target.value)
          }}
          className="border p-1 rounded w-16"
        />
      </span>
      <select
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div> */}
  </div>
  )
}

export default Pagination