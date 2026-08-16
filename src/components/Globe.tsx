"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import type { GlobeMethods } from "react-globe.gl";
import type { ContentSummary } from "@/types/content";
import { useTimePeriod } from "@/hooks/useTimePeriod";

const ReactGlobe = dynamic(() => import("react-globe.gl"), { ssr: false });

interface GlobePoint {
  lat: number;
  lng: number;
  label: string;
  kind: ContentSummary["kind"];
  slug: string;
  emoji: string;
  size: number;
}

const KIND_COLOR: Record<ContentSummary["kind"], string> = {
  country: "#d9603c",
  guide: "#1f4b33",
  post: "#e0a94f",
};

const ATMOSPHERE_COLOR: Record<string, string> = {
  dawn: "#ffb38a",
  day: "#7ec8ec",
  dusk: "#c9679a",
  night: "#3b4d9e",
};

const LIGHT_CONFIG: Record<string, { ambient: string; ambientIntensity: number; sun: string; sunIntensity: number }> = {
  dawn: { ambient: "#8892b0", ambientIntensity: 0.55, sun: "#ffd9ae", sunIntensity: 1.5 },
  day: { ambient: "#8fa8c2", ambientIntensity: 0.65, sun: "#ffffff", sunIntensity: 1.65 },
  dusk: { ambient: "#7a6a9a", ambientIntensity: 0.5, sun: "#ffb27a", sunIntensity: 1.4 },
  night: { ambient: "#3b4470", ambientIntensity: 0.45, sun: "#c7d4ff", sunIntensity: 0.9 },
};

export default function Globe({ items }: { items: ContentSummary[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const router = useRouter();
  const period = useTimePeriod();
  const [size, setSize] = useState({ width: 480, height: 480 });
  const [ready, setReady] = useState(false);

  const points: GlobePoint[] = useMemo(
    () =>
      items.map((item) => ({
        lat: item.lat,
        lng: item.lng,
        label: item.kind === "country" ? item.country : item.title,
        kind: item.kind,
        slug: item.slug,
        emoji: item.emoji,
        size: item.kind === "country" ? 0.6 : 0.35,
      })),
    [items]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const dim = Math.min(entry.contentRect.width, entry.contentRect.height || entry.contentRect.width);
      setSize({ width: dim, height: dim });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleGlobeReady = () => {
    const globe = globeRef.current;
    if (!globe) return;
    const controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.55;
    controls.enableZoom = true;
    controls.minDistance = 150;
    controls.maxDistance = 500;
    setReady(true);
  };

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe || !ready) return;
    const cfg = LIGHT_CONFIG[period];
    const ambient = new THREE.AmbientLight(cfg.ambient, cfg.ambientIntensity);
    const sun = new THREE.DirectionalLight(cfg.sun, cfg.sunIntensity);
    sun.position.set(-1.4, 1, 1.2);
    globe.lights([ambient, sun]);
  }, [ready, period]);

  const handlePointClick = (point: object) => {
    const p = point as GlobePoint;
    if (p.kind === "country") {
      router.push(`/countries/${p.slug}`);
    } else {
      router.push(`/${p.kind === "guide" ? "guides" : "blog"}/${p.slug}`);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative mx-auto aspect-square w-full max-w-[560px]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[6%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.28) 16%, rgba(255,255,255,0) 42%)",
          mixBlendMode: "screen",
          zIndex: 2,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[6%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 68% 78%, rgba(5,10,25,0.45) 0%, rgba(5,10,25,0.12) 30%, rgba(5,10,25,0) 55%)",
          mixBlendMode: "multiply",
          zIndex: 2,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[12%] bottom-[2%] h-8 rounded-[50%] blur-xl"
        style={{ background: "rgba(10,15,35,0.28)", zIndex: 0 }}
      />
      <ReactGlobe
        ref={globeRef}
        width={size.width}
        height={size.height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="/globe/earth-day.jpg"
        bumpImageUrl="/globe/earth-topology.png"
        atmosphereColor={ATMOSPHERE_COLOR[period]}
        atmosphereAltitude={0.22}
        pointsData={points}
        pointLat="lat"
        pointLng="lng"
        pointColor={(d) => KIND_COLOR[(d as GlobePoint).kind]}
        pointAltitude={0.02}
        pointRadius={(d) => (d as GlobePoint).size}
        pointLabel={(d) => {
          const p = d as GlobePoint;
          return `<div style="font:600 12px Inter, sans-serif; padding:4px 8px; background:white; color:#142033; border-radius:8px; box-shadow:0 8px 20px rgba(0,0,0,0.15)">${p.emoji} ${p.label}</div>`;
        }}
        onPointClick={handlePointClick}
        onGlobeReady={handleGlobeReady}
        animateIn
      />
    </div>
  );
}
