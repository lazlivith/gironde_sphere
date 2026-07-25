/* Splash.jsx — Orange gradient splash screen with logo */
import { useEffect } from "react";

export default function Splash({ onFinish }) {
  useEffect(() => {
    const t = setTimeout(onFinish, 2200);
    return () => clearTimeout(t);
  }, [onFinish]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface">
      {/* Logo container */}
      <div className="flex flex-col items-center gap-6 animate-[fadeUp_0.6s_ease_forwards]">
        <div className="flex items-center justify-center animate-pulse">
          <img src="/assets/Logo.png" alt="Logo" className="w-80 h-auto" />
        </div>

        <div className="text-center">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink">
            GirondeSphere
          </h1>
          <p className="mt-2 text-sm text-primary font-medium tracking-wide">Fast-Food & Juice Bar</p>
        </div>
      </div>

      {/* Loading dots */}
      <div className="absolute bottom-16 flex gap-2">
        {[0, 0.2, 0.4].map((delay, i) => (
          <div
            key={i}
            className="h-2 w-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
