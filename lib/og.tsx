import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Shared branded Open Graph image. */
export async function brandOgImage(headline: string, subline: string) {
  const logo = await readFile(join(process.cwd(), "public/brand/logo-icon.png"));
  const src = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        background: "#fcfef1",
        color: "#8e2550",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain img */}
      <img src={src} width={160} height={125} alt="" />
      <div
        style={{ fontSize: 72, fontWeight: 800, marginTop: 40, lineHeight: 1.05, color: "#8e2550" }}
      >
        {headline}
      </div>
      <div style={{ fontSize: 32, marginTop: 24, color: "#2a1320" }}>{subline}</div>
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: 16,
          background: "#e3165b",
        }}
      />
    </div>,
    ogSize,
  );
}
