import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { company } from "@/data/content";

export const alt = `${company.name} | Gold Dealing & Refining`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(join(process.cwd(), "public/Logo.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "56px 72px",
          background:
            "linear-gradient(135deg, #003b49 0%, #002a35 55%, #001820 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: "linear-gradient(90deg, #a68b4b 0%, #d4b86a 50%, #a68b4b 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -80,
            top: -80,
            width: 360,
            height: 360,
            border: "2px solid rgba(212, 184, 106, 0.15)",
            transform: "rotate(45deg)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            width={128}
            height={128}
            alt=""
            style={{ objectFit: "contain" }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                fontSize: 50,
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: -1,
                lineHeight: 1.1,
              }}
            >
              {company.name}
            </div>
            <div
              style={{
                fontSize: 26,
                color: "#d4b86a",
                fontWeight: 600,
                letterSpacing: 0.5,
              }}
            >
              Gold Dealing &amp; Refining
            </div>
            <div
              style={{
                fontSize: 20,
                color: "rgba(255,255,255,0.78)",
                maxWidth: 720,
                lineHeight: 1.4,
              }}
            >
              {company.tagline}
            </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 36,
            right: 72,
            fontSize: 17,
            color: "rgba(255,255,255,0.45)",
            letterSpacing: 1,
          }}
        >
          Kampala, Uganda
        </div>
      </div>
    ),
    { ...size },
  );
}