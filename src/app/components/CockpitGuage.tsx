import React from "react";

type Props = {
  label: string;
  value: number;        // aktualna wartość (np. %)
  max?: number;         // maks skali (domyślnie 100)
  dangerFrom?: number;  // od ilu na czerwono
  unit?: string;
};

export default function CockpitGauge({
  label, value, max = 100, dangerFrom = 80, unit
}: Props) {
  const r = 60;
  const c = 2 * Math.PI * r;
  const pct = Math.min(1, Math.max(0, value / max));
  const dash = c * pct;
  const rest = c - dash;
  const danger = value >= dangerFrom;

  return (
    <div style={{width: 180, height: 180, position: "relative"}}>
      <svg width="180" height="180" viewBox="0 0 180 180">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ef4444"/>
            <stop offset="100%" stopColor="#991b1b"/>
          </linearGradient>
        </defs>
        {/* tło skali */}
        <circle cx="90" cy="90" r={r} stroke="#1f2937" strokeWidth="14" fill="none"/>
        {/* aktywna część */}
        <circle
          cx="90" cy="90" r={r}
          stroke={danger ? "url(#g)" : "#22d3ee"}
          strokeWidth="14" fill="none"
          strokeDasharray={`${dash} ${rest}`} strokeLinecap="round"
          transform="rotate(-90 90 90)"
        />
        {/* wskazanie */}
        <text x="90" y="92" textAnchor="middle" fontSize="26" fill="#e5e7eb" fontFamily="ui-sans-serif">
          {Math.round(value)}{unit ?? ""}
        </text>
        <text x="90" y="120" textAnchor="middle" fontSize="12" fill="#9ca3af">
          {label}
        </text>
      </svg>
      <div style={{
        position:"absolute", inset:0, borderRadius:20, pointerEvents:"none",
        boxShadow:"inset 0 0 0 1px #111, 0 10px 30px rgba(0,0,0,.4)"
      }}/>
    </div>
  );
}
