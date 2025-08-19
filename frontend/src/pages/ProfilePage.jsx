import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Profile from "../components/dashboard/Profile";

const ProfilePage = () => {
  return (
    <>
      <DashboardLayout>
        <Profile />
      </DashboardLayout>
    </>
  );
};

export default ProfilePage;
