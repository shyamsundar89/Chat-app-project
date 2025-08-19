import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/globalContext";
import { socket } from "../../socket";
import Badge from "./ui/badge/Badge";
import MonthlySalesChart from "./components/MonthlySalesChart";
import { FaTrashAlt } from "react-icons/fa";

export default function Users() {
  const { user, fetchUsers, deleteUser: deleteUsersFromServer } = useGlobalContext();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recentUsers, setRecentUsers] = useState([]);

  const UsersPerPage = 4;
  const startIndex = (currentPage - 1) * UsersPerPage;
  const paginatedUsers = recentUsers.slice(
    startIndex,
    startIndex + UsersPerPage
  );

  // Fetch users and filter them
  useEffect(() => {
    const getAndProcessUsers = async () => {
      try {
        const users = await fetchUsers();
        if (!Array.isArray(users)) {
          console.warn("Invalid users data:", users);
          return;
        }
        // Sort users by createdAt to get the most recent ones
        const sortedUsers = users.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        // Slice to get only the most recent 6 users
        setRecentUsers(sortedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getAndProcessUsers();
  }, [fetchUsers]);

  // Listen for online users
  useEffect(() => {
    // Log when the socket is connected
    // socket.on("connect", () => {
    //   console.log("Socket connected with id:", socket.id); // Debug: check if socket connects successfully
    // });

    socket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });

    return () => {
      // socket.off("connect");
      socket.off("getOnlineUsers");
    };
  }, []);

  // Connect socket and pass token
  useEffect(() => {
    if (user) {
      socket.io.opts.query = {
        token: localStorage.getItem("token"),
      };
      socket.connect();
    }

    return () => {
      socket.disconnect();
    };
  }, [user]);

  // Function to format the date as "5 May 2025, 02:30"
  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date).toLocaleDateString("en-GB", options);
  };

  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this message?");
    if (!confirmDelete) return;
  
    try {
      await deleteUsersFromServer(id);
      setRecentUsers((prev) => prev.filter((msg) => msg._id !== id));
    } catch (error) {
      console.error("Failed to delete message", error);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    const totalPages = Math.ceil(recentUsers.length / UsersPerPage);

    // Always show first and last pages
    const showPages = 4;

    if (totalPages <= showPages + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= showPages - 1) {
        for (let i = 1; i <= showPages; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - (showPages - 2)) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - (showPages - 1); i <= totalPages; i++)
          pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <>
      <div className="overflow-hidden mb-5 border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex justify-between items-center w-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Recent Messages
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Messages: {recentUsers.length}
            </p>
          </div>
        </div>
        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
              <TableRow>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Username
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium px-5 text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Email
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium px-5 text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Created At
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {paginatedUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {user.username}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-5 text-gray-500 text-theme-sm dark:text-gray-400">
                    {user.email}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 px-5 text-theme-sm dark:text-gray-400 whitespace-nowrap">
                    {formatDate(user.createdAt)} {/* Format the created date */}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        onlineUsers.includes(user._id)
                          ? "success" // Online users are marked green
                          : "error" // Offline users are marked red
                      }
                    >
                      {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-2">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                      title="Delete message"
                    >
                      <FaTrashAlt />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="sm:flex block text-center border-t mt-2 dark:border-gray-800 justify-center sm:justify-between items-center w-full">
            <span className="text-sm text-gray-600">
              Page {currentPage} of{" "}
              {Math.ceil(recentUsers.length / UsersPerPage)}
            </span>

            <nav aria-label="Pagination" className="mt-4">
              <ul className="inline-flex -space-x-px text-sm">
                <li>
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="px-3 h-8 border dark:border-gray-800 border-gray-300 bg-white text-gray-500 dark:bg-gray-900 hover:bg-gray-100 disabled:opacity-50"
                  >
                    &laquo;
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-3 h-8 border dark:border-gray-800 border-gray-300 bg-white text-gray-500 dark:bg-gray-900 hover:bg-gray-100 disabled:opacity-50"
                  >
                    &lsaquo;
                  </button>
                </li>

                {generatePageNumbers().map((page, idx) => (
                  <li key={idx}>
                    {page === "..." ? (
                      <span className="px-3 h-8 flex items-center justify-center text-gray-400">
                        ...
                      </span>
                    ) : (
                      <button
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 h-8 border border-gray-300 ${
                          currentPage === page
                            ? "text-gray-200 bg-purple dark:bg-purple dark:border-purple dark:text-gray-200"
                            : "border dark:border-gray-800 border-gray-300 bg-white text-gray-500 dark:bg-gray-900 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    )}
                  </li>
                ))}

                <li>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(
                          prev + 1,
                          Math.ceil(recentUsers.length / UsersPerPage)
                        )
                      )
                    }
                    disabled={
                      currentPage ===
                      Math.ceil(recentUsers.length / UsersPerPage)
                    }
                    className="px-3 h-8 border dark:border-gray-800 border-gray-300 bg-white text-gray-500 dark:bg-gray-900 hover:bg-gray-100 disabled:opacity-50"
                  >
                    &rsaquo;
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      setCurrentPage(
                        Math.ceil(recentUsers.length / UsersPerPage)
                      )
                    }
                    disabled={
                      currentPage ===
                      Math.ceil(recentUsers.length / UsersPerPage)
                    }
                    className="px-3 h-8 border dark:border-gray-800 border-gray-300 bg-white text-gray-500 dark:bg-gray-900 hover:bg-gray-100 disabled:opacity-50"
                  >
                    &raquo;
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <MonthlySalesChart />
    </>
  );
}
