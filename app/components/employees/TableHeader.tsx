"use client";
import React from "react";
import Form from "./Form";
import { Dialog } from "@headlessui/react";
import Search from "../Search";
import { useSelector } from "react-redux";
import { MdOutlineAddCircle } from "react-icons/md";
import { useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { setmodalHandler } from "../../redux/slices/employeeSlice";

const TableHeader = () => {
  const employees = useSelector((state: RootState) => state.data);
  const modalIsOpen = employees?.handleModal;
  const dispatch = useDispatch();
  return (
    <div>
      <Search />

      <Dialog
        open={modalIsOpen}
        onClose={() => dispatch(setmodalHandler(false))}
        className="relative z-50"
      >
        <Form />
      </Dialog>
    </div>
  );
};

export default TableHeader;
