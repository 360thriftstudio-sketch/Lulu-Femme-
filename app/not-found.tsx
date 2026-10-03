import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-site flex flex-col items-start gap-5 py-20">
      <p className="text-sm font-bold tracking-widest text-pink-ink uppercase">Error 404</p>
      <h1 className="display text-5xl text-plum md:text-6xl">Page not found</h1>
      <p className="max-w-xl text-lg text-ink">This page may have moved, or the bundle has sold.</p>
      <ButtonLink href="/bundles">Shop bundles</ButtonLink>
    </section>
  );
}
