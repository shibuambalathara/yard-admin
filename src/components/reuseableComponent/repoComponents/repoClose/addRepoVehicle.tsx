"use client"

import AddIndividualVehicle from '@/components/reuseableComponent/repoComponents/addIndividualVehicle'
import AddMultipleVehicle from '@/components/reuseableComponent/repoComponents/addMultipleVehicle'
import { Tab } from '@headlessui/react'
import React from 'react'

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

const AddRepoVehicles = () => {
  return (
    <div className=' bg-gray-100 min-h-screen'>
      <h1 className="text-center text-2xl font-bold py-4 uppercase text-black">
        Add Repo Vehicles
      </h1>
      <div className="max-w-5xl mx-auto bg-white rounded-t-md shadow-lg">
        <Tab.Group>
          <Tab.List className="flex p-1 space-x-1 bg-gray-200 rounded-t-md">
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-sm leading-5 font-medium text-gray-700 rounded-t-md",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-black",
                  selected ? "bg-white shadow text-black" : "hover:bg-white/[0.12] hover:text-black"
                )
              }
            >
              Single Vehicle Upload
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-sm leading-5 font-medium text-gray-700 rounded-t-md",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-black",
                  selected ? "bg-white shadow text-black" : "hover:bg-white/[0.12] hover:text-black"
                )
              }
            >
              Multiple Vehicle Upload
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2 p-4">
            <Tab.Panel>
              <AddIndividualVehicle  />
            </Tab.Panel>
            <Tab.Panel>
              <AddMultipleVehicle />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

export default AddRepoVehicles
