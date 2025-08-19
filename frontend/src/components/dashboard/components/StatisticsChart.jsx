import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import ChartTab from "../common/ChartTab";
import { useGlobalContext } from "../../../context/globalContext";

export default function StatisticsChart() {
  const { fetchUsers, getAllMessages } = useGlobalContext();
  const [userCounts, setUserCounts] = useState(new Array(12).fill(0));
  const [messageCounts, setMessageCounts] = useState(new Array(12).fill(0));
  const [timeRange, setTimeRange] = useState("monthly"); // Track selected time range

  const handleTimeRangeSelect = (range) => {
    setTimeRange(range);
  };

  const processData = (data, timeRange) => {
    let counts = new Array(timeRange === "annually" ? 1 : timeRange === "quarterly" ? 4 : 12).fill(0);

    data.forEach((item) => {
      let date;
      if (item.createdAt) {
        date = new Date(item.createdAt.trim());
      } else if (item.timestamp) {
        date = new Date(item.timestamp.trim());
      }

      if (!isNaN(date)) {
        let index;
        switch (timeRange) {
          case "quarterly":
            index = Math.floor(date.getMonth() / 3); // Group months in quarters (0 - 3, 4 - 6, 7 - 9, 10 - 12)
            break;
          case "annually":
            index = 0; // All data falls under a single "annually" category
            break;
          default:
            index = date.getMonth(); // Monthly
            break;
        }
        counts[index]++;
      } else {
        console.log("Invalid Date:", item);
      }
    });
    
    return counts;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching user data
        const users = await fetchUsers();
        // Fetching message data using getAllMessages
        const messages = await getAllMessages();

        // Process user data based on selected time range
        const processedUserCounts = processData(users, timeRange);
        setUserCounts(processedUserCounts);

        // Process message data based on selected time range
        const processedMessageCounts = processData(messages, timeRange);
        setMessageCounts(processedMessageCounts);

      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, [fetchUsers, getAllMessages, timeRange]); // Re-run effect on timeRange change

  const options = {
    legend: { show: false },
    colors: ["#465FFF", "#611f69"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: { show: false },
    },
    stroke: { curve: "straight", width: [2, 2] },
    fill: {
      type: "gradient",
      gradient: { opacityFrom: 0.55, opacityTo: 0 },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: { size: 6 },
    },
    grid: {
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    dataLabels: { enabled: false },
    tooltip: {
      enabled: true,
      x: { format: "dd MMM yyyy" },
    },
    xaxis: {
      type: "category",
      categories: timeRange === "annually"
        ? ["Year"]
        : timeRange === "quarterly"
        ? ["Q1", "Q2", "Q3", "Q4"]
        : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
      },
    },
  };

  const series = [
    {
      name: "Users",
      data: userCounts,
    },
    {
      name: "Messages",
      data: messageCounts,
    },
  ];

  return (
    <div className="border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Statistics
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            {timeRange.charAt(0).toUpperCase() + timeRange.slice(1)} Insights for users & messages
          </p>
        </div>
        <div className="flex items-start w-full gap-3 sm:justify-end">
          <ChartTab onSelect={handleTimeRangeSelect} />
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 pl-2">
          <Chart options={options} series={series} type="area" height={310} />
        </div>
      </div>
    </div>
  );
}
