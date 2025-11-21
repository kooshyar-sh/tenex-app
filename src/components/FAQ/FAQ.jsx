import React from "react";
import useAccordionDirective from "../../hooks/useAccordionDirective";
import "./FAQ.css";

export default function FAQ() {
  useAccordionDirective();

  const faqs = [
    {
      question: "What is TENEX?",
      answer:
        "TENEX is a next-generation decentralized earning platform powered by blockchain technology. It provides members with a structured binary rewards system, transparent smart-contracts, and multiple earning opportunities through direct referrals and weekly team cycles."
    },
    {
      question: "How do I start?",
      answer:
        "Getting started is simple. Connect your crypto wallet, choose a membership tier, and activate your account. Once activated, you can begin earning through direct sales, binary cycles, and long-term staking options."
    },
    {
      question: "Is there a referral program?",
      answer:
        "Yes. TENEX includes a powerful referral structure where you earn instantly from direct sales and also benefit from your team's performance. As your left and right team grows, you unlock weekly cycle rewards with no earning limits."
    },
    {
      question: "When are rewards distributed?",
      answer:
        "Cycle rewards are calculated and distributed every week based on your team’s performance. Direct referral rewards are paid instantly, while other bonuses may follow weekly or monthly schedules depending on their type."
    },
    {
      question: "Is TENEX secure?",
      answer:
        "Absolutely. TENEX operates on smart contracts, ensuring full transparency, immutability, and decentralized security. Every transaction is verifiable on the blockchain, removing traditional risks associated with centralized systems."
    }
  ];

  return (
    <div className="container faq-accordion filters mt-5">
      <h1 className="fw-bold text-purple mb-4">Frequently Asked Questions</h1>

      {faqs.map((faq, i) => (
        <div className="accordion-item" key={i}>
          <div
            className="accordion-header"
            data-accordion=".accordion-body"
            data-allow-multiple="false"
          >
            <span>{faq.question}</span>
            <i className="bi bi-chevron-down icon"></i>
          </div>

          <div className="accordion-body">
            <p className="accordion-content">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
