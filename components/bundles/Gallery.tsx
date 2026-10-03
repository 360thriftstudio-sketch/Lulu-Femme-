"use client";
import Image from "next/image";
import { useState, type PointerEvent } from "react";
import { Modal } from "@/components/ui/Modal";
import { VideoIcon } from "@/components/layout/Icons";
import { cn } from "@/lib/cn";

/** Main photo with a zoom lightbox, plus a video slot. */
export function Gallery({
  image,
  alt,
  video,
  code,
}: {
  image: string;
  alt: string;
  video?: string;
  code: string;
}) {
  const [tab, setTab] = useState<"photo" | "video">("photo");
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!zoomed) return;
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(
      `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`,
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[1173/1341] overflow-hidden rounded-2xl border border-line bg-blush">
        {tab === "photo" ? (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group absolute inset-0 cursor-zoom-in"
            aria-label={`Zoom photo of bundle ${code}`}
          >
            <Image
              src={image}
              alt={alt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain"
            />
            <span className="absolute right-3 bottom-3 rounded-full bg-ink/80 px-3 py-1.5 text-xs font-semibold text-offwhite">
              Tap to zoom
            </span>
          </button>
        ) : video ? (
          video.endsWith(".mp4") || video.endsWith(".webm") ? (
            <video src={video} controls playsInline className="h-full w-full object-cover">
              <track kind="captions" />
            </video>
          ) : (
            <iframe
              src={video}
              title={`Video of bundle ${code}`}
              className="h-full w-full"
              allow="accelerometer; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          )
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
            <VideoIcon className="h-12 w-12 text-pink-ink" />
            <p className="display text-2xl text-plum">Video coming soon</p>
            <p className="max-w-xs text-sm text-ink">
              Every bundle is filmed piece by piece. Ask for the video of {code} with your quote.
            </p>
          </div>
        )}
      </div>
      <div role="group" aria-label="Media" className="flex gap-2">
        {(["photo", "video"] as const).map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={tab === t}
            onClick={() => setTab(t)}
            className={cn(
              "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold",
              tab === t
                ? "border-pink bg-pink text-on-pink"
                : "border-line-strong bg-card text-ink",
            )}
          >
            {t === "video" && <VideoIcon className="h-4 w-4" />}
            {t === "photo" ? "Photo" : "Video"}
          </button>
        ))}
      </div>

      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setZoomed(false);
        }}
        title={`Bundle ${code} photo`}
        className="w-[min(96vw,900px)]"
      >
        <p className="mb-3 text-sm text-muted">
          {zoomed ? "Move over the photo to look around. " : ""}Press the zoom button to{" "}
          {zoomed ? "zoom out" : "zoom in"}.
        </p>
        <div
          className="relative aspect-[1173/1341] max-h-[70vh] w-full overflow-hidden rounded-xl bg-blush"
          onPointerMove={onMove}
        >
          <Image
            src={image}
            alt={alt}
            fill
            sizes="900px"
            quality={90}
            className="object-contain transition-transform duration-200"
            style={{ transform: zoomed ? "scale(2.2)" : "scale(1)", transformOrigin: origin }}
          />
        </div>
        <button
          type="button"
          aria-pressed={zoomed}
          onClick={() => setZoomed((z) => !z)}
          className="mt-3 inline-flex min-h-11 items-center rounded-full bg-pink px-5 font-semibold text-on-pink hover:bg-pink-hover"
        >
          {zoomed ? "Zoom out" : "Zoom in"}
        </button>
      </Modal>
    </div>
  );
}
