import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Gateway from "./pages/Gateway";
import Agreement from "./pages/Agreement";
import Dashboard from "./pages/Dashboard";
import ReportDetail from "./pages/ReportDetail";
import Analytics from "./pages/Analytics";
import Matrix from "./pages/Matrix";
import Operators from "./pages/Operators";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import AuthGuard from "./components/AuthGuard";
import AdminGuard from "./components/AdminGuard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Gateway} />
      <Route path="/agreement" component={Agreement} />
      <Route path="/dashboard">
        <AuthGuard><Dashboard /></AuthGuard>
      </Route>
      <Route path="/report/:ocatId">
        {(params) => <AuthGuard><ReportDetail ocatId={params.ocatId} /></AuthGuard>}
      </Route>
      <Route path="/analytics">
        <AuthGuard><Analytics /></AuthGuard>
      </Route>
      <Route path="/matrix">
        <AuthGuard><Matrix /></AuthGuard>
      </Route>
      <Route path="/operators">
        <AuthGuard><Operators /></AuthGuard>
      </Route>
      <Route path="/profile">
        <AuthGuard><Profile /></AuthGuard>
      </Route>
      <Route path="/admin/dashboard">
        <AdminGuard><AdminDashboard /></AdminGuard>
      </Route>
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
