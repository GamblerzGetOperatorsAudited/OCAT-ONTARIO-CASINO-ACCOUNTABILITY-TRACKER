import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

type UserRole = "user" | "admin";

interface User {
  id: number;
  name: string | null;
  email: string | null;
  role: UserRole;
  createdAt: Date;
  twoFactorEnabled: boolean;
}

export default function AdminUsersTable() {
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  
  const listQuery = trpc.admin.users.list.useQuery({ limit, offset });
  const updateRoleMutation = trpc.admin.users.updateRole.useMutation();

  const handleRoleChange = async (userId: number, newRole: UserRole) => {
    try {
      await updateRoleMutation.mutateAsync({ userId, role: newRole });
      await listQuery.refetch();
      toast.success("User role updated");
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  const users = (listQuery.data?.rows ?? []) as User[];
  const total = listQuery.data?.total ?? 0;

  return (
    <div className="space-y-4">
      {/* Pagination Info */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Showing {offset + 1} to {Math.min(offset + limit, total)} of {total} users
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

      {/* Users Table */}
      <div className="border-2 border-black overflow-x-auto">
        <Table>
          <TableHeader className="bg-black text-white">
            <TableRow className="hover:bg-black">
              <TableHead className="text-white font-black">NAME</TableHead>
              <TableHead className="text-white font-black">EMAIL</TableHead>
              <TableHead className="text-white font-black">ROLE</TableHead>
              <TableHead className="text-white font-black">MEMBER SINCE</TableHead>
              <TableHead className="text-white font-black">2FA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="border-b border-gray-200">
                <TableCell className="font-bold">{user.name || "—"}</TableCell>
                <TableCell className="text-sm">{user.email || "—"}</TableCell>
                <TableCell>
                  <Select value={user.role} onValueChange={(val) => handleRoleChange(user.id, val as UserRole)}>
                    <SelectTrigger className="w-24 border-black rounded-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">USER</SelectItem>
                      <SelectItem value="admin">ADMIN</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-sm">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs font-bold border border-black rounded-none ${user.twoFactorEnabled ? 'bg-green-100' : 'bg-gray-100'}`}>
                    {user.twoFactorEnabled ? '✓ ENABLED' : 'DISABLED'}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
