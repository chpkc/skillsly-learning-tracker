import { ExternalLink, PlayCircle, FileText, Book, GraduationCap, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { TOPICS } from "../data/constants";
import { useStore } from "../context/StoreContext";
import AddResourceModal from "./AddResourceModal";

const MotionDiv = motion.div;

function TypeBadge({ type }) {
  const t = type.toLowerCase();
  let style = "bg-neutral-800 text-neutral-300 ring-neutral-700";
  let icon = <FileText className="size-3.5" />;

  if (t === "video") {
    style = "bg-indigo-500/20 text-indigo-300 ring-indigo-500/40";
    icon = <PlayCircle className="size-3.5" />;
  } else if (t === "article") {
    style = "bg-amber-500/20 text-amber-300 ring-amber-500/40";
    icon = <FileText className="size-3.5" />;
  } else if (t === "book") {
    style = "bg-emerald-500/20 text-emerald-300 ring-emerald-500/40";
    icon = <Book className="size-3.5" />;
  } else if (t === "course") {
    style = "bg-purple-500/20 text-purple-300 ring-purple-500/40";
    icon = <GraduationCap className="size-3.5" />;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${style}`}>
      {icon} {type}
    </span>
  );
}

export default function ResourcesView() {
  const { resources, skills } = useStore();
  const [search, setSearch] = useState("");
  const [topicFilter, setTopicFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = resources.filter((r) => {
    const matchesTopic = topicFilter === "All" || r.topic === topicFilter;
    const matchesSearch =
      !search.trim() ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.topic.toLowerCase().includes(search.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  const getSkillMeta = (id) => skills.find((s) => s.id === id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Resources</h1>
          <p className="mt-1 text-sm text-neutral-400">Library of learning materials</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-neutral-200 transition-colors shadow-lg shadow-white/5"
        >
          Add Resource
        </button>
      </div>

      <MotionDiv
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources..."
            className="w-full rounded-lg border border-neutral-800 bg-neutral-900/50 pl-9 pr-4 py-2 text-sm text-white placeholder:text-neutral-600 focus:border-neutral-700 focus:outline-none focus:ring-1 focus:ring-neutral-700"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="size-4 text-neutral-500" />
          <select
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
            className="rounded-lg border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-sm text-white focus:border-neutral-700 focus:outline-none focus:ring-1 focus:ring-neutral-700"
          >
            <option>All</option>
            {TOPICS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </MotionDiv>

      {filtered.length === 0 ? (
        <MotionDiv
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-800 py-16 text-center"
        >
          <div className="rounded-full bg-neutral-900 p-3">
            <Book className="size-6 text-neutral-500" />
          </div>
          <h3 className="mt-4 text-sm font-medium text-white">No resources found</h3>
          <p className="mt-1 text-sm text-neutral-500">
            {resources.length === 0
              ? "Start building your library by adding resources."
              : "Try adjusting your filters or search terms."}
          </p>
          {resources.length === 0 && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 text-sm font-medium text-blue-500 hover:text-blue-400"
            >
              Add your first resource
            </button>
          )}
        </MotionDiv>
      ) : (
        <MotionDiv
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50"
        >
          <table className="w-full text-left text-sm">
            <thead className="border-b border-neutral-800 bg-neutral-900 text-xs font-medium text-neutral-400 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3">Resource</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Topic</th>
                <th className="px-6 py-3">Skills</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {filtered.map((r, i) => (
                <MotionDiv
                  as="tr"
                  key={r.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.3 + (i * 0.05) }}
                  className="group hover:bg-neutral-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{r.title}</div>
                    {r.description && (
                      <div className="mt-0.5 text-xs text-neutral-500 line-clamp-1">
                        {r.description}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <TypeBadge type={r.type} />
                  </td>
                  <td className="px-6 py-4 text-neutral-300">{r.topic}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {r.skills.map((sId) => {
                        const meta = getSkillMeta(sId);
                        if (!meta) return null;
                        return (
                          <span
                            key={sId}
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset ${meta.color}`}
                          >
                            {meta.name}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
                    >
                      Visit <ExternalLink className="size-3" />
                    </a>
                  </td>
                </MotionDiv>
              ))}
            </tbody>
          </table>
        </MotionDiv>
      )}

      <AddResourceModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
