import { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import { User } from "../types/User";
import { api } from "../services/api";

type SortField =
  | "firstName"
  | "lastName"
  | "email"
  | "jobTitle"
  | "gender"
  | "createdAt";
type SortDirection = "asc" | "desc";

export const UserList = () => {
  // const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [genderFilter, setGenderFilter] = useState("");
  const [jobTitleFilter, setJobTitleFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const usersPerPage = 5;

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await api.getUsers({
          sortBy: sortField,
          sortOrder: sortDirection,
          search: debouncedSearchTerm,
          page: currentPage,
          limit: usersPerPage,
          gender: genderFilter,
          jobTitle: jobTitleFilter,
          startDate,
          endDate,
        });
        setUsers(response.users);
        setTotalPages(response.pagination.totalPages);
        setTotalUsers(response.pagination.totalUsers);
        setError(null);
      } catch (err) {
        setError("Failed to fetch users");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [
    sortField,
    sortDirection,
    debouncedSearchTerm,
    currentPage,
    genderFilter,
    jobTitleFilter,
    startDate,
    endDate,
  ]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.deleteUser(id);
        setUsers(users.filter((user) => user._id !== id));
      } catch (err) {
        setError("Failed to delete user");
      }
    }
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setGenderFilter("");
    setJobTitleFilter("");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
  };

  const renderPagination = () => {
    const items = [];
    const maxPages = 5; // Maximum number of page buttons to show

    // Calculate start and end page numbers
    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(totalPages, startPage + maxPages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxPages) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }

    // First page button
    items.push(
      <Pagination.First
        key="first"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      />
    );

    // Previous page button
    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
    );

    // Page numbers
    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    // Next page button
    items.push(
      <Pagination.Next
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    );

    // Last page button
    items.push(
      <Pagination.Last
        key="last"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      />
    );

    return items;
  };

  return (
    <div className="mt-4 px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
        <h2 className="text-2xl font-semibold">Users List</h2>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 border border-red-400 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Filter by search*/}

      

      {/* Filter by gender, job title and date */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
            >
              <option value="">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <input
              type="text"
              placeholder="Filter by job title..."
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={jobTitleFilter}
              onChange={(e) => setJobTitleFilter(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Range
            </label>
            <div className="flex gap-4 ">
              <input
                type="date"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="date"
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
         
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={clearFilters}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition duration-200"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Search by any */}
      <div className="flex justify-between mb-2">
        <div className="mb-3 text-sm text-gray-500">
          Showing {users.length} of {totalUsers} users
        </div>

        <div className="bg-white p-1 rounded-lg  justify-center items-center ">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>{" "}
            &nbsp;&nbsp;
            <input
              type="text"
              placeholder="Search users..."
              className="w-40 border border-gray-300 rounded px-3 py-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border">
          <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            <tr>
              <th className="p-3">Profile</th>
              <th
                className="p-3 cursor-pointer"
                onClick={() => handleSort("firstName")}
              >
                First Name{" "}
                {sortField === "firstName" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="p-3 cursor-pointer"
                onClick={() => handleSort("lastName")}
              >
                Last Name{" "}
                {sortField === "lastName" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="p-3 cursor-pointer"
                onClick={() => handleSort("email")}
              >
                Email{" "}
                {sortField === "email" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="p-3 cursor-pointer"
                onClick={() => handleSort("jobTitle")}
              >
                Job Title{" "}
                {sortField === "jobTitle" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="p-3 cursor-pointer"
                onClick={() => handleSort("gender")}
              >
                Gender{" "}
                {sortField === "gender" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="p-3 cursor-pointer"
                onClick={() => handleSort("createdAt")}
              >
                Created At{" "}
                {sortField === "createdAt" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id}>
                  <td className="p-3">
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={`${user.firstName}'s profile`}
                        className="rounded shadow w-[100px] h-[100px] object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center bg-gray-100 text-gray-500 rounded w-[100px] h-[100px] text-xs">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="p-3">{user.firstName}</td>
                  <td className="p-3">{user.lastName}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.jobTitle}</td>
                  <td className="p-3">{user.gender}</td>
                  <td className="p-3">
                    {new Date(user.createdAt!).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <div className="flex flex-col md:flex-row gap-2">
                      <Link
                        to={`/users/edit/${user._id}`}
                        className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                      <button
                        className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => user._id && handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          {/* Replace this with your custom pagination component or Tailwind pagination */}
          {renderPagination()}
        </div>
      )}
    </div>
  );
};

export default UserList;
