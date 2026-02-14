import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white p-5">

      <h1 className="text-2xl font-bold mb-8">
        Admin Panel
      </h1>

      <nav className="flex flex-col gap-4">

        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
        <Link to="/courses">Courses</Link>

      </nav>

    </div>
  );
}
