import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

type ReportStatus = "open" | "under_review" | "resolved" | "dismissed";

interface Report {
  id: number;
  ocatId: string;
  casinoName: string;
  category: string;
  severityScore: number;
  status: ReportStatus;
  description: string;
}

export default function AdminReportsTable() {
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [statusFilter, setStatusFilter] = useState<ReportStatus | "">("");
  
  const listQuery = trpc.admin.reports.list.useQuery({ limit, offset });
  const updateStatusMutation = trpc.admin.reports.updateStatus.useMutation();
  const deleteMutation = trpc.admin.reports.delete.useMutation();

  const handleStatusChange = async (reportId: number, newStatus: ReportStatus) => {
    try {
      await updateStatusMutation.mutateAsync({ reportId, status: newStatus });
      await listQuery.refetch();
      toast.success("Report status updated");
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (reportId: number) => {
    if (!confirm("Delete this report permanently?")) return;
    try {
      await deleteMutation.mutateAsync({ reportId });
      await listQuery.refetch();
      toast.success("Report deleted");
    } catch (err) {
      toast.error("Failed to delete report");
    }
  };

  const reports = (listQuery.data?.rows ?? []) as unknown as Report[];
  const total = listQuery.data?.total ?? 0;
  
  // Client-side filtering by status
  const filteredReports = statusFilter ? reports.filter(r => r.status === statusFilter) : reports;

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="flex gap-4 items-end border-b-2 border-black pb-4">
        <div className="flex-1">
          <label className="text-xs font-bold text-gray-600 block mb-2">FILTER BY STATUS</label>
          <Select value={statusFilter} onValueChange={(val: any) => setStatusFilter(val)}>
            <SelectTrigger className="border-black rounded-none w-48">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="open">OPEN</SelectItem>
              <SelectItem value="under_review">UNDER REVIEW</SelectItem>
              <SelectItem value="resolved">RESOLVED</SelectItem>
              <SelectItem value="dismissed">DISMISSED</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Pagination Info */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Showing {offset + 1} to {Math.min(offset + limit, total)} of {total} reports
          {statusFilter && ` (filtered: ${filteredReports.length})`}
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setOffset(Math.max(0, offset - limit))}
            disabled={offset === 0}
            variant="outline"
            className="border-black rounded-none"
          >
            ← PREV
          </Button>
          <Button
            onClick={() => setOffset(offset + limit)}
            disabled={offset + limit >= total}
            variant="outline"
            className="border-black rounded-none"
          >
            NEXT →
          </Button>
        </div>
      </div>

      {/* Reports Table */}
      <div className="border-2 border-black overflow-x-auto">
        <Table>
          <TableHeader className="bg-black text-white">
            <TableRow className="hover:bg-black">
              <TableHead className="text-white font-black">OCAT ID</TableHead>
              <TableHead className="text-white font-black">CASINO</TableHead>
              <TableHead className="text-white font-black">CATEGORY</TableHead>
              <TableHead className="text-white font-black">SEVERITY</TableHead>
              <TableHead className="text-white font-black">STATUS</TableHead>
              <TableHead className="text-white font-black">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.map((report) => (
              <TableRow key={report.id} className="border-b border-gray-200">
                <TableCell className="font-mono text-sm">{report.ocatId}</TableCell>
                <TableCell className="font-bold">{report.casinoName}</TableCell>
                <TableCell className="text-sm">{report.category}</TableCell>
                <TableCell>
                  <div className={`w-12 h-6 flex items-center justify-center text-xs font-bold rounded-none border border-black ${
                    report.severityScore >= 75 ? 'bg-red-100' : 
                    report.severityScore >= 50 ? 'bg-yellow-100' : 
                    'bg-green-100'
                  }`}>
                    {report.severityScore}
                  </div>
                </TableCell>
                <TableCell>
                  <Select value={report.status} onValueChange={(val) => handleStatusChange(report.id, val as ReportStatus)}>
                    <SelectTrigger className="w-32 border-black rounded-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">OPEN</SelectItem>
                      <SelectItem value="under_review">UNDER REVIEW</SelectItem>
                      <SelectItem value="resolved">RESOLVED</SelectItem>
                      <SelectItem value="dismissed">DISMISSED</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDelete(report.id)}
                    variant="destructive"
                    size="sm"
                    className="rounded-none"
                  >
                    DELETE
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
