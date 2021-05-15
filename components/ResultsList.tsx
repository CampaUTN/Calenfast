import * as React from 'react'
/* This example requires Tailwind CSS v2.0+ */
import { CalendarIcon, ChevronRightIcon } from '@heroicons/react/solid'
import Input from '../components/Input'

const ResultsList = ({ positions }: any) => (
<div className="max-w-7xl w-1/2 mx-auto mt-8 px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto">
    <h1 className="text-2xl mb-3 font-bold leading-tight text-gray-900">Possible Time Slots</h1>
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {positions.map((position:any) => (
          <li key={position.id}>
            <a href="#" className="block hover:bg-gray-50">
              <div className="px-4 py-4 flex items-center sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div className="truncate">
                    <div className="mt-2 flex">
                      <div className="flex items-center text-sm text-gray-500">
                        <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <p className='d-block'>
                        {position.date} at <b>{position.time}</b>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-5 flex-shrink-0">
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
    </div>
    </div>
)

export default ResultsList
