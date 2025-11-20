import { useEffect, useRef } from "react";
import "./ScrollStack.css";

export const ScrollStackItem = ({ children }) => (
  <div className="ss-card">{children}</div>
);

export default function ScrollStack({ children }) {
  const cardsRef = useRef([]);
  const positionsRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const cards = cardsRef.current;
    positionsRef.current = cards.map(card => {
      const rect = card.getBoundingClientRect();
      const scrollY = window.scrollY;
      return {
        originalTop: rect.top + scrollY,
        height: rect.height
      };
    });

    const animate = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const centerY = scrollY + vh / 2;
      const positions = positionsRef.current;

      cards.forEach((card, i) => {
        const { originalTop, height } = positions[i];
        const trigger = originalTop + height / 2 - vh / 2;

        // فاصله استک بین کارت‌ها
        const stackGap = 70;

        // هدف نهایی کارت هنگام پین شدن
        const targetY = centerY - height / 2 + i * stackGap;

        // پیشرفت کارت نسبت به رسیدن به مرکز
        const progress = Math.min(
          Math.max((scrollY - trigger) / 200, 0),
          1
        );

        // interpolate بین موقعیت اصلی تا موقعیت پین‌شده
        const currentY = originalTop + (targetY - originalTop) * progress;

        // اعمال ترنسفورم
        card.style.transform = `translateY(${currentY - originalTop}px)`;
        card.style.zIndex = `${1000 + i}`;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="ss-container">
      {children.map((child, i) => (
        <div
          key={i}
          className="ss-wrapper"
          ref={(el) => (cardsRef.current[i] = el)}
        >
          {child}
        </div>
      ))}
      <div style={{ height: "80vh" }} />
    </div>
  );
}
