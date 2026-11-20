import { ImageResponse } from "next/og";

export const alt = "BGG Website Design: websites that turn visitors into paying clients";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4f2ec",
          padding: "64px 72px",
          color: "#121210",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              background: "#121210",
              color: "#f4f2ec",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            BGG
          </div>
          <div style={{ fontSize: 30, fontWeight: 700 }}>BGG Website Design</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1, letterSpacing: -3, maxWidth: 1000 }}>
            Websites that turn visitors into paying clients.
          </div>
          <div style={{ display: "flex", marginTop: 26, height: 10, width: 260, background: "#ff5a1f", borderRadius: 10 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#33322e" }}>
          <span>Web designer · Solihull &amp; UK-wide</span>
          <span style={{ fontWeight: 700 }}>From £199.99 · No VAT</span>
        </div>
      </div>
    ),
    size
  );
}
