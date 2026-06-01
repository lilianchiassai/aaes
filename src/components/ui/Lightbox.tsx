import { useEffect } from "react";

/** Full-screen image lightbox (Esc / backdrop / × to close). */
export function Lightbox({ src, onClose }: { src: string | null; onClose: () => void }) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [src, onClose]);

  return (
    <div
      className={"lb" + (src ? " open" : "")}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button className="lb__x" aria-label="Fermer" onClick={onClose}>
        ✕
      </button>
      {src && <img src={src} alt="" />}
    </div>
  );
}
