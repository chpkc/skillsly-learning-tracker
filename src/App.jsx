import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import ResourcesView from "./components/ResourcesTable";
import SkillsView from "./components/SkillsView";
import SplashScreen from "./components/SplashScreen";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminDashboard from "./components/Admin/AdminDashboard";
import { StoreProvider } from "./context/StoreContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthPage from "./components/Auth/AuthPage";

function AppContent() {
  const { session } = useAuth();
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (window.location.pathname.startsWith('/admin')) {
      setIsAdmin(true);
    }
    
    // The splash screen logic
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // If supabase is not configured, show an error message
  if (!useAuth) {
      return <div>Supabase not configured.</div>
  }

  // If no session, show Auth page
  if (!session) {
    return <AuthPage />;
  }

  // If admin route, show admin panel
  if (isAdmin) {
    return (
      <AdminLayout onExit={() => {
        window.history.pushState(null, '', '/');
        setIsAdmin(false);
      }}>
        <AdminDashboard />
      </AdminLayout>
    );
  }

  // Main App for logged-in user
  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <SplashScreen key="splash" />}
      </AnimatePresence>

      {!loading && (
        <Layout currentTab={currentTab} onTabChange={setCurrentTab}>
          {currentTab === "dashboard" && <Dashboard key="dashboard" />}
          {currentTab === "resources" && <ResourcesView key="resources" />}
          {currentTab === "skills" && <SkillsView key="skills" />}
        </Layout>
      )}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <AppContent />
      </StoreProvider>
    </AuthProvider>
  );
}
