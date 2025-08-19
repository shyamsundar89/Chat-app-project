import { FaArrowUp, FaArrowDown, FaUsers, FaBoxOpen } from "react-icons/fa";
import Badge from "../ui/badge/Badge";
import { useGlobalContext } from "../../../context/globalContext";
import { useEffect } from "react";

export default function EcommerceMetrics() {
  const { usersList, fetchUsers, user, allMessages, getAllMessages } = useGlobalContext();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  
  useEffect(() => {
    if (user) {
      getAllMessages();
    }
  }, [getAllMessages, user]);

  const previousUserCount = 40; // Mocked previous data
  const currentUserCount = usersList?.length || 0;

  const previousMessageCount = 100; // Mocked previous data
  const currentMessageCount = allMessages?.messageExists?.length || 0;

  const calcPercentageChange = (current, previous) => {
    if (previous === 0) return 100; // Avoid division by zero
    return ((current - previous) / previous) * 100;
  };

  const userGrowth = calcPercentageChange(currentUserCount, previousUserCount);
  const messageChange = calcPercentageChange(currentMessageCount, previousMessageCount);

  
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* Customers */}
      <div className=" border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <FaUsers className="text-gray-800 text-xl dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Users
            </span>
            <h4 className="mt-2 text-3xl font-bold text-gray-800 text-title-sm dark:text-white/90">
            {usersList?.length || 0}
            </h4>
          </div>
          <Badge color={userGrowth >= 0 ? "success" : "error"}>
            {userGrowth >= 0 ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
            {Math.abs(userGrowth).toFixed(2)}%
          </Badge>
        </div>
      </div>

      {/* Orders */}
      <div className="border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <FaBoxOpen className="text-gray-800 text-xl dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Messages
            </span>
            <h4 className="mt-2 text-3xl font-bold text-gray-800 text-title-sm dark:text-white/90">
            {allMessages?.messageExists?.length || 0}
            </h4>
          </div>
          <Badge color={messageChange >= 0 ? "success" : "error"}>
            {messageChange >= 0 ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
            {Math.abs(messageChange).toFixed(2)}%
          </Badge>
        </div>
      </div>
    </div>
  );
}
