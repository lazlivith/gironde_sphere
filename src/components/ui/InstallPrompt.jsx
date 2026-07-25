import { useState, useEffect } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
  };

  if (!deferredPrompt || isDismissed) {
    return null;
  }

  return (
    <div className="fixed top-4 left-1/2 z-[100] w-[calc(100%-32px)] max-w-[398px] -translate-x-1/2 animate-slide-up rounded-2xl bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <img src="/icons/icon-192.png" alt="Logo" className="w-10 h-10 rounded-xl" />
        <div className="flex flex-col">
          <span className="font-display text-[14px] font-bold text-ink leading-tight">Installer Songolo</span>
          <span className="text-[11px] text-muted leading-tight mt-0.5">Pour commander plus vite</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setIsDismissed(true)} 
          className="text-muted p-2"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <button 
          onClick={handleInstallClick}
          className="rounded-full bg-primary px-4 py-2 text-[12px] font-bold text-white shadow-md shadow-primary/30"
        >
          Installer
        </button>
      </div>
    </div>
  );
}
