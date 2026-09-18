import { ImageResponse } from "next/og";
import { fest } from "@/data/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000716",
          backgroundImage:
            "radial-gradient(circle at 50% 25%, #16161f 0%, #000716 65%)",
          color: "#fdf0cc",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#ff6fa3",
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
            color: "#fc4a87",
          }}
        >
          {fest.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            marginTop: 20,
            color: "#fdf0cc",
          }}
        >
          {fest.theme}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            marginTop: 28,
            color: "#feba7d",
            letterSpacing: 2,
          }}
        >
          {fest.dates}
        </div>
      </div>
    ),
    { ...size },
  );
}
