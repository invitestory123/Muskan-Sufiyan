import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";

interface IntroGateProps {
  onOpening?: () => void;
  onOpened: () => void;
}

const easeCurve: [number, number, number, number] = [0.65, 0, 0.35, 1];

export function IntroGate({ onOpening, onOpened }: IntroGateProps) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    if (onOpening) onOpening();

    // Trigger ambient celebration music on user interaction
    try {
      window.dispatchEvent(new CustomEvent("play-wedding-music"));
      window.dispatchEvent(new CustomEvent("toggle-wedding-music"));
    } catch {
      // safe fallback
    }
  };

  return (
    <motion.div
      key="intro-gate-overlay"
      className="fixed inset-0 z-50 overflow-hidden bg-black select-none pointer-events-auto"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: easeCurve }}
    >
      {/* LEFT SPLIT CURTAIN PANEL */}
      <motion.div
        className="absolute inset-y-0 left-0 w-[51%] overflow-hidden bg-[#051c14]"
        style={{
          background: "linear-gradient(135deg, #041811 0%, #072219 50%, #0c3628 100%)",
        }}
        animate={opening ? { x: "-105%" } : { x: 0 }}
        transition={{ duration: 1.35, delay: 0.2, ease: easeCurve }}
      >
        {/* Subtle mandala overlay */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: "url('/images/mandala.png')",
            backgroundSize: "cover",
            backgroundPosition: "right center",
          }}
        />
        {/* Velvet rose top-left */}
        <img
          src="/images/roses.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute -left-12 -top-10 w-44 sm:w-64 opacity-80 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
        />
        {/* Gold seam edge on the right side of left panel */}
        <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-gold to-transparent shadow-[0_0_15px_rgba(229,193,120,0.7)]" />
      </motion.div>

      {/* RIGHT SPLIT CURTAIN PANEL */}
      <motion.div
        className="absolute inset-y-0 right-0 w-[51%] overflow-hidden bg-[#051c14]"
        style={{
          background: "linear-gradient(225deg, #041811 0%, #072219 50%, #0c3628 100%)",
        }}
        animate={opening ? { x: "105%" } : { x: 0 }}
        transition={{ duration: 1.35, delay: 0.2, ease: easeCurve }}
        onAnimationComplete={() => {
          if (opening) {
            onOpened();
          }
        }}
      >
        {/* Subtle mandala overlay */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: "url('/images/mandala.png')",
            backgroundSize: "cover",
            backgroundPosition: "left center",
          }}
        />
        {/* Velvet daisy bottom-right */}
        <img
          src="/images/daisies.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute -bottom-10 -right-10 w-40 sm:w-56 opacity-75 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
        />
        {/* Gold seam edge on the left side of right panel */}
        <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-gold to-transparent shadow-[0_0_15px_rgba(229,193,120,0.7)]" />
      </motion.div>

      {/* CENTER GLOW SEAM FLASH ON OPEN */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 left-1/2 w-24 -translate-x-1/2"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255, 242, 200, 0.8), transparent)",
          filter: "blur(12px)",
        }}
        initial={{ opacity: 0.35, scaleX: 0.3 }}
        animate={
          opening
            ? { opacity: [0.35, 1, 0], scaleX: [0.3, 2.5, 4] }
            : { opacity: 0.35, scaleX: 0.3 }
        }
        transition={{ duration: 1.35, delay: 0.2, ease: easeCurve }}
      />

      {/* CENTER CALL-TO-OPEN CARD & MONOGRAM SEAL */}
      <AnimatePresence>
        {!opening && (
          <motion.div
            key="center-invitation-seal"
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Top Ornamental Star Crest */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="flex items-center justify-center gap-3 mb-2"
            >
              <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
              <svg
                className="h-5 w-5 text-gold drop-shadow-[0_0_8px_rgba(229,193,120,0.7)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M12 2L14.5 8.5L21 9.5L16 14L17.5 20.5L12 17L6.5 20.5L8 14L3 9.5L9.5 8.5L12 2Z"
                  fill="currentColor"
                  fillOpacity="0.35"
                />
              </svg>
              <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
            </motion.div>

            {/* Bismillah Calligraphy */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="font-arabic text-2xl sm:text-3xl text-gold-bright drop-shadow-[0_2px_15px_rgba(247,230,184,0.5)]"
            >
              بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="mt-3 font-display text-[0.62rem] min-[360px]:text-[0.68rem] uppercase tracking-[0.42em] text-gold-soft/90 font-medium"
            >
              The Engagement Ceremony Of
            </motion.p>

            {/* Couple Names */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-2 font-script text-5xl sm:text-7xl text-gradient-gold drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] px-2"
            >
              Muskan &amp; Sufiyan
            </motion.h1>

            {/* Gold separator rule */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mt-3 h-[1px] w-28 bg-gradient-to-r from-transparent via-gold/80 to-transparent"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="mt-2.5 text-[0.65rem] sm:text-xs uppercase tracking-[0.28em] text-cream/80"
            >
              Friday, 30 October 2026 · Nagpur
            </motion.p>

            {/* Royal Gold Wax Seal Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.65, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-col items-center"
            >
              <motion.button
                type="button"
                onClick={handleOpen}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="group relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center cursor-pointer rounded-full p-1"
                aria-label="Open wedding invitation"
              >
                {/* Outer animated halo rings */}
                <motion.span
                  className="absolute inset-0 rounded-full border border-gold/40"
                  animate={{ scale: [1, 1.28, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ repeat: Infinity, duration: 2.8, ease: "easeOut" }}
                />
                <motion.span
                  className="absolute -inset-2 rounded-full border border-gold/20"
                  animate={{ scale: [1, 1.38, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2.8, delay: 0.5, ease: "easeOut" }}
                />

                {/* Wax seal gold medallion */}
                <div
                  className="relative flex h-full w-full items-center justify-center rounded-full shadow-[0_12px_35px_rgba(0,0,0,0.8),0_0_30px_rgba(229,193,120,0.4)] transition-transform duration-300 group-hover:shadow-[0_15px_45px_rgba(0,0,0,0.9),0_0_40px_rgba(247,230,184,0.6)]"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 30%, #fff6db 0%, #ecd080 30%, #cf9e46 70%, #996e23 100%)",
                  }}
                >
                  {/* Embossed inner border rings */}
                  <div className="absolute inset-1.5 rounded-full border border-[#8a6523]/50 pointer-events-none" />
                  <div className="absolute inset-2.5 rounded-full border border-dashed border-[#8a6523]/40 pointer-events-none" />

                  {/* Monogram letters */}
                  <div className="flex flex-col items-center justify-center">
                    <span className="font-royal text-2xl sm:text-3xl font-bold tracking-wider text-[#062017] drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">
                      M &amp; S
                    </span>
                    <Sparkles className="h-3 w-3 text-[#062017]/70 -mt-0.5" />
                  </div>
                </div>
              </motion.button>

              {/* Action Button & Hint */}
              <motion.button
                type="button"
                onClick={handleOpen}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-[#072219]/90 px-6 py-2.5 text-[0.68rem] uppercase tracking-[0.3em] font-medium text-gold-soft shadow-[0_8px_25px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-colors hover:border-gold hover:text-gold-bright"
              >
                <span>Open Invitation</span>
                <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </motion.button>

              <motion.p
                className="mt-3 text-[0.58rem] sm:text-[0.62rem] uppercase tracking-[0.35em] text-gold/70"
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              >
                Tap the seal to reveal
              </motion.p>
            </motion.div>

            {/* Quick Skip Button */}
            <button
              type="button"
              onClick={handleOpen}
              className="absolute right-4 bottom-4 sm:right-6 sm:bottom-6 text-[0.58rem] uppercase tracking-[0.25em] text-cream/40 hover:text-cream/80 transition-colors cursor-pointer py-1 px-2"
            >
              Skip →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default IntroGate;
