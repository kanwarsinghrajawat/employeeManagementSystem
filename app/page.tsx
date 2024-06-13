import Employees from "./components/employees";
import Header from "./components/employees/Header";
import TableHeader from "./components/employees/TableHeader";
export default function Home() {
  return (
    <div className="p-8 h-100vh">
      <Header />
      <div className="border p-4 mt-3 rounded-md flex flex-col gap-4">
        <TableHeader />
        <Employees />
      </div>
    </div>
  );
}
