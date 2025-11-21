import { useEffect } from "react";

export default function useAccordionDirective() {
  useEffect(() => {
    const headers = document.querySelectorAll("[data-accordion]");

    const listeners = [];

    headers.forEach((header) => {
      const bodySelector = header.getAttribute("data-accordion");
      const allowMultiple = header.getAttribute("data-allow-multiple") !== "false";

      const parent = header.closest(".filters");
      const body = header.parentElement.querySelector(bodySelector); // ✔ دقیقا بدنی که مربوط به همین آیتم است
      const icon = header.querySelector(".icon");

      if (!body) return;

      // Collapse initially
      body.style.maxHeight = "0px";
      body.classList.add("collapsed");

      const toggle = () => {
        const isOpen = !body.classList.contains("collapsed");

        // Close others if multiple is not allowed
        if (!isOpen && !allowMultiple && parent) {
          const bodies = parent.querySelectorAll(bodySelector);
          const icons = parent.querySelectorAll(".icon");

          bodies.forEach((b) => {
            if (b !== body) {
              b.classList.add("collapsed");
              b.style.maxHeight = "0px";
            }
          });

          icons.forEach((i) => {
            if (i !== icon) i.classList.remove("open");
          });
        }

        if (isOpen) {
          // Close
          body.classList.add("collapsed");
          body.style.maxHeight = "0px";
          icon?.classList.remove("open");
        } else {
          // Open
          body.classList.remove("collapsed");
          body.style.maxHeight = body.scrollHeight + "px";
          icon?.classList.add("open");
        }
      };

      header.addEventListener("click", toggle);
      listeners.push({ header, toggle });
    });

    // Cleanup دقیق
    return () => {
      listeners.forEach(({ header, toggle }) =>
        header.removeEventListener("click", toggle)
      );
    };
  }, []);
}
