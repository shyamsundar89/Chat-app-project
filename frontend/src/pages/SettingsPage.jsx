import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Settings from "../components/dashboard/Settings";

const SettingsPage = () => {
  return (
    <>
      <DashboardLayout>
        <Settings />
      </DashboardLayout>
    </>
  );
};

export default SettingsPage;
