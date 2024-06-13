"use client";
import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch } from "react-redux";
import Actions from "./Actions";
import {
  deleteEmployee,
  handleFilteredEmployee,
  setmodalHandler,
} from "@/app/redux/slices/employeeSlice";

export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other",
}

export enum Role {
  ADMIN = "Admin",
  USER = "User",
  GUEST = "Guest",
}
const roleColors = {
  [Role.ADMIN]:
    "text-[#C48AB8] bg-[#E4BADB]/40 px-3 py-1 rounded-lg w-24 text-center text-sm",
  [Role.USER]:
    "text-[#82A9A2] bg-[#BAE4DA]/40 px-3 py-1 rounded-lg w-24 text-center",
  [Role.GUEST]:
    "text-[#FFC4B2] bg-[#FFEDE6]/40 px-3 py-1 rounded-lg w-24 text-center",
};
export type Employee = {
  id: number;
  name: string;
  age: string;
  role: Role;
  dob: string;
  gender: Gender;
  tnc?: boolean;
};

const columnHelpers = createColumnHelper<Employee>();

const Employees = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  // const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const employees = useSelector((state: RootState) => state.data);
  const searchKey: string = employees.searchString;
  const employeeFilteredData = employees.filteredEmployee;
  const data: Employee[] = employees.employees;

  console.log(employees);
  const employeesDetailData = searchKey !== "" ? employeeFilteredData : data;

  useEffect(() => {
    if (searchKey !== "") {
      const filteredData = data.filter(
        (item) =>
          item?.name?.toLowerCase()?.includes(searchKey?.toLowerCase()) ||
          item?.role?.toLowerCase()?.includes(searchKey?.toLowerCase())
      );
      console.log(filteredData);

      dispatch(handleFilteredEmployee(filteredData));
    }
  }, [searchKey]);

  // const pageSize = 10;

  // const startIndex = page * pageSize;
  // const endIndex = startIndex + pageSize;
  // const slicedData = data.slice(startIndex, endIndex);

  const columns = useMemo(
    () => [
      columnHelpers.accessor("id", {
        header: "Employee Id",
        cell: (info) => <div>{info.getValue()}</div>,
      }),
      columnHelpers.accessor("name", {
        header: "Name",
        cell: (info) => <div>{info.getValue()}</div>,
      }),
      columnHelpers.accessor("age", {
        header: "Age",
        cell: (info) => <div>{info.getValue()}</div>,
      }),
      columnHelpers.accessor("role", {
        header: "Role",
        cell: (info) => (
          <div
            className={`${roleColors[`${info?.row?.original?.role as Role}`]}`}
          >
            {info.getValue()}
          </div>
        ),
      }),
      columnHelpers.accessor("dob", {
        header: "DOB",
        cell: (info) => <div>{info.getValue()}</div>,
      }),
      columnHelpers.accessor("gender", {
        header: "Gender",
        cell: (info) => <div>{info.getValue()}</div>,
      }),
      columnHelpers.display({
        id: "Actions",
        header: "Actions",
        cell: (info) => (
          <div className="relative">
            <Actions employee={info?.row?.original} />
          </div>
        ),
        enableSorting: false,
      }),
    ],
    []
  );

  const table = useReactTable({
    columns,
    data: employeesDetailData,
    // data: slicedData,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <div className="h-[calc(100vh-19rem)] overflow-auto">
        {/* <div className="h-screen sm:h-auto sm:min-h-0 sm:flex-grow overflow-scroll"> */}

        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-300">
          <thead>
            {table.getHeaderGroups().map((headerGroup, index) => (
              <tr
                key={index}
                className="bg-[#e5f3ff] border-b border-slate-400 sticky top-0 z-10"
              >
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-6 py-3 text-start text-md font-medium text-gray-700  uppercase whitespace-nowrap"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : ""
                        }
                        onClick={header.column.getToggleSortingHandler()}
                        title={
                          header.column.getCanSort()
                            ? header.column.getNextSortingOrder() === "asc"
                              ? "Sort ascending"
                              : header.column.getNextSortingOrder() === "desc"
                              ? "Sort descending"
                              : "Clear sort"
                            : undefined
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-neutral-300">
            {table.getRowModel().rows.map((row, index) => (
              <tr key={index}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 "
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* <div className="flex items-center justify-center mt-4 space-x-4">
        <button
          className={`px-4 py-2 rounded-lg bg-blue-500 text-white ${
            page === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
        >
          Previous Page
        </button>
        <button
          className={`px-4 py-2 rounded-lg bg-blue-500 text-white ${
            endIndex >= data.length
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-600"
          }`}
          onClick={() => setPage(page + 1)}
          disabled={endIndex >= data.length}
        >
          Next Page
        </button>
        <span className="text-gray-600">
          Total Pages: {Math.ceil(data.length / pageSize)}
        </span>
      </div> */}
      </div>
      <div className="flex items-center justify-center mt-4 space-x-4">
        <button
          className={`px-4 py-2 rounded-lg bg-blue-500 text-white ${
            0 === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          Previous Page
        </button>
        <button
          className={`px-4 py-2 rounded-lg bg-blue-500 text-white ${
            0 >= data.length
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-600"
          }`}
        >
          Next Page
        </button>
        <span className="text-gray-600">
          Total Pages: {Math.ceil(data.length)}
        </span>
      </div>
    </>
  );
};

export default Employees;