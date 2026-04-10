import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getSeverityLabel } from "@shared/ocat";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import OcatLayout from "@/components/OcatLayout";

export default function Profile() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [show2FADisable, setShow2FADisable] = useState(false);
  const [verifyToken, setVerifyToken] = useState("");
  const [disableToken, setDisableToken] = useState("");
  const [qrData, setQrData] = useState<{ qrCodeDataUrl: string; secret: string } | null>(null);

  const profileQuery = trpc.user.profile.useQuery();
  const myReportsQuery = trpc.reports.myReports.useQuery({ limit: 20, offset: 0 });
  const utils = trpc.useUtils();

  const setup2FAMutation = trpc.user.setup2FA.useMutation({
    onSuccess: (data) => {
      setQrData(data);
      setShow2FASetup(true);
    },
    onError: (err) => toast.error(err.message),
  });

  const verify2FAMutation = trpc.user.verify2FA.useMutation({
    onSuccess: () => {
      toast.success("2FA enabled successfully!");
      setShow2FASetup(false);
      setQrData(null);
      setVerifyToken("");
      utils.user.profile.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  const disable2FAMutation = trpc.user.disable2FA.useMutation({
    onSuccess: () => {
      toast.success("2FA disabled.");
      setShow2FADisable(false);
      setDisableToken("");
      utils.user.profile.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  const profile = profileQuery.data;
  const myReports = myReportsQuery.data?.rows ?? [];
  const myTotal = myReportsQuery.data?.total ?? 0;

  return (
    <OcatLayout>
      <div className="p-6 lg:p-10 max-w-3xl">
        {/* Header */}
        <div className="mb-10 border-b-4 border-black pb-6">
          <div className="text-[10px] font-mono tracking-[0.3em] text-gray-400 uppercase mb-2">
            [ Account ]
          </div>
          <h1 className="text-6xl font-black tracking-tighter leading-none">
            MY<br />
            <span className="text-[oklch(0.75_0.18_85)]">PROFILE</span>
          </h1>
        </div>

        {/* Account Info */}
        <div className="border-3 border-black mb-6" style={{ border: "3px solid black" }}>
          <div className="bg-black text-white px-6 py-3">
            <div className="text-[10px] font-mono tracking-widest uppercase">Account Information</div>
          </div>
          <div className="p-6 grid sm:grid-cols-2 gap-6">
            <div>
              <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-1">Display Name</div>
              <div className="font-black text-lg">{user?.name ?? "—"}</div>
            </div>
            <div>
              <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-1">Email</div>
              <div className="font-mono text-sm">{user?.email ?? "—"}</div>
            </div>
            <div>
              <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-1">Role</div>
              <div className="font-black text-sm uppercase">{profile?.role ?? "user"}</div>
            </div>
            <div>
              <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-1">Member Since</div>
              <div className="font-mono text-sm">
                {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "—"}
              </div>
            </div>
            <div>
              <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-1">Agreement Status</div>
              <div className={`font-black text-sm uppercase ${profile?.agreementAccepted ? "text-green-600" : "text-red-600"}`}>
                {profile?.agreementAccepted ? "✓ ACCEPTED" : "✗ PENDING"}
              </div>
            </div>
            <div>
              <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-1">Total Allegations Filed</div>
              <div className="font-black text-2xl">{myTotal}</div>
            </div>
          </div>
        </div>

        {/* 2FA Section */}
        <div className="border-3 border-black mb-6" style={{ border: "3px solid black" }}>
          <div className="bg-black text-white px-6 py-3 flex items-center justify-between">
            <div className="text-[10px] font-mono tracking-widest uppercase">Two-Factor Authentication</div>
            <div className={`text-[9px] font-mono font-bold uppercase tracking-widest ${profile?.twoFactorEnabled ? "text-green-400" : "text-white/40"}`}>
              {profile?.twoFactorEnabled ? "● ENABLED" : "○ DISABLED"}
            </div>
          </div>
          <div className="p-6">
            <p className="text-sm font-mono text-gray-500 mb-4 leading-relaxed">
              Two-factor authentication adds an extra layer of security to your account using a TOTP authenticator app (Google Authenticator, Authy, etc.).
            </p>

            {!profile?.twoFactorEnabled ? (
              <div>
                {!show2FASetup ? (
                  <button
                    onClick={() => setup2FAMutation.mutate()}
                    disabled={setup2FAMutation.isPending}
                    className="border-3 border-black bg-black text-white font-black text-xs tracking-widest uppercase px-6 py-3 hover:bg-white hover:text-black transition-all disabled:opacity-50"
                    style={{ border: "3px solid black" }}
                  >
                    {setup2FAMutation.isPending ? "GENERATING..." : "ENABLE 2FA →"}
                  </button>
                ) : qrData && (
                  <div className="space-y-4">
                    <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-3">
                      Scan this QR code with your authenticator app:
                    </div>
                    <img src={qrData.qrCodeDataUrl} alt="2FA QR Code" className="border-3 border-black w-40 h-40" style={{ border: "3px solid black" }} />
                    <div className="bg-gray-50 border-2 border-black p-3">
                      <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-1">Manual Entry Key</div>
                      <div className="font-mono text-xs break-all">{qrData.secret}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-2">
                        Enter the 6-digit code from your app to verify:
                      </div>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          maxLength={6}
                          value={verifyToken}
                          onChange={(e) => setVerifyToken(e.target.value.replace(/\D/g, ""))}
                          placeholder="000000"
                          className="border-3 border-black p-3 font-mono text-xl tracking-widest w-36 text-center focus:outline-none"
                          style={{ border: "3px solid black" }}
                        />
                        <button
                          onClick={() => verify2FAMutation.mutate({ token: verifyToken })}
                          disabled={verifyToken.length !== 6 || verify2FAMutation.isPending}
                          className="border-3 border-black bg-black text-white font-black text-xs tracking-widest uppercase px-6 hover:bg-white hover:text-black transition-all disabled:opacity-50"
                          style={{ border: "3px solid black" }}
                        >
                          {verify2FAMutation.isPending ? "VERIFYING..." : "VERIFY & ACTIVATE"}
                        </button>
                      </div>
                    </div>
                    <button onClick={() => { setShow2FASetup(false); setQrData(null); }} className="text-[10px] font-mono text-gray-400 uppercase tracking-widest hover:text-black">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-mono text-gray-600">Your account is protected with 2FA.</span>
                </div>
                {!show2FADisable ? (
                  <button
                    onClick={() => setShow2FADisable(true)}
                    className="border-2 border-red-600 text-red-600 font-black text-xs tracking-widest uppercase px-6 py-3 hover:bg-red-600 hover:text-white transition-all"
                  >
                    DISABLE 2FA
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                      Enter your current 2FA code to confirm:
                    </div>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        maxLength={6}
                        value={disableToken}
                        onChange={(e) => setDisableToken(e.target.value.replace(/\D/g, ""))}
                        placeholder="000000"
                        className="border-3 border-black p-3 font-mono text-xl tracking-widest w-36 text-center focus:outline-none"
                        style={{ border: "3px solid black" }}
                      />
                      <button
                        onClick={() => disable2FAMutation.mutate({ token: disableToken })}
                        disabled={disableToken.length !== 6 || disable2FAMutation.isPending}
                        className="border-2 border-red-600 bg-red-600 text-white font-black text-xs tracking-widest uppercase px-6 hover:bg-white hover:text-red-600 transition-all disabled:opacity-50"
                      >
                        {disable2FAMutation.isPending ? "DISABLING..." : "CONFIRM DISABLE"}
                      </button>
                    </div>
                    <button onClick={() => { setShow2FADisable(false); setDisableToken(""); }} className="text-[10px] font-mono text-gray-400 uppercase tracking-widest hover:text-black">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* My Submissions */}
        <div className="border-3 border-black mb-6" style={{ border: "3px solid black" }}>
          <div className="bg-black text-white px-6 py-3 flex items-center justify-between">
            <div className="text-[10px] font-mono tracking-widest uppercase">My Submission History</div>
            <div className="text-[9px] font-mono text-white/40">{myTotal} total</div>
          </div>
          <div>
            {myReportsQuery.isLoading ? (
              <div className="p-6 text-center text-xs font-mono text-gray-400 uppercase tracking-widest">Loading...</div>
            ) : myReports.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-2xl font-black text-gray-200 mb-2">NO SUBMISSIONS</div>
                <div className="text-xs font-mono text-gray-400 uppercase tracking-widest">You haven't filed any allegations yet</div>
              </div>
            ) : (
              <div className="divide-y-2 divide-black">
                {myReports.map((report) => {
                  const sev = getSeverityLabel(report.severityScore);
                  return (
                    <div
                      key={report.id}
                      className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 cursor-pointer transition-all"
                      onClick={() => navigate(`/report/${report.ocatId}`)}
                    >
                      <div>
                        <div className="font-mono text-xs font-bold text-gray-400 mb-0.5">{report.ocatId}</div>
                        <div className="font-black text-sm uppercase">{report.casinoName}</div>
                        <div className="text-[9px] font-mono text-gray-400">{new Date(report.createdAt).toLocaleDateString()}</div>
                      </div>
                      <div className={`text-xs font-black uppercase tracking-widest ${sev.color}`}>
                        {report.severityScore}% {sev.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Sign Out */}
        <div className="border-t-2 border-black pt-6">
          <button
            onClick={logout}
            className="border-3 border-black font-black text-xs tracking-widest uppercase px-8 py-3 hover:bg-black hover:text-white transition-all"
            style={{ border: "3px solid black" }}
          >
            SIGN OUT →
          </button>
        </div>
      </div>
    </OcatLayout>
  );
}
