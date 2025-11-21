import React, { useRef, useState, useEffect } from "react";
import "./Accordion.css";

export default function Accordion({
  title,
  children,
  defaultOpen = false,
  allowMultiple = true,
  groupId, // برای مدیریت گروهی مشابه allowMultiple در Angular
}) {
  const bodyRef = useRef(null);
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // ثبت آکوردین‌ها در سطح window برای رفتار allowMultiple = false
  useEffect(() => {
    if (!groupId) return;

    window._accordionGroups = window._accordionGroups || {};
    window._accordionGroups[groupId] = window._accordionGroups[groupId] || [];

    window._accordionGroups[groupId].push({
      toggle: () => setIsOpen(false),
      ref: bodyRef,
    });
  }, []);

  // کنترل باز/بسته شدن هنگام رندر اولیه
  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;

    if (isOpen) {
      body.style.maxHeight = body.scrollHeight + "px";
    } else {
      body.style.maxHeight = "0px";
    }
  }, [isOpen]);

  const toggleAccordion = () => {
    if (!isOpen && groupId && !allowMultiple) {
      // بستن بقیه آکوردین‌ها
      const all = window._accordionGroups[groupId] || [];
      all.forEach((item) => {
        if (item.ref !== bodyRef) item.toggle();
      });
    }

    setIsOpen((prev) => !prev);
  };

  return (
    <div className="accordion-item">
      <div className="accordion-header" onClick={toggleAccordion}>
        <span>{title}</span>
        <i className={`bi bi-chevron-down icon ${isOpen ? "open" : ""}`}></i>
      </div>

      <div className="accordion-body" ref={bodyRef}>
        <div className="accordion-content">{children}</div>
      </div>
    </div>
  );
}
