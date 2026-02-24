import { useMemo, useState } from "react";
import { RESOURCES } from "../data/mock";

export function useResources() {
  const [resources, setResources] = useState(RESOURCES);
  const [topicFilter, setTopicFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return resources
      .filter((r) => (topicFilter === "All" ? true : r.topic === topicFilter))
      .filter((r) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          r.title.toLowerCase().includes(q) ||
          r.type.toLowerCase().includes(q) ||
          r.topic.toLowerCase().includes(q) ||
          r.skills.join(" ").toLowerCase().includes(q)
        );
      });
  }, [resources, topicFilter, search]);

  function addResource({ title, url, type, topic, skills }) {
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString().slice(0, 10);
    setResources((prev) => [
      { id, title, url, type, topic, skills, createdAt },
      ...prev,
    ]);
  }

  return {
    resources,
    filtered,
    topicFilter,
    setTopicFilter,
    search,
    setSearch,
    addResource,
    setResources,
  };
}
