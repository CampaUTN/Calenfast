import React from "react";
import {
  SortAscendingIcon,
  SearchIcon,
  UsersIcon,
} from "@heroicons/react/solid";

interface InputProps {
  buttonEnabled: boolean;
  handleButtonClicked: any;
}

export default function Input(props: InputProps) {
  function submitResults(event: any) {
    event.preventDefault();
    let inputValue = event.target.participants.value;
    let participants = inputValue.split(", ");
    props.handleButtonClicked(participants);
  }

  return (
    <div className="items-center flex justify-center mt-5">
      <div className="w-1/2">
        <h1 className="text-2xl mb-3 font-bold leading-tight text-gray-900">
          Meeting With...
        </h1>
        <div className="mt-1 flex rounded-md shadow-sm">
          <form className="contents" onSubmit={submitResults}>
            <div className="relative flex items-stretch flex-grow focus-within:z-10">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UsersIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                name="participants"
                id="email"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
                placeholder="fmoreno@kovix-group.com, rodrigo@kovix-group.com..."
              />
            </div>
            <button
              disabled={!props.buttonEnabled}
              type="submit"
              style={!props.buttonEnabled ? { backgroundColor: "gray" } : {}}
              className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <SearchIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span>Find Best Time</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
