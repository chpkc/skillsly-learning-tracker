import { motion } from "framer-motion";
import { BookOpen, Zap, Activity, ArrowRight } from "lucide-react";
import { useStore } from "../context/StoreContext";

const MotionDiv = motion.div;

export default function Dashboard() {
  const { resources, skills } = useStore();

  const recentResources = resources.slice(0, 3);
  
  const totalResources = resources.length;
  const totalSkills = skills.length;
  
  const stats = [
    {
      icon: BookOpen,
      label: "Total Resources",
      value: totalResources,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      icon: Zap,
      label: "Skills Tracked",
      value: totalSkills,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      icon: Activity,
      label: "Active Learning",
      value: resources.length > 0 ? "Active" : "Idle",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-neutral-400">Overview of your learning progress</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s, i) => (
          <MotionDiv
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-neutral-400">{s.label}</p>
                <p className="mt-2 text-3xl font-semibold text-white truncate" title={s.value}>
                  {s.value}
                </p>
              </div>
              <div className={`shrink-0 rounded-lg p-2 ${s.bg}`}>
                <s.icon className={`size-5 ${s.color}`} />
              </div>
            </div>
          </MotionDiv>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Recent Activity */}
        <MotionDiv
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white">Recent Activity</h3>
            <span className="text-xs text-neutral-500">Last 3 items</span>
          </div>
          
          {recentResources.length > 0 ? (
            <div className="space-y-4">
              {recentResources.map((r) => (
                <div key={r.id} className="group flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900 p-3 transition-colors hover:border-neutral-700">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-neutral-800 text-neutral-400">
                      <BookOpen className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-200 group-hover:text-white transition-colors">{r.title}</p>
                      <p className="text-xs text-neutral-500">{r.topic} • {new Date(r.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <a href={r.url} target="_blank" rel="noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400 hover:text-white">
                    <ArrowRight className="size-4" />
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="rounded-full bg-neutral-800/50 p-3 mb-3">
                <Activity className="size-5 text-neutral-600" />
              </div>
              <p className="text-sm text-neutral-400">No recent activity found</p>
            </div>
          )}
        </MotionDiv>
      </div>
    </div>
  );
}
