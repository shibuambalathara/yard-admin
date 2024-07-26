import React, { useEffect, useState } from 'react';
import { buttonStyle, inputStyle } from '../ui/style';

const Pagination = (props) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const totalPageCount = Math.ceil(props.totalDataCount / props.limit);
    setTotalPages(totalPageCount);
  }, [props.totalDataCount, props.limit]);

  const handlePagination = (value) => {
    const convertedValue = parseInt(value, 10);
    if (convertedValue > 0 && convertedValue <= totalPages) {
      props.setPage(convertedValue);
    }
  };

  const handleLastPage = () => {
    if (props.totalDataCount % props.limit === 0) {
      props.setPage(props.totalDataCount / props.limit);
    } else {
      props.setPage(Math.floor(props.totalDataCount / props.limit) + 1);
    }
  };

  return (
    <>
      <div className="my-4 grid grid-cols-2 gap-y-4 sm:grid-cols-4 gap-x-4 sm:gap-y-0 sm:px-20 px-6 text-xs sm:text-base">
        <button
          className={`${buttonStyle.data} ${
            props.page === 1 ? 'bg-stone-100 text-black' : 'bg-gray-700'
          }`}
          onClick={() => props.setPage(1)}
        >
          First page
        </button>
        <button
          disabled={props.page < 2}
          onClick={() => props.setPage(props.page - 1)}
          className={`${buttonStyle.data} ${
            props.page < 2 ? 'bg-stone-100 text-black' : 'bg-gray-700'
          }`}
        >
          Previous page
        </button>
        <button
          disabled={props.page >= totalPages}
          onClick={() => props.setPage(props.page + 1)}
          className={`${buttonStyle.data} ${
            props.page >= totalPages ? 'bg-gray-100 text-black' : 'bg-gray-700'
          }`}
        >
          Next page
        </button>
        <button
          className={`${buttonStyle.data} ${
            props.page >= totalPages ? 'bg-gray-100 text-black' : 'bg-gray-700'
          }`}
          disabled={props.page >= totalPages}
          onClick={handleLastPage}
        >
          Last page
        </button>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-around gap-y-2 sm:gap-y-0 sm:gap-x-4 text-sm  sm:px-20">
        <div className="text-gray-700">
          <span>{props.page} Out of </span>
          <span>{totalPages} pages</span>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span className="text-gray-700">Go to</span>
          <input
            type="text"
            className={`${inputStyle.data} w-full sm:w-48`}
            onChange={(e) => handlePagination(e.target.value)}
            placeholder="Enter Page Number"
          />
        </div>
      </div>
    </>
  );
};

export default Pagination;
