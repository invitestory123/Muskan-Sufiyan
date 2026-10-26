import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music, Pause, Play, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    YT?: any;
  }
}

export const WEDDING_SONG_ID = "ivrumxRUz_Y";
export const WEDDING_SONG_URL = `https://youtu.be/${WEDDING_SONG_ID}`;

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // 1. Inject YouTube IFrame API script if not present
    const tagId = "youtube-iframe-api";
    if (!document.getElementById(tagId)) {
      const tag = document.createElement("script");
      tag.id = tagId;
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;
      if (playerRef.current) return;

      try {
        playerRef.current = new window.YT.Player("youtube-audio-embed", {
          height: "1",
          width: "1",
          videoId: WEDDING_SONG_ID,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            enablejsapi: 1,
            fs: 0,
            loop: 1,
            playlist: WEDDING_SONG_ID,
            playsinline: 1,
            rel: 0,
            modestbranding: 1,
          },
          events: {
            onReady: () => {
              setIsReady(true);
            },
            onStateChange: (event: { data: number }) => {
              // YT.PlayerState: 1 = PLAYING, 2 = PAUSED, 0 = ENDED, 3 = BUFFERING
              if (event.data === 1) {
                setIsPlaying(true);
              } else if (event.data === 2 || event.data === 0) {
                setIsPlaying(false);
              }
            },
          },
        });
      } catch (err) {
        console.warn("YouTube player initialization note:", err);
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        initPlayer();
      };
    }

    // Listen to global toggle event (e.g. from Hero section button)
    const handleGlobalToggle = () => {
      togglePlay();
    };
    window.addEventListener("toggle-wedding-music", handleGlobalToggle);

    return () => {
      window.removeEventListener("toggle-wedding-music", handleGlobalToggle);
      try {
        if (playerRef.current && typeof playerRef.current.destroy === "function") {
          playerRef.current.destroy();
          playerRef.current = null;
        }
      } catch {
        // cleanup safe
      }
    };
  }, []);

  const togglePlay = () => {
    if (!playerRef.current || !isReady) {
      // If player is not yet ready, open YouTube track in new tab or wait
      try {
        if (playerRef.current && typeof playerRef.current.playVideo === "function") {
          playerRef.current.playVideo();
          setIsPlaying(true);
          return;
        }
      } catch {
        // fallback
      }
      window.open(WEDDING_SONG_URL, "_blank");
      return;
    }

    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    } catch {
      window.open(WEDDING_SONG_URL, "_blank");
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!playerRef.current) return;
    try {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    } catch (e) {
      console.warn("Mute toggle note:", e);
    }
  };

  return (
    <>
      {/* Hidden container for YouTube Iframe */}
      <div
        id="youtube-audio-embed"
        aria-hidden="true"
        className="pointer-events-none fixed -left-[9999px] -top-[9999px] h-1 w-1 opacity-0"
      />

      {/* Floating Pill Player */}
      <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-5 z-40 flex items-center gap-1.5 sm:gap-2 max-w-[calc(100vw-1.5rem)]">
        <motion.button
          type="button"
          onClick={togglePlay}
          whileTap={{ scale: 0.94 }}
          whileHover={{ scale: 1.03 }}
          aria-label={isPlaying ? "Pause wedding song" : "Play wedding song"}
          className="group relative flex items-center gap-2.5 sm:gap-3 rounded-full border border-gold/50 bg-[#072219]/92 px-3 sm:px-4 py-2 sm:py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.7),0_0_20px_rgba(229,193,120,0.2)] backdrop-blur-md transition-all hover:border-gold hover:shadow-[0_0_25px_rgba(230,195,110,0.4)]"
        >
          {/* Animated sound wave bars when playing */}
          <span className="relative flex h-4 w-4 items-center justify-center">
            {isPlaying ? (
              <span className="flex items-end gap-[2px] h-3.5">
                <span
                  className="w-[2.5px] bg-gold-bright rounded-full animate-[pulse_0.6s_ease-in-out_infinite]"
                  style={{ height: "65%" }}
                />
                <span
                  className="w-[2.5px] bg-gold-bright rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.15s]"
                  style={{ height: "100%" }}
                />
                <span
                  className="w-[2.5px] bg-gold-bright rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.3s]"
                  style={{ height: "75%" }}
                />
                <span
                  className="w-[2.5px] bg-gold-bright rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.45s]"
                  style={{ height: "90%" }}
                />
              </span>
            ) : (
              <Music className="h-4 w-4 text-gold/90 group-hover:text-gold-bright group-hover:scale-110 transition-transform" />
            )}
          </span>

          <div className="flex flex-col text-left">
            <span className="text-[0.68rem] font-bold tracking-wider text-cream uppercase leading-tight">
              {isPlaying ? "Music Playing" : "Play Song"}
            </span>
            <span className="text-[0.58rem] tracking-wider text-gold-soft/80 leading-tight">
              Muskan &amp; Sufiyan
            </span>
          </div>

          <div className="ml-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-gold/20 text-gold-bright border border-gold/40">
            {isPlaying ? <Pause className="h-3 w-3 fill-current" /> : <Play className="h-3 w-3 fill-current ml-0.5" />}
          </div>
        </motion.button>

        <AnimatePresence>
          {isPlaying && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              type="button"
              onClick={toggleMute}
              whileTap={{ scale: 0.92 }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-[#072219]/90 text-gold shadow-[0_8px_25px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all hover:border-gold hover:text-gold-soft"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default AudioPlayer;
