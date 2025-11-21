import "./tooltip.css";

export default function TooltipCard({
  children,
  title = "Information",
  description = "This is a tooltip with detailed information.",
  badge = "Premium Feature",
  verticalPosition = "top", // 'top' | 'bottom'
  horizontalPosition = "center", // 'left' | 'center' | 'right'
  mobileVerticalPosition = "top",
  mobileHorizontalPosition = "center",
}) {
  return (
    <div
      className={`tooltip-wrapper 
                  ${verticalPosition}-desktop ${horizontalPosition}-desktop
                  ${mobileVerticalPosition}-mobile ${mobileHorizontalPosition}-mobile`}
    >
      <div className="tooltip-trigger">{children}</div>

      <div className="custom-tooltip">
        <div className="tooltip-content">
          <div className="tooltip-header">
            <div className="tooltip-icon">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                width="18"
                height="18"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                />
              </svg>
            </div>
            <h3 className="tooltip-title">{title}</h3>
          </div>

          <p className="tooltip-desc">{description}</p>

          {badge && (
            <div className="tooltip-badge">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                width="16"
                height="16"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                />
              </svg>
              <span>{badge}</span>
            </div>
          )}

          <div className="tooltip-arrow"></div>
        </div>
      </div>
    </div>
  );
}
