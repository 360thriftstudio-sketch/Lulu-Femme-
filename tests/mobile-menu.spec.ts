import { expect, test } from "@playwright/test";

const links = [
  { name: "Shop Bundles", path: "/bundles" },
  { name: "How It Works", path: "/how-it-works" },
  { name: "Grading", path: "/grading" },
  { name: "Custom Orders", path: "/custom-orders" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

test.describe("mobile menu (375px)", () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) > 400, "mobile only");
  test.use({ hasTouch: true });

  for (const { name, path } of links) {
    test(`tapping "${name}" navigates and closes the menu`, async ({ page }) => {
      await page.goto("/");
      await page.getByRole("button", { name: "Open menu" }).tap();
      const menu = page.getByRole("dialog", { name: "Menu" });
      await expect(menu).toBeVisible();
      await menu.getByRole("link", { name, exact: true }).tap();
      await expect(page).toHaveURL(new RegExp(`${path}$`));
      await expect(menu).toBeHidden();
      // body scrolling restored
      expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
      // current page is highlighted when the menu is opened again
      await page.getByRole("button", { name: "Open menu" }).tap();
      await expect(menu.getByRole("link", { name, exact: true })).toHaveAttribute(
        "aria-current",
        "page",
      );
    });
  }

  test("Get a Quote and Saved buttons navigate", async ({ page }) => {
    await page.goto("/");
    const menu = page.getByRole("dialog", { name: "Menu" });
    await page.getByRole("button", { name: "Open menu" }).tap();
    await menu.getByRole("link", { name: "Get a Quote" }).tap();
    await expect(page).toHaveURL(/\/quote$/);
    await expect(menu).toBeHidden();
    await page.getByRole("button", { name: "Open menu" }).tap();
    await menu.getByRole("link", { name: /Saved/ }).tap();
    await expect(page).toHaveURL(/\/saved$/);
    await expect(menu).toBeHidden();
  });

  test("currency dropdown changes and keeps its value", async ({ page }) => {
    await page.goto("/");
    const menu = page.getByRole("dialog", { name: "Menu" });
    await page.getByRole("button", { name: "Open menu" }).tap();
    await menu.getByLabel("Currency").selectOption("EUR");
    await expect(menu.getByLabel("Currency")).toHaveValue("EUR");
    await page.reload();
    await page.getByRole("button", { name: "Open menu" }).tap();
    await expect(menu.getByLabel("Currency")).toHaveValue("EUR");
  });

  test("X and Escape close the menu, focus returns to the hamburger", async ({ page }) => {
    await page.goto("/");
    const burger = page.getByRole("button", { name: "Open menu" });
    const menu = page.getByRole("dialog", { name: "Menu" });
    await burger.tap();
    await menu.getByRole("button", { name: "Close" }).tap();
    await expect(menu).toBeHidden();
    await expect(burger).toBeFocused();

    await burger.focus();
    await page.keyboard.press("Enter");
    await expect(menu).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(burger).toBeFocused();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
  });

  test("keyboard: Tab reaches the links and Enter opens them", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).focus();
    await page.keyboard.press("Enter");
    const menu = page.getByRole("dialog", { name: "Menu" });
    await expect(menu).toBeVisible();
    for (let i = 0; i < 10; i++) {
      const name = await page.evaluate(() => document.activeElement?.textContent?.trim());
      if (name === "Grading") break;
      await page.keyboard.press("Tab");
    }
    await expect(menu.getByRole("link", { name: "Grading" })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/grading$/);
    await expect(menu).toBeHidden();
  });
});
