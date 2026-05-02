"use client";

import { useEffect, useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { formatCurrency } from "@/lib/utils";

export default function AdminOverview() {
  const [stats, setStats] = useState({ raisedAmount: 0, goalAmount: 5000000, donorCount: 0 });

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then(setStats);
  }, []);

  const cards = [
    { label: "Total Raised", value: formatCurrency(stats.raisedAmount), color: "text-primary" },
    { label: "Donor Count", value: stats.donorCount, color: "text-secondary" },
    { label: "Goal Progress", value: `${Math.round((stats.raisedAmount / stats.goalAmount) * 100)}%`, color: "text-accent" },
  ];

  return (
    <div>
      <SectionHeader title="Admin Overview" align="left" className="mb-10" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <div key={i} className="imumz-card">
            <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2">{card.label}</p>
            <p className={`text-4xl font-bold font-display ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 imumz-card p-10 bg-white">
        <h3 className="text-2xl font-bold mb-6">Recent Activity Highlights</h3>
        <p className="text-text-muted italic">Maintenance of your sacred trust activities starts here. Use the sidebar to manage donations and upcoming events.</p>
      </div>
    </div>
  );
}
