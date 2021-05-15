/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

const people = [
  { id: 1, name: "15m", value: `${15 * 60}` },
  { id: 2, name: "30m", value: `${30 * 60}` },
  { id: 3, name: "45m", value: `${45 * 60}` },
  { id: 4, name: "1h", value: `${60 * 60}` },
  { id: 5, name: "1.5h", value: `${90 * 60}` },
  { id: 6, name: "2h", value: `${120 * 60}` },
  { id: 6, name: "2.5h", value: `${150 * 60}` },
  { id: 6, name: "3h", value: `${180 * 60}` },
  { id: 6, name: "3.5h", value: `${210 * 60}` },
  { id: 6, name: "4h", value: `${240 * 60}` },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

interface InputProps {
  handleDurationChange: any;
}

const MeetDurationSelect = (props: InputProps) => {
  const [selected, setSelected] = useState(people[3]);

  function handleChange(value: any) {
    setSelected(value);
    props.handleDurationChange(value);
  }

  return (
    <div className="max-w-7xl w-1/2 mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <Listbox value={selected} onChange={handleChange}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium text-gray-700">
              Duration
            </Listbox.Label>
            <div className="mt-1 relative">
              <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span className="block truncate">{selected.name}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  static
                  className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                >
                  {people.map((person) => (
                    <Listbox.Option
                      key={person.id}
                      className={({ active }) =>
                        classNames(
                          active ? "text-white bg-indigo-600" : "text-gray-900",
                          "cursor-default select-none relative py-2 pl-3 pr-9"
                        )
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "block truncate"
                            )}
                          >
                            {person.name}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default MeetDurationSelect;
