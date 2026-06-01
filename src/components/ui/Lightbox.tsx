import { useEffect } from "react";
import { FilmImg } from "./FilmImg";

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
      className={
        "fixed inset-0 z-[200] bg-[rgba(0,0,0,0.93)] items-center justify-center p-10 " +
        (src ? "flex" : "hidden")
      }
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        className="absolute top-[22px] right-7 font-impact text-3xl text-white bg-none border-0 cursor-pointer"
        aria-label="Fermer"
        onClick={onClose}
      >
        ✕
      </button>
      {src && (
        <FilmImg
          fit="none"
          src={src}
          alt=""
          className="max-w-[92vw] max-h-[88vh] border-[3px] border-hazard shadow-[0_0_50px_rgba(0,0,0,0.8)] contrast-[1.15]"
        />
      )}
    </div>
  );
}
