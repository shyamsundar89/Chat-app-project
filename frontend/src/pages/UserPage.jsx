import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Users from "../components/dashboard/Users";

const UserPage = () => {
  return (
    <>
      <DashboardLayout>
        <Users />
      </DashboardLayout>
    </>
  );
};

export default UserPage;
