export type SubmitResult = { ok: true } | { ok: false; error: string };

/** Posts form data to Formspree. The form ID comes from NEXT_PUBLIC_FORMSPREE_ID. */
export async function submitToFormspree(data: Record<string, unknown>): Promise<SubmitResult> {
  const id = process.env.NEXT_PUBLIC_FORMSPREE_ID;
  if (!id) {
    return {
      ok: false,
      error:
        "The form isn't connected yet (missing NEXT_PUBLIC_FORMSPREE_ID). Please email us instead.",
    };
  }
  try {
    const res = await fetch(`https://formspree.io/f/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) return { ok: true };
    const json = (await res.json().catch(() => null)) as { errors?: { message: string }[] } | null;
    return {
      ok: false,
      error:
        json?.errors?.map((e) => e.message).join(", ") || "Something went wrong. Please try again.",
    };
  } catch {
    return {
      ok: false,
      error: "We couldn't reach the server. Check your connection and try again.",
    };
  }
}

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
