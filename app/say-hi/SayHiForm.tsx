"use client";

import { type FormEvent, useState } from "react";

type FormState = "idle" | "sending" | "sent" | "error";

export default function SayHiForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/say-hi", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          reply: formData.get("reply"),
          message: formData.get("message"),
          company: formData.get("company"),
        }),
      });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Could not send message right now.");
      }

      form.reset();
      setState("sent");
    } catch (caughtError) {
      setState("error");
      setError(caughtError instanceof Error ? caughtError.message : "Could not send message right now.");
    }
  }

  return (
    <form className="say-hi-form" onSubmit={handleSubmit}>
      <input
        aria-hidden="true"
        autoComplete="off"
        className="say-hi-honeypot"
        name="company"
        tabIndex={-1}
        type="text"
      />

      <label>
        <span>Name</span>
        <input maxLength={80} name="name" placeholder="Your name" type="text" />
      </label>

      <label>
        <span>Email / X / LinkedIn / GitHub / Instagram</span>
        <input
          maxLength={160}
          name="reply"
          placeholder="@username or https://..."
          required
          type="text"
        />
      </label>

      <label>
        <span>Message</span>
        <textarea
          maxLength={1600}
          name="message"
          placeholder="Tell me what you're building, asking, or thinking about."
          required
          rows={6}
        />
      </label>

      <div className="say-hi-form-footer">
        <button className="comic-button px-5 py-2 text-xl" disabled={state === "sending"} type="submit">
          {state === "sending" ? "Sending..." : "Send message"}
        </button>

        {state === "sent" ? (
          <p className="say-hi-status" role="status">
            Message sent. I&apos;ll get back when I can.
          </p>
        ) : null}

        {state === "error" ? (
          <p className="say-hi-status say-hi-status-error" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </form>
  );
}
