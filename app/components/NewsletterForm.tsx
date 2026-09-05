'use client';

import { useState } from 'react';
import { contactEmail } from '../../lib/site';

const ENDPOINT = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT || '';

/**
 * The prototype faked this: it always replied "confirmation sent to {email}"
 * without sending anything. Shipping that would tell visitors they had
 * subscribed when no record exists, so the success path here is real —
 * it POSTs to NEXT_PUBLIC_NEWSLETTER_ENDPOINT. Until that is configured the
 * form says so plainly instead of claiming a delivery that did not happen.
 */
export default function NewsletterForm() {
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.querySelector<HTMLInputElement>('input[type=email]');
    const value = input?.value.trim() ?? '';
    if (!value) return;

    if (!ENDPOINT) {
      setMessage(`Signups are not connected yet — email ${contactEmail} and we will add you.`);
      return;
    }

    setPending(true);
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value }),
      });
      if (!res.ok) throw new Error(String(res.status));
      if (input) input.value = '';
      setMessage(`Thanks — confirmation sent to ${value}.`);
    } catch {
      setMessage(`Something went wrong. Email ${contactEmail} and we will add you.`);
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex min-w-0 flex-col gap-[10px]">
      <label
        htmlFor="lc-email"
        className="font-mono text-[10px] tracking-[0.18em] text-invert-ink/66"
      >
        EMAIL ADDRESS
      </label>
      <div className="flex flex-wrap gap-[10px]">
        <input
          id="lc-email"
          type="email"
          name="email"
          required
          placeholder="you@company.com"
          className="min-w-0 flex-[1_1_180px] rounded-lg border border-invert-ink/24 bg-invert-ink/6 px-[14px] py-[13px] font-sans text-[15px] text-paper outline-none focus:border-accent-2 focus:bg-invert-ink/10"
        />
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 cursor-pointer rounded-lg border-none bg-invert-ink px-[22px] py-[13px] font-sans text-[15px] font-medium text-invert-bg transition-colors duration-200 hover:bg-accent-2 hover:text-ink disabled:opacity-70"
        >
          {pending ? 'Subscribing…' : 'Subscribe'}
        </button>
      </div>
      <div aria-live="polite" className="min-h-[18px] text-[13.5px] text-invert-ink/72">
        {message}
      </div>
    </form>
  );
}
