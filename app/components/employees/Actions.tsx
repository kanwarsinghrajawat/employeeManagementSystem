import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Employee } from "./";
import { BsThreeDotsVertical } from "react-icons/bs";

import {
  deleteEmployee,
  employeeIdUpdate,
  setmodalHandler,
} from "@/app/redux/slices/employeeSlice";
type Props = {
  employee: Employee;
};

const Actions: React.FC<Props> = ({ employee }) => {
  const [showActions, setShowActions] = useState(false);

  const dispatch = useDispatch();
  return (
    <div className="absolute">
      <BsThreeDotsVertical
        className="cursor-pointer"
        size={20}
        onClick={() => {
          setShowActions((prevShowActions) => !prevShowActions);
        }}
      />

      {showActions && (
        <div className="bg-gray-800 p-2 rounded-lg shadow-lg flex flex-col gap-1 absolute top-[-20px] left-6 justify-center items-center transform transition-all duration-300 ease-in-out hover:scale-105">
          <button
            onClick={() => {
              dispatch(setmodalHandler(true));
              dispatch(employeeIdUpdate(employee.id));
              setShowActions(false);
            }}
            className="text-white hover:bg-gray-700 p-1 rounded-md transition-colors duration-300 w-full text-left"
          >
            Edit
          </button>
          <button
            onClick={() => {
              dispatch(deleteEmployee(employee.id));
              setShowActions(false);
            }}
            className="text-white hover:bg-red-700 p-1 rounded-md transition-colors duration-300 w-full"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Actions;
