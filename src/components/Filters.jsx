import { TOPICS } from "../data/mock";
import { Search, Filter } from "lucide-react";

export default function Filters({ topic, onTopicChange, search, onSearch }) {
  const topics = ["All", ...TOPICS];
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2">
        <Filter className="size-4 text-neutral-400" />
        <div className="flex gap-2">
          {topics.map((t) => (
            <button
              key={t}
              className={`rounded-md px-2.5 py-1 text-sm ${
                topic === t
                  ? "bg-neutral-800 text-neutral-100"
                  : "text-neutral-300 hover:text-white"
              }`}
              onClick={() => onTopicChange(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2">
        <Search className="size-4 text-neutral-400" />
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Поиск по названию, типу, теме, навыкам…"
          className="w-64 bg-transparent text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none"
        />
      </div>
    </div>
  );
}
