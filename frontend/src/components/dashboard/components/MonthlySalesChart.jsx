import Chart from "react-apexcharts";
// import { Dropdown } from "../ui/dropdown/Dropdown";
// import { DropdownItem } from "../ui/dropdown/DropdownItem";
// import { FaEllipsisV } from "react-icons/fa"; 
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../../context/globalContext";
import { useTheme } from "../../../context/ThemeContext";

export default function MonthlySalesChart() {
  const { fetchUsers } = useGlobalContext();
  const [monthlyData, setMonthlyData] = useState(new Array(12).fill(0));
  // const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const getAndProcessUsers = async () => {
      try {
        const users = await fetchUsers();
  
        if (!Array.isArray(users)) {
          console.warn("Invalid users data:", users);
          return;
        }
  
        const counts = new Array(12).fill(0);
  
        users.forEach((user) => {
          if (user.createdAt) {
            const date = new Date(user.createdAt);
            if (!isNaN(date.getTime())) {
              const month = date.getMonth();
              if (month >= 0 && month <= 11) {
                counts[month]++;
              }
            }
          }
        });
  
        setMonthlyData(counts);
      } catch (error) {
        console.error("Error fetching users:", error);
        // fallback to all 0s
        setMonthlyData(new Array(12).fill(0));
      }
    };
  
    getAndProcessUsers();
  }, [fetchUsers]);  

  const options = {
    // theme: {
    //   mode: theme, 
    // },
    colors: ["#611f69"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
        borderRadius: 4,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },

    tooltip: {
      enabled: true,
      shared: false,
      intersect: false,
      followCursor: true, // Tooltip ko cursor ke saath follow karne ke liye
      fixed: {
        enabled: false, // Fix tooltip ko disable kar rahe hain taaki woh follow ho
      },
      style: {
        fontSize: "14px",
        fontFamily: "Outfit, sans-serif",
      },
      
      onDatasetHover: {
        highlightDataSeries: true,
      },
      y: {
        formatter: (val) =>
          val !== undefined && val !== null ? val.toString() : "N/A",
      },
    },
    markers: {
      size: 1,
      strokeColors: ["#A6295F", "#254AA0"],
      hover: {
        size: 3, // Tooltip ko thoda bada dikhane ke liye
      },
    },
    style: {
      fontSize: "14px",
      fontFamily: "Outfit, sans-serif",
      background: theme === "dark" ? "#000" : "#ffffff", // customize here
      color: theme === "dark" ? "#ffffff" : "#000000",
    },
  };

  const series = [
    {
      name: "Users",
      data: monthlyData,
    },
  ];

  // function toggleDropdown() {
  //   setIsOpen(!isOpen);
  // }

  // function closeDropdown() {
  //   setIsOpen(false);
  // }

  return (
    <div className="overflow-hidden border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Monthly Users
        </h3>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
          <Chart options={options} series={series} type="bar" height={180} />
        </div>
      </div>
    </div>
  );
}
