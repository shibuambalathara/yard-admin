"use client"

import { useState } from "react";
import Link from 'next/link';

const dataList = [
  {
    id: 1,
    label: "List 1",
    data: ["Data1-1", "Data1-2", "Data1-3", "Data1-4", "Data1-5", "Data1-6", "Data1-7", "Data1-8", "Data1-9", "Data1-10"],
    link: "/path-to-file1", // Path to another file in your Next.js app or external URL
  },
  {
    id: 2,
    label: "List 2",
    data: ["Data2-1", "Data2-2", "Data2-3", "Data2-4", "Data2-5", "Data2-6", "Data2-7", "Data2-8", "Data2-9", "Data2-10"],
    link: "/path-to-file2",
  },
  {
    id: 3,
    label: "List 3",
    data: ["Data3-1", "Data3-2", "Data3-3", "Data3-4", "Data3-5", "Data3-6", "Data3-7", "Data3-8", "Data3-9", "Data3-10"],
    link: "/path-to-file3",
  },
  // Add more data objects here (up to 10), each with a link
];

export default function Home() {
  const [selectedLists, setSelectedLists] = useState([]);

  const handleCheckboxChange = (id) => {
    if (selectedLists.includes(id)) {
      setSelectedLists(selectedLists.filter((listId) => listId !== id));
    } else {
      setSelectedLists([...selectedLists, id]);
    }
  };

  const handleSubmit = () => {
    const selectedData = dataList.filter((list) => selectedLists.includes(list.id));
    // console.log("Submitted Data:", selectedData);
    // Perform further operations such as sending data to a server or processing data.
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Data List</h1>
      <div className="space-y-4">
        {dataList.map((list) => (
          <div key={list.id} className="flex items-center border p-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedLists.includes(list.id)}
                onChange={() => handleCheckboxChange(list.id)}
                className="mr-2"
              />
              <span className="mr-2">{list.label}</span>
            </label>
            <div className="flex space-x-4">
              {list.data.map((data, idx) => (
                <span key={idx} className="border-r pr-2 last:border-r-0">
                  {data}
                </span>
              ))}
            </div>
            {/* Include Link component from Next.js */}
            <Link href={list.link}>
              Open File
            </Link>
          </div>
        ))}
      </div>
      <button
        className="mt-4 bg-blue-500 text-white p-2 rounded"
        onClick={handleSubmit}
      >
        Submit Selected Lists
      </button>
    </div>
  );
}
