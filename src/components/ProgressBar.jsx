export default function ProgressBar({ value }) {
  const pct = Math.max(0, Math.min(1, value ?? 0));
  return (
    <div className="h-2 w-full rounded-full bg-neutral-800">
      <div
        className="h-2 rounded-full bg-sky-500"
        style={{ width: `${pct * 100}%` }}
      />
    </div>
  );
}
