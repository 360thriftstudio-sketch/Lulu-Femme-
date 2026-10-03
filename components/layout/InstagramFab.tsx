import { site } from "@/lib/site";
import { InstagramIcon } from "./Icons";
import { TrackedLink } from "./TrackedLink";

export function InstagramFab() {
  return (
    <TrackedLink
      event="click_instagram"
      params={{ location: "floating_button" }}
      href={site.instagramUrl}
      external
      aria-label="Message Lulu Femme on Instagram (opens in a new tab)"
      className="fixed right-4 bottom-4 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-pink text-on-pink shadow-soft transition-transform hover:scale-105 hover:bg-pink-hover md:right-6 md:bottom-6"
    >
      <InstagramIcon className="h-7 w-7" />
    </TrackedLink>
  );
}
