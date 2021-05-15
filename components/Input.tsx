import React from "react";

export default function Input() {
  return (
    <div className="items-center flex justify-center mt-5">    
        <input
          type="text"
          name="email"
          id="email"
          className="shadow-xl focus:ring-indigo-500 focus:border-indigo-500 block w-1/2 sm:text-sm border-gray-800 border-solid-500 rounded p-5"
          placeholder="fmoreno@kovix-group.com"
        />
   
    </div>
  );
}
