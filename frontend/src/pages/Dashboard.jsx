import PageMeta from "../components/dashboard/common/PageMeta";
import DemographicCard from "../components/dashboard/components/DemographicCard";
import EcommerceMetrics from "../components/dashboard/components/EcommerceMetrics";
import MonthlySalesChart from "../components/dashboard/components/MonthlySalesChart";
// import MonthlyTarget from "../components/dashboard/components/MonthlyTarget";
import RecentUsers from "../components/dashboard/components/RecentUsers";
import RecentOrders from "../components/dashboard/components/RecentOrders";
import StatisticsChart from "../components/dashboard/components/StatisticsChart";
import DashboardLayout from "../components/layout/DashboardLayout";

export default function Dashboard() {
  return (
    <>
      <DashboardLayout>
        <PageMeta
          title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
          description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
        />
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 space-y-6 xl:col-span-7">
            <EcommerceMetrics />

            <MonthlySalesChart />
          </div>

          <div className="col-span-12 xl:col-span-5">
            <RecentUsers />
          </div>

          <div className="col-span-12">
            <StatisticsChart />
          </div>

          {/* <div className="col-span-12 xl:col-span-5">
            <DemographicCard />
          </div>

          <div className="col-span-12 xl:col-span-7">
            <RecentOrders />
          </div> */}
        </div>
      </DashboardLayout>
    </>
  );
}
