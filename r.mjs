import { chromium } from "playwright-core";
const b = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
});
const p = await b.newPage({
  viewport: { width: 375, height: 812 },
  hasTouch: true,
  isMobile: true,
});
await p.goto("http://localhost:3100/");
await p.getByRole("button", { name: "Open menu" }).tap();
const link = p.getByRole("dialog").getByRole("link", { name: "Grading" });
const box = await link.boundingBox();
const hit = await p.evaluate(
  ([x, y]) => {
    const el = document.elementFromPoint(x, y);
    return el ? el.tagName + " " + getComputedStyle(el).pointerEvents : null;
  },
  [box.x + 20, box.y + box.height / 2],
);
console.log("element at tap point:", hit);
await p.touchscreen.tap(box.x + 20, box.y + box.height / 2);
await p.waitForTimeout(800);
console.log("url after tap:", p.url(), "menu open:", await p.getByRole("dialog").isVisible());
await b.close();
