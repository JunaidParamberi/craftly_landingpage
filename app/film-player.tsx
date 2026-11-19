"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./film-player.css";

type Chapter = { t: number; label: string };

const CHAPTERS: Chapter[] = [
  { t: 0, label: "Too many apps" },
  { t: 12.6, label: "Quote to invoice" },
  { t: 18.2, label: "Project" },
  { t: 23.5, label: "Kraft" },
  { t: 39.8, label: "Payment" },
  { t: 45, label: "Profit" },
  { t: 50, label: "AI chat" },
];

const fmt = (s: number) => {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${String(r).padStart(2, "0")}`;
};

export default function FilmPlayer({
  src,
  poster,
  label = "CraftlyAI product film",
  signupHref = "https://app.craftlyai.app/auth/sign-up",
}: {
  src: string;
  poster: string;
  label?: string;
  signupHref?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [muted, setMuted] = useState(false);
  const [t, setT] = useState(0);
  const [dur, setDur] = useState(63.2);
  const [buffered, setBuffered] = useState(0);
  const [show, setShow] = useState(true);
  const [hover, setHover] = useState<{ x: number; t: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const idle = useRef<ReturnType<typeof setTimeout> | null>(null);

  const poke = useCallback(() => {
    setShow(true);
    if (idle.current) clearTimeout(idle.current);
    idle.current = setTimeout(() => setShow(false), 2600);
  }, []);

  useEffect(() => () => { if (idle.current) clearTimeout(idle.current); }, []);

  const play = useCallback(() => {
    const v = vid.current;
    if (!v) return;
    if (ended) { v.currentTime = 0; setEnded(false); }
    setStarted(true);
    v.play().catch(() => {});
    poke();
  }, [ended, poke]);

  const toggle = useCallback(() => {
    const v = vid.current;
    if (!v) return;
    if (v.paused || v.ended) play();
    else { v.pause(); setShow(true); }
  }, [play]);

  const seek = useCallback((to: number) => {
    const v = vid.current;
    if (!v) return;
    v.currentTime = Math.max(0, Math.min(dur, to));
    setT(v.currentTime);
    if (ended && to < dur - 0.2) setEnded(false);
  }, [dur, ended]);

  const timeAt = (clientX: number) => {
    const r = bar.current?.getBoundingClientRect();
    if (!r) return 0;
    return Math.max(0, Math.min(1, (clientX - r.left) / r.width)) * dur;
  };

  const fullscreen = () => {
    const el: any = wrap.current;
    const doc: any = document;
    if (doc.fullscreenElement || doc.webkitFullscreenElement) (doc.exitFullscreen || doc.webkitExitFullscreen)?.call(doc);
    else if (el?.requestFullscreen) el.requestFullscreen();
    else (vid.current as any)?.webkitEnterFullscreen?.();
  };

  const toggleMute = () => {
    const v = vid.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const onKey = (e: React.KeyboardEvent) => {
    const k = e.key.toLowerCase();
    if (k === " " || k === "k") { e.preventDefault(); toggle(); }
    else if (k === "arrowright") { e.preventDefault(); seek(t + 5); poke(); }
    else if (k === "arrowleft") { e.preventDefault(); seek(t - 5); poke(); }
    else if (k === "m") toggleMute();
    else if (k === "f") fullscreen();
  };

  useEffect(() => {
    if (!dragging) return;
    const move = (e: PointerEvent) => seek(timeAt(e.clientX));
    const up = () => setDragging(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
  });

  const pct = dur ? (t / dur) * 100 : 0;
  const chapterNow = [...CHAPTERS].reverse().find((c) => t >= c.t)?.label ?? "";
  const controlsVisible = !started || !playing || show || dragging;

  return (
    <div
      ref={wrap}
      className="fp"
      onMouseMove={poke}
      onMouseLeave={() => playing && setShow(false)}
      onKeyDown={onKey}
      tabIndex={0}
      role="region"
      aria-label={label}
      data-playing={playing ? "1" : "0"}
    >
      <video
        ref={vid}
        className="fp-video"
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        onClick={toggle}
        onPlay={() => { setPlaying(true); setEnded(false); }}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setEnded(true); setShow(true); }}
        onTimeUpdate={(e) => setT(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDur(e.currentTarget.duration || 63.2)}
        onProgress={(e) => {
          const v = e.currentTarget;
          if (v.buffered.length) setBuffered((v.buffered.end(v.buffered.length - 1) / (v.duration || 1)) * 100);
        }}
        aria-label={label}
      />

      {!started && (
        <button type="button" className="fp-start" onClick={play} aria-label="Play the product film">
          <span className="fp-big"><svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="#3550E0" /></svg></span>
          <span className="fp-start-label"><b>Watch the 1-minute tour</b><span>1:03 · with sound</span></span>
        </button>
      )}

      {ended && (
        <div className="fp-end">
          <b>Ready to try it on real work?</b>
          <div className="fp-end-row">
            <button type="button" className="fp-ghost" onClick={play}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>
              Replay
            </button>
            <a className="fp-cta" href={signupHref}>Start free</a>
          </div>
        </div>
      )}

      {started && !ended && (
        <div className={"fp-bar" + (controlsVisible ? " on" : "")}>
          <div
            ref={bar}
            className="fp-track"
            role="slider"
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={Math.round(dur)}
            aria-valuenow={Math.round(t)}
            aria-valuetext={`${fmt(t)} of ${fmt(dur)}`}
            tabIndex={0}
            onPointerDown={(e) => { setDragging(true); seek(timeAt(e.clientX)); }}
            onPointerMove={(e) => setHover({ x: e.nativeEvent.offsetX, t: timeAt(e.clientX) })}
            onPointerLeave={() => setHover(null)}
          >
            <div className="fp-rail">
              <div className="fp-buf" style={{ width: `${buffered}%` }} />
              <div className="fp-fill" style={{ width: `${pct}%` }} />
            </div>
            {CHAPTERS.slice(1).map((c) => (
              <span key={c.t} className="fp-mark" style={{ left: `${(c.t / dur) * 100}%` }} />
            ))}
            <span className="fp-knob" style={{ left: `${pct}%` }} />
            {hover && (
              <span className="fp-tip" style={{ left: hover.x }}>
                {[...CHAPTERS].reverse().find((c) => hover.t >= c.t)?.label} · {fmt(hover.t)}
              </span>
            )}
          </div>

          <div className="fp-row">
            <button type="button" className="fp-btn" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
              {playing ? (
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1.2" fill="currentColor" /><rect x="14" y="5" width="4" height="14" rx="1.2" fill="currentColor" /></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor" /></svg>
              )}
            </button>
            <span className="fp-time">{fmt(t)} <span>/ {fmt(dur)}</span></span>
            <span className="fp-chap">{chapterNow}</span>
            <span style={{ flex: 1 }} />
            <button type="button" className="fp-btn" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"}>
              {muted ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4z" /><path d="m22 9-6 6M16 9l6 6" /></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" /></svg>
              )}
            </button>
            <button type="button" className="fp-btn" onClick={fullscreen} aria-label="Full screen">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" /></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
