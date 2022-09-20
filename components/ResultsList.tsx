import * as React from "react";
/* This example requires Tailwind CSS v2.0+ */
import { CalendarIcon, ChevronRightIcon } from "@heroicons/react/solid";
import Input from "../components/Input";

function createEvent(position: any, users: any) {
  console.log(position);
  //const calURL = `https://calendar.google.com/calendar/u/0/r/eventedit`;
  //calendar.google.com/calendar/u/0/r/eventedit?text=B.B.+King&dates=20090522T193000/20090524T003000&details&sprop=website:www.mountainwinery.com&location=The+Mountain+Winery,+14831+Pierce+Road,+Saratoga,+CA+95070&sf=true
  https: users = users.join("&add=");
  const fromDate = new Date(position.start).toISOString();
  const toDate = new Date(position.end).toISOString();
  const calURL = `https://calendar.google.com/calendar/u/0/r/eventedit?text=Setup+Title&dates=${fromDate
    .split("-")
    .join("")
    .split(":")
    .join("")
    .split(".")
    .join("")}/${toDate
    .split("-")
    .join("")
    .split(":")
    .join("")
    .split(".")
    .join("")}&add=${users}&details=Event+created+with+CalenFast...`;
  window.open(calURL);
  // date2.split('-').join('').split(':').join('').split('.').join('')
}

const ResultsList = ({ positions, users }: any) => (
  <div className="max-w-7xl w-1/2 mx-auto mt-8 px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto">
      {positions && (
        <h1 className="text-2xl mb-3 font-bold leading-tight text-gray-900">
          Possible Time Slots
        </h1>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {positions?.map((position: any) => (
            <li key={position.id}>
              <a href="#" className="block hover:bg-gray-50">
                <div className="px-4 py-4 flex items-center sm:px-6">
                  <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                    <div className="truncate">
                      <div className="mt-2 flex">
                        <div className="flex items-center text-sm text-gray-500">
                          <CalendarIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <p className="d-block">
                            On {new Date(position.start).toLocaleDateString()}{" "}
                            From{" "}
                            <b>
                              {new Date(position.start).toLocaleTimeString()} to{" "}
                            </b>
                            To{" "}
                            <b>{new Date(position.end).toLocaleTimeString()}</b>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-5 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => createEvent(position, users)}
                      className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Create
                    </button>
                    {/*                     <ChevronRightIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    /> */}
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default ResultsList;
