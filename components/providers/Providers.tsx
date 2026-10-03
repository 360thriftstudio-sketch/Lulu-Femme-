"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ToastProvider } from "@/components/ui/Toast";
import { readJSON, writeJSON } from "@/lib/storage";

/* ---------------- Currency ---------------- */
export const currencies = ["GBP", "EUR", "USD"] as const;
export type Currency = (typeof currencies)[number];
export const currencySymbol: Record<Currency, string> = { GBP: "£", EUR: "€", USD: "$" };

type CurrencyCtx = { currency: Currency; setCurrency: (c: Currency) => void };
const CurrencyContext = createContext<CurrencyCtx>({ currency: "GBP", setCurrency: () => {} });
export const useCurrency = () => useContext(CurrencyContext);

/* ---------------- Slug lists (saved + quote) ---------------- */
type ListCtx = {
  items: string[];
  ready: boolean;
  has: (slug: string) => boolean;
  add: (slug: string) => void;
  addMany: (slugs: string[]) => void;
  remove: (slug: string) => void;
  toggle: (slug: string) => boolean;
  clear: () => void;
};
const emptyList: ListCtx = {
  items: [],
  ready: false,
  has: () => false,
  add: () => {},
  addMany: () => {},
  remove: () => {},
  toggle: () => false,
  clear: () => {},
};
const SavedContext = createContext<ListCtx>(emptyList);
const QuoteContext = createContext<ListCtx>(emptyList);
export const useSaved = () => useContext(SavedContext);
export const useQuote = () => useContext(QuoteContext);

function useSlugList(key: string): ListCtx {
  const [items, setItems] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readJSON<unknown>(key, []);
    setItems(Array.isArray(stored) ? stored.filter((x) => typeof x === "string") : []);
    setReady(true);
  }, [key]);

  useEffect(() => {
    if (ready) writeJSON(key, items);
  }, [key, items, ready]);

  const has = useCallback((s: string) => items.includes(s), [items]);
  const add = useCallback((s: string) => setItems((p) => (p.includes(s) ? p : [...p, s])), []);
  const addMany = useCallback(
    (ss: string[]) => setItems((p) => [...p, ...ss.filter((s) => !p.includes(s))]),
    [],
  );
  const remove = useCallback((s: string) => setItems((p) => p.filter((x) => x !== s)), []);
  const toggle = useCallback(
    (s: string) => {
      const willAdd = !items.includes(s);
      setItems((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));
      return willAdd;
    },
    [items],
  );
  const clear = useCallback(() => setItems([]), []);

  return useMemo(
    () => ({ items, ready, has, add, addMany, remove, toggle, clear }),
    [items, ready, has, add, addMany, remove, toggle, clear],
  );
}

export function Providers({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("GBP");
  useEffect(() => {
    const c = readJSON<string>("lf-currency", "GBP");
    if ((currencies as readonly string[]).includes(c)) setCurrencyState(c as Currency);
  }, []);
  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    writeJSON("lf-currency", c);
  }, []);
  const currencyValue = useMemo(() => ({ currency, setCurrency }), [currency, setCurrency]);

  const saved = useSlugList("lf-saved");
  const quote = useSlugList("lf-quote");

  return (
    <CurrencyContext.Provider value={currencyValue}>
      <SavedContext.Provider value={saved}>
        <QuoteContext.Provider value={quote}>
          <ToastProvider>{children}</ToastProvider>
        </QuoteContext.Provider>
      </SavedContext.Provider>
    </CurrencyContext.Provider>
  );
}
