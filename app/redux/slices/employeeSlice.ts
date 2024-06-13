import { Employee } from "@/app/components/employees";
import { employeeDummyData } from "@/app/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EmployeeState {
  employees: Employee[];
  handleModal: boolean;
  employeeId: number | any;
  searchString: string;
  filteredEmployee: Employee[];
}

const initialState: EmployeeState = {
  employees: employeeDummyData,
  handleModal: false,
  employeeId: null,
  searchString: "",
  filteredEmployee: [],
};

const dataSlice = createSlice({
  name: "employeeData",
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    },
    deleteEmployee: (state, action: PayloadAction<number>) => {
      state.employees = state.employees.filter(
        (employee) => employee.id !== action.payload
      );
    },
    updateEmployee: (
      state,
      action: PayloadAction<{
        employeeId: number;
        updatedData: Partial<Employee>;
      }>
    ) => {
      const { employeeId, updatedData } = action.payload;
      const updatedEmployees = state.employees.map((employee) => {
        if (employee.id === employeeId) {
          return {
            ...employee,
            ...updatedData,
          };
        }
        return employee;
      });

      return {
        ...state,
        employees: updatedEmployees,
      };
    },

    setmodalHandler: (state, action: PayloadAction<boolean>) => {
      state.handleModal = action.payload;
    },
    employeeIdUpdate: (state, action: PayloadAction<number | any>) => {
      state.employeeId = action.payload;
    },
    setSearchString: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload;
    },
    handleFilteredEmployee: (state, action: PayloadAction<Employee[]>) => {
      state.filteredEmployee = action.payload;
    },
  },
});

export const {
  addEmployee,
  deleteEmployee,
  updateEmployee,
  setmodalHandler,
  employeeIdUpdate,
  setSearchString,
  handleFilteredEmployee,
} = dataSlice.actions;
export default dataSlice.reducer;
