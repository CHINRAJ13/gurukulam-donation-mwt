"use client";

import { useEffect, useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { formatCurrency } from "@/lib/utils";

export default function AdminDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/donations")
      .then((res) => res.json())
      .then((data) => {
        setDonations(data);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <SectionHeader title="Donation History" align="left" className="mb-10" />

      <div className="imumz-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-dim border-b border-black/5">
                <th className="p-4 font-bold text-xs uppercase tracking-widest">Donor</th>
                <th className="p-4 font-bold text-xs uppercase tracking-widest">Amount</th>
                <th className="p-4 font-bold text-xs uppercase tracking-widest">Cause</th>
                <th className="p-4 font-bold text-xs uppercase tracking-widest">Date</th>
                <th className="p-4 font-bold text-xs uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="p-10 text-center text-text-muted">Loading divine records...</td></tr>
              ) : donations.length === 0 ? (
                <tr><td colSpan={5} className="p-10 text-center text-text-muted">No successful donations found.</td></tr>
              ) : (
                donations.map((d: any) => (
                  <tr key={d._id} className="border-b border-black/5 hover:bg-surface-dim transition-colors">
                    <td className="p-4">
                      <div className="font-bold">{d.donorName || "Anonymous"}</div>
                      <div className="text-xs text-text-muted">{d.email || "No email"}</div>
                    </td>
                    <td className="p-4 font-bold text-primary">{formatCurrency(d.amount)}</td>
                    <td className="p-4">
                       <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold whitespace-nowrap">
                         {d.cause}
                       </span>
                    </td>
                    <td className="p-4 text-sm text-text-muted">
                      {new Date(d.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span className="text-xs font-bold text-green-600 uppercase">Success</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
