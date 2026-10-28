import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
import {
  CalendarPlus,
  Clock,
  MapPin,
  Navigation,
  Heart,
  Copy,
  Check,
  Sparkles,
  Phone,
  Share2,
  Music,
  Calendar,
  Image as ImageIcon,
  X,
  Download,
  Eye,
} from "lucide-react";

import { Aurora } from "@/components/Aurora";
import { Countdown } from "@/components/Countdown";
import { ParticlesCanvas } from "@/components/ParticlesCanvas";
import { AudioPlayer, WEDDING_SONG_URL } from "@/components/AudioPlayer";
import { TimelineSection } from "@/components/TimelineSection";
import { IntroGate } from "@/components/IntroGate";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Engagement Ceremony of Muskan & Sufiyan | 30 October 2026" },
      {
        name: "description",
        content:
          "With the blessings of ALLAH and the love & support of our families, we cordially invite you to the Engagement Ceremony of Muskan and Sufiyan on Friday, 30 October 2026 at Raj Celebration, Nagpur.",
      },
      {
        property: "og:title",
        content: "Engagement Ceremony of Muskan & Sufiyan | 30 October 2026",
      },
      {
        property: "og:description",
        content:
          "With the blessings of ALLAH and the love & support of our families, we cordially invite you to the Engagement Ceremony of Muskan and Sufiyan on Friday, 30 October 2026 at Raj Celebration, Nagpur.",
      },
      { property: "og:image", content: "/og-image.jpg" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1080" },
      { property: "og:image:height", content: "1920" },
      { property: "og:image:alt", content: "Engagement Ceremony of Muskan and Sufiyan" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Engagement Ceremony of Muskan & Sufiyan | 30 October 2026",
      },
      {
        name: "twitter:description",
        content:
          "With the blessings of ALLAH and the love & support of our families, we cordially invite you to the Engagement Ceremony of Muskan and Sufiyan on Friday, 30 October 2026 at Raj Celebration, Nagpur.",
      },
      { name: "twitter:image", content: "/og-image.jpg" },
    ],
  }),
  component: Invitation,
});

const ENGAGEMENT_DATE = new Date("2026-10-30T20:00:00+05:30");
const VENUE_NAME = "Raj Celebration";
const VENUE_ADDRESS =
  "Raj Celebration, Zafar Nagar Near By Rathod Lawn Opp. Start Motors, Nagpur, Maharashtra 440013";
const MAPS_URL = "https://maps.app.goo.gl/b5oY7jQMinGnYbjc6?g_st=iw";

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={rise}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function icsHref() {
  const end = new Date(ENGAGEMENT_DATE.getTime() + 4 * 3600000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    "SUMMARY:Engagement Ceremony of Muskan & Sufiyan",
    `DTSTART:${fmt(ENGAGEMENT_DATE)}`,
    `DTEND:${fmt(end)}`,
    `LOCATION:${VENUE_ADDRESS}`,
    "DESCRIPTION:With the blessings of ALLAH and the love & support of our families, we cordially invite you to the Engagement Ceremony of Muskan and Sufiyan at Raj Celebration.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(body)}`;
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 75]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const triggerMusic = () => {
    window.dispatchEvent(new CustomEvent("toggle-wedding-music"));
  };

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-3 min-[400px]:px-4 py-12 sm:px-6 sm:py-20"
    >
      {/* Background Image with Deep Emerald Veil */}
      <img
        src="https://media.invitestory.in/emerald-nikah/images/hero-bg.jpg"
        alt=""
        aria-hidden
        width={1024}
        height={1536}
        className="absolute inset-0 h-full w-full object-cover scale-105"
      />
      <Aurora className="mix-blend-screen opacity-85" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-veil)" }} />

      {/* Floating Velvet Roses & Floral Accents */}
      <img
        src="https://media.invitestory.in/emerald-nikah/images/roses.png"
        alt=""
        aria-hidden
        loading="lazy"
        width={1024}
        height={1024}
        className="float-slow pointer-events-none absolute -left-10 -top-6 w-36 min-[400px]:w-48 sm:w-72 max-w-[40vw] opacity-95 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
      />
      <img
        src="https://media.invitestory.in/emerald-nikah/images/daisies.png"
        alt=""
        aria-hidden
        loading="lazy"
        width={1024}
        height={1024}
        className="float-slow pointer-events-none absolute -bottom-8 -right-8 w-32 min-[400px]:w-44 sm:w-60 max-w-[36vw] opacity-90 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
      />

      <motion.div style={{ y, opacity: fade }} className="relative z-10 w-full max-w-lg">
        {/* Royal Bismillah Arch Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center px-2"
        >
          {/* Ornate Gold Arch Crest SVG */}
          <div className="mx-auto flex items-center justify-center gap-2 sm:gap-3">
            <div className="h-[1px] w-8 min-[380px]:w-14 sm:w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <svg
              className="h-5 w-5 sm:h-6 sm:w-6 text-gold drop-shadow-[0_0_8px_rgba(229,193,120,0.6)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M12 2L14.5 8.5L21 9.5L16 14L17.5 20.5L12 17L6.5 20.5L8 14L3 9.5L9.5 8.5L12 2Z"
                fill="currentColor"
                fillOpacity="0.3"
              />
            </svg>
            <div className="h-[1px] w-8 min-[380px]:w-14 sm:w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>

          {/* Bismillah Calligraphy */}
          <p className="mt-2.5 font-arabic text-xl min-[360px]:text-2xl sm:text-4xl leading-loose text-gold-bright drop-shadow-[0_2px_15px_rgba(247,230,184,0.5)]">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
          </p>

          {/* Urdu / Arabic Line from Card */}
          <p className="font-arabic text-lg min-[360px]:text-xl sm:text-2xl leading-relaxed text-gold mt-0.5 drop-shadow-md">
            اللہ نے تم دونوں کو ایک دوسرے کے لئے پیدا کیا
          </p>
          <p className="mx-auto mt-1 max-w-xs text-[0.72rem] min-[360px]:text-[0.75rem] font-light italic leading-relaxed tracking-wider text-cream/90">
            “And We created you in pairs”
          </p>
          <p className="text-[0.6rem] uppercase tracking-[0.3em] text-gold-soft font-semibold">
            (Qur’an 78:8)
          </p>
        </motion.div>

        {/* Imperial Royal Invitation Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-6 group"
        >
          {/* Card Outer Glow & Background */}
          <div className="relative rounded-[1.75rem] sm:rounded-[2rem] border-[1.5px] sm:border-2 border-gold/70 bg-[#faf5eb] p-4 min-[380px]:p-6 sm:p-10 text-center shadow-[0_30px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(229,193,120,0.3)] overflow-hidden">
            {/* Inner Double Hairline Gold Frame */}
            <div className="pointer-events-none absolute inset-2 sm:inset-3 rounded-[1.3rem] sm:rounded-[1.4rem] border border-[#c49a45]/50" />
            <div className="pointer-events-none absolute inset-3 sm:inset-4 rounded-[1.1rem] sm:rounded-[1.2rem] border border-dashed border-[#c49a45]/30" />

            {/* Corner Ornamental Rosettes */}
            <div className="pointer-events-none absolute top-3 left-3 text-[#c49a45]">
              <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" />
              </svg>
            </div>
            <div className="pointer-events-none absolute top-3 right-3 text-[#c49a45]">
              <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" />
              </svg>
            </div>
            <div className="pointer-events-none absolute bottom-3 left-3 text-[#c49a45]">
              <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" />
              </svg>
            </div>
            <div className="pointer-events-none absolute bottom-3 right-3 text-[#c49a45]">
              <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" />
              </svg>
            </div>

            {/* Content Inside Imperial Card */}
            <div className="relative z-10 py-1">
              <p className="font-display text-[0.62rem] min-[380px]:text-[0.68rem] uppercase tracking-[0.3em] min-[380px]:tracking-[0.35em] font-semibold text-[#8c6721]">
                With the blessings of ALLAH
              </p>
              <p className="mt-0.5 text-[0.58rem] min-[380px]:text-[0.62rem] uppercase tracking-[0.2em] min-[380px]:tracking-[0.25em] text-[#1a382d]/85">
                and the love &amp; support of our families
              </p>
              <p className="text-[0.58rem] min-[380px]:text-[0.62rem] uppercase tracking-[0.2em] min-[380px]:tracking-[0.25em] text-[#1a382d]/85">
                we cordially invite you to the
              </p>

              {/* Ceremony Calligraphy Header */}
              <div className="mt-3 sm:mt-4">
                <p className="font-script text-3xl min-[360px]:text-4xl sm:text-5xl text-[#b88c3a] font-normal leading-tight">
                  Engagement
                </p>
                <p className="font-display text-lg min-[360px]:text-xl sm:text-2xl font-bold uppercase tracking-[0.24em] min-[360px]:tracking-[0.28em] text-[#1a382d] -mt-1">
                  Ceremony
                </p>
                <p className="font-script text-lg sm:text-xl text-[#8c6721] italic mt-0.5">of</p>
              </div>

              {/* Bride & Groom Names */}
              <div className="mt-2.5 sm:mt-3 space-y-1">
                {/* Muskan */}
                <h1 className="font-script text-4xl min-[360px]:text-5xl sm:text-6xl font-bold text-[#1a382d] leading-none drop-shadow-sm break-words">
                  Muskan
                </h1>

                {/* Golden Heart Filigree */}
                <div className="my-1.5 sm:my-2 flex items-center justify-center gap-2 sm:gap-3">
                  <div className="h-[1px] w-8 min-[380px]:w-12 bg-gradient-to-r from-transparent via-[#b88c3a] to-transparent" />
                  <div className="flex items-center gap-1 text-[#b88c3a]">
                    <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-[#b88c3a]" />
                  </div>
                  <div className="h-[1px] w-8 min-[380px]:w-12 bg-gradient-to-r from-transparent via-[#b88c3a] to-transparent" />
                </div>

                <p className="font-script text-lg sm:text-xl text-[#8c6721] italic">and</p>

                {/* Sufiyan */}
                <h2 className="font-script text-4xl min-[360px]:text-5xl sm:text-6xl font-bold text-[#1a382d] leading-none drop-shadow-sm break-words">
                  Sufiyan
                </h2>
              </div>

              {/* Invitation Blessing Text */}
              <div className="mt-5 pt-3.5 sm:pt-4 border-t border-[#c49a45]/30">
                <p className="text-[0.72rem] min-[380px]:text-xs sm:text-[0.82rem] leading-relaxed text-[#1a382d]/90 font-medium">
                  Your presence will make our special day even more memorable.
                </p>
                <p className="mt-1 font-script text-xl min-[380px]:text-2xl text-[#8a2435]">
                  We look forward to seeing you and your kind blessings.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Music Action Button & Date Stamp */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-5 sm:mt-6 flex flex-col items-center justify-center text-center gap-2.5 sm:gap-3 px-2"
        >
          {/* Quick Play Wedding Song Button */}
          <motion.button
            type="button"
            onClick={triggerMusic}
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.03 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-[#072219]/90 px-5 min-[380px]:px-6 py-2 min-[380px]:py-2.5 text-xs sm:text-sm font-semibold tracking-wider text-gold-bright shadow-[0_10px_25px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all hover:border-gold hover:shadow-[0_0_25px_rgba(229,193,120,0.35)]"
          >
            <Music className="h-4 w-4 text-gold animate-bounce" />
            <span>Play Wedding Song</span>
            <Sparkles className="h-3.5 w-3.5 text-gold-bright" />
          </motion.button>

          <div className="gold-badge px-5 min-[380px]:px-6 py-1.5 sm:py-2 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md border border-gold/60">
            <p className="text-[0.7rem] min-[380px]:text-xs sm:text-sm uppercase tracking-[0.25em] min-[380px]:tracking-[0.35em] font-semibold text-gold-bright">
              Friday · 30 October 2026
            </p>
          </div>
          <p className="text-[0.62rem] min-[380px]:text-[0.68rem] uppercase tracking-[0.25em] font-medium text-cream/80">
            Raj Celebration · Nagpur
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

{
  /* 3 Golden Arches Section - Exactly as in the user's card */
}
function ThreeArchesSection() {
  return (
    <section className="relative mx-auto max-w-lg px-3 min-[400px]:px-4 py-8">
      <Reveal>
        <p className="text-center text-[0.62rem] sm:text-[0.65rem] uppercase tracking-[0.35em] sm:tracking-[0.45em] text-gold font-medium">
          Auspicious Schedule &amp; Venue
        </p>
        <h2 className="mt-1 text-center font-display text-3xl sm:text-4xl italic text-gradient-gold">
          Ceremony Highlights
        </h2>
        <div className="gold-rule mx-auto mt-3 w-28" />
      </Reveal>

      {/* Grid of 3 Arches */}
      <div className="mt-7 grid grid-cols-1 min-[480px]:grid-cols-3 gap-3.5 sm:gap-4">
        {/* Arch 1: Date */}
        <Reveal delay={0.1}>
          <div className="relative rounded-t-[2.75rem] rounded-b-2xl border-2 border-gold/60 bg-gradient-to-b from-[#faf5eb] to-[#f4ebd9] p-4 min-[480px]:p-5 text-center text-[#1a382d] shadow-lg overflow-hidden group hover:border-gold transition-all">
            <div className="pointer-events-none absolute inset-1.5 rounded-t-[2.5rem] rounded-b-xl border border-[#c49a45]/30" />
            <div className="mx-auto flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gold/25 border border-gold/40 text-[#8c6721] mb-2">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <p className="text-[0.62rem] min-[480px]:text-[0.65rem] uppercase tracking-[0.22em] font-bold text-[#8c6721]">
              FRIDAY
            </p>
            <p className="font-display text-4xl min-[480px]:text-3xl sm:text-5xl font-extrabold text-[#1a382d] my-0.5 sm:my-1">
              30
            </p>
            <p className="text-[0.65rem] min-[480px]:text-[0.68rem] uppercase tracking-[0.18em] font-bold text-[#1a382d]">
              OCTOBER 2026
            </p>
          </div>
        </Reveal>

        {/* Arch 2: Time */}
        <Reveal delay={0.2}>
          <div className="relative rounded-t-[2.75rem] rounded-b-2xl border-2 border-gold/60 bg-gradient-to-b from-[#faf5eb] to-[#f4ebd9] p-4 min-[480px]:p-5 text-center text-[#1a382d] shadow-lg overflow-hidden group hover:border-gold transition-all">
            <div className="pointer-events-none absolute inset-1.5 rounded-t-[2.5rem] rounded-b-xl border border-[#c49a45]/30" />
            <div className="mx-auto flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gold/25 border border-gold/40 text-[#8c6721] mb-2">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <p className="font-display text-base min-[480px]:text-base sm:text-lg font-bold text-[#1a382d] mt-1">
              After Isha
            </p>
            <p className="font-display text-2xl min-[480px]:text-2xl sm:text-3xl font-extrabold text-[#8c6721] my-0.5 sm:my-1">
              8:00 PM
            </p>
            <p className="text-[0.6rem] uppercase tracking-[0.18em] text-[#1a382d]/80 font-medium">
              Istiqbal &amp; Ceremony
            </p>
          </div>
        </Reveal>

        {/* Arch 3: Venue */}
        <Reveal delay={0.3}>
          <div className="relative rounded-t-[2.75rem] rounded-b-2xl border-2 border-gold/60 bg-gradient-to-b from-[#faf5eb] to-[#f4ebd9] p-4 min-[480px]:p-5 text-center text-[#1a382d] shadow-lg overflow-hidden group hover:border-gold transition-all">
            <div className="pointer-events-none absolute inset-1.5 rounded-t-[2.5rem] rounded-b-xl border border-[#c49a45]/30" />
            <div className="mx-auto flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gold/25 border border-gold/40 text-[#8c6721] mb-2">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <p className="font-display text-base font-bold text-[#1a382d] leading-tight">
              Raj Celebration
            </p>
            <p className="text-[0.6rem] min-[480px]:text-[0.62rem] text-[#1a382d]/85 leading-snug mt-1 font-medium">
              Zafar Nagar Near By Rathod Lawn Opp. Start Motors
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

{
  /* Digital Invitation Card Showcase with Zoom View */
}
function DigitalCardShowcase() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative mx-auto max-w-lg px-3 min-[400px]:px-4 py-8">
      <Reveal>
        <div className="glass-tile p-5 min-[380px]:p-7 text-center relative overflow-hidden border border-gold/40">
          <p className="text-[0.62rem] sm:text-[0.65rem] uppercase tracking-[0.35em] sm:tracking-[0.45em] text-gold font-medium">
            Official E-Card
          </p>
          <h2 className="mt-1 font-display text-2xl sm:text-3xl italic text-gradient-gold">
            Invitation Card
          </h2>
          <div className="gold-rule mx-auto my-3.5 w-24" />

          {/* Card Preview Container */}
          <div
            className="relative mx-auto mt-4 max-w-xs overflow-hidden rounded-2xl border-2 border-gold/50 shadow-2xl group cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <img
              src="/images/invitation-card.jpg"
              alt="Engagement Ceremony Invitation Card of Muskan & Sufiyan"
              loading="lazy"
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/80 via-transparent to-transparent flex items-end justify-center p-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/70 bg-emerald-deep/90 px-4 py-1.5 text-xs font-semibold text-gold-bright shadow-lg backdrop-blur-md">
                <Eye className="h-3.5 w-3.5" />
                Tap to View Full Card
              </span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-gold/60 bg-gold/15 px-4 py-2 text-xs font-semibold text-gold-bright hover:bg-gold/25 transition-all"
            >
              <Eye className="h-3.5 w-3.5" />
              View Full Card
            </button>
            <a
              href="/images/invitation-card.jpg"
              download="Muskan-Sufiyan-Engagement-Card.jpg"
              className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-emerald-deep/80 px-4 py-2 text-xs font-semibold text-cream hover:bg-gold/15 transition-all"
            >
              <Download className="h-3.5 w-3.5 text-gold" />
              Download Card
            </a>
          </div>
        </div>
      </Reveal>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-h-[90vh] max-w-sm sm:max-w-md overflow-hidden rounded-2xl border-2 border-gold/70 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-gold-bright border border-gold/50 shadow-md transition-transform hover:scale-110"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
              <img
                src="/images/invitation-card.jpg"
                alt="Muskan and Sufiyan Engagement Invitation"
                className="max-h-[85vh] w-auto object-contain rounded-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function QuranicVerse() {
  return (
    <section className="relative mx-auto max-w-lg px-3 min-[400px]:px-4 py-8 text-center">
      <Reveal>
        <div className="glass-tile p-5 min-[380px]:p-7 sm:p-9 relative overflow-hidden border border-gold/40">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-gold/10" />
          <Sparkles className="mx-auto h-5 w-5 text-gold mb-2.5" />
          <p className="font-arabic text-lg min-[360px]:text-xl sm:text-3xl leading-loose text-gold-bright drop-shadow-[0_2px_12px_rgba(247,230,184,0.4)]">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا
            وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
          </p>
          <div className="gold-rule mx-auto my-4 sm:my-5 w-24 sm:w-28" />
          <p className="font-display text-xs min-[360px]:text-sm sm:text-base italic leading-relaxed text-cream/90">
            “And of His signs is that He created for you from yourselves mates that you may find
            tranquility in them; and He placed between you affection and mercy.”
          </p>
          <p className="mt-2.5 text-[0.62rem] uppercase tracking-[0.3em] font-semibold text-gold">
            Surah Ar-Rum · 30:21
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function CountdownSection() {
  return (
    <section className="relative overflow-hidden px-3 min-[400px]:px-4 py-12 sm:py-16">
      <img
        src="https://media.invitestory.in/emerald-nikah/images/mandala.png"
        alt=""
        aria-hidden
        loading="lazy"
        width={1024}
        height={1024}
        className="pointer-events-none absolute left-1/2 top-1/2 w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-15 spin-very-slow"
      />
      <div className="relative mx-auto max-w-md text-center">
        <Reveal>
          <p className="text-[0.62rem] sm:text-[0.65rem] uppercase tracking-[0.35em] sm:tracking-[0.45em] text-gold font-medium">
            Counting Every Blessed Moment
          </p>
          <h2 className="mt-1 font-display text-3xl sm:text-5xl italic text-gradient-gold">
            Until The Auspicious Evening
          </h2>
          <div className="gold-rule mx-auto mt-3.5 w-28 sm:w-32" />
        </Reveal>

        <Reveal delay={0.15} className="mt-7 sm:mt-8">
          <Countdown target={ENGAGEMENT_DATE.getTime()} />
        </Reveal>
      </div>
    </section>
  );
}

function FamilyAndCompliments() {
  return (
    <section className="relative mx-auto max-w-lg px-3 min-[400px]:px-4 py-10 sm:py-12">
      <Reveal>
        <div className="glass-tile p-5 min-[380px]:p-7 sm:p-9 text-center relative overflow-hidden border border-gold/40">
          <p className="text-[0.62rem] sm:text-[0.65rem] uppercase tracking-[0.35em] sm:tracking-[0.45em] text-gold font-medium">
            With Love &amp; Respect
          </p>
          <h2 className="mt-1 font-display text-2xl min-[360px]:text-3xl sm:text-4xl italic text-gradient-gold">
            With Best Compliments From
          </h2>
          <div className="gold-rule mx-auto my-4 w-24" />

          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-4 sm:gap-6 mt-3">
            {/* Father of Bride */}
            <div className="rounded-2xl border border-gold/30 bg-emerald-rich/40 p-4 sm:p-5 backdrop-blur-sm">
              <div className="mx-auto flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gold/15 text-gold mb-2.5 border border-gold/30">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <h3 className="font-display text-lg min-[360px]:text-xl sm:text-2xl font-bold text-cream">
                Haji Sayyed Ashraf Ali
              </h3>
              <p className="mt-1 text-[0.68rem] min-[360px]:text-xs uppercase tracking-wider text-gold-soft font-medium">
                (Father of Bride)
              </p>
            </div>

            {/* Grandfather of Bride */}
            <div className="rounded-2xl border border-gold/30 bg-emerald-rich/40 p-4 sm:p-5 backdrop-blur-sm">
              <div className="mx-auto flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gold/15 text-gold mb-2.5 border border-gold/30">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <h3 className="font-display text-lg min-[360px]:text-xl sm:text-2xl font-bold text-cream">
                Late Haji Sayyed Imdad Ali
              </h3>
              <p className="mt-1 text-[0.68rem] min-[360px]:text-xs uppercase tracking-wider text-gold-soft font-medium">
                (Grandfather of Bride)
              </p>
            </div>
          </div>

          {/* RSVP Contacts */}
          <div className="mt-7 pt-5 sm:pt-6 border-t border-gold/25">
            <div className="inline-flex items-center gap-1.5 gold-badge px-3.5 py-1 text-xs uppercase tracking-widest font-semibold text-gold-bright">
              <Phone className="h-3.5 w-3.5" />
              RSVP
            </div>

            <div className="mt-3.5 flex flex-col min-[360px]:flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-sm sm:text-base font-semibold text-cream">
              <a
                href="tel:+917821970613"
                className="w-full min-[360px]:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 hover:bg-gold/20 hover:border-gold transition-all text-gold-bright"
              >
                <Phone className="h-4 w-4 text-gold" />
                <span>7821970613</span>
              </a>
              <a
                href="tel:+919270529040"
                className="w-full min-[360px]:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 hover:bg-gold/20 hover:border-gold transition-all text-gold-bright"
              >
                <Phone className="h-4 w-4 text-gold" />
                <span>9270529040</span>
              </a>
            </div>

            <p className="mt-4 font-script text-xl min-[360px]:text-2xl sm:text-3xl text-rose font-medium">
              We seek your prayers &amp; blessings
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Details() {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(VENUE_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareInvitation = () => {
    const text = `You are warmly invited to the Engagement Ceremony of Muskan and Sufiyan on Friday, 30 October 2026 at Raj Celebration, Nagpur.\n\nVenue: ${MAPS_URL}`;
    if (navigator.share) {
      navigator
        .share({
          title: "Muskan & Sufiyan — Engagement Ceremony Invitation",
          text,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      window.open(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(text + "\n" + window.location.href)}`,
        "_blank",
      );
    }
  };

  return (
    <section id="venue" className="relative mx-auto max-w-lg px-3 min-[400px]:px-4 py-12">
      <Reveal>
        <p className="text-center text-[0.62rem] sm:text-[0.65rem] uppercase tracking-[0.35em] sm:tracking-[0.45em] text-gold font-medium">
          Location &amp; Directions
        </p>
        <h2 className="mt-1 text-center font-display text-3xl sm:text-5xl italic text-gradient-gold">
          Venue &amp; Celebration
        </h2>
        <div className="gold-rule mx-auto mt-3.5 w-28 sm:w-32" />
      </Reveal>

      {/* Main Details Card */}
      <Reveal delay={0.1} className="mt-7">
        <div className="glass-tile p-5 min-[380px]:p-7 sm:p-9 text-center relative overflow-hidden border border-gold/40">
          <span className="gold-badge px-3.5 py-1 text-[0.62rem] uppercase tracking-[0.3em] font-semibold text-gold-bright">
            Engagement Ceremony
          </span>

          <p className="mt-4 font-display text-2xl min-[360px]:text-3xl sm:text-4xl font-semibold text-cream">
            Friday, 30 October 2026
          </p>

          <p className="mt-1.5 flex items-center justify-center gap-1.5 text-xs sm:text-sm text-gold-soft font-medium">
            <Clock className="h-4 w-4 shrink-0 text-gold" />
            <span>After Isha · 08:00 PM onwards</span>
          </p>

          <div className="gold-rule my-5 sm:my-6" />

          <div className="space-y-1">
            <p className="font-display text-xl sm:text-3xl font-semibold text-cream">
              {VENUE_NAME}
            </p>
            <p className="flex items-start justify-center gap-1.5 text-xs sm:text-sm leading-relaxed text-cream/80 max-w-sm mx-auto">
              <MapPin className="mt-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-gold" />
              <span>
                Zafar Nagar Near By Rathod Lawn Opp. Start Motors, Nagpur, Maharashtra 440013
              </span>
            </p>
          </div>

          <div className="mt-6 flex flex-col min-[380px]:flex-row gap-2.5 sm:gap-3">
            <motion.a
              href={icsHref()}
              download="muskan-sufiyan-engagement.ics"
              whileTap={{ scale: 0.96 }}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full py-3 sm:py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-[#1a382d] shadow-[var(--shadow-lux)] transition-transform hover:scale-102"
              style={{ background: "var(--gradient-gold)" }}
            >
              <CalendarPlus className="h-4 w-4" />
              Add to Calendar
            </motion.a>

            <motion.button
              type="button"
              onClick={handleCopyAddress}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/60 bg-gold/15 px-4 sm:px-5 py-3 sm:py-3.5 text-xs sm:text-sm font-medium tracking-wide text-gold-bright hover:bg-gold/25 transition-all"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Address</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </Reveal>

      {/* Map Card */}
      <Reveal delay={0.15} className="mt-5 sm:mt-6">
        <div className="glass-tile overflow-hidden group">
          <div className="relative overflow-hidden h-44 sm:h-48 w-full bg-[#0a2a20]">
            <img
              src="https://media.invitestory.in/emerald-nikah/images/map.jpg"
              alt="Raj Celebration Venue Map"
              loading="lazy"
              width={1024}
              height={768}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/90 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 sm:left-4">
              <span className="gold-badge px-2.5 sm:px-3 py-0.5 text-[0.6rem] uppercase tracking-wider">
                Google Maps Navigation
              </span>
            </div>
          </div>

          <div className="p-4 min-[380px]:p-5 sm:p-6">
            <p className="font-display text-lg sm:text-xl font-semibold text-cream">
              Raj Celebration
            </p>
            <p className="mt-1 text-xs text-cream/70 leading-relaxed">
              Located at Zafar Nagar, Anant Nagar, Near Rathod Lawn, Opposite Start Motors, Nagpur.
              Easy access &amp; ample parking.
            </p>

            <div className="mt-4 flex flex-col min-[380px]:flex-row gap-2.5 sm:gap-3">
              <motion.a
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
                whileTap={{ scale: 0.96 }}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-gold/60 bg-emerald-rich/80 px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold tracking-wide text-gold-bright transition-all hover:bg-gold/20"
              >
                <Navigation className="h-4 w-4 text-gold" />
                Open in Google Maps
              </motion.a>

              <motion.button
                type="button"
                onClick={shareInvitation}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-emerald-deep/80 px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium tracking-wide text-cream transition-colors hover:bg-gold/15"
              >
                <Share2 className="h-4 w-4 text-gold" />
                Share
              </motion.button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden px-4 sm:px-6 pb-20 pt-14 sm:pt-16">
      <Aurora className="opacity-75" />
      <img
        src="https://media.invitestory.in/emerald-nikah/images/mandala.png"
        alt=""
        aria-hidden
        loading="lazy"
        width={1024}
        height={1024}
        className="pointer-events-none absolute -bottom-24 left-1/2 w-[160%] -translate-x-1/2 opacity-[0.14] spin-very-slow"
      />
      <img
        src="https://media.invitestory.in/emerald-nikah/images/roses.png"
        alt=""
        aria-hidden
        loading="lazy"
        width={1024}
        height={1024}
        className="float-slow pointer-events-none absolute -right-14 top-4 w-40 opacity-80"
      />
      <div className="relative mx-auto max-w-md text-center">
        <img
          src="https://media.invitestory.in/emerald-nikah/images/divider.png"
          alt=""
          aria-hidden
          loading="lazy"
          width={1024}
          height={512}
          className="mx-auto w-40 sm:w-48 opacity-80"
        />
        <Reveal className="mt-5">
          <p className="font-display text-xl sm:text-3xl italic leading-relaxed text-cream/90 px-2">
            “May Allah bless this union, fill your lives with joy, harmony, prosperity, and
            everlasting happiness.”
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 font-script text-3xl min-[360px]:text-4xl sm:text-5xl text-gradient-gold">
            Muskan &amp; Sufiyan
          </p>
          <p className="mt-1.5 text-[0.62rem] min-[360px]:text-[0.68rem] uppercase tracking-[0.3em] text-gold-soft font-medium">
            30 October 2026 · Raj Celebration
          </p>
          <p className="mt-0.5 text-[0.58rem] min-[360px]:text-[0.62rem] uppercase tracking-[0.35em] text-cream/60">
            We eagerly await your precious presence &amp; duas
          </p>
        </Reveal>

        <div className="gold-rule mx-auto mt-6 sm:mt-8 w-24" />

        <p className="mt-5 inline-flex items-center gap-1.5 text-[0.58rem] min-[360px]:text-[0.62rem] uppercase tracking-[0.25em] text-cream/50">
          Crafted with <Heart className="h-3 w-3 fill-rose text-rose" /> with prayers for the
          families
        </p>

        <div>
          <a
            href={WEDDING_SONG_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-2.5 inline-flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.25em] text-gold-soft/80 transition-colors hover:text-gold"
          >
            <Music className="h-3 w-3 text-gold" />
            Listen to Celebration Nasheed on YouTube
          </a>
        </div>
      </div>
    </footer>
  );
}

function Invitation() {
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    if (!isGateOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isGateOpen]);

  return (
    <>
      <AnimatePresence mode="wait">
        {!isGateOpen && (
          <IntroGate
            key="intro-opening-gate"
            onOpening={() => setIsOpening(true)}
            onOpened={() => setIsGateOpen(true)}
          />
        )}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0.92, scale: 1.02 }}
        animate={{
          opacity: 1,
          scale: isOpening || isGateOpen ? 1 : 1.02,
        }}
        transition={{ duration: 1.35, ease: [0.65, 0, 0.35, 1] }}
        className="min-h-screen bg-emerald-deep relative selection:bg-gold selection:text-ink overflow-x-clip"
      >
        <ParticlesCanvas />
        <AudioPlayer />

        <Hero />
        <ThreeArchesSection />
        <DigitalCardShowcase />
        <QuranicVerse />
        <CountdownSection />
        <TimelineSection />
        <FamilyAndCompliments />
        <Details />
        <Footer />
      </motion.main>
    </>
  );
}
