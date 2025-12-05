import React, { useEffect, useRef, useState } from "react";
import "./ToolbarBottom.scss";
import ClaimButton from "../ClaimButton/ClaimButton";

export default function ToolbarBottom() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  // بسته شدن popup در کلیک بیرون
  useEffect(() => {
    function handleDocClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleDocClick);
    return () => document.removeEventListener("click", handleDocClick);
  }, []);

  return (
    <div className="toolbar-bottom d-md-none">
      <div className="tb-claim-wrapper" ref={wrapperRef}>
        <div className="claim-row">
          <ClaimButton
            commission={0.34}
            cap={1.0}
            onClaim={() => {}}
            dropDirection="up" 
          />
        </div>
      </div>
    </div>
  );
}
