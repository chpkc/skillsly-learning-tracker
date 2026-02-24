"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Check, X } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function SkillsView() {
  const { skills, addSkill, updateSkill } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newSkillName, setNewSkillName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    
    // Assign a random color from a preset palette
    const colors = [
      "bg-blue-500/20 text-blue-300 ring-blue-500/40",
      "bg-green-500/20 text-green-300 ring-green-500/40",
      "bg-purple-500/20 text-purple-300 ring-purple-500/40",
      "bg-orange-500/20 text-orange-300 ring-orange-500/40",
      "bg-pink-500/20 text-pink-300 ring-pink-500/40",
      "bg-teal-500/20 text-teal-300 ring-teal-500/40",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    addSkill({
      name: newSkillName,
      color: randomColor,
      created_at: new Date().toISOString(),
    });
    setNewSkillName("");
    setIsAdding(false);
  };

  const startEditing = (skill) => {
    setEditingId(skill.id);
    setEditName(skill.name);
  };

  const saveEdit = () => {
    if (editName.trim()) {
      updateSkill(editingId, { name: editName });
    }
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Skills</h1>
          <p className="mt-1 text-sm text-neutral-400">Manage your learning path</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-neutral-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Skill
        </button>
      </div>

      {isAdding && (
        <motion.form
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleAdd}
          className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4"
        >
          <div className="flex gap-3">
            <input
              autoFocus
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="e.g., React Performance, SQL Indexing..."
              className="flex-1 rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-white placeholder:text-neutral-600 focus:border-neutral-700 focus:outline-none focus:ring-1 focus:ring-neutral-700"
            />
            <button
              type="submit"
              className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-neutral-200"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="rounded-md border border-neutral-700 px-4 py-2 text-sm font-medium text-neutral-300 hover:bg-neutral-800"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="group relative flex flex-col justify-between rounded-xl border border-neutral-800 bg-neutral-900/50 p-5 transition-colors hover:border-neutral-700 min-h-[120px]"
          >
            <div className="flex items-start justify-between">
              {editingId === skill.id ? (
                <div className="flex flex-1 items-center gap-2">
                  <input
                    autoFocus
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 rounded border border-neutral-700 bg-neutral-950 px-2 py-1 text-sm text-white focus:outline-none focus:border-neutral-600"
                  />
                  <button onClick={saveEdit} className="p-1 text-green-500 hover:text-green-400">
                    <Check className="size-4" />
                  </button>
                  <button onClick={() => setEditingId(null)} className="p-1 text-red-500 hover:text-red-400">
                    <X className="size-4" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <div className={`size-3 rounded-full ${skill.color?.split(' ')[0] || 'bg-neutral-500'}`} />
                    <h3 className="font-medium text-neutral-200">{skill.name}</h3>
                  </div>
                  <button
                    onClick={() => startEditing(skill)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-neutral-500 hover:text-white transition-opacity"
                  >
                    <Edit2 className="size-3.5" />
                  </button>
                </>
              )}
            </div>
            
            <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
              <span>Added {new Date(skill.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Zap({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
