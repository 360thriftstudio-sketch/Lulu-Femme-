import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/PageHeader";
import { StyleguideDemos } from "@/components/StyleguideDemos";
import { Badge, Breadcrumbs, Button, ButtonLink, Card } from "@/components/ui";

export const metadata: Metadata = {
  title: "Styleguide",
  description: "Lulu Femme design system: colours, type scale and components.",
  robots: { index: false },
};

const colours = [
  {
    name: "Burgundy",
    token: "--pink",
    light: "#632D43",
    dark: "#E7B3C3",
    use: "Primary: buttons, headings",
  },
  { name: "Oat", token: "--offwhite", light: "#F4EEE6", dark: "#1B1416", use: "Page background" },
  {
    name: "Studio Sage",
    token: "--sage",
    light: "#4F6B57",
    dark: "#9CB8A3",
    use: "Labels, success, pre-loved",
  },
  {
    name: "Grade A Gold",
    token: "--gold",
    light: "#C9A86A",
    dark: "#D9BC85",
    use: "Badges, standout button (fill only)",
  },
  {
    name: "Burgundy hover",
    token: "--pink-hover",
    light: "#4E2235",
    dark: "#F0C7D3",
    use: "Primary hover",
  },
  { name: "Ink", token: "--ink", light: "#2B1A21", dark: "#F4EEE6", use: "Body text" },
  { name: "Muted", token: "--muted", light: "#665249", dark: "#C9B9B0", use: "Secondary text" },
  { name: "Deep oat", token: "--blush", light: "#EBE2D5", dark: "#2F2428", use: "Tinted sections" },
  { name: "Card", token: "--card", light: "#FFFDF9", dark: "#261C1F", use: "Cards" },
  { name: "Line", token: "--line", light: "#E3D9CC", dark: "#3D3034", use: "Dividers, borders" },
  {
    name: "Line strong",
    token: "--line-strong",
    light: "#8C7A6E",
    dark: "#8F7F86",
    use: "Form borders (3:1)",
  },
];

const type = [
  { cls: "display text-7xl", label: "Display XL · Cormorant Garamond 600, 72" },
  { cls: "display text-5xl", label: "Display L · Cormorant Garamond 600, 48" },
  { cls: "display text-3xl", label: "Display M · Cormorant Garamond 600, 30" },
  { cls: "text-2xl font-bold", label: "Heading · Manrope 24 bold" },
  { cls: "text-xl font-bold", label: "Subheading · Manrope 20 bold" },
  { cls: "text-lg", label: "Lead · Manrope 18" },
  { cls: "text-base", label: "Body · Manrope 16" },
  { cls: "text-sm", label: "Small · Manrope 14" },
  { cls: "text-xs", label: "Caption · Manrope 12" },
];

export default function StyleguidePage() {
  return (
    <>
      <PageHeader
        title="Styleguide"
        intro="Every colour, font size and component in the Lulu Femme design system. All pairs meet WCAG 2.1 AA."
      />
      <Section title="Colours" id="colours">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {colours.map((c) => (
            <li key={c.token} className="overflow-hidden rounded-2xl border border-line bg-card">
              <div
                className="h-20 border-b border-line"
                style={{ background: `var(${c.token})` }}
              />
              <div className="p-3 text-sm">
                <p className="font-bold text-plum">{c.name}</p>
                <p className="font-mono text-xs text-ink">{c.token}</p>
                <p className="text-xs text-muted">
                  Light {c.light} · Dark {c.dark}
                </p>
                <p className="mt-1 text-xs text-ink">{c.use}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>
      <Section title="Type scale" id="type">
        <ul className="flex flex-col gap-4">
          {type.map((t) => (
            <li key={t.label} className="flex flex-col gap-1 border-b border-line pb-4">
              <span className="text-xs font-semibold text-muted">{t.label}</span>
              <span className={`${t.cls} text-plum`}>Exact Grade A bundles</span>
            </li>
          ))}
          <li className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-muted">Bundle code · Manrope bold</span>
            <span className="text-4xl font-bold tracking-[0.06em] text-pink-ink tabular-nums">
              LF-01
            </span>
          </li>
        </ul>
      </Section>
      <Section title="Components" id="components">
        <div className="flex flex-col gap-10">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="w-full text-lg font-bold text-plum">Buttons</h3>
            <Button>Primary</Button>
            <Button variant="secondary">Secondary outline</Button>
            <Button size="sm">Small</Button>
            <Button size="sm" variant="secondary">
              Small outline
            </Button>
            <Button variant="ghost">Ghost</Button>
            <ButtonLink href="/bundles">Link button</ButtonLink>
            <Button disabled>Disabled</Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="w-full text-lg font-bold text-plum">Badges</h3>
            <Badge tone="pink" display>
              LF-01
            </Badge>
            <Badge tone="dark">20 pcs</Badge>
            <Badge tone="blush">Grade A</Badge>
            <Badge tone="plum">Sold</Badge>
            <Badge tone="outline">Align Mix</Badge>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-bold text-plum">Card</h3>
            <Card className="max-w-sm">
              <p className="font-bold text-plum">Card title</p>
              <p className="text-sm text-ink">White card on off-white with a soft shadow.</p>
            </Card>
          </div>
          <div>
            <h3 className="mb-1 text-lg font-bold text-plum">Breadcrumbs</h3>
            <Breadcrumbs
              items={[
                { href: "/", label: "Home" },
                { href: "/bundles", label: "Shop bundles" },
                { label: "LF-01" },
              ]}
            />
          </div>
          <StyleguideDemos />
        </div>
      </Section>
    </>
  );
}
