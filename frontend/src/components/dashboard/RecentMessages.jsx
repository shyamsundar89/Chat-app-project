import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/globalContext";
import { socket } from "../../socket";
import Badge from "./ui/badge/Badge";
import StatisticsChart from "./components/StatisticsChart";
import { FaTrashAlt } from "react-icons/fa";

export default function RecentMessages() {
  const { fetchUsers, getAllMessages, deleteMessage: deleteMessageFromServer } = useGlobalContext();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 8;
  const startIndex = (currentPage - 1) * messagesPerPage;
  const paginatedMessages = recentMessages.slice(
    startIndex,
    startIndex + messagesPerPage
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await fetchUsers();
        const userMap = {};
        users.forEach((u) => {
          userMap[u._id] = u;
        });
        setUsersMap(userMap);

        const messages = await getAllMessages();

        // Sort by latest timestamp or createdAt
        const sorted = messages.sort(
          (a, b) =>
            new Date(b.timestamp || b.createdAt) -
            new Date(a.timestamp || a.createdAt)
        ); 

        // Limit to last 10 messages
        // setRecentMessages(sorted.slice(0, 10));
        setRecentMessages(sorted);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };

    fetchData();
  }, [fetchUsers, getAllMessages]);

  useEffect(() => {
    socket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });

    return () => socket.off("getOnlineUsers");
  }, []);

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

  const handleDeleteMessage = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this message?");
    if (!confirmDelete) return;
  
    try {
      await deleteMessageFromServer(id);
      setRecentMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (error) {
      console.error("Failed to delete message", error);
    }
  };
  

  const generatePageNumbers = () => {
    const pages = [];
    const totalPages = Math.ceil(recentMessages.length / messagesPerPage);

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
              Total Messages: {recentMessages.length}
            </p>
          </div>
        </div>

        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <Table>
            <TableHeader className="border-gray-200 dark:border-gray-800 border-y">
              <TableRow>
                <TableCell className="py-3 text-start">Sender</TableCell>
                <TableCell className="py-3 px-5 text-start">Message</TableCell>
                <TableCell className="py-3 px-5 text-start">Time</TableCell>
                <TableCell className="py-3 text-start">Status</TableCell>
                <TableCell className="py-3 text-start">Action</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-200 dark:divide-gray-800">
              {paginatedMessages.map((msg) => {
                const senderId =
                  typeof msg.sender === "string" ? msg.sender : msg.sender?._id;
                const sender = usersMap[senderId] || {};
                const isOnline = onlineUsers.includes(msg.sender);
                return (
                  <TableRow key={msg._id}>
                    <TableCell className="py-2">
                      {sender.username || "Unknown"}
                    </TableCell>
                    <TableCell
                      className="py-2 px-5 max-w-[200px] truncate"
                      title={msg.content}
                    >
                      {msg.content}
                    </TableCell>
                    <TableCell className="py-2 whitespace-nowrap px-5">
                      {formatDate(msg.timestamp || msg.createdAt)}
                    </TableCell>
                    <TableCell className="py-2">
                      <Badge size="sm" color={isOnline ? "success" : "error"}>
                        {isOnline ? "Online" : "Offline"}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-2">
                      {/* <Badge size="sm" color={isOnline ? "success" : "error"}>
                        {isOnline ? "Online" : "Offline"}
                      </Badge> */}
                      <button
                        onClick={() => handleDeleteMessage(msg._id)}
                        className="text-red-500 hover:text-red-700 ml-2"
                        title="Delete message"
                      >
                        <FaTrashAlt />
                      </button>
                    </TableCell>

                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className="sm:flex block text-center border-t mt-2 dark:border-gray-800 justify-center sm:justify-between items-center w-full">
            <span className="text-sm text-gray-600">
              Page {currentPage} of{" "}
              {Math.ceil(recentMessages.length / messagesPerPage)}
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
                          Math.ceil(recentMessages.length / messagesPerPage)
                        )
                      )
                    }
                    disabled={
                      currentPage ===
                      Math.ceil(recentMessages.length / messagesPerPage)
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
                        Math.ceil(recentMessages.length / messagesPerPage)
                      )
                    }
                    disabled={
                      currentPage ===
                      Math.ceil(recentMessages.length / messagesPerPage)
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
      <StatisticsChart />
    </>
  );
}
