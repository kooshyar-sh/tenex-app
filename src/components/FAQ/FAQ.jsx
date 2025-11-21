import React from "react";
import useAccordionDirective from "../../hooks/useAccordionDirective";
import "./FAQ.css";

export default function FAQ() {
  useAccordionDirective();

  const faqs = [
    {
      question: "What is TENEX?",
      answer: "TENEX is a decentralized platform for earning through binary rewards..."
    },
    {
      question: "How do I start?",
      answer: "You only need to connect your wallet and choose a membership tier..."
    },
    {
      question: "Is there a referral program?",
      answer: "Yes, you earn from direct sales and weekly team balance..."
    },
    {
      question: "When are rewards distributed?",
      answer: "Rewards are distributed weekly based on the team cycle..."
    },
    {
      question: "Is TENEX secure?",
      answer: "The platform uses smart contract-based transparency and blockchain security..."
    }
  ];

  return (
    <div className="container faq-accordion filters">
      {faqs.map((faq, i) => (
        <div className="accordion-item" key={i}>
          <div
            className="accordion-header"
            data-accordion=".accordion-body"
            data-allow-multiple="false"
          >
            {faq.question}
            <i className="bi bi-chevron-down icon"></i>
          </div>

          <div className="accordion-body">
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
}
