import { useState } from "react";
import { X, Link2, ListFilter, BookMarked, AlignLeft, Tag as TagIcon } from "lucide-react";
import { TOPICS } from "../data/constants";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../context/StoreContext";

const MotionDiv = motion.div;

export default function AddResourceModal({ open, onClose }) {
  const { addResource, skills } = useStore();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Article");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  function toggleSkill(id) {
    setSelectedSkills((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    addResource({ title, url, description, type, topic, skills: selectedSkills });
    handleClose();
  }

  function handleClose() {
    // Reset form
    setTitle("");
    setUrl("");
    setDescription("");
    setType("Article");
    setTopic(TOPICS[0]);
    setSelectedSkills([]);
    onClose();
  }

  // Effect to reset/set initial skills when modal opens
  // We use key on AnimatePresence or MotionDiv to reset state if needed, but manual reset is safer here.

  return (
    <AnimatePresence>
      {open && (
        <MotionDiv
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <MotionDiv
            key="modal-content"
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="w-full max-w-lg overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
              <div className="text-lg font-medium text-white">
                Add New Resource
              </div>
              <button
                onClick={handleClose}
                className="rounded-md p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    <BookMarked className="size-3.5" /> Title
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Advanced React Patterns"
                    required
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:border-neutral-700 focus:outline-none focus:ring-1 focus:ring-neutral-700 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    <Link2 className="size-3.5" /> URL
                  </label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://..."
                    required
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:border-neutral-700 focus:outline-none focus:ring-1 focus:ring-neutral-700 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    <AlignLeft className="size-3.5" /> Description (Optional)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief summary..."
                    rows={2}
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:border-neutral-700 focus:outline-none focus:ring-1 focus:ring-neutral-700 transition-all resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-xs font-medium text-neutral-400 uppercase tracking-wider">
                      <ListFilter className="size-3.5" /> Type
                    </label>
                    <div className="relative">
                      <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm text-white focus:border-neutral-700 focus:outline-none focus:ring-1 focus:ring-neutral-700 transition-all"
                      >
                        <option>Article</option>
                        <option>Video</option>
                        <option>Course</option>
                        <option>Book</option>
                        <option>Tool</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500">
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-xs font-medium text-neutral-400 uppercase tracking-wider">
                      <TagIcon className="size-3.5" /> Topic
                    </label>
                    <div className="relative">
                      <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm text-white focus:border-neutral-700 focus:outline-none focus:ring-1 focus:ring-neutral-700 transition-all"
                      >
                        {TOPICS.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500">
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Skills
                  </label>
                  {skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2 rounded-lg border border-neutral-800 bg-neutral-950/50 p-3">
                      {skills.map((s) => {
                        const isSelected = selectedSkills.includes(s.id);
                        return (
                          <button
                            type="button"
                            key={s.id}
                            onClick={() => toggleSkill(s.id)}
                            className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                              isSelected
                                ? "bg-neutral-100 text-neutral-900 ring-0"
                                : "bg-neutral-900 text-neutral-400 ring-1 ring-neutral-800 hover:bg-neutral-800 hover:text-neutral-200"
                            }`}
                          >
                            {s.name}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="rounded-lg border border-dashed border-neutral-800 p-4 text-center text-xs text-neutral-500">
                      No skills available. Add skills in the Skills tab first.
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-white px-6 py-2 text-sm font-medium text-black hover:bg-neutral-200 transition-colors shadow-lg shadow-white/5"
                >
                  Add Resource
                </button>
              </div>
            </form>
          </MotionDiv>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
}
