"use client";

import { useEffect, useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", description: "", date: "", location: "" });

  const fetchEvents = () => {
    fetch("/api/admin/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      toast.success("Event created successfully!");
      setForm({ title: "", description: "", date: "", location: "" });
      fetchEvents();
    } else {
      toast.error("Failed to create event");
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <div>
        <SectionHeader title="Manage Events" align="left" className="mb-10" />
        <div className="imumz-card">
          <h3 className="text-xl font-bold mb-6">Create New Event</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase mb-1 block">Event Title</label>
              <input
                required
                className="w-full p-3 rounded-xl border border-black/10 focus:ring-2 focus:ring-primary/20 outline-none"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase mb-1 block">Description</label>
              <textarea
                required
                className="w-full p-3 rounded-xl border border-black/10 focus:ring-2 focus:ring-primary/20 outline-none h-24"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase mb-1 block">Date</label>
                <input
                  required
                  type="date"
                  className="w-full p-3 rounded-xl border border-black/10 focus:ring-2 focus:ring-primary/20 outline-none"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase mb-1 block">Location</label>
                <input
                  required
                  className="w-full p-3 rounded-xl border border-black/10 focus:ring-2 focus:ring-primary/20 outline-none"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </div>
            </div>
            <Button label="Create Event" type="submit" variant="primary" className="w-full" />
          </form>
        </div>
      </div>

      <div>
        <SectionHeader title="Existing Events" align="left" className="mb-10" />
        <div className="space-y-4">
          {loading ? (
            <p>Loading events...</p>
          ) : events.length === 0 ? (
            <p className="text-text-muted italic">No upcoming events planned.</p>
          ) : (
            events.map((event: any) => (
              <div key={event._id} className="imumz-card flex justify-between items-center">
                <div>
                  <h4 className="font-bold">{event.title}</h4>
                  <p className="text-xs text-text-muted">{new Date(event.date).toLocaleDateString()} • {event.location}</p>
                </div>
                <div className="text-xs font-bold uppercase text-primary">Active</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
