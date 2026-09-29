import { ImageResponse } from "next/og";
import { fest } from "@/data/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#1c0407",
        backgroundImage:
          "radial-gradient(circle at 50% 25%, #5c1119 0%, #1c0407 65%)",
        color: "#f5e9d3",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 24,
          letterSpacing: 8,
          textTransform: "uppercase",
          color: "#e8c77e",
          marginBottom: 24,
        }}
      >
        {fest.university}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 160,
          fontWeight: 700,
          color: "#f4d896",
        }}
      >
        {fest.name}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 34,
          marginTop: 20,
          color: "#f5e9d3",
        }}
      >
        {fest.theme}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 26,
          marginTop: 28,
          color: "#c9a6f0",
          letterSpacing: 2,
        }}
      >
        {fest.dates}
      </div>
    </div>,
    { ...size },
  );
}
