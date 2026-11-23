import { ImageResponse } from "next/og";

export const alt = "Prabhat Bajpai, software engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The link preview shown when the site is shared (LinkedIn, X, Slack, email).
export default function OpengraphImage() {
  const dots = [];
  for (let y = 0; y < 7; y++) {
    for (let x = 0; x < 34; x++) {
      const d = Math.hypot(x - 17, (y - 3) * 2.4);
      const alpha = d > 9 && d < 12.5 ? 0.55 : 0.12;
      dots.push(
        <div
          key={`${x}-${y}`}
          style={{
            position: "absolute",
            left: 80 + x * 31,
            top: 70 + y * 22,
            width: 5,
            height: 5,
            borderRadius: 5,
            background: `rgba(237, 237, 236, ${alpha})`,
          }}
        />,
      );
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "80px",
          background: "#111111",
          color: "#ededec",
          position: "relative",
        }}
      >
        {dots}
        <div style={{ fontSize: 68, fontWeight: 600, letterSpacing: -1.5 }}>Prabhat Bajpai</div>
        <div style={{ fontSize: 32, color: "#9a9a98", marginTop: 14 }}>
          Software engineer · automation, AI tooling and real hardware
        </div>
        <div style={{ display: "flex", alignItems: "center", fontSize: 26, marginTop: 34 }}>
          <div
            style={{ width: 14, height: 14, borderRadius: 14, background: "#22a55b", marginRight: 14 }}
          />
          Open to work · Bengaluru · prabhatisdev.vercel.app
        </div>
      </div>
    ),
    size,
  );
}
