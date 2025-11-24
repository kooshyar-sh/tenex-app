import { useState, useRef, useEffect } from "react";
import "./CustomSelectFlex.css";

export default function CustomSelectFlex({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div className="my-select" ref={ref}>
      <div className="my-select-header" onClick={() => setOpen(!open)}>
        <span>{options.find((o) => o.value === value)?.label}</span>
        <i className="bi bi-chevron-down"></i>
      </div>

      {open && (
        <div className="my-select-menu">
          {options.map((opt) => (
            <div
              key={opt.value}
              className="my-select-item"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
