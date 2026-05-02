"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import Button from "@/components/ui/Button";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import DonationAmountPicker from "@/components/ui/DonationAmountPicker";
import DonationToggle from "@/components/ui/DonationToggle";
import ProgressBar from "@/components/ui/ProgressBar";
import ImpactStat from "@/components/ui/ImpactStat";
import PatronCard from "@/components/ui/PatronCard";
import CategoryCard from "@/components/ui/CategoryCard";
import { DONATION_PRESETS, DONATION_CATEGORIES, PATRON_TIERS, IMPACT_STATS, WHY_DONATE_PILLARS, TRUST_POINTS, CONSTRUCTION_ITEMS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import toast, { Toaster } from "react-hot-toast";
import ConstructionItemCard from "@/components/ui/ConstructionItemCard";
import Link from "next/link";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Home() {
  const [selectedAmount, setSelectedAmount] = useState<number>(5001);
  const [isMonthly, setIsMonthly] = useState<"one-time" | "monthly">("one-time");
  const [stats, setStats] = useState({ raisedAmount: 1840000, goalAmount: 5000000, donorCount: 150 });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedBack, setFeedBack] = useState("");

  useEffect(() => {
    // Fetch stats
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.raisedAmount) setStats(data);
      });

    // Fetch events
    fetch("/api/admin/events")
      .then(res => res.json())
      .then(setEvents);

    // Load Razorpay Script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleDonate = async (amount: number = selectedAmount, cause: string = "General Support") => {
    if (amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          cause,
          isMonthly: isMonthly === "monthly",
          donorName: "Devotee",
          email: "devotee@example.com", // In a real app, we'd collect this
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: "INR",
        name: "Shree Easanamma Gurukulam",
        description: cause,
        image: "/logo.png", // Path to your logo
        order_id: data.orderId,
        handler: async function (response: any) {
          const verifyRes = await fetch("/api/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.message) {
            toast.success("Thank you for your sacred contribution!");
            // Refresh stats
            fetch("/api/stats").then(r => r.json()).then(setStats);
          } else {
            toast.error("Verification failed. Please contact support.");
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#E8701A",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-soft-gradient min-h-screen">
      <Toaster position="bottom-center" />
      <Navbar />

      {/* 🔴 SECTION 1: HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="Sacred Gurukulam"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-surface via-transparent to-surface" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 tracking-wider uppercase">
              Reviving Ancient Wisdom
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1]">
              Be Part of Reviving the <span className="gradient-text">Sacred Siddhar Tradition</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-muted mb-10 leading-relaxed">
              Support temple construction, gurukulam education, and free spiritual programs that are transforming lives through ancient Tamil wisdom.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button label="Donate Now" variant="primary" size="lg" onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })} />
              <Button label="Sponsor a Cause" variant="outline" size="lg" onClick={() => document.getElementById('causes')?.scrollIntoView({ behavior: 'smooth' })} />
            </div>
            <p className="mt-8 text-sm text-text-muted font-medium opacity-60 italic">
              Your contribution sustains temple energy, education, and spiritual transformation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 🟠 SECTION 2: QUICK DONATION PANEL */}
      <SectionWrapper id="donate" bg="white" className="relative z-20">
        <div className="max-w-5xl mx-auto">
          <div className="imumz-card grid md:grid-cols-2 gap-12 items-center p-8 md:p-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Contribution</h2>
              <p className="text-text-muted mb-8 leading-relaxed">
                Your support helps us keep the ancient traditions alive. Choose an amount to make an immediate impact.
              </p>
              <DonationToggle value={isMonthly} onChange={(v) => setIsMonthly(v)} className="mb-8" />
              <div className="p-4 rounded-2xl bg-surface-dim border border-primary/10">
                <p className="text-xs font-bold text-primary mb-2 uppercase tracking-widest">Trust Note</p>
                <p className="text-sm text-text-muted italic">
                  All contributions go directly to gurukulam development and are used with full transparency.
                </p>
              </div>
            </div>
            <div className="space-y-6 border-2 border-gray-200 p-3 rounded-xl bg-white">
              <DonationAmountPicker
                presets={DONATION_PRESETS as any}
                value={selectedAmount}
                onChange={setSelectedAmount}
              />
              <Button
                label={loading ? "Processing..." : "Proceed to Donate"}
                variant="primary"
                className="w-full h-16 text-xl shadow-premium"
                onClick={() => handleDonate()}
                loading={loading}
              />
              <div className="flex justify-center gap-4 items-center">
                <Image src="/secure-pay.avif" alt="Secure Payment" width={200} height={20} className="grayscale hover:grayscale-0 hover:opacity-100 opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* 🟡 SECTION 3: OUR MISSION */}
      <SectionWrapper id="mission" bg="gold-pale">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SectionHeader
              title="A Living Gurukulam Rooted in Siddhar Wisdom"
              align="left"
              className="mb-8"
            />
            <div className="space-y-6 text-lg text-text-muted leading-relaxed">
              <p>
                Shree Easanamma Gurukulam is a traditional Tamil Siddhar-based spiritual center where ancient knowledge is lived, practiced, and passed to future generations.
              </p>
              <ul className="space-y-4">
                {[
                  "A temple with Shiva Lingam and Mahameru is being established",
                  "Rare deities including Varahi, Kali, and Hanuman are consecrated",
                  "A sacred pond and meditation mandapam support inner transformation",
                  "25 students are trained in the Othuvar tradition",
                  "Free 7-day Aadhib Vithai programs are conducted"
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="font-bold text-primary pt-4">
                This is not just preservation—it is the revival of a divine lineage.
              </p>
            </div>
          </motion.div>

          {/* 🟠 SECTION 3.5: CONSTRUCTION PROGRESS */}
          <SectionWrapper id="progress" bg="white">
            <SectionHeader title="Construction Progress" subtitle="Watch as the sacred geometry takes physical form." />
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                {[
                  { title: "Foundation & Sanctum", percent: 100, status: "Complete" },
                  { title: "Main Hall (Mandapam)", percent: 75, status: "In Progress" },
                  { title: "Mahameru Installation", percent: 30, status: "Planned" },
                  { title: "Temple Gopuram", percent: 10, status: "Initial Phase" }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="font-bold">{item.title}</span>
                      <span className="text-secondary text-sm font-bold uppercase tracking-widest">{item.status}</span>
                    </div>
                    <ProgressBar percent={item.percent} label="" color={item.percent === 100 ? "gold" : "saffron"} />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-40 bg-surface-dim rounded-2xl overflow-hidden relative">
                  <Image src="/temple.png" alt="Progress 1" fill className="object-cover opacity-50" />
                </div>
                <div className="h-40 bg-surface-dim rounded-2xl overflow-hidden relative translate-y-8">
                  <Image src="/hero.png" alt="Progress 2" fill className="object-cover opacity-50" />
                </div>
                <div className="h-40 bg-surface-dim rounded-2xl overflow-hidden relative">
                  <Image src="/mission.png" alt="Progress 3" fill className="object-cover opacity-50" />
                </div>
                <div className="h-40 bg-surface-dim rounded-2xl overflow-hidden relative translate-y-8">
                  <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                    <p className="text-xs font-bold text-text-muted">Live updates coming soon...</p>
                  </div>
                </div>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </SectionWrapper>


      {/* 🟢 SECTION 4: DONATION CATEGORIES */}
      <SectionWrapper id="causes">
        <SectionHeader
          title="Support a Cause"
          subtitle="Direct your contribution towards specific needs of the Gurukulam."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {DONATION_CATEGORIES.map((category, i) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <CategoryCard
                {...category}
                className="imumz-card h-full"
                ctaHref="#" // Handled by onClick below
              // We'll override the button behavior in categories
              />
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* 🔵 SECTION 5: IMPACT */}
      <SectionWrapper bg="gold-pale" id="impact">
        <SectionHeader title="Your Contribution Creates Real Impact" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {IMPACT_STATS.map((stat, i) => (
            <ImpactStat key={i} {...stat} className="imumz-card" />
          ))}
        </div>
        <div className="max-w-3xl mx-auto space-y-8">
          <ProgressBar
            label="Temple Construction"
            percent={60}
            color="gold"
            className="pb-4"
          />
          <ProgressBar
            label="Student Sponsorship"
            current={18}
            total={25}
            color="saffron"
          />
        </div>
      </SectionWrapper>

      {/* 🟣 SECTION 6: SEE THE GURUKULAM */}
      <SectionWrapper>
        <SectionHeader title="Experience the Energy" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="relative h-64 md:h-96 rounded-[24px] overflow-hidden col-span-2">
            <Image src="/temple.png" alt="Temple" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <span className="text-white font-bold">Temple Construction Progress</span>
            </div>
          </div>
          <div className="relative h-64 md:h-96 rounded-[24px] overflow-hidden">
            <div className="absolute inset-0 bg-primary/20 flex flex-col items-center justify-center p-6 text-center">
              <span className="text-4xl mb-4">🕉️</span>
              <p className="font-bold">Students chanting sacred hymns</p>
            </div>
          </div>
          <div className="relative h-64 rounded-[24px] overflow-hidden">
            <Image src="/hero.png" alt="Meditation" fill className="object-cover" />
          </div>
          <div className="relative h-64 rounded-[24px] overflow-hidden col-span-2">
            <div className="absolute inset-0 bg-secondary/20 flex flex-col items-center justify-center p-6 text-center">
              <p className="font-bold text-xl uppercase tracking-widest">Meditation Sessions</p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* 🟤 SECTION 7: WHY DONATE */}
      <SectionWrapper bg="gold-pale">
        <SectionHeader title="More Than a Donation" subtitle="When you contribute, you become part of a living spiritual movement." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {WHY_DONATE_PILLARS.map((pillar, i) => (
            <div key={i} className="bg-white rounded-xl text-center p-8">
              <div className="text-5xl mb-6">{pillar.icon}</div>
              <h3 className="font-display text-xl font-bold mb-2">{pillar.title}</h3>
              <p className="text-sm text-text-muted">Part of a sacred cause that transcends time.</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ⚪ SECTION 8: GLOBAL SUPPORT */}
      <SectionWrapper>
        <div className="imumz-card bg-primary  p-12 overflow-hidden relative">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Support from Anywhere in the World</h2>
              <p className="text-black/80 leading-relaxed">
                We welcome contributions from devotees and seekers worldwide. Our platform securely handles various international payment methods.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="px-6 py-3 bg-white/10 rounded-full border border-white/20 font-bold backdrop-blur-sm">International Cards</div>
              <div className="px-6 py-3 bg-white/10 rounded-full border border-white/20 font-bold backdrop-blur-sm">Net Banking</div>
              <div className="px-6 py-3 bg-white/10 rounded-full border border-white/20 font-bold backdrop-blur-sm">UPI (India)</div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ⚫ SECTION 9: TRUST & TRANSPARENCY */}
      <SectionWrapper bg="surface-dim">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader align="left" title="Transparency You Can Trust" />
            <ul className="space-y-6">
              {TRUST_POINTS.map((point, i) => (
                <li key={i} className="flex gap-4 items-center bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition duration-400 hover:scale-105 border border-black/5">
                  <span className="text-2xl">{point.icon}</span>
                  <span className="font-bold text-sm">{point.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-12 rounded-[32px] border border-primary/10 shadow-xl">
            <span className="text-secondary font-bold text-xs uppercase tracking-[0.3em] block mb-4">Certifications</span>
            <p className="text-text-muted mb-6">Our trust is officially registered and follows all regulatory guidelines for spiritual and charitable organizations in India.</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border-2 border-surface-dim flex items-center justify-center font-bold text-sm opacity-50">80G Available</div>
              <div className="p-4 rounded-xl border-2 border-surface-dim flex items-center justify-center font-bold text-sm opacity-50">FCRA Registered</div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* 🏗️ SECTION 10.5: SPONSOR CONSTRUCTION ITEMS */}
      <SectionWrapper id="construction" bg="gold-pale">
        <SectionHeader
          title="Sponsor Construction Items"
          subtitle="Directly contribute towards the physical building blocks of the sacred temple."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CONSTRUCTION_ITEMS.map((item) => (
            <ConstructionItemCard
              key={item.id}
              {...item}
              onDonate={(amt, name) => handleDonate(amt, name)}
            />
          ))}
        </div>
      </SectionWrapper>

      {/* 📅 SECTION 10.6: UPCOMING EVENTS */}
      <SectionWrapper id="events">
        <SectionHeader
          title="Upcoming Spiritual Programs"
          subtitle="Join us for sacred festivals, Siddhar programs, and community spiritual gatherings."
        />
        <div className="grid md:grid-cols-3 gap-8">
          {events.length > 0 ? (
            events.map((event: any, i) => (
              <motion.div
                key={event._id}
                className="imumz-card overflow-hidden group"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="h-48 bg-primary/10 relative overflow-hidden">
                  {event.image ? (
                    <Image src={event.image} alt={event.title} fill className="object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-5xl">🕉️</div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg font-bold text-xs">
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
                  <p className="text-sm text-text-muted mb-6 line-clamp-2">{event.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-text-muted uppercase">📍 {event.location}</span>
                    <Button label="Register" size="sm" variant="outline" href="#contact" />
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center p-12 imumz-card bg-surface-dim italic text-text-muted">
              Check back soon for upcoming sacred programs and festivals.
            </div>
          )}
        </div>
      </SectionWrapper>

      {/* 💎 SECTION 10.7: PATRON LEVELS */}
      <SectionWrapper id="patrons">
        <SectionHeader title="Become a Patron" subtitle="Deepen your spiritual connection through lifelong sponsorship." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-8">
          {PATRON_TIERS.map((tier, i) => (
            <PatronCard key={i} {...tier} className="h-full" />
          ))}
        </div>
      </SectionWrapper>

      {/* 🔴 SECTION 11: CURRENT NEED */}
      <SectionWrapper bg="surface-dim">
        <div className="max-w-4xl mx-auto imumz-card border-l-8 border-primary p-12">
          <h2 className="text-3xl font-bold mb-8">Current Focus</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              {["Temple completion", "Student support", "Daily operations"].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="font-semibold">{item}</span>
                </div>
              ))}
              <div className="pt-8">
                <p className="text-sm text-text-muted mb-2 font-bold uppercase tracking-widest">Goal Progress</p>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-3xl font-bold text-primary">{formatCurrency(stats.raisedAmount)}</span>
                  <span className="text-text-muted">of {formatCurrency(stats.goalAmount)}</span>
                </div>
                <ProgressBar percent={(stats.raisedAmount / stats.goalAmount) * 100} label="" />
              </div>
            </div>
            <div className="text-center md:text-right">
              <Button label="Contribute Now" variant="primary" size="lg" onClick={() => handleDonate(10000)} />
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* 🟢 SECTION 12: FINAL CTA */}
      <section className="py-24 bg-primary relative overflow-hidden text-center text-white">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Join This Sacred Journey</h2>
            <p className="text-xl mb-12 opacity-80 max-w-2xl mx-auto italic">
              "Your contribution today helps revive a timeless spiritual tradition."
            </p>
            <div className="flex justify-center">
              <Button label="Donate Now" variant="outline" size="lg" className="bg-white text-primary border-white hover:bg-surface-dim hover:text-primary" onClick={() => setSelectedAmount(5001)} />
            </div>
          </motion.div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        </div>
      </section>

      {/* 📞 SECTION 13: CONTACT */}
      <footer id="contact" className="bg-text-main text-white py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">ॐ</div>
                <span className="font-display text-2xl font-bold tracking-tight">Gurukulam Guru</span>
              </div>
              <p className="opacity-60 max-w-md leading-relaxed mb-8">
                Shree Easanamma Gurukulam is dedicated to the revival and preservation of ancient Tamil Siddhar traditions through education, spiritual practice, and community service.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">FB</a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">IG</a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">YT</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Contact Us</h4>
              <ul className="space-y-4 opacity-60 text-sm">
                <li>📞 +91 98765 43210</li>
                <li>📧 info@gurukulam.org</li>
                <li>📍 Tamil Nadu, India</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Quick Support</h4>
              <Button label="WhatsApp Us" variant="secondary" size="sm" className="bg-[#25D366] text-white hover:opacity-80" />
            </div>
          </div>
          <div className="mt-12 p-8 rounded-[32px] bg-white/5 border border-white/10 max-w-2xl">
            <h4 className="font-bold mb-4">Report an Issue / Suggestion</h4>
            <p className="text-xs opacity-50 mb-4">Your report is submitted anonymously. Our team will review it.</p>
            <div className="flex gap-2">
              <input
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 outline-none focus:border-primary transition-all overflow-hidden"
                placeholder="Share your thoughts..."
                value={feedBack}
                onChange={(e) => setFeedBack(e.target.value)}
              />
              <Button label="Submit" size="sm" variant="primary" onClick={() => {
                toast.success("Thank you for your feedback!");
                setFeedBack("");
              }} />
            </div>
          </div>

          <div className="pt-12 border-t border-white/10 text-center text-xs opacity-40">
            <p>© {new Date().getFullYear()} Shree Easanamma Gurukulam. All spiritual rights reserved.</p>
            <div className="mt-4 flex justify-center gap-6">
              <Link href="/admin" className="hover:text-primary">Admin Panel</Link>
              <a href="#" className="hover:text-primary">Privacy Policy</a>
              <a href="#" className="hover:text-primary">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
