import { useState } from "react";

const ChartTab = ({ onSelect }) => {
  const [selected, setSelected] = useState("monthly");

  const getButtonClass = (option) =>
    selected === option
      ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
      : "text-gray-500 dark:text-gray-400";

  const handleSelect = (option) => {
    setSelected(option);
    onSelect(option); // Notify parent about the selected option
  };

  return (
    <div className="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
      <button
        onClick={() => handleSelect("monthly")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass("monthly")}`}
      >
        Monthly
      </button>

      <button
        onClick={() => handleSelect("quarterly")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass("quarterly")}`}
      >
        Quarterly
      </button>

      <button
        onClick={() => handleSelect("annually")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass("annually")}`}
      >
        Annually
      </button>
    </div>
  );
};

export default ChartTab;
