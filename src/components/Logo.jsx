// components/Logo.jsx
import { APP_NAME } from "../utils/constants";

export default function Logo({ variant = "default", scrolled = false }) {
 
  const isWhite = variant === "light" || (variant === "nav" && scrolled);

  return (
    <div className="flex items-center gap-2 h-9">
      <svg
        width="36"
        height="36"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 2.5L3.75 10L20 17.5L36.25 10L20 2.5Z"
          fill={isWhite ? "white" : "#1E3A8A"}
        />
        <path
          d="M3.75 17.5V27.5L20 35L36.25 27.5V17.5L20 25L3.75 17.5Z"
          fill={isWhite ? "#93C5FD" : "#0F766E"}
        />
        <circle cx="20" cy="20" r="3" fill={isWhite ? "#1E3A8A" : "white"} />
      </svg>
      <span className={`font-['Poppins'] font-bold text-[27px] leading-[27px] transition-colors duration-300 ${
        isWhite ? 'text-white' : 'text-[#1E3A8A]'
      }`}>
        {APP_NAME}
      </span>
    </div>
  );
}