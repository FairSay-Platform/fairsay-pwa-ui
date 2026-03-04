export default function StepIndicator({ steps, variant = "light" }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center gap-3">
          {/* Step Circle */}
          <div className="flex items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-inter font-semibold text-sm transition-colors ${
                step.status === "completed"
                  ? "bg-fairsay-teal text-white"
                  : step.status === "current"
                  ? "bg-fairsay-blue text-white"
                  : "bg-fairsay-gray-200 text-fairsay-gray-400"
              }`}
            >
              {step.status === "completed" ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6667 5L7.50004 14.1667L3.33337 10"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                step.number
              )}
            </div>
            <span
              className={`font-inter text-sm font-medium ${
                variant === "dark"
                  ? step.status === "upcoming"
                    ? "text-white/50"
                    : "text-white"
                  : step.status === "upcoming"
                  ? "text-fairsay-gray-400"
                  : "text-fairsay-gray-900"
              }`}
            >
              {step.label}
            </span>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={`w-8 h-0.5 ${
                step.status === "completed"
                  ? "bg-fairsay-teal"
                  : "bg-fairsay-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
