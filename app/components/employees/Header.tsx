"use client";

import { useDispatch } from "react-redux";
import { setmodalHandler } from "@/app/redux/slices/employeeSlice";
import { MdOutlineAddCircle } from "react-icons/md";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex justify-between">
        <p className="text-black text-2xl font-bold">Employees </p>
        <div className="flex justify-center ">
          <button
            onClick={() => {
              dispatch(setmodalHandler(true));
            }}
            className="bg-[#EB5017] text-white flex items-center gap-2 rounded-md p-3 hover:bg-[#d04915] transition-colors duration-300"
          >
            <MdOutlineAddCircle size={20} />
            Add More Records
          </button>
        </div>
      </div>
    </>
  );
};
export default Header;
