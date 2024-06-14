import { useState, useEffect } from "react";
import { VscChromeClose } from "react-icons/vsc";
import { FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setSearchString } from "../redux/slices/employeeSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const employees = useSelector((state: RootState) => state.data);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setSearchString(searchTerm));
      console.log(searchTerm);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [dispatch, searchTerm]);

  const handleInputChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative w-full md:w-2/5 lg:w-80 p-2 border border-gray-300 cursor-pointer rounded-md">
      <div className="flex items-center gap-2">
        <FiSearch />
        <input
          type="text"
          placeholder="Search"
          className="w-full pr-10 outline-none"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
      {searchTerm !== "" && (
        <button
          onClick={() => {
            dispatch(setSearchString(""));
            setSearchTerm("");
          }}
          className="absolute inset-y-0 right-0 flex items-center px-3 bg-transparent border-0"
        >
          <VscChromeClose size={18} />
        </button>
      )}
    </div>
  );
};

export default Search;
