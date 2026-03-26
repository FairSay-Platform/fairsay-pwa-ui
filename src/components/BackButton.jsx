import { Link } from "react-router-dom";

function ChevronLeft() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block align-middle"
    >
      <path
        d="M15 19l-7-7 7-7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Use this when the back button lives inside a custom layout (e.g. a header flex row)
export function BackButtonLink({ to, label, variant = "blue", className = "" }) {
  const baseClass =
    variant === "gray"
      ? "inline-flex items-center gap-2 text-gray-500 hover:text-gray-600 font-medium text-base"
      : "inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-base mr-2 lg:mr-4";

  return (
    <Link
      to={to}
      className={`${baseClass} ${className}`.trim()}
      style={{ textDecoration: "none" }}
      aria-label={label}
    >
      <ChevronLeft />
      <span className="align-middle" style={{ lineHeight: 1 }}>
        {label}
      </span>
    </Link>
  );
}

// Default export — renders the link inside its own positioned wrapper.
// variant="blue"  → right-aligned bar below <Navbar /> (standard pages)
// variant="gray"  → right-aligned inside a max-width container (profile pages)
//   maxWidth      → Tailwind max-w class to match the page's content container
//                   defaults: blue → "max-w-[95%]", gray → "max-w-7xl"
export default function BackButton({ to, label, variant = "blue", maxWidth }) {
  if (variant === "gray") {
    const mw = maxWidth || "max-w-7xl";
    return (
      <div className={`${mw} mx-auto px-4 pt-6`}>
        <div className="mb-4 flex justify-end">
          <BackButtonLink to={to} label={label} variant="gray" />
        </div>
      </div>
    );
  }

  const mw = maxWidth || "max-w-[95%]";
  return (
    <div className={`${mw} mx-auto px-4 pt-4 mb-2 flex items-center justify-end`}>
      <BackButtonLink to={to} label={label} variant="blue" />
    </div>
  );
}
