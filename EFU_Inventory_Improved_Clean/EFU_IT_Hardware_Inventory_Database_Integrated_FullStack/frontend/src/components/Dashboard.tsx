import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";
import {
  Monitor,
  Users,
  CheckCircle,
  AlertTriangle,
  PackageX,
  Clock,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  CalendarDays,
  Plus,
  RefreshCw,
} from "lucide-react";
import { api } from "../api";

interface DashboardData {
  stats: {
    total: number;
    inStock: number;
    allocated: number;
    retired: number;
    expiring: number;
    warrantyExpiring: number;
  };
  monthlyTrend: {
    month: string;
    purchases: number;
    allocations: number;
    returns: number;
  }[];
  departmentDistribution: { dept: string; assets: number }[];
  assetDistribution: { name: string; value: number }[];
  warrantyTrend: { month: string; expiring: number }[];
  recentAllocations: {
    id: string;
    allocationDate: string;
    asset?: { model: string; serialNumber: string; status: string };
    employee?: { name: string; department?: string };
  }[];
  latestAssets: {
    id: string;
    model: string;
    serialNumber: string;
    type: string;
    vendor?: string;
    purchaseCost: number;
    createdAt: string;
  }[];
}

function StatCard({
  icon,
  label,
  value,
  sub,
  color,
  trend,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
  trend?: { value: string; up: boolean };
}) {
  return (
    <div
      style={{
        background: "var(--surface)",
        borderRadius: 18,
        padding: "20px 22px",
        border: `1px solid ${color}24`,
        borderTop: `3px solid ${color}`,
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        minHeight: 150,
        transition:
          "transform 180ms ease, background-color 220ms ease, border-color 220ms ease, box-shadow 220ms ease",
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.transform = "translateY(-3px)";
        event.currentTarget.style.boxShadow = "0 14px 30px rgba(15, 23, 42, 0.10)";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.transform = "translateY(0)";
        event.currentTarget.style.boxShadow = "0 8px 24px rgba(15, 23, 42, 0.06)";
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 14,
            background: `${color}18`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color }}>{icon}</span>
        </div>
        {trend && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 12,
              fontWeight: 500,
              color: trend.up ? "#16A34A" : "#DC2626",
            }}
          >
            {trend.up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            {trend.value}
          </div>
        )}
      </div>
      <div>
        <div
          style={{
            fontSize: 30,
            fontWeight: 750,
            color: "var(--text-primary)",
            lineHeight: 1,
          }}
        >
          {value}
        </div>
        <div
          style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 4 }}
        >
          {label}
        </div>
        {sub && (
          <div
            style={{
              fontSize: 11,
              color: "var(--text-tertiary)",
              marginTop: 2,
            }}
          >
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}

function SectionCard({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "var(--surface)",
        borderRadius: 18,
        border: "1px solid var(--border)",
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)",
        overflow: "hidden",
        transition:
          "background-color 220ms ease, border-color 220ms ease, box-shadow 220ms ease",
      }}
    >
      <div
        style={{
          padding: "18px 20px",
          borderBottom: "1px solid var(--border-soft)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "var(--text-primary)",
          }}
        >
          {title}
        </span>
        {action}
      </div>
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  );
}

export default function Dashboard({
  onNavigate,
}: {
  onNavigate: (s: string) => void;
}) {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    api
      .get<DashboardData>("/dashboard")
      .then(setDashboard)
      .catch((e) => setError(e.message));
  }, []);

  if (error)
    return (
      <div
        style={{
          padding: 16,
          borderRadius: 8,
          background: "#FEF2F2",
          color: "#DC2626",
        }}
      >
        {error}
      </div>
    );
  if (!dashboard)
    return (
      <div style={{ padding: 32, color: "var(--text-secondary)" }}>
        Loading dashboard…
      </div>
    );

  const {
    stats,
    monthlyTrend: monthlyData,
    departmentDistribution: departmentData,
    warrantyTrend,
  } = dashboard;
  const palette = [
    "#005BAC",
    "#0070CC",
    "#3B82F6",
    "#60A5FA",
    "#93C5FD",
    "#BFDBFE",
  ];
  const assetDistribution = dashboard.assetDistribution.map((item, index) => ({
    ...item,
    color: palette[index % palette.length],
  }));
  const recentAllocations = dashboard.recentAllocations.map((item) => ({
    asset: item.asset?.model || "Unknown asset",
    serial: item.asset?.serialNumber || "—",
    employee: item.employee?.name || "—",
    dept: item.employee?.department || "—",
    date: new Date(item.allocationDate).toLocaleDateString(),
    status: item.asset?.status?.replaceAll("_", " ") || "Allocated",
  }));
  const latestAssets = dashboard.latestAssets.map((item) => ({
    name: item.model,
    type: item.type,
    serial: item.serialNumber,
    vendor: item.vendor || "—",
    cost: item.purchaseCost.toLocaleString(),
    date: new Date(item.createdAt).toLocaleDateString(),
  }));

  const currentDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        maxWidth: 1680,
        margin: "0 auto",
      }}
    >
      {/* Dashboard header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 26,
              fontWeight: 750,
              color: "var(--text-primary)",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Dashboard
          </h1>

          <p
            style={{
              margin: "6px 0 0",
              fontSize: 14,
              color: "var(--text-secondary)",
            }}
          >
            Good morning, System Administrator. Here is your latest inventory overview.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              marginTop: 10,
              fontSize: 12,
              color: "var(--text-tertiary)",
            }}
          >
            <CalendarDays size={14} />
            {currentDate}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            type="button"
            onClick={() => window.location.reload()}
            title="Refresh dashboard"
            aria-label="Refresh dashboard"
            style={{
              width: 40,
              height: 40,
              display: "grid",
              placeItems: "center",
              borderRadius: 12,
              border: "1px solid var(--border)",
              background: "var(--surface)",
              color: "var(--text-secondary)",
              cursor: "pointer",
            }}
          >
            <RefreshCw size={17} />
          </button>

          <button
            type="button"
            onClick={() => onNavigate("new-asset")}
            style={{
              minHeight: 40,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 16px",
              borderRadius: 12,
              border: "1px solid #005BAC",
              background: "linear-gradient(135deg, #005BAC, #0070CC)",
              color: "#fff",
              fontSize: 13,
              fontWeight: 650,
              cursor: "pointer",
              boxShadow: "0 8px 18px rgba(0, 91, 172, 0.22)",
            }}
          >
            <Plus size={17} />
            Create Asset
          </button>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 18,
        }}
      >
        <StatCard
          icon={<Monitor size={20} />}
          label="Total Assets"
          value={stats.total}
          sub="All registered assets"
          color="#005BAC"
        />
        <StatCard
          icon={<CheckCircle size={20} />}
          label="Allocated"
          value={stats.allocated}
          sub="In active use"
          color="#16A34A"
        />
        <StatCard
          icon={<Users size={20} />}
          label="IT Stock"
          value={stats.inStock}
          sub="Ready to allocate"
          color="#0070CC"
        />
        <StatCard
          icon={<AlertTriangle size={20} />}
          label="Warranty Expiring"
          value={stats.warrantyExpiring}
          sub="Within 30 days"
          color="#F59E0B"
        />
        <StatCard
          icon={<PackageX size={20} />}
          label="Expiring"
          value={stats.expiring}
          sub="Within 30 days"
          color="#DC2626"
        />
        <StatCard
          icon={<Clock size={20} />}
          label="Retired"
          value={stats.retired}
          sub="Decommissioned"
          color="#6B7280"
        />
      </div>

      {/* Charts row 1 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 22,
        }}
      >
        <SectionCard title="Monthly Purchase & Allocation Trend">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyData} barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid var(--border)",
                  background: "var(--surface-raised)",
                  color: "var(--text-primary)",
                  fontSize: 12,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar
                dataKey="purchases"
                name="Purchases"
                fill="#005BAC"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="allocations"
                name="Allocations"
                fill="#60A5FA"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="returns"
                name="Returns"
                fill="#94A3B8"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="Department-wise Assets">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={departmentData} layout="vertical" barSize={14}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--chart-grid)"
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="dept"
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
                width={70}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid var(--border)",
                  background: "var(--surface-raised)",
                  color: "var(--text-primary)",
                  fontSize: 12,
                }}
              />
              <Bar dataKey="assets" fill="#005BAC" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="Asset Distribution">
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={assetDistribution}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={2}
                dataKey="value"
              >
                {assetDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid var(--border)",
                  background: "var(--surface-raised)",
                  color: "var(--text-primary)",
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "6px 12px",
              marginTop: 8,
            }}
          >
            {assetDistribution.map((d) => (
              <div
                key={d.name}
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 2,
                    background: d.color,
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>
                  {d.name}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    marginLeft: "auto",
                  }}
                >
                  {d.value}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Charts row 2 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.7fr) minmax(300px, 0.8fr)",
          gap: 22,
        }}
      >
        <SectionCard title="Warranty Expiry Trend (Next 6 Months)">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={warrantyTrend}>
              <defs>
                <linearGradient id="warr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid var(--border)",
                  background: "var(--surface-raised)",
                  color: "var(--text-primary)",
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="expiring"
                stroke="#F59E0B"
                strokeWidth={2}
                fill="url(#warr)"
                name="Expiring Assets"
              />
            </AreaChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* Quick Actions */}
        <div
          style={{
            background: "var(--surface)",
            borderRadius: 18,
            border: "1px solid var(--border)",
            boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)",
            padding: 20,
            transition:
              "background-color 220ms ease, border-color 220ms ease, box-shadow 220ms ease",
          }}
        >
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "var(--text-primary)",
              marginBottom: 16,
            }}
          >
            Quick Actions
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              {
                label: "Add New Asset",
                icon: "📦",
                screen: "new-asset",
                color: "#005BAC",
              },
              {
                label: "Allocate Asset",
                icon: "👤",
                screen: "asset-allocation",
                color: "#16A34A",
              },
              {
                label: "Return Asset",
                icon: "↩️",
                screen: "asset-revocation",
                color: "#F59E0B",
              },
              {
                label: "Generate Report",
                icon: "📊",
                screen: "asset-history",
                color: "#6B7280",
              },
            ].map((a) => (
              <button
                key={a.label}
                onClick={() => onNavigate(a.screen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "13px 14px",
                  borderRadius: 12,
                  border: `1.5px solid ${a.color}20`,
                  background: `${a.color}08`,
                  cursor: "pointer",
                  textAlign: "left",
                  width: "100%",
                  transition: "all 0.15s",
                }}
              >
                <span style={{ fontSize: 18 }}>{a.icon}</span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    flex: 1,
                  }}
                >
                  {a.label}
                </span>
                <ArrowRight size={14} color={a.color} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tables row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(460px, 1fr))",
          gap: 22,
        }}
      >
        <SectionCard
          title="Recent Allocations"
          action={
            <button
              onClick={() => onNavigate("recent-allocations")}
              style={{
                fontSize: 12,
                color: "#005BAC",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              View All
            </button>
          }
        >
          <div style={{ width: "100%", overflowX: "auto" }}>
          <table style={{ width: "100%", minWidth: 680, borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Asset", "Employee", "Department", "Date", "Status"].map(
                  (h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#9CA3AF",
                        padding: "0 0 10px",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {recentAllocations.map((r, i) => (
                <tr
                  key={i}
                  style={{ borderTop: "1px solid var(--border-soft)" }}
                >
                  <td style={{ padding: "10px 0" }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: "var(--text-primary)",
                      }}
                    >
                      {r.asset}
                    </div>
                    <div
                      style={{ fontSize: 11, color: "var(--text-tertiary)" }}
                    >
                      {r.serial}
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "10px 0",
                      fontSize: 13,
                      color: "var(--text-primary)",
                    }}
                  >
                    {r.employee}
                  </td>
                  <td
                    style={{
                      padding: "10px 0",
                      fontSize: 12,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {r.dept}
                  </td>
                  <td
                    style={{
                      padding: "10px 0",
                      fontSize: 12,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {r.date}
                  </td>
                  <td style={{ padding: "10px 0" }}>
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: 99,
                        fontSize: 11,
                        fontWeight: 500,
                        background: "#DCFCE7",
                        color: "#16A34A",
                      }}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </SectionCard>

        <SectionCard
          title="Latest Assets Added"
          action={
            <button
              onClick={() => onNavigate("new-asset")}
              style={{
                fontSize: 12,
                color: "#005BAC",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Add New
            </button>
          }
        >
          <div style={{ width: "100%", overflowX: "auto" }}>
          <table style={{ width: "100%", minWidth: 680, borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Asset", "Type", "Vendor", "Cost (PKR)", "Date"].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#9CA3AF",
                      padding: "0 0 10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {latestAssets.map((a, i) => (
                <tr
                  key={i}
                  style={{ borderTop: "1px solid var(--border-soft)" }}
                >
                  <td style={{ padding: "10px 0" }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: "var(--text-primary)",
                      }}
                    >
                      {a.name}
                    </div>
                    <div
                      style={{ fontSize: 11, color: "var(--text-tertiary)" }}
                    >
                      {a.serial}
                    </div>
                  </td>
                  <td style={{ padding: "10px 0" }}>
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: 99,
                        fontSize: 11,
                        fontWeight: 500,
                        background: "#EBF4FF",
                        color: "#005BAC",
                      }}
                    >
                      {a.type}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "10px 0",
                      fontSize: 12,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {a.vendor}
                  </td>
                  <td
                    style={{
                      padding: "10px 0",
                      fontSize: 12,
                      color: "var(--text-primary)",
                      fontWeight: 500,
                    }}
                  >
                    {a.cost}
                  </td>
                  <td
                    style={{
                      padding: "10px 0",
                      fontSize: 12,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {a.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}