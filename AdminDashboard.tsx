import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import AdminReportsTable from "@/components/AdminReportsTable";
import AdminUsersTable from "@/components/AdminUsersTable";

export default function AdminDashboard() {
  const { user } = useAuth();
  const statsQuery = trpc.admin.stats.useQuery();

  const stats = statsQuery.data || { totalUsers: 0, totalReports: 0, avgSeverity: 0, criticalCount: 0 };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="border-b-4 border-black p-8">
        <h1 className="text-5xl font-black tracking-tighter">ADMIN PORTAL</h1>
        <p className="text-sm text-gray-600 mt-2">PLATFORM MANAGEMENT & OVERSIGHT</p>
      </div>

      {/* KPI Cards */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-2 border-black rounded-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">TOTAL USERS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black">{stats.totalUsers}</div>
          </CardContent>
        </Card>
        <Card className="border-2 border-black rounded-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">TOTAL REPORTS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black">{stats.totalReports}</div>
          </CardContent>
        </Card>
        <Card className="border-2 border-black rounded-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">AVG SEVERITY</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black">{stats.avgSeverity}</div>
          </CardContent>
        </Card>
        <Card className="border-2 border-black rounded-none bg-amber-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-amber-900">CRITICAL</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-amber-900">{stats.criticalCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="p-8">
        <Tabs defaultValue="reports" className="w-full">
          <TabsList className="border-b-2 border-black rounded-none bg-transparent p-0 w-full justify-start">
            <TabsTrigger value="reports" className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent">
              REPORTS MANAGEMENT
            </TabsTrigger>
            <TabsTrigger value="users" className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent">
              USERS MANAGEMENT
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reports" className="mt-8">
            <AdminReportsTable />
          </TabsContent>

          <TabsContent value="users" className="mt-8">
            <AdminUsersTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
