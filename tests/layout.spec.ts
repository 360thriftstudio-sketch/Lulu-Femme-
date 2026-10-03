import { expect, test } from "@playwright/test";
import { pages } from "./pages";

test.describe("no horizontal scroll", () => {
  for (const path of pages) {
    test(path, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      const overflow = await page.evaluate(() => {
        const w = document.documentElement.clientWidth;
        const offenders = [...document.querySelectorAll<HTMLElement>("body *")]
          .filter((el) => {
            const r = el.getBoundingClientRect();
            return (
              r.width > 0 &&
              (r.right > w + 1 || r.left < -1) &&
              getComputedStyle(el).position !== "fixed"
            );
          })
          .filter((el) => !el.closest("dialog, [class*='overflow-x-auto'], .sr-only"))
          .slice(0, 5)
          .map((el) => `${el.tagName}.${el.className.toString().slice(0, 60)}`);
        return { scroll: document.documentElement.scrollWidth - w, offenders };
      });
      expect(overflow.scroll, overflow.offenders.join("\n")).toBeLessThanOrEqual(0);
    });
  }
});

test("header logo swaps on scroll and back", async ({ page }) => {
  await page.goto("/");
  const header = page.locator("header[data-scrolled]");
  await expect(header).toHaveAttribute("data-scrolled", "false");
  await page.mouse.wheel(0, 400);
  await expect(header).toHaveAttribute("data-scrolled", "true");
  // hidden logo is aria-hidden, so only one name is exposed
  const home = page.getByRole("link", { name: "Lulu Femme home" });
  await expect(home).toBeVisible();
  // menu / icons don't overlap the logo
  const logoBox = (await home.boundingBox())!;
  const basket = (await header.getByRole("link", { name: /Quote basket/ }).boundingBox())!;
  expect(logoBox.x + logoBox.width).toBeLessThanOrEqual(basket.x);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(header).toHaveAttribute("data-scrolled", "false");
});

test("keyboard: skip link, menu and quote flow", async ({ page }, info) => {
  await page.goto("/bundles/lf-03");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
  const add = page.getByRole("button", { name: "Add LF-03 to quote" }).first();
  await add.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("link", { name: "Quote basket: 1 bundle" })).toBeVisible();
  if (info.project.name === "mobile") {
    await page.getByRole("button", { name: "Open menu" }).focus();
    await page.keyboard.press("Enter");
    const dialog = page.getByRole("dialog", { name: "Menu" });
    await expect(dialog).toBeVisible();
    for (let i = 0; i < 25; i++) await page.keyboard.press("Tab");
    const inside = await page.evaluate(() => !!document.activeElement?.closest("dialog"));
    expect(inside).toBe(true);
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  }
});

test("filters sync to URL and search works", async ({ page }) => {
  await page.goto("/bundles?type=Leggings&pcs=15");
  await expect(page.getByText("Showing 2 of 10 bundles")).toBeVisible();
  await page.goto("/bundles?q=define");
  await expect(page.getByText(/Showing 6 of 10/)).toBeVisible();
  await page.goto("/bundles?q=LF-06");
  await expect(page.getByText("Showing 1 of 10 bundles")).toBeVisible();
});
