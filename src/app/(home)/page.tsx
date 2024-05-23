

import Header from "@/components/header/header";
import signup from "../(auth)/register/page";
import AddVehicleComponent from "./(yardManager)/vehicle/addvehicle/page";
import SideBar from "../../components/sidebar/sidebar";
import ReactTable from "./table/page";
import AddVehicle from "./(yardManager)/vehicle/addvehicle/page";
import Login from "../(auth)/login/page";
import { cookies } from 'next/headers'
import Link from "next/link";
import React from 'react';

const Home = () => {
  return (
    <div className="p-6 bg-gradient-to-r  to-blue-500 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-green-500">
          <h2 className="text-2xl font-semibold mb-2 text-green-700">Sales Statistics</h2>
          <p className="text-gray-600">Total Sales: <span className="text-green-500">$10,000</span></p>
          <p className="text-gray-600">Monthly Sales: <span className="text-green-500">$2,500</span></p>
          <p className="text-gray-600">Daily Sales: <span className="text-green-500">$150</span></p>
        </div>
        
        {/* Card 2 */}
        <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-500">
          <h2 className="text-2xl font-semibold mb-2 text-blue-700">Recent Activities</h2>
          <ul className="text-gray-600">
            <li>Order #12345 placed by <span className="text-blue-500">John Doe</span></li>
            <li>Payment received from <span className="text-blue-500">Jane Smith</span></li>
            <li>Product #56789 shipped to <span className="text-blue-500">David Johnson</span></li>
          </ul>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-red-500">
          <h2 className="text-2xl font-semibold mb-2 text-red-700">Top Products</h2>
          <ul className="text-gray-600">
            <li>Product A - <span className="text-red-500">200 sales</span></li>
            <li>Product B - <span className="text-red-500">150 sales</span></li>
            <li>Product C - <span className="text-red-500">100 sales</span></li>
          </ul>
        </div>

        {/* Card 4 */}
        <div className="bg-white shadow-lg rounded-lg p-6 col-span-1 md:col-span-2 border-l-4 border-purple-500">
          <h2 className="text-2xl font-semibold mb-2 text-purple-700">Monthly Revenue</h2>
          <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-40 rounded-lg flex items-center justify-center text-white">
            {/* Placeholder for a chart */}
            Chart Placeholder
          </div>
        </div>

        {/* Card 5 */}
        <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-yellow-500">
          <h2 className="text-2xl font-semibold mb-2 text-yellow-700">Notifications</h2>
          <ul className="text-gray-600">
            <li>New order received</li>
            <li>Stock running low on <span className="text-yellow-500">Product B</span></li>
            <li>System maintenance scheduled</li>
          </ul>
        </div>

        {/* Card 6 */}
        <div className="bg-white shadow-lg rounded-lg p-6 col-span-1 md:col-span-2 lg:col-span-3 border-l-4 border-teal-500">
          <h2 className="text-2xl font-semibold mb-2 text-teal-700">Task List</h2>
          <ul className="text-gray-600">
            <li>Update product descriptions</li>
            <li>Review monthly sales report</li>
            <li>Plan marketing campaign</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;

