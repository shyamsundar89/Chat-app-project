import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import RecentMessages from "../components/dashboard/RecentMessages";

const RecentMessagePage = () => {
  return (
    <>
      <DashboardLayout>
        <RecentMessages />
      </DashboardLayout>
    </>
  );
};

export default RecentMessagePage;
