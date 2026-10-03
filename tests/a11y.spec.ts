import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { pages } from "./pages";

for (const scheme of ["light", "dark"] as const) {
  test.describe(`WCAG 2.1 AA (${scheme})`, () => {
    test.use({ colorScheme: scheme });
    for (const path of pages) {
      test(`no violations on ${path}`, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState("networkidle");
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
          .analyze();
        const summary = results.violations.map(
          (v) =>
            `${v.id}: ${v.help}\n  ${v.nodes
              .map((n) => n.target.join(" "))
              .slice(0, 5)
              .join("\n  ")}`,
        );
        expect(summary, summary.join("\n")).toEqual([]);
      });
    }
  });
}

test("open states have no violations (menu, filters, accordion)", async ({ page }, info) => {
  await page.goto("/bundles/lf-01");
  await page.getByRole("button", { name: "How exact bundles work" }).click();
  let r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(r.violations.map((v) => v.id)).toEqual([]);
  if (info.project.name === "mobile") {
    await page.getByRole("button", { name: "Open menu" }).click();
    r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(r.violations.map((v) => v.id)).toEqual([]);
    await page.keyboard.press("Escape");
    await page.goto("/bundles");
    await page.getByRole("button", { name: /Filters/ }).click();
    r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(r.violations.map((v) => v.id)).toEqual([]);
  }
});
