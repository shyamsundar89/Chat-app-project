import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useGlobalContext } from "../../../context/globalContext";
import { useEffect, useState } from "react";
import { socket } from "../../../socket";
import Badge from "../ui/badge/Badge";

export default function OnlineUsers() {
  const { user, fetchUsers } = useGlobalContext();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [usersList, setUsersList] = useState([]);

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
        setUsersList(sortedUsers.slice(0, 6));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getAndProcessUsers();
  }, [fetchUsers]);

  // Listen for online users
  useEffect(() => {
    // Log when the socket is connected
    socket.on("connect", () => {
      // console.log("Socket connected with id:", socket.id); // Debug: check if socket connects successfully
    });

    socket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });

    return () => {
      socket.off("connect");
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

  return (
    <div className="overflow-hidden border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Users
          </h3>
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
                className="py-3 font-medium px-5 sm:px-2 text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Email
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium px-5 sm:px-2 text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Created At
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {usersList.map((user) => (
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
                <TableCell
                  title={user.email}
                  className="py-3 px-5 sm:px-1 text-gray-500 text-theme-sm dark:text-gray-400 truncate"
                >
                  {user.email.length > 15
                    ? `${user.email.slice(0, 15)}...`
                    : user.email}
                </TableCell>
                <TableCell className="py-3 px-5 sm:px-2 text-gray-500 text-theme-sm dark:text-gray-400 whitespace-nowrap">
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
