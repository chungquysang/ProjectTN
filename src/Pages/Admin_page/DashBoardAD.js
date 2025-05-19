"use client";
import {
  Calendar,
  FileText,
  ArrowUp,
  ArrowDown,
  Plus,
  UserRound,
  Users,
  CircleHelp,
} from "lucide-react";

// Assuming these components exist in your project
import {
  SidebarAdmin,
  HeaderAdmin,
} from "../../Components/Admin/controllerRouter";

function DashboardAdmin() {
  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderAdmin />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-500">
                Welcome to DashLite Hospital Dashboard Template.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-3 mt-4 md:mt-0">
              <button className="flex items-center gap-2 px-4 py-2 border rounded text-sm text-gray-700 bg-white hover:bg-gray-100">
                <Calendar className="h-4 w-4" />
                Last 30 Days
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="ml-1"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-white text-sm bg-emerald-600 hover:bg-emerald-700 rounded">
                <FileText className="h-4 w-4" />
                Reports
              </button>
            </div>
          </div>

          {/* Income Cards section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard
              title="IPD Income"
              amount="$10,945"
              change={4.63}
              lineColor="text-emerald-500"
            />
            <StatCard
              title="OPD Income"
              amount="$12,338"
              change={-2.34}
              lineColor="text-violet-500"
            />
            <StatCard
              title="Labotory Income"
              amount="$20,847"
              change={4.63}
              lineColor="text-orange-500"
            />
            <StatCard
              title="Expense"
              amount="$23,485"
              change={1.34}
              lineColor="text-pink-500"
            />
          </div>

          {/* Stats and Charts section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Hospital Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Hospital Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <StatItem
                  label="Todays' Appointment"
                  value="470"
                  icon={<Calendar className="h-5 w-5 text-blue-500" />}
                  bgColor="bg-blue-50"
                />
                <StatItem
                  label="Doctors"
                  value="152"
                  icon={<Plus className="h-5 w-5 text-emerald-500" />}
                  bgColor="bg-emerald-50"
                />
                <StatItem
                  label="Patients"
                  value="2,327"
                  icon={<UserRound className="h-5 w-5 text-cyan-500" />}
                  bgColor="bg-cyan-50"
                />
                <StatItem
                  label="Nurses"
                  value="674"
                  icon={<Plus className="h-5 w-5 text-pink-500" />}
                  bgColor="bg-pink-50"
                />
                <StatItem
                  label="Department"
                  value="12"
                  icon={<Users className="h-5 w-5 text-violet-500" />}
                  bgColor="bg-violet-50"
                />
              </CardContent>
            </Card>

            {/* Total Revenue */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Total Revenue</CardTitle>
                  <p className="text-sm text-gray-500">
                    In 30 days income of this hospital.
                  </p>
                </div>
                <CircleHelp className="h-5 w-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <RevenueItem label="Monthly" value="98K" change={4.63} />
                  <RevenueItem label="Weekly" value="9.69K" change={-1.92} />
                  <RevenueItem
                    label="Daily (Avg)"
                    value="3.94K"
                    change={3.45}
                  />
                </div>
                <div className="h-[180px] mt-4">
                  <RevenueChart />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>01 Jan, 2020</span>
                  <span>30 Jan, 2020</span>
                </div>
              </CardContent>
            </Card>

            {/* Income vs Expenses */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Income vs Expenses</CardTitle>
                <p className="text-sm text-gray-500">
                  Last 30 days Income vs Expenses Statistics.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Month</div>
                    <div className="text-xl font-semibold">12.57K</div>
                    <div className="flex items-center text-xs text-emerald-500">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      12.37%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Week</div>
                    <div className="text-xl font-semibold">3.98K</div>
                    <div className="flex items-center text-xs text-emerald-500">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      47.74%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Month</div>
                    <div className="text-xl font-semibold">4.49K</div>
                    <div className="flex items-center text-xs text-emerald-500">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      12.37%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Week</div>
                    <div className="text-xl font-semibold">1.15K</div>
                    <div className="flex items-center text-xs text-red-500">
                      <ArrowDown className="h-3 w-3 mr-1" />
                      0.35%
                    </div>
                  </div>
                </div>
                <div className="h-[180px] mt-4">
                  <ComparisonChart />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>01 Jan, 2020</span>
                  <span>15 Jan, 2020</span>
                  <span>30 Jan, 2020</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Sidebar Floating Icons */}
    </div>
  );
}

// Card Components
function Card({ children }) {
  return <div className="bg-white rounded-xl shadow p-4">{children}</div>;
}

function CardHeader({ children, className = "" }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

function CardTitle({ children }) {
  return <h2 className="text-lg font-semibold text-gray-800">{children}</h2>;
}

function CardContent({ children, className = "" }) {
  return <div className={`${className}`}>{children}</div>;
}

// Stat Components
function StatCard({ title, amount, change, lineColor }) {
  const isPositive = change >= 0;
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="text-3xl font-bold text-gray-800">{amount}</div>
          <div className={`${lineColor} h-6`}>
            <svg width="80" height="24" viewBox="0 0 80 24">
              <path
                d="M0,12 Q10,6 20,12 T40,12 T60,12 T80,12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center mt-1">
          <span
            className={`text-sm ${
              isPositive ? "text-emerald-500" : "text-red-500"
            } flex items-center`}
          >
            {isPositive ? (
              <ArrowUp className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDown className="h-3 w-3 mr-1" />
            )}{" "}
            {Math.abs(change)}%
          </span>
          <span className="text-sm text-gray-500 ml-1">vs. last week</span>
        </div>
      </CardContent>
    </Card>
  );
}

function StatItem({ label, value, icon, bgColor }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm text-gray-500">{label}</div>
        <div className="text-2xl font-semibold">{value}</div>
      </div>
      <div className={`${bgColor} p-3 rounded-lg`}>{icon}</div>
    </div>
  );
}

// Revenue Item Component
function RevenueItem({ label, value, change }) {
  const isPositive = change >= 0;

  return (
    <div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
      <div
        className={`flex items-center text-xs ${
          isPositive ? "text-emerald-500" : "text-red-500"
        }`}
      >
        {isPositive ? (
          <ArrowUp className="h-3 w-3 mr-1" />
        ) : (
          <ArrowDown className="h-3 w-3 mr-1" />
        )}
        {Math.abs(change)}%
      </div>
    </div>
  );
}

// Revenue Chart Component
function RevenueChart() {
  return (
    <div className="w-full h-full flex items-end">
      {/* Simplified bar chart */}
      {Array.from({ length: 30 }).map((_, i) => {
        const height = Math.floor(Math.random() * 80) + 20;
        return (
          <div
            key={i}
            className="w-1.5 mx-0.5 bg-emerald-400 rounded-t"
            style={{ height: `${height}%` }}
          ></div>
        );
      })}
    </div>
  );
}

// Comparison Chart Component
function ComparisonChart() {
  return (
    <div className="relative w-full h-full">
      {/* Background grid lines */}
      <div className="absolute inset-0 flex flex-col justify-between">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="border-t border-gray-100 h-0"></div>
        ))}
      </div>

      {/* Y-axis labels */}
      <div className="absolute left-0 inset-y-0 flex flex-col justify-between text-xs text-gray-400">
        <div>12,000</div>
        <div>9,600</div>
        <div>7,200</div>
        <div>4,800</div>
        <div>2,400</div>
        <div>0</div>
      </div>

      {/* Simplified area chart */}
      <div className="absolute inset-0 ml-12">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Green line and area */}
          <path
            d="M0,50 Q10,40 20,45 T40,50 T60,40 T80,30 T100,50"
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
          />
          <path
            d="M0,50 Q10,40 20,45 T40,50 T60,40 T80,30 T100,50 V100 H0 Z"
            fill="rgba(16, 185, 129, 0.1)"
          />

          {/* Red dashed line */}
          <path
            d="M0,60 Q10,50 20,55 T40,45 T60,60 T80,50 T100,40"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            strokeDasharray="2"
          />
        </svg>
      </div>
    </div>
  );
}

export default DashboardAdmin;
