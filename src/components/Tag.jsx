export default function Tag({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs ring-1 ring-inset ${className}`}
    >
      {children}
    </span>
  );
}
