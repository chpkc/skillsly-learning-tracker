import { LayoutDashboard, Library, Zap, LogOut, User, Menu, ChevronLeft, BookOpen, Download, Kanban } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useStore } from "../context/StoreContext";

const NavItem = ({ id, label, current, onTabChange, icon: Icon }) => (
  <button
    onClick={() => onTabChange(id)}
    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      current === id
        ? "bg-neutral-800 text-white"
        : "text-neutral-400 hover:bg-neutral-800/50 hover:text-white"
    }`}
  >
    <Icon className="size-4 shrink-0" />
    {label}
  </button>
);

export default function Layout({ children, currentTab, onTabChange }) {
  const { user, signOut } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Removed handleExport and related logic as requested for MVP reset

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleTabChange = (id) => {
    onTabChange(id);
    if (isMobile) setIsSidebarOpen(false);
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "resources", label: "Resources", icon: Library },
    { id: "skills", label: "Skills", icon: Zap },
  ];

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "-100%", opacity: 0 },
  };

  return (
    <div className="flex min-h-screen bg-neutral-950 text-neutral-300">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/60"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={isSidebarOpen ? "open" : "closed"}
        variants={isMobile ? sidebarVariants : { open: { width: 256, opacity: 1, x: 0 }, closed: { width: 0, opacity: 0, x: -256 } }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed inset-y-0 left-0 z-40 flex flex-col overflow-hidden border-r border-neutral-800 bg-neutral-950 ${
          isMobile ? "w-64 shadow-2xl" : "w-64"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-neutral-800 min-w-[256px]">
          <div className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white whitespace-nowrap">
            <BookOpen className="size-5 text-blue-500" />
            skillsly
          </div>
          {isMobile && (
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
            >
              <ChevronLeft className="size-5" />
            </button>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-1 min-w-[256px]">
          {tabs.map((tab) => (
            <NavItem key={tab.id} {...tab} current={currentTab} onTabChange={handleTabChange} />
          ))}
        </nav>

        <div className="p-4 border-t border-neutral-800 min-w-[256px] space-y-1">
          {user && (
            <div className="flex items-center gap-3 px-3 py-2 mb-2 rounded-lg bg-neutral-900/50">
              <User className="size-4 text-neutral-500" />
              <span className="text-xs font-medium text-neutral-300 truncate">{user.email}</span>
            </div>
          )}
          <button 
            onClick={signOut}
            className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-500/80 hover:bg-red-500/10 hover:text-red-500 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        animate={{ 
          marginLeft: !isMobile && isSidebarOpen ? 256 : 0 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex-1 p-4 sm:p-8 relative min-w-0"
      >
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="fixed top-4 left-4 z-20 rounded-lg p-2 text-neutral-300 bg-neutral-900/50 backdrop-blur-sm hover:bg-neutral-800 hover:text-white transition-colors md:hidden"
          >
            <Menu className="size-5" />
          </button>
        )}
        
        <div className={`transition-all duration-300 ${!isSidebarOpen && isMobile ? 'pt-12' : ''}`}>
          {children}
        </div>
      </motion.main>
    </div>
  );
}
