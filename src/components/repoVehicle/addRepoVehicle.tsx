"use client"

import AddIndividualVehicle from '@/components/reuseableComponent/repoComponents/addIndividualVehicle'
import AddMultipleVehicle from '@/components/reuseableComponent/repoComponents/addMultipleVehicle'
import { Tab } from '@headlessui/react'
import React from 'react'

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

const AddRepoVehicles: React.FC = () => {
  return (
    <div className='p-20 '>
    <Tab.Group className={`bg-white rounded-xl shadow-lg `}>
      <Tab.List className="grid grid-flow-col text-center  border-2 rounded-lg border-gray-200 text-gray-500">
        <Tab
          className={({ selected }) =>
            classNames(
              "flex justify-center border-b-4  border-transparent  py-4",
              "ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2",
              selected ? " text-indigo-600 border-b-indigo-600 border-2" : "bg-white text-black"
            )
          }
        >
          Single Vehicle Upload
        </Tab>
        <Tab
          className={({ selected }) =>
            classNames(
                "flex justify-center border-b-4 border-transparent  py-4",
                "ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2",
                selected ? " text-indigo-600 border-indigo-600" : "bg-white text-black"
              )
          }
        >
          Multiple  Vehicle Upload
        </Tab>
      </Tab.List>

      <Tab.Panels className="mt-2">
        <Tab.Panel>
          <AddIndividualVehicle />
        </Tab.Panel>

        <Tab.Panel>
          <AddMultipleVehicle/>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
    </div>
  )
}

export default AddRepoVehicles
