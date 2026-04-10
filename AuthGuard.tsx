import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { useEffect } from "react";
import { useLocation } from "wouter";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();
  const profileQuery = trpc.user.profile.useQuery(undefined, {
    enabled: !!user,
    retry: false,
  });

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = getLoginUrl();
    }
  }, [loading, user]);

  useEffect(() => {
    if (profileQuery.data && !profileQuery.data.agreementAccepted) {
      navigate("/agreement");
    }
  }, [profileQuery.data, navigate]);

  if (loading || profileQuery.isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl font-black tracking-tighter mb-4">OCAT</div>
          <div className="text-xs font-mono tracking-widest text-gray-400 uppercase">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
