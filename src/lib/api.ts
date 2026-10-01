// src/lib/api.ts

const ENDPOINT = import.meta.env.VITE_SHEETS_API_URL;

// ── Types ────────────────────────────────────────────────────────
export type FormType = 'contact' | 'review';

export type SubmissionResult =
  | { ok: true }
  | { ok: false; error: string };

export type ApprovedReview = {
  name: string;
  role: string;
  text: string;
};

// ── Submit a form ────────────────────────────────────────────────
export async function submitForm(
  formType: FormType,
  payload: Record<string, string>,
): Promise<SubmissionResult> {
  if (!ENDPOINT) {
    return { ok: false, error: 'Missing VITE_SHEETS_API_URL — check your .env file.' };
  }

  try {
    // no-cors: Apps Script redirects POSTs and drops the CORS headers on the
    // redirect. Reading the response throws "Failed to fetch" *even though*
    // the row was appended to the sheet. With no-cors we never read the
    // response — we just trust the request went out.
    await fetch(ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ formType, ...payload }),
    });

    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Network error — check your connection.',
    };
  }
}

// ── Fetch approved reviews (JSONP — bypasses CORS entirely) ──────
export function fetchApprovedReviews(): Promise<ApprovedReview[]> {
  if (!ENDPOINT) return Promise.resolve([]);

  return new Promise((resolve) => {
    const cbName = `__lvReviews_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
    const script = document.createElement('script');
    let cleaned = false;

    const cleanup = () => {
      if (cleaned) return;
      cleaned = true;
      try { delete (window as unknown as Record<string, unknown>)[cbName]; } catch { /* noop */ }
      script.remove();
    };

    // Apps Script calls this function with the parsed JSON payload.
    (window as unknown as Record<string, unknown>)[cbName] = (data: {
      result?: string;
      reviews?: ApprovedReview[];
    }) => {
      cleanup();
      if (data?.result === 'success' && Array.isArray(data.reviews)) {
        resolve(
          data.reviews.filter(
            (r): r is ApprovedReview =>
              typeof r?.name === 'string' &&
              r.name.trim().length > 0 &&
              typeof r?.text === 'string' &&
              r.text.trim().length > 0,
          ),
        );
      } else {
        resolve([]);
      }
    };

    script.src = `${ENDPOINT}?type=reviews&callback=${cbName}&t=${Date.now()}`;
    script.async = true;
    script.onerror = () => {
      console.warn('[reviews] JSONP failed → falling back to static list.');
      cleanup();
      resolve([]);
    };

    // Safety net: if Google hangs, give up after 8s and fall back to static.
    setTimeout(() => {
      if (!cleaned) {
        console.warn('[reviews] JSONP timed out → falling back to static list.');
        cleanup();
        resolve([]);
      }
    }, 8000);

    document.body.appendChild(script);
  });
}